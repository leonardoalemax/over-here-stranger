export default interface IPrice {
    price_new: number,
    price_old: number,
    price_cut: number,
    url: string,
    shop: { id: string, name: string },
    drm: Array<string>
}