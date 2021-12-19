import React from 'react'
import { Drawer, Button, Space } from 'antd';
import EditProject from '../Form/EditProject';
import {useSelector, useDispatch} from 'react-redux';

export default function EditProjectDrawer(props) {
    const visible = useSelector(state => state.ProjectDetailReducer.visibleDrawerEditProject);

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER_EDIT_PROJECT',
        })
    };

    return (
        <>
            <div>
                <Drawer
                    title='Edit Project'
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >

                    <EditProject />

                </Drawer>
            </div>
        </>
    )
}
