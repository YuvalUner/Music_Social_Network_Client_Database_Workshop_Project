import React from "react";
import {List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Md5} from "ts-md5";
import PageEnum from "../page-enum";

/**
 * A list of songs with their album and artist listed.
 * Can also optionally display the song's rating.
 */
class SongWithAlbumAndArtistsList extends React.Component<any, any>{

    /**
     * Go to the song page for a specific song.
     * @param song_name
     * @param album_name
     * @param artists
     */
    goToSongPage = (song_name: string, album_name: string, artists: string | [string]): void => {
        this.props.setSongName(song_name);
        this.props.setAlbumName(album_name);
        this.props.setArtistName(artists);
        this.props.setPage(PageEnum.SONG);
    }

    render() {
        return (
            <List>
                {this.props.searchResults.map((song: any) => {
                    return (
                        <ListItemButton
                            key={Md5.hashStr(`${song.song_name}${song.album_name}`)}
                            onClick={() => this.goToSongPage(song.song_name, song.album_name, song.artists)}
                        >
                            <ListItemText
                                primary={song.song_name}
                                secondary={<Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Artist(s): {song.artists.join(", ")}
                                    <br/> Album: {song.album_name}
                                    <br/> Release date: {song.release_date}
                                    {this.props.showRating && <><br/> Rating: {parseFloat(song.rating).toFixed(2)}</>}
                                </Typography>}/>
                        </ListItemButton>
                    );
                })
                }
            </List>
        );
    }

}

export default SongWithAlbumAndArtistsList;