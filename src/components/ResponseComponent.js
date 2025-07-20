import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tooltip,
  Divider,
  Chip,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BoltIcon from "@mui/icons-material/Bolt";
import { themeStyles } from "../config/theme";
import FactoryIcon from "@mui/icons-material/Factory";
import GroupIcon from "@mui/icons-material/Group";

// Reusable styling objects
const cardStyles = {
  p: { xs: 1.5, sm: 2 },
  borderRadius: 3,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
  border: "1px solid rgba(0, 0, 0, 0.15)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: "linear-gradient(180deg, #409CFF, #8A2BE2)",
  },
};

const sectionHeaderStyles = {
  display: "flex",
  alignItems: "center",
  mb: 2,
  p: { xs: 1, sm: 1.5 },
  borderRadius: 2,
  background:
    "linear-gradient(135deg, rgba(64, 156, 255, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%)",
  border: "1px solid rgba(64, 156, 255, 0.3)",
};

const titleStyles = {
  color: "primary.main",
  fontWeight: 700,
  fontSize: { xs: "1.2rem", sm: "1.4rem" },
};

const iconStyles = {
  color: "primary.main",
  mr: 1,
  fontSize: "1.8rem",
};

const contentStyles = {
  pl: 2,
};

const textStyles = {
  fontSize: themeStyles.bodyFontSize,
  color: "text.primary",
  lineHeight: 1.6,
};

/**
 * A reusable component for consistent section styling
 */
