import { ErrorMessage } from "formik";
import React from "react";

interface props {
  name: string;
}
export const CustomErrorMessage = ({ name }: props) => {
  return (
    <div>
      {" "}
      <div
        // name={name}
        // component={"div"}
        className="text-red-600 mt-1 font-thin"
      >
        {name}
      </div>
    </div>
  );
};
