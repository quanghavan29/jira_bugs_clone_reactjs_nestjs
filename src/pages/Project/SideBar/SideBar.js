import React from 'react'
import { useDispatch } from 'react-redux'
import { SHOW_CREATE_TASK_MODAL_SAGA } from '../../../redux/constants/TaskConst';

export default function SideBar(props) {
    
    const dispatch = useDispatch();
    
    return (
        < div className="sideBar text-center" >
            <div className="">
                <div className="text-white mt-4">
                    <i className="fab fa-jira" style={{ fontSize: 28, cursor: 'pointer' }} />
                </div>
                <div className="text-white">
                    <i className="fa fa-search mt-4" style={{ fontSize: 18, cursor: 'pointer' }} />
                </div>
                <div className="text-white">
                    <i className="fa fa-plus mt-4" style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => {
                        dispatch({
                            type: SHOW_CREATE_TASK_MODAL_SAGA,
                        })
                    }}/>
                </div>
                <div className="text-white mt-4">
                <i className="fa fa-question-circle" style={{ fontSize: 18, cursor: 'pointer' }} />
            </div>
            </div>
        </div >
    )
}
