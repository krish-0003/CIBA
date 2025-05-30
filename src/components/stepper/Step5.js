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
import { formatFormData } from "../../services/formDataService";

const Step5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Update form context to mark step as valid and log formatted data
  useEffect(() => {
    const formattedData = formatFormData(formData);
    console.log("Formatted Form Data:", formattedData);

    updateFormData("step5", {
      isValid: true,
      isComplete: true,
      formattedData: formattedData,
    });
  }, []);

  const renderSection = (title, tooltip, content) => (
    <Grid item xs={12}>
      <Box elevation={0}>
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
      </Box>
    </Grid>
  );

  const renderFormattedData = () => (
    <Box sx={{ color: "text.secondary" }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: 1,
          overflow: "auto",
          maxHeight: "400px",
        }}
      >
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(formatFormData(formData), null, 2)}
        </pre>
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        Review Your Information
      </Typography>

      <Grid container spacing={{ xs: 0, sm: 0 }}>
        {renderSection(
          "Formatted Data",
          "Complete form data in JSON format",
          renderFormattedData()
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
