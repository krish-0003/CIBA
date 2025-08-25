import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel as MuiFormLabel,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Autocomplete,
  IconButton,
  Tooltip,
  Divider,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { FormLabel } from "../../utils/formComponents";
import { commonTools } from "../../utils/commonData";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Step3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Initialize state with form context data
  const [businessState, setBusinessState] = useState({
    description: formData.step3?.description || "",
    employeeCount: formData.step3?.employeeCount || null,
    hasSpecificTasks: formData.step3?.hasSpecificTasks ?? false,
    isBlurred: false,
  });

  const [techStackState, setTechStackState] = useState({
    tools: formData.step3?.tools || [],
    isBlurred: false,
  });

  const employeeRanges = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1000+", label: "1000+ employees" },
  ];

  // Update form context whenever states change
  useEffect(() => {
    const isBusinessValid = businessState.description.trim() !== "";
    updateFormData("step3", {
      description: businessState.description,
      employeeCount: businessState.employeeCount,
      hasSpecificTasks: businessState.hasSpecificTasks,
      isValid: isBusinessValid,
      isComplete: isBusinessValid,
      ...techStackState,
    });
  }, [businessState, techStackState]);

  const handleBusinessChange = (field) => (e) => {
    setBusinessState((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleBlur = (field) => () => {
    setBusinessState((prev) => ({
      ...prev,
      isBlurred: true,
    }));
  };

  const getDescriptionError = () => {
    if (businessState.isBlurred && !businessState.description.trim()) {
      return "Please answer all the required questions";
    }
    return "";
  };

  const handleToolsChange = (event, newValue) => {
    setTechStackState((prev) => ({
      ...prev,
      tools: newValue,
    }));
  };

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        {" "}
        Tell us about your business and technology needs
      </Typography>

      <Grid container spacing={{ xs: 0, sm: 0 }}>
        {/* Combined Business Questions Section */}
        <Grid item xs={12}>
          <Box elevation={0}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Business Overview
              <Tooltip title="Help us understand your business better to provide relevant AI solutions">
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Tooltip>
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <FormLabel required>
                  Briefly describe your business, the main challenges you face,
                  and where your team uses software in daily operations.
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={7}
                  maxRows={12}
                  value={businessState.description}
                  onChange={handleBusinessChange("description")}
                  onBlur={handleBlur("description")}
                  size={isMobile ? "small" : "medium"}
                  placeholder={
                    `Example: ` +
                    `We run a small business selling products online. Our main challenge is keeping track of orders and inventory. Our team uses spreadsheets and email to manage daily tasks.`
                  }
                  error={!!getDescriptionError()}
                  helperText={getDescriptionError()}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Employee Count Section */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ my: 2 }}>
          <FormLabel>How many employees work in your organization?</FormLabel>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <Select
              value={businessState.employeeCount}
              onChange={handleBusinessChange("employeeCount")}
              displayEmpty
              placeholder="Select employee range"
            >
              <MenuItem value="" disabled>
                Select employee range
              </MenuItem>
              {employeeRanges.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* Tech Stack Section - All full width */}
      <Grid item xs={12}>
        <Box elevation={0}>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Your Technology Environment
            <Tooltip title="Understanding your tech stack helps us identify AI integration opportunities">
              <InfoOutlinedIcon fontSize="small" color="action" />
            </Tooltip>
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel>Select the tools your team uses daily</FormLabel>
              <Autocomplete
                multiple
                freeSolo
                options={commonTools}
                value={techStackState.tools}
                onChange={handleToolsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Start typing to search or select tools..."
                    size={isMobile ? "small" : "medium"}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      size={isMobile ? "small" : "medium"}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Step3;
