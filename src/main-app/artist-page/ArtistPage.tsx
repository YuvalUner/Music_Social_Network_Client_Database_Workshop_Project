import React from "react";
import {Box} from "@mui/material";
import EntityPrimaryCard from "../general-components/entity-primary-card";
import configData from "../../config.json";

class ArtistPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            artistAlbums: [],
            artistRating: NaN,
            artistSpotifyId: "",
            artistLoading: true
        }
    }

    getArtistAlbums = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/albums/${this.props.artist_name}`);
        const data: any = await response.json();
        this.setState({artistAlbums: data});
    }

    getArtistRating = async (): Promise<void> => {
        const response: Response = await fetch(`${configData.apiBaseUrl}${configData.artistApiUrl}/rating/${this.props.artist_name}`);
        const data: any = await response.json();
        this.setState({artistRating: data.rating});
    }

    render(){
        return (
            <Box>
                <EntityPrimaryCard
                    name={this.props.artistName}
                />
            </Box>
        );
    }
}

export default ArtistPage;