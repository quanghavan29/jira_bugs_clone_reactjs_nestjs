import React from 'react';
import styleLoading from './Loading.module.css';
import { useSelector } from 'react-redux';

export default function Loading(props) {

    const {isLoading} = useSelector(state => state.LoadingReducer)

    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                {/* <img src='https://media0.giphy.com/media/26tPgy93ssTeTTSqA/giphy-downsized.gif' alt="loading.gif"/> */}
                <img src='./images/Curve-Loading.gif' alt="loading.gif"/>
            </div>
        )
    } else {
        return '';
    }
}