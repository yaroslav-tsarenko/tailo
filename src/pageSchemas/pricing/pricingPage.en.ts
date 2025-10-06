import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
} from "@/resources/constants";

const pricingSchema: PageSchema = {
    meta: {
        title: `Pricing — ${COMPANY_NAME}`,
        description: `Discover transparent, token-based pricing for ${COMPANY_NAME}. Generate AI-powered, ATS-friendly resumes and cover letters without subscriptions or hidden fees.`,
        keywords: [
            `${COMPANY_NAME} pricing`,
            "AI resume generator pricing",
            "token resume plans",
            "ATS resume builder cost",
            "AI CV writing packages",
            "affordable resume creation",
            "AI job application tools"
        ],
        canonical: "/pricing",
        ogImage: {
            title: `${COMPANY_NAME} Pricing`,
            description: "Affordable and flexible token-based pricing for AI-powered resume generation.",
            bg: "#f8faff",
            color: "#0070f3",
        },
    },

    blocks: [
        // HERO
        {
            type: "hero",
            bgImage: "image10",
            title: "Simple, Transparent, Token-Based Pricing",
            description: `Pay only for what you use — no subscriptions, no hidden fees. Whether you need a single AI-optimized resume or a complete job-application bundle, ${COMPANY_NAME} gives you full control.`,
            buttons: [
                { text: "Get Started", link: "/get-started", color: "primary" },
                { text: "Contact Support", link: "/contact-us", color: "secondary" },
            ],
        },

        // FLEXIBLE PLANS OVERVIEW
        {
            type: "section",
            align: "center",
            gap: "2rem",
            left: {
                type: "text",
                title: "Fair and Flexible Token Plans",
                description: `${COMPANY_NAME} uses a simple token system. Each resume, cover letter, or optimization costs a small number of tokens — you decide how to spend them.`,
                bullets: [
                    "No subscriptions or hidden charges",
                    "Pay only for generated resumes or extras",
                    "Flexible for individuals and recruiters",
                    "Top up anytime, keep your unused tokens"
                ],
                iconName: "token",
                iconSize: 48,
                iconColor: "#0070f3",
                iconBg: "#e6f7ff",
                centerTitle: true,
                centerDescription: true,
                centerBullets: true,
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image1",
                width: "100%",
                height: "400px",
                alt: "Token pricing overview",
            },
        },

        // PRICING GRID
        {
            type: "section",
            align: "center",
            gap: "3rem",
            right: {
                type: "grid",
                columns: 4,
                gap: "2rem",
                cards: [
                    {
                        type: "pricing",
                        variant: "basic",
                        title: "Starter Plan",
                        price: "10",
                        description: "For students or job seekers creating their first AI-optimized resume.",
                        features: [
                            "100 tokens included",
                            "1 professional resume + 1 cover letter",
                            "Basic template customization",
                            "Export to PDF and DOCX"
                        ],
                        buttonText: "Start Now",
                        buttonLink: "/get-started",
                    },
                    {
                        type: "pricing",
                        variant: "highlight",
                        title: "Professional Plan",
                        price: "25",
                        description: "Perfect for professionals applying to multiple positions.",
                        features: [
                            "300 tokens included",
                            "Up to 3 resumes + 3 cover letters",
                            "Advanced keyword optimization",
                            "ATS & readability analysis"
                        ],
                        buttonText: "Go Pro",
                        buttonLink: "/get-started",
                    },
                    {
                        type: "pricing",
                        variant: "premium",
                        title: "Business Plan",
                        price: "50",
                        description: "For agencies, HR departments, or power users managing many resumes.",
                        features: [
                            "700 tokens included",
                            "Unlimited resume generations",
                            "Team collaboration tools",
                            "Priority AI model and support"
                        ],
                        buttonText: "Upgrade",
                        buttonLink: "/get-started",
                    },
                    {
                        type: "pricing",
                        variant: "basic",
                        title: "Custom Enterprise",
                        price: "dynamic",
                        description: "For organizations or universities — tailor your own token package.",
                        features: [
                            "Custom token quantity",
                            "Bulk resume generation",
                            "Dedicated AI configuration",
                            "Personal success manager"
                        ],
                        buttonText: "Contact Sales",
                        buttonLink: "/contact-us",
                    },
                ],
            },
        },

        // HOW PRICING WORKS
        {
            type: "section",
            gap: "2rem",
            left: {
                type: "text",
                title: "How Token Pricing Works",
                description: `Every resume, cover letter, or optimization feature consumes tokens. You can preview, regenerate, or update sections using the same token balance — no subscriptions required.`,
                bullets: [
                    "1 resume = ~30 tokens (depends on length)",
                    "Extras like keyword optimization or formatting = +5–10 tokens",
                    "Unused tokens never expire",
                    "Top-up directly from your dashboard"
                ],
                iconName: "settings",
                iconSize: 40,
                iconColor: "#28a745",
                iconBg: "#e6ffe6",
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                width: "100%",
                height: "400px",
                alt: "How token system works",
            },
        },

        // TESTIMONIALS
        {
            type: "section",
            align: "center",
            gap: "3rem",
            left: {
                type: "text",
                title: "What Our Users Say",
                description: `Thousands of professionals trust ${COMPANY_NAME} to create powerful resumes. Our token system gives them freedom, flexibility, and confidence for every job application.`,
                bullets: [
                    `"The token system makes it easy to pay only for what I need!"`,
                    `"I built 3 resumes and 2 cover letters for under $20 — amazing value."`,
                    `"Fast, clean, and beautifully designed — the AI knows what recruiters want."`
                ],
                iconName: "star",
                iconSize: 48,
                iconColor: "#FFD700",
                iconBg: "#fffbe6",
                centerTitle: true,
                centerDescription: true,
                centerBullets: true,
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image3",
                width: "100%",
                height: "400px",
                alt: "User testimonials for resume pricing",
            },
        },

        // FAQ
        {
            type: "faq",
            items: [
                {
                    question: "Do tokens expire?",
                    answer: "No. Tokens never expire. You can use them anytime to generate or update resumes.",
                },
                {
                    question: "Can I upgrade my plan?",
                    answer: "Yes, you can add more tokens or switch plans anytime from your dashboard.",
                },
                {
                    question: "What can I use tokens for?",
                    answer: "Tokens can be used for resume generation, cover letters, keyword optimization, and layout adjustments.",
                },
                {
                    question: "Can I download my resumes?",
                    answer: "Yes. All generated resumes and cover letters can be downloaded in PDF or DOCX format instantly.",
                },
                {
                    question: "Is support included?",
                    answer: `Yes. Every plan includes free email support. For Business and Custom users, priority assistance is available at ${COMPANY_EMAIL}.`,
                },
            ],
        },
    ],
};

export default pricingSchema;
