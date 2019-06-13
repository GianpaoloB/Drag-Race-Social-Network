import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import queens from "../allQueens.json";
export default class SearchbarQueens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("All the queenz", queens);
    }
    render() {
        const handleInput = e => {
            e.preventDefault();
            this.setState({ result: [] });
            ///looking for the queens in the JSON
            var textArr = [];
            if (e.target.value != " " && e.target.value != "") {
                for (var i = 0; i < queens.length; i++) {
                    if (
                        queens[i].name
                            .toLowerCase()
                            .indexOf(e.target.value.toLowerCase()) != -1
                    ) {
                        textArr.push(queens[i]);
                    }
                }
                textArr = textArr.slice(0, 10);
                this.setState({ result: textArr });
                console.log(textArr);
            }
            if (e.target.value == "") {
                this.setState({ result: [] });
            }
        };
        console.log(this.state);
        return (
            <form onSubmit={e => e.preventDefault()} className="searchbox">
                <input
                    type="text"
                    name="name"
                    placeholder="Weeeeerk find your Queen!..."
                    onChange={e => handleInput(e)}
                />
                <ul id="results">
                    {this.state.result &&
                        this.state.result.map(queen => {
                            let eachQueen = "/queens/" + queen.id;

                            return (
                                <li className="result" key={queen.id}>
                                    <Link to={eachQueen}>
                                        <span className="profilepic">
                                            <img
                                                className="top_profile"
                                                src={
                                                    queen.image_url ||
                                                    "/img/default.png"
                                                }
                                                alt={queen.name}
                                            />
                                        </span>
                                        {queen.name}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </form>
        );
    }
}
