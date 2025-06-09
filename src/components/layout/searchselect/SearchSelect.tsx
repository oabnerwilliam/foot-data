import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'
import { useState } from 'react'
import { useSearch } from '../../../hooks/search/useSearch'

const SearchSelect = ({list, setSelected, selected}:{list: any[], setSelected: any, selected: any}) => {
    const [filteredItems, setFilteredItems] = useState<any []>(list)

    const {searchItem} = useSearch(list, setFilteredItems)

    return (
        <div className="w-full max-w-md mx-auto">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <ComboboxInput
                        displayValue={(item: any) => item?.name ?? ""}
                        onChange={searchItem}
                        placeholder='Pesquisar academia...'
                        className="w-full border border-gray-300 rounded px-3 py-2 pr-10 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </ComboboxButton>
                </div>
                <ComboboxOptions className="border border-gray-300 rounded-b bg-white mt-1 max-h-60 overflow-auto shadow-lg z-10">
                    {filteredItems.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">Nenhuma opção encontrada</div>
                    )}
                    {filteredItems.map((item) => (
                        <ComboboxOption
                            value={item}
                            key={item.name}
                            className={({ selected }) =>
                                `cursor-pointer select-none px-4 py-2 ${selected ? 'font-semibold' : ''}`
                            }
                        >
                            {item.name}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}

export default SearchSelect
