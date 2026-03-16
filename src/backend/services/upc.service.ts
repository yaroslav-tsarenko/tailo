import { AiOrder } from "@/backend/models/aiOrder.model";
import { User } from "@/backend/models/user.model";
import { Transaction } from "@/backend/models/transaction.model";
import { sendEmail } from "@/backend/utils/sendEmail";

export const upcService = {
    async processUPCOrder(userId: string, email: string, prompt: string, response: string) {
        const cost = 30;
        const user = await User.findOneAndUpdate(
            { _id: userId, tokens: { $gte: cost } },
            { $inc: { tokens: -cost } },
            { new: true }
        );
        if (!user) throw new Error("Insufficient tokens");

        // Create transaction for spending tokens
        await Transaction.create({
            userId,
            email,
            amount: cost,
            type: "spend",
            paymentMethod: "tokens",
        });

        const order = await AiOrder.create({
            userId,
            email,
            prompt,
            response,
        });

        await sendEmail(
            email,
            "UPC Order Completed",
            "Your UPC code order has been completed and tokens have been spent."
        );

        return order;
    },
};
