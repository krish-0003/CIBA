import React, { useState } from "react";
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
import axios from "axios";

const Step2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const sendVerification = async () => {
    // Dummy verification - no backend needed
    setShowVerification(true);
    alert("Verification code sent (Demo: Use any code)");
  };

  const verifyCode = async () => {
    // Dummy verification - accept any code
    setVerified(true);
  };

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Schedule a Meeting
      </Typography>

      {!verified ? (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please enter your work email to schedule a meeting
            </Typography>

            <TextField
              fullWidth
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size={isMobile ? "small" : "medium"}
              variant="outlined"
              placeholder="Enter your work email address"
            />

            <Button
              variant="contained"
              onClick={sendVerification}
              fullWidth
              disabled={!email || !email.includes("@")}
              sx={{ mt: 1 }}
            >
              Send Verification Code
            </Button>

            {showVerification && (
              <Fade in={showVerification}>
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
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    placeholder="Enter the 6-digit code"
                  />

                  <Button
                    variant="contained"
                    onClick={verifyCode}
                    fullWidth
                    disabled={!code}
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
              email: email,
              customAnswers: {
                a1: email,
              },
            }}
            styles={{ height: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Step2;
