"use client";
import {IoIosArrowDown} from "react-icons/io";
import React, {useState} from "react";
import styles from "./FAQ.module.scss";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({items}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.titles}>
                <h2>Got Questions?</h2>
                <h3>We've Got Answers</h3>
            </div>
            <div className={styles.faq}>
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={styles.item}
                        style={{
                            background: "#f7f7fa",
                            borderRadius: "14px",
                            boxShadow: openIndex === idx
                                ? "0 4px 24px rgba(0,127,255,0.10)"
                                : "0 2px 8px rgba(0,0,0,0.04)",
                            marginBottom: "0.1rem",
                            border: openIndex === idx
                                ? "1.5px solid #007FFF"
                                : "1px solid #eee",
                            transition: "box-shadow 0.3s, border 0.3s",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <button
                            className={styles.question}
                            onClick={() => toggle(idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-answer-${idx}`}
                            style={{
                                padding: "1.2rem 1.5rem",
                                borderRadius: "14px",
                                background: "none",
                                color: openIndex === idx ? "#007FFF" : "#222",
                                fontSize: "1.15rem",
                                fontWeight: 600,
                                boxShadow: openIndex === idx
                                    ? "0 2px 8px rgba(0,127,255,0.08)"
                                    : "none",
                                transition: "color 0.2s, box-shadow 0.2s",
                            }}
                        >
                            {item.question}
                            <span
                                className={openIndex === idx ? styles.arrowOpen : styles.arrow}
                                style={{
                                    color: openIndex === idx ? "#007FFF" : "#888",
                                    fontSize: "1.5rem",
                                }}
                            >
                                <IoIosArrowDown/>
                            </span>
                        </button>
                        <div
                            id={`faq-answer-${idx}`}
                            className={styles.answer}
                            style={{
                                maxHeight: openIndex === idx ? "400px" : "0",
                                opacity: openIndex === idx ? 1 : 0,
                                background: "#fff",
                                borderRadius: "0 0 14px 14px",
                                boxShadow: openIndex === idx
                                    ? "0 2px 8px rgba(0,127,255,0.04)"
                                    : "none",
                                padding: openIndex === idx ? "1rem 1.5rem" : "0 1.5rem",
                                transition:
                                    "max-height 0.5s cubic-bezier(0.4, 0.2, 0.2, 1), opacity 0.4s, padding 0.3s",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div className={styles.answerContent}>{item.answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
