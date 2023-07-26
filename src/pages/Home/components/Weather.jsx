import { useEffect, useState } from 'react'
import { WeatherApi } from '../../../apis/weather'

const WeatherInfo = () => {
	const [weather, setWeather] = useState()
	const fetchWeather = async () => {
		try {
			const response = await WeatherApi.getTodaysTemp()
			setWeather(response.data.response.body.items.item)
		} catch (err) {
			console.log(err)
			throw new Error('failed load weather api')
		}
	}

	useEffect(() => {
		fetchWeather()
	}, [])

	return (
		<>
			<h3>🌤️ 오늘의 기온 🌡️</h3>
			<p>
				<span>{weather?.find(el => el.category === 'T1H').obsrValue}</span>
				°C
			</p>
		</>
	)
}

export default WeatherInfo
