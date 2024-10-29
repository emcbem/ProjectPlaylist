import { useQuery } from "@tanstack/react-query"
import keys from "@/QueryKeys/UserAccountKeys"
import { UserAccountService } from "@/ApiServices/UserAccountService"

export const UserAccountQueries = {
    useGetUserByUsername: (name: string) => {
        return useQuery({
            queryFn: () => {
                UserAccountService.GetUserByUsername(name)
            },
            queryKey: keys.GetUserByUsername,
        })
    }
}