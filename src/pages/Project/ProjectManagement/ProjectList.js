import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag, Avatar, Popconfirm, Popover, AutoComplete } from 'antd';
import { NavLink } from 'react-router-dom';
import { FormOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_MEMBER_TO_PROJECT_SAGA, DELETE_MEMBER_FROM_PROJECT_SAGA, DELETE_PORJECT_SAGA, GET_ALL_PROJECTS_SAGA, GET_PROJECT_DETAIL_SAGA } from '../../../redux/constants/ProjectConst';
import { SEARCH_USER_SAGA } from '../../../redux/constants/UserConst';
import dateFormat, { masks } from "dateformat";

export default function ProjectList(props) {

    const projects = useSelector(state => state.ProjectReducer.projects);
    const usersSearched = useSelector(state => state.UserReducer.usersSearched);
    const [usernameSearch, setUsernameSearch] = useState('');

    let dataConvert = projects.map((item, index) => {
        return {
            ...item,
            projectCategoryName: item.projectCategory.name,
            createdDate: dateFormat(new Date(item.createdDate), "mmm d, yyyy"),
        }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECTS_SAGA,
        })
        return () => {

        }
    }, [])

    const searchRef = useRef(null);

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setNameSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'name',
            },
        });
    };

    // const text = <span>Title</span>;
    const content = (record, index) => {
        // console.log('record: ', record);
        return (
            <div>
                <AutoComplete
                    value={usernameSearch}
                    onChange={(value) => {
                        setUsernameSearch(value);
                    }}
                    options={
                        // usersSearched?.map((user, index) => {
                        //     return { label: user.login, value: user.id, key: index }
                        // })

                        usersSearched?.filter(user => {
                            let index = record.members.findIndex(member => member.id === user.id);
                            if (index !== -1) {
                                return false;
                            }
                            return true;
                        }).map((user, index) => {
                            return { label: user.login, value: user.id, key: index }
                        })
                    }
                    style={{ width: '100%' }}
                    onSelect={(value, option) => {
                        setUsernameSearch(option.label);
                        dispatch({
                            type: ADD_MEMBER_TO_PROJECT_SAGA,
                            project: { ...record, members: [...record.members, { id: value }] },
                        })
                    }}
                    onSearch={(value) => {
                        if (searchRef.current) {
                            clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                            dispatch({
                                type: SEARCH_USER_SAGA,
                                username: value,
                            })
                        }, 300)
                    }}
                    placeholder="Username"
                />
            </div>
        )
    };


    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
                return <NavLink to={`/project/board/${record.id}`} style={{ cursor: 'pointer' }}>{text}</NavLink>
            },
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            sorter: (a, b) => a.url.length - b.url.length,
            sortOrder: sortedInfo.columnKey === 'url' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'projectCategoryName',
            key: 'projectCategoryName',
            filters: [
                { text: 'Web Application', value: 'Web Application' },
                { text: 'Mobile Application', value: 'Mobile Application' },
            ],
            filteredValue: filteredInfo.projectCategoryName || null,
            onFilter: (value, record) => record.projectCategoryName.includes(value),
            sorter: (a, b) => a.projectCategoryName.length - b.projectCategoryName.length,
            sortOrder: sortedInfo.columnKey === 'projectCategoryName' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Member',
            dataIndex: 'member',
            key: 'id',
            render: (text, record, index) => {
                return <>
                    <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} key={index}>
                        {record.members.map((member, index) => {
                            return (member.imageUrl === '' || member.imageUrl === null) ? <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar> : <Avatar src={member.imageUrl} key={index} />
                        })}
                    </Avatar.Group>
                    <Popover placement="topLeft" title={"Add Member"} content={content(record, index)} trigger="click">
                        <Button type="primary" size="small" style={{ fontWeight: 'bold', fontSize: 15 }}>
                            +
                        </Button>
                    </Popover>

                    <Popover placement="topLeft" title={"Members"} content={() => {
                        return <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Avatar</th>
                                    <th>Account</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.members?.map((member, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{member.id}</th>
                                            <td>
                                                {(member.imageUrl === '' || member.imageUrl === null)
                                                    ? <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar>
                                                    : <Avatar src={member.imageUrl} key={index} />}
                                            </td>
                                            <td>{member.login}</td>
                                            <td>
                                                <Button className="ml-1" type="danger" size="small" style={{ fontWeight: 'bold', fontSize: 15 }}
                                                    onClick={() => {
                                                        dispatch({
                                                            type: DELETE_MEMBER_FROM_PROJECT_SAGA,
                                                            project: { ...record, members: record.members.filter(item => item.id !== member.id) }
                                                        })
                                                    }}>
                                                    X
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }} trigger="click">
                        <Button className="ml-1" type="danger" size="small" style={{ fontWeight: 'bold', fontSize: 15 }}>
                            X
                        </Button>
                    </Popover>
                </>
            }
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: (a, b) => a.createdDate.length - b.createdDate.length,
            sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            sorter: (a, b) => a.createdBy.length - b.createdBy.length,
            sortOrder: sortedInfo.columnKey === 'createdBy' && sortedInfo.order,
            ellipsis: true,
            render: (text, record, index) => {
                return (
                    record.createdBy === 'ADMIN' ? <Tag color="#f50" key={index}>{record.createdBy}</Tag> :
                        record.createdBy === 'Member' ? <Tag color="#108ee9" key={index}>{record.createdBy}</Tag> :
                            <Tag color="#1ca027" key={index}>{record.createdBy}</Tag>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text, record, index) => <div style={{ display: 'flex' }}>
                <div>
                    <span style={{ cursor: 'pointer' }} key={index}
                        onClick={() => { showModalViewProject(record.id) }}>
                        <EyeOutlined style={{ fontSize: 18 }} />
                    </span>
                </div>
                <div>
                    <span className="bg-primary text-white ml-3" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}
                        onClick={() => {
                            showEditProjectDrawer(record.id)
                        }}>
                        <FormOutlined style={{ fontSize: 18 }} />
                    </span>
                </div>
                <div>
                    <span>
                        <Popconfirm
                            title="Are you sure to delete this project?"
                            onConfirm={() => {
                                dispatch({
                                    type: DELETE_PORJECT_SAGA,
                                    id: record.id,
                                    createdBy: record.createdBy,
                                })
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span className="bg-danger text-white ml-2" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}>
                                <DeleteOutlined style={{ fontSize: 18 }} />
                            </span>
                        </Popconfirm>
                    </span>
                </div>
            </div>
        },
    ];

    const showModalViewProject = (id) => {
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            actionDispatch: 'VIEW_PROJECT',
            id,
        })
    };

    const showEditProjectDrawer = (id) => {
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            actionDispatch: 'EDIT_PROJECT',
            id,
        })
    };

    return (
        <div className="mt-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={setNameSort}>Sort Name</Button>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
                <Space>
                    <NavLink to="/project-management/settings">
                        <button className="btn btn-success btn-sm" type="button">
                            <i className="fa fa-plus"></i>
                            <span style={{ marginLeft: 4 }}>Create New Project</span>
                        </button>
                    </NavLink>
                </Space>
            </div>
            <Table columns={columns} rowKey={"id"} dataSource={dataConvert} onChange={handleChange} />
        </div>
    )
}
