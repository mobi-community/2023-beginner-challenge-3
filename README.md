### 주제
```
커스텀 훅을 활용한 느슨한 관계 만들기
재사용 가능하고, 복잡한 상태의 변화를 useReducer로 관리하기
전역 상태 관리를 통한 프롭스 드릴링 해결 및 관심사 분리
```

### 기간
```
7/24 ~ 7/28
```

### 내용
```
스파게티 코드를 리펙터링 해보자
- props drilling 해소하기
- 재사용 가능한 컴포넌트 만들기
- 의존성 주을 통한 느슨한 관계 만들기
```
---
### 🍝 스파게티 코드 수정 내역
**1. Custom Hook**

    - api call하는 fetch 함수 생성
    - 댓글 보기 / 숨기기 버튼에 재사용 가능한 토글 생성 

**2. props drilling**

    - Dialog props drilling을 전역 상태 관리를 통해 해소

**3. UseReducer & Context 전역 상태 관리**

    - useReducer를 사용하여 dialog 알림창 state를 재사용 가능하게 하고 state update 로직을 분리함으로써 가독성을 높임.
    - useContext를 통해 reducer의 dispatch를 어느 컴포넌트에서든 사용할 수 있도록 전역 상태 관리해줌.

**4. 관심사 분리**

    - axios call 요청 로직 관심사 분리를 통하여 유지/보수 편의성과 코드 가독성을 높임.
