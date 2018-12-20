import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Draggable from 'react-draggable';

const styles = theme => ({
    card: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8
        // opacity: 1,
        // transition: 'transform 0.3s ease 0s, opacity 0.5s ease 0s'
    },
    avatar: {
        paddingBottom: 0
    }
});

class MessageCard extends React.Component {
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
            this.props.onDelete(this.props.id);
            this.setState({
                opacity: 1
            });
        } else {
            this.setState({
                controlledPosition: { x: 0, y: 0 },
                opacity: 1
            });
        }
    }

    render() {
        const { author, content, updated, style, classes } = this.props;

        return (
            <Draggable
                axis="x"
                bounds={{ left: 0 }}
                position={this.state.controlledPosition}
                onDrag={this.onDrag}
                onStop={this.onStop}
            >
                <div style={{ touchAction: 'manipulation', opacity: this.state.opacity }} ref={c => (this.node = c)}>
                    <Card className={classes.card} style={style}>
                        <CardHeader
                            className={classes.avatar}
                            avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                            title={author.name}
                            subheader={dayjs
                                .extend(relativeTime)(updated)
                                .fromNow()}
                        />
                        <CardContent>
                            <Typography variant="body2">{content}</Typography>
                        </CardContent>
                    </Card>
                </div>
            </Draggable>
        );
    }
}

MessageCard.propTypes = {
    style: PropTypes.object,
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string,
        photoUrl: PropTypes.string
    }),
    updated: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    onDelete: PropTypes.func
};

export default withStyles(styles)(MessageCard);
