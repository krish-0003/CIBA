import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, useTheme, useMediaQuery } from "@mui/material";
import { BeatLoader } from "react-spinners";

const LoaderComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadingMessages = [
    "Processing your information...",
    "Almost there...",
    "Preparing your response...",
    "Just a moment...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      setIsTyping(true);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const message = loadingMessages[messageIndex];

    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setDisplayedMessage(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [messageIndex, isTyping]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      my={isMobile ? 2 : 4}
      gap={isMobile ? 2 : 4}
    >
      <Fade in={true} timeout={500}>
        <Box>
          <BeatLoader
            color={theme.palette.text.primary}
            loading={true}
            size={isMobile ? 15 : 20}
            margin={isMobile ? 4 : 6}
            speedMultiplier={0.5}
          />
        </Box>
      </Fade>
      <Fade in={true} timeout={500}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          color="text.primary"
          align="center"
          sx={{
            fontWeight: 500,
            minHeight: isMobile ? "24px" : "32px",
            letterSpacing: "0.5px",
            fontSize: isMobile ? "1rem" : "1.25rem",
            "& .cursor": {
              display: "inline-block",
              width: "3px",
              height: "1.2em",
              backgroundColor: theme.palette.text.secondary,
              marginLeft: "4px",
              verticalAlign: "middle",
              animation: "cursor-blink 0.8s ease-in-out infinite",
              "@keyframes cursor-blink": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0 },
              },
            },
          }}
        >
          {displayedMessage}
          <span className="cursor" />
        </Typography>
      </Fade>
    </Box>
  );
};

export default LoaderComponent;
