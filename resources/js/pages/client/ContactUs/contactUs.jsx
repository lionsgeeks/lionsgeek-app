import { Button } from "../../../components/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import women from "../../../../assets/images/women_pointing.png";
import { useForm } from "@inertiajs/react"; 
import AppLayout from '@/layouts/app-layout';

const ContactUs = () => {
  const womenRef = useRef(null);
  const URL = 0;
  const selectedLanguage = 'en';
  const darkMode = true;

  useEffect(() => {
    gsap.fromTo(
      womenRef.current,
      { x: selectedLanguage == "ar" ? "-100%" : "100%", opacity: "0" },
      { x: "0%", duration: 1, delay: 0.5, opacity: "1", ease: "power2.out" }
    );
  }, []);

  useGSAP(() => {
    let tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    tl.to(".tessst", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    }).to(
      ".input",
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.3,
        "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      },
      "-=1.4"
    );
  });

  const { data, setData, post, processing, reset } = useForm({
    first: "",
    last: "",
    phone: "",
    email: "",
    message: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const formFilled = Object.values(data).every(
    (value) => value.trim() !== ""
  );
  const [showModal, setShowModal] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    post('/contact', {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowModal(true);
      },
    });
  };

  return (
    <AppLayout>
      <div
        className={`py-[12vh] flex flex-col justify-center lg:px-16 px-5 mt-16 overflow-x-hidden ${
          darkMode ? "bg-[#0f0f0f]" : "bg-white"
        }`}
      >
        <div
          className={`flex lg:flex-row flex-col justify-between gap-8 ${
            selectedLanguage === "ar" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="lg:w-[50%] flex flex-col gap-6 px-3">
            <div className="tessst opacity-0 translate-y-12 [clip-path: polygon((0 100%, 100% 100%, 100% 100%, 0% 100%)]">
              <h1
                className={`font-bold text-[2.1rem] ${
                  darkMode ? "text-white" : "text-black"
                } ${selectedLanguage === "ar" ? "text-end" : ""}`}
              >
                Ready to start?
              </h1>
              <h1
                className={`font-bold text-[2.1rem] ${
                  darkMode ? "text-white" : "text-black"
                } ${selectedLanguage === "ar" ? "text-end" : ""}`}
              >
                We've got you covered
              </h1>
            </div>
            <div className="flex flex-col gap-2 tessst opacity-0 translate-y-12 [clip-path: polygon((0 100%, 100% 100%, 100% 100%, 0% 100%)]">
              <p
                className={`${darkMode ? "text-white" : "text-black"} ${
                  selectedLanguage === "ar" ? "text-end" : ""
                }`}
              >
                Have a question?
              </p>
              <p
                className={`${darkMode ? "text-white" : "text-black"} ${
                  selectedLanguage === "ar" ? "text-end" : "w-4/5"
                } `}
              >
                An idea you're bursting to share? We're all ears! Drop us a line and let's get this conversation started.
              </p>
            </div>
            <div
              className={`flex flex-col gap-1 text-gray-500 font-thin text-[0.9rem] ${
                selectedLanguage === "ar" ? "items-end" : ""
              }`}
            >
              <div
                className={`flex items-center ${
                  selectedLanguage === "ar" ? "flex-row-reverse" : ""
                } gap-2 tessst opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                  style={{ stroke: darkMode ? "#fee819" : "#0f0f0f" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className={`${darkMode ? "text-white" : "text-black"}`}>
                  4th floor, Route de Rabat Ain Sbaa Casablanca
                </p>
              </div>
              <div
                className={`flex items-center ${
                  selectedLanguage === "ar" ? "flex-row-reverse" : ""
                } gap-2 tessst opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                  style={{ stroke: darkMode ? "#fee819" : "#0f0f0f" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <p className={`${darkMode ? "text-white" : "text-black"}`}>
                  +212 522 662 660
                </p>
              </div>
              <div
                className={`flex items-center ${
                  selectedLanguage === "ar" ? "flex-row-reverse" : ""
                } gap-2 tessst opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)]`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                  style={{ stroke: darkMode ? "#fee819" : "#0f0f0f" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <p className={`${darkMode ? "text-white" : "text-black"}`}>
                  contact@lionsgeek.ma
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={onFormSubmit}
            className={`lg:w-[40%] relative py-6 px-7 shadow-md border border-white/55 rounded-lg flex ${
              selectedLanguage === "ar" ? "items-end" : "items-start"
            } flex-col gap-6 bg-200/75`}
          >
            <div
              ref={womenRef}
              className={`absolute w-[17rem] lg:flex hidden z-10 top-0 ${
                selectedLanguage === "ar" ? "left-full" : "right-full"
              }`}
            >
              <img
                loading="lazy"
                className={`object-cover ${
                  selectedLanguage == "ar" && "transform scale-x-[-1]"
                }`}
                src={women}
                alt=""
              />
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)] relative h-11 w-full min-w-[200px]">
              <input
                onChange={handleInputChange}
                value={data.first}
                type="text"
                name="first"
                id="first"
                className={`${
                  selectedLanguage === "ar" ? "text-end" : ""
                } peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0`}
                placeholder=" "
                style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
              />
              <label
                className={`pt-1 pointer-events-none absolute ${
                  selectedLanguage === "ar" ? "right-0" : "left-0"
                } -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha ${
                  darkMode ? "text-white/50" : "text-gray-500"
                }`}
              >
                first name
              </label>
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)] relative h-11 w-full min-w-[200px]">
              <input
                onChange={handleInputChange}
                value={data.last}
                type="text"
                name="last"
                id="last"
                className={`${
                  selectedLanguage === "ar" ? "text-end" : ""
                } peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
                style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
              />
              <label
                className={`pt-1 pointer-events-none absolute ${
                  selectedLanguage === "ar" ? "right-0" : "left-0"
                } -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha ${
                  darkMode ? "text-white/50" : "text-gray-500"
                }`}
              >
                last name
              </label>
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)] relative h-11 w-full min-w-[200px]">
              <input
                onChange={handleInputChange}
                value={data.phone}
                type="tel"
                name="phone"
                id="phone"
                className={`${
                  selectedLanguage === "ar" ? "text-end" : ""
                } peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
                style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
              />
              <label
                className={`pt-1 pointer-events-none absolute ${
                  selectedLanguage === "ar" ? "right-0" : "left-0"
                } -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha ${
                  darkMode ? "text-white/50" : "text-gray-500"
                }`}
              >
                phone number
              </label>
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)] relative h-11 w-full min-w-[200px]">
              <input
                onChange={handleInputChange}
                value={data.email}
                type="email"
                name="email"
                id="email"
                className={`${
                  selectedLanguage === "ar" ? "text-end" : ""
                } peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
                style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
              />
              <label
                className={`pt-1 pointer-events-none absolute ${
                  selectedLanguage === "ar" ? "right-0" : "left-0"
                } -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha ${
                  darkMode ? "text-white/50" : "text-gray-500"
                }`}
              >
                email
              </label>
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path: polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)] relative h-11 w-full min-w-[200px]">
              <textarea
                name="message"
                id="message"
                onChange={handleInputChange}
                value={data.message}
                className={`${
                  selectedLanguage === "ar" ? "text-end" : ""
                } resize-none peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-alpha focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                placeholder=" "
                style={{ color: darkMode ? "#ffffff" : "#0f0f0f" }}
              />
              <label
                className={`pt-1 pointer-events-none absolute ${
                  selectedLanguage === "ar" ? "right-0" : "left-0"
                } -top-1.5 transition-all after:content[' '] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-alpha ${
                  darkMode ? "text-white/50" : "text-gray-500"
                }`}
              >
                message
              </label>
            </div>
            <div className="input opacity-0 translate-y-12 [clip-path:polygon(0 100%, 95% 100%, 100% 100%, 0% 100%)]">
              <Button
                disabled={!formFilled || processing}
                className={"text-[0.9rem] font-normal mt-2 px-4"}
              >
                {processing ? (
                  <div role="status" className="flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin fill-[#fee819]"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <>send message</>
                )}
              </Button>
            </div>
          </form>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white md:w-[38vw] w-64 h-64 p-6 rounded shadow-lg flex flex-col items-center justify-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#22c55e"
                className="size-9"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-lg font-medium text-gray-500">Success!</h2>
              <p>Thank you, your message has been received!</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-alpha font-medium rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ContactUs;