import React from 'react'

type LeagueHeaderProps = {
    league: any,
    selectLeague: boolean,
    seasons: number[] | string[],
    selectedLeague?: any,
    setSelectedLeague?: (item: any)=>void,
    leagueList?: any[],
    selectedSeason: number | string,
    setSelectedSeason: (item: any)=>void
}

const LeagueHeader = ({league, selectLeague, seasons, selectedLeague, setSelectedLeague, leagueList, selectedSeason, setSelectedSeason}: LeagueHeaderProps) => {
    return (
        <div className='flex items-center w-[60%] justify-between mt-5 p-5'>
            <div className='flex gap-3 items-center'>
                {
                    league &&
                        <img src={league.logo}
                        className='h-[75px]'></img>    
                }
                {
                    selectLeague ? (
                        <select className='text-p-text text-2xl w-[60%] outline-none'
                        onChange={(e)=>{
                            setSelectedLeague && setSelectedLeague(e.target.value)
                        }}
                        value={selectedLeague}
                        >
                            {
                                leagueList &&
                                    leagueList.map((league)=>(
                                        <option value={league.league.name}
                                        className='bg-bg text-p-text'
                                        key={league.league.id}
                                        >{league.league.name}</option>
                                    ))
                            }
                        </select>
                    ) : (
                        <p className='text-p-text text-2xl w-[60%] '>{league.name}</p>
                    )
                } 
            </div>
            {
                league.name === "NBA" ? (
                    <select
                    className='text-p-text'
                    onChange={(e)=>{
                        setSelectedSeason(e.target.value)
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
                ) : (
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
                )
            }
            
        </div>
    )
}

export default LeagueHeader
