import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/backend/config/db";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { Transaction } from "@/backend/models/transaction.model";
import { User } from "@/backend/models/user.model";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const user = await requireAuth(req);
        if (!user)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { resumeData, jobDescription, tokensToSpend = 100 } = await req.json();

        const dbUser = await User.findById(user.sub);
        if (!dbUser)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (dbUser.tokens < tokensToSpend)
            return NextResponse.json(
                { message: "Not enough tokens" },
                { status: 402 }
            );

        // 💳 Deduct tokens
        dbUser.tokens -= tokensToSpend;
        await dbUser.save();

        await Transaction.create({
            userId: dbUser._id,
            email: dbUser.email,
            amount: tokensToSpend,
            type: "spend",
            description: "Resume Match Check (AI-only)",
            createdAt: new Date(),
        });

        /* 🤖 Single AI-based evaluation */
        const prompt = `
You are an **ATS Resume Evaluator AI**.
Compare the candidate's RESUME JSON and the JOB DESCRIPTION.
Analyze technical match, soft skill alignment, and contextual fit.
Return ONLY valid JSON in this exact structure:

{
  "matchPercent": number (0-100),
  "keywordsMatched": number,
  "totalKeywords": number,
  "techMatch": number (0-100),
  "softSkillsMatch": number (0-100),
  "semanticMatch": number (0-100),
  "missingKeywords": [string]
}

Evaluation logic you must follow internally:
- Identify all keywords and technologies in the job description.
- Detect if they appear directly or conceptually in the resume.
- Estimate matchPercent as overall hiring compatibility (weighted).
- Estimate techMatch and softSkillsMatch independently.
- semanticMatch = contextual alignment, relevance, and implied skill coverage.
- missingKeywords = up to 25 most relevant missing terms from the job description.

Return JSON only, no text.

───────────────────────
RESUME:
${JSON.stringify(resumeData, null, 2)}

───────────────────────
JOB DESCRIPTION:
${jobDescription}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0]?.message?.content || "{}");

        return NextResponse.json({
            success: true,
            matchPercent: result.matchPercent || 0,
            keywordsMatched: result.keywordsMatched || 0,
            totalKeywords: result.totalKeywords || 0,
            techMatch: result.techMatch || 0,
            softSkillsMatch: result.softSkillsMatch || 0,
            semanticMatch: result.semanticMatch || 0,
            missingKeywords: result.missingKeywords || [],
            tokensRemaining: dbUser.tokens,
        });
    } catch (err: any) {
        console.error("❌ Error checking match:", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
