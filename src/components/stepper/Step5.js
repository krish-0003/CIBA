import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Step5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: 3 }}>
        Review & Submit
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography
              variant={isMobile ? "subtitle2" : "subtitle1"}
              gutterBottom
              sx={{ mb: 2 }}
            >
              Please review your information before submitting
            </Typography>
            <List
              sx={{
                "& .MuiListItem-root": {
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                },
                "& .MuiListItemText-primary": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
                "& .MuiListItemText-secondary": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
              }}
            >
              <ListItem>
                <ListItemText
                  primary="Business Information"
                  secondary="Review your business details, contact information, and business type"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Financial Details"
                  secondary="Verify your revenue, expenses, and employee information"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Market Analysis"
                  secondary="Check your market position, competitors, and target market"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Growth Strategy"
                  secondary="Review your goals, growth areas, and risk assessment"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            By clicking submit, you confirm that all the information provided is
            accurate and complete.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step5;
