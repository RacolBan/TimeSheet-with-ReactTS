import { EditFilled, EyeOutlined, ScissorOutlined, SwapOutlined } from '@ant-design/icons';
import React from 'react';
import MenuItem from '../../../components/MenuItem';
interface Props {
  handleOpenModalEdit: () => void
  handleOpenView: () => void
  handleOpenDialog: (a: number) => void
  status: number
}
export default function MenuAction ({ handleOpenModalEdit, handleOpenView, handleOpenDialog, status }: Props): JSX.Element {
  return (
    <div className='action-background'>
      <div onClick={handleOpenModalEdit}>
        <MenuItem title='Edit' icon={<EditFilled />} />
      </div>
      <div onClick={handleOpenView}>
        <MenuItem title='View' icon={<EyeOutlined />} />
      </div>
      <div onClick={() => handleOpenDialog(0)}>
        <MenuItem title={status === 0 ? 'DeActive' : 'Active'} icon={<SwapOutlined /> } />
      </div>
      <div onClick={() => handleOpenDialog(1)}>
        <MenuItem title='Delete' icon={<ScissorOutlined />} />
      </div>
    </div>
  );
}
