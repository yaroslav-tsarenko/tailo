import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: `Refund Policy – ${COMPANY_NAME}`,
        description: `Learn how ${COMPANY_NAME} handles refunds for token-based AI resume generation purchases. Transparent rules for digital services, instant downloads, and consumer protection.`,
        keywords: [
            "refund policy",
            "AI resume refund",
            "token refund",
            "digital service policy",
            "resume generator",
            "instant delivery",
            COMPANY_NAME?.toLowerCase() || "ai-resume-generator",
            "returns",
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Refund Policy`,
            description: "Transparent refund and credit policy for token-based AI resume generation services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "1. Overview",
            bullets: [
                `This Refund Policy outlines how ${COMPANY_NAME} manages refund requests for token-based purchases and AI-generated resumes.`,
                "Refunds are subject to the conditions below and applicable consumer laws.",
                "Average processing time: 5–10 business days after approval.",
                "Refunds cannot exceed the amount originally paid.",
                "Tokens already used to generate or download AI resumes are non-refundable.",
                "Tokens are digital credits, not convertible to real currency.",
                "Bonus or promotional tokens are non-refundable and non-transferable.",
                `To request a refund, please contact our support team at ${COMPANY_EMAIL}.`,
            ],
        },
        {
            type: "text",
            title: "2. Applicability",
            description: `This policy applies to all users purchasing tokens or premium AI resume features on ${COMPANY_NAME}. It does not affect your rights under applicable consumer protection laws.`,
        },
        {
            type: "text",
            title: "3. Token Types",
            bullets: [
                "**Tokens** — internal credits used to generate resumes or AI content.",
                "**Unused Tokens** — credits purchased but not yet spent on generation.",
                "**Used Tokens** — credits already redeemed for AI resume creation or file download.",
                "**Bonus Tokens** — complimentary credits provided through promotions or loyalty rewards.",
            ],
        },
        {
            type: "text",
            title: "4. Refund Rules",
            bullets: [
                "Refunds cannot exceed your original payment (excluding gateway fees).",
                "Used tokens are non-refundable once a resume has been generated, downloaded, or exported.",
                "Unused tokens may be refunded at their purchase value upon request, subject to review.",
                "Tokens cannot be transferred or exchanged between accounts.",
                "No refunds for bonus or promotional tokens.",
                "If you accessed the AI resume immediately after purchase, you agree to waive the right of withdrawal for digital content delivered instantly.",
            ],
        },
        {
            type: "text",
            title: "5. Submitting a Refund Request",
            description: `To submit a refund request, please email ${COMPANY_EMAIL} and include the following information:`,
            bullets: [
                "Your order or transaction ID.",
                "Email associated with your account.",
                "Specify whether you are requesting a refund for unused tokens or due to an issue with AI output.",
                "Detailed explanation or evidence (e.g., corrupted file, system error).",
                "Preferred refund method (same as original payment method).",
            ],
        },
        {
            type: "text",
            title: "6. Review & Decision",
            bullets: [
                "We will verify your account activity, token usage, and transaction history.",
                "Refunds are usually processed via the original payment method.",
                "If a refund is denied, we will provide a clear explanation and available next steps.",
            ],
        },
        {
            type: "text",
            title: "7. Faulty or Failed AI Generations",
            bullets: [
                "If your generated resume fails to render, download, or contains critical formatting errors, contact support for a free re-generation or token reimbursement.",
                "Refunds may apply in cases where the generation was unsuccessful due to a technical fault on our servers.",
                "We may request logs or screenshots to validate the issue.",
            ],
        },
        {
            type: "text",
            title: "8. Fraud & Abuse Prevention",
            description:
                "Refunds will be denied, and accounts may be suspended if fraudulent or abusive refund behavior is detected, including excessive refund requests, chargebacks, or misuse of AI tools. Active chargebacks during review are treated as disputes.",
        },
        {
            type: "text",
            title: "9. Policy Updates",
            description:
                "We may update this policy at any time to reflect changes in pricing, token structure, or legal requirements. Updates will be posted on our website or sent to your account email.",
        },
        {
            type: "text",
            title: "10. Record Retention",
            description:
                "We keep refund and transaction records for at least 2 years for compliance, fraud prevention, and audit purposes.",
        },
        {
            type: "text",
            title: "11. Contact Information",
            bullets: [
                `Support: ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Address: ${COMPANY_ADDRESS}`,
                `Company No.: ${COMPANY_NUMBER}`,
            ],
        },
        {
            type: "text",
            title: "Effective Date",
            description: "This refund policy is effective from 6 October 2025.",
        },
    ],
};

export default refundPolicySchema;
