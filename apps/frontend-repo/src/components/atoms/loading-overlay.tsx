import { Box, CircularProgress, LinearProgress } from "@mui/material";

interface LoadingOverlayProps {
  children: React.ReactNode;
  isLoading: boolean;
  variant?: "linear" | "circular";
}

export const LoadingOverlay = ({
  children,
  isLoading,
  variant = "circular",
}: LoadingOverlayProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: variant === "linear" ? "100%" : "auto" }}>
            {variant === "linear" ? <LinearProgress /> : <CircularProgress />}
          </Box>
        </Box>
      )}
      {children}
    </Box>
  );
};
