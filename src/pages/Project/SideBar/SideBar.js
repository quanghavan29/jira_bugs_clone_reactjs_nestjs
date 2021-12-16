import React from 'react'

export default function SideBar(props) {
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
                    <i className="fa fa-plus mt-4" style={{ fontSize: 18, cursor: 'pointer' }} />
                </div>
                <div className="text-white mt-4">
                <i className="fa fa-question-circle" style={{ fontSize: 18, cursor: 'pointer' }} />
            </div>
            </div>
        </div >
    )
}
