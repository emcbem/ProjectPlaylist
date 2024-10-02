import React, { FC, ReactNode, useEffect, useState } from "react";
import { Company, CompanyContextInterface } from "../@types/company";
import axios from "axios";

export const CompanyContext = React.createContext<CompanyContextInterface | null>(
    null
);

export const CompanyContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);

    const fetchAllCompanies = async () => {
        try {
            const response = await axios.get<Company[]>(`${import.meta.env.VITE_URL}/Company/getallcompanies`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAllCompanies();
                setCompanies(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getData();
    }, []);



    return (
        <CompanyContext.Provider value={{ companies, error, isLoading, fetchAllCompanies }}>
            {children}
        </CompanyContext.Provider>
    )
}