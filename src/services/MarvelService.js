import {useHttp} from '../components/hooks/http.hook'
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3aa369643bf3624c24c95c6671ebaa45';
    const _baseOffset = 210;


    // getResource = async (url) => {
    //     let res = await fetch(url);
    
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    
    //     return await res.json();
    // }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?format=comic&formatType=comic&orderBy=modified&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }    
    
    const getComics = async (id = 4) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            url: comics.urls[0].url,
            description: comics.description,
            language: comics.textObjects[0].language,
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request/* getResource */(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request/* getResource */(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComics, clearError}
}

export default useMarvelService;