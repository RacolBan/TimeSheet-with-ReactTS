const setAccessTokenToLocal = async (value: string): Promise<void> => {
  localStorage.setItem('token', value);
};
const getAccessToken = localStorage.getItem('token');
const removeAccessToken = (): void => {
  localStorage.removeItem('token');
};

export { setAccessTokenToLocal, getAccessToken, removeAccessToken };
