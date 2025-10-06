export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS;
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME;
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_NUMBER = process.env.NEXT_PUBLIC_COMPANY_NUMBER;
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL;

export const defaultResumeData = {
    header: {
        fullName: "Yaroslav Tsarenko",
        role: "Full-Stack Engineer",
        country: "Ukraine",
        linkedinLink: "https://linkedin.com/in/yaroslav-tsarenko-",
        portfolioLink: "https://yaroslavtsarenko.com",
        email: "yaroslavtsarenkodev@gmail.com",
    },
    summary:
        "Versatile Full-Stack Engineer with over 3 years of professional experience in designing, developing, and deploying scalable web applications using JavaScript, TypeScript, and Python ecosystems. Proficient in frameworks such as React.js, Next.js, Django, and Flask. Skilled in building reactive UIs, optimizing performance, and managing large-scale cloud-based systems with AWS, Docker, and CI/CD pipelines. Adept at Test-Driven Development (TDD), implementing microservice and monolithic architectures, and developing Chrome extensions and replay rendering tools. Demonstrated ability to collaborate effectively within agile, cross-functional teams to deliver high-quality solutions aligned with business goals. Committed to continuous learning, customer satisfaction, and writing clean, maintainable, and testable code.",
    keywords: [
        "Full Stack Engineer",
        "JavaScript",
        "TypeScript",
        "Python",
        "React",
        "Next.js",
        "Vue.js",
        "Node.js",
        "Django",
        "Flask",
        "AWS",
        "Cloud Infrastructure",
        "CI/CD",
        "Docker",
        "Jenkins",
        "Chrome Extension",
        "Replay Rendering",
        "Performance Optimization",
        "Microservices",
        "RESTful API",
        "GraphQL",
        "PostgreSQL",
        "MongoDB",
        "SQL",
        "NoSQL",
        "TDD",
        "Unit Testing",
        "Integration Testing",
        "Agile Development",
        "Scrum",
        "UI/UX Design",
        "State Management",
        "Redux",
        "Zustand",
        "Responsive Design",
        "Cross-browser Compatibility",
        "Version Control",
        "Git",
        "Problem Solving",
        "Team Collaboration",
        "Analytical Thinking",
        "Communication Skills",
        "Customer Focus",
        "Performance Tuning",
        "Web Standards",
        "Data Serialization",
        "Continuous Integration",
        "Continuous Deployment"
    ],
    technicalSkills: [
        "Frontend: JavaScript (ES12+), TypeScript, React, Next.js, Vue.js, Redux, Zustand, Tailwind CSS, Material UI, HTML5, CSS3, Webpack, Vite, Chrome Extensions",
        "Backend: Node.js, Django, Flask, Express.js, RESTful APIs, GraphQL, Microservices, Monolithic architecture",
        "Databases: PostgreSQL, MongoDB, MySQL, Firebase, Supabase",
        "Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Jenkins, Vercel, Render, Heroku, GitHub Actions, CI/CD pipelines",
        "Testing: Jest, Mocha, PyTest, TDD, Integration Testing, Unit Testing, Automation",
        "Other: WebSockets, Performance Profiling, Accessibility Optimization, SEO, Analytics Integration"
    ],
    experiences: [
        {
            company: "Tresor.tech",
            role: "Front-End Developer",
            project: "e-SIM Marketplace",
            date: "09/2024 – 02/2025",
            type: "Remote",
            accomplishment: [
                "Developed over 20 responsive, cross-browser React and TypeScript components, reducing loading times by 30% and improving accessibility scores by 25%.",
                "Integrated booking flow with Node.js and MongoDB, enhancing backend communication and decreasing data latency by 20%.",
                "Implemented SEO and micro-frontend architecture strategies that increased organic traffic and engagement by 35%.",
                "Established CI/CD pipelines with Jenkins and Docker, enabling automated deployment and consistent delivery.",
                "Collaborated with design and QA teams under Agile methodology, improving feature delivery speed by 15%."
            ],
            languagesAndTechnologies: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "MongoDB",
                "AWS",
                "Tailwind CSS",
                "Material UI",
                "Jest",
                "CI/CD",
                "Docker",
                "Performance Optimization"
            ]
        },
        {
            company: "AllShipAI",
            role: "Full-Stack Developer",
            project: "AI-Powered Logistics Platform",
            date: "08/2023 – 08/2024",
            type: "Remote",
            accomplishment: [
                "Architected and launched core features for a logistics automation platform using TypeScript, Node.js, and React, resulting in 20% faster load processing and improved system reliability.",
                "Integrated AI SDKs (OpenAI GPT-4, LangChain) for intelligent shipment prediction and chatbot automation, reducing customer support tickets by 30%.",
                "Enhanced responsive design and UI/UX across devices, leading to a 40% improvement in mobile session duration.",
                "Implemented RESTful and WebSocket APIs, enabling real-time driver tracking and automated notifications.",
                "Collaborated with distributed teams using Git-based workflows and Agile sprints, delivering 98% on-time releases."
            ],
            languagesAndTechnologies: [
                "TypeScript",
                "React",
                "Node.js",
                "Tailwind CSS",
                "MongoDB",
                "Firebase",
                "Jest",
                "AWS",
                "RESTful API",
                "WebSockets",
                "OpenAI SDK",
                "LangChain"
            ]
        },
        {
            company: "StreamGenix",
            role: "Front-End Developer",
            project: "No-Code Platform",
            date: "05/2021 – 07/2023",
            type: "Remote",
            accomplishment: [
                "Built a high-performance no-code platform using React and TypeScript, increasing user retention by 22% and project deployment speed by 35%.",
                "Developed a modular CRM system in collaboration with backend teams (Python/Django), boosting customer acquisition by 20% and revenue by 40%.",
                "Implemented automated testing (Jest + PyTest) achieving 88% coverage, reducing regressions and ensuring stable feature rollouts.",
                "Utilized AWS, Docker, and Jenkins to deploy scalable builds, reducing manual deployment time by 50%.",
                "Optimized front-end architecture and caching strategy, saving approximately $2,000 annually in hosting and bandwidth costs."
            ],
            languagesAndTechnologies: [
                "JavaScript",
                "TypeScript",
                "React",
                "Django",
                "Flask",
                "Node.js",
                "PostgreSQL",
                "AWS",
                "Docker",
                "CI/CD",
                "Jenkins",
                "PyTest"
            ]
        }
    ],
    education: {
        university: "Khmelnytskyi National University",
        speciality: "Computer Science"
    },
    languages: [
        { name: "English", level: "B2 (Upper-Intermediate)" },
        { name: "Ukrainian", level: "Native" },
        { name: "Russian", level: "Native" }
    ]
};
