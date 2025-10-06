"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signInValidation,
    signInInitialValues,
    signInOnSubmit
} from "@/validationSchemas/sign-in/schema";
import FormUI from "@/components/ui/form/FormUI";
import { useI18n } from "@/context/i18nContext";

export type SignInValues = { email: string; password: string };

const translations = {
    en: {
        title: "Sign In",
        description: "Welcome back! Please enter your details.",
        email: "Email",
        password: "Password",
        submit: "Sign In",
    },
    tr: {
        title: "Giriş Yap",
        description: "Tekrar hoş geldiniz! Lütfen bilgilerinizi girin.",
        email: "E-posta",
        password: "Şifre",
        submit: "Giriş Yap",
    }
};

export default function SignInPage() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const { lang } = useI18n();
    const t = translations[lang] || translations.en;

    return (
        <Formik<SignInValues>
            initialValues={signInInitialValues}
            validate={signInValidation}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<SignInValues>) =>
                signInOnSubmit(values, { setSubmitting }, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title={t.title}
                    description={t.description}
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "email", type: "email", placeholder: t.email , label: "Email"},
                        { name: "password", type: "password", placeholder: t.password, label: "Password" }
                    ]}
                    submitLabel={t.submit}
                />
            )}
        </Formik>
    );
}
