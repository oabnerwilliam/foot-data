import psg from '../img/Logo_PSG.png'
import inter from '../img/FC_Internazionale_Milano_2021.svg.png'

const Match = () => {
  return (
    <div className="size-full bg-gray-100
    flex items-center justify-center">
      <div className='flex justify-center items-center gap-20'>
        <div className='flex items-center gap-10'>
          <div className='flex flex-col gap-2.5 items-center justify-center'>
            <img src={psg} className='w-3xs'/>
            <h1>Paris Saint-Germain</h1>
          </div>
          <p className='text-9xl'>5</p>
        </div>
        <h1>X</h1>
        <div className='flex items-center gap-10'>
          <p className='text-9xl'>0</p>
          <div className='flex flex-col gap-2.5 items-center justify-center'>
            <img src={inter} className='w-3xs'/>
            <h1>Internazionale</h1>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Match
