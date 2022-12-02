import { Checkbox, Col, Row, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
export default function NotiTab (): JSX.Element {
  const { setValue } = useFormContext();
  const [checked, setChecked] = useState({
    checkbox: false,
    input: ''
  });
  useEffect(() => {
    setValue('isNotifyToKomu', checked.checkbox);
    setValue('komuChannelId', checked.input);
  }, [checked]);
  return (
    <>
      <Row>
        <Col>
          <Checkbox checked={checked.checkbox} onChange={(e) => {
            setChecked({
              ...checked, checkbox: e.target.checked
            });
          }} >Gửi thông báo đến Komu</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={24} className='input-noti'>
          <Input disabled={!checked.checkbox} value={checked.input} onChange={(e) => setChecked({ ...checked, input: e.target.value })} placeholder='Komu channel ID' />
        </Col>
      </Row>
    </>
  );
}
