const CheckLogin = () => {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    alert('로그인이 필요합니다');
    return (window.location.href = '/');
  }
};

export default CheckLogin;
