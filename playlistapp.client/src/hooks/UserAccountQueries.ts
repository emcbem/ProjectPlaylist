import { useQuery } from "@tanstack/react-query"
import keys from "@/QueryKeys/UserAccountKeys"
import { UserAccountService } from "@/ApiServices/UserAccountService"

export const UserAccountQueries = {
    useGetUserByUsername: (name: string) => {
        return useQuery({
            queryKey: keys.GetUserByUsername,
            queryFn: () => {
                UserAccountService.GetUserByUsername(name)
            }
        })
    }
}