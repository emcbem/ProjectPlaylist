export interface Company {
    id: number;
    slug: string;
    name: string;
    startDate: string; // Consider using Date type if you prefer
    logoURL: string;
}