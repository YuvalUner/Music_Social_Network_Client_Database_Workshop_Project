import React from "react";
import SearchTypes from "./search-type-enum";
import {
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PageEnum from "../page-enum";
import './SearchBar.css';

/**
 * The tab that allows the user to input search queries and choose the search type.
 */
class SearchTab extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchError: false,
            searchType: SearchTypes.EXACT,
        }
    }

    /**
     * Checks the the search query is valid.
     */
    checkValidity = (): boolean => {
        if (this.props.searchQuery === "") {
            this.setState({searchError: true});
            return false;
        } else {
            this.setState({searchError: false});
            return true;
        }
    }

    /**
     * Handles the search button being clicked.
     * @param e
     */
    onSubmit = (e: any): void => {
        e.preventDefault();
        if (this.checkValidity()) {
            this.props.setPage(PageEnum.SEARCH_RESULTS);
            this.props.setSearchType(this.state.searchType);
        }
    }

    /**
     * Changes the search type.
     * @param e
     */
    setSearchType = (e: any): void => {
        this.setState({searchType: (e.target as HTMLInputElement).value});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className={"sticky-top"}>
                <Stack sx={{
                    alignItems: "center",
                    border: 1,
                    borderRadius: 2,
                    borderColor: "grey.300",
                }}>
                    <FormControl sx={{
                        width: "100%",
                    }}>
                        <TextField
                            label={"Search"}
                            className={'search-field spoti-green'}
                            variant={"outlined"}
                            error={this.state.searchError}
                            helperText={this.state.searchError ? "Search query cannot be empty" : ""}
                            value={this.props.searchQuery}
                            onChange={this.props.setSearchQuery}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            edge={"end"}
                                            color={"primary"}
                                            onClick={this.onSubmit}
                                        >
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl
                    className = 'search-menu'
                    >
                        <RadioGroup
                            row
                            name={"search-type-radio"}
                            value={this.state.searchType}
                            onChange={this.setSearchType}
                            defaultValue={SearchTypes.EXACT}
                        >
                            <FormControlLabel defaultChecked={true} value={SearchTypes.EXACT} control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 14,
                                }
                            }}/>} label={"Exact Search"}
                            />
                            <FormControlLabel value={SearchTypes.APPROXIMATE} control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 14,
                                }
                            }}/>} label={"Approximate Search"}/>
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </form>
        );
    }
}

export default SearchTab;