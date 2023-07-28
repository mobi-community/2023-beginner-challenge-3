import { useEffect, useState } from 'react';
import { fetching } from '../../../util/utility';

const WeatherInfo = () => {
  const [weather, setWeather] = useState();

  const fetchWeather = async () => {
    const address = '/getUltraSrtNcst';
    const option = {
      baseURL: import.meta.env.VITE_URL,
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_KEY,
        dataType: 'JSON',
        base_date: new Date().toISOString().substring(0, 10).replace(/-/g, ''),
        base_time: '0600',
        nx: 60,
        ny: 127,
      },
    };
    try {
      const res = await fetching(address, option);
      setWeather(res.response.body.items.item);
    } catch (err) {
      console.log(err);
      throw new Error('failed load weather api');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <p>오늘의 기온</p>
      <p>{weather?.find((el) => el.category === 'T1H').obsrValue}도</p>
    </div>
  );
};

export default WeatherInfo;
