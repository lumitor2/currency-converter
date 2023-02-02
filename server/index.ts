import Fastify, { FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { ResponseState } from './../ts/State';
import { DailyRate, DailyRatesResponse } from '../ts/DailyRate';

const parseDateFromResponse = (response: string): string | null => {
    // https://regex101.com/r/eRfe4Q/1
    const dateRegex = /([0-9]{1,2} [a-zA-Z]{3} [0-9]{4})/;
    // Parse date in format '01 Feb 2023 #23' from first line
    const dateLine = response.split('\n')[0];
    if (!dateLine) return null;

    const dateMatch = dateLine.match(dateRegex);
    if (!dateMatch?.[1]) return null;

    return dateMatch[1];
};

// 01 Feb 2023 #23
// Country|Currency|Amount|Code|Rate
// Australia|dollar|1|AUD|15.4500
const parseDailyRatesResponse = (response: string): DailyRate[] => {
    // Divide by single lines
    const lines = response.split('\n');
    // Remove first two lines (date and header)
    const ratesLines = lines.slice(2);
    // Parse and return single rate lines
    return ratesLines.map((line: string) => {
        if (line === '') return null;
        const [country, currency, amount, code, rate] = line.split('|');
        return { country, currency, amount: Number(amount), code, rate: Number(rate) };
    }).filter((rate: DailyRate | null) => rate !== null) as DailyRate[];
};

const fastify = Fastify({
    logger: true
});

fastify.register(cors);

fastify.get('/api/daily-rates', async (_, reply: FastifyReply) => {
    try {
        const response = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
        const textResponse = await response.text();
        const date = parseDateFromResponse(textResponse);
        const dailyRates = textResponse ? parseDailyRatesResponse(textResponse) : [];

        reply.send({ status: ResponseState.OK, dailyRates, date } as DailyRatesResponse);
    } catch (error) {
        reply.send({ status: ResponseState.ERROR, dailyRates: [], errorMessage: (error as Error).message } as DailyRatesResponse);
    }
});

fastify.listen({ port: 3000 }, (err) => {
    if (err) throw err;
});