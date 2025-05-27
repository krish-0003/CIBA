import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
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

const Step2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Initialize local state with form context data
  const [emailState, setEmailState] = useState({
    value: formData.step2?.email || "",
    isTouched: false,
  });

  const [verificationState, setVerificationState] = useState({
    code: formData.step2?.code || "",
    isTouched: false,
    showVerification: formData.step2?.showVerification || false,
    verified: formData.step2?.verified || false,
  });

  // Update form context whenever states change
  useEffect(() => {
    const isEmailValid = emailState.value.includes("@");
    const isVerificationValid = verificationState.verified;

    updateFormData("step2", {
      email: emailState.value,
      code: verificationState.code,
      showVerification: verificationState.showVerification,
      verified: verificationState.verified,
      isValid: isEmailValid && isVerificationValid,
      isComplete: isEmailValid && isVerificationValid,
    });
  }, [emailState, verificationState]);

  const handleEmailChange = (e) => {
    setEmailState((prev) => ({
      ...prev,
      value: e.target.value,
      isTouched: true,
    }));
  };

  const handleCodeChange = (e) => {
    setVerificationState((prev) => ({
      ...prev,
      code: e.target.value,
      isTouched: true,
    }));
  };

  const handleEmailBlur = () => {
    setEmailState((prev) => ({
      ...prev,
      isTouched: true,
    }));
  };

  const handleCodeBlur = () => {
    setVerificationState((prev) => ({
      ...prev,
      isTouched: true,
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

  // Validation logic
  const hasEmailError = emailState.isTouched && !emailState.value.includes("@");
  const emailErrorMessage = hasEmailError ? "Please enter a valid email" : "";

  const hasCodeError = verificationState.isTouched && !verificationState.code;
  const codeErrorMessage = hasCodeError
    ? "Please enter the verification code"
    : "";

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Schedule a Meeting
      </Typography>

      {!verificationState.verified ? (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please enter your work email to schedule a meeting
            </Typography>

            <TextField
              fullWidth
              label="Work Email"
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

            <Button
              variant="contained"
              onClick={sendVerification}
              fullWidth
              disabled={!emailState.value || !emailState.value.includes("@")}
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

                  <TextField
                    fullWidth
                    label="Verification Code"
                    value={verificationState.code}
                    onChange={handleCodeChange}
                    onBlur={handleCodeBlur}
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    placeholder="Enter the 6-digit code"
                    error={hasCodeError}
                    helperText={codeErrorMessage}
                  />

                  <Button
                    variant="contained"
                    onClick={verifyCode}
                    fullWidth
                    disabled={!verificationState.code}
                  >
                    Verify & Continue
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        </Paper>
      ) : (
        <Box sx={{ height: "650px" }}>
          <InlineWidget
            url="https://calendly.com/topaccessories99/30min"
            prefill={{
              email: emailState.value,
              // customAnswers: {
              //   a1: emailState.value,
              // },
            }}
            styles={{ height: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Step2;
