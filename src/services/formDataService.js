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
      painPoints: formData.step3?.painPoints || [],
      softwareInteractions: formData.step3?.softwareInteractions || null,
      tools: formData.step3?.tools || [],
      hasSpecificTasks: formData.step3?.hasSpecificTasks ?? false,
    },
  };

  // Only include automation tasks if user has specific tasks
  if (formData.step3?.hasSpecificTasks) {
    formattedData.automationTasks =
      formData.step4?.tasks?.map((task) => ({
        title: task.title || null,
        description: task.description || null,
        hourlyCost: task.hourlyCost || null,
        dailyHours: task.dailyHours || null,
      })) || [];
  }

  return formattedData;
};
