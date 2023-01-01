import React from 'react';
import {Box, CircularProgress, Stack} from "@mui/material";
import configData from "../../config.json";
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";
import favoriteSongs from "./favorite_songs_example.json";

/**
 * The page that displays the user's favorite songs.
 */
class FavoriteSongsPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            favoriteSongs: [],
            favoriteSongLoading: true
        };
    }

    // /**
    //  * Makes a request to the backend to get the user's favorite songs.
    //  */
    // getFavoriteSongs = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.favoriteSongsApiUrl}/${this.props.username}`, {
    //         method: "GET",
    //     })
    //     if (response.status === 200) {
    //         let favoriteSongs: any = await response.json();
    //         this.setState({favoriteSongs: favoriteSongs, favoriteSongLoading: false});
    //     } else {
    //         this.setState({favoriteSongLoading: false});
    //     }
    // }

    getFavoriteSongs = async (): Promise<void> => {
      this.setState({favoriteSongs: favoriteSongs, favoriteSongLoading: false});
    }

    async componentDidMount() {
        await this.getFavoriteSongs();
    }

    render() {
        return (
            <Box>
                <Stack>
                    <h1>Favorite Songs</h1>
                    {/*Display a loading icon while loading*/}
                    {this.state.favoriteSongLoading &&
                        <div>
                            <div className={"mb-4"}>
                                Loading...
                            </div>
                            <div>
                                <CircularProgress/>
                            </div>
                        </div>}
                    {/*Display the favorite songs*/}
                    {!this.state.favoriteSongLoading && this.state.favoriteSongs.length > 0 &&
                        <SongWithAlbumAndArtistsList
                            searchResults={this.state.favoriteSongs}
                            setSongName={this.props.setSongName}
                            setAlbumName={this.props.setAlbumName}
                            setArtistName={this.props.setArtistName}
                            setPage={this.props.setPage}
                        />}
                    {/*If the favorite songs list is empty*/}
                    {!this.state.favoriteSongLoading && this.state.favoriteSongs.length === 0 &&
                        <div>
                            You have no favorite songs.
                        </div>
                    }
                </Stack>
            </Box>
        );
    }
}

export default FavoriteSongsPage;