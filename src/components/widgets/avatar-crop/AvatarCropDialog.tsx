"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Slider,
    Button,
    Typography,
} from "@mui/material";
import Cropper from "react-easy-crop";
import styles from "./AvatarCropDialog.module.scss";

export interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface AvatarCropDialogProps {
    open: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onSave: (croppedBase64: string) => void;
}

export default function AvatarCropDialog({
                                             open,
                                             imageSrc,
                                             onClose,
                                             onSave,
                                         }: AvatarCropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const onCropComplete = (_: any, croppedPixels: CroppedArea) =>
        setCroppedAreaPixels(croppedPixels);

    // ✂️ Crop and compress image to <= 50KB
    const getCroppedImg = (imageSrc: string, cropPixels: CroppedArea): Promise<string> =>
        new Promise((resolve) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = cropPixels.width;
                canvas.height = cropPixels.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                ctx.drawImage(
                    image,
                    cropPixels.x,
                    cropPixels.y,
                    cropPixels.width,
                    cropPixels.height,
                    0,
                    0,
                    cropPixels.width,
                    cropPixels.height
                );

                let quality = 0.92;
                let base64 = canvas.toDataURL("image/jpeg", quality);

                // 🧠 compress iteratively until < 50KB
                while (base64.length / 1024 > 50 && quality > 0.4) {
                    quality -= 0.05;
                    base64 = canvas.toDataURL("image/jpeg", quality);
                }

                resolve(base64);
            };
        });

    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            setPreview(croppedImg);
            onSave(croppedImg);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    padding: "20px 16px 10px",
                    color: "#111",
                }}
            >
                ✨ Upload & Crop Your Avatar
            </DialogTitle>

            <DialogContent className={styles.dialogContainer}>
                <div className={styles.cropArea}>
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    )}
                </div>

                <div className={styles.controls}>
                    {preview && (
                        <>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginBottom: "4px" }}
                            >
                                Preview:
                            </Typography>
                            <img src={preview} alt="Preview" className={styles.preview} />
                        </>
                    )}

                    <Typography variant="body2" color="text.secondary">
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(_, val) => setZoom(val as number)}
                    />

                    <div className={styles.buttons}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                background: "linear-gradient(90deg, #0070f3, #00c6ff)",
                                borderRadius: "10px",
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0 4px 14px rgba(0,112,243,0.25)",
                                ":hover": {
                                    background: "linear-gradient(90deg, #005ac1, #00aaff)",
                                },
                            }}
                        >
                            Save Avatar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                borderColor: "#ccc",
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
