/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';
import { EFilterTime } from '../../../redux/project/enum.user';
interface Props {
  onBackTime: () => void
  onNextTime: () => void
  timeFilter: EFilterTime
  startTime: moment.Moment | null
  endTime: moment.Moment | null
  customStartTime: () => void
  customEndTime: () => void
  handleChangeTimeFilter: (value: EFilterTime) => void
}
export default function ViewProjectHeader (props: Props): JSX.Element {
  const { onBackTime, onNextTime, timeFilter, startTime, endTime, customEndTime, customStartTime, handleChangeTimeFilter } = props;
  return (
    <div className='viewHeader'>
      <div className='viewHeader-icon' onClick={() => onBackTime()}>
        <CaretLeftOutlined />
      </div>
      <div className='viewHeader-icon' onClick={() => onNextTime()}>
        <CaretRightOutlined />
      </div>
      <div>
        <span className="time-range">
          {
            `${timeFilter}${
            (startTime != null) && (endTime != null)
              ? `: ${customStartTime()}  -  ${customEndTime()}`
              : ''
            }`
          }
        </span>
      </div>
      <div className='viewHeader-select'>
      <Select style={{ width: '12em' }} value={timeFilter} onChange={(e) => handleChangeTimeFilter(e as EFilterTime)} >
                  <Select.Option value={EFilterTime.Week} >Week</Select.Option>
                  <Select.Option value={EFilterTime.Month} > Month</Select.Option>
                  <Select.Option value={EFilterTime.Quarter} >Quarter</Select.Option>
                  <Select.Option value={EFilterTime.Year} >Year</Select.Option>
                  <Select.Option value={EFilterTime.All} >All Time</Select.Option>
                  <Select.Option value={EFilterTime.Custom} >Custom Time</Select.Option>
                </Select>

      </div>
    </div>
  );
}
