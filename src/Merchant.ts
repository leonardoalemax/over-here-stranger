import {Telegraf , Markup , session, Stage , BaseScene, Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import IsThereAnyDeal from "./apis/IsThereAnyDeal";
import IEnv from "./models/Env";
import GamesScene from "./scenes/Games";
export default class Merchant {
    public bot: Telegraf<TelegrafContext>;

    constructor(public env:IEnv){
        this.bot = new Telegraf(this.env.telegramToken)
    }

    public start() {
        this.bot.use(session())
        const stage = new Stage([])
        this.bot.use(stage.middleware() as Middleware<TelegrafContext>)
        
        this.bot.start((ctx:TelegrafContext) => {
            ctx.reply('Ola estranho, estou aqui pra te ajudar com o melhor preço dos jogos, escreva um jogo, que eu acho o melhor preço pra você.')
        })

        this.bot.help((ctx:TelegrafContext) => {
            ctx.reply('Me diga um jogo, que eu acho o melhor preço.')
        })

        this.bot.on('text', async (ctx:any) => {
            const query = ctx.message?.text || "";
            const key = `games:${query}`;
            const games = await IsThereAnyDeal.games(query)

            if(games.length <= 0) return ctx.reply('nao achei esse jogo')

            const gamesScene = new GamesScene(key, games, stage)
            stage.register(gamesScene.base)
            ctx.scene.enter(key)
        })

        this.bot.launch()
    }
}