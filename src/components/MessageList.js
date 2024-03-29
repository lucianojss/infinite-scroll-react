import React, { PureComponent } from 'react';
import 'react-virtualized/styles.css';
import PropTypes from 'prop-types';
import { AutoSizer, List, InfiniteLoader, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import MessageCard from './MessageCard';
import MessageCardPlaceholder from './MessageCardPlaceholder';
import CircularProgress from '@material-ui/core/CircularProgress';
import SwipeOut from './SwipeOut';
import FillScreen from './FillScreen';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    circularProgress: {
        textAlign: 'center',
        padding: 10
    }
});

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
        const index = this.props.messages.findIndex(message => message.id === id);
        this.props.onDismiss(id);

        this._cache.clear(index, 0);
        this._list.recomputeRowHeights(index);
    }

    loadMore({ startIndex, stopIndex }) {
        if (stopIndex + this.props.threshold >= this.props.messages.length && !this.props.loading) {
            return this.props.loadMoreMessages();
        }
    }

    _rowRenderer = ({ index, key, parent, style }) => {
        const { messages } = this.props;
        const content = (
            <SwipeOut id={messages[index].id} onDismiss={this.onDelete}>
                <MessageCard {...messages[index]} />
            </SwipeOut>
        );

        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
                mostRecentWidth={this._mostRecentWidth}
            >
                <div style={style}>{content}</div>
            </CellMeasurer>
        );
    };

    _calculateRowHeights() {
        this._cache.clearAll();
        if (this._list) this._list.recomputeRowHeights();
    }

    render() {
        const { messages, hasMore, loading, classes } = this.props;
        if (loading && messages.length === 0) {
            return (
                <FillScreen>
                    <MessageCardPlaceholder />
                </FillScreen>
            );
        } else {
            return (
                <section>
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
                                            if (this._mostRecentWidth && this._mostRecentWidth !== width) {
                                                setTimeout(() => {
                                                    this._calculateRowHeights();
                                                }, 0);
                                            }

                                            this._mostRecentWidth = width;

                                            return (
                                                <List
                                                    style={{ outline: 'none' }}
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
                    {loading && (
                        <div className={classes.circularProgress}>
                            <CircularProgress color="secondary" />
                        </div>
                    )}
                </section>
            );
        }
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

export default withStyles(styles)(MessageList);
