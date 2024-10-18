import React, { useState } from "react";

export const Questionaries = ({ questions, handleChange, error }) => {
  const options = [questions.option1, questions.option2, questions.option3];
  const [selectedItem, setSelectedItem] = useState("");

  const handleOptionSelect = (value: string) => {
    handleChange(value);
    setSelectedItem(value);
  };

  return (
    <div className="bg-[#262626] text-white p-6 rounded-lg  w-[450px] mx-auto ">
      <div className="flex items-center justify-start  mb-4">
        <h2 className="text-xl font-semibold mr-2"> {questions.question}</h2>
      </div>
      <div>
        {options.map((item) => (
          <div
            key={item}
            className={`flex flex-col items-center p-3 mx-auto rounded-full mb-2 cursor-pointer ${
              item === selectedItem ? "bg-gray-700" : "bg-[#525252]"
            }`}
            onClick={() => handleOptionSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
      {error !== "" && <div className="text-red-600">{error}</div>}
    </div>
  );
};
