import styled from 'styled-components'
import { DialLogState, useDiaLogStore } from '../contexts/DialogProvider'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dialog = () => {
	const { state, isOpen, CloseDialog } = useDiaLogStore()
	const { type, text, position, url } = state

	const navigate = useNavigate()

	const handleConfirm = () => {
		if (url) {
			navigate(url)
		}
		CloseDialog()
	}

	useEffect(() => {
		console.log('Dialog isOpen (inside useEffect): ', isOpen)
	}, [isOpen])

	return isOpen ? (
		<S.Wrapper $position={position}>
			<S.CloseButton onClick={() => CloseDialog()}>x</S.CloseButton>
			{text}
			<S.Button onClick={handleConfirm}>확인</S.Button>
			{type === DialLogState.CONFIRM && (
				<S.Button onClick={() => CloseDialog()}>취소</S.Button>
			)}
		</S.Wrapper>
	) : null
}
// 개발자 도구에서 컴포넌트의 이름을 확인할 때 사용됨
Dialog.displayName = 'dialog'
export default Dialog

const Wrapper = styled.dialog`
	display: block;
	width: 400px;
	position: absolute;
	left: ${({ $position }) => $position.x}%;
	top: ${({ $position }) => $position.y}%;
	transform: translate(-50%, 50%);
	border-radius: 8px;
	border: 1px solid #888;
	::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}
	padding: 20px;
`

const CloseButton = styled.button`
	font-size: 24px;
	margin-right: 50px;
	background: none;
	border: none;
`

const Button = styled.button`
	padding: 8px;
	display: block;
	margin: 10px auto 0px auto;
	border: none;
	background-color: black;
	color: white;
`

const BackDrop = styled.div`
	width: 100%;
`

const S = {
	Wrapper,
	CloseButton,
	Button,
	BackDrop,
}
