import React from "react";
import {
    Avatar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Toolbar
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import PageEnum from "../page-enum";
import RecommendIcon from '@mui/icons-material/Recommend';

class MenuSideBar extends React.Component<any, any>{


    createMenuItems = (): JSX.Element => {
        return (
            <List>
                <ListItem key={"sidebar-list-head"}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.username}>
                    </ListItemText>
                </ListItem>
                <Toolbar/>
                <Divider/>
                <ListItemButton
                    key={"sidebar-menu-favorites-songs"}
                    onClick={() => this.props.setPage(PageEnum.FAVORITE_SONGS)}
                >
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Favorites Songs"}/>
                </ListItemButton>
                <ListItemButton
                    key={"sidebar-menu-add-song"}
                    onClick={() => this.props.setPage(PageEnum.ADD_SONG)}
                >
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Add Song"}/>
                </ListItemButton>
                <ListItemButton
                    key={"sidebar-menu-add-album"}
                    onClick={() => this.props.setPage(PageEnum.ADD_ALBUM)}
                >
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Add Album"}/>
                </ListItemButton>
                <ListItemButton
                    key={"sidebar-menu-artist-recommendations"}
                    onClick={() => this.props.setPage(PageEnum.ARTIST_RECOMMENDATION)}
                >
                    <ListItemIcon>
                        <RecommendIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Artist Recommendations"}/>
                </ListItemButton>
                <ListItemButton
                    key={"sidebar-menu-album-recommendations"}
                    onClick={() => this.props.setPage(PageEnum.ALBUM_RECOMMENDATION)}
                >
                    <ListItemIcon>
                        <AlbumIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Album Recommendations"}/>
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