import Template from '@Layouts/Template';
import NoTeam from './_no_team';
import WithTeam from './_with_team';

export default function Index({ team, members, auth }) {


    return (
        <Template>
            <div className="curva-dir"></div>

            <div className="rounded-xl -mt-64 z-10 relative">

                <div className="flex items-center justify-end mx-6">
                    {/*  <a href={backUrl} className="flex items-center justify-center rounded-full p-2">
                        <CircleArrowLeft color='white' size={32} />
                    </a> */}
                    <h1 className="text-center text-3xl font-bold text-white">
                        Sua equipe
                    </h1>
                </div>
            </div>

            {
                team ?
                    <WithTeam team={team} members={members} auth={auth} /> :
                    <NoTeam />
            }


        </Template>
    );

}