import React, { PureComponent } from 'react';
import 'react-virtualized/styles.css';
import PropTypes from 'prop-types';
import { AutoSizer, List, InfiniteLoader, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import MessageCard from './MessageCard';
import SwipeOut from './SwipeOut';

class MessageList extends PureComponent {
    constructor(props) {
        super(props);

        this._cache = new CellMeasurerCache({
            keyMapper: index => this.props.messages[index].id,
            fixedWidth: true
        });

        this._rowRenderer = this._rowRenderer.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(id) {
        this.props.onDismiss(id);
        this._cache.clear(id, 0);
        this._list.recomputeRowHeights(id);
    }

    loadMore({ stopIndex }) {
        if (stopIndex + this.props.threshold >= this.props.messages.length && !this.props.loading) {
            return this.props.loadMoreMessages();
        }
    }

    _rowRenderer = ({ index, key, parent, style }) => {
        const { messages } = this.props;
        const message = messages[index];

        let content;

        content = (
            <SwipeOut id={message.id} index={index} onDismiss={this.onDelete}>
                <MessageCard {...message} />
            </SwipeOut>
        );

        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
                mostRecentWidth={this.mostRecentWidth}
            >
                <div style={style}>{content}</div>
            </CellMeasurer>
        );
    };

    _resetRowHeights() {
        setTimeout(() => {
            this._cache.clearAll();
            if (this._list) this._list.recomputeRowHeights();
        }, 0);
    }

    render() {
        const { messages, hasMore } = this.props;

        return (
            <InfiniteLoader
                isRowLoaded={index => !hasMore || index < messages.length}
                loadMoreRows={this.loadMore}
                rowCount={messages.length}
            >
                {({ onRowsRendered, registerChild }) => (
                    <WindowScroller>
                        {({ height, scrollTop, isScrolling, onChildScroll }) => (
                            <AutoSizer disableHeight>
                                {({ width }) => {
                                    if (this.mostRecentWidth && this.mostRecentWidth !== width) {
                                        this._resetRowHeights();
                                    }

                                    this.mostRecentWidth = width;

                                    return (
                                        <List
                                            autoHeight
                                            ref={ref => {
                                                this._list = ref;
                                                registerChild(ref);
                                            }}
                                            deferredMeasurementCache={this._cache}
                                            height={height}
                                            onRowsRendered={onRowsRendered}
                                            overscanRowCount={10}
                                            rowCount={messages.length}
                                            rowHeight={this._cache.rowHeight}
                                            rowRenderer={this._rowRenderer}
                                            width={width}
                                            scrollTop={scrollTop}
                                            isScrolling={isScrolling}
                                            onScroll={onChildScroll}
                                        />
                                    );
                                }}
                            </AutoSizer>
                        )}
                    </WindowScroller>
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
    onDismiss: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    threshold: PropTypes.number
};

export default MessageList;
