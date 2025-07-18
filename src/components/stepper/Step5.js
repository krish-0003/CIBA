import React, { useEffect, useState } from "react";
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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

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

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        Analysis Results
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
