
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { storage } from "../../utils/storage";

const SIDEBAR_WIDTH = 232;

interface SidebarProps {
  drawerMode?: boolean;
}

const Sidebar = ({ drawerMode = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = storage.getUser();
  const fullName = user?.fullName?.trim() || "User";
  const email = user?.email?.trim() || "";
  const initial = fullName.charAt(0).toUpperCase() || "U";

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      label: "Customers",
      path: "/dashboard/customers",
      icon: <GroupOutlinedIcon />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <Inventory2OutlinedIcon />,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <ReceiptLongOutlinedIcon />,
    },
  ];

  const handleLogout = () => {
    storage.clearAuth();
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        width: drawerMode ? "100%" : SIDEBAR_WIDTH,
        height: drawerMode ? "calc(100vh - 48px)" : "100vh",
        position: drawerMode ? "relative" : "fixed",
        left: 0,
        top: 0,
        bgcolor: "#022c22",
        color: "#ffffff",
        borderRight: "1px solid #145c46",
        display: drawerMode ? "flex" : { xs: "none", md: "flex" },
        flexDirection: "column",
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          minHeight: 84,
          px: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderBottom: "1px solid #145c46",
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#6ee7b7", lineHeight: 1 }}>
          SHOPZAy
        </Typography>

        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: 1.3,
            color: "#b6d4c7",
            mt: 0.7,
          }}
        >
          POINT OF SALE SYSTEM
        </Typography>
      </Box>

      <Box sx={{ px: 1.5, pt: 2.5, flex: 1 }}>
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: "#83aa98",
          }}
        >
          MENU
        </Typography>

        <List disablePadding>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 44,
                  mb: 0.6,
                  borderRadius: 2,
                  px: 1.3,
                  color: active ? "#ffffff" : "#c3d9cf",
                  bgcolor: active ? "#087653" : "transparent",
                  "&:hover": {
                    bgcolor: active ? "#087653" : "#064e3b",
                    color: "#ffffff",
                  },
                  "&.active": {
                    bgcolor: "#087653",
                    color: "#ffffff",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 13,
                      fontWeight: active ? 650 : 500,
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box>
        <Divider sx={{ borderColor: "#145c46" }} />

        <Box sx={{ px: 2, py: 1.8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#047857",
                color: "#ffffff",
                border: "1px solid #34d399",
                fontSize: 14,
                fontWeight: 650,
              }}
            >
              {initial}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 650,
                  color: "#ffffff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {fullName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#a9c8b9",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email || "POS User"}
              </Typography>
            </Box>
          </Box>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 40,
              px: 1,
              borderRadius: 2,
              color: "#c3d9cf",
              "&:hover": {
                bgcolor: "#4c1d1d",
                color: "#fecaca",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: 13,
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
