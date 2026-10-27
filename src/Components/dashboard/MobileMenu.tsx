
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Sidebar";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          width: 260,
          bgcolor: "#022c22",
          color: "#ffffff",
          borderRight: "1px solid #145c46",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label="Close navigation"
          sx={{
            color: "#d1fae5",
            "&:hover": { bgcolor: "#064e3b" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Sidebar />
    </Drawer>
  );
};

export default MobileMenu;
