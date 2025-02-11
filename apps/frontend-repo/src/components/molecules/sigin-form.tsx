"use client";

import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SignInFormData, signinSchema } from "@/schemas/validation/auth.schema";

interface ISignInForm {
  onSubmit: (data: SignInFormData) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  isLoading: boolean;
}

export default function SignInForm({
  onSubmit,
  onGoogleLogin,
  isLoading,
}: ISignInForm) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = { email, password };
      signinSchema.parse(data);
      setValidationErrors({});
      await onSubmit(data);
    } catch (err: any) {
      if (err.errors) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error: any) => {
          const field = error.path[0];
          errors[field] = error.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Sign In
      </Typography>

      <FormControl fullWidth>
        <FormLabel>Email</FormLabel>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={isLoading}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Password</FormLabel>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!validationErrors.password}
          helperText={validationErrors.password}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={isLoading}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
        disabled={isLoading}
      >
        Sign In
      </Button>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          Continue with Google
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don't have an account?{" "}
        <Link href="/signup" color="primary">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}
