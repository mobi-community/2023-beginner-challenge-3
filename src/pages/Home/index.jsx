import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NameForm from './components/NameForm'
import useFetch from '../../hooks/useFetch'
import { WeatherApi } from '../../apis/weather'
import Dialog from '../../components/Dialog'
import useDialog from '../../hooks/useDialog'

const HomePage = () => {
	const dialog = useDialog()
	const [isBackGroundBlur, setIsBackGroundBlur] = useState(true)

	const { data, loading } = useFetch(WeatherApi.getTodaysTemp)
	const weather = data?.response.body.items.item

	useEffect(() => {
		const isHaveUserName = !!localStorage.getItem('userName') // boolean
		return setIsBackGroundBlur(!isHaveUserName)
	}, [])

	const onPressNavigateBlog = () => {
		dialog.moveTo({ url: '/posts' })
	}

	if (loading) {
		return <div>로딩중...</div>
	}

	return (
		<>
			{isBackGroundBlur && <NameForm setBlurred={setIsBackGroundBlur} />}
			<S.HomeContents>
				<h1>Home Page</h1>
				<p>오늘의 기온</p>
				<p>
					<span>{weather.find(el => el.category === 'T1H').obsrValue}</span>도
				</p>
				<S.Button onClick={onPressNavigateBlog}>블로그 보러가기</S.Button>
			</S.HomeContents>
			<Dialog />
		</>
	)
}
export default HomePage

const HomeContents = styled.div`
	text-align: center;
	margin: 15% 0;
	overflow-y: hidden;
	line-height: 50px;
	p > span {
		font-size: 50px;
		color: #7895cb;
	}
`

const Button = styled.button`
	background-color: black;
	border: none;
	color: white;
	font-size: 16px;
	padding: 10px;
	margin-top: 10px;
	&:hover {
		background-color: gray;
	}
`

const S = {
	Button,
	HomeContents,
}
