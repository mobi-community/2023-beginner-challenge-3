import { createContext, useContext, useEffect, useRef, useReducer } from "react";
import Dialog from "../components/Dialog";
import listReducer from "../reducer/moveReducer";

const initialState = {
  type: "",
  text: "",
  isOpen: false,
  onConfirm: () => {},
  onCancel: () => {},
  position: {
    x: 50,
    y: 10
  }
}

const DiaLogContext = createContext();

export const useDiaLogStore = () => useContext(DiaLogContext);

const DiaLogProvider = ({ children }) => {
  const diaLogRef = useRef();
  const [diaLogAttribute, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    if (diaLogAttribute.isOpen) return diaLogRef.current.showModal();
    diaLogRef.current.close();
  }, [diaLogAttribute.isOpen]);

  const setKeepPrevDialogAttribute = async (args) => {
    dispatch({type: 'keepPrevDialogAttribute', payload: args} )
  };

  return (
    <DiaLogContext.Provider
      value={{diaLogAttribute, setKeepPrevDialogAttribute, dispatch}}
    >
      {children}
      <Dialog
        ref={diaLogRef}
      />
    </DiaLogContext.Provider>
  );
};
export default DiaLogProvider;
