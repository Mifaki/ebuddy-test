import { Alert } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";

export const AuthStatus = () => {
  const { status, error } = useAppSelector((state) => state.auth);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (status === "succeeded") {
    return <Alert severity="success">Successfully logged in!</Alert>;
  }

  return null;
};
