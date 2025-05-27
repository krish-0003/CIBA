import React, { useState, useEffect } from "react";
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
import { FormLabel } from "../../utils/formComponents";

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

  // Initialize local state
  const [selectedIndustry, setSelectedIndustry] = useState({
    value: formData.step1?.industry || "",
    display:
      industryOptions.find((opt) => opt.value === formData.step1?.industry)
        ?.display || "",
  });

  const [isBlurred, setIsBlurred] = useState(false);

  // Update form context whenever selected industry changes
  useEffect(() => {
    const isValid = Boolean(selectedIndustry.value);
    updateFormData("step1", {
      industry: selectedIndustry.value,
      isValid,
      isComplete: isValid,
    });
  }, [selectedIndustry]);

  const handleIndustryChange = (event) => {
    const selectedOption = industryOptions.find(
      (option) => option.display === event.target.value
    );

    setSelectedIndustry({
      display: event.target.value,
      value: selectedOption?.value || "",
    });
  };

  const handleBlur = () => {
    setIsBlurred(true);
  };

  const hasError = isBlurred && !selectedIndustry.value;
  const errorMessage = hasError ? "Please select an industry" : "";

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Business Information
      </Typography>
      <Grid container spacing={{ xs:0, sm:0 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormLabel required>What Industry are you in?</FormLabel>
          <TextField
            required
            fullWidth
            select
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            value={selectedIndustry.display}
            onChange={handleIndustryChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={errorMessage}
          >
            {industryOptions.map((option) => (
              <MenuItem key={option.value} value={option.display}>
                {option.display}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
