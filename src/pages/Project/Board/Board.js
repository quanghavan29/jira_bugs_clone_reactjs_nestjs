import { Avatar } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_BOARD_SAGA } from '../../../redux/constants/ProjectConst';
import { GET_ALL_TASKS_BY_PROJECT_SAGA, GET_TASK_DETAIL_SAGA } from '../../../redux/constants/TaskConst';
// import Content from './Content'
// import Infor from './Infor'

export default function Board(props) {

    let { project } = useSelector(state => state.ProjectReducer);
    let { backLog, selectedForDev, inProgress, done } = useSelector(state => state.TaskReducer.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        const id = props.match.params.id;
        dispatch({
            type: GET_PROJECT_BOARD_SAGA,
            id,
        });
        dispatch({
            type: GET_ALL_TASKS_BY_PROJECT_SAGA,
            projectId: id,
        })
    }, [])

    // const renderUsersAssign = (usersAssign) => {
    //     return usersAssign.map((user, index) => {
    //         return 
    //     })

    // }

    const renderAllTask = (tasks) => {
        return tasks.map((task, index) => {
            return <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} key={index}
                        onClick={() => {
                            dispatch({
                                type: GET_TASK_DETAIL_SAGA,
                                taskId: task.id,
                            })
                        }}>
                <p>
                    {task.name}
                </p>
                <div className="block" style={{ display: 'flex' }}>
                    <div className="block-right">
                        <div className="avatar-group" style={{ display: 'flex' }}>
                            <div className="avatar-block">
                                <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} key={index}>
                                    {task.usersAssign?.map((member, index) => {
                                        return (member.imageUrl === '' || member.imageUrl === null) ? <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar> : <Avatar src={member.imageUrl} key={index} />
                                    })}
                                </Avatar.Group>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fa fa-bookmark" style={{ fontSize: 18 }} />
                            </div>
                        </div>
                        <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fa fa-check-square" style={{ fontSize: 18 }} />
                            </div>
                        </div>
                        <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fa fa-arrow-up" style={{ fontSize: 18 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        });
    }

    const renderAllTaskStatus = (task) => {
        return (
            <div className="card" style={{ width: '17rem', height: 'auto', paddingBottom: 10 }}>
                <div className="card-header">
                    {task.status} <span>{task.items.length}</span>
                </div>
                <ul className="list-group list-group-flush">
                    {renderAllTask(task.items)}
                </ul>
            </div>
        )
    }

    return (
        <div>
            {/* <Infor />
            <Content /> */}
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search mt-1" />
                    <i className="fa fa-search mt-2" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    <Avatar.Group
                        maxCount={4}
                        size="large"
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                        {project.members?.map((member, index) => {
                            return (member.imageUrl === '' || member.imageUrl === null) ? <Avatar key={index}>{member.login.charAt(0).toUpperCase()}</Avatar> : <Avatar src={member.imageUrl} key={index} />
                        })}
                    </Avatar.Group>
                </div>
                <div style={{ marginLeft: 20 }} className="text ml-5">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>

            <div className="content" style={{ display: 'flex' }}>

                {renderAllTaskStatus(backLog)}

                {renderAllTaskStatus(selectedForDev)}

                {renderAllTaskStatus(inProgress)}

                {renderAllTaskStatus(done)}

            </div>
        </div>
    )
}
