import React from "react";
import { connect } from "react-redux";
import { getQueens } from "./actions";
import axios from "./axios";

class QueenRanking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getQueens());
    }
    submit(e) {
        e.preventDefault();
        console.log("About to Rank a queen", this.state);
        axios
            .post(
                "/queens/ranking/" + document.location.pathname.slice(14),
                this.state
            )
            .then(({ data }) => {
                console.log("What i got from the server is", data);
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({
                        bio: data.bio,
                        showform: false,
                        showBio: true,
                        showlink: true
                    });
                }
            });
    }
    render() {
        const handleInput = e => {
            this.setState({ [e.target.name]: e.target.value });
        };
        console.log("In the Ranking", this.state);

        if (!this.props.queen) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_2.gif" />
                </section>
            );
        }

        const queen = this.props.queen[0];

        return (
            <div id="profile">
                <section className="project" id="queen">
                    <h3>
                        Vote for the Charisma Uniqueness Nerve and Talent of
                        this queen's season
                    </h3>
                    <br />
                    <br />
                    <div id="userdata">
                        <span>
                            <img
                                src={queen.image_url || "/img/default.png"}
                                alt=""
                            />
                        </span>
                        <article>
                            <h2>{queen.name}</h2>

                            <div id="general">
                                These are the Vote for {queen.name}'s Charisma
                                Uniqueness Nerve and Talent
                                <p>
                                    <label>C</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value="50"
                                        className="slider"
                                        id="charisma"
                                    />
                                </p>
                                <p>
                                    <label>U</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value="50"
                                        className="slider"
                                        id="uniqueness"
                                    />
                                </p>
                                <p>
                                    <label>N</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value="50"
                                        className="slider"
                                        id="nerve"
                                    />
                                </p>
                                <p>
                                    <label>T</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value="50"
                                        className="slider"
                                        id="talent"
                                    />
                                </p>
                            </div>
                        </article>
                    </div>
                    <br />
                    <br />
                    <h3>
                        Here you can see your own ranking and rate yourself the
                        queen!
                    </h3>
                    <div>
                        <p>
                            <label>C</label>
                            <input
                                name="charisma"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.charisma || 50}
                                onChange={handleInput}
                                className="slider"
                            />
                            {this.state.charisma || 50} %
                        </p>
                        <p>
                            <label>U</label>
                            <input
                                name="uniqueness"
                                type="range"
                                min="1"
                                max="100"
                                onChange={handleInput}
                                value={this.state.uniqueness || 50}
                                className="slider"
                            />
                            {this.state.uniqueness || 50} %
                        </p>
                        <p>
                            <label>N</label>
                            <input
                                name="nerve"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.nerve || 50}
                                onChange={handleInput}
                                className="slider"
                            />
                            {this.state.nerve || 50} %
                        </p>
                        <p>
                            <label>T</label>
                            <input
                                name="talent"
                                type="range"
                                min="1"
                                max="100"
                                value={this.state.talent || 50}
                                className="slider"
                                onChange={handleInput}
                            />
                            {this.state.talent || 50} %
                        </p>
                        <button onClick={e => this.submit(e)}>VOTE</button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queen:
            state.queens &&
            state.queens.filter(
                queen => queen.id == document.location.pathname.slice(14)
            )
    };
};

export default connect(mapStateToProps)(QueenRanking);
