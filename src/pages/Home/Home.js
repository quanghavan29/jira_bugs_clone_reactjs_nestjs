import React from 'react'
import {useSelector} from 'react-redux';

export default function Home(props) {

const {userLogin} = useSelector(state => state.UserLoginReducer);

    return (
        <div>
            Home <br />
            Hello - {userLogin?.email}
        </div>
    )
}
