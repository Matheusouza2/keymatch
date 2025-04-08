import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export default function ToastAlert({ show, setShow, message, type }) {

    const [icon, setIcon] = useState("");
    const [style, setStyle] = useState("");

    useEffect(() => {
        if (show) {

            switch (type) {
                case "success":
                    setIcon(<HiCheck className="w-5 h-5" />);
                    setStyle("bg-green-100 text-green-500");
                    break;
                case "error":
                    setIcon(<HiX className="w-5 h-5" />);
                    setStyle("bg-red-100 text-red-500");
                    break;
                case "warning":
                    setIcon(<HiExclamation className="w-5 h-5" />);
                    setStyle("bg-yellow-100 text-yellow-500");
                    break;
            }

            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show]);

    return (
        <>
            {show &&
                <div className="fixed z-50 top-4 right-4">
                    <Toast>
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${style}`}>
                            {icon}
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            {message}
                        </div>
                        <Toast.Toggle />
                    </Toast>
                </div>
            }
        </>
    );
}
