import React from "react";
import configData from "../../config.json";
import {Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import YearRange from "./year_range_example.json"
import SongWithAlbumAndArtistsList from "../general-components/song-with-album-and-artists-list";
import topAllTime from "./top_all_tme_example.json";
import top2020 from "./top_2020_example.json";

class TopSongsPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            songs: [],
            years_range: [],
            selected_year: "All Times",
            songs_loading: false,
            song_years_loading: true
        };
    }

    // getYearRange = async (): Promise<void> => {
    //     const response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}/get_max_min_years`)
    //     const data: any = await response.json();
    //     let years = ["All Times"];
    //     for (let i = data.max_year; i >= data.min_year; i--) {
    //         years.push(i.toString());
    //     }
    //     this.setState({years_range: years, song_years_loading: false});
    // }

    getYearRange = async (): Promise<void> => {
            const data = YearRange;
            let years = ["All Times"];
            for (let i = data.max_year; i >= data.min_year; i--) {
                years.push(i.toString());
            }
            this.setState({years_range: years, song_years_loading: false});
    }

    async componentDidMount() {
        await this.getYearRange();
    }

    // getSongs = async (e): Promise<void> => {
    //     e.preventDefault();
    //     this.setState({songs_loading: true});
    //     let methodPath = this.state.selected_year === "All Times" ? "/top_songs" : "/top_songs_per_year";
    //     methodPath += "/100"
    //     methodPath += this.state.selected_year === "All Times" ? "" : `/${this.state.selected_year}`;
    //     const response: Response = await fetch(`${configData.apiBaseUrl}${configData.songsApiUrl}${methodPath}`)
    //     const data: any = await response.json();
    //     this.setState({songs: data, songs_loading: false});
    // }

    getSongs = async (e): Promise<void> => {
        e.preventDefault();
        if (this.state.selected_year === "All Times"){
            this.setState({songs_loading: true, songs: topAllTime});
        }
        else{
            this.setState({songs_loading: true, songs: top2020});
        }
    }


    render() {
        return (
            <>
                {this.state.song_years_loading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    :
                    <form onSubmit={async (e) => await this.getSongs(e)}>
                        <Stack direction={"row"} spacing={5}>
                            <FormControl>
                                <InputLabel id="select-year-label">Select Year</InputLabel>
                                <Select
                                    labelId="select-year-label"
                                    id="select-year"
                                    value={this.state.selected_year}
                                    label="Select year"
                                    onChange={(event) => this.setState({selected_year: event.target.value})}
                                >
                                    {this.state.years_range.map((year: string) => {
                                        return (
                                            <MenuItem value={year}>{year}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <Button
                                    type={"submit"} variant={"outlined"} color={"primary"}>
                                Submit
                            </Button>
                        </Stack>
                    </form>}
                {this.state.songs_loading ?
                    <div>
                        <div>
                            Loading...
                        </div>
                        <CircularProgress/>
                    </div>
                    : <SongWithAlbumAndArtistsList
                        searchResults={this.state.songs}
                        setSongName={this.props.setSongName}
                        setArtistName={this.props.setArtistName}
                        setAlbumName={this.props.setAlbumName}
                        setPage={this.props.setPage}
                        showRating={true}
                    />
                }
            </>
        );
    }
}

export default TopSongsPage;