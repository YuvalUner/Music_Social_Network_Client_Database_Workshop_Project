import React from "react";
import CommentsSection from "./components/comments-section";
import {Alert, Button, CircularProgress, Divider, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import scaleNumToWordMapper from "./scale-num-to-word-mapper";
import StarIcon from '@mui/icons-material/Star';
import configData from "../../config.json";
import PageEnum from "../page-enum";
import ArtistsListWithLinks from "../general-components/artists-list-with-links";
import {millisToMinutesAndSeconds} from "../general-components/time-converter";

/**
 * SongPage is the page that displays the song's information.
 * It displays information such as the song's name, album, artists, duration, and rating, and the comments on it.
 */
class SongPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            comments: [],
            commentsLoading: true,
            song: {},
            artists: [],
            songLoading: true,
            rating: NaN,
            addToFavoriteError: false,
            addToFavoriteSuccess: false
        };
    }

    /**
     * getSong gets the song's information from the API.
     * If successful, it sets the song's information to the state.
     * Regardless of success, it sets the songLoading state to false, so that the page can be rendered.
     */
    getSong = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_by_name_and_album/${this.props.songName}/${this.props.albumName}`, {
            method: "GET",
        });
        if (response.status === 200) {
            let song: any = await response.json();
            this.setState({song: song});
        }
    }

    getSongArtists = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/get_artists/${this.props.albumName}`, {
            method: "GET",
        });
        if (response.status === 200) {
            let artists: any = await response.json();
            this.setState({artists: artists});
        }
    }

    // getSong = async (): Promise<void> => {
    //     this.setState({songLoading: false, song: songExample});
    // }

    /***
     * Gets the song's rating from the API.
     * If successful, it sets the song's rating to the state.
     */
    getRating = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/song_rating/${this.props.songName}/${this.props.albumName}`, {
            method: "GET",
        });
        if (response.status === 200) {
            let rating: any = await response.json();
            this.setState({rating: parseFloat(rating.rating)});
        }
        else{
            this.setState({rating: NaN});
        }
    }

    // getRating = async (): Promise<void> => {
    //     this.setState({rating: ratingExample.rating});
    // }

    async componentDidMount() {
        await this.getSong();
        await this.getRating();
        await this.getSongArtists();
        this.setState({songLoading: false});
    }

    /**
     * Changes the current page to the album page.
     * Should happen upon clicking the album name.
     */
    goToAlbumPage = (): void => {
        this.props.setAlbumName(this.props.albumName);
        this.props.setPage(PageEnum.ALBUM);
    }


    /**
     * Creates the table displayed in the song's page.
     * The table contains information about the song, such as:
     * The song's artists, album, duration, rating, release date, etc.
     */
    createSongInfoTable = (): JSX.Element => {
        return (
            <div>
                <Table>
                    <TableRow>
                        <TableCell>Artist(s)</TableCell>
                        <TableCell><ArtistsListWithLinks
                            artists={this.state.artists}
                            setPage={this.props.setPage}
                            setArtistName={this.props.setArtistName}
                        /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Album</TableCell>
                        <TableCell><Link href={"#"} onClick={this.goToAlbumPage}>{this.props.albumName}</Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Rating</TableCell>
                        <TableCell>{!isNaN(this.state.rating) ? this.state.rating.toFixed(2) : "No rating"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Release date</TableCell>
                        <TableCell>{this.state.song.release_date}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Duration</TableCell>
                        <TableCell>{millisToMinutesAndSeconds(this.state.song.duration)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Energy</TableCell>
                        <TableCell>{this.state.song.energy}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>
                            {`${scaleNumToWordMapper(parseInt(this.state.song.song_key))} ${this.state.song.is_major === 0 ? "minor" : "major"}`}
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

    /**
     * Adds the song to the user's favorite songs list in the API.
     * If successful, it sets the addToFavoriteSuccess state to true, so that the success message will be displayed.
     * If unsuccessful, it sets the addToFavoriteError state to true, so that the error message will be displayed.
     */
    addToFavorites = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.favoriteSongsApiUrl}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                song_name: this.state.song.song_name,
                album_name: this.props.albumName,
                artist_name: this.props.username,
            })});
        if (response.status === 201) {
            this.setState({addToFavoritesSuccess: true, addToFavoritesError: false});
        }
        else{
            this.setState({addToFavoritesSuccess: false, addToFavoritesError: true});
        }
    }

    // addToFavorites = async (): Promise<void> => {
    //     this.setState({addToFavoritesSuccess: true, addToFavoritesError: false});
    // }


    render() {
        return (
            <Stack
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Stack direction={"row"} spacing={6}>
                    <EntityPrimaryCard
                        name={this.state.song.song_name}
                    />
                    {/* Stack for the add to favorites button, and the alert it displays upon success or failure */}
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
                {/*While loading the page, display a loading icon.*/}
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
                        key={this.props.songName + this.props.albumName}
                        refreshRating={this.getRating}
                    />
            </Stack>
        );
    }
}

export default SongPage;