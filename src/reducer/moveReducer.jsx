export const DialLogState = {
    ALERT: "ALERT",
    CONFIRM: "CONFIRM",
  };
  
export default function listReducer(state, action) {
    switch (action.type) {
        case 'ALERT' : {
            const modal = {
                ...state,
                type: DialLogState.ALERT,
                text: action.payload.text,
                isOpen: true 
            };

            modal.onConfirm = async () => {
                modal.isOpen = false;
                window.location.href = action.payload.urlEndPoint;
            }
            return modal;
        };

        case 'CONFIRM' : {
            const modal = {
                ...state,
                type: DialLogState.CONFIRM,
                text: action.payload.text,
                isOpen: true, 
                onConfirm: action.payload.confirm
            };
            if(action.payload.state) {modal.onConfirm = action.payload.confirm;}
            modal.onCancel = async () => {
                if(action.payload.state) {modal.isOpen = false};
            }
            if(action.payload.state2) {
                modal.onConfirm = async () => {
                    window.location.href = action.payload.urlEndPoint;
                }    
            }
            return modal;
        }

        case 'keepPrevDialogAttribute' : {
            return {
                ...state,
                ...action.payload,
            }
        };

        case 'onCloseDialog' : {
            return {
                ...state,
                isOpen: false,
            }
        };
        
        default:
            return state;

    }
}

