"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";
import { useI18n } from "@/context/i18nContext";

export type SignUpValues = { name: string; email: string; password: string };

const translations = {
    en: {
        title: "Sign Up",
        description: "Create your account",
        name: "Name",
        email: "Email",
        password: "Password",
        submit: "Sign Up",
    },
    tr: {
        title: "Kayıt Ol",
        description: "Hesabınızı oluşturun",
        name: "İsim",
        email: "E-posta",
        password: "Şifre",
        submit: "Kayıt Ol",
    }
};

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const { lang } = useI18n();
    const t = translations[lang] || translations.en;

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<SignUpValues>) =>
                signUpOnSubmit(values, { setSubmitting }, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title={t.title}
                    description={t.description}
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "name", type: "text", placeholder: t.name, label: "Your Name" },
                        { name: "email", type: "email", placeholder: t.email, label: "Your Email" },
                        { name: "password", type: "password", placeholder: t.password, label: "Your Very Strong Password ;)" }
                    ]}
                    submitLabel={t.submit}
                />
            )}
        </Formik>
    );
}
