import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Tooltip,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { FormLabel } from "../../utils/formComponents";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Step4 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  const [tasks, setTasks] = useState(
    formData.step4?.tasks || [
      {
        title: "",
        description: "",
        hourlyCost: "",
        dailyHours: "",
      },
    ]
  );

  const [blurredFields, setBlurredFields] = useState({});

  useEffect(() => {
    const isValid = tasks.every(
      (task) => task.title.trim() !== "" && task.description.trim() !== ""
    );

    updateFormData("step4", {
      tasks,
      isValid,
      isComplete: isValid,
    });
  }, [tasks]);

  const handleTaskChange = (index, field) => (e) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      [field]: e.target.value,
    };
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        title: "",
        description: "",
        hourlyCost: "",
        dailyHours: "",
      },
    ]);
  };

  const removeTask = (index) => () => {
    setTasks(tasks.filter((_, i) => i !== index));
    // Remove blurred state for the deleted task
    const newBlurredFields = { ...blurredFields };
    delete newBlurredFields[index];
    setBlurredFields(newBlurredFields);
  };

  const handleBlur = (index, field) => () => {
    setBlurredFields((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: true,
      },
    }));
  };

  const getTaskError = (index, field) => {
    if (blurredFields[index]?.[field] && !tasks[index][field].trim()) {
      return `Please enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
    }
    return "";
  };

  return (
    <Box>
 <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >        Tasks for Automation
      </Typography>

      <Grid container spacing={{ xs: 0, sm: 0 }}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Tasks You Want to Automate
              <Tooltip title="Add tasks that you want to automate to help us understand your needs better">
                <InfoOutlinedIcon fontSize="small" color="action" />
              </Tooltip>
            </Typography>

            {tasks.map((task, index) => (
              <Box key={index}>
                {index > 0 && <Divider sx={{ my: 3 }} />}
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      Task #{index + 1}
                    </Typography>
                    {index > 0 && (
                      <Button
                        startIcon={<DeleteOutlineIcon />}
                        onClick={removeTask(index)}
                        color="error"
                        size={isMobile ? "small" : "medium"}
                      >
                        Remove Task
                      </Button>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormLabel required>Task Title</FormLabel>
                      <TextField
                        required
                        fullWidth
                        value={task.title}
                        onChange={handleTaskChange(index, "title")}
                        onBlur={handleBlur(index, "title")}
                        size={isMobile ? "small" : "medium"}
                        placeholder="e.g., Data Entry, Report Generation"
                        error={!!getTaskError(index, "title")}
                        helperText={getTaskError(index, "title")}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <FormLabel>Hourly Cost ($)</FormLabel>
                      <TextField
                        fullWidth
                        type="number"
                        value={task.hourlyCost}
                        onChange={handleTaskChange(index, "hourlyCost")}
                        size={isMobile ? "small" : "medium"}
                        placeholder="e.g., 55"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                      <FormLabel>Daily Hours</FormLabel>
                      <TextField
                        fullWidth
                        type="number"
                        value={task.dailyHours}
                        onChange={handleTaskChange(index, "dailyHours")}
                        size={isMobile ? "small" : "medium"}
                        placeholder="e.g., 8"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              Hours
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <FormLabel required>Description</FormLabel>
                      <TextField
                        required
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={10}
                        value={task.description}
                        onChange={handleTaskChange(index, "description")}
                        onBlur={handleBlur(index, "description")}
                        size={isMobile ? "small" : "medium"}
                        placeholder="Describe what this task involves..."
                        error={!!getTaskError(index, "description")}
                        helperText={getTaskError(index, "description")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}

            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={addTask}
              sx={{ mt: 2 }}
            >
              Add Another Task
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step4;
