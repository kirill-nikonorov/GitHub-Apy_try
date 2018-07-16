import React from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';

const renderLoadMoreButton = (handleLoadMore) => (
    <button onClick={handleLoadMore}>LoadMore</button>
);
const List = ({items, renderElement, nextPageUrl, handleLoadMore, isFetching, pageCount}) => {

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
        return <h2><i>Loading...</i></h2>
    }
    return (
        <div>
            {items.map(item => renderElement(item))}
            {nextPageUrl ? renderLoadMoreButton(handleLoadMore) : null}
        </div>
    )
};

export default hot(module)(List);
