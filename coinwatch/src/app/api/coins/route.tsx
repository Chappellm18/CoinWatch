'use client';

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
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>API Data</h2>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.name} ({item.symbol})</h3>
          <p>Price (USD): ${item.price_usd}</p>
          <p>Market Cap: ${item.market_cap_usd}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiComponent;
