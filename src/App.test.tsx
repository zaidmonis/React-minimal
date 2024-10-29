import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders loading state initially', () => {
  render(<App />);
  const linkElement = screen.getByText(/loading/i);
  expect(linkElement).toBeInTheDocument();
});

test('test weather data is being rendered properly', async () => {
  const mockWeatherData = [
    {
      date: '2024-10-01',
      temperatureC: 37,
      summary: "Scorching",
      temperatureF: 98
    },
    {
      date: '2024-10-01',
      temperatureC: -40,
      summary: "Chilling",
      temperatureF: -40
    }
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockWeatherData),
    })) as jest.Mock

    render(<App />)

    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    expect(screen.getByText(/Scorching/i)).toBeInTheDocument();
    expect(screen.getByText(/Chilling/i)).toBeInTheDocument();
    const forecast  = screen.getAllByText(/Temperature:/i)
    expect(forecast.length).toBe(mockWeatherData.length)
    expect(screen.getByText(/Weather forecast/i)).toBeInTheDocument();
})