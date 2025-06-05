import React from 'react'

type TeamProps = {
    name: string,
    logo: string,
    rank: number,
    points: number,
    goalsDiff: number
}

const Team = ({name, logo, rank, points, goalsDiff}: TeamProps) => {
    return (
        <>
            <div className='flex h-15 items-center justify-between gap-5 w-full relative
            hover:bg-bg-hover cursor-pointer transition-all ease-in-out duration-300 p-5'>
                <div className='h-full flex items-center gap-5'>
                    <p className='text-md w-6 text-p-text'>{rank}</p>
                    <div className='size-[40px] flex justify-center items-center'>
                        <img src={logo} 
                        className='h-full'></img>    
                    </div>
                    <p className='text-xl w-44 flex justify-start text-p-text'>{name}</p>    
                </div>
                <div className='flex items-center gap-5'>
                    <p className='w-7 text-p-text'>{points}</p>
                    <p className='w-7 text-p-text'>{goalsDiff}</p>   
                </div>
            </div>
        </>
    )
}

export default Team
