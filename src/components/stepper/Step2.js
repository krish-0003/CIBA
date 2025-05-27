import React, { useState, useEffect } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { FormLabel } from "../../utils/formComponents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { isValidEmail, isValidVerificationCode } from "../../utils/validation";

const Step2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Initialize local state with form context data
  const [emailState, setEmailState] = useState({
    value: formData.step2?.email || "",
    isBlurred: false,
  });

  const [verificationState, setVerificationState] = useState({
    code: formData.step2?.code || "",
    isBlurred: false,
    showVerification: formData.step2?.showVerification || false,
    verified: formData.step2?.verified || false,
  });

  const [isScheduled, setIsScheduled] = useState(
    formData.step2?.isScheduled || false
  );

  // Add Calendly event listener
  useCalendlyEventListener({
    onDateAndTimeSelected: () => {
      console.log("Date and time selected");
    },
    onEventScheduled: (e) => {
      console.log("Event scheduled:", e.data.payload);
      setIsScheduled(true);
    },
  });

  // Update form context whenever states change
  useEffect(() => {
    const isEmailValid = isValidEmail(emailState.value);
    const isVerificationValid = verificationState.verified;

    updateFormData("step2", {
      email: emailState.value,
      code: verificationState.code,
      showVerification: verificationState.showVerification,
      verified: verificationState.verified,
      isScheduled: isScheduled,
      isValid: isEmailValid && isVerificationValid && isScheduled,
      isComplete: isEmailValid && isVerificationValid && isScheduled,
    });
  }, [emailState, verificationState, isScheduled]);

  const handleEmailChange = (e) => {
    setEmailState((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handleCodeChange = (e) => {
    setVerificationState((prev) => ({
      ...prev,
      code: e.target.value,
    }));
  };

  const handleEmailBlur = () => {
    setEmailState((prev) => ({
      ...prev,
      isBlurred: true,
    }));
  };

  const handleCodeBlur = () => {
    setVerificationState((prev) => ({
      ...prev,
      isBlurred: true,
    }));
  };

  const sendVerification = async () => {
    setVerificationState((prev) => ({
      ...prev,
      showVerification: true,
    }));
    alert("Verification code sent (Demo: Use any code)");
  };

  const verifyCode = async () => {
    setVerificationState((prev) => ({
      ...prev,
      verified: true,
    }));
  };

  const handleReschedule = () => {
    // Commenting out rescheduling functionality as it creates a new appointment instead of rescheduling
    // setIsScheduled(false);
  };

  // Validation logic
  const hasEmailError = emailState.isBlurred && !isValidEmail(emailState.value);
  const emailErrorMessage = hasEmailError
    ? "Please enter a valid email address"
    : "";

  const hasCodeError =
    verificationState.isBlurred &&
    !isValidVerificationCode(verificationState.code);
  const codeErrorMessage = hasCodeError
    ? "Please enter a valid 6-digit verification code"
    : "";

  const renderAppointmentSuccess = () => (
    <Paper elevation={0} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 60, color: "success.main" }} />
        <Typography variant="h6" color="success.main" align="center">
          Appointment Scheduled Successfully!
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          You have received a confirmation email with the meeting details.
        </Typography>
        {/* Commenting out reschedule button as it creates a new appointment instead of rescheduling
        <Button 
          variant="outlined" 
          onClick={handleReschedule}
          sx={{ mt: 2 }}
        >
          Reschedule Meeting
        </Button>
        */}
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Schedule a Meeting
      </Typography>

      {!verificationState.verified ? (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please enter your work email to schedule a meeting
            </Typography>

            <Box>
              <FormLabel required>Work Email</FormLabel>
              <TextField
                fullWidth
                type="email"
                value={emailState.value}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                size={isMobile ? "small" : "medium"}
                variant="outlined"
                placeholder="Enter your work email address"
                error={hasEmailError}
                helperText={emailErrorMessage}
              />
            </Box>

            <Button
              variant="contained"
              onClick={sendVerification}
              fullWidth
              disabled={!emailState.value || !isValidEmail(emailState.value)}
              sx={{ mt: 1 }}
            >
              Send Verification Code
            </Button>

            {verificationState.showVerification && (
              <Fade in={verificationState.showVerification}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    We've sent a verification code to your email. Please enter
                    it below.
                  </Typography>

                  <Box>
                    <FormLabel required>Verification Code</FormLabel>
                    <TextField
                      fullWidth
                      value={verificationState.code}
                      onChange={handleCodeChange}
                      onBlur={handleCodeBlur}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      placeholder="Enter the 6-digit code"
                      error={hasCodeError}
                      helperText={codeErrorMessage}
                      inputProps={{
                        maxLength: 6,
                        pattern: "[0-9]*",
                        inputMode: "numeric",
                      }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={verifyCode}
                    fullWidth
                    disabled={!isValidVerificationCode(verificationState.code)}
                  >
                    Verify & Continue
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        </Paper>
      ) : isScheduled ? (
        renderAppointmentSuccess()
      ) : (
        <Box sx={{ height: "650px" }}>
          <InlineWidget
            url="https://calendly.com/topaccessories99/30min"
            prefill={{
              email: emailState.value,
            }}
            styles={{ height: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Step2;
