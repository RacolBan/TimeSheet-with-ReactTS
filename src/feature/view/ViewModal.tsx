import React, { useState, useEffect, memo } from 'react';
import moment from 'moment';
import { EFilterTime } from '../../redux/project/enum.user';
import { getTimeSheetStatisticTasksThunk, getTimeSheetStatisticTeamsThunk } from '../../redux/project/thunks';
import { useAppDispatch } from '../../hooks/useToast';
import ViewProjectHeader from './components/ViewProjectHeader';
import { useSelector } from 'react-redux';
import { getViewProject } from '../../redux/project/selector';
import { Modal } from 'antd';
import { closeViewProject } from '../../redux/project/slice';
import ViewProjectTab from './components/viewTab/ViewProjectTabs';
import ViewCustomTimeModal from './components/ViewCustomTimeModal';
function ViewModal (): JSX.Element {
  const handleCloseView = (): void => {
    dispatch(closeViewProject());
  };
  const [isOpen, setIsOpen] = useState(false);
  const viewProject = useSelector(getViewProject);
  const [timeFilter, setTimeFilter] = useState<EFilterTime>(EFilterTime.Week);
  const now = moment().format('YYYY-MM-DD');
  const [startTime, setStartTime] = useState<moment.Moment | null>(
    moment(now).isoWeekday(1)
  );
  const [endTime, setEndTime] = useState<moment.Moment | null>(
    moment(now).isoWeekday(7)
  );
  const customDate = (time: number): number => (time > 9 ? time : Number(`0${time}`));
  const customStartTime = (): string | undefined => {
    if ((startTime != null) && (endTime != null)) {
      return `${customDate(startTime.date())}${
          startTime.month() !== endTime.month() ||
          startTime.year() !== endTime.year()
            ? ` ${startTime.format('MMMM').substring(0, 3) ?? customDate(startTime.month() + 1)}`
            : ''
        }${startTime.year() !== endTime.year() ? ` ${startTime.year()}` : ''}`;
    }
  };
  const customEndTime = (): string | undefined => {
    if ((startTime != null) && (endTime != null)) {
      return `${customDate(endTime.date())} ${startTime.format('MMMM').substring(0, 3) ?? customDate(endTime.month() + 1)} ${endTime.year()}`;
    }
  };
  const handleChangeTimeFilter = (value: EFilterTime): void => {
    setTimeFilter(value);
    switch (value) {
      case EFilterTime.Week:
        setStartTime(moment(now).isoWeekday(1));
        setEndTime(moment(now).isoWeekday(7));
        break;
      case EFilterTime.Month:
        setStartTime(moment(now).startOf('month'));
        setEndTime(moment(now).endOf('month'));
        break;
      case EFilterTime.Quarter:
        setStartTime(moment(now).startOf('quarter'));
        setEndTime(moment(now).endOf('quarter'));
        break;
      case EFilterTime.Year:
        setStartTime(moment(now).startOf('year'));
        setEndTime(moment(now).endOf('year'));
        break;
      case EFilterTime.All:
        setStartTime(null);
        setEndTime(null);
        break;
      case EFilterTime.Custom:
        setStartTime(null);
        setEndTime(null);
        setIsOpen(true);
        break;
    }
  };
  const onBackTime = (): void => {
    if (timeFilter === EFilterTime.Week) {
      setEndTime(moment(endTime).subtract(7, 'days'));
      setStartTime(moment(startTime).subtract(7, 'days'));
    } else if (timeFilter === EFilterTime.Month) {
      setStartTime(moment(startTime).subtract(1, 'months').startOf('month'));
      setEndTime(moment(endTime).subtract(1, 'months').endOf('month'));
    } else if (timeFilter === EFilterTime.Quarter) {
      setStartTime(moment(startTime).subtract(1, 'quarters').startOf('month'));
      setEndTime(moment(endTime).subtract(1, 'quarters').endOf('month'));
    } else if (timeFilter === EFilterTime.Year) {
      setStartTime(moment(startTime).subtract(1, 'years'));
      setEndTime(moment(endTime).subtract(1, 'years'));
    }
  };
  const onNextTime = (): void => {
    if (timeFilter === EFilterTime.Week) {
      setEndTime(moment(endTime).add(7, 'days'));
      setStartTime(moment(startTime).add(7, 'days'));
    } else if (timeFilter === EFilterTime.Month) {
      setStartTime(moment(startTime).add(1, 'months').startOf('month'));
      setEndTime(moment(endTime).add(1, 'months').endOf('month'));
    } else if (timeFilter === EFilterTime.Quarter) {
      setStartTime(moment(startTime).add(1, 'quarters').startOf('month'));
      setEndTime(moment(endTime).add(1, 'quarters').endOf('month'));
    } else if (timeFilter === EFilterTime.Year) {
      setStartTime(moment(startTime).add(1, 'years'));
      setEndTime(moment(endTime).add(1, 'years'));
    }
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ((startTime != null) && (endTime != null)) {
      const project = {
        id: `${viewProject.id}`,
        start: startTime.format('YYYY-MM-DD'),
        end: endTime.format('YYYY-MM-DD')
      };
      void dispatch(getTimeSheetStatisticTasksThunk(project));
      void dispatch(getTimeSheetStatisticTeamsThunk(project));
    } else {
      const project = {
        id: `${viewProject.id}`,
        start: '',
        end: ''
      };
      void dispatch(getTimeSheetStatisticTasksThunk(project));
      void dispatch(getTimeSheetStatisticTeamsThunk(project));
    }
  }, [dispatch, endTime, startTime, viewProject.id]);
  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  const handleSave = (start: Date, end: Date): void => {
    handleCloseModal();
    setStartTime(moment(start));
    setEndTime(moment(end));
  };
  return (
    <Modal className='view' onCancel={handleCloseView} open={viewProject.isView} width='100%' footer={[]}>
      <ViewProjectHeader
        onBackTime={onBackTime}
        onNextTime={onNextTime}
        startTime={startTime}
        endTime={endTime}
        customStartTime={customStartTime}
        customEndTime={customEndTime}
        timeFilter={timeFilter}
        handleChangeTimeFilter={handleChangeTimeFilter}
      />
      <ViewCustomTimeModal isOpen={isOpen} handleClose={handleCloseModal} handleSave={handleSave} />
      <ViewProjectTab />
    </Modal>
  );
}
export default memo(ViewModal);
