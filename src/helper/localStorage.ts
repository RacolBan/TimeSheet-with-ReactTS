const getAccessToken = localStorage.getItem('token');
const setAccessTokenToLocal = (value: string): void => {
  localStorage.setItem('token', value);
};
const removeAccessToken = (): void => {
  localStorage.removeItem('token');
};

export { setAccessTokenToLocal, getAccessToken, removeAccessToken };
