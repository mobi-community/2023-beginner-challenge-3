import { styled } from 'styled-components'
import { DialLogState } from '../contexts/DialogProvider'
import React from 'react'

// forwardRef로 컴포넌트가 ref를 전달받을 수 있게 함
// 부모 컴포넌트에서 ref를 사용하여 Dialog 컴포넌트에 접근 가능
const Dialog = React.forwardRef(
	// onConfirm: 확인 버튼 클릭 시 호출될 콜백 함수
	// onCancle: 취소 버튼 클릭 시 호출될 콜백 함수 (type이 CONFIRM인 경우에만 사용)
	// onClose: x 버튼 클릭 시 호출될 콜백 함수
	// position: 다이얼로그의 위치를 결정하는 css 속성값

	// onConfirm, onCancle 부분은 DialogProvider에서 useReducer을 사용하여 구현할 수 있지 않을까?
	({ type, text, onConfirm, onCancel, onClose, position }, ref) => {
		return (
			<S.Wrapper ref={ref} $position={position}>
				<S.CloseButton onClick={onClose}>x</S.CloseButton>
				{text}
				<S.Button onClick={onConfirm}>확인</S.Button>
				{type === DialLogState.CONFIRM && (
					<S.Button onClick={onCancel}>취소</S.Button>
				)}
			</S.Wrapper>
		)
	},
)
// 개발자 도구에서 컴포넌트의 이름을 확인할 때 사용됨
Dialog.displayName = 'dialog'
export default Dialog

const Wrapper = styled.dialog`
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
