import { useEffect, useState } from "react";
import { useAppContext } from "../../utils/contextProvider";
import axios from "axios";
import Modal from "../../components/Modal";
import LoadingPage from "../Loading";
import TransText from "../../components/TransText.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import AppLayout from '@/layouts/app-layout';

const Privatesession = () => {
  const { selectedLanguage, URL, sessions, privatesession , darkMode , fetchInfosession } = useAppContext();
  const [chosenSession, setChosenSession] = useState("");
  const [sending, setSending] = useState(false);
  const [validate, setValidate] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [pref, setPref] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const dateLanguage = {
    en: "US",
    fr: "FR",
    ar: "AR",
  };

      useEffect(() => {
          fetchInfosession()
      }, [])

  const [motivation, setMotivation] = useState("");
  const [source, setSource] = useState("");
  const formFields = [
    {
      name: "full_name",
      label: { en: "Full Name", fr: "Nom Complet", ar: "الاسم الكامل" },
      type: "text",
    },
    {
      name: "email",
      label: { en: "Email", fr: "Email", ar: "البريد الإلكتروني" },
      type: "email",
    },
    {
      name: "birthday",
      label: { en: "Birthday", fr: "Date de Naissance", ar: "تاريخ الميلاد" },
      type: "date",
    },
    {
      name: "phone",
      label: { en: "Phone", fr: "Téléphone", ar: "رقم الهاتف" },
      type: "tel",
    },
  ];

  const initialState = formFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(false);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motivation && motivation.length < 150) {
      // alert("Please Write 150 Characters in Your Motivation");
    } else {
      window.scrollTo(0, 0);
      setSending(true);
      const allData = {
        ...formData,
        info_session_id: chosenSession,
        motivation: motivation,
        source: source,
        gender: gender,
        city: city,
        prefecture: pref,
      };

      const newForm = new FormData();
      Object.keys(allData).forEach((key) => {
        newForm.append(key, allData[key]);
      });

      axios
        .post(URL + "participate", newForm)
        .then((res) => {
          console.log(res);
          setSending(false);
          if (res.data.status === 69) {
            setEmailError(true);
            return;
          } else if (res.data.status === 96) {
            setRefresh(true);
          }
          setFormData(initialState);
          setMotivation("");
          setConfirmation(true);
          if (res.status === 200) {
            setValidate(true);
            fetchInfosession()
          } else {
            setValidate(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  };

  useEffect(() => {
    if (error) {
      setFormData(initialState);
      setValidate(false);
      setSending(false);
      setConfirmation(true);
    }

    return () => {
      setError("");
    };
  }, [error, privatesession]);

  const Required = () => {
    return <span className="text-lg font-bold text-red-500">*</span>;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get formatted date: Monday 20 novembre 2024
    const formattedDate = date.toLocaleDateString(
      `${selectedLanguage}-${dateLanguage[selectedLanguage]}`,
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    // Get formatted time: 16:49
    const formattedTime = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} ${formattedTime}`;
  }

  // prevent l user mn anah idir copy past hehehe  nihahahahaha
  const handlePaste = (event) => {
    const messages = {
      en: 'Pasting is disabled. Please type your input 🙂.',
      fr: "Le collage est désactivé. Veuillez saisir votre texte 🙂.",
      ar: "لصق النص غير مسموح. يرجى كتابة النص 🙂."
    };
    event.preventDefault();
    alert(messages[selectedLanguage] || messages.en);
  };

  const today = chosenSession
    ? new Date(privatesession?.start_date)
    : new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(
    today.getFullYear() - 30,
    today.getMonth(),
    today.getDate()
  );
  // Format dates as YYYY-MM-DD
  const maxDateString = maxDate.toISOString().split("T")[0];
  const minDateString = minDate.toISOString().split("T")[0];

  const [formation, setFormation] = useState("");
  // console.log(privatesession);
  
  return (
    <AppLayout>
    <div
      className={`px-4 pt-24 lg:px-16 lg:pt-28 overflow-hidden ${darkMode ? "bg-[#0f0f0f]" : "bg-white"
        }`}
      dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
    >
      {!sending ? (
        <>
          {privatesession ? (
            (privatesession) ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`mx-auto p-6  rounded-lg shadow-md space-y-4 ${darkMode ? "bg-[#212529]" : "bg-white"
                    }`}
                >
                  <div className={`flex flex-col space-y-2 `}>
                    <label
                      htmlFor="sessions"
                      className={` ${darkMode ? "text-white" : "text-gray-700"
                        } `}
                    >
                      <TransText
                        en="Choose a Session"
                        fr="Choisir une session"
                        ar="اختر جلسة"
                      />
                      : <Required />
                    </label>

                    <div className="flex flex-col md:flex-row lg:items-center lg:gap-2 gap-y-4">
                     
                      <label
                        htmlFor="sessions"
                        className={` ${darkMode ? "text-white" : "text-gray-700"
                          }  lg:hidden`}
                      >
                        <TransText
                          en="Choose a Session Date"
                          fr="Choisissez une date de session"
                          ar="اختر تاريخ الجلسة"
                        />

                        : <Required />
                      </label>
                      <select
                        name="sessions"
                        id="sessions"
                        value={chosenSession}
                        onChange={(e) => {
                          setChosenSession(e.target.value);
                        }}
                        className="w-full rounded border border-gray-300 px-4 py-2 appearance-none"
                        required
                      >
                       
                        {
                          
                          
                          privatesession?.isAvailable && (
                                <option 
                                selected
                                  className="text-lg"
                                  value={privatesession?.id}
                                >
                                  {formatDate(privatesession?.start_date)}
                                </option>
                              )
                          }
                       
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {formFields.map((field) => (
                      <div
                        key={field.name}
                        className="flex flex-col space-y-2 w-full sm:w-[49.7%]"
                      >
                        <label
                          htmlFor={field.name}
                          className={`${darkMode ? "text-white" : "text-gray-700"
                            }`}
                        >
                          <TransText {...field.label} /> : <Required />
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          min={minDateString}
                          max={maxDateString}
                          placeholder={field.label[selectedLanguage]}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-beta ${emailError && field.name === "email"
                            ? "text-red-500 border-red-500"
                            : "border-gray-300 text-black"
                            }`}
                          required
                        />
                        {emailError && field.name === "email" && (
                          <span className="text-red-500 text-sm">
                            The email is already exist
                          </span>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-col space-y-2 w-full sm:w-[49.7%] ">
                      <label
                        htmlFor="city"
                        className={` ${darkMode ? "text-white" : "text-gray-700"
                          } `}
                      >
                        <TransText en="City" fr="Ville" ar="مدينة" />
                        : <Required />
                      </label>
                      <select
                        name="city"
                        id="city"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        value={city}
                        className="w-full rounded border border-gray-300 px-4 py-[11px] appearance-none"
                        required
                      >
                        <option value="" disabled>
                          <TransText en="City" fr="Ville" ar="مدينة" />
                        </option>
                        <option value="casablanca">
                          <TransText
                            en="Casablanca"
                            fr="Casablanca"
                            ar="الدار البيضاء"
                          />
                        </option>
                        <option value="mohammedia">
                          <TransText
                            en="Mohammedia"
                            fr="Mohammedia"
                            ar="المحمدية"
                          />
                        </option>
                        <option value="other">
                          <TransText en="Other" fr="Autres" ar="اخر" />
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2 w-full sm:w-[49.7%]">
                      <label
                        htmlFor="prefecture"
                        className={` ${darkMode ? "text-white" : "text-gray-700"
                          } `}
                      >
                        <TransText
                          en="Prefecture"
                          fr="Préfecture"
                          ar="العمالة"
                        />
                        : <Required />
                      </label>
                      <select
                        name="prefecture"
                        value={pref}
                        id="prefecture"
                        onChange={(e) => {
                          setPref(e.target.value);
                        }}
                        className="w-full rounded border border-gray-300 px-4 py-[11px] appearance-none"
                        required
                      >
                        <option value="" disabled>
                          <TransText
                            en="Prefecture"
                            fr="Préfecture"
                            ar="العمالة"
                          />
                        </option>
                        <option value="none">
                          <TransText en="None" fr="Aucun" ar="لا شيء" />
                        </option>
                        {[
                          "Casablanca Anfa",
                          "Sidi Bernoussi",
                          "Ain Sbaa Hay Mohammedi",
                          "Al Fida Mers Sultan",
                          "Moulay Rachid",
                          "Ain Chock",
                          "Ben M'Sick Sidi Othmane",
                          "Hay Hassani",
                        ].map((el, ind) => (
                          <option
                            key={ind}
                            value={el.toLowerCase().replace(/ /g, "_")}
                          >
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2 w-full sm:w-[49.7%]">
                      <label
                        htmlFor="gender"
                        className={` ${darkMode ? "text-white" : "text-gray-700"
                          } `}
                      >
                        <TransText en="Gender" fr="Genre" ar="الجنس" />
                        <Required />
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        className="w-full rounded border border-gray-300 px-4 py-[11px] appearance-none"
                        required
                      >
                        <option value="" selected disabled>
                          <TransText en="Gender" fr="Genre" ar="الجنس" />
                        </option>
                        <option value="male">
                          <TransText en="Male" fr="Homme" ar="ذكر" />
                        </option>
                        <option value="female">
                          <TransText en="Female" fr="Female" ar="أنثى" />
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2 w-full sm:w-[49.7%]">
                      <label
                        htmlFor="source"
                        className={`${darkMode ? "text-white" : "text-black"} `}
                      >
                        <TransText
                          en="Where Have you Heard of LionsGeek"
                          fr="Où avez-vous entendu parler de LionsGeek"
                          ar="أين سمعت عن LionsGeek"
                        />
                        : <Required />
                      </label>
                      <input
                        type="text"
                        value={source}
                        name="source"
                        id="source"
                        placeholder={selectedLanguage == "en" ? "Source" : selectedLanguage == "fr" ? "Source" : "مصدر"}
                        onChange={(e) => {
                          setSource(e.target.value);
                        }}
                        className="px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beta"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-2 w-full">
                      <label
                        htmlFor="motivation"
                        className={`${darkMode ? "text-white" : "text-black"} `}
                      >
                        <TransText
                          en="Motivation"
                          fr="Motivation"
                          ar="الدافع"
                        />
                        :
                        <Required />
                        <span
                          className={`text-sm ${motivation.length < 150
                            ? "text-red-600"
                            : "text-green-500"
                            } `}
                        >
                          {" "}
                          {motivation.length}/150
                        </span>
                      </label>
                      <textarea
                        name="motivation"
                        id="motivation"
                        // bach mankhalich l user idir copy past  l l motivation 
                        onPaste={handlePaste}
                        className="border border-gray-400 rounded p-[6px]"
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder={selectedLanguage == "en" ? "Motivation" : selectedLanguage == "fr" ? "Motivation" : "دافع"}
                        value={motivation}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={sending}
                      className={`w-full py-2 px-4 bg-alpha font-semibold rounded-md ${darkMode ? "hover:bg-[#2d343a]" : "hover:bg-[#212529]"
                        } hover:text-alpha focus:outline-none`}
                    >
                      <TransText en="Submit" fr="Soumettre" ar="إرسال" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <>
                  <div
                    className={`flex justify-center items-center text-center w-full h-[16rem] text-[30px] font-bold  ${darkMode ? "text-white" : "text-black"
                      }`}
                  >
                    <TransText
                      fr="Aucune session disponible"
                      ar="لا توجد دورات متاحة"
                      en="No Sessions Available"
                    />
                  </div>
                </>
              </>
            )
          ) : (
            // <div className="h-[65vh] flex items-center justify-center flex-col gap-2">
            //   <h1 className="text-white text-3xl text-center">
            //     &#x28;⊙__⊙&#x29;
            //   </h1>

            //   <h1 className="text-white text-3xl font-semibold text-center">
            //     <TransText
            //       en="Oops!! You Should Not Be Seeing This Page Yet!"
            //       fr="Oups!! Vous ne devriez pas encore voir cette page !"
            //       ar="عذرًا!! يجب ألا ترى هذه الصفحة بعد!"
            //     />
            //   </h1>
            //   <br />
            //   <NavLink to={"/"}>
            //     <button className="px-4 py-2 bg-alpha rounded font-bold border-2 border-alpha hover:bg-black hover:text-alpha">
            //       <TransText
            //         en="Return to the homepage"
            //         fr="Retour à la page d'accueil"
            //         ar="الرجوع إلى الصفحة الرئيسية"
            //       />
            //       .
            //     </button>
            //   </NavLink>
            // </div>
            <>
              <div className=" pt-[5vh] flex flex-col lg:flex-row flex-wrap gap-x-3 gap-y-6">
                {Array.from({ length: 10 }).map((_, index) => (

                  <>
                    <div className="bg-skeleton1 animate-pulse rounded-lg lg:w-[48%] w-full h-[8vh]"></div>

                  </>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <LoadingPage load={true} />
      )}
      {!sending && confirmation && (
        <Modal
          validate={validate}
          confirm={confirmation}
          action={
            <button
              onClick={() => {
                setConfirmation(false);
                if (validate && refresh) {
                  window.location.reload();
                  // navigate(-1);
                }
              }}
              className="px-5 py-2 font-medium bg-alpha rounded"
            >
              Close
            </button>
          }
        />
      )}
    </div>
    </AppLayout>
  );
};

export default Privatesession;
