import React, { useEffect, useState } from 'react'
import { get } from '../../util/requests/api'
import Loader from '../layout/loader/Loader'
import SearchSelect from '../layout/searchselect/SearchSelect'

const Fighting = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingFighters, setLoadingFighters] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [category, setCategory] = useState<any>()
    const [fighters, setFighters] = useState<any []>([])
    
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
    
    useEffect(()=>{
        if (category) {
            const fetchData = async ()=>{
                setLoadingFighters(true)
                
                const data = await get(`https://v1.mma.api-sports.io/fighters?category=${category}`)

                if (data) {
                    setFighters(data.response)
                    setLoadingFighters(false)
                }
            }
            
            fetchData()

            /*setTimeout(()=>{
                setLoadingFighters(false)
            }, 1000)*/    
        }
    }, [category])
    
    return (
        <div className='flex flex-col w-full items-center'>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <>
                        <div className='mt-5 w-full flex
                        justify-center'>
                            <select className='text-p-text text-2xl w-[50%] outline-none' 
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
