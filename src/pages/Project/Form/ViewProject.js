import React from 'react';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

export default function ViewProject(props) {

    const { project } = useSelector(state => state.ProjectDetailReducer);

    return (
        <form>
            <div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <Input className="form-control" name="name" value={project.name} readOnly="readOnly" />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL</label>
                    <Input className="form-control" name="url" value={project.url} readOnly="readOnly" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="projectCategoryId" readOnly="readOnly">
                        <option>{project.projectCategory.name}</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <Editor
                        name="description"
                        initialValue={project.description}
                        init={{
                            height: 170,
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
                <div className="mb-3">
                    <label className="form-label">Created By</label>
                    <Input className="form-control" name="name" value={project.createdBy} readOnly="readOnly" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Created Date</label>
                    <Input className="form-control" name="name" value={project.createdDate} readOnly="readOnly" />
                </div>
            </div>
        </form>
    )
}
