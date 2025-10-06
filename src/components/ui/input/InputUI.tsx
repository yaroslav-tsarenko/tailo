import * as React from "react";
import Input, { InputProps } from "@mui/joy/Input";
import { useField } from "formik";
import Typography from "@mui/joy/Typography";
import styles from "./InputUI.module.scss";

type FormikInputProps = InputProps & {
    name: string;
    formik?: boolean;
    helperText?: React.ReactNode;
    label?: React.ReactNode;
};

const InputUI: React.FC<FormikInputProps> = ({ formik, helperText, label, ...props }) => {
    if (formik && props.name) {
        const [field, meta] = useField(props.name);
        const showError = !!meta.error && meta.touched;
        return (
            <>
                {label && (
                    <Typography >
                        {label}
                    </Typography>
                )}
                <Input
                    {...field}
                    {...props}
                    error={showError}
                />
                <Typography  color={showError ? "danger" : "neutral"}>
                    {showError ? meta.error : helperText}
                </Typography>
            </>
        );
    }
    return (
        <div className={styles.wrapper}>
            {label && (
                <Typography sx={{color: "#6b6b6b"}}>
                    {label}
                </Typography>
            )}
            <Input {...props}  />
            {helperText && (
                <Typography  color="neutral">
                    {helperText}
                </Typography>
            )}
        </div>
    );
};

export default InputUI;
