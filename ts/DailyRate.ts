import { ResponseState } from './State';

export type DailyRate = {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export type DailyRatesResponse = {
    status: ResponseState;
    dailyRates: DailyRate[];
    date?: string | null;
    errorMessage?: string;
}