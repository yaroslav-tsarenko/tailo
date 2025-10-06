"use client";
import React, {useState, useEffect, useRef, useMemo} from "react";
import styles from "./ResumeGenerator.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {Textarea} from "@mui/joy";
import {IoInformationCircleSharp} from "react-icons/io5";
import {Tooltip} from "@mui/material";
import InputUI from "@/components/ui/input/InputUI";
import axios from "axios";
import {useResume} from "@/context/ResumeContext";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {pdf, PDFViewer} from "@react-pdf/renderer";
import {ResumePDF} from "@/templates/resume-template-1/ResumePDF";
import AvatarCropDialog from "@/components/widgets/avatar-crop/AvatarCropDialog";
import {useAlert} from "@/context/AlertContext";

export default function ResumeGenerator() {
    const {
        setResumeData,
        setCoverLetter,
        coverLetter,
        resumeData,
        avatar,
        setAvatar,
        loading,
        setLoading,
    } = useResume();

    const [form, setForm] = useState({
        fullName: "",
        role: "",
        portfolioLink: "",
        linkedinLink: "",
        email: "",
        country: "",
        summary: "",
        skills: "",
        experience: "",
        educationAndLanguages: "",
        jobDescription: "",
    });

    const {showAlert} = useAlert();

    const handleChange = (key: string, value: string) => {
        setForm((prev) => {
            const updated = {...prev, [key]: value};
            localStorage.setItem("resume_form_data", JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        const savedForm = localStorage.getItem("resume_form_data");
        if (savedForm) {
            const parsed = JSON.parse(savedForm);
            setForm(parsed);
        }
    }, []);

    const getResumeFileName = (data: any, name?: string) => {
        const fullName = data?.header?.fullName?.replace(/\s+/g, "_") || name || "Resume";
        const role = data?.header?.role?.replace(/\s+/g, "_") || "Developer";
        return `CV_${role}_${fullName}.pdf`;
    };

    useEffect(() => {
        const savedResume = localStorage.getItem("resume_data");
        const savedCover = localStorage.getItem("resume_coverLetter");
        const savedAvatar = localStorage.getItem("resume_avatar");

        if (savedResume) setResumeData(JSON.parse(savedResume));
        if (savedCover) setCoverLetter(savedCover);
        if (savedAvatar) setAvatar(savedAvatar);
    }, [setResumeData, setCoverLetter, setAvatar]);

    // ✨ Loader phrases
    const phrases = [
        "Fetching data...",
        "Analyzing job description...",
        "Analyzing your work experience...",
        "Generating personalized resume...",
        "Finalizing your cover letter...",
    ];
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    useEffect(() => {
        if (!loading) return;
        let i = 0;
        const interval = setInterval(() => {
            setCurrentPhrase(phrases[i++ % phrases.length]);
        }, 2000);
        return () => clearInterval(interval);
    }, [loading]);

    // 🧩 Avatar logic
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAvatarUpload = () => fileRef.current?.click();
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpenCrop(true);
        };
        reader.readAsDataURL(file);
    };


    // 🧠 Memoized resume component (updates only when resumeData changes)
    const MemoizedResume = useMemo(
        () => resumeData && <ResumePDF avatar={avatar} data={resumeData}/>,
        [resumeData, avatar]
    );

    // 📝 Editable resume script
    const [editableJSON, setEditableJSON] = useState("");
    useEffect(() => {
        if (resumeData) {
            setEditableJSON(JSON.stringify(resumeData, null, 2));
        }
    }, [resumeData]);

    const handleCopyCoverLetter = () => {
        navigator.clipboard.writeText(coverLetter);
        showAlert("Cover letter copied to clipboard!");
    }

    const handleUpdateResume = () => {
        try {
            const parsed = JSON.parse(editableJSON);
            setResumeData(parsed);
            localStorage.setItem("resume_data", JSON.stringify(parsed));
            alert("✅ Resume updated successfully!");
        } catch {
            alert("❌ Invalid JSON format. Please fix errors.");
        }
    };

    // 📄 Manual Download
    const handleDownload = () => {
        if (!resumeData) return;
        const element = document.createElement("a");
        const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
            type: "application/json",
        });
        element.href = URL.createObjectURL(blob);
        element.download = `Resume_${form.fullName || "data"}.json`;
        element.click();
    };

    // 🧮 TOKEN CALCULATION LOGIC
    const TOKEN_BASE = 30;

    const countTokensForText = (text: string) => {
        if (!text) return 0;
        const extraChars = Math.max(0, text.length - 100);
        const extraTokens = Math.ceil(extraChars / 50) * 5;
        return extraTokens;
    };

    const tokenMap = useMemo(() => ({
        summary: countTokensForText(form.summary),
        skills: countTokensForText(form.skills),
        experience: countTokensForText(form.experience),
        educationAndLanguages: countTokensForText(form.educationAndLanguages),
        jobDescription: countTokensForText(form.jobDescription),
    }), [form]);

    const totalTokens =
        TOKEN_BASE +
        tokenMap.summary +
        tokenMap.skills +
        tokenMap.experience +
        tokenMap.educationAndLanguages +
        tokenMap.jobDescription;

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/ai/generate-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: form.fullName,
                    role: form.role,
                    portfolioLink: form.portfolioLink,
                    linkedinLink: form.linkedinLink,
                    email: form.email,
                    country: form.country,
                    summary: form.summary,
                    skills: form.skills,
                    experience: form.experience,
                    education: form.educationAndLanguages,
                    languages: form.educationAndLanguages,
                    jobDescription: form.jobDescription,
                    totalTokens,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                showAlert(data.message || "Error generating resume", "error");
                return;
            }

            if (data.error) {
                showAlert(data.error, "error");
                return;
            }

            // ✅ Save locally and to context
            if (data.resumeData) {
                setResumeData(data.resumeData);
                localStorage.setItem("resume_data", JSON.stringify(data.resumeData));
            }

            if (data.coverLetter) {
                setCoverLetter(data.coverLetter);
                localStorage.setItem("resume_coverLetter", data.coverLetter);
            }

            if (data.orderId) {
                showAlert(`Resume Generated!`, "success");
            }

            if (data.tokensRemaining !== undefined) {
                console.log(`💰 Tokens left: ${data.tokensRemaining}`);
            }
        } catch (err: any) {
            console.error("❌ Resume generation failed:", err);
            showAlert("Something went wrong while generating resume.", "error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.wrapper}>
            {/* LEFT COLUMN */}
            <div className={styles.options}>
                {/* 1️⃣ Avatar */}
                <div className={styles.textarea}>
                    <h3>1. Provide Avatar <IoInformationCircleSharp/></h3>
                    {avatar ? (
                        <div className={styles.avatarPreview}>
                            <img src={avatar} alt="Avatar" className={styles.avatarImage} width={150} height={150}/>
                        </div>
                    ) : (
                        <p className={styles.avatarPlaceholder}>No avatar uploaded yet</p>
                    )}
                    <ButtonUI color="secondary" onClick={handleAvatarUpload}>
                        {avatar ? "Change Avatar" : "Add Avatar"}
                    </ButtonUI>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={handleFile}
                    />
                </div>

                {/* 2️⃣ Inputs */}
                <div className={styles.textarea}>
                    <h3>
                        2. Your personal info{" "}
                        <Tooltip title="Provide your background" arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>
                    </h3>
                    <div className={styles.grid}>
                        <InputUI
                            label="Full Name"
                            placeholder="Enter Your Full Name"
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                        />
                        <InputUI
                            label="Role"
                            placeholder="Enter Your Role (Frontend, FullStack or other...)"
                            value={form.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                        />
                        <InputUI
                            label="Portfolio Link"
                            placeholder="Link for portfolio (it must have in today)"
                            value={form.portfolioLink}
                            onChange={(e) => handleChange("portfolioLink", e.target.value)}
                        />
                        <InputUI
                            label="LinkedIn Link"
                            placeholder="Link for Linkedin"
                            value={form.linkedinLink}
                            onChange={(e) => handleChange("linkedinLink", e.target.value)}
                        />
                        <InputUI
                            label="Email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <InputUI
                            label="Country"
                            placeholder="Your Current Country"
                            value={form.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                        />
                    </div>
                </div>

                {/* 3️⃣ Summary */}
                <div className={styles.textarea}>
                    <h3>
                        3. Enter your summary{" "}
                        <Tooltip title="Brief professional summary that highlights your strongest achievements." arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>{" "}
                        <span className={styles.tokenCount}>+{tokenMap.summary} Tokens</span>
                    </h3>
                    <Textarea
                        minRows={6}
                        value={form.summary}
                        placeholder="Example: A passionate full-stack developer with 3+ years of experience..."
                        onChange={(e) => handleChange("summary", e.target.value)}
                    />
                </div>

                {/* 4️⃣ Skills */}
                <div className={styles.textarea}>
                    <h3>
                        4. Enter your main technical skills{" "}
                        <Tooltip title="List key technologies, tools, and frameworks you use." arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>{" "}
                        <span className={styles.tokenCount}>+{tokenMap.skills} Tokens</span>
                    </h3>
                    <Textarea
                        minRows={6}
                        value={form.skills}
                        placeholder="Example: React, Next.js, TypeScript, Node.js, Express..."
                        onChange={(e) => handleChange("skills", e.target.value)}
                    />
                </div>

                {/* 5️⃣ Experience */}
                <div className={styles.textarea}>
                    <h3>
                        5. Provide your work experience{" "}
                        <Tooltip title="Describe your previous jobs, roles, and projects." arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>{" "}
                        <span className={styles.tokenCount}>+{tokenMap.experience} Tokens</span>
                    </h3>
                    <Textarea
                        minRows={6}
                        value={form.experience}
                        placeholder="Example: Worked at Company X as a Frontend Developer..."
                        onChange={(e) => handleChange("experience", e.target.value)}
                    />
                </div>

                {/* 6️⃣ Education & Languages */}
                <div className={styles.textarea}>
                    <h3>
                        6. Education and languages{" "}
                        <Tooltip title="Add your educational background and known languages." arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>{" "}
                        <span className={styles.tokenCount}>+{tokenMap.educationAndLanguages} Tokens</span>
                    </h3>
                    <Textarea
                        minRows={6}
                        value={form.educationAndLanguages}
                        placeholder="Example: Bachelor’s in Computer Science, University of XYZ..."
                        onChange={(e) => handleChange("educationAndLanguages", e.target.value)}
                    />
                </div>

                {/* 7️⃣ Job Description */}
                <div className={styles.textarea}>
                    <h3>
                        7. Job description{" "}
                        <Tooltip
                            title="Paste the job posting you’re applying for — the AI will tailor your resume to it."
                            arrow>
                            <IoInformationCircleSharp/>
                        </Tooltip>{" "}
                        <span className={styles.tokenCount}>+{tokenMap.jobDescription} Tokens</span>
                    </h3>
                    <Textarea
                        minRows={6}
                        value={form.jobDescription}
                        placeholder="Example: Looking for a React Developer with strong backend experience..."
                        onChange={(e) => handleChange("jobDescription", e.target.value)}
                    />
                </div>


                <ButtonUI color="secondary" onClick={handleGenerate} disabled={loading}>
                    {loading
                        ? "Generating..."
                        : `Generate Resume & Cover Letter (${totalTokens} Tokens)`}
                </ButtonUI>

                {resumeData && (
                    <ButtonUI
                        color="primary"
                        textColor="linkHover"
                        hoverColor="primary"
                        sx={{width: "100%"}}
                        onClick={async () => {
                            try {
                                const blob = await pdf(<ResumePDF avatar={avatar} data={resumeData}/>).toBlob();
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = getResumeFileName(resumeData, form.fullName);
                                a.click();
                                URL.revokeObjectURL(url);
                            } catch (error) {
                                console.error("❌ PDF generation error:", error);
                                showAlert("Failed to generate PDF file");
                            }
                        }}
                    >
                        📄 Download Resume (PDF)
                    </ButtonUI>
                )}

            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.options}>
                <div className={styles.textarea}>
                    <h3>
                        {loading ? "Your preview is preparing..." : "Preview"}
                    </h3>

                    {loading ? (
                        <div className={styles.loader}>
                            <div className={styles.spinner}></div>
                            <p>{currentPhrase}</p>
                        </div>
                    ) : resumeData ? (
                        <>
                            <PDFViewer
                                width="700"
                                height="900"
                                showToolbar
                                style={{border: "1px solid #ccc", borderRadius: 20}}
                            >
                                {MemoizedResume}
                            </PDFViewer>
                            <div className={styles.textarea}>
                                <h4>Your Generated Cover Letter</h4>
                                <Textarea
                                    value={coverLetter}
                                    minRows={3}
                                    maxRows={8}
                                />
                                <ButtonUI color="secondary" onClick={handleCopyCoverLetter}>
                                    Copy Cover Letter
                                </ButtonUI>
                            </div>
                            <div className={styles.textarea}>
                                <h4>Editable Resume Script</h4>
                                <Textarea
                                    value={editableJSON}
                                    minRows={12}
                                    maxRows={30}
                                    onChange={(e) => setEditableJSON(e.target.value)}
                                />
                                <ButtonUI color="secondary" onClick={handleUpdateResume}>
                                    Update Resume
                                </ButtonUI>
                            </div>
                        </>
                    ) : (
                        <p>Once generated, your resume will appear here.</p>
                    )}
                </div>
            </div>

            {/* 🧩 Avatar Crop Dialog */}
            <AvatarCropDialog
                open={openCrop}
                imageSrc={imageSrc}
                onClose={() => setOpenCrop(false)}
                onSave={(base64) => {
                    setAvatar(base64);
                    localStorage.setItem("resume_avatar", base64);
                }}
            />
        </div>
    );
}
