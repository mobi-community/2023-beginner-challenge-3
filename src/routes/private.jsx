import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const isHaveUserName = !!localStorage.getItem('userName')

	useEffect(() => {
		if (!isHaveUserName) {
			alert('로그인이 필요합니다.')
			window.location.href = '/'
		}
	}, [])
	return isHaveUserName ? <Outlet /> : null
}

export default PrivateRoute
