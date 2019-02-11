import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    dragOver: {
        transition: 'transform ease 0.5s'
    }
});

class SwipeOut extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            dragging: false
        };

        this.onDrag = this.onDrag.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    onDrag(e, data) {
        this.setState({
            opacity: 1 - (0.5 * data.x) / this.node.clientWidth,
            dragging: true
        });
    }

    onStop(e, data) {
        const limitValue = this.node.clientWidth * 0.5;

        if (data.x > limitValue) {
            this.props.onDismiss(this.props.id);
            this.setState({
                opacity: 1
            });
        } else {
            this.setState({
                opacity: 1,
                dragging: false
            });
        }
    }

    render() {
        const { children, classes } = this.props;
        const { dragging } = this.state;

        return (
            <Draggable
                axis="x"
                bounds={{ left: 0 }}
                position={{ x: 0, y: 0 }}
                onDrag={this.onDrag}
                onStop={this.onStop}
            >
                <div
                    style={{ opacity: this.state.opacity, touchAction: 'manipulation' }}
                    className={dragging ? {} : classes.dragOver}
                    ref={c => (this.node = c)}
                >
                    {children}
                </div>
            </Draggable>
        );
    }
}

SwipeOut.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default withStyles(styles)(SwipeOut);
