import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/ProjectCategoryConst';
import { withFormik } from 'formik';
import { UPDATE_PORJECT_SAGA } from '../../../redux/constants/ProjectConst';

function EditProject(props) {

    const dispatch = useDispatch();
    const { projectCategories } = useSelector(state => state.ProjectCategoryReducer);

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    const renderProjectCategories = () => {
        return projectCategories.map((projectCategory, index) => {
            return <option key={index} value={projectCategory.id}>{projectCategory.name}</option>
        });
    };

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
    };

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        });

    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" name="name" value={values.name} required="required" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL</label>
                    <input className="form-control" name="url" value={values.url} required="required" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="projectCategoryId" value={values.projectCategoryId} onChange={handleChange}>
                        {renderProjectCategories()}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <Editor
                        name="description"
                        value={values.description}
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <button className="btn btn-primary" type="submit" onSubmit={handleSubmit}>
                    Save
                </button>
                <button type="button" className="btn btn-secondary ml-3"
                    onClick={() => {
                        dispatch({
                            type: 'CLOSE_DRAWER_EDIT_PROJECT',
                        })
                    }}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

const EditProjectWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { project } = props;
        return {
            id: project.id,
            name: project.name,
            url: project.url,
            description: project.description,
            projectCategoryId: project.projectCategory.id,
        }
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        setSubmitting(true);
        props.dispatch({
            type: UPDATE_PORJECT_SAGA,
            projectUpdate: { 
                ...values,
                projectCategory: {
                    id: values.projectCategoryId,
                }
            }
        })
    },

    displayName: 'Jira Bugs Edit Project',
})(EditProject);

const mapStateToProps = (state) => {
    return {
        project: state.ProjectDetailReducer.project,
    }
}

export default connect(mapStateToProps)(EditProjectWithFormik);