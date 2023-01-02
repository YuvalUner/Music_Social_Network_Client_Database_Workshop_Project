import React from "react";
import {
    Avatar,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
    Typography
} from "@mui/material";
import {Md5} from "ts-md5";
import AddCommentSubsection from "./add-comment-subsection";
import configData from "../../../config.json";

class CommentsSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
        }
    }

    getComments = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.commentsApiUrl}/${this.props.songName}/${this.props.albumName}`, {
            method: "GET",
        });
        if (response.status === 200) {
            let comments: any = await response.json();
            this.setState({comments: comments, commentsLoading: false});
        }
        else{
            this.setState({commentsLoading: false});
        }
    }

    // getComments = async (): Promise<void> => {
    //     this.setState({commentsLoading: false, comments: commentsExample});
    // }

    async componentDidMount() {
        await this.getComments();
    }

    createCommentsList = (): JSX.Element => {
        return (
            <div>
                <List
                    sx={{
                        height:200,
                        overflow: "auto"
                    }}
                >
                    {this.state.comments.map((comment: any) => {
                        return (
                            <ListItem
                                key={Md5.hashStr
                                (`${comment.artist_name}${comment.comment}${comment.rating}`)}>
                                <ListItemAvatar>
                                    <Avatar alt={comment.artist_name}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.comment}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {comment.artist_name}
                                            </Typography>
                                            — rated this song <Rating size={"small"} readOnly value={parseInt(comment.rating)}/>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <AddCommentSubsection
                    username={this.props.username}
                    songName={this.props.songName}
                    albumName={this.props.albumName}
                    refreshComments={this.getComments}
                    refreshRating={this.props.refreshRating}
                />
            </div>
        );
    }

    render() {
        return (
            <>
                {this.state.commentsLoading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : this.createCommentsList()}
            </>
        )
    }
}

export default CommentsSection;