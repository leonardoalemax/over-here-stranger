import {Telegraf} from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import * as tt from 'telegraf/typings/extra'
import extra from "telegraf/extra";

import IsThereAnyDeal, { IPrice } from "./IsThereAnyDeal";
import mustache from "mustache";
import fs from "fs";

export default class Merchant {
    public bot: Telegraf<TelegrafContext>;
    public helloTemplate:string;
    public pricesTemplate:string;
    public errorTemplate:string;

    constructor(token: string){
        this.bot = new Telegraf(token);
        this.helloTemplate = fs.readFileSync("src/messages/hello.html", 'utf-8');
        this.errorTemplate = fs.readFileSync("src/messages/error.html", 'utf-8');
        this.pricesTemplate = fs.readFileSync("src/messages/prices.html", 'utf-8');
    }

    public async answer(query:string) {
        const api = new IsThereAnyDeal()
        const game = await api.prices(query)
        if (typeof game === "undefined") return this.errorTemplate;
 
        return mustache.render(this.pricesTemplate, game);
    }

    public start() { 
        this.bot.start((ctx:TelegrafContext) => {
            ctx.replyWithMarkdown(this.helloTemplate)
        })
        this.bot.help((ctx:TelegrafContext) => {
            const markup = extra.markdown()
            ctx.replyWithMarkdown('What are ya’ buyin!?', markup)
        })
        this.bot.on('text', async (ctx:TelegrafContext) => {
            if(ctx.message && ctx.message.text){
                const answer = await this.answer(ctx.message.text);
                ctx.replyWithHTML(answer)
                ctx.reply('is that all stranger?')
            }
        })
        this.bot.launch()
    }
}