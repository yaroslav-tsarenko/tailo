import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/backend/config/db";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { AiOrder } from "@/backend/models/aiOrder.model";
import { Transaction } from "@/backend/models/transaction.model";
import { User } from "@/backend/models/user.model";
import { sendEmail } from "@/backend/utils/sendEmail";
import { defaultResumeData } from "@/resources/constants";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const SYSTEM_PROMPT = (resumeSchema: object) => `
You are an **expert ATS Resume Generator** trained to produce keyword-optimized, recruiter-friendly resumes.

🎯 GOAL:
Adapt and rewrite the candidate’s resume so it aligns **>95%** with the job description keywords and implied requirements.
Integrate every relevant technology, ability, and measurable result naturally into all resume sections.
The resume must be fully rewritten to perfectly match the job role and company requirements — not just keyword insertion.

⚡ ADAPT TO JOB:
You must take the provided resume (structure example from defaultResumeData) as a reference.
Use its formatting, structure, and richness of content (summary, technical skills, experiences, accomplishments, etc.)
but **rewrite** and **adapt** every part (summary, accomplishments, technologies, and tone)
to make it a perfect semantic and technical match to the given job description.

────────────────────────────
OUTPUT:
Return strictly valid JSON only in this format:
{
  "resumeData": ResumeDataObject,
  "coverLetter": "string"
}

The "resumeData" must follow this schema exactly:
${JSON.stringify(resumeSchema, null, 2)}

────────────────────────────
RULES:

1️⃣ **Keyword Extraction & Reinforcement**
- Identify ALL keywords and phrases in the job description (explicit + implied).
- Include technical tools, programming languages, frameworks, methodologies, and soft skills.
- Use synonyms and equivalents (e.g., React = React.js = ReactJS, PostgreSQL = SQL, Docker = containerization).
- Maintain natural readability — no keyword stuffing.

2️⃣ **Integration Requirements**
- Inject keywords across all sections:
  • summary → 3–5 sentences densely packed with relevant stack & abilities  
  • technicalSkills → grouped by Frontend, Backend, Cloud, Testing, DevOps, AI  
  • experiences → rewrite with 10–12 technologies + 2–3 measurable achievements  
  • accomplishments → must include concrete results (“reduced load time by 35%”, “improved conversion by 40%”)  
  • education & languages → factual but concise.

3️⃣ **Results & Metrics**
- Include at least **5+ measurable outcomes** using KPIs, percentages, or impact stats.
- Show initiative, performance, collaboration, scalability, and innovation.

4️⃣ **Cover Letter**
- Strictly professional tone (no greetings, no closing lines).
- 120–180 words.
- Include 10–12 distinct job-relevant keywords.
- Clearly explain why this candidate fits this role, referencing technologies and responsibilities from the job posting.

5️⃣ **Quality Standards**
- Resume must sound confident, technically deep, and tailored for a mid-senior engineer.
- Never leave placeholders or empty arrays.
- Output must be **strict JSON only**, no markdown or extra commentary.
`;

const USER_PROMPT = (params: any) => `
You are rewriting, restructuring, and expanding this candidate’s resume for **perfect alignment with the provided job description**.

────────────────────────────
👤 Candidate Data (reference resume to adapt):
${Object.entries(params)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}

────────────────────────────
💼 Job Description:
${params.jobDescription || "N/A"}

────────────────────────────
TASKS:
- Analyze every keyword, skill, and qualification from the job description.
- Compare them to the candidate’s data and **rewrite** the resume accordingly.
- Modify wording, achievements, and technologies to fully match the company’s needs.
- Expand and adapt every section (summary, skills, experience, accomplishments) following the format and depth of defaultResumeData.
- Each experience block must list at least 10+ stack items and 2–3 measurable results.
- Summary must include at least 8+ core technologies and 3+ soft skills.
- Ensure smooth, human-like narrative (no repetition, natural flow).
- Return strictly valid JSON with "resumeData" and "coverLetter".
`;

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const user = await requireAuth(req);
        if (!user)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const {
            fullName,
            role,
            country,
            portfolioLink,
            linkedinLink,
            email,
            summary,
            skills,
            experience,
            education,
            languages,
            jobDescription,
            totalTokens,
        } = body;

        const tokensToSpend = Number(totalTokens);
        if (!Number.isFinite(tokensToSpend) || tokensToSpend <= 0)
            return NextResponse.json(
                { message: "Invalid token amount" },
                { status: 400 }
            );

        const dbUser = await User.findById(user.sub);
        if (!dbUser)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        // Atomic token deduction avoids full-document validation on legacy users
        // and prevents race conditions from concurrent spending requests.
        const updatedUser = await User.findOneAndUpdate(
            { _id: dbUser._id, tokens: { $gte: tokensToSpend } },
            { $inc: { tokens: -tokensToSpend } },
            { new: true }
        );

        if (!updatedUser)
            return NextResponse.json(
                { message: "Insufficient tokens" },
                { status: 402 }
            );

        await Transaction.create({
            userId: dbUser._id,
            email: dbUser.email,
            amount: tokensToSpend,
            type: "spend",
            description: `AI Resume Adaptation (${tokensToSpend} tokens)`,
            createdAt: new Date(),
        });

        // 🧠 Build prompts
        const systemPrompt = SYSTEM_PROMPT(defaultResumeData);
        const userPrompt = USER_PROMPT({
            fullName,
            role,
            country,
            portfolioLink,
            linkedinLink,
            email,
            summary,
            skills,
            experience,
            education,
            languages,
            jobDescription,
        });

        // 🚀 Generate Resume & Cover Letter
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.55,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0]?.message?.content || "{}";
        const json = JSON.parse(raw);

        // 🩹 Normalize experience arrays
        if (json.resumeData?.experiences) {
            json.resumeData.experiences = json.resumeData.experiences.map((exp: any) => ({
                ...exp,
                accomplishment: Array.isArray(exp.accomplishment)
                    ? exp.accomplishment
                    : exp.accomplishment
                        ? [exp.accomplishment]
                        : [],
                languagesAndTechnologies: Array.isArray(exp.languagesAndTechnologies)
                    ? exp.languagesAndTechnologies
                    : exp.languagesAndTechnologies
                        ? [exp.languagesAndTechnologies]
                        : [],
            }));
        }

        // 💾 Save AI Order
        const order = await AiOrder.create({
            userId: dbUser._id,
            email: dbUser.email,
            prompt: userPrompt,
            response: JSON.stringify(json, null, 2),
            createdAt: new Date(),
        });

        // 📧 Email Notification
        await sendEmail(
            dbUser.email,
            "Your Job-Matched Resume is Ready 🚀",
            `Hi ${fullName || dbUser.name || "there"}, your AI-adapted resume and cover letter have been customized for the provided job description.`,
            `
      <h2>✅ Resume Adapted for Job</h2>
      <p>You’ve successfully spent <b>${tokensToSpend}</b> tokens for resume rewriting and job adaptation.</p>
      <p>Position: <b>${role}</b></p>
      <p>Order ID: <b>${order._id}</b></p>
      <p>Visit your dashboard to view and download your optimized resume and cover letter.</p>
    `
        );

        return NextResponse.json({
            success: true,
            message: "Resume adapted and rewritten successfully for job match",
            resumeData: json.resumeData,
            coverLetter: json.coverLetter,
            tokensRemaining: updatedUser.tokens,
            orderId: order._id,
        });
    } catch (error: any) {
        console.error("❌ Error in /generate-resume:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
