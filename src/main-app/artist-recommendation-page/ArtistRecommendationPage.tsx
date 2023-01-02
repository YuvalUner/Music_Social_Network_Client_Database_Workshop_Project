import React from "react";
import configData from "../../config.json";
import {CircularProgress, List, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import PageEnum from "../page-enum";

/**
 * The page for displaying recommendations for artists.
 */
class ArtistRecommendationPage extends React.Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            recommendations: [],
            recommendationsLoading: true,
        }
    }

    getArtistRating = async (artist): Promise<number> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/rating/${artist.artist_name}`, {
            method: "GET",
        });
        if (response.status === 200) {
            let data = await response.json();
            return data.rating !== null ? parseFloat(data.rating) : NaN;
        }
        else{
            return NaN;
        }
    }

    getRecommendations = async (): Promise<void> => {
        this.setState({recommendationsLoading: true});
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/get_reccomendations/${this.props.username}/10`, {
            method: "GET",
        });
        if (response.status === 200) {
            let recommendations: any = await response.json();
            let genres = Object.keys(recommendations);
            for (const genre of genres){
                for (let artist of recommendations[genre]){
                    artist.rating = await this.getArtistRating(artist);
                }
            }
            this.setState({recommendations: recommendations, recommendationsLoading: false});
        }
        else{
            this.setState({recommendationsLoading: false});
        }
    }

    async componentDidMount() {
        await this.getRecommendations();
    }

    goToArtistPage = (artist: string): void => {
        this.props.setArtistName(artist);
        this.props.setPage(PageEnum.ARTIST);
    }

    createRecommendationList = (): JSX.Element => {
        return(
            <List>
                {Object.keys(this.state.recommendations).map((key: any) => {
                    return(
                        <div key={key}>
                            <p>Because you liked {key}:</p>
                            {this.state.recommendations[key].map((artist: any) => {
                                return(
                                    <ListItemButton
                                        key={artist.artist_name}
                                        onClick={() => this.goToArtistPage(artist.artist_name)}
                                    >
                                        <ListItemText
                                            primary={artist.artist_name}
                                            secondary={<Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary">
                                                Rating: {!isNaN(artist.rating) ? `Rating: ${artist.rating.toFixed(2)}` : "No rating available."}
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
        return (
            <Stack>
                {this.state.recommendationsLoading ?
                    <div>
                        <div className={"mb-4"}>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : this.state.recommendations.length === 0 ? <div>
                            No recommendations available.
                        </div>
                        : this.createRecommendationList()
                }
            </Stack>
        );
    }
}

export default ArtistRecommendationPage;