import { BaseScene, Markup } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import IGame from "../models/Games";
import IPrice from "../models/Price";

export default class PricesScene {
    public base:BaseScene<SceneContextMessageUpdate>;

    constructor(public title:string, public game:IGame){
        this.base = new BaseScene(this.title)
        const list = this.game.prices.map((price:IPrice) => price.shop.name)
        this.base.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(this.title)
            
            const options =  Markup
            .keyboard(list)
            .oneTime()
            .resize()
            .extra()

            let answer = 'Achei os precos nessa lojas: \n\n';

            this.game.prices.forEach((price:IPrice) => {
                answer += `<b>${price.shop.name} - R$ ${price.price_new}`
                if(price.price_old != price.price_new) 
                    answer += ` (<s>R$ ${price.price_old}</s>)`
                answer += `</b>\n\n`
            })

            ctx.replyWithHTML(answer, options)   
        })

        this.game.prices.forEach((price:IPrice) => {
            this.base.hears(price.shop.name, async (ctx) => {
                await ctx.reply(price.url)
            })
        })

    }
} 