
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { storage } from "../../utils/storage";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

const SIDEBAR_WIDTH = 232;

const Header = ({ title = "Dashboard" }: HeaderProps) => {
  const navigate = useNavigate();
  const user = storage.getUser();

  const fullName = user?.fullName?.trim() || "User";
  const email = user?.email?.trim() || "";
  const initial = fullName.charAt(0).toUpperCase() || "U";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    storage.clearAuth();
    handleMenuClose();
    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#102c24",
        borderBottom: "1px solid #e5eee8",
        width: { xs: "100%", md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "68px !important",
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 19, sm: 22 },
              fontWeight: 750,
              lineHeight: 1.2,
              color: "#102c24",
            }}
          >
            {title}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "#82938a", mt: 0.4 }}>
            Manage your business easily
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <Box
            sx={{
              textAlign: "right",
              mr: 1.3,
              display: { xs: "none", sm: "block" },
              maxWidth: 180,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 650,
                color: "#102c24",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {fullName}
            </Typography>

            {email && (
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#82938a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email}
              </Typography>
            )}
          </Box>

          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#064e3b",
                color: "#fff",
                fontSize: 15,
                fontWeight: 650,
                border: "2px solid #d1fae5",
              }}
            >
              {initial}
            </Avatar>
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 0.3, color: "#648075" }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: 2.5,
              border: "1px solid #e5eee8",
              boxShadow: "0 12px 32px rgba(6, 78, 59, 0.10)",
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#064e3b",
                fontSize: 15,
                fontWeight: 650,
              }}
            >
              {initial}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 650, color: "#102c24" }}>
                {fullName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#82938a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#e5eee8" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            px: 2,
            gap: 1,
            color: "#b91c1c",
            fontSize: 14,
            "&:hover": { bgcolor: "#fef2f2" },
          }}
        >
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
