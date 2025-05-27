import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Step3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Market Analysis
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Target Market"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Main Competitors"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Unique Selling Points"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            sx={{
              width: "100%",
              "& .MuiFormLabel-root": {
                fontSize: isMobile ? "0.875rem" : "1rem",
              },
            }}
          >
            <FormLabel component="legend">Market Position</FormLabel>
            <RadioGroup
              row={!isMobile}
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <FormControlLabel
                value="leader"
                control={<Radio size={isMobile ? "small" : "medium"} />}
                label="Market Leader"
              />
              <FormControlLabel
                value="challenger"
                control={<Radio size={isMobile ? "small" : "medium"} />}
                label="Market Challenger"
              />
              <FormControlLabel
                value="follower"
                control={<Radio size={isMobile ? "small" : "medium"} />}
                label="Market Follower"
              />
              <FormControlLabel
                value="niche"
                control={<Radio size={isMobile ? "small" : "medium"} />}
                label="Niche Player"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Market Challenges"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step3;
