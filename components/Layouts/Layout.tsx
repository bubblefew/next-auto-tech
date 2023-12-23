import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Layouts/Header";
import Menu from "@/components/Layouts/Menu";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = React.useState(() => {
    // Get the value from local storage, or default to false
    return JSON.parse(localStorage.getItem("drawerOpen") || "false");
  });

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // Update local storage when the state changes
    localStorage.setItem("drawerOpen", JSON.stringify(open));
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} onDrawerOpen={() => setOpen(true)} />
      <Menu open={open} onDrawerClose={handleCloseDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
