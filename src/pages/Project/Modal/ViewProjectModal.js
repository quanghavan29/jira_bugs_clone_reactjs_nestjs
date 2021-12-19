import React from 'react';
import { Modal } from 'antd';
import ViewProject from '../Form/ViewProject';
import {useSelector, useDispatch} from 'react-redux';

export default function ViewProjectModal() {

    const visible = useSelector(state => state.ProjectDetailReducer.visibleModalViewProject);
    const dispatch = useDispatch();

    const handleOk = e => {
        dispatch({
            type: 'SHOW_MODAL_VIEW_PROJECT',
        })
    };

    const handleCancel = e => {
        dispatch({
            type: 'CLOSE_MODAL_VIEW_PROJECT',
        })
    };

    return (
        <>
            <Modal
                title="Project Detail"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                width={900}
            >
                <ViewProject />

            </Modal>
        </>
    )
}
