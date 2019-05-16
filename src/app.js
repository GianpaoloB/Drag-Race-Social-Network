import React from "react";
import { Link } from "react-router-dom";

import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile.js";
import Bio from "./bio";
import OtherProfile from "./otherprofile.js";
import Friends from "./friends";
import Online from "./online";
import Chat from "./chat";
import Dragrace from "./dragrace";
import Season from "./season";
import Episode from "./episode";
import Queen from "./queen";
import QueensGeneral from "./queens_general";
import QueenRanking from "./queens_ranking";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
            console.log("Component has mounted");
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <section id="modal">
                    <img id="spinner" src="/img/spinner.gif" />
                </section>
            );
        } else {
            return (
                <BrowserRouter>
                    <div id="app">
                        <div id="header">
                            <h1>
                                <Link to="/">
                                    <img
                                        src="/img/rupaul_dragrace_logo.png"
                                        alt="Bear Book Homepage"
                                    />
                                </Link>
                            </h1>

                            <nav>
                                <li>
                                    <Link to="/dragrace">Dragrace</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/friends">Friends</Link>
                                </li>
                                <li>
                                    <Link to="/chat">Chat</Link>
                                </li>
                                <li>
                                    <Link to="/game">Game</Link>
                                </li>
                                <li>
                                    <a href="/logout">Logout</a>
                                </li>
                            </nav>
                            <ProfilePic
                                id={this.state.id}
                                first={this.state.first_name}
                                last={this.state.last_name}
                                image_url={this.state.image_url}
                                clickHandler={() =>
                                    this.setState({
                                        showUploader: true
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Route exact path="/" component={Dragrace} />
                            <Route
                                exact
                                path="/dragrace"
                                component={Dragrace}
                            />
                            <Route path="/season" component={Season} />
                            <Route path="/episode" component={Episode} />
                            <Route path="/queens" component={Queen} />
                            <Route
                                exact
                                path="/game"
                                component={QueensGeneral}
                            />
                            <Route
                                path="/game/ranking"
                                component={QueenRanking}
                            />
                            <Route
                                exact
                                path="/profile"
                                render={() => {
                                    return (
                                        <Profile
                                            first={this.state.first_name}
                                            last={this.state.last_name}
                                            clickHandler={() =>
                                                this.setState({
                                                    showUploader: true
                                                })
                                            }
                                            profilePic={
                                                <ProfilePic
                                                    id={this.state.id}
                                                    first={
                                                        this.state.first_name
                                                    }
                                                    last={this.state.last_name}
                                                    image_url={
                                                        this.state.image_url
                                                    }
                                                    clickHandler={() =>
                                                        this.setState({
                                                            showUploader: true
                                                        })
                                                    }
                                                />
                                            }
                                            bioEditor={
                                                <Bio
                                                    bio={this.state.bio}
                                                    setBio={this.setBio}
                                                />
                                            }
                                        />
                                    );
                                }}
                            />
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        loggedId={this.state.id}
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route path="/friends" component={Friends} />
                            <Route
                                path="/online"
                                render={props => (
                                    <Online loggedId={this.state.id} />
                                )}
                            />
                            <Route path="/chat" component={Chat} />
                        </div>

                        {this.state.showUploader && (
                            <Uploader
                                setImage={url =>
                                    this.setState({ image_url: url })
                                }
                                clickHandler={() =>
                                    this.setState({ showUploader: false })
                                }
                            />
                        )}
                    </div>
                </BrowserRouter>
            );
        }
    }
}
