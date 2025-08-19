/**
 * Service for handling form data formatting and submission
 */

/**
 * Formats the form data into a structured object for submission
 * @param {Object} formData - The raw form data from context
 * @returns {Object} Formatted data object
 */
export const formatFormData = (formData) => {
  const formattedData = {
    metadata: {
      timestamp: new Date().toISOString(),
    },
    contactInfo: {
      name: formData.step2?.name || null,
      email: formData.step2?.email || null,
      code: formData.step2?.code || null,
    },
    businessInfo: {
      industry: formData.step1?.industry || null,
      description: formData.step3?.description || null,
      employeeCount: formData.step3?.employeeCount || null,
      hasSpecificTasks: formData.step3?.hasSpecificTasks ?? false,
      tools: formData.step3?.tools || [],
    },
  };

  // Include automation tasks if any are provided (only non-empty tasks)
  if (Array.isArray(formData.step4?.tasks) && formData.step4.tasks.length > 0) {
    // Filter out tasks that don't have both title and description
    const validTasks = formData.step4.tasks.filter(
      (task) =>
        task.title &&
        task.title.trim() !== "" &&
        task.description &&
        task.description.trim() !== ""
    );

    if (validTasks.length > 0) {
      formattedData.automationTasks = validTasks.map((task) => ({
        title: task.title || null,
        description: task.description || null,
        hourlyCost: task.hourlyCost || null,
        dailyHours: task.dailyHours || null,
      }));
    }
  }

  return formattedData;
};
