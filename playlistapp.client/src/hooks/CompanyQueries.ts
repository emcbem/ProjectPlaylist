import { CompanyService } from "@/ApiServices/CompanyService";
import { useQuery } from "@tanstack/react-query";
import keys from "../QueryKeys/CompanyKeys";

export const CompanyQueries = {
  useGetAllCompanies: () => {
    return useQuery({
      queryFn: () => CompanyService.GetAllCompanies(),
      queryKey: keys.GetAllCompanies,
    });
  },
};
