import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { USER_LOGIN_LOCAL_STORAGE } from '../../../util/config/constants';

export default function Header(props) {

    // const handleButtonClick = (e) => {
    //     message.info('Click on left button.');
    //     console.log('click left button', e);
    // }
    let userLogin = {
        login: 'Account',
        imageUrl: '',
    };
    if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
        userLogin = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
    }

    const handleMenuClick = (e) => {
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" style={{ display: 'flex' }}>
                <NavLink to="/account">
                    <div><i className="fa fa-user"></i><span className="ml-3">Account</span></div>
                </NavLink>
            </Menu.Item>

            <Menu.Item key="2">
                <NavLink to="/login">
                    <div><i className="fa fa-sign-out-alt"></i><span className="ml-2 pl-1">Logout</span></div>
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header mt-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
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
            <div>

            </div>
            <div>
                <Dropdown overlay={menu}>
                    {/* <Button icon={<Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: 30, height: 30 }} />} style={{ padding: '0px 6px', height: 36 }}>
                        <span></span><DownOutlined />
                    </Button> */}
                    <button className="btn">
                        <i>
                            {(userLogin.imageUrl === '' || userLogin.imageUrl === null) ?
                                <Avatar icon={<i className="fa fa-user-alt"></i>} /> : <Avatar src={userLogin.imageUrl} style={{ width: 30, height: 30 }} />
                            }
                        </i>
                        <span className="ml-2 p-1">{userLogin.login.toLocaleUpperCase()}</span><DownOutlined />
                    </button>
                </Dropdown>
            </div>
            <div>

            </div>
        </div>
    )
}
