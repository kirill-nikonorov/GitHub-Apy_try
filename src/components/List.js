import React from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';

const renderLoadMoreButton = (handleLoadMore) => (
    <button onClick={handleLoadMore}>LoadMore</button>
);
const List = ({items, renderElement, nextPageUrl, handleLoadMore}) => (
    <div>
        {items.map(item => renderElement(item))}
        {nextPageUrl ? renderLoadMoreButton(handleLoadMore) : null}
    </div>
);

export default hot(module)(List);
