import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Theme-based styling constants
export const themeStyles = {
  // Typography
  titleFontSize: { xs: "1.1rem", sm: "1.25rem" },
  subtitleFontSize: { xs: "1rem", sm: "1.1rem" },
  bodyFontSize: { xs: "0.9rem", sm: "1rem" },
  smallFontSize: { xs: "0.8rem", sm: "0.875rem" },

  // Spacing
  sectionPadding: 1.5,
  cardPadding: 1.5,
  contentPadding: 1,

  // Colors
  primaryGradient: {
    primary: "rgba(64, 156, 255, 0.15)",
    secondary: "rgba(88, 86, 214, 0.12)",
    tertiary: "rgba(138, 43, 226, 0.08)",
  },
  accentGradient: {
    primary: "rgba(64, 156, 255, 0.8)",
    secondary: "rgba(88, 86, 214, 0.7)",
    tertiary: "rgba(138, 43, 226, 0.6)",
  },
  borderGradient: {
    primary: "rgba(64, 156, 255, 0.2)",
    secondary: "rgba(88, 86, 214, 0.15)",
    tertiary: "rgba(138, 43, 226, 0.1)",
  },
  highlightGradient: {
    primary: "rgba(64, 156, 255, 0.3)",
    secondary: "rgba(88, 86, 214, 0.25)",
    tertiary: "rgba(138, 43, 226, 0.2)",
  },

  // Common styles
  cardStyle: {
    borderRadius: 2,
    backgroundColor: alpha("#FFFFFF", 0.04),
    border: "1px solid",
    borderColor: "primary.light",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      borderColor: "primary.main",
    },
  },

  chipStyle: {
    borderRadius: "16px",
    borderWidth: "2px",
    fontSize: { xs: "0.8rem", sm: "0.875rem" },
  },

  largeChipStyle: {
    borderRadius: "24px",
    backgroundColor: "white",
    color: "primary.main",
    border: "2px solid",
    borderColor: "primary.main",
    fontSize: "1.1rem",
    fontWeight: 600,
    height: "48px",
    px: 2,
    "& .MuiChip-icon": {
      color: "primary.main",
      fontSize: "1.5rem",
    },
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#000000",
    },
    success: {
      main: "#2e7d32",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
