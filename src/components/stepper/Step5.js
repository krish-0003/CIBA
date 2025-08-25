import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { formatFormData } from "../../services/formDataService";
import { submitFormData } from "../../services/apiService";
import ErrorComponent from "../ErrorComponent";
import ResponseComponent from "../ResponseComponent";
import LoaderComponent from "../LoaderComponent";

const Step5 = ({ onNext }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const submissionRef = useRef(false);

  const handleSubmit = async () => {
    // Prevent duplicate submissions using ref
    if (submissionRef.current && isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Update form data to indicate loading state
      updateFormData("step5", {
        isLoading: true,
        isValid: false,
        isComplete: false,
      });

      // Validate if formData exists
      if (!formData) {
        throw new Error("Form data is missing");
      }

      const formattedData = formatFormData(formData);
      console.log("Formatted Form Data:", formattedData);

      // Submit to API
      const response = await submitFormData(formattedData);
      setResponseData(response);

      updateFormData("step5", {
        isLoading: false,
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
          err.message === "Form data is missing"
            ? "Unable to process your request. Please try again."
            : "This might be due to a temporary connection issue or server maintenance. Please try again in a moment.",
      });
      updateFormData("step5", {
        isLoading: false,
        isValid: false,
        isComplete: false,
      });
      // Reset submission ref on error so user can retry
      submissionRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initial submission - only if we haven't submitted before
  useEffect(() => {
    // Use ref to prevent duplicate submissions across re-renders
    if (!submissionRef.current) {
      submissionRef.current = true;
      handleSubmit();
    }
  }, []); // Empty dependency array - only run once on mount

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        Generating Your Automation Plan
      </Typography>

      {isSubmitting ? (
        <LoaderComponent />
      ) : error ? (
        <ErrorComponent error={error} onRetry={handleSubmit} />
      ) : (
        <ResponseComponent responseData={responseData} onNext={onNext} />
      )}
    </Box>
  );
};

export default Step5;
