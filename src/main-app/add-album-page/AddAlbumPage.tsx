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
            const response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.albumName,
                    artist: this.props.username
                })
            });
            if (response.status === 201) {
                this.setState({addAlbumSuccess: true});
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
                            error={this.state.albumNameEmptyError}
                            helperText={this.state.albumNameEmptyError ? "Album name cannot be empty" : ""}
                            value={this.state.albumName}
                            onChange={e => this.setState({albumName: e.target.value})}
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