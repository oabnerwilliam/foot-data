import { useEffect, useState } from 'react'
import { get } from '../../util/requests/api'
import Loader from '../layout/loader/Loader'

const Fighting = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingFighters, setLoadingFighters] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [category, setCategory] = useState<any>()
    const [fighters, setFighters] = useState<any []>([])
    const [fighterSearch, setFighterSearch] = useState<string>('')
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await get("https://v1.mma.api-sports.io/categories")

            if (data) {
                setCategories(data.response)
            }
        }
        
        fetchData()

        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(()=>{
        const foundCategory = categories.find((currentCategory)=>{
            return currentCategory === selectedCategory
        })
        
        setCategory(foundCategory)
    }, [selectedCategory])
    
    useEffect(() => {
        if (!category) return;
        if (!fighterSearch || fighterSearch.length < 2) {
            setFighters([]);
            return;
        }
        const controller = new AbortController();
        const debounceTimeout = setTimeout(() => {
            const fetchData = async () => {
                setLoadingFighters(true);
                let url = `https://v1.mma.api-sports.io/fighters?category=${category}&search=${fighterSearch}`;
                const data = await get(url);
                if (data) {
                    setFighters(data.response);
                }
                setLoadingFighters(false);
            };
            fetchData();
        }, 400); // 400ms debounce
        return () => {
            clearTimeout(debounceTimeout);
            controller.abort();
        };
    }, [category, fighterSearch])
    
    return (
        <div className='flex flex-col w-full items-center'>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <>
                        <div className='mt-5 w-full flex
                        justify-between px-20'>
                            <select className='text-p-text text-2xl w-[30%] outline-none' 
                            onChange={(e)=>{
                                setSelectedCategory(e.target.value)
                            }}
                            value={selectedCategory}
                            >
                                {
                                    categories.map((category)=>(
                                        <option value={category}>{category}</option>
                                    ))   
                                }
                            </select>
                            <input type="text"
                            onChange={(e)=>{
                                setFighterSearch(e.target.value)
                                console.log(e.target.value)
                            }}
                            placeholder='Pesquisar lutador...'
                            className='border border-secondary p-3 w-[30%] outline-none'
                            />
                            {/*
                                teams && (
                                    <SearchSelect list={teams} selected={selectedTeam} setSelected={setSelectedTeam}/>    
                                )
                            */}
                        </div>
                        {
                            loadingFighters ? (
                                <Loader/>
                            ) : (
                                <div className='grid grid-cols-3 gap-6 w-full'>
                                    {
                                        fighters.map((fighter)=>(
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <img src={fighter.photo}
                                                className='w-[100px]'
                                                />
                                                <p>{fighter.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Fighting
