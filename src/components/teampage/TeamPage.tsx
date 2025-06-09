import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get } from '../../util/requests/api'
import Loader from '../layout/loader/Loader'

type player = {
    id: number,
    name: string,
    age: number,
    number: number,
    position: string,
    photo: string
}

type team = {
    id: number,
    name: string,
    logo: string
}

const TeamPage = () => {
    const [squad, setSquad] = useState<player[]>()
    const [team, setTeam] = useState<team>()
    const [loading, setLoading] = useState<boolean>(true)
    
    const {id} = useParams()
    
    const positions = {
        Goalkeeper: "Goleiro",
        Defender: "Defensor",
        Midfielder: "Meio-Campista",
        Attacker: "Atacante"
    }

    useEffect(()=>{
        const getTeam = async ()=>{
            const data = await get(`https://v3.football.api-sports.io/players/squads?team=${id}`)

            if (data) {
                setSquad(data.response[0].players)
                setTeam(data.response[0].team)
            }
        }

        getTeam()

        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(()=>{
        squad?.sort((a, b) => a.number - b.number)
    }, [squad])

    return (
        <div className='flex items-center justify-center size-full'>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <div className='w-full flex-col items-center'>
                        <div className='flex flex-col justify-center items-center gap-3 p-6'>
                            <img src={team?.logo} className='w-[75px]'/>
                            <h1 className='text-p-text'>{team?.name}</h1>    
                        </div>

                        <div className='grid grid-cols-3 w-full px-30 '>
                            {
                                squad?.map((player)=>(
                                    <div className='flex flex-col items-center justify-center text-p-text
                                    hover:bg-bg-hover transition-all duration-300 ease-in-out
                                    p-5 cursor-pointer'
                                    key={player.id}>
                                        <img src={player.photo} alt={player.name} className='w-[100px] rounded-full' key={player.id}/>
                                        <p className='text-lg'>{player.name}</p>
                                        <p className='text-xs'>
                                            {player.number ? `Camisa ${player.number} - ` : ""}{positions[player.position as keyof typeof positions]}
                                        </p>
                                        <p className='text-xs'>{player.age} anos</p>
                                    </div>
                                ))
                            }
                        </div>    
                    </div>    
                )
            }
        </div>
    )
}

export default TeamPage
