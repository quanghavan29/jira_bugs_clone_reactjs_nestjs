import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../../pages/Project/Header/Header';
import Menu from '../../pages/Project/Menu/Menu';
import SideBar from '../../pages/Project/SideBar/SideBar';

export const JiraBugsTemplate = (props) => {
    const { Component, ...restParam } = props;
    const {project} = useSelector(state => state.ProjectReducer)
    const id = props.computedMatch.params.id || 33;
    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <div className="jira">

                <SideBar />

                <Menu />

                <div className="main">

                    <Header title={restParam.title} />

                    <h4 style={{ color: '#172B4D', fontWeight: 'bold' }} className='mt-3'>
                        {restParam.title} {(restParam.title === 'Kanban Board') ? (` - ${project?.name}`) : ''}
                    </h4>
                    <span className="text-danger font-weight-bold">{(restParam.title === 'Kanban Board' && id === '33') ? 'Đây là project demo từ hệ thống!' : ''}</span>
                    <p className="mb-4 text-primary font-weight-bold">{(restParam.title === 'Kanban Board' && id === '33') ? 'Bạn có thể vào mục Project Management để tạo hoặc chuyển đển project khác!' : ''}</p>

                    <Component {...propsRoute} />

                </div>

            </div>
        </>
    }} />
}