export interface Company {
    id: number;
    slug: string;
    name: string;
    startDate: string; // Consider using Date Company if you prefer
    logoURL: string;
}

export interface CompanyContextInterface {
    companies: Company[];
    error: string;
    isLoading: boolean;
    fetchAllCompanies: (companies: Company[]) => void;
}