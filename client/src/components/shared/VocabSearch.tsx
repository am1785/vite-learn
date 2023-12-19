import {useState} from 'react'
import { useQueryClient, useQuery } from 'react-query'

// export interface SearchProps {
//     readonly onAddMessage: (text: string) => void
//     readonly onFetchAsyncMessage: () => void
//     readonly onAlert: () => void
// }

function VocabSearch() {
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [status, setStatus] = useState('idle')

    const fetchWord = async () => {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        return res.json()
    }
    // const searchQuery = useQuery({
    //     queryKey: ["vocab"],
    //     queryFn: fetchWord,
    // })

    // const { data } = useQuery(['fetchData', query], () => fetchWord)
    // const mutation = useMutation();
    const queryClient = useQueryClient();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log('searching for ' + query)

        let data:any = {}
        try {
            data = await queryClient.fetchQuery({ queryKey: ["vocab"], queryFn: fetchWord });
        } catch (error) {
            data['title'] = 'No Definitions Found'
            console.log(error)
        }

        console.log(data)

        // handle invalid search
        data['title'] === "No Definitions Found" ? setSearchResult(null) : setSearchResult(data)

    }

return (<>
<div className="relative mt-6 max-w-xl mx-auto">
<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
<svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor"/>
</svg>
</span>
<form onSubmit={handleSubmit}>
<input className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="search word" onChange={(e)=>setQuery(e.target.value)}></input>
</form>
</div>

{searchResult ? (
    <div className="relative mt-6 max-w-xl mx-auto">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2">
                <a href="#" className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" aria-current="page">Google</a>
            </li>
            <li className="me-2">
                <a href="#"  className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Wordnet</a>
            </li>
        </ul>
    </div>
) : null}

</>)
}

export default VocabSearch