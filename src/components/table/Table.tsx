import { useEffect, useState } from 'react'
import Team from './Team'

import { get } from '../../util/requests/api'
import Loader from '../layout/container/loader/Loader'

const Table = () => {
    const [teams, setTeams] = useState<any []>([])
    const [league, setLeague] = useState<any>()
    const [allLeagues, setAllLeagues] = useState<any []>([])
    const [loadingAll, setLoadingAll] = useState<boolean>(true)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)
    const [selectedLeague, setSelectedLeague] = useState<any>()
    //const [season, setSeason] = useState<number>()
    const [selectedSeason, setSelectedSeason] = useState<number>(2023)
    const seasons = [2021, 2022, 2023]

    useEffect(() => {
        const fetchData = async () => {
            const leagueData = await get("https://v3.football.api-sports.io/leagues")

            if (leagueData) {
                const leagues = leagueData.response
                setAllLeagues(leagues)
            }
        }

        fetchData()

        setTimeout(()=>{
            setLoadingAll(false)
        }, 1000)
    }, [])

    useEffect(()=>{
        const fetchData = async () => {
            if (league && selectedSeason) {
                setLoadingTable(true)
                
                const data = await get(`https://v3.football.api-sports.io/standings?league=${league.id}&season=${selectedSeason}`)

                if (data) {
                    const leagueTeams = data.response[0].league.standings[0]
                    setTeams(leagueTeams)
                }    
            }
        }

        fetchData()

        setTimeout(()=>{
            setLoadingTable(false)
        }, 1000)
    }, [league, selectedSeason])

    useEffect(()=>{
        if (selectedLeague) {
            const currentLeague = allLeagues.find(current => current.league.name === selectedLeague)
            setLeague(currentLeague.league)  
            console.log(currentLeague.league)  
        }
    }, [selectedLeague])
    
    return (
        <div className='flex flex-col w-full items-center gap-7 bg-bg'>
            {
                loadingAll ? (
                    <Loader/>
                ) : (
                    <>
                        <div className='flex items-center w-[60%] justify-between mt-5 p-5'>
                            <div className='flex gap-3 items-center'>
                                {league &&
                                    <img src={league.logo}
                                    className='h-[75px]'></img>    
                                }
                                <select className='text-p-text text-2xl w-[60%] outline-none'
                                onChange={(e)=>{
                                    setSelectedLeague(e.target.value)
                                }}
                                value={selectedLeague}
                                >
                                    {
                                        allLeagues.map((league)=>(
                                            <option value={league.league.name}
                                            className='bg-bg text-p-text'
                                            key={league.league.id}
                                            >{league.league.name}</option>
                                        ))
                                    }
                                </select>    
                            </div>
                            <select
                            className='text-p-text'
                            onChange={(e)=>{
                                setSelectedSeason(Number(e.target.value))
                            }}
                            value={selectedSeason}
                            >
                                {
                                    seasons.map((season)=>(
                                        <option value={season}
                                        className='text-p-text'
                                        >{season}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            loadingTable ? (
                                <Loader/>
                            ) : league ? (
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
                                            id={team.team.id}
                                            key={team.team.id}
                                            />    
                                        </>
                                    ))
                                }
                                </div>
                            ) : (
                                <h1 className='text-p-text'>Selecione uma liga.</h1>
                            )
                        }  
                    </>
                )
            }
        </div>
    )
}

export default Table
