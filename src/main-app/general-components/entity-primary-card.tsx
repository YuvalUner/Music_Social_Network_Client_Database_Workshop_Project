import React from "react";
import {Avatar, Stack} from "@mui/material";


/**
 * A component that displays a single entity's primary information.
 * Displays it as its name + its image.
 */
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
                    fontSize: 20
                }}
                alignItems={"center"}
            >
                {this.props.name}
                <Avatar variant={"square"} sx={{
                    width: 200,
                    height: 100,
                }}/>
            </Stack>
        )
    }
}

export default EntityPrimaryCard;