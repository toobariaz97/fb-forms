/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CountryCode from "country-codes-list";

interface Country {
  countryCode: string;
  countryCallingCode: string;
}

export const PhoneNumberField = ({
  phone,
  setFormData,
  setPhone,
  value,
  handleChange,
  formData,
}) => {
  const [code, setCode] = useState("+971"); // Default country code
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [countryList, setCountryList] = useState<Country[]>([]);

  // Load country codes list on component mount
  useEffect(() => {
    const defaultCountryCode = CountryCode.all().map((item: any) => ({
      countryCode: item.countryCode,
      countryCallingCode: `+${item.countryCallingCode}`,
    }));
    setCountryList(defaultCountryCode);
  }, []);

  // Handle phone number validation (only numbers allowed)
  const validateNumber = (input: string) => {
    handleChange();
    const sanitizedInput = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPhoneNumber(sanitizedInput);
    setPhone(code + phoneNumber);
    console.log({ phone });
    setFormData({ ...formData, phoneNumber: phone });
    console.log({ formData });
  };

  return (
    <div className="flex w-100">
      <div className="w-100 bg-transparent border-b px-1 py-1 mr-2">
        <select
          className="bg-transparent border-none"
          onChange={(e) => setCode(e.target.value)}
          value={code} // Controlled value for select
        >
          {countryList.map((item, index) => (
            <option
              value={item.countryCallingCode} // Setting country calling code as option value
              key={index}
              className="bg-[#262626] text-white"
            >
              {item.countryCode} {item.countryCallingCode}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <input
          name="phoneNumber"
          className="bg-transparent border-none w-full PhoneInputInput"
          type="text"
          value={phoneNumber}
          onChange={(e) => validateNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
    </div>
  );
};
