

import Merchant from "./Merchant";
// import IsThereAnyDeal , { IGame, IPrice} from "./IsThereAnyDeal"
require('dotenv').config();

const server = new Merchant(process.env.BOT_TOKEN || "");
server.start()



// const api = new IsThereAnyDeal();

// const start = async () => {
//     const game = await api.prices("Resident Evil 2");
//     console.log(`Game: ${game.title}`)
//     game.prices.forEach((price:IPrice) => {
//         console.log(`${price.shop.name} - ${price.price_new} (${price.price_old}) ${price.price_cut}%`)
//     });
// }

// start();