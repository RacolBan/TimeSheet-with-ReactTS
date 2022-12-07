import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IAuthReducer } from '../redux/auth/interface';
interface Props {
  path: string
  element: JSX.Element
}
export default function Redirect ({ path, element }: Props): JSX.Element {
  const token = useSelector((state: IAuthReducer) => state.authReducer.accessToken) ?? '';
  if (path === '/App') {
    if (token.length > 0) {
      return <Navigate to={{ pathname: path }} />;
    } else {
      return element;
    }
  } else {
    if (token.length > 0) {
      return element;
    } else {
      return <Navigate to={{ pathname: path }} />;
    }
  }
}
