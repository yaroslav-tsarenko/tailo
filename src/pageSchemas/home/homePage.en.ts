import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `AI Resume Builder — Create Lightweight, ATS-Friendly CVs with ${COMPANY_NAME}`,
        description:
            "Generate optimized, lightweight, and ATS-ready resumes using smart tokens. Stay relevant, readable, and professional with AI assistance — powered by cutting-edge resume generation technology.",
        keywords: [
            "AI resume builder",
            "ATS friendly CV",
            "optimized resume",
            "lightweight resume format",
            "token based resume generation",
            "AI career assistant",
            "professional CV generator",
            "fast resume builder",
            "AI job application tool",
            "relevant candidate profile",
        ],
        canonical: "/",
        ogImage: {
            title: "Build the Perfect Resume with AI",
            description:
                "Generate professional, keyword-optimized resumes with one click. Lightweight, ATS-ready, and job-relevant.",
            bg: "#ffffff",
            color: "#9532ff",
        },
    },

    blocks: [
        // 🟣 HERO
        {
            type: "hero",
            bgImage: "image4",
            title: "Build Smarter Resumes with AI — Be the Candidate Everyone Wants",
            description:
                "Our AI Resume Generator helps you craft an optimized, ATS-friendly, and beautifully structured CV that weighs less, loads faster, and gets noticed by recruiters.",
            buttons: [
                { text: "Create My Resume", link: "/dashboard", color: "primary" },
                { text: "View Pricing", link: "/pricing", color: "secondary" },
            ],
        },

        // 🟢 STEPS
        {
            type: "steps",
            title: "How It Works in 3 Simple Steps",
            items: [
                {
                    number: 1,
                    title: "Choose Your Resume Type",
                    description:
                        "Select from modern templates optimized for tech, business, or creative roles. Each template is AI-ready.",
                    iconName: "layers",
                },
                {
                    number: 2,
                    title: "Generate & Customize",
                    description:
                        "Use tokens to instantly generate your resume. Add custom sections, achievements, and metrics with AI help.",
                    iconName: "sparkles",
                },
                {
                    number: 3,
                    title: "Download & Apply",
                    description:
                        "Export your lightweight PDF — ready for ATS systems, recruiters, and online applications.",
                    iconName: "download",
                },
            ],
        },

        // 🔵 SECTION – AI ADVANTAGE
        {
            type: "section",
            align: "left",
            gap: "2rem",
            left: {
                type: "text",
                title: "Why Our AI Resume Generator Stands Out",
                description:
                    "Unlike traditional builders, our AI focuses on clarity, structure, and data-driven optimization. Every CV is reviewed for readability, weight, and compliance with modern applicant tracking systems.",
                bullets: [
                    "AI-powered content suggestions",
                    "Automatic formatting and layout optimization",
                    "Designed for maximum recruiter visibility",
                ],
                iconName: "robot",
                iconSize: 44,
                iconColor: "#9532ff",
                iconBg: "#f6f0ff",
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image15",
                width: "100%",
                height: "380px",
                alt: "AI Resume Optimization Dashboard",
            },
        },

        // 🟠 GRID – BENEFITS
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    image: "image8",
                    title: "ATS-Friendly Design",
                    description:
                        "Each resume is fully optimized for Applicant Tracking Systems — no fancy graphics that block parsing.",
                    buttonLink: "/services",
                    buttonText: "Learn More",
                },
                {
                    image: "image17",
                    title: "Lightweight & Fast",
                    description:
                        "Get PDF resumes that load instantly on any platform and stay under 1MB — perfect for online applications.",
                    buttonLink: "/pricing",
                    buttonText: "View Plans",
                },
                {
                    image: "image11",
                    title: "Career-Relevant Optimization",
                    description:
                        "AI adapts to your industry, skill level, and job title to ensure your CV matches what recruiters search for.",
                    buttonLink: "/contact-us",
                    buttonText: "Get Help",
                },
            ],
        },

        // 🟣 TEXT – SEO SECTION
        {
            type: "text",
            title: "Boost Your Job Search Visibility",
            description:
                "A great resume is more than words — it’s a data-optimized document that search engines and job boards love. By using smart structure, keywords, and low-weight PDFs, you increase your visibility across job platforms like LinkedIn, Indeed, and Glassdoor.",
            bullets: [
                "SEO-friendly structure for online job boards",
                "Built-in keyword optimization for your field",
                "Automatic title and description balance",
            ],
            iconName: "search",
            iconSize: 38,
            iconColor: "#68cfff",
            iconBg: "#e7f8ff",
        },

        {
            type: "testimonials",
            title: "Real Users, Real Results",
            items: [
                {
                    name: "Sophia",
                    role: "Software Developer",
                    text: "My ATS score jumped by 40%. The AI made my CV clean, relevant, and powerful.",
                    avatar: "https://i.pravatar.cc/150?img=47",
                },
                {
                    name: "Michael",
                    role: "Marketing Manager",
                    text: "I used 20 tokens to build three different resumes. Each version fit my job perfectly.",
                    avatar: "https://i.pravatar.cc/150?img=22",
                },
                {
                    name: "Liam",
                    role: "Business Analyst",
                    text: "Finally, a tool that makes professional resumes simple. The layout looks human, not robotic.",
                    avatar: "https://i.pravatar.cc/150?img=15",
                },
                {
                    name: "Isabella",
                    role: "UX Designer",
                    text: "My resume size dropped to 700KB and passed every upload test. Recruiters love it!",
                    avatar: "https://i.pravatar.cc/150?img=33",
                },
                {
                    name: "Olivia",
                    role: "HR Specialist",
                    text: "As a recruiter, I immediately notice the clarity of resumes made with this tool. It's exactly what HR systems need.",
                    avatar: "https://i.pravatar.cc/150?img=38",
                },
                {
                    name: "Ethan",
                    role: "Data Scientist",
                    text: "The token-based system is genius. I refined my resume multiple times without paying extra subscriptions.",
                    avatar: "https://i.pravatar.cc/150?img=56",
                },
            ],
        },


        // 🟡 SECTION – TOKEN MODEL
        {
            type: "section",
            align: "right",
            gap: "2rem",
            left: {
                type: "media",
                mediaType: "image",
                src: "image3",
                width: "100%",
                height: "360px",
                alt: "Token Based Resume Generation",
            },
            right: {
                type: "text",
                title: "Generate with Tokens — Smarter Than Subscriptions",
                description:
                    "Use flexible tokens to pay only for what you need. Each token equals real AI generation power — resume drafts, rewrites, or cover letters. No recurring fees, no locked features.",
                bullets: [
                    "Pay-as-you-go simplicity",
                    "Every token counts toward real content",
                    "Refill tokens anytime, from any plan",
                ],
                iconName: "coins",
                iconSize: 42,
                iconColor: "#68cfff",
                iconBg: "#f0faff",
            },
        },

        // 🟢 PRICING
        {
            type: "grid",
            columns: 3,
            cards: [
                {
                    type: "pricing",
                    variant: "basic",
                    title: "Starter Pack",
                    price: "5.00",
                    tokens: 100,
                    description: "Generate your first professional AI resume instantly.",
                    features: [
                        "Lightweight PDF resume",
                        "Basic AI optimization",
                        "1 cover letter draft",
                    ],
                    buttonText: "Buy Tokens",
                },
                {
                    type: "pricing",
                    variant: "highlight",
                    title: "Pro Resume Kit",
                    price: "15.00",
                    tokens: 400,
                    description: "Ideal for job seekers improving multiple resumes or cover letters.",
                    features: [
                        "Advanced AI optimization",
                        "Unlimited downloads",
                        "Multi-language support",
                    ],
                    buttonText: "Upgrade Now",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Career Master Pack",
                    price: "30.00",
                    tokens: 1000,
                    description: "For professionals, freelancers, and career-changers who want excellence.",
                    features: [
                        "Full analytics & ATS score preview",
                        "All-format export options",
                        "Free future updates",
                    ],
                    buttonText: "Go Premium",
                },
            ],
        },

        // 🔵 FAQ
        {
            type: "faq",
            items: [
                {
                    question: "What does ‘lightweight resume’ mean?",
                    answer:
                        "It means your CV is under 1MB, fast to upload, and formatted with precision for all HR systems.",
                },
                {
                    question: "What is an ATS-friendly resume?",
                    answer:
                        "ATS (Applicant Tracking System)-friendly resumes are structured to be easily read by software that filters job applications.",
                },
                {
                    question: "How do tokens work?",
                    answer:
                        "Tokens are credits used to generate content. Each resume or cover letter consumes a few tokens — no subscriptions required.",
                },
                {
                    question: "Can I edit resumes after generation?",
                    answer:
                        "Yes. You can adjust, rewrite, or re-export your resume anytime using the same token balance.",
                },
            ],
        },

        // 🟣 CTA / FINAL
        {
            type: "hero",
            bgImage: "image20",
            title: "Start Building Your Perfect Resume Today",
            description:
                "Don’t let poor formatting or unreadable CVs stop your career. Create optimized, fast, and professional resumes powered by AI.",
            buttons: [
                { text: "Start for Free", link: "/services", color: "primary" },
                { text: "View Plans", link: "/pricing", color: "secondary" },
            ],
        },
    ],
};

export default schema;
