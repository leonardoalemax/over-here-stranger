import { BaseScene, Markup, Stage } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import IGame from "../interfaces/Games";
import IsThereAnyDeal from "../apis/IsThereAnyDeal";
import PricesScene from "./Prices";

export default class GameScene extends BaseScene<SceneContextMessageUpdate> {
    constructor(public title:string, 
                public game:IGame, 
                public stage:Stage<SceneContextMessageUpdate>, 
                public back:string) {

        super(title);
        this.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(title)
            ctx.replyWithHTML(`<b>${game.title}</b>`)
    
            if(typeof game.image === 'string')
                ctx.replyWithPhoto(game.image)
            
            const options =  Markup
            .keyboard(['sim', 'não', 'voltar'])
            .oneTime()
            .resize()
            .extra()
    
            ctx.reply('É esse o jogo que você quer?', options)   
        })
        this.hears(/sim/gi, async (ctx) => await this.reply(ctx))
        this.hears(/não/gi, async (ctx) => this.nops(ctx))
        this.hears(/voltar/gi, async (ctx) => ctx.scene.enter(this.back))
    }

    private nops(ctx:SceneContextMessageUpdate) {
        ctx.reply('Qual o nome do jogo que você busca forasteiro?')
    }

    private async reply(ctx:SceneContextMessageUpdate) {
        const pricesList = await IsThereAnyDeal.prices(this.game.plain)
        this.game.prices = pricesList
        const key = `${this.title}:price`
        const priceScene = new PricesScene(key , this.game)
        this.stage.register(priceScene)
        ctx.scene.enter(key)
    }
}