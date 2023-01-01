import React from "react";
import {Alert, Rating, Stack, TextField} from "@mui/material";
import configData from "../../../config.json";

class AddCommentSubsection extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            comment: "",
            rating: 1,
            commentError: false,
            commentEmptyError: false,
        }
    }

    checkComment = (): boolean => {
        if (this.state.comment === "") {
            this.setState({commentEmptyError: true});
            return false;
        } else {
            this.setState({commentEmptyError: false});
            return true;
        }
    }

    addComment = async (e): Promise<void> => {
        e.preventDefault();
        if (this.checkComment()) {
            let response: Response = await fetch(`${configData.apiBaseUrl}${configData.commentsApiUrl}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    song_name: this.props.songName,
                    album_name: this.props.albumName,
                    comment: this.state.comment,
                    rating: this.state.rating,
                    artist_name: this.props.username
                })
            });
            if (response.status === 201) {
                this.setState({comment: ""});
                await this.props.refreshComments();
                await this.props.refreshRating();
            } else {
                this.setState({commentError: true});
            }
        }
    }

    componentDidMount() {
        this.setState({comment: ""});
    }

    // async addComment(event: any) {
    //     event.preventDefault();
    //     if (this.checkComment()) {
    //         console.log("Add comment: " + this.state.comment + " with rating: " + this.state.rating);
    //         this.setState({comment: ""});
    //     }
    // }

    render() {
        return (
            <Stack>
                <form className={"form-group"} onSubmit={async e => this.addComment(e)}>
                    <div className={"input-group"}>
                        <TextField className={"col-4"}
                                   error={this.state.commentEmptyError}
                                   helperText={this.state.commentEmptyError ? "Comment cannot be empty" : ""}
                                   id="add-comment-text-field"
                                   label="Add a comment"
                                   multiline
                                   maxRows={4}
                                   value={this.state.comment}
                                   onChange={(event: any) => {
                                       this.setState({comment: event.target.value});
                                   }}
                        />
                        <Rating className={"mt-3 ms-2 col-3"}
                                name="add-comment-rating"
                                value={this.state.rating}
                                defaultValue={1}
                                onChange={(event, newValue) => {
                                    this.setState({rating: newValue});
                                }}
                        />
                        <div className={"ms-4 col-3"}>
                            <button type={"submit"} className={"btn btn-primary mt-2 btn-sm"}>
                                Add comment
                            </button>
                        </div>
                    </div>
                </form>
                {this.state.commentError && <Alert severity={"error"}>You can not add 2 comments on the same song</Alert>}
            </Stack>
        )
    }
}

export default AddCommentSubsection;