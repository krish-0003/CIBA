import React, { createContext, useContext, useState, useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step0: {},
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  // Handle page reload/refresh
  useBeforeUnload(
    React.useCallback(
      (event) => {
        if (isFormDirty) {
          event.preventDefault();
          event.returnValue = "";
          return "";
        }
      },
      [isFormDirty]
    )
  );

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
    setIsFormDirty(true);
  };

  const resetForm = () => {
    setFormData({
      step0: {},
      step1: {},
      step2: {},
      step3: {},
      step4: {},
      step5: {},
    });
    setIsFormDirty(false);
  };

  const value = {
    formData,
    updateFormData,
    resetForm,
    isFormDirty,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
