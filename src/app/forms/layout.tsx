"use client";
import { PersonalInfo } from "@/components/forms/PersonalInfo";
import { Questionaries } from "@/components/forms/Questionaries";
import { FormConfig } from "@/config/forms";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SuccessModal } from "@/components/common/modals/SuccessModal";

export default function SurveyForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationality: "",
  });
  const [preferredUnit, setPreferredUnit] = useState("");
  const [investmentBudget, setInvestmentBudget] = useState("");
  const [error, setError] = useState({
    formError: "",
    preferredError: "",
    investmentError: "",
  });
  const [progressBar, setProgressBar] = useState(0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => {
    if (step === 1) {
      redirect("/");
      return;
    }
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e?.target.name]: e?.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (
        formData.email === "" ||
        formData.fullName === "" ||
        formData.nationality === "" ||
        formData.phoneNumber === ""
      ) {
        setError({ ...error, formError: "Please fill the required fields." });
        return;
      }
      setProgressBar(33);
      console.log({ formData });
    }
    if (step === 2) {
      if (preferredUnit === "") {
        setError({ ...error, preferredError: "Please select one option." });
        return;
      }
      setProgressBar(66);
      console.log({ preferredUnit });
    }
    if (step === 3) {
      if (investmentBudget === "") {
        setError({ ...error, investmentError: "Please select one option." });
        return;
      }
      setProgressBar(100);
      console.log({ investmentBudget });
      // Final step: submit the form
      setShow(true);
      setLoading(true);
      setFormData({
        ...formData,
        email: "",
        fullName: "",
        nationality: "",
        phoneNumber: "",
      });
      setPreferredUnit("");
      setInvestmentBudget("");

      redirect("/");
      // try {
      //   setLoading(true);
      //   const response = await fetch("/api/submit-form", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });

      //   if (response.ok) {
      //     console.log("Form submitted successfully");
      //   } else {
      //     console.error("Form submission failed");
      //   }
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      // }
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex justify-center h-screen ">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between mb-3 text-white">
            <ChevronLeft
              className="cursor-pointer"
              size={25}
              onClick={prevStep}
            />
          </div>
          <div className="bg-[#262626] rounded-lg ">
            <form>
              {step === 1 && (
                <PersonalInfo
                  setFormData={setFormData}
                  handleChange={handleChange}
                  formData={formData}
                  error={error.formError}
                />
              )}
              {step === 2 && (
                <Questionaries
                  questions={FormConfig.secondForm}
                  handleChange={setPreferredUnit}
                  error={error.preferredError}
                />
              )}
              {step === 3 && (
                <Questionaries
                  questions={FormConfig.thirdForm}
                  handleChange={setInvestmentBudget}
                  error={error.investmentError}
                />
              )}
            </form>
          </div>
        </div>
        <div className="w-100 h-[100px] px-6 p-2 bg-[#262626] border-t-2 border-gray-500 ">
          <div className="w-full h-1 bg-slate-800 rounded-lg my-3">
            <div
              className={`h-full rounded-lg bg-blue-600`}
              style={{ width: `${progressBar}%` }}
            />
          </div>
          <button
            type={!loading ? "button" : "submit"}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition duration-300"
            onClick={onSubmit}
          >
            {step == 3 ? "Submit" : "Continue"}
          </button>
          <SuccessModal
            data={{
              ...formData,
              investmentBudget,
              preferredUnit,
            }}
            isShow={show}
            toggleModal={toggleModal}
          />
        </div>
      </div>
    </div>
  );
}
