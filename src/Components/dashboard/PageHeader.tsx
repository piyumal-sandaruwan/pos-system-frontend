
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 21, sm: 24 },
            fontWeight: 750,
            color: "#102c24",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        <Typography sx={{ mt: 0.6, fontSize: 13, color: "#82938a" }}>
          {subtitle}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onButtonClick}
        sx={{
          minHeight: 42,
          px: 2.5,
          borderRadius: 2,
          textTransform: "none",
          fontSize: 14,
          fontWeight: 650,
          bgcolor: "#047857",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#065f46",
            boxShadow: "none",
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default PageHeader;
