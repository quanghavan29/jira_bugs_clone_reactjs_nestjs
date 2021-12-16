import React, { useRef } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

export default function ProjectSetting() {

    const { Option } = Select;

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
                    <Select value={"web"}>
                        <Option value="web">Web Application</Option>
                        <Option value="mobile">Mobile Application</Option>
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
