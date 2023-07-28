import {
	CLOSE_DIALOG,
	DEFAULT_DIALOG,
	MOVE_TO_PAGE_DIALOG,
	useDiaLogStore,
} from '../contexts/DiaLogProvider'

const useDialog = () => {
	const { dispatch, setIsOpen } = useDiaLogStore()

	const onClose = () => setIsOpen(false)

	return {
		default: attr => {
			setIsOpen(true)
			dispatch(
				DEFAULT_DIALOG({
					onClose: () => onClose(),
					onCancel: () => onClose(),
					...attr,
				}),
			)
		},
		moveTo: attr => {
			setIsOpen(true)
			dispatch(
				MOVE_TO_PAGE_DIALOG({
					onClose: () => onClose(),
					onCancel: () => onClose(),
					...attr,
				}),
			)
		},
		close: () => onClose(),
	}
}

export default useDialog
