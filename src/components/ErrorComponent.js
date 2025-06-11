import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorComponent = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <Box
      elevation={0}
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        textAlign: "center",
        mt: 4,
      }}
    >
      <ErrorIcon sx={{ fontSize: 48, mb: 2, color: "error.main" }} />
      <Typography variant="h6" gutterBottom color="error" sx={{ mb: 2 }}>
        {error.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
        {error.message}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          sx={{ minWidth: 200 }}
        >
          Try Again
        </Button>
        <Typography variant="body2" color="text.secondary">
          Still having issues?{" "}
          <Link
            href="mailto:riviereaisolutions@gmail.com"
            color="primary"
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            Contact Support
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorComponent;
