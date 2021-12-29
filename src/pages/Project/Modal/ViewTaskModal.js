import { Editor } from '@tinymce/tinymce-react';
import { Avatar, Button, Input, Modal, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_TASK_DETAIL_SAGA, UPDATE_TASK_SAGA } from '../../../redux/constants/TaskConst';
import { USER_LOGIN_LOCAL_STORAGE } from '../../../util/config/constants';
const { Option } = Select;

function ViewTaskModal(props) {
    const { visible, task } = useSelector(state => state.ViewTaskReducer);
    // const [status, setStatus] = useState(task?.status);
    const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
    const [taskName, setTaskName] = useState(props.taskName);

    const dispatch = useDispatch();

    let userLogin = {
        login: 'Account',
        imageUrl: '',
    };
    if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
        userLogin = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
    }

    // useEffect(() => {
    //     setTaskName(props.taskName)
    // }, [taskName])

    const usersAssign = task?.usersAssign;

    const renderTimeTracking = () => {

        const timeTrackingSpent = task?.timeTrackingSpent;
        const timeTrackingRemaining = task?.timeTrackingRemaining;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100);

        return <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={25} aria-valuemin={Number(timeTrackingSpent)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{timeTrackingSpent}h logged</p>
                    <p className="estimate-time">{timeTrackingRemaining}h estimated</p>
                </div>
            </div>
        </div>
    }

    return (
        <>
            <Modal
                title="Task Detail"
                centered
                visible={visible}
                onOk={() => { }}
                onCancel={() => {
                    dispatch({
                        type: 'CLOSE_MODAL_VIEW_TASK',
                    });
                    setVisibleEditTaskName(false);
                }}
                width={1000}
            >
                <div style={{ fontWeight: 500 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Select name="type" value={task?.type} onChange={(value) => {
                                dispatch({
                                    type: UPDATE_TASK_SAGA,
                                    taskUpdate: { ...task, type: value },
                                })
                            }}>
                                <Option value="New Task">New Task</Option>
                                <Option value="Bugs">Bugs</Option>
                            </Select>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}> Give feedback</span>
                            </div>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}> Copy link</span>
                            </div>
                            <div style={{ cursor: 'pointer' }}>
                                <i className="fa fa-trash-alt" />
                                <span style={{ paddingRight: 20 }}> Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-8">
                                <div>
                                    {visibleEditTaskName === true ?
                                        <form className="form-group" style={{ display: 'flex' }} onSubmit={() => {
                                            dispatch({
                                                type: UPDATE_TASK_SAGA,
                                                taskUpdate: { ...task, name: taskName },
                                            });
                                            setVisibleEditTaskName(false);
                                        }}>
                                            <Input type="text" name="name" required="required" onChange={(e) => {
                                                setTaskName(e.target.value);
                                            }} value={taskName} />
                                            <Button type="primary" htmlType="submit" className="ml-2">OK</Button>
                                        </form> :
                                        <div className="form-group">
                                            <span style={{ fontWeight: 500, color: '#172B4D', fontSize: 24 }}>{task?.name}</span>
                                            <i className="fa fa-edit ml-2" style={{ cursor: 'pointer', fontSize: 18, color: '#23B6A4' }}
                                                onClick={() => { 
                                                    setVisibleEditTaskName(true);
                                                    setTaskName(props.taskName);
                                                }}
                                            />
                                        </div>
                                    }
                                </div>

                                <div className="mt-3">
                                    <p>Description</p>
                                    <Editor
                                        name="description"
                                        initialValue={task.description}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Button type="primary">Save</Button>
                                    <Button className="ml-2">Cancel</Button>
                                </div>
                                <div className="comment mt-5">
                                    <h6>Comment</h6>
                                    <div className="block-comment mt-4" style={{ display: 'flex' }}>
                                        <div className="avatar">
                                            {(userLogin.imageUrl === '' || userLogin.imageUrl === null) ?
                                                <Avatar icon={<i className="fa fa-user-alt"></i>} /> : <Avatar src={userLogin.imageUrl} style={{ width: 40, height: 40 }} />
                                            }
                                        </div>
                                        <div className="input-comment">
                                            <Input type="text" placeholder="Add a comment..." />
                                            {/* <p>
                                                <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                <span>press
                                                    <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                    to comment</span>
                                            </p> */}
                                        </div>
                                    </div>
                                    <div className="lastest-comment mt-4">
                                        <div className="comment-item">
                                            <div className="display-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <Avatar src="https://res.cloudinary.com/fpt-food/image/upload/v1639790796/ReactJS_Jira_Bugs_Clone/thor_yr3qyw.jpg" />
                                                </div>
                                                <div>
                                                    <p style={{ marginBottom: 5, fontSize: 16, color: '#42526E' }}>Lord Gaben
                                                        {/* <span>a month ago</span> */}
                                                    </p>
                                                    <p style={{ marginBottom: 5, color: '172B4D' }}>
                                                        Lorem ipsum dolor sit amet, consectetur
                                                        adipisicing elit. Repellendus tempora ex
                                                        voluptatum saepe ab officiis alias totam ad
                                                        accusamus molestiae?
                                                    </p>
                                                    <div>
                                                        <span style={{ color: '#929398', cursor: 'pointer' }}>Edit </span>
                                                        •
                                                        <span style={{ color: '#929398', cursor: 'pointer' }}> Delete</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="status">
                                    <h6>STATUS</h6>
                                    <Select name="status" value={task?.status} onChange={(value) => {
                                        dispatch({
                                            type: UPDATE_TASK_SAGA,
                                            taskUpdate: { ...task, status: value },
                                        })
                                    }}>
                                        <Option value="BACKLOG">BACKLOG</Option>
                                        <Option value="SELECTED FOR DEVELOPMENT">SELECTED FOR DEVELOPMENT</Option>
                                        <Option value="IN PROGRESS">IN PROGRESS</Option>
                                        <Option value="DONE">DONE</Option>
                                    </Select>
                                </div>
                                <div className="reporter mt-3">
                                    <h6>ASSIGNEES</h6>
                                    <div>
                                        {usersAssign?.map((user, index) => {

                                            const isLongTag = user.login.length > 10;

                                            return (
                                                <Tag className="mt-2" key={index}>
                                                    <span>
                                                        {isLongTag ? `${user.login.slice(0, 10)}...` : user.login}
                                                    </span>
                                                    <i className="fa fa-times ml-2" style={{ cursor: 'pointer' }} />
                                                </Tag>
                                            );
                                        })}
                                        <Tag className="site-tag-plus mt-2" style={{ cursor: 'pointer' }}>
                                            <span style={{ color: "#0052CC" }}>
                                                <i className="fa fa-plus" /> ADD MORE
                                            </span>
                                        </Tag>
                                    </div>
                                </div>
                                <div className="reporter mt-3">
                                    <h6>REPORTER</h6>
                                    <div style={{ display: 'flex' }} className="item">
                                        <div className="avatar">
                                            <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/spiderman_z2e5kw.jpg" alt="avatar.jpg" />
                                        </div>
                                        <div className="name">
                                            <div className="ml-1 mt-1 pr-1">
                                                Pickle Rick
                                                {/* <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="priority" style={{ marginBottom: 20 }}>
                                    <h6>PRIORITY</h6>
                                    <Select name="priority" value={task?.priority} onChange={(value) => {
                                        dispatch({
                                            type: UPDATE_TASK_SAGA,
                                            taskUpdate: { ...task, priority: value },
                                        })
                                    }}>
                                        <Option value="High">High</Option>
                                        <Option value="Medium">Medium</Option>
                                        <Option value="Low">Low</Option>
                                    </Select>
                                </div>
                                <div className="estimate">
                                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                    <Input type="number" name="originalEstimate" value={task?.originalEstimate} onChange={(e) => {
                                        let originalEstimate = 0;
                                        if (e.target.value !== '') {
                                            originalEstimate = e.target.value;
                                        }
                                        dispatch({
                                            type: UPDATE_TASK_SAGA,
                                            taskUpdate: { ...task, originalEstimate: originalEstimate },
                                        })
                                    }} />
                                </div>
                                <div className="time-tracking mt-3">
                                    <h6>TIME TRACKING</h6>
                                    {renderTimeTracking()}
                                </div>
                                <div style={{ color: '#929398' }}>Create at a month ago</div>
                                <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        taskName: state.ViewTaskReducer.task.name,
    }
}

export default connect(mapStateToProps)(ViewTaskModal);