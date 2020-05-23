import IPrice from "./Price";

export default interface IGame {
    title: string,
    plain: string,
    image: string,
    prices: Array<IPrice>
}
