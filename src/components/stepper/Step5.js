import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Step5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Update form context to mark step as valid
  useEffect(() => {
    updateFormData("step5", {
      isValid: true,
      isComplete: true,
    });
  }, []);

  const renderSection = (title, tooltip, content) => (
    <Grid item xs={12}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {title}
          <Tooltip title={tooltip}>
            <InfoOutlinedIcon fontSize="small" color="action" />
          </Tooltip>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );

  const renderBusinessInfo = () => (
    <Box sx={{ color: "text.secondary" }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Industry:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step1?.industry || "Not provided"}
        </Box>
      </Typography>
    </Box>
  );

  const renderContactInfo = () => (
    <Box sx={{ color: "text.secondary" }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Name:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step2?.name || "Not provided"}
        </Box>
      </Typography>
      <Typography variant="body1">
        Email:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step2?.email || "Not provided"}
        </Box>
      </Typography>
    </Box>
  );

  const renderMarketAnalysis = () => (
    <Box sx={{ color: "text.secondary" }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Business Description:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step3?.description || "Not provided"}
        </Box>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Employee Count:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step3?.employeeCount || "Not provided"}
        </Box>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Pain Points:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step3?.painPoints?.join(", ") || "Not provided"}
        </Box>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Current Tech Stack:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step3?.currentStack || "Not provided"}
        </Box>
      </Typography>
      <Typography variant="body1">
        Tools Used:{" "}
        <Box component="span" sx={{ color: "text.primary" }}>
          {formData.step3?.tools?.join(", ") || "Not provided"}
        </Box>
      </Typography>
    </Box>
  );

  const renderGrowthStrategy = () => (
    <Box sx={{ color: "text.secondary" }}>
      {formData.step4?.tasks?.map((task, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
            Task {index + 1}:{" "}
            <Box component="span" sx={{ color: "text.primary" }}>
              {task.title}
            </Box>
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              Description:{" "}
              <Box component="span" sx={{ color: "text.primary" }}>
                {task.description}
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              Hourly Cost:{" "}
              <Box component="span" sx={{ color: "text.primary" }}>
                ${task.hourlyCost || "0"}
              </Box>
            </Typography>
            <Typography variant="body1">
              Daily Hours:{" "}
              <Box component="span" sx={{ color: "text.primary" }}>
                {task.dailyHours || "0"}
              </Box>
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Review Your Information
      </Typography>

      <Grid container spacing={{ xs: 0, sm: 0 }}>
        {renderSection(
          "Business Information",
          "Review your business details and industry selection",
          renderBusinessInfo()
        )}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {renderSection(
          "Contact Information",
          "Verify your contact details",
          renderContactInfo()
        )}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {renderSection(
          "Market Analysis",
          "Review your business overview and technology environment",
          renderMarketAnalysis()
        )}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {renderSection(
          "Growth Strategy",
          "Review your automation tasks and requirements",
          renderGrowthStrategy()
        )}
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          mt: 3,
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          px: { xs: 2, sm: 0 },
        }}
      >
        By clicking next, you confirm that all the information provided is
        accurate and complete.
      </Typography>
    </Box>
  );
};

export default Step5;
