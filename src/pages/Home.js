import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to CIBA
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Your intelligent business assistant
      </Typography>
    </Box>
  );
};

export default Home;
