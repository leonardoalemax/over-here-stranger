import { BaseScene, Markup } from "telegraf";
import { SceneContextMessageUpdate, Stage } from "telegraf/typings/stage";
import IGame from "../models/Games";
import IsThereAnyDeal from "../apis/IsThereAnyDeal";
import GameScene from "./Game";

export default class GamesScene {
    public base:BaseScene<SceneContextMessageUpdate>;

    constructor( public title:string,
                 public games:Array<IGame>,
                 public stage:Stage<SceneContextMessageUpdate>
                ) {

        this.base = new BaseScene(this.title)    
    
       
        this.base.enter(async (ctx:SceneContextMessageUpdate) => {
            console.log(this.title)
            if(this.games.length > 1) this.choose(ctx)  
            else await this.enterGame(ctx, this.games[0])
        })

        this.games.forEach((game:IGame) => {
            this.base.hears(game.title, async (ctx) => {
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
        const key = `game:${game.plain}`;   
        const info = await IsThereAnyDeal.info(game.plain)
        game.image = info.image;
        const gamesScene = new GameScene(key , game, this.stage)
        this.stage.register(gamesScene.base)
        ctx.scene.enter(key);
    }
} 