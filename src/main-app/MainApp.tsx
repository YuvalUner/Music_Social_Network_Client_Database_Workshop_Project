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
import TopSongPage from "./top-songs-page/TopSongPage";

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
        }
    }

    discoverTabWidth = 20;
    sideTabWidth = 20;

    setArtistName = (artist_name: string | [string]): void => {
        this.setState({artist_name: artist_name});
    }

    setSongName = (song_name: string): void => {
        this.setState({song_name: song_name});
    }

    setAlbumName = (album_name: string): void => {
        this.setState({album_name: album_name});
    }

    setSearchType = (searchType: string): void => {
        this.setState({searchType: parseInt(searchType)});
    }

    setSearchQuery = (e: any): void => {
        this.setState({searchQuery: e.target.value});
    }

    setPage = (page: PageEnum): void => {
        this.setState({page: page});
    }

    render() {
        return (
            <Box sx={{
                    display: "flex"
                }}
            >
                <CssBaseline />
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
                        <SearchTab
                            searchQuery={this.state.searchQuery}
                            setSearchQuery={this.setSearchQuery}
                            searchType={this.state.searchType}
                            setSearchType={this.setSearchType}
                            setPage={this.setPage}
                        />
                        {this.state.page === PageEnum.HOME && <HomePage></HomePage>}
                        {this.state.page === PageEnum.ALBUM &&
                            <AlbumPage
                                albumName={this.state.album_name}
                                setPage={this.setPage}
                                setArtistName={this.setArtistName}
                                artists={this.state.artist_name}
                                setAlbumName={this.setAlbumName}
                                setSongName={this.setSongName}
                            />}
                        {this.state.page === PageEnum.ARTIST && <ArtistPage
                            artistName={this.state.artist_name}
                            setPage={this.setPage}
                            setAlbumName={this.setAlbumName}
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
                        {this.state.page === PageEnum.ADD_SONG && <AddSongPage/>}
                        {this.state.page === PageEnum.FAVORITE_SONGS && <FavoriteSongsPage
                            username={this.props.username}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                            setArtistName={this.setArtistName}
                            setPage={this.setPage}
                        />}
                        {this.state.page === PageEnum.ARTIST_RECOMMENDATION && <ArtistRecommendationPage/>}
                        {this.state.page === PageEnum.ALBUM_RECOMMENDATION && <AlbumRecommendationsPage/>}
                        {this.state.page === PageEnum.ADD_ALBUM && <AddAlbumPage/>}
                        {this.state.page === PageEnum.SEARCH_RESULTS && <SearchResultsPage
                            searchQuery={this.state.searchQuery}
                            searchType={this.state.searchType}
                            setPage={this.setPage}
                            setArtistName={this.setArtistName}
                            setSongName={this.setSongName}
                            setAlbumName={this.setAlbumName}
                            key={this.state.searchQuery + this.state.searchType}
                        />}
                        {this.state.page === PageEnum.TOP_SONGS && <TopSongPage/>}
                    </Stack>
                </Box>
                <MenuSideBar
                    username={this.props.username}
                    setPage={this.setPage}
                    width={this.sideTabWidth}
                />
            </Box>
        );
    }
}

export default MainApp;