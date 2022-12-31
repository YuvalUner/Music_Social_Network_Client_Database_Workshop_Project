import React from 'react';
import {CircularProgress, IconButton, Stack} from "@mui/material";
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";
import RefreshIcon from '@mui/icons-material/Refresh';

class HomePage extends React.Component<any, any> {

    render() {
        return (
            <Stack alignItems={"start"} spacing={2}>
                <Stack direction={"row"}>
                    <h1>
                        Home Page
                    </h1>
                    <IconButton color={"primary"} title={"Refresh home page"}
                                onClick={async () => await this.props.refreshHomePage()}>
                        <RefreshIcon/>
                    </IconButton>
                </Stack>
                <h3>
                    Here are some random songs you may like
                </h3>
                {this.props.homeLoading ?
                    <div>
                        <div className={"mb-3"}>
                            Loading home page...
                        </div>
                        <CircularProgress/>
                    </div>
                    : <SongWithAlbumAndArtistsList
                        searchResults={this.props.homeSearchResults}
                        setSongName={this.props.setSongName}
                        setArtistName={this.props.setArtistName}
                        setAlbumName={this.props.setAlbumName}
                        setPage={this.props.setPage}
                    />
                }
            </Stack>
        );
    }
}

export default HomePage;