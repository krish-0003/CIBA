import React from "react";
import { Typography } from "@mui/material";

export const FormLabel = ({ children, required = false }) => (
  <Typography variant="subtitle1" gutterBottom>
    {children} {required && <span style={{ color: "red" }}>*</span>}
  </Typography>
);
