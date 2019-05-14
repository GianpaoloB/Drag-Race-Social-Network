import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
class Episode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Season", this.props);
    }
    componentDidMount() {
        let number = document.location.pathname.slice(9);
        console.log("Before fetching", number);
        fetch(
            "http://www.nokeynoshade.party/api/episodes/" +
                number +
                "/challenges"
        )
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    challenges: result
                });
                let pics = [];
                Promise.all(
                    result[0].queens.map(queen =>
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
        fetch("http://www.nokeynoshade.party/api/episodes/" + number)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    episode: result
                });
            });
        fetch(
            "http://www.nokeynoshade.party/api/episodes/" + number + "/judges"
        )
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    judges: result
                });
            });
        fetch(
            "http://www.nokeynoshade.party/api/episodes/" + number + "/lipsyncs"
        )
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    lipsyncs: result
                });
            });
        console.log("At the end of the mount", this.state.challenges);
    }
    render() {
        console.log("in the render", this.state);
        // const handleInput = e => {
        //     this.setState({ [e.target.name]: e.target.value });
        // };
        // var winner =
        //     this.state.challenges &&
        //     this.state.challenges[0].queens.filter(wonby => wonby.won == true);
        // console.log("The winner is", winner);
        if (!this.state.queens) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_4.gif" />
                </section>
            );
        }
        let queens = [];
        let judges = [];
        let challenges = [];
        let lipsyncs = [];
        {
            this.state.queens &&
                this.state.queens.map(queen => {
                    let eachQueen = "/queens/" + queen.id;
                    queens.push(
                        <div
                            className="queen friendslist project"
                            key={queen.id}
                        >
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
            this.state.challenges &&
                this.state.challenges.map(challenge => {
                    if (challenge.type == "main") {
                        let winner = challenge.queens.filter(
                            wonby => wonby.won == true
                        );
                        challenges.push(
                            <h4>
                                MAXI CHALLENGE:
                                {" " + challenge.description} {winner[0].name}
                                {this.prize && " - " + this.prize}
                            </h4>
                        );
                    } else {
                        let winner = challenge.queens.filter(
                            wonby => wonby.won == true
                        );
                        challenges.push(
                            <h4>
                                MINI CHALLENGE
                                {" " + challenge.description} {winner[0].name}
                                {this.prize && " - " + this.prize}
                            </h4>
                        );
                    }
                });
        }
        {
            this.state.judges &&
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
        {
            this.state.lipsyncs &&
                this.state.lipsyncs.map(lipsync => {
                    let winner = lipsync.queens.filter(
                        wonby => wonby.won == true
                    );
                    <div>
                        The queen who had to lipsync are:
                        {lipsync.queens.map(queen => {
                            if (winner[0].name == queen.name) {
                                lipsyncs.push(
                                    <h4> {queen.name} won this lipsync</h4>
                                );
                            } else {
                                lipsyncs.push(
                                    <h4> {queen.name} sahayed away...</h4>
                                );
                            }
                        })}
                    </div>;
                });
        }
        return (
            <section className="project" id="friendspage">
                <div id="seasons">
                    <h3>
                        Seson {this.state.episode.seasonId} episode
                        {this.state.episode.title}
                        {this.state.episode.episodeInSeason}'s Queens
                    </h3>
                    <div className="container queens">{queens}</div>

                    <br />
                    <br />
                    <h3>
                        Seson {this.state.episode.seasonId} episode{" "}
                        {this.state.episode.episodeInSeason}'s Challenges
                    </h3>
                    <div className="container challenges">
                        <ul>{challenges}</ul>
                    </div>
                    <br />
                    <br />
                    <h3>
                        Seson {this.state.episode.seasonId} episode{" "}
                        {this.state.episode.episodeInSeason}'s Lipsync
                    </h3>
                    <div className="container lipsync">
                        <ul>{lipsyncs}</ul>
                    </div>
                    <br />
                    <br />
                    <h3>
                        Seson {this.state.episode.seasonId} episode{" "}
                        {this.state.episode.episodeInSeason}'s Judges
                    </h3>
                    <div className="container judges">{judges}</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queen: state
    };
};

export default connect(mapStateToProps)(Episode);
