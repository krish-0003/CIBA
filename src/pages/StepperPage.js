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
import { FormProvider } from "../context/FormContext";

// Import step components
import Step0 from "../components/stepper/Step0";
import Step1 from "../components/stepper/Step1";
import Step2 from "../components/stepper/Step2";
import Step3 from "../components/stepper/Step3";
import Step4 from "../components/stepper/Step4";
import Step5 from "../components/stepper/Step5";

const steps = [
  "Welcome",
  "Business Information",
  "Financial Details",
  "Market Analysis",
  "Growth Strategy",
  "Review & Submit",
];

const StepperPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
      default:
        return "Unknown step";
    }
  };

  return (
    <FormProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
            flexGrow: 1,
          }}
        >
          {!isMobile && (
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
              Business Setup Wizard
            </Typography>
          )}

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
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default StepperPage;
