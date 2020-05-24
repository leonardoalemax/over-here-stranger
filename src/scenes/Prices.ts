import { BaseScene, Markup } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import IGame from "../interfaces/Games";
import IPrice from "../interfaces/Price";

export default class PricesScene extends BaseScene<SceneContextMessageUpdate> {
    public list:Array<string>

    constructor(public title:string, public game:IGame){
        super(title)

        this.list = this.game.prices.map((price:IPrice) => price.shop.name)

        this.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(this.title)
            
            const options =  Markup
            .keyboard(this.list)
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
            this.hears(price.shop.name, async (ctx) => {
                await ctx.reply(price.url)
            })
        })

    }
} 