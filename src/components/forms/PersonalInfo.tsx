import React from "react";
import CustomTxtField from "../common/CustomTextField";
import { PhoneNumberField } from "../common/PhoneNumberField";
import { X } from "lucide-react";
// import { CustomErrorMessage } from "../common/CustomErrorMessage";

export const PersonalInfo = ({
  setFormData,
  formData,
  handleChange,
  error,
}) => {
  const handleClear = (field: string) => {
    setFormData({ ...formData, [field]: "" });
  };
  return (
    <div className="bg-[#262626] text-white p-6 rounded-lg max-w-md mx-auto w-[450px]">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

      <div className="space-y-4">
        <div className="relative">
          <CustomTxtField
            type="text"
            name="fullName"
            label="Full name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Ella"
          />
          {formData.fullName && (
            <button
              type="button"
              onClick={() => handleClear("fullName")}
              className="absolute right-2 top-1/2 "
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          {/* <CustomErrorMessage name="fullName" /> */}
        </div>
        <div className="relative">
          <CustomTxtField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />
          {formData.email && (
            <button
              type="button"
              onClick={() => handleClear("email")}
              className="absolute right-2 top-1/2 "
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          {/* <CustomErrorMessage name="email" /> */}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Phone number
          </label>
          <PhoneNumberField
            // setPhone={setPhone}
            value={formData.phoneNumber}
            handleChange={handleChange}
          />
          {/* <CustomErrorMessage name="phoneNumber" /> */}
        </div>
        <div>
          <CustomTxtField
            name="nationality"
            label="Nationality"
            onChange={handleChange}
          />
          {/* <CustomErrorMessage name="nationality" /> */}
        </div>
        {/* <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700 transition duration-300 mt-4"
                disabled={isSubmitting}
              >
                Continue
              </button> */}
        {error !== "" && <div className="text-red-600 ">{error}</div>}
      </div>
      {/* </Formik> */}
    </div>
  );
};
