import { FC } from 'react';
import DataTable, { TableStyles } from 'react-data-table-component';
import { DailyRate } from '../../ts/DailyRate';
import styled from 'styled-components';
import { devices } from './styles/devices';

type RatesTableProps = {
    dailyRates?: DailyRate[];
}

const columns = [
    {
        name: 'Country',
        selector: (row: DailyRate) => row.country,
        sortable: true,
        hide: 620,
    },
    {
        name: 'Currency',
        selector: (row: DailyRate) => row.currency,
        sortable: true,
        center: true,
    },
    {
        name: 'Amount',
        selector: (row: DailyRate) => `${row.amount} ${row.code}`,
        sortable: true,
        center: true,
    },
    {
        name: 'Rate',
        selector: (row: DailyRate) => `${row.rate} CZK`,
        sortable: true,
        center: true,
    },
];

const customStyles: TableStyles = {
    table: {
        style: {
            minWidth: '460px',
        }
    },
    header: {
        style: {
            minHeight: '2rem',
        },
    },
    headRow: {
        style: {
            borderTopWidth: '1px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'white',
            backgroundColor: 'green',
        },
    },
    cells: {
        style: {
            fontSize: '1rem',
        },
    },
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TableSpacer = styled.div`
    width: 100%;

    @media ${devices.lg} {
        width: 90%;
    }

    @media ${devices.xl} {
        width: 80%;
    }
`;

export const RatesTable: FC<RatesTableProps> = ({ dailyRates }) => {
    if (!dailyRates) return <>No data available</>;

    return (
        <Wrapper>
            <TableSpacer>
                <DataTable
                    columns={columns}
                    data={dailyRates}
                    customStyles={customStyles}
                    defaultSortFieldId={1}
                />
            </TableSpacer>
        </Wrapper>
    );
};