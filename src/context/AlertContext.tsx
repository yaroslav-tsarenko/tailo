"use client";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/joy/Alert";
import { AlertColor } from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { Typography } from "@mui/joy";

type ShowAlertFn = (title: string, description?: string, severity?: AlertColor) => void;

interface AlertContextType {
    showAlert: ShowAlertFn;
}

export const AlertContext = React.createContext<AlertContextType>({
    showAlert: () => {},
});

export function useAlert() {
    return React.useContext(AlertContext);
}

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [severity, setSeverity] = React.useState<AlertColor>("info");

    const showAlert: ShowAlertFn = (title, description = "", severity = "info") => {
        setTitle(title);
        setDescription(description);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    const icons: Record<AlertColor, JSX.Element> = {
        success: <CheckCircleIcon sx={{ fontSize: 28 }} />,
        error: <ErrorIcon sx={{ fontSize: 28 }} />,
        warning: <WarningIcon sx={{ fontSize: 28 }} />,
        info: <InfoIcon sx={{ fontSize: 28 }} />,
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right",  }}
                sx={{color: "#fff"}}
            >
                <Alert
                    variant="soft"
                    color={severity}
                    sx={{
                        minWidth: "320px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                        background: "linear-gradient(180deg, #C7E8FFFF 0%, #F2C7FFFF 100%)",
                        color: "#fff",
                        alignItems: "flex-start",
                        backdropFilter: "blur(8px)",
                        animation: "slideIn 0.4s ease-out",
                        "@keyframes slideIn": {
                            from: { opacity: 0, transform: "translateY(-15px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
                        },
                    }}
                >
                    <div>
                        <Typography level="title-md" fontWeight={700}>
                            {title}
                        </Typography>
                        {description && (
                            <Typography level="body-sm" sx={{ opacity: 0.9, mt: 0.5 }}>
                                {description}
                            </Typography>
                        )}
                    </div>
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
