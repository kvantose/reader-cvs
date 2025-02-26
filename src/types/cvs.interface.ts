export interface CSVRow {
    article: string;
    description: string;
    price: number;
    img: string;
}


export interface CSVData {
    data: CSVRow[];
    dataLimit: number;
}