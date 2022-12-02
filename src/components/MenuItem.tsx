import React, { ReactNode } from 'react';
interface Props {
  icon: ReactNode
  title: string
}
export default function MenuItem ({ icon, title }: Props): JSX.Element {
  return (
    <div className='togetherAction'>
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}
