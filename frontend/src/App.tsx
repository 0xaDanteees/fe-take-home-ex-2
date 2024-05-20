import React, { useState, useEffect } from 'react';
import useWebSocket, { Currency } from './hooks/useWebSocket';
import './App.css';

interface ColumnData {
  name: string;
  currency: Currency | null;
}

const App: React.FC = () => {
  // We want the data from the websocket, here we import and implement the hook
  const data = useWebSocket('ws://localhost:5050/ws');

  // Initialize state for storing column data
  const [columns, setColumns] = useState<ColumnData[]>([]);

  // Initialize state for storing previous values
  const [previousValues, setPreviousValues] = useState<{ [key: string]: number }>({});

  // Update previous value for a specific column
  const updatePreviousValue = (columnName: string, value: number) => {
    setPreviousValues(prevValues => ({
      ...prevValues,
      [columnName]: value,
    }));
  };

  // % calculator
  const calculatePercentageChange = (currentPrice: number, prevPrice: number): string => {
    const change = currentPrice - prevPrice;
    if (change === 0) {
      return '0%';
    }
    const percentage = ((change / prevPrice) * 100).toFixed(3);
    return `${change > 0 ? '+' : ''}${percentage}%`; 
  };

  // Function to handle data display and update previous values
  useEffect(() => {
    if (data.length > 0) {
      const newData = data[data.length - 1];
      setColumns((prevColumns) => {
        const existingColumn = prevColumns.find((column) => column.name === newData.name);
        if (existingColumn) {
          return prevColumns.map((column) => {
            if (column.name === newData.name) {
              // Update previous value for this column
              updatePreviousValue(`${column.name}_prev`, parseFloat(column.currency?.value || '0'));
              return {
                ...column,
                currency: newData,
              };
            }
            return column;
          });
        } else {
          // If not assigned we add it to the table of trending shitcoins :3
          // Also, initialize the previous value for this new column
          updatePreviousValue(`${newData.name}_prev`, parseFloat(newData.value));
          return [
            ...prevColumns,
            {
              name: newData.name,
              currency: newData,
            },
          ];
        }
      });
    }
  }, [data]);

  useEffect(() => {
    const updatePreviousValues = () => {
      setPreviousValues((prevValues) => {
        const updatedValues: { [key: string]: number } = {};

        // Update values for each column
        columns.forEach((column) => {
          const currency = column.currency;
          if (currency) {
            // Get previous value for the current column
            const prevValue = prevValues[`${column.name}_prev`] || parseFloat(currency.value);

            // Update values for each interval
            updatedValues[`${column.name}_1s`] = prevValues[`${column.name}_1s`] || prevValue;
          }
        });

        return updatedValues;
      });
    };

    // Set interval for updating previous values
    const oneSecondInterval = setInterval(() => {
      updatePreviousValues();
    }, 1000);

    // Cleanup function to clear intervals when done
    return () => {
      clearInterval(oneSecondInterval);
    };
  }, [columns]);

  const renderTableRow = (column: ColumnData, index: number) => {
    const currency = column.currency;
    if (!currency) return null; // If not ticker then not render

    // Calculate percentage change
    const percentageChange = calculatePercentageChange(
      parseFloat(currency.value),
      previousValues[`${column.name}_prev`]
    );

    // Determine text color based on percentage change
    const textColorClass = parseFloat(percentageChange) < 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400';

    return (
      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
        <td className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">
          {column.name}
        </td>
        <td className={`px-4 py-3 text-left font-medium md:px-6 md:py-4 ${
          parseFloat(currency.value) < previousValues[`${column.name}_prev`] ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'
        }`}>
          ${parseFloat(currency.value).toFixed(currency.decimal)}
        </td>
        <td className={`px-4 py-3 text-right font-medium md:px-6 md:py-4 ${textColorClass}`}>
          {percentageChange}
        </td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-500">
        Hot shitcoins 💩🔥
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 md:px-6 md:py-4">
                Ticker
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 md:px-6 md:py-4">
                Price
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300 md:px-6 md:py-4">
                % change
              </th>
            </tr>
          </thead>
          <tbody>
            {columns.map((column, index) => (
              renderTableRow(column, index)
            ))}
          </tbody>
        </table>
      </div>


      <div className='justify center text-pretty text-justify'>
        <p className='text-gray-600 font-thin'>
          I would normally go shadcn but this was interesting to pull. no components, first time vite lmeow <br/>
        It came to my mind that if you click or put mouse in the ticker name or in the %pnl then you should be able to
        See a popover or why not with more elegant visuals;  Also some sound when relevant % change or when whale moves
        would be nice, just like aggr... Anyways, had fun :3

      </p>
      </div>
    </div>
  );
};

export default App;
