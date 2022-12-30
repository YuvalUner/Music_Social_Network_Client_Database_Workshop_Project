import React from "react";
import {Divider, Drawer, Toolbar} from "@mui/material";
import Recommendations from "./components/recommendations";
import TopArtists from "./components/top-artists";

class DiscoverTab extends React.Component<any, any>{

    render(){
        return (
            <Drawer
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
                <Recommendations
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