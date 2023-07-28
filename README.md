# 🍝 스파게티 코드를 리펙터링 해보자!

## 주제

```
커스텀 훅을 활용한 느슨한 관계 만들기
재사용 가능하고, 복잡한 상태의 변화를 useReducer로 관리하기
전역 상태 관리를 통한 프롭스 드릴링 해결 및 관심사 분리
```

## 기간

```
7/24 ~ 7/28
```

## 내용

```
- props drilling 해소하기
- 재사용 가능한 컴포넌트 만들기
- 의존성 주입을 통한 느슨한 관계 만들기
```

## 팀원

|                                      Jane                                       |                                      Woony                                      |
| :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/123251211?v=4" width="80px"/> | <img src="https://avatars.githubusercontent.com/u/112946860?v=4" width="80px"/> |

## 구현 사항

### Custom Hook, 의존성 주입을 통해 느슨한 관계 만들기

1. useFetch

   ```
   컴포넌트 안에서 길어지는 try-catch문을 관심사 분리하기 위해 그리고 앞으로도 작성하게 될 fetching 부분들을 간편하게 사용하기 위해 hook함수를 정의했습니다.

   덕분에 fetch data의 상태를 쉽게 관리할 수 있었고, 길어지는 try-catch문을 분리할 수 있었습니다.
   ```

2. useToggle

   ```
   중복되는 코드가 있어 리팩토링 해주었습니다. 또한 프로젝트를 진행한다고 했을 때 onClick 했을 시 open/close를 제어할 일이 많을 수 있다고 생각들어 useToggle() 이라는 훅 함수를 만들어서 주입해 주었습니다.
   ```

3. useDialog

   ```
   로직에 큰 변화는 없지만 보다 간편하게 사용될 수 있다고 생각이 들어 도입을 결정했습니다. 기존에는 dispatch를 통해 상태 업데이트를 하기위해서는 아래와 같이 작성해주어야 했습니다.
   ```

   ```js
   dispatch(MOVE_TO_DIALOG({ url: '/posts' }))
   ```

   ```
   useDialog에서는 위 로직을 이미 담고 있어 사용할 때는 보다 편하게 사용할 수 있었습니다.
   ```

   ```js
   const dialog = useDialog()

   dialog.moveTo({ url: '/posts' })
   ```

### 재사용 가능하고, 복잡한 상태의 변화를 useReducer로 관리하기

0. useState와 useReducer

   ```
   두 hook 모두 상태를 관리한다는 점에서는 공통점을 가집니다.

   다만, 복잡한 state를 다뤄야할 때 useReducer를 사용하면 코드를 좀 더 간결하고 유지보수하기 쉽습니다.

   왜냐하면, useReducer를 사용하게 되었을 때, Reducer는 dispatch를 통해 action을 전달받고, 해당 **내용에 따라 상태를 업데이트**합니다. 이때 action의 내용에 따라 **Reducer가 state 업데이트를 처리**해주기 때문에 상태 업데이트가 필요할 때 **복잡한 상태 업데이트 로직을 직접 작성해 주지 않아도** 됩니다.

   따라서 useReducer는 상태를 업데이트하는 로직을 컴포넌트로부터 분리할 수 있어, **상태 관리가 용이**해지고 **재사용성이 증가**된다는 장점이 있습니다.

   보통의 경우 useState를 사용해도 좋지만, 상태와 업데이트 로직이 길어진다면 점진적으로 useReducer를 고려해 보아도 좋다고 합니다. 단순하게 시작하고 필요한 경우에 추가를 하는 것이 좋겠습니다.
   ```

