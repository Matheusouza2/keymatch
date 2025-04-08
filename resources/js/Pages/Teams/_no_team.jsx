import { useForm } from "@inertiajs/react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { Inputs } from "@Components/Inputs/Index";
import { GiHealingShield } from "react-icons/gi";
import { store } from "@Services/TeamService";

export default function NoTeam() {

    const { data, setData, errors, setError, clearError } = useForm({ name: "" });

    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = async () => {
        const response = await store(data);

        setOpenModal(false);
        window.location.href = "/app/teams";

    }

    return (
        <div className="flex flex-col items-center justify-center mt-20 px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                <img src="/assets/images/default_teams.jpg" className='rounded-full w-24 h-24' alt="" />
                <p className="mt-4 text-gray-600">Você ainda não tem uma equipe cadastrada</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 mt-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">Criar Equipe</h2>
                <p className="mt-4 text-gray-600">Crie uma nova equipe para gerenciar seus membros.</p>
                <Button onClick={() => setOpenModal(true)}>
                    Criar Equipe
                </Button>
            </div>


            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Cadastro da equipe</ModalHeader>
                <ModalBody>
                    <form action="" className='flex flex-col gap-4'>

                        <div>
                            <Inputs.Validation label="Nome da equipe" name="name" rightIcon={GiHealingShield} errors={errors} setData={setData} required />
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="green" onClick={() => handleSubmit()}>Cadastrar</Button>
                    <Button color="red" onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}