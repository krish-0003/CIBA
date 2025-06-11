import React, { useState, useEffect } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Step6 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  const [isScheduled, setIsScheduled] = useState(
    formData.step6?.isScheduled || false
  );
  const [showCustomConfirmation, setShowCustomConfirmation] = useState(false);

  // Format all the information for Calendly
  const formatCalendlyMessage = () => {
    const sections = [
      {
        title: "Business Information",
        content: `Industry: ${formData.step1?.industry || "Not provided"}`,
      },
      {
        title: "Contact Information",
        content: `Name: ${formData.step2?.name || "Not provided"}
Email: ${formData.step2?.email || "Not provided"}`,
      },
      {
        title: "Market Analysis",
        content: `Business Description: ${formData.step3?.description || "Not provided"}
Employee Count: ${formData.step3?.employeeCount || "Not provided"}
Pain Points: ${formData.step3?.painPoints?.join(", ") || "Not provided"}
Current Tech Stack: ${formData.step3?.currentStack || "Not provided"}
Tools Used: ${formData.step3?.tools?.join(", ") || "Not provided"}`,
      },
      {
        title: "Growth Strategy",
        content:
          formData.step4?.tasks
            ?.map(
              (task, index) => `
Task ${index + 1}: ${task.title}
Description: ${task.description}
Hourly Cost: $${task.hourlyCost || "0"}
Daily Hours: ${task.dailyHours || "0"}`
            )
            .join("\n\n") || "No tasks provided",
      },
    ];

    return sections
      .map((section) => `=== ${section.title} ===\n${section.content}`)
      .join("\n\n");
  };

  // Add Calendly event listener
  useCalendlyEventListener({
    onDateAndTimeSelected: () => {
      console.log("Date and time selected");
    },
    onEventScheduled: (e) => {
      console.log("Event scheduled:", e.data.payload);
      setIsScheduled(true);
      // Don't show custom confirmation immediately
      setShowCustomConfirmation(false);
    },
  });

  // Update form context whenever states change
  useEffect(() => {
    updateFormData("step6", {
      isScheduled: isScheduled,
      isValid: isScheduled,
      isComplete: isScheduled,
    });
  }, [isScheduled]);

  // Show custom confirmation when returning to the step
  useEffect(() => {
    if (isScheduled) {
      setShowCustomConfirmation(true);
    }
  }, []);

  const renderAppointmentSuccess = () => (
    <Fade in={true}>
      <Box
        elevation={0}
        sx={{ p: 3, maxWidth: 500, mx: "auto", textAlign: "center" }}
      >
        <CheckCircleIcon sx={{ fontSize: 48, mb: 2, color: "success.main" }} />
        <Typography variant="h6" gutterBottom>
          Meeting Scheduled Successfully!
        </Typography>
        <Typography variant="body1">
          We look forward to discussing your automation needs with you,{" "}
          {formData.step2?.name}. You will receive a calendar invitation
          shortly.
        </Typography>
      </Box>
    </Fade>
  );

  return (
    <Box>
 <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >        Schedule Your Consultation
      </Typography>

      {isScheduled && showCustomConfirmation ? (
        renderAppointmentSuccess()
      ) : (
        <Box sx={{ height: "650px" }}>
          <InlineWidget
            url="https://calendly.com/topaccessories99/30min"
            prefill={{
              email: formData.step2?.email || "",
              name: formData.step2?.name || "",
              customAnswers: {
                a1: formatCalendlyMessage(),
              },
            }}
            styles={{ height: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Step6;
