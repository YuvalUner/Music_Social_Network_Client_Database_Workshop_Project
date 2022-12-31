import React from "react";
import {Avatar, Stack} from "@mui/material";


class EntityPrimaryCard extends React.Component<any, any> {

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
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                alignItems={"center"}
            >
                <h1>
                    {this.props.name}
                </h1>
                <Avatar variant={"square"} sx={{
                    width: 200,
                    height: 100,
                }}/>
            </Stack>
        )
    }
}

export default EntityPrimaryCard;