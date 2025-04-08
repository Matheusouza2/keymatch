import { Button, ThemeProvider } from "flowbite-react";
import { Inputs } from "@Components/Inputs/Index";
import { HiLockClosed, HiMail } from "react-icons/hi";
import baseTheme from "@Themes/Index";
import { useForm, usePage } from "@inertiajs/react";
import { getCsrfCookie } from "@Services/api";

export default function Index() {

    const { setData, post, processing } = useForm({ email: '', password: '' });
    const { errors } = usePage().props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        getCsrfCookie().then(() => {
            post('/auth');
        })
    }

    return (
        <ThemeProvider theme={baseTheme}>

            <div className="antialiased bg-gray-200 min-h-screen">
                <div className="curva absolute"></div>

                <div className="bg-white mx-8 py-8 px-6 rounded-xl -mt-44 z-10 relative">
                    <div className="flex justify-between items-center">
                        <a href="/" className="text-center text-xl font-semibold text-gray-700 border-b-2 pb-2 border-p2 w-full">Login</a>
                        <a href="/create" className="text-center text-xl font-semibold text-gray-400 border-b-2 pb-2 border-bgColor18 w-full">Cadastro</a>
                    </div>

                    <div className="pt-8">
                        <Inputs.Validation label="Email" name="email" type="email" rightIcon={HiMail} errors={errors} setData={setData} placeholder="nome@univasf.edu.br" required />
                    </div>
                    <div className="pt-4">
                        <Inputs.Validation type="password" label="Senha" name="password" errors={errors} setData={setData} rightIcon={HiLockClosed} placeholder="********" required />
                    </div>
                </div>

                <div className="w-full flex flex-col items-center mt-9">
                    <Button className="w-80" onClick={e => handleSubmit(e)} disabled={processing}>Entrar</Button>
                </div>
            </div>

        </ThemeProvider>
    );
}