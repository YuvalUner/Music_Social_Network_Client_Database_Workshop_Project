import React from "react";
import artists from "../artists_example.json";
import PageEnum from "../../page-enum";
import {CircularProgress, List, ListItemButton, ListItemText} from "@mui/material";
import {Md5} from "ts-md5";

class TopArtists extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            topArtists: [],
            TopArtistsLoading: true
        };
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
        this.props.setPage(PageEnum.ARTIST);
    }

    createTopArtistsList = (): JSX.Element => {
        return (
            <div>
                <List>
                    {
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