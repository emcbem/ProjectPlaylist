import { OrderingMethods } from "@/@types/Enums/OrderingMethod";

export const HumanizeOrder = (order: OrderingMethods) => 
{
    switch (order){
        case OrderingMethods.AZ:
            return "A-Z"
        case OrderingMethods.ZA:
            return "Z-A"
        case OrderingMethods.HighestRating:
            return "Highest Rating"
        case OrderingMethods.ReleaseDate:
        default:
            return "Release Date"
    }
}