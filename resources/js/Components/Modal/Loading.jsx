import { Modal, Spinner } from "flowbite-react";

export default function Loading({ openModal }) {
    return (
        <Modal show={openModal} size="md" popup>
            <Modal.Body>
                <div className="mt-8 text-center">
                    <Spinner color="warning" size="xl" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Aguarde...
                    </h3>
                </div>
            </Modal.Body>
        </Modal>
    );
}
