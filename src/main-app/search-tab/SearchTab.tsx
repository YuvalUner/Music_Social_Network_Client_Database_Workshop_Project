import React from "react";
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

enum SearchType {
    EXACT,
    APPROXIMATE,
}

class SearchTab extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchType: "",
            searchQuery: "",
            searchError: false
        }
    }

    render() {
        return (
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
                        variant={"outlined"}
                        error={this.state.searchError}
                        helperText={this.state.searchError ? "Search query cannot be empty" : ""}
                        value={this.state.searchQuery}
                        onChange={(event) => {
                            this.setState({searchQuery: event.target.value});
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        edge={"end"}
                                        color={"primary"}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl>
                    <RadioGroup
                        row
                        name={"search-type-radio"}
                    >
                        <FormControlLabel value={SearchType.EXACT} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 14,
                            }
                        }}/>} label={"Exact Search"}/>
                        <FormControlLabel value={SearchType.APPROXIMATE} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 14,
                            }
                        }}/>} label={"Approximate Search"}/>
                    </RadioGroup>
                </FormControl>
            </Stack>
        );
    }
}

export default SearchTab;