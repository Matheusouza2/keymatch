import {
    Home,
    Trophy,
    User,
} from "lucide-react";
import { BiJoystick } from "react-icons/bi";
import { GiRosaShield } from "react-icons/gi";


const icons = [
    { name: "Equipe", icon: GiRosaShield, href: "/app/teams" },
    { name: "Torneio", icon: BiJoystick, href: "/app/competition" },
    { name: "Início", icon: Home, href: "/app/home" },
    { name: "Partidas", icon: Trophy, href: "/app/match" },
    { name: "Perfil", icon: User, href: "#" },
];

export default function Navbar() {

    const path = window.location.pathname;

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">

            <div className="absolute bottom-0 w-full h-20 bg-gray-700 rounded-t-3xl" />

            <div className="relative z-10 flex justify-between items-center h-20 mx-5">
                {icons.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.href === path;

                    return (
                        <a
                            key={item.name}
                            className="relative flex flex-col items-center"
                            href={item.href}
                        >

                            <div className={`${isActive
                                ? "bg-gray-700 p-4 rounded-full -translate-y-6"
                                : "p-2"
                                }`}>
                                <Icon className={`w-6 h-6 text-white`} />
                            </div>

                            <span className="text-white -mt-1">{item.name}</span>

                        </a>
                    );
                })}
            </div>
        </div >
    );
}