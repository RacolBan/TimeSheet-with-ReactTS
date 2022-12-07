import { ReloadOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { useAppDispatch } from '../../../hooks/useToast';
import { getAllProject } from '../../../redux/project/thunks';
interface Props {
  title: string
}

const HeaderContent: React.FC <Props> = (props) => {
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    void dispatch(getAllProject({ status: '0', search: null }));
  };
  return (
    <div className='headerContent'>
      <div className='headerContent-title'>{ props.title }</div>
      <div className='headerContent-icon'>
        <span onClick={handleClick}><ReloadOutlined /></span>
      </div>
    </div>
  );
};
export default memo(HeaderContent);
