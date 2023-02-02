import { FC } from 'react';
import { useQuery } from 'react-query';
import { RatesTable } from './RatesTable';
import styled from 'styled-components';
import { DailyRatesResponse } from '../../ts/DailyRate';
import { ResponseState } from '../../ts/State';
import { devices } from './styles/devices';
import { ConversionForm } from './ConversionForm';

const Loader = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin: 10rem 0;
`;

const ErrorMessage = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin: 10rem 0;
    color: red;
`;

const Title = styled.h1`
    margin: 1rem 0;
    font-size: 1.7rem;
    text-align: center;
    width: 100%;

    @media ${devices.sm} {
        font-size: 2rem;
    }
    @media ${devices.lg} {
        font-size: 3.5rem;
    }
`;

const SubTitle = styled.h2`
    margin: 2rem 0 1rem 0;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media ${devices.sm} {
        font-size: 1.3rem;
    }
    @media ${devices.lg} {
        font-size: 1.8rem;
        flex-direction: row;
    }
`;

const Note = styled.div`
    font-size: 0.8rem;
    color: gray;

    @media ${devices.sm} {
        font-size: 1rem;
    }
`;

const useDailyRates = () => {
    const { isLoading, isError, data, error } = useQuery('daily-rates', async () => await loadCurrentRates());

    const loadCurrentRates = async (): Promise<DailyRatesResponse> => {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/daily-rates', { mode: 'cors' });
            const jsonResponse: DailyRatesResponse = await response.json();

            if (jsonResponse.status === ResponseState.ERROR) throw new Error('There was an error during loading data from backend server');

            return jsonResponse;
        } catch (e) {
            throw new Error('Error loading daily rates');
        }
    };

    return { isLoading, isError, data, error };
};

export const DailyRatesDashboard: FC = () => {
    const { isLoading, isError, data, error } = useDailyRates();

    if (isLoading) {
        return <Loader>Loading...</Loader>;
    }

    if (isError) {
        // Error message is added only for sure - otherwise it would be better to use some error boundary or Sentry
        return (
            <ErrorMessage>
                <p>We are sorry but something went wrong.</p>
                <p>Error message: {(error as Error).message}</p>
            </ErrorMessage>
        );
    }

    return (
        <>
            <Title>Currency rates converter to CZK</Title>
            <ConversionForm dailyRates={data?.dailyRates} />
            {data?.date ? (<SubTitle>Actual daily rates for {data.date} <Note>(based on data from <a href="https://cnb.cz" title='Czech national bank' target='_blank' rel="noreferrer">cnb.cz</a>)</Note></SubTitle>) : null}
            <RatesTable dailyRates={data?.dailyRates} />
        </>
    );
};