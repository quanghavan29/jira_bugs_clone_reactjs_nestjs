import React, { useEffect, useState } from 'react';
import { Modal, Select, Slider } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { SEARCH_USER_SAGA } from '../../../redux/constants/UserConst';
import { withFormik } from 'formik';
import { GET_LIST_MEMBERS_SAGA } from '../../../redux/constants/ProjectConst';
import { CREATE_TASK_SAGA } from '../../../redux/constants/TaskConst';
const { Option } = Select;

function CreateTaskModal(props) {

    const { visible, projects } = useSelector(state => state.CreateTaskReducer);
    const { members } = useSelector(state => state.ListMembersReducer);
    const [usersAssign, setUsersAssign] = useState([])

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    });

    const dispatch = useDispatch();

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    useEffect(() => {
        dispatch({
            type: GET_LIST_MEMBERS_SAGA,
            projectId: 33,
        })
    }, [])

    const userOptions = members.map((user, index) => {
        return { value: user.id, label: user.login, key: index };
    })

    // function handleChange(value) {
    //     console.log(`Selected: ${value}`);
    // }

    const [size, setSize] = React.useState('default');

    const handleSizeChange = e => {
        setSize(e.target.value);
    };

    const renderProjectOptions = () => {
        return projects.map((project, index) => {
            return <option value={project.id} key={index}>{project.name}</option>
        })
    }

    return (
        <>
            <Modal
                title="Create Task"
                centered
                visible={visible}
                onOk={() => { }}
                onCancel={() => {
                    dispatch({
                        type: 'HIDDEN_CREATE_TASK_MODAL',
                    })
                }}
                width={1000}
            >
                <form className="container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <p>Name</p>
                        <input className="form-control" type="text" name="name" required="required" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Project</p>
                        <select name="projectId" className="form-control" onChange={(e) => {
                            setFieldValue('projectId', e.target.value);
                            setUsersAssign([]);
                            dispatch({
                                type: GET_LIST_MEMBERS_SAGA,
                                projectId: e.target.value,
                            })
                        }}>
                            {renderProjectOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Status</p>
                        <select name="status" className="form-control" onChange={handleChange}>
                            <option value="BACKLOG">BACKLOG</option>
                            <option value="SELECTED FOR DEVELOPMENT">SELECTED FOR DEVELOPMENT</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <p>Priority</p>
                                <select name="priority" className="form-control" onChange={handleChange}>
                                    <option value={"High"}>High</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Low"}>Low</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <p>Task type</p>
                                <select className="form-control" name="type" onChange={handleChange}>
                                    <option value={"New Task"}>New Task</option>
                                    <option value={"Bugs"}>Bugs</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <p>Assignees</p>
                                <Select
                                    mode="multiple"
                                    size={size}
                                    options={userOptions}
                                    placeholder="Please select"
                                    value={usersAssign}
                                    optionFilterProp="label"
                                    onChange={(values) => {
                                        setUsersAssign(values);
                                        setFieldValue('usersAssign', values);
                                    }}
                                    style={{ width: '100%' }}
                                >
                                </Select>
                            </div>
                            <div className="col-6">
                                <p>Time tracking</p>
                                <Slider defaultValue={30} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={timeTracking.timeTrackingSpent} />
                                <div className="row">
                                    <div className="col-6 text-left font-weight-bold">
                                        {timeTracking.timeTrackingSpent}h logged
                                    </div>
                                    <div className="col-6 text-right font-weight-bold">
                                        {timeTracking.timeTrackingRemaining}h logged
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12">
                                        <p>Original Estimate</p>
                                        <input className="form-control" type="number" name="originalEstimate" defaultValue={0} min={0} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='row'>
                                    <div className="col-6">
                                        <p>Time spent (hours)</p>
                                        <input className="form-control" type="number" name="timeTrackingSpent" defaultValue={0} min={0} onChange={(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingSpent: e.target.value,
                                            });
                                            setFieldValue('timeTrackingSpent', e.target.value);
                                        }} />
                                    </div>
                                    <div className="col-6">
                                        <p>Time remaining (hours)</p>
                                        <input className="form-control" type="number" name="timeTrackingRemaining" defaultValue={0} min={0} onChange={(e) => {
                                            setTimeTracking({
                                                ...timeTracking,
                                                timeTrackingRemaining: e.target.value,
                                            });
                                            setFieldValue('timeTrackingRemaining', e.target.value);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <p>Description</p>
                        <Editor
                            init={{
                                height: 250,
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
                                setFieldValue('description', content);
                            }}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

const CreateTaskWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            name: '',
            projectId: 33,
            type: 'New Task',
            priority: 'High',
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            originalEstimate: 0,
            description: '',
            usersAssign: [],
            status: 'BACKLOG',
        }
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        setSubmitting(true);
        props.dispatch({
            type: CREATE_TASK_SAGA,
            newTask: { ...values },
        })
    },

    displayName: 'Jira Bugs Create Task',
})(CreateTaskModal);

export default connect()(CreateTaskWithFormik);