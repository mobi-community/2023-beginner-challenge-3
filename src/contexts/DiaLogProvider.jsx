import { createContext, useContext, useReducer } from 'react'
import { createAction } from '../utils/createAction'

export const DialLogState = {
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
}

const DiaLogContext = createContext()

// 전역 관리하고 싶은 state
const initialDialogAttr = {
	type: DialLogState.ALERT,
	text: '',
	isOpen: false,
	onConfirm: () => {},
	onCancel: () => {},
	position: {
		x: 50,
		y: 10,
	},
}

export const MOVE_TO_PAGE_DIALOG = createAction('move_to_page')
export const DEFAULT_DIALOG = createAction('default')
export const CLOSE_DIALOG = createAction('close')

const dialogReducer = (state, action) => {
	// action은 dispatch를 통해 전달받은 객체
	switch (action.type) {
		case 'default':
			return {
				...state,
				type: DialLogState.ALERT,
				isOpen: true,
				...action.payload,
			}
		case 'move_to_page':
			return {
				...state,
				isOpen: true,
				type: DialLogState.ALERT, // default
				text: '페이지를 이동합니다.',
				onConfirm: () => (window.location.href = `${action.payload.url}`),
				...action.payload,
			}
		case 'close':
			return { ...state, isOpen: false }
		default:
			return { ...state }
	}
}

export const useDiaLogStore = () => useContext(DiaLogContext)

const DiaLogProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dialogReducer, initialDialogAttr)

	return (
		<DiaLogContext.Provider value={{ state, dispatch }}>
			{children}
		</DiaLogContext.Provider>
	)
}
export default DiaLogProvider
