import {
    GoogleFont,
    ButtonColor,
    HeaderType,
    HeaderScrollMode,
    SideBarDirection,
    FooterType,
    FooterLogoAlign,
    HoverEffect,
    CardVariant,
    CardLabel,
} from "./types";

// Шрифти
export const googleFonts: GoogleFont[] = [
    { name: "Roboto", css: "'Roboto', sans-serif", url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" },
    { name: "Inter", css: "'Inter', sans-serif", url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" },
    { name: "Montserrat", css: "'Montserrat', sans-serif", url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" },
    { name: "Poppins", css: "'Poppins', sans-serif", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" },
    { name: "Open Sans", css: "'Open Sans', sans-serif", url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap" },
];

export const currentFontIndex = 1;
export const currentFont = googleFonts[currentFontIndex];

// Кольори для кнопок
export const buttonColors: Record<ButtonColor, string> = {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    tertiary: "var(--tertiary-color)",
    quaternary: "var(--quaternary-color)",
    success: "var(--success-color)",
    warning: "var(--warning-color)",
    danger: "var(--error-color)",
    info: "var(--info-color)",
    text: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    inverse: "var(--text-inverse)",
    hover: "var(--button-hover)",
    link: "var(--link-color)",
    linkHover: "var(--link-hover)",
    backgroundLight: "var(--background-light)",
    backgroundDark: "var(--background-dark)",
    surface: "var(--surface-color)",
    surfaceMuted: "var(--surface-muted)",
    border: "var(--border-color)",
    shadow: "var(--shadow-color)",
};

// Header
export const headerStyles = {
    type: "sticky" as HeaderType,
    sideBarDirection: "left" as SideBarDirection,
    linkColor: "var(--text-primary)",
    linkHoverColor: "var(--link-hover)",
    scrollMode: "blur" as HeaderScrollMode,
    scrollBackground: "var(--primary-color)",
    scrollBlur: "50px",
};

// Drawer
export const drawerConfig = {
    anchor: "top" as SideBarDirection,
    width: "100%",
    padding: "20px",
    logoWidth: 120,
    logoHeight: 30,
    contentGap: "40px",
    navGap: "20px",
    contentAlign: "flex-start" as "flex-start" | "center" | "space-between" | "flex-end",
};

// Footer
export const footerStyles = {
    type: "mega" as FooterType,
    showTopBorder: true,
    showBottomBorder: true,
    maxWidth: 1440,
    paddings: { x: 40, y: 32 },
    gap: 20,
    columnsGap: 50,
    logo: { width: 340, height: 50, align: "start" as FooterLogoAlign },
    colors: {
        bg: "var(--primary-color)",
        title: "var(--text-primary)",
        text: "var(--secondary-color)",
        muted: "var(--text-inverse)",
        border: "var(--border-color)",
        link: "var(--text-inverse)",
        linkHover: "var(--text-gray)",
        contactLabel: "var(--background-dark)",
        contactHover: "var(--quaternary-color)",
        socialHover: "var(--background-dark)",
    },
    grid: { colsXL: 1, colsLG: 3, colsMD: 2, colsSM: 1 },
    font: { size: 16, legalSize: 20 },
    sizes: {
        titles: { xl: 22, lg: 20, md: 18, sm: 18 },
        links: { xl: 20, lg: 18, md: 16, sm: 16 },
        icons: { xl: 30, lg: 25, md: 20, sm: 18 },
    },
    radius: "0 0 0 0",
    shadow: "none",
};

// Hover effects
export const hoverEffects: Record<HoverEffect, { transform: string; shadow: string }> = {
    none: { transform: "none", shadow: "none" },
    shadow: { transform: "translateY(-6px)", shadow: "0 12px 28px rgba(0,0,0,0.18)" },
    lift: { transform: "translateY(-12px)", shadow: "0 16px 32px rgba(0,0,0,0.22)" },
    glow: { transform: "scale(1.03)", shadow: "0 0 25px rgba(74,144,226,0.7), 0 0 40px rgba(74,144,226,0.4)" },
    tilt: { transform: "rotate3d(1,1,0,6deg) scale(1.02)", shadow: "0 18px 30px var(--primary-color)" },
};

// Card variants
export const cardVariants: Record<CardVariant, {
    border: string;
    background: string;
    hover: HoverEffect;
    label?: CardLabel;
}> = {
    basic: {
        border: "2px solid var(--border-color)",
        background: "var(--background-light)",
        hover: "shadow",
    },
    highlight: {
        border: "2px solid var(--primary-color)",
        background: "var(--surface-muted)",
        hover: "shadow",
        label: {
            text: "⭐ Best Choice",
            bg: "linear-gradient(135deg, #ff9800, #ff5722)",
            color: "#fff",
        },
    },
    premium: {
        border: "2px solid var(--warning-color)",
        background: "linear-gradient(135deg, #fffaf0, #fffbeb)",
        hover: "shadow",
        label: {
            text: "🔥 Premium",
            bg: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#fff",
        },
    },
};
