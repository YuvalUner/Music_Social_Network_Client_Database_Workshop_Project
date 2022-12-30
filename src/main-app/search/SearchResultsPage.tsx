import React from "react";
import SearchTypes from "./search-type-enum";
import configData from "../../config.json";
import searchResults from "./approx_search_results_example.json";
import {Box, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Md5} from "ts-md5";
import PageEnum from "../page-enum";

class SearchResultsPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [],
            searchResultsLoading: true,
        }
    }

    getSearchResults = async (): Promise<void> => {
        let searchTypeStr: string = this.props.searchType === SearchTypes.EXACT ? "exact" : "approx";
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/${searchTypeStr}/${this.props.searchQuery}`, {
            method: "GET",
        })
        if (response.status === 200) {
            let searchResults: any = await response.json();
            this.setState({searchResults: searchResults, searchResultsLoading: false});
        }
        else{
            this.setState({searchResultsLoading: false});
        }
    }

    // getSearchResults = async (): Promise<void> => {
    //     this.setState({searchResults: searchResults, searchResultsLoading: false});
    // }

    async componentDidMount() {
        await this.getSearchResults();
    }

    goToSongPage = (song_name: string, album_name: string, artists: string | [string]): void => {
        this.props.setSongName(song_name);
        this.props.setAlbumName(album_name);
        this.props.setArtistName(artists);
        this.props.setPage(PageEnum.SONG);
    }

    createSearchResultsList = (): JSX.Element => {
        return (
            <List>
                {this.state.searchResults.map((song: any) => {
                    return (
                        <ListItemButton
                            key={Md5.hashStr(`${song.song_name}${song.album_name}`)}
                            onClick={() => this.goToSongPage(song.song_name, song.album_name, song.artists)}
                        >
                            <ListItemText
                                primary={song.song_name}
                                secondary={<Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Artist(s): {song.artists.join(", ")}
                                    <br/> Album: {song.album_name}
                                    <br/> Release data: {song.release_date}
                                </Typography>}/>
                        </ListItemButton>
                    );
                })
                }
            </List>
        );
    }

    render() {
        return (
            <Box>
                {this.state.searchResultsLoading &&
                    <div>
                        <div className={"mb-4"}>
                            Loading...
                        </div>
                        <div>
                            <CircularProgress/>
                        </div>
                    </div>}
                {!this.state.searchResultsLoading &&
                    this.createSearchResultsList()
                }
            </Box>
        );
    }
}

export default SearchResultsPage;