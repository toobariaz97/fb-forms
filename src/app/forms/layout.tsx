"use client";
import { PersonalInfo } from "@/components/forms/PersonalInfo";
import { Questionaries } from "@/components/forms/Questionaries";
import { FormConfig } from "@/config/forms";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// interface IpInfo {
//   status: string;
//   country: string;
//   countryCode: string;
//   region: string;
//   regionName: string;
//   city: string;
//   zip: string;
//   lat: number;
//   lon: number;
//   timezone: string;
//   isp: string;
//   org: string;
//   as: string;
//   query: string;
// }

export default function SurveyForm() {
  // const [ipData, setIpData] = useState<IpInfo>();
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [browserInfo, setBrowserInfo] = useState({
    userAgent: "",
    language: "",
    platform: "",
    cookiesEnabled: false,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  useEffect(() => {
    setBrowserInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  // const toggleModal = () => {
  //   setShow(!show);
  // };
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

  // const fetchIp = async () => {
  //   try {
  //     const res = await fetch("/api/main", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setIpData(await res.json());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

      try {
        setLoading(true);
        const response = await fetch("/api/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            browserInfo,
            location,
            investmentBudget,
            preferredUnit,
          }),
        });

        if (response.ok) {
          setShow(true);
          console.log("Form submitted successfully");
        } else {
          setLoading(false);
          console.error("Form submission failed");
        }
      } catch (error) {
        setLoading(false);
        setError(error);
        console.error("Error submitting form:", error);
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex justify-center h-screen ">
      {!show ? (
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
              disabled={loading}
              className="cursor-pointer  w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition duration-300"
              onClick={onSubmit}
            >
              {step == 3 ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center mt-20
          bg-[#262626] rounded-lg p-6
          text-2xl h-[200px] text-white font-semibold capitalize text-center"
        >
          Thank you for submission.
        </div>
      )}
    </div>
  );
}
