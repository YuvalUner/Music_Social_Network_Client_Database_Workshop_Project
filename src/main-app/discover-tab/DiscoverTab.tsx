import React from "react";
import {CircularProgress, Divider, Drawer, List, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import configData from "../../config.json";
import recommendations from "./recommendations_example.json";
import artists from "./artists_example.json";
import {Md5} from "ts-md5";

class DiscoverTab extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            recommendations: [],
            topArtists: [],
            recommendationsLoading: true,
            topArtistsLoading: true
        }
    }

    // getRecommendations = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_reccomendations/${this.props.username}/10`, {
    //         method: "GET",
    //     });
    //     if (response.status === 200) {
    //         let recommendations: any = await response.json();
    //         this.setState({recommendations: recommendations, recommendationsLoading: false});
    //     }
    //     else{
    //         this.setState({recommendationsLoading: false});
    //     }
    // }

    getRecommendations = async (): Promise<void> => {
        this.setState({recommendationsLoading: false, recommendations: recommendations});
    }

    switchToSongPage = (song_name: string, album_name: string): void => {
        this.props.setSongName(song_name);
        this.props.setAlbumName(album_name);
        this.props.setPage("song");
    }



    createRecommendationsList = (): JSX.Element => {
        return(
            <div>
                <List>
                    {Object.keys(this.state.recommendations).map((key: any) => {
                        return(
                            <div>
                                <div>
                                    Because you liked {key}:<br/>
                                </div>
                                <List>
                                    {this.state.recommendations[key].map((song: any) => {
                                        return(
                                            <ListItemButton
                                                key={Md5.hashStr(`${song.song_name}${song.artists}${song.album_name}`)}
                                                onClick={() => this.switchToSongPage(song.song_name, song.album_name)}
                                            >
                                                <ListItemText
                                                    primary={song.song_name}
                                                    secondary={song.artists}/>
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

    // getTopArtists = async (): Promise<void> => {
    //     let response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/top_rated/10`, {
    //         method: "GET"
    //     });
    //     let data = await response.json();
    //     this.setState({topArtists: data, topArtistsLoading: false});
    // }

    getTopArtists = async (): Promise<void> => {
        this.setState({topArtistsLoading: false, topArtists: artists});
    }

    switchToArtistPage = (artist: string): void => {
        this.props.setArtistName(artist);
        this.props.setPage("artist");
    }

    createTopArtistsList = (): JSX.Element => {
        return(
            <div>
                <List>
                    {
                        Object.keys(this.state.topArtists).map((key: any) => {
                            return (
                                <div>
                                    {this.state.topArtists[key].map((artist: any) => {
                                        return(
                                            <ListItemButton
                                                key={Md5.hashStr(`${artist[0]}${artist[1]}`)}
                                                onClick={() => this.switchToArtistPage(artist[0])}>
                                                <ListItemText
                                                    primary={artist[0]}
                                                    secondary={`Rating:
                                                     ${parseFloat(artist[1]).toFixed(2)}`}/>
                                            </ListItemButton>
                                        );
                                    })}
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    componentDidMount() {
        this.getRecommendations();
        this.getTopArtists();//s
    }


    render(){
        return (
            <Drawer
            variant={"permanent"}
            anchor={"left"}
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
            }}
            >
                <h2>Discover</h2>
                <Toolbar />
                <Divider />
                <h5>Recommendations</h5>
                {this.state.recommendationsLoading &&
                    <div>
                        <div className={"mb-5"}>
                            Loading recommendations...
                        </div>
                        <CircularProgress/>
                    </div>}
                {!this.state.recommendationsLoading &&
                    Object.keys(this.state.recommendations).length === 0
                    && <div>No recommendations found</div>}
                {!this.state.recommendationsLoading && Object.keys(this.state.recommendations).length > 0 &&
                    this.createRecommendationsList()}
                <Toolbar />
                <Divider />
                <h5>Top Artists</h5>
                {this.state.topArtistsLoading && <div>
                    <div className={"mb-5"}>
                        Loading top artists...
                    </div>
                    <CircularProgress/>
                </div>}
                {!this.state.topArtistsLoading && this.createTopArtistsList()}
            </Drawer>
        );
    }
}

export default DiscoverTab;