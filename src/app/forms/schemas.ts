import { object, string } from "yup";
export const PersonalInfoValidation = object({
    fullName: string().required("Name is required."),
    email: string().email().required("Email is required."),
    phoneNumber: string().required("Phone number is required"),
    nationality: string(),
  });