import React from "react";
import {Link} from "@mui/material";
import PageEnum from "../page-enum";

class ArtistsListWithLinks extends React.Component<any, any>{

    goToArtistPage = (artistName: string): void => {
        this.props.setArtistName(artistName);
        this.props.setPage(PageEnum.ARTIST);
    }

    createArtistLinks = (): JSX.Element => {
        if (typeof this.props.artists === "string") {
            return (
              <Link href={"#"} onClick={() => this.goToArtistPage(this.props.artists)}>
                    {this.props.artists}
                </Link>
            );
        }
        let artists: string[] = this.props.artists;
        let artistLinks: JSX.Element[] = [];
        for (let i = 0; i < artists.length; i++) {
            artistLinks.push(<Link
                href={"#"}
                onClick={() => this.goToArtistPage(artists[i])}
                key={artists[i]}>
                {artists[i]}
            </Link>);
            if (i !== artists.length - 1) {
                artistLinks.push(<span key={artists[i] + "span"}>, </span>);
            }
        }
        return <>{artistLinks}</>;
    }

    render() {
        return(
            <>
                {this.createArtistLinks()}
            </>
        );
    }
}

export default ArtistsListWithLinks;