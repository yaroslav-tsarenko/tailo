import { NextResponse } from "next/server";
import OpenAI from "openai";
import { AiOrder } from "@/backend/models/aiOrder.model";
import { createTransaction } from "@/backend/utils/transactions";
import { getUserByEmail } from "@/backend/utils/getUser";
import { defaultResumeData } from "@/resources/resumeExample";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
    try {
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
            totalTokens, // 👈 received from frontend
        } = body;

        // 🔹 Token charge simulation
        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.tokens < totalTokens) {
            return NextResponse.json({ error: "Insufficient tokens" }, { status: 402 });
        }

        // 🔹 Deduct tokens & record transaction
        await createTransaction({
            userId: user._id,
            type: "debit",
            amount: totalTokens,
            description: `AI Resume generation (${totalTokens} tokens)`,
        });

        user.tokens -= totalTokens;
        await user.save();

        // 🔹 Define example schema
        const resumeExample = defaultResumeData;

        // ✨ Smarter system prompt
        const systemPrompt = `
You are an ATS-optimized resume generator AI.

Return ONLY valid JSON:
{
  "resumeData": ResumeDataObject,
  "coverLetter": "string"
}

The resume must exactly follow this schema:
${JSON.stringify(resumeExample, null, 2)}

Guidelines:
- DO NOT include "Dear Team", "Dear Hiring Manager", or greetings.
- The cover letter must START with "As an experienced ..." and go straight into the applicant’s value.
- The resume MUST contain the same job title, key phrases, and terminology from the given job description.
- Optimize the wording for Applicant Tracking Systems (ATS): mirror the language of the job post.
- The cover letter must be motivational, concise, and clearly show fit for the position.
`;

        const userPrompt = `
Generate:
1️⃣ A professional cover letter (200–300 words) for a ${role}, starting with "As an experienced ...".
Use data:
- Name: ${fullName}
- Country: ${country}
- Summary: ${summary}
- Skills: ${skills}
- Experience: ${experience}
- Education: ${education}
- Languages: ${languages}
- Job Description: ${jobDescription}

2️⃣ A "resumeData" object that matches the schema above exactly.
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0].message.content;
        const json = JSON.parse(raw || "{}");

        // ✅ Defensive array safety
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

        // ✅ Create AI Order record
        const order = await AiOrder.create({
            user: user._id,
            type: "resume_generation",
            tokensSpent: totalTokens,
            status: "completed",
            metadata: {
                role,
                email,
                fullName,
            },
        });

        return NextResponse.json({ ...json, orderId: order._id });
    } catch (error: any) {
        console.error("AI generation failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
