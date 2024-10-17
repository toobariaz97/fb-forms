"use client";
import { PersonalInfo } from "@/components/forms/PersonalInfo";
import { X, ChevronLeft } from "lucide-react";

export default function SurveyForm() {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="flex flex-col ">
        <div className="flex justify-between mb-3 text-white">
          <ChevronLeft className="" size={25} />
          <X />
        </div>
        <div className="bg-[#262626] rounded-lg ">
          <PersonalInfo />
          <div className="bg-gray-500 w-full h-1"></div>
          <div className=" h-[100px] p-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
