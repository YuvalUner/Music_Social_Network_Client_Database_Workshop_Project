import React from "react";
import songExample from "./song_example.json";
import ratingExample from "./rating_example.json";
import CommentsSection from "./components/comments-section";
import {Alert, Box, Button, CircularProgress, Divider, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import scaleNumToWordMapper from "./scale-num-to-word-mapper";
import StarIcon from '@mui/icons-material/Star';
import configData from "../../config.json";
import PageEnum from "../page-enum";

class SongPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
            song: {},
            songLoading: true,
            rating: NaN,
            addToFavoriteError: false,
            addToFavoriteSuccess: false
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

    goToArtistPage = (artistName: string): void => {
        this.props.setArtistName(artistName);
        this.props.setPage(PageEnum.ARTIST)
    }

    createArtistLinks = (): JSX.Element => {
        let artists: string[] = this.props.artists;
        let artistLinks: JSX.Element[] = [];
        for (let i = 0; i < artists.length; i++) {
            artistLinks.push(<Link
                href={"#"}
                onClick={() => this.goToArtistPage(artists[i])}
                key={artists[i]}>
                {artists[i]}
            </Link>);
            if (i !== artists.length - 1) {
                artistLinks.push(<span key={artists[i] + "span"}>, </span>);
            }
        }
        return <>{artistLinks}</>;
    }

    createSongInfoTable = (): JSX.Element => {
        return (
            <div>
                <Table>
                    <TableRow>
                        <TableCell>Artist(s)</TableCell>
                        <TableCell>{this.createArtistLinks()}</TableCell>
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

    // addToFavorites = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.favoriteSongsApiUrl}/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             song_name: this.state.song.song_name,
    //             album_name: this.props.albumName,
    //             artist_name: this.props.username,
    //         })});
    //     if (response.status === 201) {
    //         this.setState({addToFavoritesSuccess: true, addToFavoritesError: false});
    //     }
    //     else{
    //         this.setState({addToFavoritesSuccess: false, addToFavoritesError: true});
    //     }
    // }

    addToFavorites = async (): Promise<void> => {
        this.setState({addToFavoritesSuccess: true, addToFavoritesError: false});
    }


    render() {
        return (
            <Stack
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Stack direction={"row"} spacing={6}>
                    <EntityPrimaryCard
                        name={this.state.song.song_name}
                        albumName={this.props.albumName}
                        artists={this.props.artists}
                    />
                    <Stack justifyContent={"center"}>
                        <Button
                            variant={"outlined"}
                            size={"small"}
                            endIcon={<StarIcon/>}
                            onClick={async () => this.addToFavorites()}
                            color={this.state.addToFavoritesError ? "error" : this.state.addToFavoritesSuccess ? "success" : "primary"}
                        >
                            Add to favorites
                        </Button>
                        {this.state.addToFavoritesError && <Alert severity={"error"}>
                            Error adding to favorites - song is already in your favorites
                        </Alert>}
                        {this.state.addToFavoritesSuccess && <Alert severity={"success"}>
                            Song added to favorites
                        </Alert>}
                    </Stack>
                </Stack>
                {this.state.songLoading ? <div>
                    <div>
                        Loading...
                    </div>
                    <CircularProgress/>
                </div> : this.createSongInfoTable()}
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