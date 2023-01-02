import React from "react";
import {
    Avatar,
    Divider,
    Drawer,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import PageEnum from "../page-enum";
import RecommendIcon from '@mui/icons-material/Recommend';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HomeIcon from '@mui/icons-material/Home';

/**
 * The menu that appears on the right hand side of the screen.
 */
class MenuSideBar extends React.Component<any, any>{


    /**
     * Creates the list of menu items displayed in the menu.
     */
    createMenuItems = (): JSX.Element => {
        return (
            <List>
                {/*User's name + icon - on click, go to their artist page*/}
                <ListItemButton key={"sidebar-list-head"}
                    onClick={() => {this.props.setArtistName(this.props.username); this.props.setPage(PageEnum.ARTIST)}}
                >
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.username}>
                    </ListItemText>
                </ListItemButton>
                <Toolbar/>
                <Divider/>
                {/*Home button - on click go to home*/}
                <ListItemButton
                    key={"sidebar-menu-home"}
                    onClick={() => this.props.setPage(PageEnum.HOME)}
                >
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                </ListItemButton>
                {/*Favorite songs button - on click go to favorite songs page*/}
                <ListItemButton
                    key={"sidebar-menu-favorites-songs"}
                    onClick={() => this.props.setPage(PageEnum.FAVORITE_SONGS)}
                >
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Favorites Songs"}/>
                </ListItemButton>
                {/*Add song button - on click go to add song page*/}
                <ListItemButton
                    key={"sidebar-menu-add-song"}
                    onClick={() => this.props.setPage(PageEnum.ADD_SONG)}
                >
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Add Song"}/>
                </ListItemButton>
                {/*Add album button - on click go to add album page*/}
                <ListItemButton
                    key={"sidebar-menu-add-album"}
                    onClick={() => this.props.setPage(PageEnum.ADD_ALBUM)}
                >
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Add Album"}/>
                </ListItemButton>
                {/*Artist recommendations button - on click go to artists recommendations page*/}
                <ListItemButton
                    key={"sidebar-menu-artist-recommendations"}
                    onClick={() => this.props.setPage(PageEnum.ARTIST_RECOMMENDATION)}
                >
                    <ListItemIcon>
                        <RecommendIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Artist Recommendations"}/>
                </ListItemButton>
                {/*Album recommendations button - on click go to album recommendations page*/}
                <ListItemButton
                    key={"sidebar-menu-album-recommendations"}
                    onClick={() => this.props.setPage(PageEnum.ALBUM_RECOMMENDATION)}
                >
                    <ListItemIcon>
                        <AlbumIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Album Recommendations"}/>
                </ListItemButton>
                {/*Top songs button - on click go to top songs page*/}
                <ListItemButton
                    key={"sidebar-menu-top-songs"}
                    onClick={() => this.props.setPage(PageEnum.TOP_SONGS)}
                >
                    <ListItemIcon>
                        <LibraryMusicIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Top songs"}/>
                </ListItemButton>
            </List>
        )
    }

    render(){
        return (
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${this.props.width}%` },
                }}
                anchor={"right"}
                open
            >
                <h3>Menu</h3>
                {this.createMenuItems()}
            </Drawer>
        );
    }
}

export default MenuSideBar;