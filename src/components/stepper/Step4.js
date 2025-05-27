import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Step4 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Growth Strategy
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Short-term Goals (6-12 months)"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Long-term Goals (1-3 years)"
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
            <FormLabel component="legend">Growth Areas</FormLabel>
            <FormGroup
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <FormControlLabel
                control={<Checkbox size={isMobile ? "small" : "medium"} />}
                label="Market Expansion"
              />
              <FormControlLabel
                control={<Checkbox size={isMobile ? "small" : "medium"} />}
                label="Product Development"
              />
              <FormControlLabel
                control={<Checkbox size={isMobile ? "small" : "medium"} />}
                label="Digital Transformation"
              />
              <FormControlLabel
                control={<Checkbox size={isMobile ? "small" : "medium"} />}
                label="Strategic Partnerships"
              />
              <FormControlLabel
                control={<Checkbox size={isMobile ? "small" : "medium"} />}
                label="International Expansion"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Required Resources"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Risk Assessment"
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

export default Step4;
