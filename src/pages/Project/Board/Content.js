import React from 'react'

export default function Content() {
    return (
        <div className="content" style={{ display: 'flex' }}>

            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    BACKLOG 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar-block">
                                        <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/ironman_tvda3m.jpg" alt="avatar.jpg" />
                                    </div>
                                    <div className="avatar-block">
                                        <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/spiderman_z2e5kw.jpg" alt="avatar.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                                    <div style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-bookmark" style={{ fontSize: 18 }} />
                                    </div>
                                </div>
                                <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                                    <div style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-arrow-up" style={{ fontSize: 18 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar-block">
                                        <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/captain_xdv72o.jpg" alt="avatar.jpg" />
                                    </div>
                                    <div className="avatar-block">
                                        <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/thor_clj80h.jpg" alt="avatar.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                                    <div style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-check-square" style={{ fontSize: 18 }} />
                                    </div>
                                </div>
                                <div style={{ width: 24, height: 24, lineHeight: '34px' }}>
                                    <div style={{ cursor: 'pointer' }}>
                                        <i className="fa fa-arrow-up" style={{ fontSize: 18 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>

            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>

            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>

            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        </div>
    )
}