1. useReducer 도입

   ```
   기존에는 provider의 value로 포함되어 있던 setState를 통해 dialog의 상태를 관리했습니다. 때문에 복잡한 dialog의 상태를 업데이트하기 위해서 복잡한 코드를 작성해야 했습니다.
   ```

   dialog

   ```js
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
   ```

   ```
   이를 원하는대로 업데이트하고 싶다면 아래와 같이 set함수를 사용해야 했습니다.
   ```

   ```js
   setDiaLogAttribute({
   	type: DialLogState.ALERT,
   	text: '정말로 페이지를 이동하겠습니까',
   	isOpen: true,
   	onConfirm: async () => {
   		await setDiaLogAttribute({ isOpen: false })
   		window.location.href = '/posts'
   	},
   })
   ```

   ```
   위와 같이 복잡하게 상태 업데이트하는 로직을 보완하기 위해 `useReducer`를 도입했습니다.

   제가 useReducer를 사용한 이유는 위 코드에서 보이는 복잡한 상태 업데이트 로직을 컴포넌트로부터 분리하고 로직 자체를 재사용하기 위함이였습니다.

   대표적으로 `moveTo`를 통해 url만을 payload로 받아 dialog의 확인 버튼을 누르면 이동할 수 있도록 reducer의 case를 하나 작성했습니다.
   ```

### 전역 상태 관리를 통한 Props Drilling 해결 및 관심사 분리

1. Props Drilling 해결

   ```
   { type, text, onConfirm, onCancel, onClose, position }, ref를 모두 props로 전달하고, 이를 다시 Dialog의 props로 전달하게 되어 props drilling 문제가 발생했습니다.
   이를 해결하기 위해 Dialog 컴포넌트 내부에서 useDialogStore 전역 상태를 활용하여 불필요한 Props Drilling을 없앴습니다.
   ```

   ```
   React.forwardRef를 통해 상위 컴포넌트에서 직접 DOM 조작을 수행하는 구조였는데,
   이는 가상 DOM을 사용하여 불필요한 렌더링을 막는 React 장점에 맞지 않는 구현 방식이라는 생각이 들었습니다.
   Dialog를 forwardRef를 사용하지 않는 일반 컴포넌트로 수정하여 DOM에 직접 접근하지 않고 컴포넌트를 렌더링할 수 있도록 하였습니다.
   ```

2. isOpen 상태 분리

   ```
   Dialog의 렌더링 여부를 결정하는 isOpen이 Dialog 관련 비즈니스 로직과 섞여있어
   Dialog를 닫기만 할 때에도 전체 상태를 수정해야 하는 점이 비효율적이라고 생각했습니다.
   이를 위해 isOpen을 별도의 state로 관리할 수 있도록 수정하였습니다.
   ```

### 재사용 가능한 컴포넌트 만들기

1. 이름 입력하는 form 컴포넌트 분리

   ```
   Home.jsx에는 isBackGroundBlur의 값에 따라 다른 컴포넌트를 보여줍니다. 색깔이 다른 로직이라는 생각이 들어 구분하여 빠르게 관련된 이벤트 함수까지 파악할 수 있도록 분리했습니다.

   isBackGroundBlur가 true일 때는 onSubmit만 사용되고, false일 때는 onPressNavigateBlog만 사용되어 구분해두면 각 컴포넌트에서 사용되는 이벤트 함수임을 빠르고 정확하게 파악할 수 있을 것이라고 생각했습니다.
   ```

2. 댓글 목록 컴포넌트 분리

   ```
   댓글 목록은 버튼이 눌렸을 때만 렌더링되는 요소이므로 Post.Detail 컴포넌트와는 분리하여 자식 컴포넌트로 만들어주었습니다.

   그리고 버튼은 isOpenCommentList boolean 값에 따라 텍스트만 바뀌므로 리팩터링을 해주었습니다.
   ```

3. 페이지네이션 컴포넌트 분리

   ```
   게시글 목록에 사용되는 페이지네이션과, 댓글 목록에 사용되는 페이지네이션은
   API CALL에 사용되는 endpoint만 다를 뿐 동일한 코드를 사용하는 컴포넌트였습니다.
   하여, 불필요한 파일을 줄이고 페이지네이션이 재사용 가능한 공용 컴포넌트가 되도록 코드를 수정하였습니다.
   ```
