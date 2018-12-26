import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

const className = {
    transition: 'transform 0.5s ease'
};
class SwipeOut extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            controlledPosition: { x: 0, y: 0 },
            opacity: 1
        };

        this.onDrag = this.onDrag.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    onDrag(e, data) {
        this.setState({
            opacity: 1 - (0.5 * data.x) / this.node.clientWidth
        });
    }

    onStop(e, data) {
        const limitValue = this.node.clientWidth * 0.5;

        if (data.x > limitValue) {
            this.props.onDismiss(this.props.id);
        }

        this.setState({
            opacity: 1
        });
    }

    render() {
        const { children } = this.props;
        return (
            <Draggable
                axis="x"
                bounds={{ left: 0 }}
                position={this.state.controlledPosition}
                onDrag={this.onDrag}
                onStop={this.onStop}
            >
                <div style={{ opacity: this.state.opacity }} ref={c => (this.node = c)}>
                    {children}
                </div>
            </Draggable>
        );
    }
}

SwipeOut.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default SwipeOut;
