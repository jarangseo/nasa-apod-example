import React from 'react';
import styles from './Info.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Info = ({title, copyright, explanation}) => {
    return (
        <div>
            <p>{title}</p>
            <p>{copyright}</p>
            <p>{explanation}</p>
        </div>
    )
}

export default Info;
