import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: "error.main",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {error.status === 404
              ? "404 - Page Not Found"
              : "Oops! Something went wrong"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {error.status === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : error.message || "An unexpected error occurred."}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 4,
              py: 1,
            }}
          >
            Go Back Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage;
