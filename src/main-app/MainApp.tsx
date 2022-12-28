import React from "react";
import DiscoverTab from "./discover-tab/DiscoverTab";
import HomePage from "./home-page/HomePage";
import ArtistPage from "./artist-page/ArtistPage";
import SongPage from "./song-page/SongPage";

class MainApp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            page: "home",
            artist_name: "",
            song_name: "",
            album_name: "",
        }
    }

    setArtistName = (artist_name: string): void => {
        this.setState({artist_name: artist_name});
    }

    setSongName = (song_name: string): void => {
        this.setState({song_name: song_name});
    }

    setAlbumName = (album_name: string): void => {
        this.setState({album_name: album_name});
    }

    setPage = (page: string): void => {
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
                />
                <div className={"d-flex align-items-center justify-content-center"}>
                    {this.state.page === "home" && <HomePage></HomePage>}
                    {this.state.page === "artist" && <ArtistPage></ArtistPage>}
                    {this.state.page === "song" && <SongPage></SongPage>}
                </div>
            </div>
        );
    }
}

export default MainApp;