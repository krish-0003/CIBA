import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";

// Industry options with frontend display and backend mapping
const industryOptions = [
  { display: "Law", value: "LAW" },
  { display: "Healthcare", value: "HEALTHCARE" },
  { display: "Real Estate", value: "REAL_ESTATE" },
  { display: "Accounting", value: "ACCOUNTING" },
  { display: "Human Resources", value: "HR" },
  { display: "Industrial", value: "INDUSTRIAL" },
  { display: "Insurance", value: "INSURANCE" },
  { display: "Logistics and Transportation", value: "LOGISTICS" },
  { display: "Manufacturing", value: "MANUFACTURING" },
  { display: "Restaurant", value: "RESTAURANT" },
  { display: "Retail and E-commerce", value: "RETAIL" },
  { display: "Travel", value: "TRAVEL" },
];

const Step1 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();
  const stepData = formData.step1 || {};

  // Special handler for industry to store backend value
  const handleIndustryChange = (event) => {
    const selectedOption = industryOptions.find(
      (option) => option.display === event.target.value
    );
    updateFormData("step1", {
      ...stepData,
      industry: selectedOption ? selectedOption.value : "",
      industryDisplay: event.target.value,
    });
  };

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Business Information
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <TextField
          required
          fullWidth
          select
          label="What Industry are you in?"
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={stepData.industryDisplay || ""}
          onChange={handleIndustryChange}
        >
          {industryOptions.map((option) => (
            <MenuItem key={option.display} value={option.display}>
              {option.display}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Box>
  );
};

export default Step1;
