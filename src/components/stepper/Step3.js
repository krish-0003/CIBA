import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel as MuiFormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
    painPoints: formData.step3?.painPoints || [""],
    softwareInteractions: formData.step3?.softwareInteractions || "",
    isBlurred: {
      description: false,
      painPoints: false,
    },
  });

  const [techStackState, setTechStackState] = useState({
    tools: formData.step3?.tools || [],
    hasSpecificTasks: formData.step3?.hasSpecificTasks ?? true,
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
    const isBusinessValid =
      businessState.description.trim() !== "" &&
      businessState.painPoints.some((point) => point.trim() !== "");

    updateFormData("step3", {
      ...businessState,
      ...techStackState,
      isValid: isBusinessValid,
      isComplete: isBusinessValid,
    });
  }, [businessState, techStackState]);

  const handleBusinessChange = (field) => (e) => {
    setBusinessState((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlePainPointChange = (index) => (e) => {
    const newPainPoints = [...businessState.painPoints];
    newPainPoints[index] = e.target.value;
    setBusinessState((prev) => ({
      ...prev,
      painPoints: newPainPoints,
    }));
  };

  const addPainPoint = () => {
    setBusinessState((prev) => ({
      ...prev,
      painPoints: [...prev.painPoints, ""],
    }));
  };

  const removePainPoint = (index) => () => {
    setBusinessState((prev) => ({
      ...prev,
      painPoints: prev.painPoints.filter((_, i) => i !== index),
    }));
  };

  const handleToolsChange = (event, newValue) => {
    setTechStackState((prev) => ({
      ...prev,
      tools: newValue,
    }));
  };

  const handleBlur = (field) => () => {
    setBusinessState((prev) => ({
      ...prev,
      isBlurred: {
        ...prev.isBlurred,
        [field]: true,
      },
    }));
  };

  // Error messages
  const getDescriptionError = () => {
    if (
      businessState.isBlurred.description &&
      !businessState.description.trim()
    ) {
      return "Please describe your business";
    }
    return "";
  };

  const getPainPointsError = () => {
    if (
      businessState.isBlurred.painPoints &&
      !businessState.painPoints.some((point) => point.trim())
    ) {
      return "Please add at least one business challenge";
    }
    return "";
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
        {/* Business Description Section */}
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
                <FormLabel required>What does your business do?</FormLabel>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={6}
                  value={businessState.description}
                  onChange={handleBusinessChange("description")}
                  onBlur={handleBlur("description")}
                  size={isMobile ? "small" : "medium"}
                  placeholder="e.g., We are a manufacturing company that produces automotive parts..."
                  error={!!getDescriptionError()}
                  helperText={getDescriptionError()}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormLabel>
                  How many employees work in your organization?
                </FormLabel>
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

              {/* Second row - full width */}
              <Grid size={{ xs: 12, md: 12 }}>
                <FormLabel required>
                  What are your main business challenges?
                </FormLabel>
                {businessState.painPoints.map((point, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <TextField
                      required
                      fullWidth
                      placeholder={`Challenge ${
                        index + 1
                      }: e.g., Manual data entry is time-consuming...`}
                      value={point}
                      onChange={handlePainPointChange(index)}
                      onBlur={handleBlur("painPoints")}
                      size={isMobile ? "small" : "medium"}
                      error={!!getPainPointsError()}
                      helperText={index === 0 ? getPainPointsError() : ""}
                    />
                    {index > 0 && (
                      <IconButton
                        onClick={removePainPoint(index)}
                        color="error"
                        size={isMobile ? "small" : "medium"}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={addPainPoint}
                  sx={{ mt: 1 }}
                >
                  Add Another Challenge
                </Button>
              </Grid>

              {/* Third row - full width */}
              <Grid size={{ xs: 12, md: 12 }}>
                <FormLabel>
                  Where do your employees interact with software?
                </FormLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={6}
                  value={businessState.softwareInteractions}
                  onChange={handleBusinessChange("softwareInteractions")}
                  onBlur={handleBlur("softwareInteractions")}
                  size={isMobile ? "small" : "medium"}
                  placeholder="e.g., Customer service team uses CRM, Sales team uses ERP..."
                />
              </Grid>
            </Grid>
          </Box>
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
              <Grid size={{ xs: 12, md: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  How do you feel about AI in your business?
                </Typography>
                <RadioGroup
                  row={!isMobile}
                  value={techStackState.hasSpecificTasks}
                  onChange={(e) =>
                    setTechStackState((prev) => ({
                      ...prev,
                      hasSpecificTasks: e.target.value === "true",
                    }))
                  }
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio size={isMobile ? "small" : "medium"} />}
                    label="I have specific tasks I'd like to automate"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio size={isMobile ? "small" : "medium"} />}
                    label="I'm not sure where AI could help"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step3;
