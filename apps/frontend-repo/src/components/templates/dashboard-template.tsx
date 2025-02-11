import { Box, Stack } from "@mui/material";

import SideMenu from "../molecules/side-menu";

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Box component="main">
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            my: 4,
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardTemplate;
