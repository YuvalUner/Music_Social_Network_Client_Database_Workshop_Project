import React from "react";
import {Alert, Button, Divider, FormControl, Stack, TextField} from "@mui/material";
import configData from "../../config.json";

/**
 * A page with a form for adding an album to the database.
 */
class AddAlbumPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            albumName: "",
            spotifyId: "",
            albumNameEmptyError: false,
            addAlbumSuccess: false,
            addAlbumError: false
        }
    }

    /**
     * Checks if the user's input is valid.
     */
    checkValidity = (): boolean => {
        if (this.state.albumName === "") {
            this.setState({albumNameEmptyError: true});
            return false;
        } else {
            this.setState({albumNameEmptyError: false});
            return true;
        }
    }

    /**
     * Sends a request to the server to add an album to the database.
     * Sets the state of the component to show a success or error message.
     * @param e
     */
    addAlbum = async (e: any): Promise<void> => {
        e.preventDefault();
        if (this.checkValidity()) {
            let response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    album_name: this.state.albumName,
                    album_spotify_id: this.state.spotifyId
                })
            });
            if (response.status === 201) {
                response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/add_artist_connector`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        album_name: this.state.albumName,
                        artist_name: this.props.username
                    })
                });
                if (response.status === 201) {
                    this.setState({addAlbumSuccess: true});
                }
                else{
                    this.setState({addAlbumError: true});
                }
            }
            else {
                this.setState({addAlbumError: true, addAlbumSuccess: false});
            }
        }
    }

    // addAlbum = async (e: any): Promise<void> => {
    //     e.preventDefault();
    //     if (this.checkValidity()){
    //         this.setState({addAlbumSuccess: true});
    //     }
    // }

    render() {
        return (
            <Stack alignItems={"start"}
                   divider={<Divider orientation="vertical" flexItem/>}
                   spacing={2}
            >
                <h1>Add Album</h1>
                <form onSubmit={async e => await this.addAlbum(e)}>
                    <Stack spacing={2}>
                        <TextField
                            variant={"outlined"}
                            label={"Album Name"}
                            required={true}
                            error={this.state.albumNameEmptyError}
                            helperText={this.state.albumNameEmptyError ? "Album name cannot be empty" : ""}
                            value={this.state.albumName}
                            onChange={e => this.setState({albumName: e.target.value})}
                        />
                        <TextField
                            variant={"outlined"}
                            label={"Spotify id"}
                            value={this.state.spotifyId}
                            onChange={e => this.setState({spotifyId: e.target.value})}
                        />
                        <Button type={"submit"} variant={"contained"}>
                            Add Album
                        </Button>
                        {this.state.addAlbumSuccess && <Alert severity={"success"}>Album added successfully</Alert>}
                        {this.state.addAlbumError && <Alert severity={"error"}>
                            Error adding album - album with this name already exists
                        </Alert>}
                    </Stack>
                </form>
            </Stack>
        );
    }
}

export default AddAlbumPage;