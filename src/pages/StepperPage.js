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

const StepperContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData } = useFormContext();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            activeStep={activeStep}
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontSize: "0.875rem",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        <Paper
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
                        : `Step ${activeStep} of ${steps.length - 1}`}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {Math.round((activeStep / (steps.length - 1)) * 100)}%
                      Complete
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(activeStep / (steps.length - 1)) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, fontWeight: "medium" }}
                  >
                    {steps[activeStep]}
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
        </Paper>
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
