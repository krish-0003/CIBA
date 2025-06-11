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
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";

/**
 * A reusable component that creates a box with an animated gradient border
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be displayed inside the box
 * @param {Object} [props.gradientColors] - Optional custom gradient colors
 * @param {string} [props.gradientColors.primary] - Primary gradient color
 * @param {string} [props.gradientColors.secondary] - Secondary gradient color
 * @param {string} [props.gradientColors.tertiary] - Tertiary gradient color
 * @param {Object} [props.sx] - Additional styles to be applied to the box
 * @param {number} [props.borderThickness=4] - Thickness of the border in pixels
 * @param {number} [props.animationDuration=2] - Duration of the animation in seconds
 */
const AnimatedBorderBox = ({
  children,
  gradientColors,
  sx = {},
  borderThickness = 4,
  animationDuration = 2,
}) => {
  const defaultGradientColors = {
    primary: "rgba(64, 156, 255, 0.15)",
    secondary: "rgba(88, 86, 214, 0.12)",
    tertiary: "rgba(138, 43, 226, 0.08)",
  };

  const colors = gradientColors || defaultGradientColors;

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 3,
        position: "relative",
        ...sx,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -borderThickness,
          borderRadius: `calc(12px + ${borderThickness}px)`,
          padding: borderThickness,
          background: `linear-gradient(90deg, 
            ${colors.primary},
            ${colors.secondary},
            ${colors.tertiary},
            ${colors.primary})`,
          backgroundSize: "300% 300%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          animation: `gradientRotate ${animationDuration}s linear infinite`,
          zIndex: -1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: 3,
          background: "#FFFFFF",
          zIndex: -1,
        },
        "@keyframes gradientRotate": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

/**
 * A reusable component for consistent section styling
 */
