import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQueens } from "./actions";

class QueensGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(getQueens());
    }
    render() {
        const { queens } = this.props;
        console.log("in the render", queens);
        // const handleInput = e => {
        //     this.setState({ [e.target.name]: e.target.value });
        // };

        if (!queens) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_2.gif" />
                </section>
            );
        }
        let queenZ = [];

        {
            queens &&
                queens.map(queen => {
                    let eachQueen = "/game/ranking/" + queen.id;
                    queenZ.push(
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

        return (
            <section className="project" id="friendspage">
                <div id="seasons">
                    <h3>SEASONS 11 Queens</h3>
                    <div className="container queens">{queenZ}</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queens: state.queens
    };
};

export default connect(mapStateToProps)(QueensGeneral);
