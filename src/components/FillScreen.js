import React from 'react';
import PropTypes from 'prop-types';

class FillScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numItems: 1
        };
    }

    componentDidMount() {
        const { childenHeight } = this.props;
        this.setState({
            numItems: Math.floor(window.outerHeight / childenHeight)
        });
    }

    render() {
        const { children } = this.props;
        const { numItems } = this.state;

        return new Array(numItems).fill(children);
    }
}

FillScreen.defaultProps = {
    childenHeight: 50
};

FillScreen.propTypes = {
    children: PropTypes.element.isRequired,
    childenHeight: PropTypes.number
};

export default FillScreen;
