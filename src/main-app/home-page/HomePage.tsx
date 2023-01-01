import React from 'react';
import {Box, CircularProgress, IconButton, Stack} from "@mui/material";
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * The home page of the app.
 */
class HomePage extends React.Component<any, any> {

    render() {
        return (
            <Stack spacing={2}>
                <Stack direction={"row"}>
                    <h1>
                        Home Page
                    </h1>
                    <IconButton color={"primary"} title={"Refresh home page"}
                                onClick={async () => await this.props.refreshHomePage()}>
                        <RefreshIcon/>
                    </IconButton>
                </Stack>
                <Box sx={{
                    alignSelf: "start"
                }}>
                <h3>
                    Here are some random songs you may like
                </h3>
                </Box>
                {this.props.homeLoading ?
                    <div>
                        <div className={"mb-3"}>
                            Loading home page...
                        </div>
                        <CircularProgress/>
                    </div>
                    // Display the random songs list.
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