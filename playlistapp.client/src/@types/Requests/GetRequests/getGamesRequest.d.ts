import { OrderingMethods } from "@/@types/Enums/OrderingMethod"

export type GetGamesRequest = {
    page: number,
    pageSize: number,
    title: string,
    genreIds: number[],
    platformIds: number[],
    companyIds: number[],
    orderingMethod: OrderingMethods
}