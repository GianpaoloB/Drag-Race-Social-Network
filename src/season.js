import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import SearchbarQueens from "./search_queen.js";

class Season extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Season", this.props);
    }
    componentDidMount() {
        let number = document.location.pathname.slice(8);
        console.log("Before fetching", number);
        fetch("http://www.nokeynoshade.party/api/seasons/" + number)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    season: result
                });
                let pics = [];
                Promise.all(
                    result.queens.map(queen =>
                        fetch(
                            "http://www.nokeynoshade.party/api/queens/" +
                                queen.id
                        )
                            .then(res => res.json())
                            .then(data => {
                                pics.push(data);
                            })
                    )
                ).then(result => {
                    this.setState({
                        isLoaded: true,
                        queens: pics
                    });
                });
            });
        fetch(
            "http://www.nokeynoshade.party/api/seasons/" + number + "/episodes"
        )
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    episodes: result
                });
            });
        fetch("http://www.nokeynoshade.party/api/seasons/" + number + "/judges")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    judges: result
                });
            });
    }
    render() {
        console.log("in the render", this.state);

        if (!this.state.queens) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_2.gif" />
                </section>
            );
        }
        let queens = [];
        let judges = [];
        let episodes = [];
        {
            this.state.queens &&
                this.state.queens.map(queen => {
                    let eachQueen = "/queens/" + queen.id;
                    let classes = "";
                    if (queen.winner) {
                        classes = "queen friendslist project winner";
                    } else if (queen.missCongeniality) {
                        classes = "queen friendslist project congenial";
                    } else {
                        classes = "queen friendslist project";
                    }
                    queens.push(
                        <div className={classes} key={queen.id}>
                            <Link to={eachQueen}>
                                <span className="profilepic">
                                    <img
                                        className="top_profile"
                                        src={queen.image_url}
                                    />
                                </span>
                                <h5>{queen.name}</h5>
                            </Link>
                        </div>
                    );
                });
        }
        {
            this.state.episodes &&
                this.state.episodes.map(episode => {
                    let epiLink = "/episode/" + episode.id;
                    if (
                        episode.title != "Grand Finale" &&
                        episode.title != "Extra Special Edition" &&
                        episode.title != "The Main Event Clip Show" &&
                        episode.title != "The Grand Finale" &&
                        episode.title != "Countdown to the Crown" &&
                        episode.title != "The Finale" &&
                        episode.title != "Grande Finale" &&
                        episode.title != "Reunion" &&
                        episode.title != "Reunited" &&
                        episode.title != "Queens Reunited" &&
                        episode.title != "Reunited!" &&
                        episode.title != "Re-United!" &&
                        episode.title != "RuPaul Rewind"
                    ) {
                        episodes.push(
                            <li key={episode.id}>
                                <Link to={epiLink}>
                                    {episode.episodeInSeason} - {episode.title}{" "}
                                    aired on{" "}
                                    {moment(episode.airDate).format(
                                        "MMMM Do YYYY, h:mm a"
                                    )}
                                </Link>
                            </li>
                        );
                    } else {
                        episodes.push(
                            <li key={episode.id}>
                                {episode.episodeInSeason} - {episode.title}{" "}
                                aired on{" "}
                                {moment(episode.airDate).format(
                                    "MMMM Do YYYY, h:mm a"
                                )}
                            </li>
                        );
                    }
                });
        }
        {
            !this.state.judges.error &&
                this.state.judges.map(judge => {
                    judges.push(
                        <div
                            className="queen friendslist project"
                            key={judge.id}
                        >
                            <span className="profilepic">
                                <img
                                    className="top_profile"
                                    src={
                                        judge.img_url || "/img/placeholder.png"
                                    }
                                />
                            </span>
                            <h5>
                                {judge.name} - {judge.type}
                            </h5>
                            <p>{judge.bio}</p>
                        </div>
                    );
                });
        }
        let seasonNumber = "";
        console.log(
            "SEASON NUMBER",
            this.state.season.seasonNumber.slice(0, 1)
        );
        if (this.state.season.seasonNumber.slice(0, 1) == "A") {
            seasonNumber = this.state.season.seasonNumber.replace(
                "A",
                "All STARS "
            );
        } else {
            seasonNumber = this.state.season.seasonNumber;
        }
        return (
            <section className="project" id="friendspage">
                <div id="seasons">
                    {this.state.queens && (
                        <article>
                            <h3>
                                SEASONS {seasonNumber} Queens{" "}
                                <SearchbarQueens />
                            </h3>
                            <div className="container queens">{queens}</div>
                        </article>
                    )}
                    {this.state.episodes.length > 0 && (
                        <article className="elements">
                            <h3>SEASONS {seasonNumber} Episodes</h3>
                            <div className="container episodes">
                                <ul>{episodes}</ul>
                            </div>
                        </article>
                    )}
                    <br />
                    <br />
                    {!this.state.judges.error && (
                        <article className="elements">
                            <h3>SEASONS {seasonNumber} Judges</h3>
                            <div className="container judges">{judges}</div>
                        </article>
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        // seasons: state.seasons
    };
};

export default connect(mapStateToProps)(Season);
