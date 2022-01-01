import { Editor } from '@tinymce/tinymce-react';
import { AutoComplete, Avatar, Button, Input, Modal, Popconfirm, Popover, Select, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { CREATE_COMMENT_SAGA, DELETE_COMMENT_SAGA } from '../../../redux/constants/CommentConts';
import { GET_LIST_MEMBERS_SAGA } from '../../../redux/constants/ProjectConst';
import { GET_TASK_DETAIL_SAGA, UPDATE_TASK_SAGA } from '../../../redux/constants/TaskConst';
import { SEARCH_USER_SAGA } from '../../../redux/constants/UserConst';
import { USER_LOGIN_LOCAL_STORAGE } from '../../../util/config/constants';
import { openNotification } from '../../../util/notification/notification';
const { Option } = Select;

function ViewTaskModal(props) {
    const { visible, task } = useSelector(state => state.ViewTaskReducer);

    // const [status, setStatus] = useState(task?.status);
    const [visibleEditTaskName, setVisibleEditTaskName] = useState(false);
    const [taskName, setTaskName] = useState();
    const [description, setDescription] = useState();
    const [commentContent, setCommentContent] = useState('');

    const [usernameSearch, setUsernameSearch] = useState('');
    const { members } = useSelector(state => state.ListMembersReducer);

    const dispatch = useDispatch();

    let userLogin = {
        login: 'Account',
        imageUrl: '',
    };
    if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
        userLogin = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
    }


    const searchRef = useRef(null);

    // useEffect(() => {
    //     setDescription(props.description)
    // }, [])

    const content = () => {
        return (
            <div>
                <AutoComplete
                    value={usernameSearch}
                    onChange={(value) => {
                        setUsernameSearch(value);
                    }}
                    options={
                        members?.filter(member => {
                            let index = task.usersAssign?.findIndex(userAssign => userAssign.id == member.id);
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
                        let newUsersAssign = [...task.usersAssign, { id: value }];
                        dispatch({
                            type: UPDATE_TASK_SAGA,
                            taskUpdate: { ...task, usersAssign: newUsersAssign },
                        });
                    }}
                    onSearch={(value) => {
                        if (searchRef.current) {
                            clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                            dispatch({
                                type: GET_LIST_MEMBERS_SAGA,
                                projectId: task?.project.id,
                            })
                        }, 300)
                    }}
                    placeholder="Username"
                />
            </div>
        )
    };

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

    const renderCommnets = () => {
        return (
            task?.comments?.map((comment, index) => {
                return (
                    <div className="comment-item" key={index}>
                        <div className="display-comment" style={{ display: 'flex' }}>
                            <div className="avatar">
                                {(comment.user.imageUrl === '' || comment.user.imageUrl === null) ?
                                    <Avatar icon={<i className="fa fa-user-alt"></i>} /> : <Avatar src={comment.user.imageUrl} />
                                }
                            </div>
                            <div>
                                <p style={{ marginBottom: 5, fontSize: 16, color: '#42526E' }}>
                                    {comment.user.login}
                                    {/* <span>a month ago</span> */}
                                </p>
                                <p style={{ marginBottom: 0, color: '172B4D' }}>
                                    {comment.content}
                                </p>
                                {userLogin.id === comment.user.id ?
                                    <div>
                                        <span style={{ color: '#65676B', cursor: 'pointer', fontSize: 12 }}>Edit </span>
                                        •
                                        <Popconfirm
                                            title="Are you sure to delete this comment?"
                                            onConfirm={() => {
                                                dispatch({
                                                    type: DELETE_COMMENT_SAGA,
                                                    commentId: comment.id,
                                                    taskId: task.id,
                                                })
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <span style={{ color: '#65676B', cursor: 'pointer', fontSize: 12 }}> Delete</span>
                                        </Popconfirm>
                                    </div> :
                                    <div>
                                        <span style={{ color: '#65676B', cursor: 'pointer', fontSize: 12 }}>Like </span>
                                        •
                                        <span style={{ color: '#65676B', cursor: 'pointer', fontSize: 12 }}> Response</span>
                                    </div>}
                            </div>
                        </div>
                    </div>
                )
            })
        )
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
                    setCommentContent('');
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
                                        initialValue={task?.description}
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
                                        onEditorChange={(content, editor) => {
                                            setDescription(content);
                                        }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Button type="primary" onClick={() => {
                                        let newDescription = task?.description;
                                        if (description) {
                                            newDescription = description;
                                        }
                                        dispatch({
                                            type: UPDATE_TASK_SAGA,
                                            taskUpdate: { ...task, description: newDescription },
                                        })
                                    }}>Save</Button>
                                    <Button className="ml-2" onClick={() => {
                                    }}>Cancel</Button>
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
                                            <Input type="text" placeholder="Add a comment..." value={commentContent}
                                                onChange={(e) => {
                                                    setCommentContent(e.target.value);
                                                }} />
                                            {/* <p>
                                                <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                <span>press
                                                    <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                    to comment</span>
                                            </p> */}
                                        </div>
                                        <div>
                                            <Button type="primary" style={{ height: 40 }} className="ml-2"
                                                onClick={() => {
                                                    if (commentContent === '') {
                                                        openNotification('error', 'Fail!', 'Please add a comment...!');
                                                        return;
                                                    }
                                                    let newComment = {
                                                        user: {
                                                            id: userLogin.id,
                                                        },
                                                        task: {
                                                            id: task.id,
                                                        },
                                                        content: commentContent,
                                                    };
                                                    dispatch({
                                                        type: CREATE_COMMENT_SAGA,
                                                        newComment: newComment,
                                                    })
                                                    setCommentContent('');
                                                }}>Sent</Button>
                                        </div>
                                    </div>
                                    <div className="lastest-comment mt-4">
                                        {renderCommnets()}
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
                                                    <i className="fa fa-times ml-2" style={{ cursor: 'pointer' }} onClick={() => {
                                                        let newUsersAssign = task.usersAssign.filter(userAssign => userAssign.id !== user.id);
                                                        dispatch({
                                                            type: UPDATE_TASK_SAGA,
                                                            taskUpdate: { ...task, usersAssign: newUsersAssign },
                                                        });
                                                    }} />
                                                </Tag>
                                            );
                                        })}
                                        <Popover placement="topLeft" title={"Add Member"} content={content()} trigger="click">
                                            <Tag className="site-tag-plus mt-2" style={{ cursor: 'pointer' }}>
                                                <span style={{ color: "#0052CC" }}>
                                                    <i className="fa fa-plus" /> ADD MORE
                                                </span>
                                            </Tag>
                                        </Popover>
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
        description: state.ViewTaskReducer.task.description,
    }
}

export default connect(mapStateToProps)(ViewTaskModal);