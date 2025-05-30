import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FormProvider, useFormContext } from "../context/FormContext";
import rivAI from "../assets/RIV AI.png";
import DottedGrid from "../components/DottedGrid";
import MouseGradient from "../components/MouseGradient";

// Import step components
import Step0 from "../components/stepper/Step0";
import Step1 from "../components/stepper/Step1";
import Step2 from "../components/stepper/Step2";
import Step3 from "../components/stepper/Step3";
import Step4 from "../components/stepper/Step4";
import Step5 from "../components/stepper/Step5";
import Step6 from "../components/stepper/Step6";

const steps = [
  "Welcome",
  "Information",
  "Contact",
  "Business Overview",
  "Automation",
  "Review",
  "Schedule Consultation",
];

// Display steps without Contact and Schedule Consultation
const displaySteps = [
  "Welcome",
  "Information",
  "Business & Automation",
  "Review",
];

const StepperContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData } = useFormContext();

  const shareStateWithBackend = async () => {
    try {
      // Get the formatted data from Step5 component
      const formattedData = formData.step5?.formattedData;
      if (!formattedData) {
        throw new Error("No formatted data available");
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const result = await response.json();
      console.log("Form data submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const getDisplayStepNumber = (actualStep) => {
    if (actualStep === 0) return 0; // Welcome
    if (actualStep === 1 || actualStep === 2) return 1; // Information and Contact merged
    if (actualStep === 3) return 2; // Business Overview
    if (actualStep === 4 && formData.step3?.aiInterest === "curious") return 2; // Automation (only if curious)
    if (actualStep === 5) return 3; // Review
    if (actualStep === 6) return 3; // Schedule Consultation (hidden)
    return 0;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      // If we're on step 3 (Business Overview) and user is not curious about AI
      if (prevActiveStep === 3 && formData.step3?.aiInterest === "unsure") {
        return 5; // Skip to review step
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      // If we're on review step (5) and user was not curious about AI
      if (prevActiveStep === 5 && formData.step3?.aiInterest === "unsure") {
        return 3; // Go back to business overview
      }
      return prevActiveStep - 1;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return true; // Welcome step is always valid
      case 1:
        return formData.step1?.isValid || false;
      case 2:
        return formData.step2?.isValid || false;
      case 3:
        return formData.step3?.isValid || false;
      case 4:
        return formData.step4?.isValid || false;
      case 5:
        return formData.step5?.isValid || false;
      case 6:
        return formData.step6?.isValid || false;
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step0 onNext={handleNext} />;
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <DottedGrid />
      <MouseGradient />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 0, mr: 2 }}
            >
              Can it be Automated?
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                sx={{ mb: 0, mr: 1 }}
              >
                By RIV AI
              </Typography>
              <img
                src={rivAI}
                alt="RIV AI"
                style={{ height: 32, width: "auto" }}
              />
            </Box>
          </Box>
        </Box>

        {!isMobile && (
          <Stepper
            activeStep={getDisplayStepNumber(activeStep)}
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontSize: "0.875rem",
              },
            }}
          >
            {displaySteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 2,
            boxShadow: 2,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.85)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            },
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button
                onClick={handleReset}
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
              >
                Reset
              </Button>
              <Button
                onClick={shareStateWithBackend}
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Submit Form Data
              </Button>
            </Box>
          ) : (
            <>
              {isMobile && (
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {activeStep === 0
                        ? "Getting Started"
                        : `Step ${getDisplayStepNumber(activeStep)} of ${
                            displaySteps.length - 1
                          }`}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {Math.round(
                        (getDisplayStepNumber(activeStep) /
                          (displaySteps.length - 1)) *
                          100
                      )}
                      % Complete
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (getDisplayStepNumber(activeStep) /
                        (displaySteps.length - 1)) *
                      100
                    }
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, fontWeight: "medium" }}
                  >
                    {displaySteps[getDisplayStepNumber(activeStep)]}
                  </Typography>
                </Box>
              )}
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  pt: 2,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  disabled={!isStepValid(activeStep)}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const StepperPage = () => {
  return (
    <FormProvider>
      <StepperContent />
    </FormProvider>
  );
};

export default StepperPage;
