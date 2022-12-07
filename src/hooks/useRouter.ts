import { useNavigate } from 'react-router-dom';
function useRouter (): any {
  const navigate = useNavigate();
  const pushQuery = (query: any): void => {
    const newQuery = new URLSearchParams(query).toString();
    navigate(`?${newQuery}`);
  };
  return { pushQuery };
}
export default useRouter;
