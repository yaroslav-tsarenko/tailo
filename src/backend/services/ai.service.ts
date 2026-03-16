import { AiOrder } from "../models/aiOrder.model";
import { User } from "../models/user.model";
import { ENV } from "../config/env";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

export const aiService = {
    async processPrompt(userId: string, email: string, prompt: string) {
        const cost = parseInt(ENV.AI_COST_PER_REQUEST || "30", 10);
        const user = await User.findOneAndUpdate(
            { _id: userId, tokens: { $gte: cost } },
            { $inc: { tokens: -cost } },
            { new: true }
        );
        if (!user) throw new Error("InsufficientTokens");

        // GPT-запит
        let gptResponse: string;
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            });
            gptResponse = completion.choices[0].message?.content || "No response";
        } catch (err: any) {
            throw new Error("OpenAIError: " + err.message);
        }

        // зберегти в БД
        const order = await AiOrder.create({
            userId,
            email,
            prompt,
            response: gptResponse,
        });

        return order;
    },

    async getOrders(userId: string) {
        return AiOrder.find({ userId }).sort({ createdAt: -1 });
    },

    async getOrderById(userId: string, orderId: string) {
        return AiOrder.findOne({ _id: orderId, userId });
    },
};
