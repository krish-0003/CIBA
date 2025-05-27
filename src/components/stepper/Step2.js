import React, { useState, useEffect } from "react";
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
import { isValidEmail, isValidVerificationCode } from "../../utils/validation";

const Step2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  // Initialize local state with form context data
  const [formState, setFormState] = useState({
    name: formData.step2?.name || "",
    email: formData.step2?.email || "",
    code: formData.step2?.code || "",
    isBlurred: {
      name: false,
      email: false,
      code: false,
    },
    showVerification: formData.step2?.showVerification || false,
    verified: formData.step2?.verified || false,
  });

  // Update form context whenever states change
  useEffect(() => {
    const isEmailValid = isValidEmail(formState.email);
    const isNameValid = formState.name.trim().length > 0;
    const isVerificationValid = formState.verified;

    updateFormData("step2", {
      name: formState.name,
      email: formState.email,
      code: formState.code,
      showVerification: formState.showVerification,
      verified: formState.verified,
      isValid: isEmailValid && isNameValid && isVerificationValid,
      isComplete: isEmailValid && isNameValid && isVerificationValid,
    });
  }, [formState]);

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleBlur = (field) => () => {
    setFormState((prev) => ({
      ...prev,
      isBlurred: {
        ...prev.isBlurred,
        [field]: true,
      },
    }));
  };

  const sendVerification = async () => {
    setFormState((prev) => ({
      ...prev,
      showVerification: true,
    }));
    alert("Verification code sent (Demo: Use any code)");
  };

  const verifyCode = async () => {
    setFormState((prev) => ({
      ...prev,
      verified: true,
    }));
  };

  // Validation logic
  const hasNameError = formState.isBlurred.name && !formState.name.trim();
  const nameErrorMessage = hasNameError ? "Please enter your name" : "";

  const hasEmailError =
    formState.isBlurred.email && !isValidEmail(formState.email);
  const emailErrorMessage = hasEmailError
    ? "Please enter a valid email address"
    : "";

  const hasCodeError =
    formState.isBlurred.code && !isValidVerificationCode(formState.code);
  const codeErrorMessage = hasCodeError
    ? "Please enter a valid 6-digit verification code"
    : "";

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Contact Information
      </Typography>

      {!formState.verified ? (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please enter your contact information to proceed
            </Typography>

            <Box>
              <FormLabel required>Full Name</FormLabel>
              <TextField
                fullWidth
                value={formState.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                size={isMobile ? "small" : "medium"}
                variant="outlined"
                placeholder="Enter your full name"
                error={hasNameError}
                helperText={nameErrorMessage}
              />
            </Box>

            <Box>
              <FormLabel required>Work Email</FormLabel>
              <TextField
                fullWidth
                type="email"
                value={formState.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
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
              disabled={
                !formState.email ||
                !isValidEmail(formState.email) ||
                !formState.name.trim()
              }
              sx={{ mt: 1 }}
            >
              Send Verification Code
            </Button>

            {formState.showVerification && (
              <Fade in={formState.showVerification}>
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
                      value={formState.code}
                      onChange={handleChange("code")}
                      onBlur={handleBlur("code")}
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
                    disabled={!isValidVerificationCode(formState.code)}
                  >
                    Verify & Continue
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        </Paper>
      ) : (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6" color="success.main" align="center">
              Contact Information Verified!
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              You can now proceed to the next step.
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Step2;
