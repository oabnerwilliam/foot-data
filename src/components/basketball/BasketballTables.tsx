import { useEffect, useState } from 'react'
import LeagueHeader from '../table/LeagueHeader'
import { get } from '../../util/requests/api'
import Loader from '../layout/loader/Loader'
import Table from '../table/Table'

const BasketballTables = () => {
  const [league, setLeague] = useState<any>()
  const [loadingAll, setLoadingAll] = useState<boolean>(true)
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [selectedSeason, setSelectedSeason] = useState<string>("2023-2024")
  const [teams, setTeams] = useState<any[]>()
  const [selectedConference, setSelectedConference] = useState<string>("")
  const [easternTeams, setEasternTeams] = useState<any[]>()
  const [westernTeams, setWesternTeams] = useState<any[]>()

  const seasons = ["2021-2022", "2022-2023", "2023-2024"]
  const conferences = ["Conferência Leste", "Conferência Oeste"]
  
  useEffect(() => {
    const fetchData = async () => {
      const leagueData = await get("https://v1.basketball.api-sports.io/leagues?id=12")

      if (leagueData) {
          const league = leagueData.response[0]
          setLeague(league)
      }
    }

    fetchData()

    setTimeout(()=>{
      setLoadingAll(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTable(true)
      const leagueData = await get(`https://v1.basketball.api-sports.io/standings?league=12&season=${selectedSeason}`)

      if (leagueData) {
          const teams = leagueData.response[0]
          setTeams(teams)
      }
    }

    fetchData()

    setTimeout(()=>{
      setLoadingTable(false)
    }, 1000)
  }, [selectedSeason])

  useEffect(() => {
    const eastern = teams?.filter((team)=>{
      return team.group.name === "Eastern Conference"
    })
    setEasternTeams(eastern)

    const western = teams?.filter((team)=>{
      return team.group.name === "Western Conference"
    })
    setWesternTeams(western)
  }, [teams])
  
  return (
    <div className='size-full flex flex-col items-center justify-center'>
      {
        loadingAll ? (
          <Loader/>
        ) : (
          <>
            <LeagueHeader
            league={league}
            selectLeague={false}
            seasons={seasons}
            selectedSeason={selectedSeason}
            setSelectedSeason={setSelectedSeason}
            />
            {
                loadingTable ? (
                    <Loader/>
                ) : league && teams ? (
                    <>
                        <select onChange={(e)=>setSelectedConference(e.target.value)}
                        className='text-p-text'>
                          <option value="Western Conference"
                          className='text-p-text bg-bg'>Conferência Oeste</option>
                          <option value="Eastern Conference"
                          className='text-p-text bg-bg'>Conferência Leste</option>
                        </select>
                        {
                          selectedConference === "Eastern Conference" ? (
                            easternTeams &&
                              <Table sport="basketball"
                              list={easternTeams}
                            />  
                          ) : (
                            westernTeams &&
                              <Table
                              sport='basketball'
                              list={westernTeams}
                              />
                          )
                        }
                    </>
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

export default BasketballTables
