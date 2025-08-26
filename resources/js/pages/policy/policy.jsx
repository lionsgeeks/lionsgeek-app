import React, { useContext, useEffect, useRef } from "react";
import herocowork from "../../../assets/images/policy_asset.png";
import { useAppContext } from "@/context/appContext";
import gsap from "gsap";
import { TransText } from "../../components/TransText";
import AppLayout from "@/layouts/app-layout";
import { Head } from '@inertiajs/react';
const Policy = () => {
    const { darkMode, selectedLanguage, setSelectedLanguage } = useAppContext();

    const leftside = useRef(null);
    const rightside = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            leftside.current,
            { x: "-100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
        gsap.fromTo(
            rightside.current,
            { x: "100%", opacity: "0" },
            { x: "0%", duration: 0.5, delay: 0.5, opacity: "1", ease: "power2.out" }
        );
    }, []);
    return (


        <AppLayout>
            <Head title='policy' />
            <div>

                <div className={`px-4 pt-24 lg:px-16 lg:pt-28 overflow-hidden ${darkMode ? "bg-[#0f0f0f]" : ""} `}>
                    <div
                        className={`w-full items-center flex flex-col-reverse md:flex-row lg:flex-row gap-2  ${selectedLanguage == "ar" ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        <div
                            ref={leftside}
                            className="w-full md:w-1/2 lg:w-1/2 px-7 flex flex-col md:gap-2 gap-5 "
                        >
                            <h1 className={`text-2xl text-center md:text-3xl md:text-start lg:text-5xl md:pb-0 py-5 font-bold `}>

                                <TransText
                                    en=<span className={`${darkMode ? "text-white" : ""}`}>Personal <span className="text-yellow-400">Data Processing</span>  Policy</span>
                                    ar=<span className={`${darkMode ? "text-white" : ""}`}>سياسة <span className="text-yellow-400">معالجة البيانات</span> الشخصية</span>
                                    fr=<span className={`${darkMode ? "text-white" : ""}`}>Politique <span className="text-yellow-400">de Traitement des Données</span> Personnelles</span>
                                />

                            </h1>



                        </div>
                        <div
                            ref={rightside}
                            className="w-full md:w-1/2  lg:w-1/2 flex justify-center md:items-center"
                        >
                            <img loading="lazy" className="w-[80%]" src={herocowork} alt="img" />
                        </div>
                    </div>
                    {/* Content Section */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto rounded-lg p-8 mb-8">
                            <div className="space-y-8">
                                {/* Introduction */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="Personal Data Processing Policy"
                                            ar="سياسة معالجة البيانات الشخصية"
                                            fr="Politique de Traitement des Données Personnelles"
                                        />
                                    </h2>
                                    <p className={`${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="At LionsGEEK, we prioritize the protection of your personal data. In accordance with Moroccan law No. 09-08 on the protection of individuals with regard to the processing of personal data, we are committed to ensuring the security and confidentiality of the information collected on our website (www.lionsgeek.ma)."
                                            ar="في LionsGEEK، نعطي أهمية كبيرة لحماية بياناتك الشخصية. وفقًا للقانون المغربي رقم 09-08 المتعلق بحماية الأشخاص فيما يتعلق بمعالجة البيانات الشخصية، نحن ملتزمون بضمان أمان وسرية المعلومات التي تم جمعها على موقعنا الإلكتروني (www.lionsgeek.ma)."
                                            fr="Chez LionsGEEK, nous accordons une importance primordiale à la protection de vos données personnelles. Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, nous nous engageons à assurer la sécurité et la confidentialité des informations collectées sur notre site web (www.lionsgeek.ma)."
                                        />
                                    </p>
                                </section>

                                {/* Section 1 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText en="1. Collection of Personal Data" ar="1. جمع البيانات الشخصية" fr="1. Collecte des données personnelles" />
                                    </h2>
                                    <p className={` mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="We collect personal data about you only when necessary, such as:"
                                            ar="نقوم بجمع البيانات الشخصية الخاصة بك فقط عند الضرورة، مثل:"
                                            fr="Nous collectons des données personnelles vous concernant uniquement lorsque cela est nécessaire, notamment :"
                                        />
                                    </p>
                                    <ul className={`list-disc list-inside space-y-2 ml-4`}>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="When registering for our training or events."
                                                ar="عند التسجيل في دوراتنا التدريبية أو أحداثنا."
                                                fr="Lors de l'inscription à nos formations ou événements."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="When subscribing to our newsletter."
                                                ar="عند الاشتراك في نشرتنا الإخبارية."
                                                fr="Lors de l'abonnement à notre newsletter."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="When using our contact forms."
                                                ar="عند استخدام نماذج الاتصال الخاصة بنا."
                                                fr="Lors de l'utilisation de nos formulaires de contact."
                                            />
                                        </li>
                                    </ul>

                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="The types of data collected include, but are not limited to: name, surname, email address, phone number, postal address, and professional or academic information."
                                            ar="تشمل أنواع البيانات التي يتم جمعها، على سبيل المثال لا الحصر: الاسم، اللقب، عنوان البريد الإلكتروني، رقم الهاتف، العنوان البريدي، والمعلومات المهنية أو الأكاديمية."
                                            fr="Les types de données collectées incluent, sans s'y limiter : nom, prénom, adresse électronique, numéro de téléphone, adresse postale, et informations professionnelles ou académiques."
                                        />
                                    </p>
                                </section>

                                {/* Section 2 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="2. Purposes of Data Processing"
                                            ar="2. أهداف معالجة البيانات"
                                            fr="2. Finalités du traitement" />
                                    </h2>
                                    <p className={`mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="The personal data collected is used for:"
                                            ar="يتم استخدام البيانات الشخصية التي تم جمعها من أجل:"
                                            fr="Les données personnelles collectées sont utilisées pour :"
                                        />
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Managing your registrations for our programs and events."
                                                ar="إدارة تسجيلاتك في برامجنا وأحداثنا."
                                                fr="Gérer vos inscriptions à nos programmes et événements."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Communicating with you about our activities and services."
                                                ar="التواصل معك بشأن أنشطتنا وخدماتنا."
                                                fr="Communiquer avec vous concernant nos activités et services."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Improving your user experience on our website."
                                                ar="تحسين تجربتك على موقعنا الإلكتروني."
                                                fr="Améliorer votre expérience utilisateur sur notre site web."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Complying with our legal and regulatory obligations."
                                                ar="الامتثال لالتزاماتنا القانونية والتنظيمية."
                                                fr="Respecter nos obligations légales et réglementaires."
                                            />
                                        </li>
                                    </ul>

                                </section>




                                {/* Section 3 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="3. Consent"
                                            ar="3. الموافقة"
                                            fr="3. Consentement" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="By providing your personal data on our website, you expressly consent to their processing in accordance with the purposes mentioned above.
                        You have the right to withdraw your consent at any time by contacting us."
                                            ar="من خلال تقديم بياناتك الشخصية على موقعنا، فإنك توافق صراحة على معالجتها للأغراض المذكورة أعلاه.
لديك الحق في سحب موافقتك في أي وقت عن طريق الاتصال بنا."
                                            fr="En fournissant vos données personnelles sur notre site web, vous consentez expressément à leur traitement conforme aux finalités mentionnées ci-dessus.
                        Vous avez le droit de retirer votre consentement à tout moment en nous contactant."
                                        />
                                    </p>
                                </section>

                                {/* Section 4 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="4. Sharing of data"
                                            ar="4. مشاركة البيانات"
                                            fr="4. Partage des données" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="Your personal data will never be sold or transferred to third parties for commercial purposes.
                        They may be shared with partners or service providers only when necessary to carry out the services offered by LionsGEEK, in compliance with the provisions of Law No. 09-08."
                                            ar="لن يتم أبدًا بيع بياناتك الشخصية أو نقلها إلى أطراف ثالثة لأغراض تجارية.
 ولا يجوز مشاركتها مع الشركاء أو مقدمي الخدمات إلا عند الضرورة لتنفيذ الخدمات التي تقدمها LionsGEEK، وفقًا لأحكام القانون رقم 09-08."
                                            fr="Vos données personnelles ne seront jamais vendues ou cédées à des tiers à des fins commerciales.
                        Elles peuvent être partagées avec des partenaires ou prestataires uniquement lorsque cela est nécessaire à la réalisation des services proposés par LionsGEEK, dans le respect des dispositions de la loi n° 09-08."
                                        />
                                    </p>
                                </section>

                                {/* Section 5 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="5. Data security"
                                            ar="5. أمن البيانات"
                                            fr="5. Sécurité des données" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, disclosure or destruction."
                                            ar="لقد وضعنا التدابير الفنية والتنظيمية المناسبة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو الكشف أو التدمير."
                                            fr="Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, divulgation ou destruction."
                                        />
                                    </p>
                                </section>



                                {/* Section 6 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="6. Your rights"
                                            ar="6. حقوقك"
                                            fr="6. Vos droits" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="In accordance with Law No. 09-08, you have the following rights:"
                                            ar="وفقا للقانون رقم 09-08، لديك الحقوق التالية:"
                                            fr="Conformément à la loi n° 09-08, vous disposez des droits suivants :"
                                        />
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Right of access: You can request a copy of the data we hold about you."
                                                ar="حق الوصول: يمكنك طلب نسخة من البيانات التي نحتفظ بها عنك."
                                                fr="Droit d'accès : Vous pouvez demander une copie des données que nous détenons vous concernant."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Right of rectification: You can request the correction of your personal data if it is inaccurate or incomplete."
                                                ar="حق التصحيح: يمكنك طلب تصحيح بياناتك الشخصية إذا كانت غير دقيقة أو غير كاملة."
                                                fr="Droit de rectification : Vous pouvez demander la correction de vos données personnelles si elles sont inexactes ou incomplètes."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Right to object: You can object to your data being processed in certain cases."
                                                ar="الحق في الاعتراض: يمكنك الاعتراض على معالجة بياناتك في حالات معينة."
                                                fr="Droit d'opposition : Vous pouvez vous opposer à ce que vos données soient traitées dans certains cas."
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Right to deletion: You can request the deletion of your personal data."
                                                ar="حق الحذف: يمكنك طلب حذف بياناتك الشخصية."
                                                fr="Droit de suppression : Vous pouvez demander la suppression de vos données personnelles."
                                            />
                                        </li>
                                    </ul>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="To exercise these rights, please contact us at the following address:"
                                            ar="لممارسة هذه الحقوق، يرجى الاتصال بنا على العنوان التالي:"
                                            fr="Pour exercer ces droits, veuillez nous contacter à l'adresse suivante :"
                                        />
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Email: privacy@lionsgeek.ma"
                                                ar="البريد الإلكتروني:privacy@lionsgeek.ma"
                                                fr="Courriel : privacy@lionsgeek.ma"
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Postal address: Centre Ain Sebaa, Route de Rabat, Km 8, Casablanca 20050, Morocco"
                                                ar="حق التصحيح: يمكنك طلب تصحيح بياناتك الشخصية إذا كانت غير دقيقة أو غير كاملة."
                                                fr="Adresse postale : Centre Ain Sebaa, Route de Rabat, Km 8, Casablanca 20050, Maroc"
                                            />
                                        </li>

                                    </ul>

                                </section>


                                {/* Section 7 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="7. Retention period"
                                            ar="7. مدة الصلاحية"
                                            fr="7. Durée de conservation" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="Your personal data is kept only for the period necessary to achieve the purposes mentioned or to meet legal requirements."
                                            ar="يتم الاحتفاظ ببياناتك الشخصية فقط للفترة اللازمة لتحقيق الأغراض المذكورة أو لتلبية المتطلبات القانونية."
                                            fr="Vos données personnelles sont conservées uniquement pendant la durée nécessaire à la réalisation des finalités mentionnées ou pour satisfaire aux exigences légales."
                                        />
                                    </p>
                                </section>


                                {/* Section 8 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="8. Obligations and exemptions"
                                            ar="8. الالتزامات والإعفاءات"
                                            fr="8. Obligations et dispenses" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="In accordance with Article 12 of Law No. 09-08, the processing of your personal data by LionsGEEK is not subject to prior authorization from the National Commission for the Control of Personal Data Protection (CNDP). LionsGEEK, as a non-profit association, benefits from the exemption provided for the processing carried out in this context and only concerning its members or persons linked to its activities in accordance with its purpose."
                                            ar="وفقًا للمادة 12 من القانون رقم 09-08، لا تخضع معالجة بياناتك الشخصية بواسطة LionsGEEK للحصول على إذن مسبق من اللجنة الوطنية لمراقبة حماية البيانات الشخصية ( CNDP). تستفيد LionsGEEK، باعتبارها جمعية غير ربحية، من الإعفاء المقدم للمعالجة التي تتم في هذا السياق وتتعلق فقط بأعضائها أو الأشخاص المرتبطين بأنشطتها وفقًا لغرضها."
                                            fr="Conformément à l'article 12 de la loi n° 09-08, le traitement de vos données personnelles par LionsGEEK ne fait pas l'objet d'une autorisation préalable auprès de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP). LionsGEEK, en tant qu'association à but non lucratif, bénéficie de la dispense prévue pour les traitements effectués dans ce cadre et ne concernant que ses membres ou les personnes liées à ses activités conformément à son objet"
                                        />
                                    </p>
                                </section>


                                {/* Section 9 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="9. Modification of the policy"
                                            ar="9. تغيير السياسة"
                                            fr="9. Modification de la politique" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="We reserve the right to modify this policy at any time. Any changes will be posted on this page with an updated date."
                                            ar="نحن نحتفظ بالحق في تعديل هذه السياسة في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة بتاريخ محدث."
                                            fr="Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour."
                                        />
                                    </p>
                                </section>

                                {/* Section 10 */}
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                                        <TransText
                                            en="10. Contact"
                                            ar="10. الاتصال"
                                            fr="10. Contact" />
                                    </h2>
                                    <p className={`mt-4 ${darkMode ? "text-white" : "text-black"}`}>
                                        <TransText
                                            en="For any questions or complaints regarding our personal data processing policy, please contact us:"
                                            ar="لطرح أي سؤال أو شكوى تتعلق بسياسة خيانة البيانات الشخصية، يرجى الاتصال بنا:"
                                            fr="Pour toute question ou plainte concernant notre politique de traitement des données personnelles, veuillez nous contacter :"
                                        />
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Email : contact@lionsgeek.ma"
                                                ar="البريد الإلكتروني: contact@lionsgeek.ma"
                                                fr="Courriel : contact@lionsgeek.ma"
                                            />
                                        </li>
                                        <li className={`${darkMode ? "text-white" : "text-black"}`}>
                                            <TransText
                                                en="Phone: +212 (0)5 XX XX XX XX"
                                                ar="الهاتف: +212 (0)5 XX XX XX XX"
                                                fr="Téléphone: +212 (0)5 XX XX XX XX"
                                            />

                                        </li>

                                    </ul>
                                </section>
                                {/* Additional sections (Consent, Security, Rights, etc.) */}
                                {/* Repeat the same format for the remaining sections */}
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </AppLayout>
    );
};

export default Policy;
