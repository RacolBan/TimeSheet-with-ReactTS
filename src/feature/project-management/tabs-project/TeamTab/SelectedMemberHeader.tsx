/* eslint-disable no-void */
import React, { useCallback } from 'react';
import { Checkbox, Col, Input, Row, Typography } from 'antd';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../hooks/useToast';
import { changeIsShowDeactive, changeSearchSelectedMember } from '../../../../redux/project/slice';
import { debounce } from 'lodash';
interface Props {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
  checked: boolean
}
export default function SelectedMemberHeader ({ setChecked, checked }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const debounceSearch = useCallback(debounce(e => dispatch(changeSearchSelectedMember(e.target.value)), 300), []);
  return (
    <>
      <Row >
        <Col span={20}>
          <Typography.Title level={4}>Team</Typography.Title>
        </Col>
        <Col span={2} offset={2}>
          <span><CaretDownOutlined /></span>
        </Col>
      </Row>
      <Row style={{ margin: '10px 0 8px' }}>
        <Col span={8}>
          <Checkbox
            checked={checked}
            onChange={event => {
              dispatch(changeIsShowDeactive(event.target.checked));
              setChecked(event.target.checked);
            }}
          >Show deactive member</Checkbox>
        </Col>
        <Col offset={2}>
          <Input type='search' prefix={<SearchOutlined />} placeholder='search by name' onChange={e => debounceSearch(e)} />
        </Col>
      </Row>
    </>
  );
}
