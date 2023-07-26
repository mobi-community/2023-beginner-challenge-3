import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialLogState, useDiaLogStore } from '../../contexts/DialogProvider'
import NameForm from './components/NameForm'
import useFetch from '../../hooks/useFetch'
import { WeatherApi } from '../../apis/weather'

const HomePage = () => {
	const [isBackGroundBlur, setIsBackGroundBlur] = useState(true)
	const { dispatch, OpenDialog } = useDiaLogStore()

	const { data, loading, error } = useFetch(WeatherApi.getTodaysTemp)
	const weather = data?.response.body.items.item

	useEffect(() => {
		const isHaveUserName = !!localStorage.getItem('userName') // boolean
		return setIsBackGroundBlur(!isHaveUserName)
	}, [])

	const onPressNavigateBlog = () => {
		console.log('clicked')
		OpenDialog()
		dispatch({
			type: DialLogState.ALERT,
			payload: {
				type: DialLogState.ALERT,
				text: '정말로 페이지를 이동하겠습니까',
				url: '/posts',
			},
		})
	}

	if (loading) {
		return <div>로딩중...</div>
	}

	return (
		<>
			{isBackGroundBlur && <NameForm setBlurred={setIsBackGroundBlur} />}
			<div>
				<h1>Home Page</h1>
				<p>오늘의 기온</p>
				<p>{weather.find(el => el.category === 'T1H').obsrValue}도</p>
				<S.Button onClick={onPressNavigateBlog}>블로그 보러가기</S.Button>
			</div>
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
