import { BaseScene, Markup, Stage } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import IGame from "../models/Games";
import IsThereAnyDeal from "../apis/IsThereAnyDeal";
import PricesScene from "./Prices";

export default class GameScene {
    public base:BaseScene<SceneContextMessageUpdate>;

    constructor(public title:string, public game:IGame, public stage:Stage<SceneContextMessageUpdate>){
        this.base = new BaseScene(this.title)
    
        this.base.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(this.title)
            ctx.replyWithPhoto(this.game.image)
            
            const options =  Markup
            .keyboard(['sim'])
            .oneTime()
            .resize()
            .extra()

            ctx.reply('É esse o jogo que você quer?', options)   
        })

        this.base.hears(/sim/gi, async (ctx) => await this.reply(ctx))
    }

    private async reply(ctx:SceneContextMessageUpdate) {
        const pricesList = await IsThereAnyDeal.prices(this.game.plain)
        this.game.prices = pricesList
        const key = `price:${this.game.title}`
        const priceScene = new PricesScene(key , this.game)
        this.stage.register(priceScene.base)
        ctx.scene.enter(key)
    }
} 