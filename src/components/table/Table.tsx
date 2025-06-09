import Team from './team/Team'
type TableProps = {
    sport: string,
    list: any[]
}

const Table = ({sport, list}: TableProps) => {
    return (
        <div className='flex flex-col w-[60%] items-center justify-center'>
            <div className='w-full h-8 flex justify-between p-5 mb-4'>
                <div className='flex text-p-text'>
                    <p>Time</p>
                </div>
                <div className='flex gap-5'>
                    {
                        sport==="football" ? (
                            <>
                                <p className='w-7 text-p-text'>P</p>
                                <p className='w-7 text-p-text'>SG</p>    
                            </>
                        ) : sport==="basketball" ?(
                            <>
                                <p className='w-7 text-p-text'>V</p>
                                <p className='w-7 text-p-text'>D</p>   
                            </>
                        ) : sport==="formula1" ? (
                            <>
                                <p className='w-7 text-p-text'>P</p>
                                <p className='w-7 text-p-text'>V</p>   
                            </>
                        ) : (
                            <></>
                        )
                    }
                        
                </div>
            </div>
            {   
                list && 
                list.map((item)=>(
                    <>
                        {
                            sport === "football" ? (
                                <Team name={item.team.name}
                                logo={item.team.logo}
                                rank={item.rank}
                                points={item.points}
                                goalsDiff={item.goalsDiff}
                                id={item.team.id}
                                key={item.team.id}
                                />
                            ) : sport === "basketball" ? (
                                <Team name={item.team.name}
                                logo={item.team.logo}
                                rank={item.position}
                                points={item.games.win.total}
                                goalsDiff={item.games.lose.total}
                                id={item.team.id}
                                key={item.team.id}
                                />
                            ) : sport === "formula1" ? (
                                <Team name={item.team.name}
                                logo={item.team.logo}
                                rank={item.position}
                                points={item.games.win.total}
                                goalsDiff={item.games.lose.total}
                                id={item.team.id}
                                key={item.team.id}
                                />
                            ) : (
                                <></>
                            )
                        }
                            
                    </>
                ))
            }
        </div>
    )
}

export default Table
