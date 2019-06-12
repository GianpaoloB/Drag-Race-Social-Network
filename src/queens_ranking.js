import React from "react";
import { connect } from "react-redux";
import { getQueens, getRanking, getOwnRanking } from "./actions";
import axios from "./axios";

class QueenRanking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getQueens());
        this.props.dispatch(getRanking(document.location.pathname.slice(14)));
        this.props.dispatch(
            getOwnRanking(document.location.pathname.slice(14))
        );
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
                    this.props.dispatch(
                        getRanking(document.location.pathname.slice(14))
                    );
                }
            });
    }

    render() {
        const handleInput = e => {
            this.setState({ [e.target.name]: e.target.value });
        };
        console.log("In the Ranking", this.props);

        if (!this.props.queen) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_2.gif" />
                </section>
            );
        } else {
            let carisma, uniqueness, nerve, talent;
            if (!this.props.ownRanking) {
                carisma = 50;
                uniqueness = 50;
                nerve = 50;
                talent = 50;
            } else {
                carisma = this.props.ownRanking.charisma;
                uniqueness = this.props.ownRanking.uniqueness;
                nerve = this.props.ownRanking.nerve;
                talent = this.props.ownRanking.talent;
            }
            let gCarisma = 0,
                gUniqueness = 0,
                gNerve = 0,
                gTalent = 0;
            if (!this.props.ranking || this.props.ranking.length < 1) {
                gCarisma = 50;
                gUniqueness = 50;
                gNerve = 50;
                gTalent = 50;
            } else {
                console.log("General ranking length", this.props.ranking);
                let tempCharisma = 0;
                let tempUniqueness = 0;
                let tempNerve = 0;
                let tempTalent = 0;
                this.props.ranking.map(rank => {
                    tempCharisma += Number(rank.charisma);
                    tempUniqueness += Number(rank.uniqueness);
                    tempNerve += Number(rank.nerve);
                    tempTalent += Number(rank.talent);

                    console.log("in the map", rank.uniqueness);
                });
                console.log(
                    "Calculating the charisma",
                    this.props.ranking.length
                );
                gCarisma = tempCharisma / this.props.ranking.length;
                gUniqueness = tempUniqueness / this.props.ranking.length;
                gNerve = tempNerve / this.props.ranking.length;
                gTalent = tempTalent / this.props.ranking.length;
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
                                    These are the Vote for {queen.name}'s
                                    Charisma Uniqueness Nerve and Talent
                                    <p>
                                        <label>C</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={gCarisma}
                                            className="slider"
                                            id="charisma"
                                            readOnly
                                        />{" "}
                                        {gCarisma + "%"}
                                    </p>
                                    <p>
                                        <label>U</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={gUniqueness}
                                            className="slider"
                                            id="uniqueness"
                                            readOnly
                                        />
                                        {gUniqueness + "%"}
                                    </p>
                                    <p>
                                        <label>N</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={gNerve}
                                            className="slider"
                                            id="nerve"
                                            readOnly
                                        />
                                        {gNerve + "%"}
                                    </p>
                                    <p>
                                        <label>T</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={gTalent}
                                            className="slider"
                                            id="talent"
                                            readOnly
                                        />
                                        {gTalent + "%"}
                                    </p>
                                </div>
                            </article>
                        </div>
                        <br />
                        <br />
                        <h3>
                            Here you can see your own ranking and rate yourself
                            the queen!
                        </h3>
                        <div>
                            <p>
                                <label>C</label>
                                <input
                                    name="charisma"
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={carisma}
                                    onChange={handleInput}
                                    className="slider"
                                />
                                {this.state.charisma || carisma}%
                            </p>
                            <p>
                                <label>U</label>
                                <input
                                    name="uniqueness"
                                    type="range"
                                    min="1"
                                    max="100"
                                    onChange={handleInput}
                                    defaultValue={uniqueness}
                                    className="slider"
                                />
                                {this.state.uniqueness || uniqueness} %
                            </p>
                            <p>
                                <label>N</label>
                                <input
                                    name="nerve"
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={nerve}
                                    onChange={handleInput}
                                    className="slider"
                                />
                                {this.state.nerve || nerve} %
                            </p>
                            <p>
                                <label>T</label>
                                <input
                                    name="talent"
                                    type="range"
                                    min="1"
                                    max="100"
                                    defaultValue={talent}
                                    className="slider"
                                    onChange={handleInput}
                                />
                                {this.state.talent || talent} %
                            </p>
                            <button onClick={e => this.submit(e)}>VOTE</button>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queen:
            state.queens &&
            state.queens.filter(
                queen => queen.id == document.location.pathname.slice(14)
            ),
        ranking: state.ranking,
        ownRanking: state.ownRanking
    };
};

export default connect(mapStateToProps)(QueenRanking);
