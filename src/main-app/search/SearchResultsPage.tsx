import React from "react";
import SearchTypes from "./search-type-enum";
import configData from "../../config.json";
import searchResults from "./approx_search_results_example.json";
import {Box, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";

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
                {!this.state.searchResultsLoading && this.state.searchResults.length > 0 &&
                    <SongWithAlbumAndArtistsList
                        searchResults={this.state.searchResults}
                        setSongName={this.props.setSongName}
                        setAlbumName={this.props.setAlbumName}
                        setArtistName={this.props.setArtistName}
                        setPage={this.props.setPage}

                    />
                }
                {!this.state.searchResultsLoading && this.state.searchResults.length === 0 &&
                    <div>
                        No results found.
                    </div>
                }
            </Box>
        );
    }
}

export default SearchResultsPage;