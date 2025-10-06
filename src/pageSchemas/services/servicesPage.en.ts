import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Professional Resume AI Services — ${COMPANY_NAME}`,
        description: `Build AI-powered, ATS-friendly resumes with ${COMPANY_NAME}. Create optimized CVs using tokens — lightweight, structured, and tailored for every job application.`,
        keywords: [
            "AI resume generator",
            "ATS resume builder",
            "smart resume creation",
            "lightweight CV",
            "optimized resume writing",
            "AI career tools",
            "professional resume services",
            `${COMPANY_NAME} AI resume builder`
        ],
        canonical: "/services",
        ogImage: {
            title: `${COMPANY_NAME} Resume AI Services`,
            description: "Generate optimized, professional, and ATS-friendly resumes with token-based AI precision.",
            bg: "#f9fbff",
            color: "#0070f3"
        }
    },

    blocks: [
        // HERO-LIKE INTRO
        {
            type: "section",
            align: "center",
            gap: "2rem",
            left: {
                type: "text",
                title: "AI-Powered Resume Creation",
                description: "Transform how you build your resume. Our token-based system helps you generate optimized, minimal, and impactful resumes designed to pass ATS filters effortlessly.",
                bullets: [
                    "ATS-optimized content structure",
                    "Lightweight PDF output (under 1 MB)",
                    "Human-like tone, recruiter-friendly language"
                ],
                iconName: "smart_toy",
                iconSize: 50,
                iconColor: "#0070f3",
                iconBg: "#e6f7ff"
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                width: "100%",
                height: "420px",
                alt: "AI resume generation process"
            }
        },

        // FEATURE GRID 1
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            items: [
                {
                    key: "optimization",
                    block: {
                        type: "text",
                        title: "Automatic Resume Optimization",
                        description: "Our AI improves sentence clarity, adjusts keywords, and restructures content to align with job descriptions.",
                        bullets: [
                            "Smart keyword matching",
                            "Grammar & tone correction",
                            "Auto formatting for readability"
                        ],
                        iconName: "auto_fix_high",
                        iconSize: 42,
                        iconColor: "#4a00e5",
                        iconBg: "#f3e8ff"
                    }
                },
                {
                    key: "tokenSystem",
                    block: {
                        type: "text",
                        title: "Flexible Token System",
                        description: "Pay only for what you generate. Use tokens to create, update, or export resumes — no subscriptions required.",
                        bullets: [
                            "Transparent usage per resume",
                            "Affordable micro-transactions",
                            "Instant top-ups with major currencies"
                        ],
                        iconName: "token",
                        iconSize: 42,
                        iconColor: "#d900aa",
                        iconBg: "#ffe6f3"
                    }
                },
                {
                    key: "speed",
                    block: {
                        type: "text",
                        title: "Fast & Lightweight Output",
                        description: "Get a clean, professional PDF resume that loads fast and passes recruiter systems with ease.",
                        bullets: [
                            "Optimized file size (<1 MB)",
                            "Export in seconds",
                            "Guaranteed ATS readability"
                        ],
                        iconName: "bolt",
                        iconSize: 42,
                        iconColor: "#0070f3",
                        iconBg: "#e6f7ff"
                    }
                }
            ]
        },

        // SECTION 2
        {
            type: "section",
            gap: "2rem",
            left: {
                type: "text",
                title: "AI Cover Letters & Job Matching",
                description: "Enhance your application with personalized AI-generated cover letters and intelligent job matching suggestions.",
                bullets: [
                    "Auto-generated cover letters in seconds",
                    "Tailored to your experience and job role",
                    "Boosts response rates by up to 3×"
                ],
                iconName: "mail",
                iconSize: 48,
                iconColor: "#9532ff",
                iconBg: "#f5ebff"
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image3",
                width: "100%",
                height: "400px",
                alt: "AI cover letter generation"
            }
        },

        // FEATURE GRID 2
        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            items: [
                {
                    key: "careerInsights",
                    block: {
                        type: "text",
                        title: "Career Insights & Analytics",
                        description: "Understand how your resume performs. Track keyword strength, file size, readability, and more.",
                        bullets: [
                            "ATS performance insights",
                            "Keyword density reports",
                            "Suggestions for higher match rates"
                        ],
                        iconName: "bar_chart",
                        iconSize: 40,
                        iconColor: "#0070f3",
                        iconBg: "#e6f7ff"
                    }
                },
                {
                    key: "multiVersion",
                    block: {
                        type: "text",
                        title: "Multiple Resume Versions",
                        description: "Create role-specific versions of your resume — marketing, tech, management, or creative — all optimized separately.",
                        bullets: [
                            "Up to 5 variations per token pack",
                            "Separate keyword focus per role",
                            "Save and manage all versions online"
                        ],
                        iconName: "content_copy",
                        iconSize: 40,
                        iconColor: "#d900aa",
                        iconBg: "#ffe6f3"
                    }
                }
            ]
        },

        // SECTION 3
        {
            type: "section",
            align: "center",
            gap: "2rem",
            left: {
                type: "media",
                mediaType: "image",
                src: "image4",
                width: "100%",
                height: "400px",
                alt: "Resume AI testimonials"
            },
            right: {
                type: "text",
                title: "Why Professionals Choose Us",
                description: `Thousands of job seekers trust ${COMPANY_NAME} to create professional resumes that actually get noticed. Whether you’re applying for your first job or aiming for senior positions — our AI gives you the edge.`,
                bullets: [
                    `"My resume finally passed ATS filters after five rejections!"`,
                    `"I built a clean, modern CV in under 10 minutes."`,
                    `"The token model makes it affordable and flexible."`
                ],
                iconName: "stars",
                iconSize: 48,
                iconColor: "#FFD700",
                iconBg: "#fffbe6"
            }
        },

        // FAQ
        {
            type: "faq",
            items: [
                {
                    question: "How does the token system work?",
                    answer: "You receive tokens that can be spent on generating resumes, cover letters, or analytics reports. Each action costs a small, fixed number of tokens."
                },
                {
                    question: "Are the resumes ATS-friendly?",
                    answer: "Yes. All our templates are formatted for ATS parsing — ensuring that recruiters and systems can read your resume easily."
                },
                {
                    question: "Can I edit my resume after generation?",
                    answer: "Absolutely. You can regenerate or tweak sections with AI without losing your credits."
                },
                {
                    question: "Will my data stay private?",
                    answer: "Yes, all personal and career data is encrypted and never shared with third parties."
                },
                {
                    question: "Can I generate multiple versions of a resume?",
                    answer: "Yes, you can use tokens to create several role-specific resumes for different job applications."
                }
            ]
        },

        // CTA GRID
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    image: "image5",
                    title: "View Plans & Pricing",
                    description: "Choose the token plan that fits your job search needs.",
                    buttonLink: "/pricing",
                    buttonText: "See Pricing"
                },
                {
                    image: "image6",
                    title: "Get Started Now",
                    description: "Generate your optimized resume instantly using our AI assistant.",
                    buttonLink: "/get-started",
                    buttonText: "Start Building"
                },
                {
                    image: "image7",
                    title: "Contact Support",
                    description: "Need assistance or have questions? Our support team is here to help.",
                    buttonLink: "/contact-us",
                    buttonText: "Contact Us"
                }
            ]
        }
    ]
};

export default schema;
