import { useEffect, useState } from 'react'

interface SearchableItem {
    name: string
}

type useSearchType = {
    searchItem: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function useSearch<T extends SearchableItem>(
    list: T[], 
    setFiltered: (filteredList: T[])=>void
): useSearchType  {
    const [searchText, setSearchText] = useState<string>('')
    
    useEffect(()=>{
        if (searchText) {
            setFiltered(
                list.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
            )    
        } else {
            setFiltered(list)
        }
    }, [searchText, list, setFiltered])
    
    const searchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value)
    }
  
    return {searchItem}
}   

export {useSearch}
