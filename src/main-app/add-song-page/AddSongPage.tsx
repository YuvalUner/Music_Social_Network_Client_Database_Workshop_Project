import React from "react";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField
} from "@mui/material";
import configData from "../../config.json";
import SendIcon from '@mui/icons-material/Send';
import {minutesAndSecondsToMillis} from "../general-components/time-converter";

/**
 * A page with a form for adding a song to the database.
 */
class AddSongPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            song_name: "",
            album_name: null,
            genre_name: null,
            song_spotify_id: "",
            energy: 0,
            song_key: "C",
            is_major: 0,
            duration: "",
            songNameEmptyError: false,
            albumNameEmptyError: false,
            genreNameEmptyError: false,
            durationError: false,
            artistAlbums: [],
            genreList: [],
            addSongSuccess: false,
            addSongError: false,
            pageLoading: true
        }
    }

    /**
     * Gets the list of genres from the database.
     */
    getGenresList = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.genresApiUrl}/all`);
        let genresList: any = await response.json();
        this.setState({genreList: genresList});
    }

    /**
     * Gets the list of albums for the current artist from the database.
     */
    getArtistAlbums = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/albums/${this.props.username}`);
        let data: any = await response.json();
        let albumNames: string[] = [];
        data.forEach((album: any) => {
            albumNames.push(album.album_name);
        });
        this.setState({artistAlbums: albumNames});
    }

    // getGenresList = async (): Promise<void> => {
    //     this.setState({genreList: genreList});
    // }
    //
    // getArtistAlbums = async (): Promise<void> => {
    //     let data: any = artistAlbums;
    //     let albumNames: string[] = [];
    //     data.forEach((album: any) => {
    //         albumNames.push(album.album_name);
    //     });
    //     this.setState({artistAlbums: albumNames});
    // }

    async componentDidMount() {
        await this.getGenresList();
        await this.getArtistAlbums();
        this.setState({pageLoading: false});
    }

    /**
     * Checks to make sure that the input data is valid and not empty or not following the correct format.
     */
    checkValidity = (): boolean => {
        let valid: boolean = true;
        if (this.state.song_name === "") {
            this.setState({songNameEmptyError: true});
            valid = false;
        }
        if (this.state.album_name === null) {
            this.setState({albumNameEmptyError: true});
            valid = false;
        }
        if (this.state.genre_name === null) {
            this.setState({genreNameEmptyError: true});
            valid = false;
        }
        if (this.state.duration === "" || !this.state.duration.match("[0-9][0-9]:[0-9][0-9]$")) {
            this.setState({durationError: true});
            valid = false;
        }
        return valid;
    }

    /**
     * Sends a request to the server to add the song to the database.
     * Also sends a request to link the artist to the song's genre.
     * @param e
     */
    addSong = async (e): Promise<void> => {
        e.preventDefault();
        if (this.checkValidity()) {
            const minutes: number = parseInt(this.state.duration.split(":")[0]);
            const seconds: number = parseInt(this.state.duration.split(":")[1]);
            const durationInMilis = minutesAndSecondsToMillis(minutes, seconds);
            const now = new Date();
            const formattedDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
            let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    song_name: this.state.song_name,
                    album_name: this.state.album_name,
                    song_spotify_id: this.state.song_spotify_id,
                    energy: this.state.energy,
                    song_key: this.state.song_key,
                    is_major: this.state.is_major,
                    duration: durationInMilis,
                    artist_name: this.props.username,
                    release_date: formattedDate
                }
            )});
            if (response.status === 201) {
                this.setState({addSongSuccess: true, addSongError: false});
                // Response is inconsequential
                response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/link_genre`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        artist_name: this.props.username,
                        genre_name: this.state.genre_name
                    })
                });
            } else {
                this.setState({addSongError: true, addSongSuccess: false});
            }
        }
    }

    render() {
        return (
            <Stack>
                <h1>
                    Add Song
                </h1>
                {this.state.pageLoading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : <form onSubmit={async e => this.addSong(e)}>
                        <Stack spacing={2}>
                            {/*Song name input field*/}
                            <TextField
                                variant={"outlined"}
                                label={"Song Name"}
                                error={this.state.songNameEmptyError}
                                helperText={this.state.songNameEmptyError ? "Song name cannot be empty" : ""}
                                value={this.state.song_name}
                                onChange={e => this.setState({song_name: e.target.value})}
                                sx={{
                                    marginRight: 2,
                                }}
                                required
                            />
                            {/*Album select field*/}
                            <FormControl sx={{
                                marginRight: 2,
                            }} error={this.state.albumNameEmptyError} required>
                                <InputLabel id="album-select-label">Album</InputLabel>
                                <Select
                                    labelId="album-select-label"
                                    id="album-select"
                                    value={this.state.album_name}
                                    label="Album"
                                    onChange={e => this.setState({album_name: e.target.value})}
                                    sx={{
                                        width: 200
                                    }}
                                >
                                    {this.state.artistAlbums.map((album: string) => {
                                        return <MenuItem value={album}>{album}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>
                                    {this.state.albumNameEmptyError ? "This field is required" : ""}
                                </FormHelperText>
                            </FormControl>
                            {/*Genre select field*/}
                            <FormControl error={this.state.genreNameEmptyError} required
                                         sx={{
                                             marginRight: 2,
                                         }}
                            >
                                <InputLabel id="genre-select-label">Genre</InputLabel>
                                <Select
                                    labelId="genre-select-label"
                                    id="genre-select"
                                    value={this.state.genre_name}
                                    label="Genre"
                                    onChange={e => this.setState({genre_name: e.target.value})}
                                    sx={{
                                        width: 200
                                    }}
                                >
                                    {this.state.genreList.map((genre: string) => {
                                        return <MenuItem value={genre}>{genre}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>
                                    {this.state.genreNameEmptyError ? "This field is required" : ""}
                                </FormHelperText>
                            </FormControl>
                            {/*Song spotify id field*/}
                            <TextField
                                variant={"outlined"}
                                label={"Spotify ID"}
                                value={this.state.song_spotify_id}
                                onChange={e => this.setState({song_spotify_id: e.target.value})}
                                sx={{
                                    marginRight: 2,
                                }}
                            />
                            {/*Song duration field*/}
                            <TextField
                                variant={"outlined"}
                                label={"Duration"}
                                error={this.state.durationError}
                                helperText={this.state.durationError ? "Duration must in the mm:ss format" : ""}
                                value={this.state.duration}
                                onChange={e => this.setState({duration: e.target.value})}
                                sx={{
                                    marginRight: 2,
                                }}
                            />
                            {/*Song energy field*/}
                            <TextField
                                variant={"outlined"}
                                label={"Energy"}
                                type={"number"}
                                value={this.state.energy}
                                onChange={e => this.setState({energy: e.target.value})}
                                sx={{
                                    marginRight: 2,
                                }}
                            />
                            {/*Song key field*/}
                            <TextField
                                variant={"outlined"}
                                label={"Song key"}
                                value={this.state.song_key}
                                onChange={e => this.setState({song_key: e.target.value})}
                                sx={{
                                    marginRight: 2,
                                }}
                            />
                            {/*Song in minor or major selector*/}
                            <FormControl>
                                <RadioGroup
                                    row
                                    name={"search-type-radio"}
                                    value={this.state.is_major}
                                    onChange={e => this.setState({is_major: e.target.value})}
                                    defaultValue={1}
                                >
                                    <FormControlLabel defaultChecked={true} value={1} control={<Radio sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        }
                                    }}/>} label={"Major"}
                                    />
                                    <FormControlLabel value={0} control={<Radio sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        }
                                    }}/>} label={"Minor"}/>
                                </RadioGroup>
                            </FormControl>
                            {/*Submit button and success and failure alerts*/}
                            <Button variant={"contained"} type={"submit"} endIcon={<SendIcon/>}>
                                Add Song
                            </Button>
                            {this.state.addSongSuccess &&
                                <Alert severity={"success"}>Song added successfully</Alert>
                            }
                            {this.state.addSongError &&
                                <Alert severity={"error"}>Error adding song - song already exists in this album</Alert>
                            }
                        </Stack>
                    </form>
                }
            </Stack>
        );
    }
}

export default AddSongPage;