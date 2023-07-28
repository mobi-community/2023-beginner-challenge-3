import { createContext, useContext, useReducer, useState } from 'react'
import { createAction } from '../utils/createAction'

export const DialLogState = {
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
}

const DiaLogContext = createContext()

const initialDialogAttr = {
	type: DialLogState.ALERT,
	text: '',
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
	switch (action.type) {
		case 'default':
			return {
				...state,
				type: DialLogState.ALERT,
				...action.payload,
			}
		case 'move_to_page':
			return {
				...state,
				type: DialLogState.ALERT, // default
				text: '페이지를 이동합니다.',
				onConfirm: () => (window.location.href = `${action.payload.url}`),
				...action.payload,
			}
		default:
			return { ...state }
	}
}

export const useDiaLogStore = () => useContext(DiaLogContext)

const DiaLogProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [state, dispatch] = useReducer(dialogReducer, initialDialogAttr)

	return (
		<DiaLogContext.Provider value={{ state, dispatch, isOpen, setIsOpen }}>
			{children}
		</DiaLogContext.Provider>
	)
}
export default DiaLogProvider
