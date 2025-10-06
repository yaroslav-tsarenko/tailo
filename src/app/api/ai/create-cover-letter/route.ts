import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { jobDesc, personalDesc } = await req.json();

        if (!jobDesc || !personalDesc) {
            return NextResponse.json(
                { error: "jobDesc and personalDesc are required" },
                { status: 400 }
            );
        }

        const prompt = `
You are an AI career assistant. Write a short, human-sounding and personalized cover letter (max 200 words)
for the following candidate and job posting. Use a natural tone, show enthusiasm, and clearly match candidate skills
to job requirements.

Job Description:
${jobDesc}

Candidate Description:
${personalDesc}
`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a professional HR writing assistant." },
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 700,
            }),
        });

        const data = await response.json();
        const letter = data.choices?.[0]?.message?.content?.trim() || "Failed to generate cover letter.";

        return NextResponse.json({ letter });
    } catch (err) {
        console.error("Cover Letter Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
