import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

class SwipeOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = { controlledPosition: { x: 0, y: 0 }, opacity: 1 };
        this.onDrag = this.onDrag.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    onDrag(e, data) {
        this.setState({
            opacity: (100 - (data.x * 100) / (this.node.clientWidth * 2)) / 100
        });
    }

    onStop(e, data) {
        const limitValue = this.node.clientWidth * 0.5;

        if (data.x > limitValue) {
            this.props.onDismiss(this.props.id, this.props.index);
        } else {
            this.setState({
                controlledPosition: { x: 0, y: 0 }
            });
        }

        this.setState({
            opacity: 1
        });
    }

    render() {
        const { children, style } = this.props;
        return (
            <Draggable
                style={style}
                axis="x"
                bounds={{ left: 0 }}
                position={this.state.controlledPosition}
                onDrag={this.onDrag}
                onStop={this.onStop}
            >
                <div style={{ touchAction: 'manipulation', opacity: this.state.opacity }} ref={c => (this.node = c)}>
                    {children}
                </div>
            </Draggable>
        );
    }
}

SwipeOut.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default SwipeOut;
