import React from 'react';
import { Link } from 'react-router-dom';
interface Props {
  icon: React.ReactNode | null
  title: string
  to: string
}
export default function SLink ({ icon, title, to }: Props): JSX.Element {
  return (
    <Link to={to} className='sidebar-link-project' >
      <span className='sidebar-link-project-empty'></span>
      <span className='sidebar-link-project-icon'>{ icon }</span>
      <span className='sidebar-link-project-text'>{ title }</span>
    </Link>
  );
}
