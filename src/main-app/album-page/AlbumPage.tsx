import React from 'react';
import {CircularProgress, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import configData from "../../config.json";
import ArtistsListWithLinks from "../general-components/artists-list-with-links";
import PageEnum from "../page-enum";

/**
 * The page for displaying an album.
 * Should display the album's name, artists, and tracks.
 */
class AlbumPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            album: {},
            albumSongs: [],
            albumLoading: true
        }
    }

    /**
     * Gets the album details from the API.
     */
    getAlbumDetails = async (): Promise<void> => {
        const response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/search/${this.props.albumName}`);
        const data = await response.json();
        this.setState({album: data});
    }

    /**
     * Gets the songs in the album from the API.
     */
    getAlbumSongs = async (): Promise<void> => {
        const response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_in_album/${this.props.albumName}`);
        const data = await response.json();
        this.setState({albumSongs: data});
    }

    // getAlbumDetails = async (): Promise<void> => {
    //     this.setState({album: album});
    // }
    //
    // getAlbumSongs = async (): Promise<void> => {
    //     this.setState({albumSongs: songsInAlbum});
    // }
    //
    async componentDidMount() {
        await this.getAlbumDetails();
        await this.getAlbumSongs();
        this.setState({albumLoading: false});
    }

    /**
     * Goes to the page of the song that was clicked.
     * @param songName
     * @param albumName
     * @param artistName
     */
    goToSong = (songName: string, albumName: string, artistName: string | string[]): void => {
        this.props.setSongName(songName);
        this.props.setAlbumName(albumName);
        this.props.setArtistName(artistName);
        this.props.setPage(PageEnum.SONG);
    }

    /**
     * Creates the list of songs in the album.
     */
    createSongsList = (): JSX.Element => {
        return (
            <>
                {this.state.albumSongs.map((song: any) => {
                    return(
                        <Link key={song.song_name} href={"#"} onClick={() => this.goToSong(
                            song.song_name, this.props.albumName, this.props.artists
                        )}>
                            {song.song_name} <br/>
                        </Link>
                    );
                })}
            </>
        );
    }

    /**
     * Creates the table displayed in the album page.
     */
    createAlbumTable = (): JSX.Element => {
        return(
          <Table>
              <TableRow>
                  <TableCell>Artist(s)</TableCell>
                  <TableCell><ArtistsListWithLinks
                    artists={this.props.artists}
                    setPage={this.props.setPage}
                    setArtistName={this.props.setArtistName}
                  /></TableCell>
              </TableRow>
              <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>{parseFloat(this.state.album.rating).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>Songs</TableCell>
                  <TableCell>{this.createSongsList()}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>Spotify link</TableCell>
                  <TableCell>
                      {this.state.album.album_spotify_id !== "" && this.state.album.album_spotify_id !== null ?
                      <Link target={"_blank"} href={`https://open.spotify.com/album/${this.state.album.album_spotify_id}`}>
                      https://open.spotify.com/album/{this.state.album.album_spotify_id}
                  </Link> : "No Spotify link available"}
                  </TableCell>
              </TableRow>
          </Table>
        );
    }

    render() {
        return (
            <Stack>
                <EntityPrimaryCard name={this.props.albumName}/>
                {this.state.albumLoading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : this.createAlbumTable()}
            </Stack>
        );
    }
}

export default AlbumPage;