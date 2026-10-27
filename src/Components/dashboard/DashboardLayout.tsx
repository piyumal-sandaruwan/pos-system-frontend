
import { useLocation, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";

const SIDEBAR_WIDTH = 232;

const DashboardLayout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("/customers")) return "Customers";
    if (path.includes("/products")) return "Products";
    if (path.includes("/orders")) return "Orders";

    return "Dashboard";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7f4",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main application area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          ml: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },
          transition: "margin 0.2s ease",
        }}
      >
        {/* Top header */}
        <Header title={getPageTitle()} />

        {/* Current route content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            width: "100%",
            boxSizing: "border-box",
            pt: {
              xs: 10,
              md: 10,
            },
            px: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
            pb: {
              xs: 3,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1600,
              mx: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
