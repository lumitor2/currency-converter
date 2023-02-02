import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DailyRate } from '../../ts/DailyRate';
import { devices } from './styles/devices';

const DEFAULT_CONVERSION_VALUE = '--';

const FormWrapper = styled.div`
    margin: 4rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Form = styled.div`
    padding: 1rem;
    background-color: lightgray;
    border-radius: 10px;
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;

    @media ${devices.xs} {
        width: 90%;
        gap: 0.7rem;
        height: 3rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    @media ${devices.lg} {
        width: 60%;
        gap: 1rem;
    }
`;

const AmountInput = styled.input`
    height: 3rem;
    text-align: center;
    border-radius: 5px;
    border: none;
    flex: 1;
    font-size: 1.2rem;
`;

const RateSelect = styled.select`
    height: 3rem;
    text-align: center;
    border-radius: 5px;
    border: none;
    flex: 1;
    font-size: 1.2rem;
`;

const ConversionResult = styled.div`
    color: gray;
    flex: 1;
    text-align: center;
    white-space: nowrap;
    font-size: 2rem;

    @media ${devices.xs} {
        font-size: 1.2rem;
    }
`;

type ConversionFormProps = {
    dailyRates?: DailyRate[];
}

const useConversionForm = (dailyRates?: DailyRate[]) => {
    const selectedDailyRate = dailyRates?.[0];
    const [selectedRate, setSelectedRate] = useState<DailyRate | undefined>(selectedDailyRate);
    const [currentAmount, setCurrentAmount] = useState<number>(Number(selectedDailyRate?.amount) || 0);
    const [shownAmount, setShownAmount] = useState<string>(currentAmount.toString());
    const [conversionResult, setConversionResult] = useState<string>(DEFAULT_CONVERSION_VALUE);

    const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
        if (event) event.preventDefault();

        const amount = event?.target?.value;
        if (!amount || amount === '' || /^\d*\.?\d*$/.test(amount) === false) {
            setShownAmount('');
            setCurrentAmount(0);
            return;
        }

        setShownAmount(amount);
        setCurrentAmount(Number(amount));
    };

    const updateSelectedRate = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event) event.preventDefault();

        const sR = event?.target?.value;
        if (!sR) setSelectedRate(selectedDailyRate || undefined);

        setSelectedRate(dailyRates?.find((rate: DailyRate) => rate.code === sR) || undefined);
    };

    const getConversionResult = () => {
        if (!selectedRate?.rate || !currentAmount || currentAmount === 0) {
            setConversionResult(DEFAULT_CONVERSION_VALUE);
            return;
        }

        const result = Number(currentAmount) / selectedRate.amount * selectedRate.rate;
        setConversionResult(`${result.toFixed(3)} CZK`);
    };

    useEffect(() => {
        getConversionResult();
    }, [selectedRate, currentAmount]);

    return { shownAmount, updateAmount, selectedRate, updateSelectedRate, conversionResult };
};

export const ConversionForm: FC<ConversionFormProps> = ({ dailyRates }) => {
    const { shownAmount, updateAmount, selectedRate, updateSelectedRate, conversionResult } = useConversionForm(dailyRates);

    if (!dailyRates || dailyRates.length === 0) return <></>;

    return (
        <FormWrapper>
            <Form>
                <AmountInput type='text' pattern="[0-9]*" value={shownAmount} onChange={(e) => updateAmount(e)} placeholder='Insert amount of money' />
                <RateSelect id='currency' onChange={(e) => updateSelectedRate(e)} defaultValue={selectedRate?.code}>
                    {dailyRates.map((rate: DailyRate) => <option key={rate.code} value={rate.code}>{rate.code}</option>)}
                </RateSelect>
                <ConversionResult>{conversionResult}</ConversionResult>
            </Form>
        </FormWrapper>
    );
};