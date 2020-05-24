import {Telegraf , Markup , session, Stage , BaseScene, Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import IsThereAnyDeal from "../apis/IsThereAnyDeal";
import GamesScene from "../scenes/Games";
export default class MerchantBot {
    public bot: Telegraf<TelegrafContext>;

    constructor(){
        this.bot = new Telegraf(process.env.BOT_TOKEN || "")
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
            const from = this.from(ctx)
            const key = `${from}:query:${query}`;
            const games = await IsThereAnyDeal.games(query)
            
            if(games.length <= 0) return ctx.reply('nao achei esse jogo')

            const gamesScene = new GamesScene(key, games, stage)
            stage.register(gamesScene)
            ctx.scene.enter(key)
        })

        this.bot.launch()
    }

    public from(ctx:TelegrafContext){
        return `@${ctx.from?.username}` || `${ctx.from?.first_name} ${ctx.from?.first_name}`
    }
}