const StyledSection = ({ title, tooltip, icon: Icon, children, sx = {} }) => {
  return (
    <Grid item xs={12}>
      <Box elevation={0} sx={{ ...sx }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
            pb: 1,
            borderBottom: "2px solid",
            borderColor: "primary.light",
          }}
        >
          {Icon && <Icon color="primary" />}
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {title}
            {tooltip && (
              <Tooltip title={tooltip}>
                <InfoOutlinedIcon fontSize="small" color="primary" />
              </Tooltip>
            )}
          </Typography>
        </Box>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const ResponseComponent = ({ responseData }) => {
  const gradientColors = {
    primary: "rgba(64, 156, 255, 0.15)",
    secondary: "rgba(88, 86, 214, 0.12)",
    tertiary: "rgba(138, 43, 226, 0.08)",
  };

  const renderBusinessInfo = (businessInfo) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: alpha("#1A1A1A", 0.04),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Industry
          </Typography>
          <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
            {businessInfo.industry}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Employee Count
          </Typography>
          <Typography variant="body1">{businessInfo.employee_count}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">{businessInfo.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPainPoints = (painPoints) => {
    if (!painPoints || painPoints.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary">
          No pain points identified.
        </Typography>
      );
    }
    return (
      <Box>
        {painPoints.map((point, index) => (
          <Fade in timeout={500} key={index}>
            <Accordion
              defaultExpanded
              sx={{
                mb: 2,
                backgroundColor: alpha("#1A1A1A", 0.04),
                "&:last-child": {
                  mb: 0,
                },
                "& .MuiAccordionSummary-root": {
                  minHeight: "48px",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "8px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    margin: "8px 0",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Chip
                    label={index + 1}
                    size="small"
                    color="primary"
                    sx={{
                      mr: 1,
                      minWidth: "28px",
                      height: "28px",
                      borderRadius: "8px",
                    }}
                  />
                  {point.pain_point}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      mb: 1,
                    }}
                  >
                    Automation Suggestion
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      color: "text.primary",
                      lineHeight: 1.6,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {point.automation_suggestion}
                  </Typography>
                </Box>
                {point.refined_custom_call_action && (
                  <AnimatedBorderBox>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        mb: 1,
                      }}
                    >
                      Recommended Action
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      {point.refined_custom_call_action}
                    </Typography>
                  </AnimatedBorderBox>
                )}
              </AccordionDetails>
            </Accordion>
          </Fade>
        ))}
      </Box>
    );
  };

  const renderCustomTasks = (customTasks) => {
    if (!customTasks || customTasks.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary">
          No custom tasks identified.
        </Typography>
      );
    }
    if (typeof customTasks === "string") {
      return <Typography variant="body2">{customTasks}</Typography>;
    }
    return customTasks.map((task, index) => (
      <Fade in timeout={500} key={index}>
        <Accordion
          defaultExpanded
          sx={{
            mb: 2,
            backgroundColor: alpha("#1A1A1A", 0.04),
            "&:last-child": {
              mb: 0,
            },
            "& .MuiAccordionSummary-root": {
              minHeight: "48px",
            },
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content": {
                margin: "8px 0",
              },
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Chip
                label={index + 1}
                size="small"
                color="primary"
                sx={{
                  mr: 1,
                  minWidth: "28px",
                  height: "28px",
                  borderRadius: "8px",
                }}
              />
              {task.task}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{
                lineHeight: 1.6,
                mb: 1.5,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {task.description}
            </Typography>
            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="subtitle1"
                color="primary"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  mb: 1,
                }}
              >
                Automation Suggestion
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {task.automation_suggestion}
              </Typography>
            </Box>
            {task.refined_custom_call_action && (
              <AnimatedBorderBox>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    mb: 1,
                  }}
                >
                  Recommended Action
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {task.refined_custom_call_action}
                </Typography>
              </AnimatedBorderBox>
            )}
            {task.total_savings && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    mb: 1,
                  }}
                >
                  Potential Savings
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    icon={<ScheduleIcon />}
                    label={`${task.total_savings.time_saved} Hours Saved`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: "16px",
                      borderWidth: "2px",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  />
                  <Chip
                    icon={<AttachMoneyIcon />}
                    label={`$${task.total_savings.savings} Cost Saved`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: "16px",
                      borderWidth: "2px",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  />
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Fade>
    ));
  };

  const renderTotalSavings = (totalSavings) => {
    if (!totalSavings) return null;
    return (
      <Fade in timeout={500}>
        <Box sx={{ mt: 4, mb: 2, maxWidth: "600px", mx: "auto" }}>
          <AnimatedBorderBox
            gradientColors={{
              primary: "rgba(64, 156, 255, 0.3)",
              secondary: "rgba(88, 86, 214, 0.25)",
              tertiary: "rgba(138, 43, 226, 0.2)",
            }}
            borderThickness={3}
            sx={{ p: 4 }}
          >
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                mb: 3,
                textAlign: "center",
              }}
            >
              Total Potential Savings (Monthly)
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Chip
                icon={<ScheduleIcon />}
                label={`${totalSavings.time_saved} Hours Saved`}
                size="medium"
                sx={{
                  borderRadius: "24px",
                  backgroundColor: "white",
                  color: "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  height: "48px",
                  px: 2,
                  "& .MuiChip-icon": {
                    color: "primary.main",
                    fontSize: "1.5rem",
                  },
                }}
              />
              <Chip
                icon={<AttachMoneyIcon />}
                label={`$${totalSavings.savings} Cost Saved`}
                size="medium"
                sx={{
                  borderRadius: "24px",
                  backgroundColor: "white",
                  color: "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  height: "48px",
                  px: 2,
                  "& .MuiChip-icon": {
                    color: "primary.main",
                    fontSize: "1.5rem",
                  },
                }}
              />
            </Box>
          </AnimatedBorderBox>
        </Box>
      </Fade>
    );
  };

  if (!responseData) return null;

  return (
    <Box
      sx={{
        p: 2,
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <StyledSection
          title="Business Information"
          tooltip="Details about your business"
          icon={BusinessIcon}
        >
          {renderBusinessInfo(responseData.data.business_info)}
        </StyledSection>

        <StyledSection
          title="Pain Points Analysis"
          tooltip="Analysis of your business challenges"
        >
          {renderPainPoints(responseData.data.pain_points_analysis)}
        </StyledSection>

        {responseData.data.custom_tasks_analysis &&
          responseData.data.custom_tasks_analysis.length > 0 && (
            <StyledSection
              title="Custom Tasks Analysis"
              tooltip="Analysis of specific tasks you want to automate"
            >
              {renderCustomTasks(responseData.data.custom_tasks_analysis)}
            </StyledSection>
          )}

        {responseData.data.custom_tasks_analysis &&
          responseData.data.custom_tasks_analysis.length > 0 &&
          responseData.data.total_savings &&
          renderTotalSavings(responseData.data.total_savings)}
      </Grid>
    </Box>
  );
};

export default ResponseComponent;
