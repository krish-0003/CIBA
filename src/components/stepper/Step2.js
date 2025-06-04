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
  CircularProgress,
  Link,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { FormLabel } from "../../utils/formComponents";
import { isValidEmail, isValidVerificationCode } from "../../utils/validation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MOJO_AUTH_API_KEY = process.env.REACT_APP_MOJO_AUTH_API_KEY;
const MOJO_AUTH_BASE_URL = "https://api.mojoauth.com";
const RESEND_COOLDOWN = 30; // 30 seconds cooldown for resend

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
    stateId: formData.step2?.stateId || "",
    loading: false,
    errors: {
      email: "",
      code: "",
    },
    resendCooldown: 0,
    codeSent: false,
    resendSuccess: false,
  });

  // Handle resend cooldown timer
  useEffect(() => {
    let timer;
    if (formState.resendCooldown > 0) {
      timer = setInterval(() => {
        setFormState((prev) => ({
          ...prev,
          resendCooldown: prev.resendCooldown - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [formState.resendCooldown]);

  // Clear resend success message after 3 seconds
  useEffect(() => {
    let timer;
    if (formState.resendSuccess) {
      timer = setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          resendSuccess: false,
        }));
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [formState.resendSuccess]);

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
      stateId: formState.stateId,
      isValid: isEmailValid && isNameValid && isVerificationValid,
      isComplete: isEmailValid && isNameValid && isVerificationValid,
    });
  }, [formState]);

  const handleChange = (field) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [field]: e.target.value,
      errors: {
        ...prev.errors,
        [field]: "", // Clear error when user makes changes
      },
      // Reset verification state if email is changed
      ...(field === "email" && {
        showVerification: false,
        verified: false,
        code: "",
        stateId: "",
        codeSent: false,
      }),
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
    try {
      setFormState((prev) => ({
        ...prev,
        loading: true,
        errors: {
          ...prev.errors,
          email: "",
        },
      }));

      const response = await fetch(`${MOJO_AUTH_BASE_URL}/users/emailotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": MOJO_AUTH_API_KEY,
        },
        body: JSON.stringify({
          email: formState.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code");
      }

      setFormState((prev) => ({
        ...prev,
        showVerification: true,
        stateId: data.state_id,
        loading: false,
        codeSent: true,
        resendCooldown: RESEND_COOLDOWN,
      }));
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          email: error.message || "Failed to send verification code",
        },
      }));
    }
  };

  const verifyCode = async () => {
    try {
      setFormState((prev) => ({
        ...prev,
        loading: true,
        errors: {
          ...prev.errors,
          code: "",
        },
      }));

      const formData = new URLSearchParams();
      formData.append("OTP", formState.code);
      formData.append("state_id", formState.stateId);

      const response = await fetch(
        `${MOJO_AUTH_BASE_URL}/users/emailotp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-api-key": MOJO_AUTH_API_KEY,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify code");
      }

      setFormState((prev) => ({
        ...prev,
        verified: true,
        loading: false,
      }));
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          code: error.message || "Invalid verification code",
        },
      }));
    }
  };

  const resendCode = async () => {
    if (formState.resendCooldown > 0) return;

    try {
      setFormState((prev) => ({
        ...prev,
        loading: true,
        errors: {
          ...prev.errors,
          email: "",
        },
      }));

      const response = await fetch(
        `${MOJO_AUTH_BASE_URL}/users/emailotp/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": MOJO_AUTH_API_KEY,
          },
          body: JSON.stringify({
            state_id: formState.stateId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification code");
      }

      setFormState((prev) => ({
        ...prev,
        loading: false,
        codeSent: true,
        resendCooldown: RESEND_COOLDOWN,
        resendSuccess: true,
      }));
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          email: error.message || "Failed to resend verification code",
        },
      }));
    }
  };

  // Validation logic
  const hasNameError = formState.isBlurred.name && !formState.name.trim();
  const nameErrorMessage = hasNameError ? "Please enter your name" : "";

  const hasEmailError =
    formState.isBlurred.email && !isValidEmail(formState.email);
  const emailErrorMessage = hasEmailError
    ? "Please enter a valid email address"
    : formState.errors.email || "";

  const hasCodeError =
    formState.isBlurred.code && !isValidVerificationCode(formState.code);
  const codeErrorMessage = hasCodeError
    ? "Please enter a valid 6-digit verification code"
    : formState.errors.code || "";

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        Contact Information
      </Typography>

      {!formState.verified ? (
        <Box elevation={0} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
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
                disabled={formState.loading}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel required>Work Email</FormLabel>
                {formState.showVerification && (
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setFormState((prev) => ({
                        ...prev,
                        showVerification: false,
                        verified: false,
                        code: "",
                        stateId: "",
                        codeSent: false,
                        errors: {
                          email: "",
                          code: "",
                        },
                        isBlurred: {
                          ...prev.isBlurred,
                          code: false,
                        },
                      }));
                    }}
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Edit Email
                  </Link>
                )}
              </Box>
              <TextField
                fullWidth
                type="email"
                value={formState.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                size={isMobile ? "small" : "medium"}
                variant="outlined"
                placeholder="Enter your work email address"
                error={hasEmailError || !!formState.errors.email}
                helperText={emailErrorMessage}
                disabled={formState.loading || formState.showVerification}
              />
            </Box>

            {!formState.showVerification ? (
              <Button
                variant="contained"
                onClick={sendVerification}
                fullWidth
                disabled={
                  !formState.email ||
                  !isValidEmail(formState.email) ||
                  !formState.name.trim() ||
                  formState.loading
                }
                sx={{ mt: 1 }}
              >
                {formState.loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            ) : (
              <Fade in={formState.showVerification}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {formState.resendSuccess
                        ? "New verification code sent!"
                        : formState.codeSent
                        ? "Verification code sent to your email"
                        : "We've sent a verification code to your email"}
                    </Typography>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={resendCode}
                      disabled={
                        formState.resendCooldown > 0 || formState.loading
                      }
                      sx={{
                        textDecoration: "none",
                        color:
                          formState.resendCooldown > 0
                            ? "text.disabled"
                            : theme.palette.primary.main,
                        cursor:
                          formState.resendCooldown > 0 ? "default" : "pointer",
                        "&:hover": {
                          textDecoration:
                            formState.resendCooldown > 0 ? "none" : "underline",
                        },
                      }}
                    >
                      {formState.resendCooldown > 0
                        ? `Resend in ${formState.resendCooldown}s`
                        : "Resend Code"}
                    </Link>
                  </Box>

                  <Box>
                    <FormLabel required>Verification Code</FormLabel>
                    <TextField
                      fullWidth
                      value={formState.code}
                      onChange={handleChange("code")}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      placeholder="Enter the 6-digit code"
                      error={hasCodeError || !!formState.errors.code}
                      helperText={codeErrorMessage}
                      inputProps={{
                        maxLength: 6,
                        pattern: "[0-9]*",
                        inputMode: "numeric",
                      }}
                      disabled={formState.loading}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={verifyCode}
                    fullWidth
                    disabled={
                      !isValidVerificationCode(formState.code) ||
                      formState.loading
                    }
                  >
                    {formState.loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Verify & Continue"
                    )}
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          elevation={0}
          sx={{ p: 3, maxWidth: 500, mx: "auto", textAlign: "center" }}
        >
          <CheckCircleIcon
            sx={{ fontSize: 48, mb: 2, color: "success.main" }}
          />
          <Typography variant="h6" gutterBottom>
            Contact Information Verified!
          </Typography>
          <Typography variant="body1">
            Thank you, {formState.name}. You can now proceed to the next step.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Step2;
