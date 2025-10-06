import React from "react";
import Image from "next/image";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./Hero.module.scss";
import { media as mediaMap } from "@/resources/media";
import Link from "next/link";

export interface HeroButton {
    text: string;
    link: string;
    color?: "primary" | "secondary" | "tertiary";
}

export interface HeroProps {
    bgImage?: string | number;
    title?: string;
    description?: string;
    buttons?: HeroButton[];
}

function resolveMedia(key?: string | number) {
    if (key === undefined || key === null) return undefined;
    const value = (mediaMap as Record<string, any>)[String(key)];
    if (!value) return undefined;

    // handle next/image static imports
    if (typeof value === "object" && "src" in value) {
        return (value as any).src;
    }
    return value as string;
}

const Hero: React.FC<HeroProps> = ({ bgImage, title, description, buttons = [] }) => {
    const bgUrl = resolveMedia(bgImage);

    return (
        <section className={styles.hero}>
            {bgUrl && (
                <Image
                    src={bgUrl}
                    alt={title || "Hero background"}
                    fill
                    className={styles.bgImage}
                    priority
                />
            )}
            {/* Dark overlay */}
            <div className={styles.overlay} />

            <div className={styles.content}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {description && <p className={styles.description}>{description}</p>}
                <div className={styles.buttonGroup}>
                    {buttons.slice(0, 2).map((btn, idx) => (
                        <Link href={btn.link} key={idx} style={{width: "100%"}} className={styles.link}>
                            <ButtonUI
                                color={btn.color || "primary"}
                                sx={{display: "flex", width: "100%"}}
                            >
                                {btn.text}
                            </ButtonUI>
                        </Link>

                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
