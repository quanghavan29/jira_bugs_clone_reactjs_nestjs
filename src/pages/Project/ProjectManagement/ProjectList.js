import React, { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { FormOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECTS_SAGA, GET_PROJECT_DETAIL_SAGA } from '../../../redux/constants/ProjectConst';
import { Tag, Divider } from 'antd';
import EditProject from '../Form/EditProject';

export default function ProjectList(props) {

    const projects = useSelector(state => state.ProjectReducer.projects);

    let dataConvert = projects.map((item, index) => {
        return {
            ...item,
            projectCategoryName: item.projectCategory.name,
            createdDate: new Date(item.createdDate).toLocaleDateString(),
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

    const setIDSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'id',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
                    record.createdBy === 'ADMIN' ? <Tag color="#f50">{record.createdBy}</Tag> : <Tag color="#2db7f5">{record.createdBy}</Tag>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text, record, index) => <span>
                <span style={{ cursor: 'pointer' }}
                    onClick={() => {showModalViewProject(record.id)}}>
                    <EyeOutlined style={{ fontSize: 18 }} />
                </span>
                <span className="bg-primary text-white ml-3" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }} onClick={() => {
                    showEditProjectDrawer(record.id)
                }}>
                    <FormOutlined style={{ fontSize: 18 }} />
                </span>
                <span className="bg-danger text-white ml-2" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}>
                    <DeleteOutlined style={{ fontSize: 18 }} />
                </span>
            </span>,
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
        <div className="mt-5 pr-5 mr-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={setIDSort}>Sort ID</Button>
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
