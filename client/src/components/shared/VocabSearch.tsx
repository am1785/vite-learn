import { useState } from 'react'
import { useQueryClient } from 'react-query'

// @ts-ignore
import { createRequire } from "module"
const require = createRequire(import.meta.url)
// @ts-ignore
// import * as WordNet from 'node-wordnet'

const wordnet = require('wordnet')
await wordnet.init()

export type googleVocabResult = {
    word: string,
    phonetic: string,
    meanings: {
        definitions: string[],
        partOfSpeech: string,
        example: string,
        synonyms: string[],
        antonyms: string[]
    }[],

}

export type wordnetVocabResult = {

}

export type datamuseVocabResult = {
    spellsLike: string,
    soundsLike: string
}

function VocabSearch() {
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [status, setStatus] = useState('idle')

    const fetchWord = async () => {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        return res.json()
    }

    const fetchWordNet = async () => {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
        return res.json()
    }
    // const searchQuery = useQuery({
    //     queryKey: ["vocab"],
    //     queryFn: fetchWord,
    //     enabled: false,
    // })

    // const { data } = useQuery(['fetchData', query], () => fetchWord)
    // const mutation = useMutation();

    const queryClient = useQueryClient();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log('searching for ' + query)

        let data:any = {}

        setStatus('loading')
        try {
            // setTimeout to emulate latency
            setTimeout( async ()=> {
            data = await queryClient.fetchQuery({ queryKey: ["vocab"], queryFn: fetchWord });
            console.log(data)
            setStatus('success')
            setSearchResult(data)
            }, 2000)
        } catch (error) {
            data['title'] = 'No Definitions Found'
            console.log(error)
            setStatus('error')
        }

        // console.log(status)

        // TODO: handle invalid search using datamuse suggestion https://api.datamuse.com/sug?s={query}

    }

return (<>
<div className="relative mt-6 w-full mx-auto">
{ status === 'idle' || status === 'error' || status === 'success' ?
(<div className=''><span className="absolute inset-y-0 left-0 pl-3 flex items-center">
<svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor"/>
</svg>
</span>
<form onSubmit={handleSubmit}>
<input className="w-fit border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="search word" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
</form></div>) : <svg className="animate-pulse rounded-full h-5 w-5 m-0 bg-blue-600 mx-auto" viewBox="0 0 24 24"> </svg> }
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