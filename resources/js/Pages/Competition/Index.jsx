import { Head } from '@inertiajs/react';
import Template from '@Layouts/Template';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { TrophyIcon } from 'lucide-react';

export default function Index({ table, title }) {

    return (
        <Template>
            <Head title={title} />

            <div className="curva-dir"></div>

            <div className="rounded-xl -mt-64 z-10 relative">
                <div className="flex items-center justify-end mx-6">
                    {/*  <a href={backUrl} className="flex items-center justify-center rounded-full p-2">
                        <CircleArrowLeft color='white' size={32} />
                    </a> */}
                    <h1 className="text-center text-3xl font-bold text-white">
                        Classificação
                    </h1>
                </div>
            </div>



            <div className="grid grid-cols-3 items-end mt-20 px-6">
                <div className="bg-slate-400 p-4 flex flex-col justify-center rounded-tl-lg">
                    <h1 className='text-2xl font-bold text-white'>2º</h1>
                    <img src={table[1]?.team.image} alt="" className='rounded-full w-20 h-20 mt-6' />
                    <h2 className='font-bold text-white'>{table[1]?.team.name}</h2>
                </div>

                <div className="bg-amber-300 p-4 flex flex-col items-center rounded-t-lg">
                    <h1 className='text-3xl font-bold'>1º</h1>
                    <div className="flex items-center justify-center">
                        <TrophyIcon color='black' size={32} />
                    </div>
                    <img src={table[0]?.team.image} alt="" className='rounded-full w-20 h-20 mt-6' />
                    <h2 className='font-bold'>{table[0]?.team.name}</h2>
                </div>

                <div className="bg-amber-800 p-4 flex flex-col justify-center rounded-tr-lg">
                    <h1 className='text-xl font-bold text-white'>3º</h1>
                    <img src={table[2]?.team.image} alt="" className='rounded-full w-20 h-20 mt-6' />
                    <h2 className='font-bold text-white'>{table[2]?.team.name}</h2>
                </div>
            </div>

            <div className='bg-white rounded-2xl mx-1 shadow-2xl mb-16 overflow-x-auto'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="text-center font-bold text-gray-900 dark:text-white">
                                Equipe
                            </TableHeadCell>
                            <TableHeadCell className="text-center font-bold text-gray-900 dark:text-white">
                                Pontos
                            </TableHeadCell>
                            <TableHeadCell className="text-center font-bold text-gray-900 dark:text-white">
                                Vitórias
                            </TableHeadCell>
                            <TableHeadCell className="text-center font-bold text-gray-900 dark:text-white">
                                Derrotas
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            table.map((team, index) => (
                                <TableRow key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs">
                                    <TableCell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                                        {team.team.name}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {team.points}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {team.wins}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {team.losses}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

        </Template>
    );

}