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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useFormContext } from "../../context/FormContext";
import { FormLabel } from "../../utils/formComponents";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Step4 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, updateFormData } = useFormContext();

  const [tasks, setTasks] = useState(formData.step4?.tasks || []);

  const [expandedIndex, setExpandedIndex] = useState(0);

  const [blurredFields, setBlurredFields] = useState({});

  // Initialize with a default task if no tasks exist
  useEffect(() => {
    if (tasks.length === 0) {
      const defaultTask = {
        title: "",
        description: "",
        hourlyCost: "",
        dailyHours: "",
      };
      setTasks([defaultTask]);
      setExpandedIndex(true);
    }
  }, []);

  useEffect(() => {
    // Only validate tasks that have been started (have some content)
    const tasksWithContent = tasks.filter(
      (task) => task.title.trim() !== "" || task.description.trim() !== ""
    );

    const isValid = tasksWithContent.every(
      (task) => task.title.trim() !== "" && task.description.trim() !== ""
    );

    // Update hasSpecificTasks in step3 based on whether tasks exist
    const hasSpecificTasks = tasksWithContent.length > 0;
    updateFormData("step3", {
      hasSpecificTasks,
    });

    updateFormData("step4", {
      tasks,
      isValid: tasksWithContent.length === 0 || isValid, // Valid if no tasks or all started tasks are complete
      isComplete: tasksWithContent.length === 0 || isValid,
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
    const newTasks = [
      ...tasks,
      { title: "", description: "", hourlyCost: "", dailyHours: "" },
    ];
    setTasks(newTasks);
    setExpandedIndex(newTasks.length - 1);
  };

  const removeTask = (index) => () => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
    // Remove blurred state for the deleted task
    const newBlurredFields = { ...blurredFields };
    delete newBlurredFields[index];
    setBlurredFields(newBlurredFields);
    if (expandedIndex === index) {
      setExpandedIndex(false);
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
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

  const getTaskStatus = (task) => {
    if (task.title.trim() === "" && task.description.trim() === "") {
      return { color: "default", bgColor: "grey.300" };
    }
    if (task.title.trim() !== "" && task.description.trim() !== "") {
      return { color: "success.main", bgColor: "success.light" };
    }
    return { color: "warning.main", bgColor: "warning.light" };
  };

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mb: 1, textAlign: "center" }}
      >
        {" "}
        Tasks for Automation
      </Typography>

      <Grid container spacing={{ xs: 0, sm: 0 }}>
        <Grid item xs={12}>
          <Box elevation={0}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Tasks You Want to Automate
              <span style={{ marginLeft: 8, opacity: 0.7, fontWeight: 400 }}>
                (Optional)
              </span>
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Add any repetitive or time-consuming tasks you want to automate.
                This helps us understand your needs and find the best solutions
                for you. You can skip this step if you don't have specific tasks
                in mind.
              </Typography>
            </Box>

            {tasks.map((task, index) => {
              const status = getTaskStatus(task);
              return (
                <Accordion
                  key={index}
                  expanded={expandedIndex === index}
                  onChange={() =>
                    setExpandedIndex(expandedIndex === index ? false : index)
                  }
                  sx={{ mb: 1.5 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: getTaskStatus(task).color,
                            fontWeight: "bold",
                          }}
                        >
                          Task #{index + 1}
                        </Typography>
                        {task.title}
                      </Box>
                      <Button
                        startIcon={<DeleteOutlineIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTask(index)();
                        }}
                        color="error"
                        size={isMobile ? "small" : "medium"}
                      >
                        Remove
                      </Button>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
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
                  </AccordionDetails>
                </Accordion>
              );
            })}

            <Button
              variant="outlined"
              color="primary"
              onClick={addTask}
              size={isMobile ? "small" : "medium"}
              sx={{ mt: tasks.length === 0 ? 0 : 2 }}
            >
              {tasks.length === 0 ? "Add Task" : "Add Another Task"}
            </Button>

            {tasks.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 1,
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                💡 Click "Can you give me suggestions?" to discover automation
                opportunities for your business{" "}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step4;
