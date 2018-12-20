import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Draggable from 'react-draggable';

const styles = theme => ({
    card: {
        marginLeft: 16,
        marginRight: 16,
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
        this.state = { controlledPosition: { x: 0, y: 0 } };
        this.onDrag = this.onDrag.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    onDrag(e, data) {
        //console.log('Event: ', e);
        // console.log('Data: ', data);
    }

    onStop(e, data) {
        const limitValue = this._card.clientWidth * 0.5;

        if (data.x > limitValue) {
            this.props.onDelete(this.props.id);
        } else {
            this.setState({
                controlledPosition: { x: 0, y: 0 }
            });
        }
    }

    render() {
        const { author, content, updated, style, classes } = this.props;

        return (
            <Draggable
                ref={node => (this.card = node)}
                axis="x"
                bounds={{ left: 0 }}
                position={this.state.controlledPosition}
                onDrag={this.onDrag}
                onStop={this.onStop}
            >
                <div ref={c => (this._card = c)}>
                    <Card className={classes.card} style={style}>
                        <CardHeader
                            className={classes.avatar}
                            avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                            title={author.name}
                            subheader={moment(updated).fromNow()}
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
