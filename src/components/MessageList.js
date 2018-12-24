import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List, InfiniteLoader, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import MessageCard from './MessageCard';
import SwipeOut from './SwipeOut';

class MessageList extends PureComponent {
    constructor(props) {
        super(props);

        this._cache = new CellMeasurerCache({
            fixedWidth: true
        });

        this._rowRenderer = this._rowRenderer.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(id) {
        this.props.onDeleteMessage(id);
        this._cache.clearAll();
        this._list.recomputeRowHeights();
    }

    loadMore({ stopIndex }) {
        if (stopIndex + this.props.threshold >= this.props.messages.length && !this.props.loading) {
            return this.props.loadMoreMessages();
        }
    }

    _rowRenderer = ({ index, key, parent, style }) => {
        const { messages } = this.props;

        let content;

        const message = messages[index];

        content = (
            <SwipeOut id={message.id} onDismiss={this.onDelete}>
                <MessageCard {...message} />
            </SwipeOut>
        );

        return (
            <CellMeasurer cache={this._cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <div style={style}>{content}</div>
            </CellMeasurer>
        );
    };

    render() {
        const { messages, hasMore } = this.props;

        return (
            <InfiniteLoader
                isRowLoaded={index => !hasMore || index < messages.length}
                loadMoreRows={this.loadMore}
                rowCount={messages.length + 1}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => {
                            return (
                                <List
                                    ref={el => (this._list = el)}
                                    deferredMeasurementCache={this._cache}
                                    height={height}
                                    onRowsRendered={onRowsRendered}
                                    overscanRowCount={0}
                                    rowCount={messages.length}
                                    rowHeight={this._cache.rowHeight}
                                    rowRenderer={this._rowRenderer}
                                    width={width}
                                />
                            );
                        }}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        );
    }
}

MessageList.defaultProps = {
    threshold: 5
};

MessageList.propTypes = {
    messages: PropTypes.array.isRequired,
    loadMoreMessages: PropTypes.func.isRequired,
    onDeleteMessage: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    threshold: PropTypes.number
};

export default MessageList;
