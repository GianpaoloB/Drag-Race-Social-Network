import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
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
                        season: result,
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
        // const handleInput = e => {
        //     this.setState({ [e.target.name]: e.target.value });
        // };

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
            this.state.episodes &&
                this.state.episodes.map(episode => {
                    let epiLink = "/episode/" + episode.id;
                    episodes.push(
                        <li>
                            <Link to={epiLink}>
                                {episode.episodeInSeason} - {episode.title}{" "}
                                aired on{" "}
                                {moment(episode.airDate).format(
                                    "MMMM Do YYYY, h:mm a"
                                )}
                            </Link>
                        </li>
                    );
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
        this;
        return (
            <section className="project" id="friendspage">
                <div id="seasons">
                    <h3>
                        SEASONS {document.location.pathname.slice(8)} Queens
                    </h3>
                    <div className="container queens">{queens}</div>

                    <h3>
                        SEASONS {document.location.pathname.slice(8)} Episodes
                    </h3>
                    <div className="container episodes">
                        <ul>{episodes}</ul>
                    </div>
                    <br />
                    <br />
                    <h3>
                        SEASONS {document.location.pathname.slice(8)} Judges
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

export default connect(mapStateToProps)(Season);
