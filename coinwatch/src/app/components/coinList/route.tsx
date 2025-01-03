'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

const ApiComponent: React.FC = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: ApiResponse[] }>(
          'https://api.coinlore.net/api/tickers/'
        );
        setData(response.data.data); // Access the 'data' array from the response
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Cryptocurrency Prices by Market Cap
                </h2>
              </div>

              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    {[
                      '#',
                      'Coin',
                      'Price',
                      '1h',
                      '24h',
                      '7d',
                      '24h Volume',
                      'Mkt Cap'                    
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-start whitespace-nowrap"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          {header}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data.map((item) => (
                    <tr key={item.id} >
                      <td className="whitespace-nowrap px-6 py-3">{item.rank}</td>
                      <td className="whitespace-nowrap px-6 py-3 flex items-center gap-x-2">
                        <span className="font-semibold text-sm text-gray-800 dark:text-white">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-neutral-500">
                          {item.nameid}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        ${+item.price_usd < 1 
                          ? Number(item.price_usd).toString() 
                          : Number(item.price_usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      <td className={`whitespace-nowrap px-6 py-3 ${+item.percent_change_1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.percent_change_1h}%
                      </td>
                      <td className={`whitespace-nowrap px-6 py-3 ${+item.percent_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.percent_change_24h}%
                      </td>
                      <td className={`whitespace-nowrap px-6 py-3 ${+item.percent_change_7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.percent_change_7d}%
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        ${+item.volume24 < 1 
                          ? Number(item.volume24).toString() 
                          : Number(item.volume24).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3">
                        ${+item.market_cap_usd < 1 
                          ? Number(item.market_cap_usd).toString() 
                          : Number(item.market_cap_usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiComponent;
