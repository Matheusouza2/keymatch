import Template from "@/Layouts/Template";
import { Head } from "@inertiajs/react";
import { CircleArrowLeft } from "lucide-react";
import echo from "@/echo";
import { useEffect, useState } from "react";

export default function Show({ match, title, teamAuth, tests }) {

    const [placares, setPlacares] = useState([]);

    useEffect(() => {
        echo.channel(`scoreboard.${match.id}`).listen('PlacarAtualizado', (e) => {
            const placar = e.match;
            setPlacares({
                team1: placar.team1_score,
                team2: placar.team2_score
            })
        })
    }, []);

    return (
        <Template>
            <Head title={title} />

            <div className="curva-esq"></div>

            <div className="rounded-xl -mt-64 z-10 relative">
                <div className="flex items-center mx-6">
                    <a href="/app/match" className="flex items-center justify-center rounded-full p-2">
                        <CircleArrowLeft color='white' size={32} />
                    </a>

                    <h1 className="text-center text-3xl font-bold text-white">
                        Partidas
                    </h1>
                </div>
            </div>

            <div className="flex justify-between items-center mt-24 mx-4">
                <div className="flex flex-col items-center">
                    <img src={match.team1.image} className="size-28 rounded-full" alt="" />
                    <h2 className="text-lg font-semibold">{match.team1.name}</h2>
                    <h5 className="text-4xl font-semibold">{placares.length == 0 ? match.team1_score : placares.team1}</h5>
                </div>

                <span className="text-6xl font-bold">X</span>

                <div className="flex flex-col items-center">
                    <img src={match.team2.image} className="size-28 rounded-full" alt="" />
                    <h2 className="text-lg font-semibold">{match.team2.name}</h2>
                    <h5 className="text-4xl font-semibold">{placares.length == 0 ? match.team2_score : placares.team2}</h5>
                </div>
            </div>

            <div className="flex justify-end mx-5 mt-10">
                {
                    teamAuth.id == match.team1_id ?
                        (<div>
                            {
                                tests.map((test, index) => {
                                    return (
                                        <div key={index} className="flex justify-start items-center mt-4 mx-4" >
                                            {test.team1_release && (<a href={test.file} target="_blank">Abrir desafio {index + 1}</a>)}
                                        </div>
                                    );
                                })
                            }
                        </div>) :
                        (<div>
                            {
                                tests.map((test, index) => {
                                    return (
                                        <div key={index} className="flex justify-between items-center mt-4 mx-4" >
                                            {test.team2_release && (<a href={test.file} target="_blank">Abrir desafio {index + 1}</a>)}
                                        </div>
                                    );
                                })
                            }
                        </div>)
                }
            </div>

        </Template >
    )
}