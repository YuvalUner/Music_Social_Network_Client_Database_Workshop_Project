import React from "react";
import PageEnum from "../../page-enum";
import {CircularProgress, IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import {Md5} from "ts-md5";
import RefreshIcon from "@mui/icons-material/Refresh";
import configData from "../../../config.json";

/**
 * The recommendations part of the discover tab.
 */
class Recommendations extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            recommendations: [],
            recommendationsLoading: true
        };
    }

    /**
     * Makes a request to the backend to get the recommendations.
     */
    getRecommendations = async (): Promise<void> => {
        this.setState({recommendationsLoading: true});
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_reccomendations/${this.props.username}/10`, {
            method: "GET",
        });
        if (response.status === 200) {
            let recommendations: any = await response.json();
            this.setState({recommendations: recommendations, recommendationsLoading: false});
        }
        else{
            this.setState({recommendationsLoading: false});
        }
    }

    // getRecommendations = async (): Promise<void> => {
    //     this.setState({recommendationsLoading: false, recommendations: recommendations});
    // }

    /**
     * Goes to the song page of the song that was clicked.
     * @param song_name
     * @param album_name
     * @param artists
     */
    switchToSongPage = (song_name: string, album_name: string, artists: string | [string]): void => {
        this.props.setSongName(song_name);
        this.props.setAlbumName(album_name);
        this.props.setArtistName(artists);
        this.props.setPage(PageEnum.SONG);
    }

    /**
     * Creates the list of recommendations.
     */
    createRecommendationsList = (): JSX.Element => {
        return(
            <div>
                <List>
                    {Object.keys(this.state.recommendations).map((key: any) => {
                        return(
                            <div key={key}>
                                <div>
                                    Because you liked {key}:<br/>
                                </div>
                                <List>
                                    {this.state.recommendations[key].map((song: any) => {
                                        return(
                                            <ListItemButton
                                                key={Md5.hashStr(`${song.song_name}${song.artists}${song.album_name}`)}
                                                onClick={() =>
                                                    this.switchToSongPage(song.song_name, song.album_name, song.artists)}
                                            >
                                                <ListItemText
                                                    primary={song.song_name}
                                                    secondary={song.artists.join(", ")}/>
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </div>
                        )
                    })}
                </List>
            </div>
        )
    }

    async componentDidMount() {
        await this.getRecommendations();
    }

    render() {
        return(
            <>
                <IconButton
                    onClick={async () => this.getRecommendations()}
                    title={"Refresh recommendations"}
                >
                    <RefreshIcon color={"primary"}/>
                </IconButton>
                {/*Before loading*/}
                {this.state.recommendationsLoading &&
                    <div>
                        <div className={"mb-5"}>
                            Loading recommendations...
                        </div>
                        <CircularProgress/>
                    </div>}
                {/*After loading*/}
                {!this.state.recommendationsLoading &&
                    Object.keys(this.state.recommendations).length === 0
                    && <div>No recommendations found</div>}
                {!this.state.recommendationsLoading && Object.keys(this.state.recommendations).length > 0 &&
                    this.createRecommendationsList()}
            </>
        )
    }
}

export default Recommendations;