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

class MainApp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            page: PageEnum.HOME,
            artist_name: "",
            song_name: "",
            album_name: "",
        }
    }

    setArtistName = (artist_name: string | [string]): void => {
        this.setState({artist_name: artist_name});
    }

    setSongName = (song_name: string): void => {
        this.setState({song_name: song_name});
    }

    setAlbumName = (album_name: string): void => {
        this.setState({album_name: album_name});
    }

    setPage = (page: PageEnum): void => {
        this.setState({page: page});
    }

    render() {
        return (
            <div className={"h-100"}>
                <DiscoverTab
                    username={this.props.username}
                    setArtistName={this.setArtistName}
                    setSongName={this.setSongName}
                    setPage={this.setPage}
                    setAlbumName={this.setAlbumName}
                    setArtists={this.setArtistName}
                />
                <div className={"d-flex align-items-center justify-content-center"}>
                    {this.state.page === PageEnum.HOME && <HomePage></HomePage>}
                    {this.state.page === PageEnum.ALBUM && <AlbumPage album_name={this.state.album_name}></AlbumPage>}
                    {this.state.page === PageEnum.ARTIST && <ArtistPage></ArtistPage>}
                    {this.state.page === PageEnum.SONG && <SongPage
                        albumName={this.state.album_name}
                        songName={this.state.song_name}
                        artists={this.state.artist_name}
                        username={this.props.username}>
                    </SongPage>}
                    {this.state.page === PageEnum.ADD_SONG && <AddSongPage/>}
                    {this.state.page === PageEnum.FAVORITE_SONGS && <FavoriteSongsPage/>}
                    {this.state.page === PageEnum.ARTIST_RECOMMENDATION && <ArtistRecommendationPage/>}
                    {this.state.page === PageEnum.ALBUM_RECOMMENDATION && <AlbumRecommendationsPage/>}
                    {this.state.page === PageEnum.ADD_ALBUM && <AddAlbumPage/>}
                </div>
                <MenuSideBar
                    username={this.props.username}
                    setPage={this.setPage}
                />
            </div>
        );
    }
}

export default MainApp;