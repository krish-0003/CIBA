import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoaderComponent = () => {
  return (
    <Box display="flex" justifyContent="center" my={4}>
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;
