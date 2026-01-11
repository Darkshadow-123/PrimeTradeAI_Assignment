import { useState } from 'react';
import { validateEmail, validatePassword, validateRequired } from '../utils/helpers';

export const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = {};

    if ('email' in values && !validateEmail(values.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if ('password' in values && !validatePassword(values.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if ('name' in values && !validateRequired(values.name)) {
      newErrors.name = 'Name is required';
    }

    if ('title' in values && !validateRequired(values.title)) {
      newErrors.title = 'Title is required';
    }

    return newErrors;
  };

  const validateForm = () => {
    const newErrors = validate();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
  };
};
