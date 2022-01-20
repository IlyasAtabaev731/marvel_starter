import axios from "axios";

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=7f69dec81665ff0a5b0033d865dced97';

    get = async (url) => {
        url = url.replaceAll(/\s/g, '');
        try{
            return await axios.get(url);
        }catch(e) {
            throw new Error(e);
        }
    }
    getAllCharacters = async () => {
        const res = await this.get(`${this._apiBase}characters?${this._apiKey}&limit=9&offset=210`);
        return res.data.data.results.map(this._ToCharacter)
    }
    getCharacter = async (id) => {
        const res = await this.get(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._ToCharacter(res.data.data.results[0])
    }

    _ToCharacter = (char) => {
        let description = char.description
        if(!description) {
            description = 'Description not found'
        }
        if(description.length > 220) {
            let newDescr = [];
            let c = 1;
            while (c) {
                const item = description.split(' ')[c - 1]
                if ((newDescr.join(' ') + item).length < 220) {
                    newDescr.push(item);
                    c++;
                }else {
                    break
                }
            }
    
            description = newDescr.join(' ') + '...';
        }
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsItems: char.comics.items
        }
    }
}

export default MarvelService;