const StyledSection = ({ title, tooltip, icon: Icon, children, sx = {} }) => {
  return (
    <Grid item xs={12}>
      <Box elevation={0} sx={{ ...sx }}>
        <Box sx={sectionHeaderStyles}>
          {Icon && <Icon sx={iconStyles} />}
          <Typography variant="h5" sx={titleStyles}>
            {title}
            {tooltip && (
              <Tooltip title={tooltip}>
                <InfoOutlinedIcon fontSize="small" color="primary" />
              </Tooltip>
            )}
          </Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

/**
 * Reusable card component
 */
const StyledCard = ({ children, fadeTimeout = 500 }) => (
  <Fade in timeout={fadeTimeout}>
    <Box sx={cardStyles}>
      <Box sx={contentStyles}>{children}</Box>
    </Box>
  </Fade>
);

/**
 * HTML Content Wrapper Component
 * Safely renders HTML content with proper styling
 */
const HTMLContent = ({ content, variant = "body1", sx = {} }) => {
  if (!content) return null;

  // Check if content contains HTML tags
  const hasHTML = /<[^>]*>/g.test(content);

  if (!hasHTML) {
    return (
      <Typography variant={variant} sx={sx}>
        {content}
      </Typography>
    );
  }

  // Create a wrapper that renders HTML content
  return (
    <Box
      sx={{
        ...sx,
        "& strong": {
          fontWeight: 700,
          color: "primary.main",
          textDecoration: "underline",
          textDecorationColor: "primary.main",

        },
        "& b": {
          fontWeight: 700,
          color: "primary.main",
        },
        "& em": {
          fontStyle: "italic",
          color: "text.secondary",
        },
        "& i": {
          fontStyle: "italic",
          color: "text.secondary",
        },
        "& u": {
          textDecoration: "underline",
          textDecorationColor: "primary.main",
        },
        "& mark": {
          backgroundColor: "rgba(64, 156, 255, 0.2)",
          color: "text.primary",
          padding: "0 2px",
          borderRadius: "2px",
        },
        "& code": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          color: "primary.main",
          padding: "2px 4px",
          borderRadius: "3px",
          fontFamily: "monospace",
          fontSize: "0.9em",
        },
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": {
            textDecoration: "underline",
          },
        },
        "& ul, & ol": {
          pl: 2,
          mb: 1,
        },
        "& li": {
          mb: 0.5,
        },
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "primary.main",
          fontWeight: 700,
          mb: 1,
          mt: 2,
        },
        "& blockquote": {
          borderLeft: "3px solid",
          borderColor: "primary.main",
          pl: 2,
          ml: 0,
          my: 1,
          fontStyle: "italic",
          color: "text.secondary",
        },
        "& hr": {
          border: "none",
          height: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          my: 2,
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Utility function to normalize links to an array
const getCaseStudyLinks = (link) => {
  if (!link) return [];
  if (Array.isArray(link)) return link;
  return [link];
};

// Reusable component for rendering case study chips
const CaseStudyChips = ({ links }) => {
  const normalizedLinks = getCaseStudyLinks(links);
  if (normalizedLinks.length === 0) return null;
  return (
    <Box
      component="span"
      sx={{
        ml: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        verticalAlign: "middle",
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontWeight: 500, mr: 0.5 }}
      >
        Case Studies:
      </Typography>
      {normalizedLinks.map(
        (link, idx) =>
          link && (
            <Tooltip key={idx} title={`View case study ${idx + 1}`}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open case study ${idx + 1} in new tab`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: "6px",
                    background: "rgba(120,120,120,0.18)",
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    transition: "background 0.2s",
                    cursor: "pointer",
                    "&:hover": { background: "rgba(64,156,255,0.25)" },
                  }}
                >
                  {idx + 1}
                </Box>
              </a>
            </Tooltip>
          )
      )}
    </Box>
  );
};

const ResponseComponent = ({ responseData, onNext }) => {
  const handleBookMeeting = () => {
    // Navigate to the next step (Step 6 - Schedule Consultation)
    if (onNext) {
      onNext();
    }
  };

  const renderPainPoints = (painPoints, sectionTitle) => {
    if (!painPoints) {
      return null;
    }

    // Handle single object case
    const pointsArray = Array.isArray(painPoints) ? painPoints : [painPoints];

    if (pointsArray.length === 0) {
      return null;
    }

    return (
      <Box sx={{ mt: 3 }}>
        <Box sx={sectionHeaderStyles}>
          <BoltIcon sx={iconStyles} />
          <Typography variant="h5" sx={titleStyles}>
            {sectionTitle}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1, sm: 1.5 }}>
          {pointsArray.map((point, index) => (
            <Grid item xs={12} key={index}>
              <StyledCard fadeTimeout={500 + index * 200}>
                <HTMLContent
                  content={point.automation_suggestion}
                  sx={{
                    ...textStyles,
                    mb: 1.5,
                    fontWeight: 500,
                    display: "inline",
                  }}
                />
                {/* Case Studies */}
                <CaseStudyChips links={point.case_study?.link} />

                {point.refined_custom_call_action && (
                  <Box
                    sx={{
                      mt: 1.5,
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, rgba(64, 156, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)",
                      border: "1px solid rgba(64, 156, 255, 0.2)",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, #409CFF, #5856D6)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <BoltIcon
                        sx={{
                          color: "primary.main",
                          mr: 1,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: themeStyles.subtitleFontSize,
                        }}
                      >
                        Recommended Action
                      </Typography>
                    </Box>
                    <HTMLContent
                      content={point.refined_custom_call_action}
                      sx={{ ...textStyles, fontWeight: 500, pl: 2.2 }}
                    />
                  </Box>
                )}
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderBusinessInfo = (businessInfo) => (
    <Box sx={{ width: "100%" }}>
      {/* Business Description with Industry and Team Size */}
      <StyledCard fadeTimeout={900}>
        {/* Industry and Team Size Info */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", gap: 3, mb: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FactoryIcon sx={{ color: "primary.main", fontSize: "1.2rem" }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Industry:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {businessInfo.industry}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GroupIcon sx={{ color: "primary.main", fontSize: "1.2rem" }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Team Size:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                {businessInfo.employee_count}
              </Typography>
            </Box>
          </Box>
        </Box>

        <HTMLContent
          content={businessInfo.description}
          sx={{ ...textStyles, lineHeight: 1.7 }}
        />
      </StyledCard>
    </Box>
  );

  const renderCustomTasks = (customTasks) => {
    if (!customTasks || customTasks.length === 0) {
      return (
        <StyledCard>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: themeStyles.bodyFontSize, textAlign: "center" }}
          >
            No custom tasks identified.
          </Typography>
        </StyledCard>
      );
    }

    if (typeof customTasks === "string") {
      return (
        <StyledCard>
          <Typography
            variant="body2"
            sx={{ fontSize: themeStyles.bodyFontSize }}
          >
            {customTasks}
          </Typography>
        </StyledCard>
      );
    }

    return (
      <Grid container spacing={{ xs: 1, sm: 1.5 }}>
        {customTasks.map((task, index) => (
          <Grid item xs={12} key={index}>
            <StyledCard fadeTimeout={500 + index * 200}>
              {/* Task Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #409CFF, #5856D6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1.5,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: themeStyles.titleFontSize,
                    flex: 1,
                  }}
                >
                  {task.task}
                </Typography>
              </Box>

              {/* Task Description */}
              <Box sx={{ pl: 0, mb: 1.5 }}>
                <HTMLContent
                  content={task.description}
                  sx={{ ...textStyles, color: "text.secondary" }}
                />
              </Box>

              {/* Automation Suggestion */}
              <Box sx={{ pl: 0, mb: 1.5 }}>
                <HTMLContent
                  content={task.automation_suggestion}
                  sx={{
                    ...textStyles,
                    fontWeight: 500,
                    // pl: 2.2,
                    display: "inline",
                  }}
                />
                {/* Case Studies */}
                <CaseStudyChips links={task.case_study?.link} />
              </Box>

              {/* Recommended Action */}
              {task.refined_custom_call_action && (
                <Box sx={{ pl: 0, mb: 1.5 }}>
                  <Box
                    sx={{
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, rgba(64, 156, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)",
                      border: "1px solid rgba(64, 156, 255, 0.2)",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, #409CFF, #5856D6)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <BoltIcon
                        sx={{
                          color: "primary.main",
                          mr: 1,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: themeStyles.subtitleFontSize,
                        }}
                      >
                        Recommended Action
                      </Typography>
                    </Box>
                    <HTMLContent
                      content={task.refined_custom_call_action}
                      sx={{ ...textStyles, fontWeight: 500, pl: 0 }}
                    />
                  </Box>
                </Box>
              )}

              {/* Potential Savings */}
              {task.total_savings &&
                task.total_savings.savings > 0 &&
                task.total_savings.time_saved > 0 && (
                  <Box sx={{ pl: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AttachMoneyIcon
                        sx={{
                          color: "primary.main",
                          mr: 1,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: themeStyles.subtitleFontSize,
                        }}
                      >
                        Potential Monthly Savings
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", pl: 0 }}
                    >
                      {task.total_savings.time_saved > 0 && (
                        <Chip
                          icon={<ScheduleIcon />}
                          label={`${task.total_savings.time_saved} Hours Saved`}
                          size="small"
                          sx={{
                            ...themeStyles.chipStyle,
                            background:
                              "linear-gradient(135deg, rgba(64, 156, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)",
                            border: "1px solid rgba(64, 156, 255, 0.3)",
                            color: "primary.main",
                          }}
                        />
                      )}
                      {task.total_savings.savings > 0 && (
                        <Chip
                          icon={<AttachMoneyIcon />}
                          label={`$${task.total_savings.savings} Cost Saved`}
                          size="small"
                          sx={{
                            ...themeStyles.chipStyle,
                            background:
                              "linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)",
                            border: "1px solid rgba(138, 43, 226, 0.3)",
                            color: "primary.main",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderTotalSavings = (totalSavings) => {
    if (!totalSavings) return null;
    return (
      <Box
        sx={{
          mt: 3,
          mb: 1.5,
          maxWidth: { xs: "100%", sm: "500px" },
          mx: "auto",
        }}
      >
        <StyledCard fadeTimeout={500}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <AttachMoneyIcon
                sx={{ color: "primary.main", mr: 1, fontSize: "1.5rem" }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                Total Monthly Savings
              </Typography>
            </Box>
          </Box>

          {/* Metrics Row */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexWrap: "nowrap",
              justifyContent: "center",
              flexDirection: { xs: "row", sm: "row" },
            }}
          >
            {/* Time Savings */}
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, rgba(64, 156, 255, 0.12) 0%, rgba(88, 86, 214, 0.12) 100%)",
                border: "1px solid rgba(64, 156, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                minWidth: { xs: "120px", sm: "180px" },
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 28, sm: 36 },
                  height: { xs: 28, sm: 36 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #409CFF, #5856D6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(64, 156, 255, 0.3)",
                  flexShrink: 0,
                }}
              >
                <ScheduleIcon
                  sx={{
                    color: "white",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", sm: "1.5rem" },
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {totalSavings.time_saved}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.65rem", sm: "0.8rem" },
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                  }}
                >
                  Hours Saved
                </Typography>
              </Box>
            </Box>

            {/* Cost Savings */}
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, rgba(138, 43, 226, 0.12) 0%, rgba(88, 86, 214, 0.12) 100%)",
                border: "1px solid rgba(138, 43, 226, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                minWidth: { xs: "120px", sm: "180px" },
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 28, sm: 36 },
                  height: { xs: 28, sm: 36 },
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8A2BE2, #5856D6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(138, 43, 226, 0.3)",
                  flexShrink: 0,
                }}
              >
                <AttachMoneyIcon
                  sx={{
                    color: "white",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", sm: "1.5rem" },
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  ${totalSavings.savings}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.65rem", sm: "0.8rem" },
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                  }}
                >
                  Cost Saved
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Footer Note */}
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              pt: 1.5,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                fontWeight: 500,
                opacity: 0.7,
              }}
            >
              💡 Based on your automation opportunities
            </Typography>
          </Box>
        </StyledCard>
      </Box>
    );
  };

  if (!responseData) return null;

  return (
    <Box sx={{ p: themeStyles.sectionPadding, minHeight: "100vh" }}>
      {responseData.data.custom_tasks_analysis &&
        responseData.data.custom_tasks_analysis.length > 0 &&
        responseData.data.total_savings &&
        responseData.data.total_savings.time_saved > 0 &&
        responseData.data.total_savings.savings > 0 &&
        renderTotalSavings(responseData.data.total_savings)}
      <Grid container spacing={2}>
        <StyledSection title="Business Information" icon={BusinessIcon}>
          {renderBusinessInfo(responseData.data.business_info)}
        </StyledSection>

        {responseData.data.custom_tasks_analysis &&
          responseData.data.custom_tasks_analysis.length > 0 && (
            <StyledSection title="Custom Tasks Analysis" icon={GroupIcon}>
              {renderCustomTasks(responseData.data.custom_tasks_analysis)}
            </StyledSection>
          )}

        {responseData.data.pain_points_analysis &&
          renderPainPoints(
            responseData.data.pain_points_analysis,
            responseData.data.custom_tasks_analysis &&
              responseData.data.custom_tasks_analysis.length > 0
              ? "Extra Suggestions"
              : "Automation Opportunities"
          )}
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Fade in timeout={1000}>
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(64, 156, 255, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%)",
              border: "2px solid rgba(64, 156, 255, 0.3)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #409CFF, #8A2BE2)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                mb: 2,
              }}
            >
              Ready to Automate Your Business?
            </Typography>
            <HTMLContent
              content="Let's discuss how we can implement these automation solutions and start saving you time and money today."
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                mb: 3,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleBookMeeting}
              sx={{
                background: "linear-gradient(135deg, #409CFF 0%, #8A2BE2 100%)",
                color: "white",
                px: { xs: 3, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(64, 156, 255, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #357ABD 0%, #7B1FA2 100%)",
                  boxShadow: "0 6px 25px rgba(64, 156, 255, 0.6)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              📅 Book Your Free Consultation
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 2,
                opacity: 0.8,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              ⏱️ 30-minute session • No commitment required
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default ResponseComponent;
