import React from "react";
import DiscoverTab from "./discover-tab/DiscoverTab";
import HomePage from "./home-page/HomePage";
import ArtistPage from "./artist-page/ArtistPage";
import SongPage from "./song-page/SongPage";
import PageEnum from "./page-enum";
import MenuSideBar from "./side-bar/MenuSideBar";
import AddSongPage from "./add-song-page/AddSongPage";
import FavoriteSongsPage from "./favorite-songs-page/FavoriteSongsPage";
import AlbumPage from "./album-page/AlbumPage";
import ArtistRecommendationPage from "./artist-recommendation-page/ArtistRecommendationPage";
import AlbumRecommendationsPage from "./album-recommendations-page/AlbumRecommendationsPage";
import AddAlbumPage from "./add-album-page/AddAlbumPage";
import {Box, CssBaseline, Divider, Stack} from "@mui/material";
import SearchTypes from "./search/search-type-enum";
import SearchTab from "./search/SearchTab";
import SearchResultsPage from "./search/SearchResultsPage";
import TopSongsPage from "./top-songs-page/TopSongsPage";
import configData  from "../config.json";

/**
 * The main app component.
 * Responsible for rendering all other components in the app, and choosing which ones to render.
 * Also responsible for handling the state of the app, as well as fetching results for the home page.
 */
class MainApp extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            page: PageEnum.HOME,
            artist_name: "",
            song_name: "",
            album_name: "",
            searchQuery: "",
            searchType: SearchTypes.EXACT,
            homeSearchResults: [],
            homeLoading: true
        }
    }

    discoverTabWidth = 20;
    sideTabWidth = 20;

    /**
     * Sets the name or names of the artist(s) to be displayed in the current page, if they are needed.
     * @param artist_name a string or list of strings representing the name(s) of the artist(s) to be displayed.
     */
    setArtistName = (artist_name: string | [string]): void => {
        this.setState({artist_name: artist_name});
    }

    /**
     * Sets the name of the song to be displayed in the current page, if it is needed.
     * @param song_name
     */
    setSongName = (song_name: string): void => {
        this.setState({song_name: song_name});
    }

    /**
     * Sets the name of the album to be displayed in the current page, if it is needed.
     * @param album_name
     */
    setAlbumName = (album_name: string): void => {
        this.setState({album_name: album_name});
    }

    /**
     * Sets the search type to be used when searching for songs.
     * @param searchType a string representing the search type to be used, either "1" or "0".
     * Done as a string due to the radio buttons settings string values instead of integers.
     */
    setSearchType = (searchType: string): void => {
        this.setState({searchType: parseInt(searchType)});
    }

    /**
     * Sets the search query to be used when searching for songs.
     * @param e an event object containing the search query.
     */
    setSearchQuery = (e: any): void => {
        this.setState({searchQuery: e.target.value});
    }

    /**
     * Sets the current page to be displayed.
     * @param page A PageEnum value representing the page to be displayed.
     */
    setPage = (page: PageEnum): void => {
        this.setState({page: page});
    }

    /**
     * Fetches the results to be displayed on the home page from the API.
     */
    getHomePageResults = async (): Promise<void> => {
        this.setState({homeLoading: true});
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/random/100`, {
            method: 'GET'
        });
        let data: any = await response.json();
        this.setState({homeSearchResults: data, homeLoading: false});
    }

    async componentDidMount() {
        await this.getHomePageResults();
    }

    render() {
        return (
            <Box sx={{
                    display: "flex"
                }}
            >
                <CssBaseline />
                {/*Discover tab displayed on the left hand side of the page*/}
                <DiscoverTab
                    username={this.props.username}
                    setArtistName={this.setArtistName}
                    setSongName={this.setSongName}
                    setPage={this.setPage}
                    setAlbumName={this.setAlbumName}
                    setArtists={this.setArtistName}
                    width={this.discoverTabWidth}
                />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, marginLeft: `${this.discoverTabWidth}%`, marginRight: `${this.sideTabWidth}%` }}
                >
                    <Stack sx={{
                    }}
                           divider={<Divider orientation="vertical" flexItem/>}
                           spacing={2}
                    >
                        {/*Search tab displayed on the top of the page, between discover tab and menu*/}
                        <SearchTab
                            searchQuery={this.state.searchQuery}
                            setSearchQuery={this.setSearchQuery}
                            searchType={this.state.searchType}
                            setSearchType={this.setSearchType}
                            setPage={this.setPage}
                        />
                        {/*Each condition is for a page displayed in the center of the page, depending on the current
                        value of this.state.page */}
                        {this.state.page === PageEnum.HOME && <HomePage
                            refreshHomePage={this.getHomePageResults}
                            homeSearchResults={this.state.homeSearchResults}
                            homeLoading={this.state.homeLoading}
                            setPage={this.setPage}
                            setArtistName={this.setArtistName}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                        />}
                        {this.state.page === PageEnum.ALBUM &&
                            <AlbumPage
                                albumName={this.state.album_name}
                                setPage={this.setPage}
                                setArtistName={this.setArtistName}
                                artists={this.state.artist_name}
                                setAlbumName={this.setAlbumName}
                                setSongName={this.setSongName}
                                key={this.state.album_name}
                            />}
                        {this.state.page === PageEnum.ARTIST && <ArtistPage
                            artistName={this.state.artist_name}
                            setPage={this.setPage}
                            setAlbumName={this.setAlbumName}
                            key={this.state.artist_name}
                        />}
                        {this.state.page === PageEnum.SONG && <SongPage
                            albumName={this.state.album_name}
                            songName={this.state.song_name}
                            artists={this.state.artist_name}
                            username={this.props.username}
                            setPage={this.setPage}
                            setAlbumName={this.setAlbumName}
                            setArtistName={this.setArtistName}
                            key={this.state.song_name + this.state.album_name + this.state.artist_name}
                        >
                        </SongPage>}
                        {this.state.page === PageEnum.ADD_SONG && <AddSongPage
                            username={this.props.username}
                        />}
                        {this.state.page === PageEnum.FAVORITE_SONGS && <FavoriteSongsPage
                            username={this.props.username}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                            setArtistName={this.setArtistName}
                            setPage={this.setPage}
                        />}
                        {this.state.page === PageEnum.ARTIST_RECOMMENDATION && <ArtistRecommendationPage
                            username={this.props.username}
                            setPage={this.setPage}
                            setArtistName={this.setArtistName}
                        />}
                        {this.state.page === PageEnum.ALBUM_RECOMMENDATION && <AlbumRecommendationsPage
                            username={this.props.username}
                            setPage={this.setPage}
                            setAlbumName={this.setAlbumName}
                            setArtistName={this.setArtistName}
                        />}
                        {this.state.page === PageEnum.ADD_ALBUM && <AddAlbumPage
                            username={this.props.username}
                        />}
                        {this.state.page === PageEnum.SEARCH_RESULTS && <SearchResultsPage
                            searchQuery={this.state.searchQuery}
                            searchType={this.state.searchType}
                            setPage={this.setPage}
                            setArtistName={this.setArtistName}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                            key={this.state.searchQuery + this.state.searchType}
                        />}
                        {this.state.page === PageEnum.TOP_SONGS && <TopSongsPage
                            setPage={this.setPage}
                            setArtistName={this.setArtistName}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                        />}
                    </Stack>
                </Box>
                {/*The menu displayed on the right hand side of the page*/}
                <MenuSideBar
                    username={this.props.username}
                    setArtistName={this.setArtistName}
                    setPage={this.setPage}
                    width={this.sideTabWidth}
                />
            </Box>
        );
    }
}

export default MainApp;