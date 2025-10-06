export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS;
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME;
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_NUMBER = process.env.NEXT_PUBLIC_COMPANY_NUMBER;
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL;

export const defaultResumeData = {
    header: {
        fullName: "John Doe",
        role: "Full-Stack Developer",
        country: "USA",
        linkedinLink: "https://linkedin.com/in/johndoe",
        portfolioLink: "https://johndoe.dev",
        email: "johndoe@example.com",
    },
    summary:
        "Experienced Full-Stack Developer skilled in building scalable applications with React, Next.js, and Node.js. Passionate about clean code, performance, and delivering value to clients.",
    keywords: [
        "JavaScript", "TypeScript", "React", "Next.js",
        "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"
    ],
    technicalSkills: [
        "React, Next.js, Redux, Zustand",
        "Node.js, Express, GraphQL",
        "MongoDB, PostgreSQL, Firebase",
        "CI/CD, Docker, AWS, Vercel"
    ],
    experiences: [
        {
            company: "TechCorp",
            role: "Frontend Developer",
            project: "E-commerce Platform",
            date: "2021 - Present",
            type: "Remote",
            accomplishment: [
                "Developed and maintained a high-traffic e-commerce platform",
                "Improved page speed by 35% with code optimization"
            ],
            languagesAndTechnologies: ["React", "TypeScript", "Next.js"],
        },
    ],
    education: {
        university: "Example University",
        speciality: "Computer Science",
    },
    languages: [
        { name: "English", level: "Fluent" },
        { name: "German", level: "Intermediate" },
    ],
};
