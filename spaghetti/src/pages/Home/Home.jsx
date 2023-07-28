import { useEffect, useState } from 'react';
import { DialLogState, useDiaLogStore } from '../../contexts/DialogProvider';
import WeatherInfo from './components/WeatherInfo';
import EnterName from './components/EnterName';

const HomePage = () => {
  const [isBackGroundBlur, setIsBackGroundBlur] = useState(true);
  const [_, dispatch] = useDiaLogStore();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      return setIsBackGroundBlur(true);
    } else setIsBackGroundBlur(false);
  }, []);

  const onPressNavigateBlog = () => {
    dispatch({
      type: DialLogState.ALERT,
      payload: {
        text: '정말로 페이지를 이동하겠습니까',
        isOpen: true,
        onConfirm: async () => {
          await dispatch({ type: DialLogState.CLOSE });
          window.location.href = '/posts';
        },
      },
    });
  };

  return (
    <>
      {isBackGroundBlur && (
        <EnterName setIsBackGroundBlur={setIsBackGroundBlur} />
      )}
      <div>
        <h1>Home Page</h1>
        <WeatherInfo />
        <button onClick={onPressNavigateBlog}>블로그 보러가기</button>
      </div>
    </>
  );
};
export default HomePage;
