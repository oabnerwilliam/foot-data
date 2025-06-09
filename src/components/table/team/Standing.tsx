type StandingProps = {
    isOpen: boolean,
    rank: number,
    logo: string,
    name: string,
    points: number,
    goalsDiff: number
}

const Standing = ({isOpen, rank, logo, name, points, goalsDiff}: StandingProps) => {
  return (
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
  )
}

export default Standing
