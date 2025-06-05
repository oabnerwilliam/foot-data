import { useEffect, useState } from 'react'
import Team from './Team'

import { get } from '../../util/requests/api'
import Loader from '../layout/container/loader/Loader'

const Table = () => {
    const [teams, setTeams] = useState<any []>([])
    const [league, setLeague] = useState<any>('')
    const [allLeagues, setAllLeagues] = useState<any []>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await get("https://v3.football.api-sports.io/standings?league=71&season=2023")
            const leagueData = await get("https://v3.football.api-sports.io/leagues")

            if (data) {
                const league = data.response[0].league

                const leagues = leagueData.response
                setAllLeagues(leagues)
                
                const leagueTeams = league.standings[0]
                setTeams(leagueTeams)

                setLeague(league)
            }
        }

        fetchData()

        const timer = setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])
    
    return (
        <div className='flex flex-col w-full items-center gap-7 bg-bg'>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <>
                        <div className='flex items-center w-[60%] justify-between mt-5 p-5'>
                            <div className='flex gap-3 items-center'>
                                <img src={league.logo}
                                className='h-[75px]'></img>
                                <h1 className='text-p-text'>{league.name}</h1>    
                            </div>
                            <select className='text-p-text'>
                                {
                                    allLeagues.map((league)=>(
                                        <>
                                            <option value={league.league.name}
                                            className='bg-bg text-p-text'
                                            >{league.league.name}</option>
                                        </>
                                    ))
                                }
                            </select>
                            <p className='text-p-text'>
                                {league.country === "Brazil" ? 
                                league.season : 
                                `${league.season}/${league.season+1}`}
                            </p>
                        </div>
                        <div className='flex flex-col w-[60%] items-center justify-center'>
                            <div className='w-full h-8 flex justify-between p-5 mb-4'>
                                <div className='flex text-p-text'>
                                    <p>Time</p>
                                </div>
                                <div className='flex gap-5'>
                                    <p className='w-7 text-p-text'>P</p>
                                    <p className='w-7 text-p-text'>SG</p>   
                                </div>
                            </div>
                            {
                                teams.map((team)=>(
                                    <>
                                        <Team name={team.team.name}
                                        logo={team.team.logo}
                                        rank={team.rank}
                                        points={team.points}
                                        goalsDiff={team.goalsDiff}
                                        key={team.team.id}/>    
                                    </>
                                ))
                            }
                        </div>    
                    </>
                )
            }
        </div>
    )
}

export default Table
