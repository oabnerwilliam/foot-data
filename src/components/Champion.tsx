import { get } from "../util/requests/api"

import { useEffect, useState } from "react";

const Champion = () => {
    const [champion, setChampion] = useState<any>('')
    const [league, setLeague] = useState<any>('')

    /*useEffect(() => {
        const fetchData = async () => {
            const data = await get("https://v3.football.api-sports.io/standings?league=39&season=2023")

            if (data) {
                const league = data.response[0].league
                
                const championTeam = league.standings[0][1].team
                setChampion(championTeam)

                
                setLeague(league)
            }
        };

        fetchData();
    }, []);*/
  
    return (
        <>
            {/* <h3 className="size-full bg-gray-100
            flex flex-col items-center justify-center gap-10">
                <img src={league.logo} className='w-[75px]'/>
                <p>Campeão da {league.name} {league.season}/{league.season+1}:</p>
                <div className='flex flex-col gap-2.5 items-center justify-center'>
                    <img src={champion.logo} className='w-[100px]'/>
                    <h1>{champion.name}</h1>
                </div>    
            </h3> */}
        </>
    )
}

export default Champion
