import { Head } from '@inertiajs/react';
import Template from '@Layouts/Template';
import { Card, Table } from 'flowbite-react';
import { Trophy } from 'lucide-react';

export default function Index({ title, actualRound, teams, top3 }) {
    return (
        <Template>
            <Head title={title} />

            <div className="curva-inversa"></div>

            <div className="rounded-xl -mt-64 z-10 relative">
                <div className="flex items-center justify-center mx-6">
                    <h1 className="text-center text-3xl font-bold text-white">
                        KeyMatch
                    </h1>
                </div>
            </div>

            <div className="flex justify-center mt-20 mx-6 bg-white rounded-lg shadow-2xl">
                <img src="/assets/images/home.svg" className='h-56 w-56' alt="" />
            </div>

            <div className='flex justify-center p-6'>
                <Card className='w-full'>

                    <div className='w-full bg-gray-800 p-3 rounded-t-lg'>
                        <h5 className='text-white font-bold'>{actualRound == 0 ? "1ª" : actualRound} rodada em andamento</h5>
                    </div>

                    <div className='p-4'>
                        {
                            teams.map((team, key) => (
                                <div key={key} className='grid grid-cols-11 gap-4'>
                                    <span className='col-span-4'>{team.name}</span>
                                    <span className='text-center mb-2 border-1 rounded-xl'>{team.team1_score}</span>
                                    <span>X</span>
                                    <span className='text-center mb-2 border-1 rounded-xl'>{team.team2_score}</span>
                                    <span className='col-span-4'>{team.team2_name}</span>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 mb-14 px-4">
                {
                    top3.map((team, key) => (
                        <div key={key} class="p-4 rounded-xl border border-gray-700 border-opacity-10 bg-white shadow2 swiper-slide swiper-slide-active" role="group" aria-label="1/3">
                            <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-500 border-opacity-10">
                                <div className="bg-gray-300 bg-opacity-10 border broder-gray-500 border-opacity-20 py-1 px-3 flex justify-start items-center gap-2 rounded-full">
                                    <Trophy />
                                    <p class="text-xs font-semibold text-p2">
                                        {key + 1}º lugar
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center pt-4">
                                <div className="relative size-24 flex justify-center items-center">
                                    <img src={team.team.image} alt="" class="size-[68px] rounded-full" />
                                </div>
                                <span class="text-xs font-semibold text-color8 pt-4">
                                    {team.team.name}
                                </span>
                                <p className="text-color8 pt-1 pb-4 text-xs">
                                    {team.points} pontos
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Template>
    );

}