import React from "react";
import { Box, Paper, Typography, Grid, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ResponseComponent = ({ responseData }) => {
  const renderSection = (title, tooltip, content) => (
    <Grid item xs={12}>
      <Box elevation={0}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {title}
          <Tooltip title={tooltip}>
            <InfoOutlinedIcon fontSize="small" color="action" />
          </Tooltip>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );

  const renderResponseData = () => (
    <Box sx={{ color: "text.secondary" }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: 1,
          overflow: "auto",
          maxHeight: "400px",
        }}
      >
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      </Paper>
    </Box>
  );

  return (
    <Grid container spacing={{ xs: 0, sm: 0 }}>
      {renderSection(
        "API Response",
        "Response received from the server",
        renderResponseData()
      )}
    </Grid>
  );
};

export default ResponseComponent;
