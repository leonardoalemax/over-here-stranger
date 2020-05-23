import axios from "axios";
import IGame from "../models/Games";
import IPrice from "../models/Price";

export default class IsThereAnyDeal {
    static async games(query:string): Promise<Array<IGame>> {
        const params = new URLSearchParams({
            key: process.env.API_KEY || "",
            region:'BR2',
            country: 'BR',
            q: query,
            shops: 'nuuvem,steam,greenmangaming,humblestore'
        })
        
        const url = `https://api.isthereanydeal.com/v01/search/search/?${params.toString()}`

        const { data } = await axios.get(url)
        return data.data.list as Array<IGame>
    }

    static async info(query:string): Promise<IGame>  {
        const params = new URLSearchParams({
            key: process.env.API_KEY || "",
            plains: query
        })

        const url = `https://api.isthereanydeal.com/v01/game/info/?${params.toString()}`;
        const { data } = await axios.get(url);
        return data.data[query] as IGame;
    }

    static async prices(query:string): Promise<Array<IPrice>>  {
        const params = new URLSearchParams({
            key: process.env.API_KEY || "",
            region:'BR2',
            country: 'BR',
            shops: 'nuuvem,steam,greenmangaming,humblestore',
            plains: query
        })

        const url = `https://api.isthereanydeal.com/v01/game/prices/?${params.toString()}`;
        const { data } = await axios.get(url);
        return data.data[query].list as Array<IPrice>;
    }
}