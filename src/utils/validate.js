
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isValidPassword = (password) => {
  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};


export const isValidName = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return name.trim() !== "" && nameRegex.test(name);
};
