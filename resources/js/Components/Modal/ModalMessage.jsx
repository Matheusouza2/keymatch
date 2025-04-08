import { Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export default function ModalMessage({ options, changeOptions }) {

    const [icon, setIcon] = useState("");
    useEffect(() => {
        if (options.open) {
            switch (options.type) {
                case "success":
                    setIcon(<HiCheck className="w-16 h-16 text-green-600" />);
                    break;
                case "error":
                    setIcon(<HiX className="w-16 h-16 text-red-600" />);
                    break;
                case "warning":
                    setIcon(<HiExclamation className="w-16 h-16 text-yellow-500" />);
                    break;
                default:
                    setIcon(<Spinner color="warning" size="xl" />);
                    break;
            }

        }
    }, [options.type]);

    return (
        <Modal show={options.open} size="md" onClose={() => changeOptions({ ...options, open: false })} popup>

            {options.type && (
                <Modal.Header></Modal.Header>
            )
            }

            <Modal.Body>
                <div className="flex flex-col items-center mt-8">

                    {icon}

                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {options.message}
                    </h3>
                </div>
            </Modal.Body>
        </Modal>
    );
}
