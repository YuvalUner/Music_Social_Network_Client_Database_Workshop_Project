import React from "react";
import commentsExample from "../comments_example.json";
import StarIcon from "@mui/icons-material/Star";
import {CircularProgress, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography} from "@mui/material";
import {Md5} from "ts-md5";
import AddCommentSubsection from "./add-comment-subsection";

class CommentsSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
        }
    }

    // getComments = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.commentsApiUrl}/${this.props.songName}/${this.props.albumName}`, {
    //         method: "GET",
    //     });
    //     if (response.status === 200) {
    //         let comments: any = await response.json();
    //         this.setState({comments: comments, commentsLoading: false});
    //     }
    //     else{
    //         this.setState({commentsLoading: false});
    //     }
    // }

    getComments = async (): Promise<void> => {
        this.setState({commentsLoading: false, comments: commentsExample});
    }

    async componentDidMount() {
        await this.getComments();
    }

    createStars = (rating: number): JSX.Element => {
        let stars: number[] = [];
        for (let i = 0; i < rating; i++) {
            stars.push(i);
        }
        return (
            <>
                {stars.map((star: number) => {
                    return (
                        <StarIcon key={star}/>
                    );
                })}
            </>
        );
    }

    createCommentsList = (): JSX.Element => {
        return (
            <div>
                <List>
                    {this.state.comments.map((comment: any) => {
                        return (
                            <ListItem
                                key={Md5.hashStr
                                (`${comment.artist_name}${comment.comment}${comment.rating}`)}>
                                <ListItemAvatar>

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
                                            — rated this song {this.createStars(parseFloat(comment.rating))}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                    <ListSubheader>
                        <div>
                            <Typography variant={"h5"}>Add a comment</Typography>
                        </div>
                        <AddCommentSubsection
                            username={this.props.username}
                            songName={this.props.songName}
                            albumName={this.props.albumName}
                            refreshComments={this.getComments}
                        />
                    </ListSubheader>
                </List>
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