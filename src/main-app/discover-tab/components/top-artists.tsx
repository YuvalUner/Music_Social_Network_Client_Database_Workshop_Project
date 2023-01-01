import React from "react";
import artists from "../artists_example.json";
import PageEnum from "../../page-enum";
import {CircularProgress, List, ListItemButton, ListItemText} from "@mui/material";
import {Md5} from "ts-md5";
import configData from "../../../config.json";

/**
 * The top artists part of the discover tab.
 */
class TopArtists extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            topArtists: [],
            topArtistsLoading: true
        };
    }


    /**
     * Makes a request to the backend to get the top artists.
     * If fails, assume the server has gone up in flames and everyone is dead.
     */
    getTopArtists = async (): Promise<void> => {
        let response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/top_rated/10`, {
            method: "GET"
        });
        let data = await response.json();
        this.setState({topArtists: data, topArtistsLoading: false});
    }

    // getTopArtists = async (): Promise<void> => {
    //     this.setState({topArtistsLoading: false, topArtists: artists});
    // }

    /**
     * Goes to the artist page of the artist that was clicked.
     * @param artist
     */
    switchToArtistPage = (artist: string): void => {
        this.props.setArtistName(artist);
        this.props.setPage(PageEnum.ARTIST);
    }

    /**
     * Creates the list of top artists.
     */
    createTopArtistsList = (): JSX.Element => {
        return (
            <div>
                <List>
                    {
                        // Doing it this way, because someone returned an array inside a singular key, for some reason.
                        Object.keys(this.state.topArtists).map((key: any) => {
                            return (
                                <div key={key}>
                                    {this.state.topArtists[key].map((artist: any) => {
                                        return (
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
        );
    }

    async componentDidMount() {
        await this.getTopArtists();
    }

    render() {
        return (
            <>
                {this.state.topArtistsLoading && <div>
                    <div className={"mb-5"}>
                        Loading top artists...
                    </div>
                    <CircularProgress/>
                </div>}
                {!this.state.topArtistsLoading && this.createTopArtistsList()}
            </>
        );
    }
}

export default TopArtists;