import { BaseScene, Markup } from "telegraf";
import { SceneContextMessageUpdate, Stage } from "telegraf/typings/stage";
import IGame from "../interfaces/Games";
import IsThereAnyDeal from "../apis/IsThereAnyDeal";
import GameScene from "./Game";

export default class GamesScene extends BaseScene<SceneContextMessageUpdate> {

    constructor( public title:string,
                 public games:Array<IGame>,
                 public stage:Stage<SceneContextMessageUpdate>
                ) {

        super(title);    
    
       
        this.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(title)
            if(this.games.length > 1) this.choose(ctx)  
            else await this.enterGame(ctx, games[0])
        })

        this.games.forEach((game:IGame) => {
            this.hears(game.title, async (ctx) => {
                await this.enterGame(ctx, game)
            })
        })
    }

    private choose(ctx:SceneContextMessageUpdate) {
        const list = this.games.map((game:IGame) => `${game.title}`)

        const options =  Markup
                .keyboard(list)
                .oneTime()
                .resize()
                .extra()

        ctx.reply('Eu achei esses jogos, qual você vai querer?', options)   
    }

    private async enterGame(ctx:SceneContextMessageUpdate, game:IGame) {
        const key = `${this.title}:game:${game.plain}`  
        const info = await IsThereAnyDeal.info(game.plain)
        game.image = info.image
        const gamesScene = new GameScene(key , game, this.stage, this.title)
        this.stage.register(gamesScene)
        ctx.scene.enter(key)
    }
} 