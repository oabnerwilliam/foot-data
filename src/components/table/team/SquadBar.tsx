import Loader from '../../layout/loader/Loader'
import { Link } from 'react-router-dom'

type player = {
    id: number,
    name: string,
    age: number,
    number: number,
    position: string,
    photo: string
}

type SquadBarProps = {
    isOpen: boolean,
    id: number,
    loadingSquad: boolean,
    squad: player[]
}

const SquadBar = ({isOpen, id, loadingSquad, squad}: SquadBarProps) => {
    return (
        <>
            <div className={`flex items-center gap-5 ${isOpen ? "h-[50px]" : "h-0 hidden"}`}>
                <h2 className='text-p-text'>Elenco</h2>
                <Link to={`/team/${id}`} className='hover:underline text-p-text'>Ver tudo</Link>    
            </div>
            
            <div className={`w-full flex flex-col overflow-x-auto items-start justify-center
            ${isOpen ? "h-[240px]" : "h-0 hidden"}`}>
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
                                            src={player.photo}
                                            alt={player.name}
                                            className="h-12 w-12 rounded-full border border-gray-200"
                                            key={player.id}
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
        </>
    )
}

export default SquadBar
