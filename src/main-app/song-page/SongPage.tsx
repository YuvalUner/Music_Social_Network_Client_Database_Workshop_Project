import React from "react";
import songExample from "./song_example.json";
import ratingExample from "./rating_example.json";
import CommentsSection from "./components/comments-section";
import {Box, Divider, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import SongPrimaryCard from "./components/song-primary-card";
import scaleNumToWordMapper from "./scale-num-to-word-mapper";

class SongPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
            song: {},
            songLoading: true,
            rating: NaN,
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

    // getRating = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.ratingsApiUrl}/song_rating/${this.props.songName}/${this.props.albumName}`, {
    //         method: "GET",
    //     });
    //     if (response.status === 200) {
    //         let rating: any = await response.json();
    //         this.setState({rating: rating.rating});
    //     }
    // }

    getRating = async (): Promise<void> => {
        this.setState({rating: ratingExample.rating});
    }

    async componentDidMount() {
        await this.getSong();
        await this.getRating();
    }

    createSongInfoTable = (): JSX.Element => {
        return (
            <div>
                <SongPrimaryCard
                    songName={this.state.song.song_name}
                    albumName={this.props.albumName}
                    artists={this.props.artists}
                />
                <Table>
                    <TableRow>
                        <TableCell>Artist(s)</TableCell>
                        <TableCell>{this.props.artists.join(", ")}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Album</TableCell>
                        <TableCell>{this.props.albumName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Rating</TableCell>
                        <TableCell>{this.state.rating.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Release date</TableCell>
                        <TableCell>{this.state.song.release_date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Energy</TableCell>
                        <TableCell>{this.state.song.energy}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>
                            {`${scaleNumToWordMapper(this.state.song.key)} ${this.state.song.is_major === 0 ? "minor" : "major"}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Spotify link</TableCell>
                        <TableCell><Link
                            href={`https://open.spotify.com/track/${this.state.song.song_spotify_id}`}
                            target="_blank"
                        >
                            {`https://open.spotify.com/track/${this.state.song.song_spotify_id}`}
                        </Link></TableCell>
                    </TableRow>
                </Table>
            </div>
        );
    }


    render() {
        return (
            <Stack
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {this.state.songLoading ? <div>Loading...</div> : this.createSongInfoTable()}
                    <CommentsSection
                        songName={this.props.songName}
                        albumName={this.props.albumName}
                        username={this.props.username}
                        key={this.props.songName + this.props.albumName}/>
            </Stack>
        );
    }
}

export default SongPage;