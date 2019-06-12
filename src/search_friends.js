import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
export default class SearchbarFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const handleInput = e => {
            e.preventDefault();
            e.target.value &&
                axios
                    .get("/friendships/search/" + e.target.value)
                    .then(({ data }) => this.setState({ result: data }));
            if (e.target.value == "") {
                this.setState({ result: [] });
            }
        };
        console.log(this.state);
        return (
            <form className="searchbox">
                <input
                    type="text"
                    name="name"
                    placeholder="Find your Heathers..."
                    onChange={e => handleInput(e)}
                />
                <ul id="results">
                    {this.state.result &&
                        this.state.result.map(person => {
                            let userlink = "/user/" + person.id;

                            return (
                                <li className="result" key={person.id}>
                                    <Link to={userlink}>
                                        <span className="profilepic">
                                            <img
                                                className="top_profile"
                                                src={
                                                    person.image_url ||
                                                    "/img/default.png"
                                                }
                                                alt={
                                                    (person.first_name,
                                                    person.last_name)
                                                }
                                            />
                                        </span>
                                        {person.first_name +
                                            " " +
                                            person.last_name}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </form>
        );
    }
}
