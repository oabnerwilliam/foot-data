import { useEffect, useRef, useState } from 'react'

import clickOut from '../../util/events/clickout/clickOut'
import { get } from '../../util/requests/api'
import Loader from '../layout/loader/Loader'

import profile from '../../img/profile-user-icon-2048x2048-m41rxkoe.png'

type TeamProps = {
    name: string,
    logo: string,
    rank: number,
    points: number,
    goalsDiff: number,
    id: number
}

const Team = ({name, logo, rank, points, goalsDiff, id}: TeamProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loadingSquad, setLoadingSquad] = useState<boolean>(false)
    const [squad, setSquad] = useState<any []>([])
    const teamRef = useRef(null)
    
    clickOut(teamRef, ()=>{
        setIsOpen(false)
    })

    useEffect(()=>{
        const fetchData = async () => {
            if (isOpen) {
                setLoadingSquad(true)

                const data = await get(`https://v3.football.api-sports.io/players/squads?team=${id}`)

                if (data) {
                    setSquad(data.response[0].players)
                }
            }
        }

        fetchData()

        setTimeout(()=>{
            setLoadingSquad(false)
        }, 1000)
    }, [isOpen])

    return (
        <>
            <div className={`flex flex-col justify-center gap-5 w-full relative
            hover:bg-bg-hover cursor-pointer transition-all ease-in-out duration-300 p-5
            ${isOpen ? "h-70 justify-start" : "h-15 justify-start"}`}
            onClick={()=>setIsOpen(true)}
            ref={teamRef}
            >
                <div className={`flex justify-between w-full ${isOpen ? "h-[30%]" : "h-full"}`}>
                    <div className={`flex items-center gap-5 
                    ${isOpen ? "h-auto" : "h-full"}
                    transition-all ease-in-out duration-300`}>
                        <p className='text-md w-6 text-p-text'>{rank}</p>
                        <div className='size-[40px] flex justify-center items-center'>
                            <img src={logo} 
                            className='h-full'></img>    
                        </div>
                        <p className='text-xl w-44 flex justify-start text-p-text'>{name}</p>    
                    </div>
                    <div className='flex items-center gap-5
                    transition-all ease-in-out duration-300'>
                        <p className='w-7 text-p-text'>{points}</p>
                        <p className='w-7 text-p-text'>{goalsDiff}</p>   
                    </div>    
                </div>
                <div className={`w-full flex flex-col overflow-x-auto items-start justify-center
                ${isOpen ? "h-[240px]" : "h-0 hidden"}`}>
                    <h3 className='text-p-text'>Elenco</h3>
                    {
                        loadingSquad ? (
                            <Loader/>
                        ) : squad ? (
                            <div className='flex'>
                                {
                                    squad.slice(0, 18).map((player) => (
                                        <div
                                            key={player.id || player.name}
                                            className="h-[100px] w-[75px] flex-shrink-0 flex flex-col items-center justify-center gap-2 mx-2"
                                        >
                                            <img
                                                src={player.photo ? player.photo : profile}
                                                alt={player.name}
                                                className="h-12 w-12 rounded-full border border-gray-200"
                                            />
                                            <p className="text-p-text text-xs text-center truncate w-full">
                                                {player.name}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Team
