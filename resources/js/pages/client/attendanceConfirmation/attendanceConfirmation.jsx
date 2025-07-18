import { useAppContext } from '@/context/appContext';
import AppLayout from '@/layouts/app-layout';
import confetti from '../../../../assets/images/confetti.gif';
import { TransText } from '../../../components/TransText';
import { Head } from '@inertiajs/react';

const AttendanceConfirmation = () => {
    const { darkMode, selectedLanguage } = useAppContext();

    return (
        <AppLayout>
            <Head title='Attendance Confirmation'/>
            <div
                dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                className={`relative flex h-screen items-center justify-center text-center ${darkMode ? 'bg-black' : ''} `}
            >
                <img src={confetti} className="absolute h-full w-full object-cover lg:h-fit" alt="" />
                <div className="z-10">
                    <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : ''}`}>
                        <TransText en="Thank you for Confirming Your Attendance." fr="Merci de confirmer votre présence." ar="شكراً لتأكيد حضورك." />
                    </h1>
                    <br />
                    <p className={`text-lg ${darkMode ? 'text-white' : ''}`}>
                        <TransText en="Can't wait to get to meet you." fr="Nous avons hâte de vous rencontrer." ar="نتطلع للقائكم بفارغ الصبر." />
                    </p>
                </div>
            </div>
        </AppLayout>
    );
};

export default AttendanceConfirmation;
