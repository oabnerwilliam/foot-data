import { useEffect, useState } from "react"
import { get } from "../../util/requests/api"
import Table from "../table/Table"
import Loader from "../layout/loader/Loader"
import LeagueHeader from "../table/LeagueHeader"

const FootballTables = () => {
    const [teams, setTeams] = useState<any []>([])
    const [league, setLeague] = useState<any>()
    const [allLeagues, setAllLeagues] = useState<any []>([])
    const [loadingAll, setLoadingAll] = useState<boolean>(true)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)
    const [selectedLeague, setSelectedLeague] = useState<any>()
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
                        <LeagueHeader
                        league={league}
                        selectLeague={true}
                        seasons={seasons}
                        selectedLeague={selectedLeague}
                        setSelectedLeague={setSelectedLeague}
                        leagueList={allLeagues}
                        selectedSeason={selectedSeason}
                        setSelectedSeason={setSelectedSeason}
                        />
                        {
                            loadingTable ? (
                                <Loader/>
                            ) : league ? (
                                <Table sport="football"
                                list={teams}
                                />
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

export default FootballTables
