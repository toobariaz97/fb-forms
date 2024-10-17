import React, { useState } from "react";
import { FormConfig } from "@/config/forms";
import { X, Info } from "lucide-react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import CustomTxtField from "../common/CustomTextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
export const PersonalInfo = () => {
  const validationSchema = object({
    fullName: string().required("Name is required."),
    email: string().email().required("Email is required."),
    phoneNumber: string().required("Phone number is required"),
    workPhoneNumber: string(),
  });
  const config = FormConfig;
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Mohamed Salar",
    email: "dtoublimited@gmail.com",
    phoneNumber: "506311705",
    workPhoneNumber: "563132842",
  });
  const initialValues = {
    fullName: "Mohamed Salar",
    email: "dtoublimited@gmail.com",
    phoneNumber: "506311705",
    workPhoneNumber: "563132842",
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleClear = (field: string) => {
    setFormData({ ...formData, [field]: "" });
  };
  const onSubmit = () => {};
  return (
    <div className="bg-[#262626] text-white p-6 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Contact information</h2>
        <Info className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-gray-400 text-sm mb-6">
        {/* Kindly fill the form so that our executives can get in touch with you
            shortly */}
        {config.heading}
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({}) => (
          <Form>
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <CustomTxtField
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    label="Full name"
                  />
                  {/* {formData.fullName && (
                    <button
                      type="button"
                      onClick={() => handleClear("fullName")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )} */}
                </div>
              </div>
              <div>
                <div className="relative">
                  <CustomTxtField
                    type="email"
                    name="email"
                    value={formData.email}
                  />
                  {formData.email && (
                    <button
                      type="button"
                      onClick={() => handleClear("email")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Dubai Luxury Properties may contact you to follow up
                </p>
              </div>
              <div>
                <label
                  htmlFor="workPhoneNumber"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Phone number
                </label>
                <div className="flex">
                  <PhoneInput
                    name="phoneNumber"
                    className="  bg-transparent w-full"
                    value={phone}
                    onChange={() => setPhone}
                  />
                  {/* <div className="relative w-24 mr-2">
                    <select className="w-full bg-gray-800 rounded px-3 py-2 text-white appearance-none">
                      <option>AE +971</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <div className="relative flex-grow">
                    <CustomTxtField
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {formData.phoneNumber && (
                      <button
                        type="button"
                        onClick={() => handleClear("phoneNumber")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div> */}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Dubai Luxury Properties may contact you to follow up
                </p>
              </div>
              <div>
                <label
                  htmlFor="workPhoneNumber"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Work phone number
                </label>
                <div className="flex">
                  <PhoneInput
                    name="phoneNumber"
                    className="  bg-transparent w-full"
                    value={phone}
                    onChange={()=>setPhone}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Dubai Luxury Properties may contact you to follow up
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
