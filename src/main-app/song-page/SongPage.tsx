import React from "react";
import songExample from "./song_example.json";
import CommentsSection from "./components/comments-section";

class SongPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
            song: {},
            songLoading: true,
        };
    }

    // getSong = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_by_name_and_album/${this.props.song_name}/${this.props.album_name}`, {
    //         method: "GET",
    //     });
    //     if (response.status === 200) {
    //         let song: any = await response.json();
    //         this.setState({song: song, songLoading: false});
    //     }
    //     else{
    //         this.setState({songLoading: false});
    //     }
    // }

    getSong = async (): Promise<void> => {
        this.setState({songLoading: false, song: songExample});
    }

    async componentDidMount() {
        await this.getSong();
    }

    createSongInfoTable = (): JSX.Element => {
        return(
            <div>
                <h1>{this.state.song.song_name}</h1>
                <h2>{this.props.albumName}</h2>
                <h3>{this.props.artists}</h3>
                <h4>{this.state.song.energy}</h4>
            </div>
        );
    }



    render() {
        return (
            <div className={"d-flex align-items-center justify-content-center"}>
                {this.state.songLoading ? <div>Loading...</div> : this.createSongInfoTable()}
                <CommentsSection
                    songName={this.props.songName}
                    albumName={this.props.albumName}
                    username={this.props.username}/>
            </div>
        );
    }
}

export default SongPage;