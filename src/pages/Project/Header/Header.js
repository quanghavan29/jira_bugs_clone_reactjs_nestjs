import React from 'react'

export default function Header(props) {
    return (
        <div className="header mt-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">ReactJS Jira Clone</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {props.title}
                    </li>
                </ol>
            </nav>
        </div>
    )
}
