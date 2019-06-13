import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
class Queen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Season", this.props);
    }
    componentDidMount() {
        let number = document.location.pathname.slice(7);
        console.log("Before fetching", number);
        fetch("http://www.nokeynoshade.party/api/queens/" + number)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    queen: result
                });
            });
        console.log("At the end of the mount", this.state.queen);
    }
    render() {
        console.log("in the render", this.state);

        if (!this.state.queen) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_3.gif" />
                </section>
            );
        }
        let challenges = [];
        {
            this.state.queen.challenges &&
                this.state.queen.challenges.map(challenge => {
                    if (challenge.type == "main") {
                        challenges.push(
                            <h4>
                                MAXI CHALLENGE:
                                {" " + challenge.description}
                                {this.prize && " - " + this.prize}
                            </h4>
                        );
                    } else {
                        challenges.push(
                            <h4>
                                MINI CHALLENGE
                                {" " + challenge.description}
                                {this.prize && " - " + this.prize}
                            </h4>
                        );
                    }
                });
        }
        let lipsyncs = [];
        {
            this.state.queen.lipsyncs &&
                this.state.queen.lipsyncs.map(lipsync => {
                    if (lipsync.won) {
                        lipsyncs.push(
                            <h4>
                                {" "}
                                {lipsync.name} by {lipsync.artist} and won this
                                lipsync
                            </h4>
                        );
                    } else {
                        lipsyncs.push(
                            <h4>
                                {" "}
                                {lipsync.name} by {lipsync.artist} and sahayed
                                away...
                            </h4>
                        );
                    }
                });
        }
        let seasons = [];
        {
            this.state.queen.seasons &&
                this.state.queen.seasons.map(season => {
                    let seasonLink = "/season/" + season.id;
                    seasons.push(
                        <Link to={seasonLink}>
                            {season.seasonNumber +
                                " and placed herself at the " +
                                season.place +
                                " place "}
                            <br />
                        </Link>
                    );
                });
        }
        let episodes = [];
        {
            this.state.queen.episodes &&
                this.state.queen.episodes.map(episode => {
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
        return (
            <div id="profile">
                <section className="project queenapi" id="queen">
                    <div id="userdata">
                        <span>
                            <img
                                src={
                                    this.state.queen.image_url ||
                                    "/img/default.png"
                                }
                                alt=""
                            />
                        </span>
                        <article>
                            <h2>{this.state.queen.name}</h2>
                            <p>{this.state.queen.quote}</p>
                            <p>
                                Took part at the seasons:
                                <br />
                                {seasons}
                            </p>
                            {this.state.queen.missCongeniality && (
                                <h4 id="congenial"> MISS CONGENIALITY!!!</h4>
                            )}
                            {this.state.queen.winner && (
                                <h4 id="winner"> WINNER OF THE SEASON</h4>
                            )}
                        </article>
                    </div>
                    <br />
                    <br />
                    <h3>{this.state.queen.name}'s Episodes</h3>
                    <div className="container episodes">
                        <ul>{episodes}</ul>
                    </div>
                    <br />
                    <br />
                    <h3>Challenges </h3>
                    <div className="container challenges">
                        <ul>{challenges}</ul>
                    </div>
                    <br />
                    <br />
                    <h3>Lipsync for her life with the song</h3>
                    <div className="container lipsync">
                        <ul>{lipsyncs}</ul>
                    </div>
                    <br />
                    <br />
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queen: state
    };
};

export default connect(mapStateToProps)(Queen);
