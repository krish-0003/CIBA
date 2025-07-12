import React from "react";

import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Step0 = ({ onNext }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 3, textAlign: "center" }}
      >
        {" "}
        Welcome to RIV AI Business Automation Tool
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: "800px", mx: "auto", lineHeight: 1.6 }}
      >
        This is a tool built to help you identify where you can add automations
        to your business or work. All you have to do is provide insights
        tailored to your industry, and it highlights opportunities to save time
        and reduce costs with innovative automation solutions.
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: "800px", mx: "auto", lineHeight: 1.6 }}
      >
        While the tool offers valuable suggestions, it's important to note that
        these are not exhaustive. For a comprehensive analysis and tailored
        implementation, further exploration may be needed to uncover additional
        opportunities. This is meant to provoke thought and inspiration. It is
        strongly advised that you consult an expert at RIV AI to verify these
        recommendations.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={onNext}
        color="success"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: "1.1rem",
          borderRadius: 2,
          textTransform: "none",
          boxShadow: 3,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Step0;
