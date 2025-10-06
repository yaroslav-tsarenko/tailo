import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
} from "@/resources/constants";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: `Privacy Policy – ${COMPANY_NAME}`,
        description: `Learn how ${COMPANY_NAME} collects, stores, and protects your personal data while using our AI Resume Generator. Understand what information we process, how tokens and sessions work, and your rights under GDPR and global privacy laws.`,
        keywords: [
            "privacy policy",
            "AI resume generator",
            "data protection",
            "GDPR compliance",
            "token-based system",
            "AI privacy",
            "resume data security",
            "personal data rights",
            COMPANY_NAME?.toLowerCase() || "ai-resume-generator",
        ],
        canonical: "/privacy-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Privacy Policy`,
            description:
                "Transparent data protection and privacy standards for AI resume generation and token-based services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "1. Introduction",
            description: `At ${COMPANY_NAME}, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and store your information when you access our AI Resume Generator, purchase tokens, or interact with our website. It also describes your rights under data protection laws such as the GDPR, CCPA, and related frameworks.`,
        },
        {
            type: "text",
            title: "2. Data We Collect",
            bullets: [
                "Name, email address, and account credentials (if you register).",
                "Payment and transaction identifiers for token purchases (processed securely by third-party providers).",
                "Generated content such as resumes, cover letters, or LinkedIn summaries created with tokens.",
                "Device information, IP address, browser type, and log data for security and analytics.",
                "Communication data from support requests, chat messages, or contact forms.",
            ],
        },
        {
            type: "text",
            title: "3. How We Use Your Data",
            bullets: [
                "To provide and personalize AI resume generation and related services (performance of contract).",
                "To process token payments, prevent fraud, and verify account ownership (legal obligation / legitimate interests).",
                "To improve the accuracy, speed, and quality of our AI algorithms (legitimate interests).",
                "To send service updates, account alerts, or marketing emails if you consent.",
                "To maintain platform security and prevent misuse of AI tools.",
            ],
        },
        {
            type: "text",
            title: "4. Legal Bases for Processing",
            bullets: [
                "Performance of contract — delivering AI resume and token services you requested.",
                "Consent — for marketing communication, cookies, or optional analytics.",
                "Legal obligation — to maintain tax, transaction, and compliance records.",
                "Legitimate interests — maintaining platform integrity, preventing abuse, and improving features.",
            ],
        },
        {
            type: "text",
            title: "5. Sharing & Data Transfers",
            description: `We only share data with trusted partners who help us operate securely — such as payment gateways, analytics tools, and hosting providers. Some of these partners may process data outside your country (e.g., in the US). When this happens, we apply legal safeguards such as Standard Contractual Clauses (SCC) and adequacy decisions to ensure equivalent protection.`,
        },
        {
            type: "text",
            title: "6. Cookies and Tracking Tools",
            description:
                "We use cookies and similar technologies to enhance user experience, remember session preferences, and improve platform performance. Essential cookies are required for login and token processing. Optional analytics or marketing cookies are used only with your consent. For full details, please review our Cookie Policy.",
        },
        {
            type: "text",
            title: "7. Data Retention",
            description: `We retain personal data only as long as necessary to fulfill the purposes described above. Account and transaction data are stored for up to 5 years to comply with accounting and anti-fraud regulations. AI-generated resumes, cover letters, and related content remain available in your dashboard until manually deleted or your account is closed.`,
        },
        {
            type: "text",
            title: "8. Your Privacy Rights",
            bullets: [
                "Request access to your personal data (Data Access).",
                "Request correction or deletion (Rectification & Erasure).",
                "Restrict or object to processing (Restriction & Objection).",
                "Request transfer of your data (Portability).",
                "Withdraw consent at any time, where applicable.",
                `To exercise your rights, email ${COMPANY_EMAIL}. We may verify your identity before processing requests.`,
            ],
        },
        {
            type: "text",
            title: "9. Security Measures",
            bullets: [
                "We use HTTPS/TLS encryption to protect data in transit.",
                "Sensitive information (like payment data) is processed only by certified payment providers.",
                "Our servers are protected with firewalls, access control, and regular security audits.",
                "All AI resume data is stored in encrypted environments with restricted access.",
            ],
        },
        {
            type: "text",
            title: "10. AI Content and User Responsibility",
            description:
                "AI-generated resumes and text outputs are created automatically based on your input. We do not store or analyze sensitive information beyond what is necessary for generation. You are responsible for ensuring that uploaded or input data does not contain confidential or third-party personal information without consent.",
        },
        {
            type: "text",
            title: "11. Children’s Privacy",
            description:
                "Our platform is not designed for individuals under 16 years of age. We do not knowingly collect or process data from minors. If you believe a child has provided data to us, please contact support immediately.",
        },
        {
            type: "text",
            title: "12. Policy Updates",
            description:
                "We may update this Privacy Policy to reflect service improvements, regulatory changes, or new technologies. Significant updates will be communicated through platform notices or account emails. Continued use of the service after such changes implies acceptance.",
        },
        {
            type: "text",
            title: "13. Contact & Complaints",
            bullets: [
                `Privacy inquiries: ${COMPANY_EMAIL}`,
                `Support: ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Address: ${COMPANY_ADDRESS}`,
                `Company No.: ${COMPANY_NUMBER}`,
                "You may also contact your regional Data Protection Authority if you believe your data rights have been violated.",
            ],
        },
        {
            type: "text",
            title: "Effective Date",
            description: "This Privacy Policy takes effect as of 6 October 2025 and replaces all previous versions.",
        },
    ],
};

export default privacyPolicySchema;
