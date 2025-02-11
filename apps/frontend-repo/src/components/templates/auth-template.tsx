"use client";

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      : "linear-gradient(135deg, #232741 0%, #1a1c2c 100%)",
}));

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 450,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  background: theme.palette.background.paper,
}));

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <>
      <CssBaseline />
      <StyledContainer>
        <Container>{children}</Container>
      </StyledContainer>
    </>
  );
}
