"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Textarea, Button, Card, Typography } from "@mui/joy";
import Confetti from "react-confetti";
import styles from "./ContactUsForm.module.scss";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import InputUI from "@/components/ui/input/InputUI";

const ContactUsForm = () => {
    const { showAlert } = useAlert();
    const [showConfetti, setShowConfetti] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (
        values: typeof initialValues,
        {
            setSubmitting,
            resetForm,
        }: {
            setSubmitting: (isSubmitting: boolean) => void;
            resetForm: () => void;
        }
    ) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSuccessMsg("✅ Thanks! Your message has been sent successfully!");
            setShowConfetti(true);
            showAlert("Success", "Your request has been sent!", "success");
            setTimeout(() => setShowConfetti(false), 4000);
        } catch {
            showAlert("Error", "Failed to send. Please try again.", "error");
        }
        setSubmitting(false);
    };

    return (
        <div className={styles.contactWrapper}>
            {showConfetti && <Confetti />}
            <Card className={styles.contactCard}>
                {successMsg ? (
                    <div className={styles.successMsg}>{successMsg}</div>
                ) : (
                    <>
                        <Typography level="h2" className={styles.formTitle}>
                            Get in Touch ✨
                        </Typography>
                        <Typography level="body-md" className={styles.formDesc}>
                            We’d love to hear from you. Fill in your details and our team will get back shortly.
                        </Typography>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form className={styles.form}>
                                    <div className={styles.formGroupRow}>
                                        <Field name="name" >
                                            {({ field }: { field: any }) => (
                                                <InputUI
                                                    {...field}
                                                    label="First Name"
                                                    placeholder="First Name"
                                                    error={touched.name && errors.name ? errors.name : ""}
                                                />
                                            )}
                                        </Field>

                                        <Field name="secondName">
                                            {({ field }: { field: any }) => (
                                                <InputUI
                                                    {...field}
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    error={
                                                        touched.secondName && errors.secondName
                                                            ? errors.secondName
                                                            : ""
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>

                                    <Field name="email">
                                        {({ field }: { field: any }) => (
                                            <InputUI
                                                {...field}
                                                type="email"
                                                label="Email Address"
                                                placeholder="Email Address"
                                                error={touched.email && errors.email ? errors.email : ""}
                                            />
                                        )}
                                    </Field>

                                    <Field name="phone">
                                        {({ field }: { field: any }) => (
                                            <InputUI
                                                {...field}
                                                type="tel"
                                                label="Phone Number"
                                                placeholder="Phone Number"
                                                error={touched.phone && errors.phone ? errors.phone : ""}
                                            />
                                        )}
                                    </Field>

                                    <Field name="message">
                                        {({ field }: { field: any }) => (
                                            <Textarea
                                                {...field}
                                                minRows={4}
                                                placeholder="Your Message"
                                                className={styles.textarea}
                                            />
                                        )}
                                    </Field>

                                    <Button
                                        type="submit"
                                        loading={isSubmitting}
                                        className={styles.submitBtn}
                                    >
                                        Send Message
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </Card>
        </div>
    );
};

export default ContactUsForm;
