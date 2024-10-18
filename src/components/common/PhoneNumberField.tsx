/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CountryCode from "country-codes-list";

interface Country {
  countryCode: string;
  countryCallingCode: string;
}

export const PhoneNumberField = ({ value, handleChange }) => {
  const [code, setCode] = useState("+971"); // Set default country code here
  // const [phoneNumber, setPhoneNumber] = useState(code + value);
  // setPhone(phoneNumber);
  const [countryList, setCountryList] = useState<Country[]>([]);

  // const validateNumber = (value: string) => {
  //   let error;
  //   const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

  //   if (!value) {
  //     error = "Phone number is required";
  //   } else if (!phoneRegExp.test(value)) {
  //     error = "Invalid phone number format";
  //   }
  //   return error;
  // };

  useEffect(() => {
    const defaultCountryCode = CountryCode.all().map((item: any) => ({
      countryCode: item.countryCode,
      countryCallingCode: `+${item.countryCallingCode}`,
    }));
    setCountryList(defaultCountryCode);
  }, []);

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
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
