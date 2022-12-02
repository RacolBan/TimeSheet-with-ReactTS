import React from 'react';
import { Typography, Select, Avatar } from 'antd';
import { CloseOutlined, LeftOutlined } from '@ant-design/icons';
import { IUser } from '../../../../redux/project/interface';
import { ELevelUser, EMemberType, ETypeUser } from '../../../../redux/project/enum.user';
import { useAppDispatch } from '../../../../hooks/useToast';
import { changeMemberTypeUser, deSelectMember, selectMember } from '../../../../redux/project/slice';
import pic from '../../../../assets/images/65456755_2923791054304486_4424165637455085568_n.jpg';
interface Props {
  member: IUser
  type: number
}

export default function MemberItem ({ member, type }: Props): JSX.Element {
  const memberLevel = (
    <Typography.Text>
      {member.level === ELevelUser.Intern0
        ? 'Intern'
        : member.level === ELevelUser.Intern1
          ? 'Intern'
          : member.level === ELevelUser.Intern2
            ? 'Intern'
            : member.level === ELevelUser.Prefresher
              ? 'Prefresher'
              : member.level === ELevelUser.Fresher0
                ? 'Fresher'
                : member.level === ELevelUser.Fresher1
                  ? 'Fresher'
                  : member.level === ELevelUser.Fresher2
                    ? 'Fresher'
                    : member.level === ELevelUser.Junior0
                      ? 'Junior'
                      : member.level === ELevelUser.Junior1
                        ? 'Junior'
                        : member.level === ELevelUser.Junior2
                          ? 'Junior'
                          : member.level === ELevelUser.Middle0
                            ? 'Middle'
                            : member.level === ELevelUser.Middle1
                              ? 'Middle'
                              : member.level === ELevelUser.Middle2
                                ? 'Middle'
                                : member.level === ELevelUser.Senior0
                                  ? 'Senior'
                                  : member.level === ELevelUser.Senior1
                                    ? 'Senior'
                                    : 'Senior'
      }
    </Typography.Text>
  );
  const memberType = (
    <Typography.Text>
      { member.type === ETypeUser.Staff
        ? 'Staff'
        : member.type === ETypeUser.InternShip
          ? 'InterShip'
          : 'Collaborator'
      }
    </Typography.Text>
  );
  const dispatch = useAppDispatch();
  const handleClickDeSelect = (): void => {
    dispatch(deSelectMember(member));
  };
  const handleClickSelect = (): void => {
    dispatch(selectMember(member));
  };
  const handleChangeTypeUser = (value: number): void => {
    dispatch(changeMemberTypeUser({ id: member.id, memberType: value }));
  };
  return (
    <div>
      {type === 0
        ? <div className='member-unselected'>
              <div className='icon' >
                <span onClick={handleClickDeSelect} ><CloseOutlined /></span>
              </div>
              <div className='avatar'>
                <Avatar size='small' src={pic}>{(member.avatarPath != null) ? '' : member.name?.charAt(0)?.toUpperCase()}</Avatar>
              </div>
              <div className='infor' >
                <div className='infor-member'>
                  <h3 className='infor-member-h3'>{member.name}</h3>
                  <h4 className='infor-member-h4-type'>{memberType}</h4>
                  <h4 className='infor-member-h4-level'>{memberLevel}</h4>
                </div>
                <div className='infor-email'>
                  <h4 className='infor-email-h4'>{member.emailAddress}</h4>
                </div>
            </div>
              <div
                  style={{
                    position: 'relative',
                    bottom: '-41px',
                    right: '41px'
                  }}
                  className='select'
                  >
                <Select style={{ width: '12em' }} value={member.memberType} onChange={handleChangeTypeUser} >
                  <Select.Option value={EMemberType.Member} >Member</Select.Option>
                  <Select.Option value={EMemberType.ProjectManager} >Project Manager</Select.Option>
                  <Select.Option value={EMemberType.Shadow} >Shadow</Select.Option>
                  <Select.Option value={EMemberType.DeActive} >DeActive</Select.Option>
                </Select>
            </div>
          </div>
        : <div className='member-unselected'>
            <div className='icon'>
              <span onClick={handleClickSelect} ><LeftOutlined /></span>
            </div>
            <div className='avatar' >
              <Avatar size='small' src={pic}>{(member.avatarPath != null) ? '' : member.name?.charAt(0)?.toUpperCase()}</Avatar>
            </div>
            <div className='infor' >
              <div className='infor-member'>
                <h3 className='infor-member-h3'>{member.name}</h3>
                <h4 className='infor-member-h4-type'>{memberType}</h4>
                <h4 className='infor-member-h4-level'>{memberLevel}</h4>
              </div>
              <div className='infor-email'>
                <h4 className='infor-email-h4'>{member.emailAddress}</h4>
              </div>
            </div>
          </div>
      }
    </div>
  );
}
