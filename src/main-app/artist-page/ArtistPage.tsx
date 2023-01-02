import React from "react";
import {Box, CircularProgress, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import configData from "../../config.json";
import artistAlbums from "./artist_albums_example.json";
import artistRating from "./rating_example.json";
import artistSpotifyId from "./spotify_id_example.json";
import PageEnum from "../page-enum";
import {Md5} from "ts-md5";

/**
 * The page that displays the artist's information.
 * Should display their name, albums, rating and spotify link.
 */
class ArtistPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            artistAlbums: [],
            artistRating: NaN,
            artistSpotifyId: "",
            artistLoading: true
        }
    }

    /**
     * Makes a request to the backend to get the artist's albums.
     */
    getArtistAlbums = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/albums/${this.props.artistName}`);
        const data: any = await response.json();
        this.setState({artistAlbums: data});
    }

    /**
     * Makes a request to the backend to get the artist's rating.
     */
    getArtistRating = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/rating/${this.props.artistName}`);
        const data: any = await response.json();
        if (data.rating !== null) {
            this.setState({artistRating: parseFloat(data.rating).toFixed(2)});
        }
        else{
            this.setState({artistRating: NaN});
        }
    }

    /**
     * Makes a request to the backend to get the artist's Spotify ID.
     */
    getArtistSpotifyId = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/spotify_id/${this.props.artistName}`);
        const data: any = await response.json();
        if (data.spotify_id !== null) {
            this.setState({artistSpotifyId: data.spotify_id.replace("'", "").replace("'", "")});
        }
        else{
            this.setState({artistSpotifyId: ""});
        }
    }

    // getArtistAlbums = async (): Promise<void> => {
    //     this.setState({artistAlbums: artistAlbums});
    // }
    //
    // getArtistRating = async (): Promise<void> => {
    //     this.setState({artistRating: parseFloat(artistRating.rating).toFixed(2)});
    // }
    //
    // getArtistSpotifyId = async (): Promise<void> => {
    //     this.setState({artistSpotifyId: artistSpotifyId.spotify_id});
    // }

    async componentDidMount(): Promise<void> {
        await this.getArtistAlbums();
        await this.getArtistRating();
        await this.getArtistSpotifyId();
        this.setState({artistLoading: false});
    }

    /**
     * Goes to the album page of the album that was clicked.
     * @param album_name
     */
    goToAlbum = (album_name: string): void => {
        this.props.setAlbumName(album_name);
        this.props.setPage(PageEnum.ALBUM);
    }

    /**
     * Creates the list of albums that the artist has.
     */
    createAlbumsList = (): JSX.Element => {
        return (
            <>
                {this.state.artistAlbums.map((album: any) => {
                    return(
                        <Link key={album.album_name} href={"#"} onClick={() => this.goToAlbum(album.album_name)}>
                            {album.album_name} <br/>
                        </Link>
                    );
                })}
            </>
        );
    }

    /**
     * Creates the table displayed in the artist's page.
     */
    createArtistTable = (): JSX.Element => {
        return (
            <Table>
                <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>{!isNaN(this.state.artistRating) ? this.state.artistRating : "No rating available"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Spotify ID</TableCell>
                    <TableCell>
                        {this.state.artistSpotifyId !== "" ?
                        <Link target={"_blank"} href={`https://open.spotify.com/artist/${this.state.artistSpotifyId}`}>
                        https://open.spotify.com/artist/{this.state.artistSpotifyId}
                    </Link> : "No Spotify ID available"}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Albums</TableCell>
                    <TableCell>{this.createAlbumsList()}</TableCell>
                </TableRow>
            </Table>
        )
    }

    render() {
        return (
            <Stack>
                <Stack direction={"row"}>
                    <EntityPrimaryCard
                        name={this.props.artistName}
                    />
                </Stack>
                {this.state.artistLoading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : this.createArtistTable()}
            </Stack>
        );
    }
}

export default ArtistPage;