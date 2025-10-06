import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

export const cookiePolicyEn: PageSchema = {
    meta: {
        title: `Cookie Policy – ${COMPANY_NAME}`,
        description: `Learn how ${COMPANY_NAME} uses cookies to enhance your AI resume generation experience, save preferences, track token balance, and improve overall platform performance.`,
        keywords: [
            "cookies",
            "cookie policy",
            "AI resume builder",
            "tracking",
            "analytics",
            "privacy",
            "token system",
            "resume optimization",
            COMPANY_NAME?.toLowerCase() || "ai-resume-generator",
        ],
        canonical: "/cookie-policy",
        ogImage: {
            title: "Cookie Policy",
            description: "Transparent cookie usage and consent management for our AI resume generator platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Effective Date",
            description: "6 October 2025",
        },
        {
            type: "text",
            title: "1. Introduction",
            description: `This Cookie Policy explains how ${COMPANY_NAME} ("we", "us", or "our") uses cookies and similar technologies (like localStorage, pixels, and tracking scripts) when you use our AI Resume Generator platform. It complements our Privacy Policy. By continuing to browse or using our services, you agree to our cookie practices as described here.`,
        },
        {
            type: "text",
            title: "2. What Are Cookies?",
            description: `Cookies are small text files stored on your device to help us remember your actions and preferences (such as language settings, token balance, or last used resume template). They improve your user experience, allow secure logins, support resume generation continuity, and help us analyze how people use our tools.`,
        },
        {
            type: "text",
            title: "3. Types of Cookies We Use",
            bullets: [
                "Essential Cookies — Required for secure login, token transactions, and AI resume generation. These cookies enable account sessions and prevent unauthorized access.",
                "Functional Cookies — Store your preferred layout, default resume style, chosen language, and selected templates. They make the platform more personalized and efficient.",
                "Analytics Cookies — Help us understand how users interact with our AI and resume builder features. This data helps us optimize content quality, loading speed, and UX design.",
                "Marketing Cookies — Used only with consent. These track campaign performance, partner referrals, and help personalize promotions for premium users.",
                "Security Cookies — Detect fraud, abuse, or repeated invalid logins. They protect your account and prevent unauthorized AI content requests.",
            ],
        },
        {
            type: "text",
            title: "4. Common Cookies and Local Storage Keys",
            bullets: [
                "`session_id` — Maintains your login session (essential) • Duration: session",
                "`csrf_token` — Protects against cross-site request forgery (essential) • Duration: session",
                "`cookie_consent_state` — Saves your cookie preferences (functional) • Duration: 6–12 months",
                "`resume_template_pref` — Remembers your preferred resume layout (functional) • Duration: ~6 months",
                "`token_balance` — Tracks remaining tokens for content generation (functional) • Duration: 6 months",
                "`ai_usage_stats` — Collects performance and usage analytics (analytics) • Duration: 1–2 months",
                "`utm_campaign_src` — Tracks ad or referral campaigns (marketing) • Duration: 1–3 months",
                "_Note: Cookie names and durations may change. Check your in-app Cookie Settings panel for the latest list._",
            ],
        },
        {
            type: "text",
            title: "5. Legal Basis for Cookie Use",
            bullets: [
                "Essential cookies are used without consent as they are necessary for service functionality.",
                "Non-essential cookies (functional, analytics, marketing) require your explicit consent via the banner or settings panel.",
                "We rely on consent, contractual necessity (e.g., maintaining sessions and token payments), and legitimate interests (fraud prevention, improving user experience).",
            ],
        },
        {
            type: "text",
            title: "6. How We Store Your Consent Decision",
            description: `Your cookie consent choice is securely stored along with timestamp and browser information for up to 24 months to meet compliance and audit requirements. You can update your decision anytime through our Cookie Settings panel.`,
        },
        {
            type: "text",
            title: "7. Third-Party Tools and Integrations",
            description: `We may use trusted third-party tools for analytics, payment processing, or AI performance tracking. These providers may also set cookies. Some data may be processed outside your country (e.g., in the United States). ${COMPANY_NAME} ensures that all transfers comply with GDPR and include standard contractual safeguards.`,
        },
        {
            type: "text",
            title: "8. Managing or Revoking Your Consent",
            bullets: [
                "Click the cookie icon or ‘Cookie Settings’ link in the footer to review or change your preferences.",
                "Withdraw consent anytime by disabling optional cookies.",
                "You can also clear cookies via your browser settings. Note: doing so may reset your saved resume templates, language preferences, or token history.",
            ],
        },
        {
            type: "text",
            title: "9. Updates to This Policy",
            description: `We may periodically update this Cookie Policy to reflect new features, analytics partners, or legal requirements. Significant changes will be announced through a platform notice or email notification to registered users.`,
        },
        {
            type: "text",
            title: "10. Contact Us",
            bullets: [
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Registered Office: ${COMPANY_ADDRESS}`,
                `Company Number: ${COMPANY_NUMBER}`,
                `Email: ${COMPANY_EMAIL}`,
            ],
        },
    ],
};

export default cookiePolicyEn;
