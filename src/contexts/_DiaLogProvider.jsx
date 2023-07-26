import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Dialog from '../components/Dialog'

export const DialLogState = {
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
}

const DiaLogContext = createContext()

export const useDiaLogStore = () => useContext(DiaLogContext)
const DiaLogProvider = ({ children }) => {
	const diaLogRef = useRef()
	const [diaLogAttribute, setDiaLogAttribute] = useState({
		type: DialLogState.ALERT,
		text: '',
		isOpen: false,
		onConfirm: () => {},
		onCancel: () => {},
		position: {
			x: 50,
			y: 10,
		},
	})

	// dialog를 열거나 닫기 위한 함수
	useEffect(() => {
		if (diaLogAttribute.isOpen) return diaLogRef.current.showModal()
		diaLogRef.current.close()
	}, [diaLogAttribute.isOpen])

	// dialog 속성들의 이전 상태를 유지하면서 새로운 값 설정
	const setKeepPrevDialogAttribute = async args => {
		setDiaLogAttribute(prev => ({
			...prev,
			...args,
		}))
	}

	// dialog를 닫기 위한 함수
	const onCloseDiaLog = () => {
		setDiaLogAttribute(prev => ({
			...prev,
			isOpen: false,
		}))
	}

	return (
		<DiaLogContext.Provider
			value={[diaLogAttribute, setKeepPrevDialogAttribute]}
		>
			{children}
			<Dialog
				{...{ ...diaLogAttribute }}
				ref={diaLogRef}
				onClose={onCloseDiaLog}
			/>
		</DiaLogContext.Provider>
	)
}
export default DiaLogProvider
