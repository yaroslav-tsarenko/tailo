import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const termsSchema: PageSchema = {
    meta: {
        title: `Terms & Conditions – ${COMPANY_NAME}`,
        description: `Terms and conditions for using ${COMPANY_NAME}: AI resume generation, token payments, refunds, intellectual property, and liability.`,
        keywords: [
            "terms",
            "terms and conditions",
            "resume generator terms",
            "AI resume tool",
            "token system",
            "liability",
            "refund policy",
            "user rights"
        ],
        canonical: "/terms-and-conditions",
        ogImage: {
            title: `${COMPANY_NAME} – Terms & Conditions`,
            description: "Fair, transparent terms for using our AI resume and career tools.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Terms and Conditions",
            description: "Effective date: 6 October 2025",
        },
        {
            type: "text",
            title: "1. Introduction",
            description: `These Terms and Conditions ("Terms") govern your use of ${COMPANY_NAME} (the "Service") operated by ${COMPANY_LEGAL_NAME} (company number: ${COMPANY_NUMBER}, registered office: ${COMPANY_ADDRESS}) ("we", "us", or "our"). By using the Service, registering an account, or purchasing tokens, you agree to these Terms. If you do not agree, you must not use the Service.`,
        },
        {
            type: "text",
            title: "2. Definitions",
            bullets: [
                `"Account" means the user profile created on ${COMPANY_NAME}.`,
                `"Tokens" refer to digital credits used within the platform to generate resumes, cover letters, or related content.`,
                `"AI Resume" means any resume, CV, or cover letter created or optimized using our AI technology.`,
                `"Features" include customization, keyword optimization, formatting, and export options.`,
                `"User" or "Customer" refers to any individual or organization using the Service.`,
            ],
        },
        {
            type: "text",
            title: "3. Eligibility and Account Registration",
            bullets: [
                "You must be at least 18 years old to create an account and use the Service.",
                "You are responsible for maintaining accurate account information and securing your login credentials.",
                "You agree not to share your account access or tokens with unauthorized persons.",
                "If you suspect unauthorized access, contact us immediately at our support email.",
            ],
        },
        {
            type: "text",
            title: "4. Services and Features",
            bullets: [
                `${COMPANY_NAME} provides AI-based resume generation, keyword optimization, formatting assistance, and document export options.`,
                "Some features are free; others require token payment.",
                "Generated content is delivered digitally via the dashboard or download link.",
                "We may update or modify features periodically to improve the Service.",
            ],
        },
        {
            type: "text",
            title: "5. Token System, Payment and Checkout",
            bullets: [
                "The Service operates on a token-based payment model.",
                "Tokens can be purchased directly via supported payment methods displayed at checkout.",
                "Each resume, cover letter, or AI feature consumes a specified number of tokens.",
                "Tokens are non-transferable and linked to your account.",
                "You will see all applicable prices and fees before confirming a transaction.",
            ],
        },
        {
            type: "text",
            title: "6. Refunds, Cancellation and Consumer Rights",
            bullets: [
                "Because digital services are provided instantly, token purchases are generally non-refundable.",
                "Refunds may be granted for unused tokens or technical issues that prevent content generation.",
                `Requests must be sent to ${COMPANY_EMAIL} within 14 days of purchase with your transaction ID.`,
                "Refunds are processed at our discretion and according to consumer law where applicable.",
            ],
        },
        {
            type: "text",
            title: "7. Intellectual Property Rights",
            bullets: [
                `All intellectual property rights in ${COMPANY_NAME}, its AI models, algorithms, templates, and platform design belong to ${COMPANY_LEGAL_NAME}.`,
                "You retain ownership of the resumes or documents you create.",
                "You are granted a non-exclusive, personal license to use generated content for personal or professional job applications.",
                "You may not: ",
                "(a) Resell or redistribute generated resumes as templates or products;",
                "(b) Copy or reverse-engineer any part of the Service;",
                "(c) Use the Service to create misleading or fraudulent profiles.",
            ],
        },
        {
            type: "text",
            title: "8. Warranties and Disclaimers",
            bullets: [
                "We aim to provide high-quality AI resume generation but do not guarantee employment outcomes or recruiter acceptance.",
                "The Service is provided 'as is' without warranties of merchantability or fitness for a specific purpose.",
                "We do not guarantee continuous, error-free operation or compatibility with all file types or systems.",
            ],
        },
        {
            type: "text",
            title: "9. Limitation of Liability",
            bullets: [
                "Nothing in these Terms excludes liability for fraud or personal injury caused by negligence.",
                "Our total liability is limited to the total amount you paid for tokens or services within the last 12 months.",
                "We are not liable for indirect damages such as data loss, loss of employment opportunity, or reputational damage.",
            ],
        },
        {
            type: "text",
            title: "10. Indemnity",
            description: `You agree to indemnify and hold harmless ${COMPANY_NAME}, its affiliates, and employees against any claims or losses arising from your misuse of the Service, violation of these Terms, or unlawful use of generated content.`,
        },
        {
            type: "text",
            title: "11. Data Protection and Privacy",
            bullets: [
                "We process personal data in accordance with our Privacy Policy and applicable data protection laws.",
                "By using the Service, you consent to data collection necessary for account management and content generation.",
                "We do not share personal data with third parties except as required by law or for essential service functionality.",
            ],
        },
        {
            type: "text",
            title: "12. Third-Party Services",
            description:
                "The Service may integrate third-party APIs or payment processors. We are not responsible for their content, reliability, or data practices.",
        },
        {
            type: "text",
            title: "13. Account Suspension and Termination",
            bullets: [
                "We reserve the right to suspend or terminate accounts that violate these Terms or misuse tokens.",
                "Upon termination, any remaining tokens may be forfeited unless otherwise required by law.",
                "Users may delete their account anytime by contacting support.",
            ],
        },
        {
            type: "text",
            title: "14. Updates to These Terms",
            description:
                "We may modify these Terms to reflect legal, technical, or business changes. Updates will be announced via email or platform notice. Continued use after updates implies acceptance.",
        },
        {
            type: "text",
            title: "15. Notices and Communication",
            description: `You can contact us via ${COMPANY_EMAIL} or by mail at our registered address. We may send legal or service-related notices to your registered email address.`,
        },
        {
            type: "text",
            title: "16. Governing Law and Jurisdiction",
            bullets: [
                "These Terms are governed by the laws of England and Wales.",
                "Disputes will be handled exclusively by the courts of England and Wales unless local consumer laws provide otherwise.",
            ],
        },
        {
            type: "text",
            title: "17. Miscellaneous",
            bullets: [
                "If any provision of these Terms is found invalid or unenforceable, the remaining clauses remain effective.",
                "Failure to enforce a provision shall not constitute a waiver of rights.",
            ],
        },
        {
            type: "text",
            title: "18. Contact Details",
            bullets: [
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Registered office: ${COMPANY_ADDRESS}`,
                `Company no.: ${COMPANY_NUMBER}`,
                `Email: ${COMPANY_EMAIL}`,
            ],
        },
    ],
};

export default termsSchema;
