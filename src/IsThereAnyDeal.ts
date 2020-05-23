import cheerio from "cheerio";
import axios from "axios";


export interface IPrice {
    price_new: number,
    price_old: number,
    price_cut: number,
    url: string,
    shop: { id: string, name: string },
    drm: Array<string>
}


export interface IGame {
    title: string,
    plain: string,
    prices: Array<IPrice>
}

export default class IsThereAnyDeal {
    public params: URLSearchParams;
    constructor(){
        this.params = new URLSearchParams({
            key: "c8e51362710ae7456836a3aba5949a47d55dba52",
            region:'BR2',
            country: 'BR',
        })
    }

    public async find(query:string) {
        this.params.append('q', query)
        this.params.append('shops', 'nuuvem,steam,greenmangaming,humblestore')
        const url = `https://api.isthereanydeal.com/v01/search/search/?${this.params.toString()}`

        const { data } = await axios.get(url)
        console.log(data.data.list[0])
        return data.data.list[0] as IGame
    }

    public async prices(query:string) {
        const game = await this.find(query)
        if (typeof game === 'undefined') return undefined;

        this.params.append('plains', game.plain)
        const url = `https://api.isthereanydeal.com/v01/game/prices/?${this.params.toString()}`;
        console.log(url)
        const { data } = await axios.get(url);
        game.prices = data.data[game.plain].list;
        return game;
    }
}