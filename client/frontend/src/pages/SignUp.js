import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function SignUp() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6) {
            setPasswordError("Şifre en az 6 karakter olmalıdır.");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <>
            <TextField label="Kullanıcı Adı" variant="outlined" color="secondary" />
            <br />
            <TextField label="Email" variant="outlined" color="secondary" /> <br />
            <TextField label="Şifre" type="password" variant="outlined" value={password} onChange={handlePasswordChange} error={passwordError !== ""} helperText={passwordError} color="secondary" /> <br />
            <TextField label="Şifre Tekrar" type="password" variant="outlined" value={confirmPassword} onChange={handleConfirmPasswordChange} error={password !== confirmPassword} helperText={password !== confirmPassword ? "Şifreler aynı değil!" : ""} color="secondary" /><br />
            <Button variant="contained" color="secondary" disabled={password.length < 6 || password !== confirmPassword}>
                Sign Up
            </Button>
        </>
    );
}

export default SignUp;
