import React from "react";
import {Avatar, Stack} from "@mui/material";


class SongPrimaryCard extends React.Component<any, any> {

    render() {
        return (
            <Stack
                direction={"row"}
                sx={{
                    width: 500,
                    height: 100,
                    border: 1,
                    borderColor: 'grey.500',
                    borderRadius: 1,
                }}
                alignItems={"center"}
            >
                <h1>
                    {this.props.songName}
                </h1>
                <Avatar variant={"square"} sx={{
                    width: 200,
                    height: 100
                }}/>
            </Stack>
        )
    }
}

export default SongPrimaryCard;