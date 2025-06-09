import { useEffect, useRef, useState } from 'react'

import clickOut from '../../../util/events/clickout/clickOut'
import { get } from '../../../util/requests/api'
import Loader from '../../layout/loader/Loader'

import { Link } from 'react-router-dom'
import Standing from './Standing'
import SquadBar from './SquadBar'

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
            ${isOpen ? "h-75 justify-start" : "h-15 justify-start"}`}
            onClick={()=>setIsOpen(true)}
            ref={teamRef}
            >
                <Standing isOpen={isOpen}
                rank={rank}
                logo={logo}
                name={name}
                points={points}
                goalsDiff={goalsDiff}/>
                <SquadBar isOpen={isOpen}
                id={id}
                loadingSquad={loadingSquad}
                squad={squad}/>
            </div>
        </>
    )
}

export default Team
