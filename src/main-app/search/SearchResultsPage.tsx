import React from "react";
import SearchTypes from "./search-type-enum";
import configData from "../../config.json";
import {Box, CircularProgress} from "@mui/material";
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";

/**
 * The page that displays the results of a search query.
 * Also responsible for making the search request to the backend.
 */
class SearchResultsPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [],
            searchResultsLoading: true,
        }
    }

    /**
     * Makes a request to the backend to get the search results.
     */
    getSearchResults = async (): Promise<void> => {
        // Decide the search type and send the request to the backend.
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