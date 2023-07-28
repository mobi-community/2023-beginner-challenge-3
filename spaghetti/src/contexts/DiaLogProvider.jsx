import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import Dialog from '../components/Dialog';

export const DialLogState = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  DOUBLE_CHECK: 'DOUBLE_CHECK',
  CLOSE: 'CLOSE',
};

const initialState = {
  type: '',
  text: '',
  isOpne: false,
  onConfirm: () => {},
  onCancel: () => {},
  position: {
    x: 50,
    y: 10,
  },
};

const DiaLogContext = createContext();

export const useDiaLogStore = () => useContext(DiaLogContext);

const dialogReducer = (state, action) => {
  switch (action.type) {
    case 'ALERT':
      return { ...state, ...action.payload };
    case 'CONFIRM':
      return { ...state, ...action, ...action.payload };
    case 'DOUBLE_CHECK':
      return { ...state, ...action, ...action.payload };
    case 'CLOSE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const DiaLogProvider = ({ children }) => {
  const [dialogAttribute, dispatch] = useReducer(dialogReducer, initialState);
  const diaLogRef = useRef();

  useEffect(() => {
    if (dialogAttribute.isOpen) return diaLogRef.current.showModal();
    diaLogRef.current.close();
  }, [dialogAttribute.isOpen]);

  const onCloseDiaLog = () => {
    dispatch({
      type: DialLogState.CLOSE,
    });
  };

  return (
    <DiaLogContext.Provider value={[dialogAttribute, dispatch]}>
      {children}
      <Dialog {...dialogAttribute} ref={diaLogRef} onClose={onCloseDiaLog} />
    </DiaLogContext.Provider>
  );
};
export default DiaLogProvider;
