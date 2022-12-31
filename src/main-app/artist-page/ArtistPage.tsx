import React from "react";
import {Box, CircularProgress, Link, Stack, Table, TableCell, TableRow} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import configData from "../../config.json";
import artistAlbums from "./artist_albums_example.json";
import artistRating from "./rating_example.json";
import artistSpotifyId from "./spotify_id_example.json";
import PageEnum from "../page-enum";
import {Md5} from "ts-md5";

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

    // getArtistAlbums = async (): Promise<void> => {
    //     const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/albums/${this.props.artist_name}`);
    //     const data: any = await response.json();
    //     this.setState({artistAlbums: data});
    // }
    //
    // getArtistRating = async (): Promise<void> => {
    //     const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/rating/${this.props.artist_name}`);
    //     const data: any = await response.json();
    //     this.setState({artistRating: parseFloat(data.rating).toFixed(2)});
    // }
    //
    // getArtistSpotifyId = async (): Promise<void> => {
    //     const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/spotify_id/${this.props.artist_name}`);
    //     const data: any = await response.json();
    //     this.setState({artistSpotifyId: data.spotify_id});
    // }

    getArtistAlbums = async (): Promise<void> => {
        this.setState({artistAlbums: artistAlbums});
    }

    getArtistRating = async (): Promise<void> => {
        this.setState({artistRating: parseFloat(artistRating.rating).toFixed(2)});
    }

    getArtistSpotifyId = async (): Promise<void> => {
        this.setState({artistSpotifyId: artistSpotifyId.spotify_id});
    }

    async componentDidMount(): Promise<void> {
        await this.getArtistAlbums();
        await this.getArtistRating();
        await this.getArtistSpotifyId();
        this.setState({artistLoading: false});
    }

    goToAlbum = (album_name: string): void => {
        this.props.setAlbumName(album_name);
        this.props.setPage(PageEnum.ALBUM);
    }

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

    createArtistTable = (): JSX.Element => {
        return (
            <Table>
                <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>{this.state.artistRating}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Spotify ID</TableCell>
                    <TableCell><Link target={"_blank"} href={`https://open.spotify.com/artist/${this.state.artistSpotifyId}`}>
                        https://open.spotify.com/artist/{this.state.artistSpotifyId}
                    </Link></TableCell>
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