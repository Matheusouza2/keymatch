import { Head, useForm } from '@inertiajs/react';
import Template from '@Layouts/Template';
import { useEffect, useState } from 'react';
import { Inputs } from '@Components/Inputs/Index';
import { Button } from 'flowbite-react';
import { setScore } from "@Services/MatchService";
import { api } from '../../Services/api';

export default function Index({ matches, title }) {

    const [selectedRound, setSelectedRound] = useState("all");

    const { data, setData } = useForm({});


    useEffect(() => {
        let obj = {};

        matches.map((m) => {
            obj = Object.assign({
                [`team1_score${m.id}`]: m.team1_score,
                [`team2_score${m.id}`]: m.team2_score,
            }, obj);
        });



        setData(obj);
    }, [matches])

    const rounds = matches.reduce((acc, match) => {
        acc[match.round] = acc[match.round] || [];
        acc[match.round].push(match);
        return acc;
    }, {});

    const uniqueRounds = Object.keys(rounds).sort((a, b) => a - b);

    const visibleRounds =
        selectedRound === "all"
            ? rounds
            : { [selectedRound]: rounds[selectedRound] };

    const saveScore = (matchId) => {
        setScore(data, matchId);
    };

    const endMacth = (matchId) => {
        api.post(`matches/${matchId}/end`).then(() => {
            window.location.reload();
        });
    }

    const handleRounds = () => {
        api.get('matches/generateRounds').then(() => {
            window.location.reload();
        });
    }

    return (
        <Template>
            <Head title={title} />

            <div className="curva-esq"></div>

            <div className="rounded-xl -mt-64 z-10 relative">
                <div className="flex items-center mx-6">
                    {/*  <a href={backUrl} className="flex items-center justify-center rounded-full p-2">
                        <CircleArrowLeft color='white' size={32} />
                    </a> */}
                    <h1 className="text-center text-3xl font-bold text-white">
                        Partidas
                    </h1>
                </div>
            </div>


            <div className="flex space-x-2 overflow-x-auto mt-24 pb-2 px-4">
                <button
                    onClick={() => setSelectedRound("all")}
                    className={`px-4 py-1 rounded-full whitespace-nowrap ${selectedRound === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Todas
                </button>
                {uniqueRounds.map((round) => (
                    <button
                        key={round}
                        onClick={() => setSelectedRound(round)}
                        className={`px-4 py-1 rounded-full whitespace-nowrap ${selectedRound == round
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {round}ª rodada
                    </button>
                ))}
            </div>

            <div className='flex flex-col gap-6 mt-10 mx-4 pb-14'>
                {
                    matches.length == 0 && (
                        <div>
                            <Button onClick={() => handleRounds()}>Gerar rodadas</Button>
                        </div>
                    )
                }
                {Object.entries(visibleRounds).map(([round, matches]) => (
                    <div key={round}>
                        <h2 className="text-xl font-bold">{round}ª rodada</h2>
                        {matches.map((match) => (
                            <div key={match.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <img src={match.team1.image} className='rounded-full w-20 h-20' alt="" />
                                        <span>{match.team1.name}</span>
                                    </div>

                                    <Inputs.Validation type="number" name={`team1_score${match.id}`} value={data[`team1_score${match.id}`]} className="w-14" setData={setData} />

                                    <span className='font-bold text-3xl text-gray-700'>X</span>

                                    <Inputs.Validation type="number" name={`team2_score${match.id}`} value={data[`team2_score${match.id}`]} className="w-14" setData={setData} />

                                    <div>
                                        <img src={match.team2.image} className='rounded-full w-20 h-20' alt="" />
                                        <span>{match.team2.name}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between gap-4'>
                                    <Button className='w-full' color="green" onClick={() => saveScore(match.id)}>Salvar</Button>
                                    <Button className='w-full' color="red" onClick={() => endMacth(match.id)}>Encerrar partida</Button>
                                </div>
                            </div>

                        ))}
                    </div>
                ))
                }
            </div>


        </Template>
    );

}