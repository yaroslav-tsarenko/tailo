"use client";
import React, { createContext, useContext, useState } from "react";

export interface ResumeData {
    header: {
        fullName: string;
        role: string;
        country: string;
        linkedinLink: string;
        portfolioLink: string;
        email: string;
    };
    summary: string;
    keywords: string[];
    technicalSkills: string[];
    experiences: {
        company: string;
        role: string;
        project: string;
        date: string;
        type: string;
        accomplishment: string[];
        languagesAndTechnologies: string[];
    }[];
    education: { university: string; speciality: string };
    languages: { name: string; level: string }[];
}

interface ResumeContextType {
    resumeData: ResumeData | null;
    setResumeData: (data: ResumeData) => void;
    coverLetter: string;
    setCoverLetter: (text: string) => void;
    avatar: string | null;
    setAvatar: (a: string | null) => void;
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <ResumeContext.Provider
            value={{ resumeData, setResumeData, coverLetter, setCoverLetter, avatar, setAvatar, loading, setLoading }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const ctx = useContext(ResumeContext);
    if (!ctx) throw new Error("useResume must be used within ResumeProvider");
    return ctx;
};
