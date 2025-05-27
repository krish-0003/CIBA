import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Step2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Financial Details
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Annual Revenue"
            type="number"
            size={isMobile ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Operating Expenses"
            type="number"
            size={isMobile ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Number of Employees"
            type="number"
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Tax ID"
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Financial Notes"
            multiline
            rows={isMobile ? 3 : 4}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
