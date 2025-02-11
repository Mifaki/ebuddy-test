"use client";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { loginFailure, loginStart, loginSuccess } from "@/store/authSlice";
import { useEffect, useState } from "react";

import { AuthStatus } from "../atoms/auth-status";
import { Container } from "@mui/material";
import { LoadingOverlay } from "../atoms/loading-overlay";
import LoginForm from "../molecules/sigin-form";
import { SignInFormData } from "@/schemas/validation/auth.schema";
import { auth } from "@/config/firebase";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/navigation";

export default function SignInContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "succeeded" && user) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, user, router]);

  const handleEmailLogin = async (data: SignInFormData) => {
    try {
      dispatch(loginStart());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(
        loginSuccess({
          email: userCredential.user.email!,
          uid: userCredential.user.uid,
        })
      );
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during login";
      dispatch(loginFailure(errorMessage));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(loginStart());
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      dispatch(
        loginSuccess({
          email: userCredential.user.email!,
          uid: userCredential.user.uid,
        })
      );
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign in with Google";
      dispatch(loginFailure(errorMessage));
    }
  };

  const isLoading = status === "loading";

  return (
    <LoadingOverlay isLoading={isLoading}>
      <Container
        maxWidth="sm"
        style={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <AuthStatus />
        <LoginForm
          onSubmit={handleEmailLogin}
          onGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
        />
      </Container>
    </LoadingOverlay>
  );
}
