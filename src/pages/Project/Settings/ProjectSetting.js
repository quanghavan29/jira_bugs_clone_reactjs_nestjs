import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/ProjectCategoryConst';
const { Option } = Select;

export default function ProjectSetting() {

    const { projectCategories } = useSelector(state => state.ProjectCategoryReducer);

    const dispatch = useDispatch();

    const renderProjectCategories = () => {
        return projectCategories.map((projectCategory, index) => {
            return <Option key={index} value={projectCategory.id}>{projectCategory.projectCategoryName}</Option>
        })
    }

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        })
    }, [])

    const editorRef = useRef(null);

    const handleEditorChange = (content, editor) => {
        console.log(content, editor);
    }

    return (
        <Form >
            <Form.Item style={{ width: '60%' }} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <Input placeholder="ReactJS Jira Clone" />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL</label>
                    <Input placeholder="https://github.com/quanghavan29/jira_bugs_clone_reactjs_nestjs" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <Select placeholder="Choose Project Category">
                        {renderProjectCategories()}
                    </Select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>A Jira clone app built with ReactJS and NestJS - by quanghavan29.</p>"
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
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button htmlType="button" className="ml-3">
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}
