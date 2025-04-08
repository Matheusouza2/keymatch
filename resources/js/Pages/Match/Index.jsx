import { Head } from '@inertiajs/react';
import Template from '@Layouts/Template';
import { useState } from 'react';

export default function Index({ matches, title }) {

    const [selectedRound, setSelectedRound] = useState("all");

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

                                    <span className='font-bold text-5xl text-gray-700'>{match.team1_score}</span>

                                    <span className='font-bold text-3xl text-gray-700'>X</span>

                                    <span className='font-bold text-5xl text-gray-700'>{match.team2_score}</span>

                                    <div>
                                        <img src={match.team2.image} className='rounded-full w-20 h-20' alt="" />
                                        <span>{match.team2.name}</span>
                                    </div>
                                </div>
                                <p>{match.time}</p>
                            </div>

                        ))}
                    </div>
                ))
                }
            </div>


        </Template>
    );

}