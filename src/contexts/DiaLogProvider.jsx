import { createContext, useContext, useReducer, useState } from 'react'

export const DialLogState = {
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
}

const DiaLogContext = createContext()

const initialState = {
	type: '',
	text: '',
	position: { x: 50, y: 10 },
}

// case: alert, confirm
// confirm에서 action.payload: confirm/cancle
const DiaLogReducer = (state, action) => {
	switch (action.type) {
		case DialLogState.ALERT:
			return { ...state, ...action.payload }
		// case DialLogState.CONFIRM:
		//   return { ...state, ...action.payload };
		default:
			return state
	}
}

export const useDiaLogStore = () => useContext(DiaLogContext)

const DiaLogProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [state, dispatch] = useReducer(DiaLogReducer, initialState)

	const OpenDialog = () => {
		setIsOpen(true)
	}

	const CloseDialog = () => {
		setIsOpen(false)
	}

	return (
		<DiaLogContext.Provider
			value={{ state, dispatch, isOpen, OpenDialog, CloseDialog }}
		>
			{children}
		</DiaLogContext.Provider>
	)
}
export default DiaLogProvider
