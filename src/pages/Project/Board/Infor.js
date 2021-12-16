import React from 'react'

export default function Infor() {
    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search mt-1" />
                <i className="fa fa-search mt-2" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/ironman_tvda3m.jpg" alt="avatar.jpg" />
                </div>
                <div className="avatar">
                    <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/spiderman_z2e5kw.jpg" alt="avatar.jpg" />
                </div>
                <div className="avatar">
                    <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/captain_xdv72o.jpg" alt="avatar.jpg" />
                </div>
                <div className="avatar">
                    <img src="https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/thor_clj80h.jpg" alt="avatar.jpg" />
                </div>
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
