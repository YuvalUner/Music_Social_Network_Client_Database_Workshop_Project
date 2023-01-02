import React from "react";
import configData from "../../config.json";
import {CircularProgress, List, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import PageEnum from "../page-enum";

/**
 * The page for displaying album recommendations.
 */
class AlbumRecommendationsPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            albumRecommendations: [],
            albumRecommendationsLoading: true
        };
    }

    /**
     * Makes a request to the backend to get the album's rating.
     * @param album
     */
    getAlbumRating = async (album): Promise<number> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/search/${album.album_name}`, {
            method: "GET",
        }
        );
        if (response.status === 200) {
            let data = await response.json();
            return data.rating !== null ? parseFloat(data.rating) : NaN;
        }
        else{
            return NaN;
        }
    }

    /**
     * Makes a request to the backend to get the list of artists related to the album.
     * @param album
     */
    getAlbumArtists = async (album): Promise<string[]> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/get_artists/${album.album_name}`, {
            method: "GET",
        });
        if (response.status === 200) {
            return await response.json();
        }
        else{
            return [];
        }
    }

    /**
     * Makes a request to the backend to get the album recommendations.
     * After getting recommendations, also gets the rating of each album.
     */
    getAlbumRecommendations = async (): Promise<void> => {
        this.setState({albumRecommendationsLoading: true});
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.albumApiUrl}/get_reccomendations/${this.props.username}/10`, {
            method: "GET",
        });
        if (response.status === 200) {
            let albumRecommendations: any = await response.json();
            let genres = Object.keys(albumRecommendations);
            for (const genre of genres) {
                for (let album of albumRecommendations[genre]) {
                    album.rating = await this.getAlbumRating(album);
                    album.artists = await this.getAlbumArtists(album);
                }
            }
            this.setState({albumRecommendations: albumRecommendations, albumRecommendationsLoading: false});
        }
        else{
            this.setState({albumRecommendationsLoading: false});
        }
    }

    async componentDidMount() {
        await this.getAlbumRecommendations();
    }

    /**
     * Goes to the album page for the album that was clicked.
     * @param album_name
     * @param artists
     */
    goToAlbumPage = (album_name: string, artists: string | string[]): void => {
        this.props.setArtistName(artists)
        this.props.setAlbumName(album_name);
        this.props.setPage(PageEnum.ALBUM);
    }

    /**
     * Renders the album recommendations list.
     */
    createAlbumRecommendationsList = (): JSX.Element => {
        return(
            <List>
                {Object.keys(this.state.albumRecommendations).map((key: any) => {
                    return(
                        <div key={key}>
                            <p>Because you liked {key}:</p>
                            {this.state.albumRecommendations[key].map((album: any) => {
                                return(
                                    <ListItemButton
                                        key={album.album_name}
                                        onClick={() => this.goToAlbumPage(album.album_name, album.artists)}
                                        >
                                        <ListItemText
                                        primary={album.album_name}
                                        secondary={<Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary">
                                            Rating: {!isNaN(album.rating) ? `Rating: ${album.rating.toFixed(2)}` : "No rating available."}
                                            <br/> Artists: {album.artists.join(", ")}
                                        </Typography>}
                                        />
                                    </ListItemButton>
                                )
                            })}
                        </div>
                    )
                })}
            </List>
        )
    }

    render() {
        return(
            <Stack>
                {this.state.albumRecommendationsLoading ? <div>
                    <div className={"mb-4"}>
                        Loading...
                    </div>
                    <CircularProgress/>
                </div>
                    : this.state.albumRecommendations.length === 0 ? <div>
                        No recommendations available.
                    </div>
                        : this.createAlbumRecommendationsList()}
            </Stack>
        )
    }
}

export default AlbumRecommendationsPage;