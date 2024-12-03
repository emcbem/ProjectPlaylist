import { UserAccountContext } from "@/contexts/UserAccountContext"
import { useContext } from "react"

export const useUserContext = () => 
{
    return useContext(UserAccountContext)
}