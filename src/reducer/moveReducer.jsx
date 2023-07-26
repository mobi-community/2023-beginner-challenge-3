export const list = {
    type: DialLogState.ALERT,
    text: "",
    isOpen: false,
    onConfirm: () => {},
    onCancel: () => {},
    position: {
      x: 50,
      y: 10,
    },
}

export function moveReducer(list, action) {
    switch (action.type) {
        case 'FIRST_MOVE' : {
            return {
                ...list,
                type: action.payload.type,
                text: "정말로 페이지를 이동하겠습니까",
                isOpen: true,
                onConfirm: async() => {
                    window.location.href = `/post-detail/${action.payload.postId}`;
                }
            }
        };

        case 'SECOND_MOVE' :{
            return {
                ...list,
                text: "정말로 이동하겠습니다!",
                isOpen: true,
                onConfirm: async() => {
                    window.location.href = `/post-detail/${action.payload.postId}`;
                }
            }
        }
    }
}
