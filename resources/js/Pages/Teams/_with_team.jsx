import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Inputs } from "@Components/Inputs/Index";
import { useForm } from "@inertiajs/react";
import { consultarUsuarios } from "@Services/UserService";
import { addMember, uploadImage } from "@Services/TeamService";

export default function WithTeam({ team, members }) {

    const { data, setData, errors, setError, clearError } = useForm({ user_id: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(team.image);
    const fileInputRef = useRef(null);

    const handleSubmit = async () => {
        addMember(data);
        setModalOpen(false);
        window.location.href = "/app/teams";
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            uploadImage(file, team.id)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20 px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">

                <img src={image} onClick={handleImageClick} className='rounded-full w-24 h-24' alt="" />

                <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
                <h1 className="text-xl font-bold">{team.name}</h1>
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 mt-4 bg-white rounded-lg shadow-lg">

                <div className="flex justify-between w-full">
                    <h2 className="text-2xl font-bold text-gray-800">Membros</h2>

                    <Button onClick={() => setModalOpen(true)}>
                        <HiPlus className="me-2" />Adicionar membros
                    </Button>

                </div>
                <div className="flex items-center justify-between w-full p-4 border-b">
                    <img src={`https://avatar.iran.liara.run/username?username=${team.user.name}`} className='rounded-full w-10 h-10' alt="" />
                    <span className="ml-4">{team.user.name}</span>
                </div>
                {
                    members.length > 0 &&
                    members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between w-full p-4 border-b">
                            <img src={`https://avatar.iran.liara.run/username?username=${member.name}`} className='rounded-full w-10 h-10' alt="" />
                            <span className="ml-4">{member.name}</span>
                        </div>
                    ))
                }
            </div>


            <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
                <ModalHeader>Cadastro da equipe</ModalHeader>
                <ModalBody>
                    <form action="" className='flex flex-col gap-4'>

                        <div>
                            <Inputs.Select async label="Email" name="user_id" errors={errors} setData={setData} loadOptions={consultarUsuarios} />
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="green" onClick={() => handleSubmit()}>Adicionar</Button>
                    <Button color="red" onClick={() => setModalOpen(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}