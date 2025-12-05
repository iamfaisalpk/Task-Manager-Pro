export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateTaskForm = (formData) => {
  const errors = {}

  if (!formData.title?.trim()) {
    errors.title = 'Title is required'
  }

  if (!formData.description?.trim()) {
    errors.description = 'Description is required'
  }

  if (!formData.priority) {
    errors.priority = 'Priority is required'
  }

  if (!formData.status) {
    errors.status = 'Status is required'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}
