import React from "react";
import DiscoverTab from "./discover-tab/DiscoverTab";
import HomePage from "./home-page/HomePage";
import ArtistPage from "./artist-page/ArtistPage";
import SongPage from "./song-page/SongPage";
import PageEnum from "./page-enum";

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
                    {this.state.page === PageEnum.ARTIST && <ArtistPage></ArtistPage>}
                    {this.state.page === PageEnum.SONG && <SongPage
                        albumName={this.state.album_name}
                        songName={this.state.song_name}
                        artists={this.state.artist_name}
                        username={this.props.username}>
                    </SongPage>}
                </div>
            </div>
        );
    }
}

export default MainApp;