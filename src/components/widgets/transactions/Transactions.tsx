"use client";
import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTransactions } from "@/context/TransactionContext";
import styles from "./Transactions.module.scss";

const translations = {
    en: {
        title: "My Transactions",
        empty: "No transactions yet.",
        add: "Add Funds",
        spend: "Spent",
        charge: (type: string, amount: number) =>
            `${amount} Tokens`,
    },
};

const Transactions: React.FC = () => {
    const { transactions, loading } = useTransactions();
    const t = translations.en;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }) + " " + date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatId = (id: string) => id.slice(-6);

    return (
        <Box className={styles.transactionsSection}>
            <Typography level="h3" sx={{ mb: 2, fontWeight: 700 }}>
                {t.title}
            </Typography>
            {loading ? (
                <Typography level="body-md" sx={{ color: "#777" }}>
                    Loading...
                </Typography>
            ) : transactions.length === 0 ? (
                <Typography level="body-md" sx={{ color: "#777" }}>
                    {t.empty}
                </Typography>
            ) : (
                <Box sx={{ display: "grid", gap: 2 }}>
                    {transactions.map((tx) => (
                        <Card
                            key={tx._id}
                            variant="outlined"
                            sx={{
                                borderRadius: 12,
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                transition: "box-shadow 0.2s",
                                "&:hover": {
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                                },
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Avatar variant="soft" size="sm">
                                        {tx.type === "add" ? (
                                            <AddIcon fontSize="small" />
                                        ) : (
                                            <RemoveIcon fontSize="small" />
                                        )}
                                    </Avatar>
                                    <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                        #{formatId(tx._id)}
                                    </Typography>
                                </Box>
                                <Chip
                                    color={tx.type === "add" ? "success" : "danger"}
                                    variant="soft"
                                    startDecorator={tx.type === "add" ? <AddIcon fontSize="small" /> : <RemoveIcon fontSize="small" />}
                                >
                                    {t.charge(tx.type, tx.amount)}
                                </Chip>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <EmailIcon fontSize="small" sx={{ color: "#0070f3" }} />
                                <Typography level="body-sm">{tx.email}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarMonthIcon fontSize="small" sx={{ color: "#666" }} />
                                <Typography level="body-xs" sx={{ color: "#666" }}>
                                    {formatDate(tx.createdAt)}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Transactions;