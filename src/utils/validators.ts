export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
export const validateName = (name: string): boolean => name.length > 0 && name.length <= 50;
