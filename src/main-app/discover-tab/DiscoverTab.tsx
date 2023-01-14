import React from "react";
import {Divider, Drawer, Toolbar} from "@mui/material";
import Recommendations from "./components/recommendations";
import TopArtists from "./components/top-artists";
import './DiscoverTab.css'

/**
 * The discover tab on the left hand side of the screen.
 * Contains recommendations for the user and a list of the top artists.
 */
class DiscoverTab extends React.Component<any, any>{

    render(){
        return (
            <Drawer
                className={'discover-menu'}
            variant={"permanent"}
            anchor={"left"}
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${this.props.width}%` },
            }}
            >
                <h2>Discover</h2>
                <Toolbar />
                <Divider />
                <h5>Recommendations</h5>
                <p className={"small-text"}>Please note that information in this tab may not be complete - songs with multiple artists
                    collaborating will only display a single artist in this list</p>
                <Recommendations
                    username={this.props.username}
                    setSongName={this.props.setSongName}
                    setAlbumName={this.props.setAlbumName}
                    setArtistName={this.props.setArtistName}
                    setPage={this.props.setPage}
                >
                </Recommendations>
                <Toolbar />
                <Divider />
                <h5>Top Artists</h5>
                <TopArtists
                    setArtistName={this.props.setArtistName}
                    setPage={this.props.setPage}
                ></TopArtists>
            </Drawer>
        );
    }
}

export default DiscoverTab;