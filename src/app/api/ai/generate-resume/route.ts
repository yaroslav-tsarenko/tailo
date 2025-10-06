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

/* -------------------------------- PROMPT CONSTANTS -------------------------------- */

const SYSTEM_PROMPT = (resumeSchema: object) => `
You are an ATS-optimized resume & cover letter generator AI.

Return **VALID JSON ONLY** in this format:
{
  "resumeData": ResumeDataObject,
  "coverLetter": "string"
}

The "resumeData" must STRICTLY follow this schema:
${JSON.stringify(resumeSchema, null, 2)}

Guidelines:
- DO NOT include greetings like "Dear Team" or "Dear Hiring Manager".
- The cover letter MUST start with: "As an experienced ...".
- It must be 200–300 words, professional, and keyword-rich.
- Ensure "resumeData" mirrors key terms from the job description for perfect ATS ranking.
- All arrays and objects must always exist (even if empty).
- Maintain correct JSON syntax only — no explanations.
`;

const USER_PROMPT = (params: any) => `
Generate:
1️⃣ A professional cover letter for a ${params.role}, starting with "As an experienced ...",
based on:
${Object.entries(params)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}
2️⃣ A "resumeData" JSON object that matches the given schema EXACTLY.
Ensure all arrays exist, and ATS keywords from the job description are included.
`;

/* -------------------------------- MAIN ROUTE HANDLER -------------------------------- */

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 🔐 Authenticate
        const user = await requireAuth(req);
        if (!user)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        // 🧠 Parse body
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

        // 🔍 Fetch user record
        const dbUser = await User.findById(user.sub);
        if (!dbUser)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (dbUser.tokens < totalTokens)
            return NextResponse.json(
                { message: "Insufficient tokens" },
                { status: 402 }
            );

        /* -------------------- Deduct tokens & record transaction -------------------- */
        dbUser.tokens -= totalTokens;
        await dbUser.save();

        await Transaction.create({
            userId: dbUser._id,
            email: dbUser.email,
            amount: totalTokens,
            type: "spend",
            description: `AI Resume Generation (${totalTokens} tokens)`,
            createdAt: new Date(),
        });

        /* -------------------- Generate resume and cover letter -------------------- */
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

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0]?.message?.content;
        const json = JSON.parse(raw || "{}");

        // 🩹 Ensure array structure validity
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

        /* -------------------- Create AI Order (full schema) -------------------- */
        const order = await AiOrder.create({
            userId: dbUser._id,
            email: dbUser.email,
            prompt: userPrompt,
            response: JSON.stringify(json, null, 2),
            createdAt: new Date(),
        });

        /* -------------------- Send confirmation email -------------------- */
        await sendEmail(
            dbUser.email,
            "Your AI Resume is Ready 🚀",
            `Hi ${fullName || dbUser.name}, your AI-generated resume and cover letter are ready.`,
            `
        <h2>✅ Your AI Resume & Cover Letter Are Ready!</h2>
        <p>You’ve successfully spent <b>${totalTokens}</b> tokens for AI resume generation.</p>
        <p>Role: <b>${role}</b></p>
        <p>Order ID: <b>${order._id}</b></p>
        <p>Visit your dashboard to download the PDF and review your new resume.</p>
      `
        );

        /* -------------------- Response -------------------- */
        return NextResponse.json({
            success: true,
            message: "Resume generated successfully",
            resumeData: json.resumeData,
            coverLetter: json.coverLetter,
            tokensRemaining: dbUser.tokens,
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
