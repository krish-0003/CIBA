import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
  CircularProgress,
  Button,
  Link,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { formatFormData } from "../../services/formDataService";
import { submitFormData } from "../../services/apiService";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorIcon from "@mui/icons-material/Error";

const Step5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      const formattedData = formatFormData(formData);
      console.log("Formatted Form Data:", formattedData);

      // Submit to API
      const response = await submitFormData(formattedData);
      setResponseData(response);

      updateFormData("step5", {
        isValid: true,
        isComplete: true,
        formattedData: formattedData,
        responseData: response,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError({
        title: "We're Having Trouble Processing Your Request",
        message:
          "This might be due to a temporary connection issue or server maintenance. Please try again in a moment.",
      });
      updateFormData("step5", {
        isValid: false,
        isComplete: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initial submission
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleRetry = () => {
    handleSubmit();
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <Box
        elevation={0}
        sx={{
          p: 3,
          maxWidth: 500,
          mx: "auto",
          textAlign: "center",
          mt: 4,
        }}
      >
        <ErrorIcon sx={{ fontSize: 48, mb: 2, color: "error.main" }} />
        <Typography variant="h6" gutterBottom color="error" sx={{ mb: 2 }}>
          {error.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          {error.message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
            sx={{ minWidth: 200 }}
          >
            Try Again
          </Button>
          <Typography variant="body2" color="text.secondary">
            Still having issues?{" "}
            <Link
              href="mailto:riviereaisolutions@gmail.com"
              color="primary"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              Contact Support
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  };

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

  const renderResponseData = () => (
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
          {JSON.stringify(responseData, null, 2)}
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

      {isSubmitting ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        renderError()
      ) : (
        <Grid container spacing={{ xs: 0, sm: 0 }}>
          {renderSection(
            "API Response",
            "Response received from the server",
            renderResponseData()
          )}
        </Grid>
      )}

      {!error && (
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
      )}
    </Box>
  );
};

export default Step5;
