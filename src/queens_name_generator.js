import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQueens } from "./actions";

class QueensNameGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFirst: [
                "Shiny",
                "Psycho",
                "Corky",
                "Tash",
                "Tatianna",
                "Hedda",
                "Dairy",
                "Pharma",
                "Tabasco",
                "Tiffany",
                "Wurst",
                "Blasius",
                "Neiti",
                "Unelma",
                "Bertta",
                "Kroshka",
                "Elochka",
                "Louise",
                "Tomatoe",
                "Nasty",
                "Walkyria",
                "Kottbusser",
                "Drug",
                "JSXXX",
                "Discordia",
                "Coconot"
            ],
            myLast: [
                "Lettuce",
                "Voluminosa",
                "Spicey",
                "Betty",
                "von Sebaste",
                "Taika",
                "Sileäkkö",
                "Bitch",
                "Bukama",
                "Kokoshka",
                "Dirty",
                "Ludoevka",
                "Cherry",
                "Boulette",
                "Cherrypie",
                "Nuts",
                "P'nis",
                "Nipple",
                "Whore",
                "Glamagochi",
                "Debordelle",
                "Boudoire",
                "Frigida",
                "Promises",
                "Runter"
            ]
        };
    }
    componentDidMount() {
        fetch(
            "http://api.giphy.com/v1/gifs/search?q=drag%20Race&api_key=70WdISDr0WsdaWfpWr37TZ7ocoWS1UY9&limit=20"
        )
            .then(res => res.json())
            .then(result => {
                this.setState({
                    giphy: result.data
                });
                console.log("Giphy Api", this.state.giphy);
            });
    }
    getFullName() {
        this.setState({
            dragFirst: this.state.myFirst[
                Math.floor(Math.random() * this.state.myFirst.length)
            ],
            dragLast: this.state.myLast[
                Math.floor(Math.random() * this.state.myLast.length)
            ],
            image: this.state.giphy[
                Math.floor(Math.random() * this.state.giphy.length)
            ]
        });
    }
    getNewFirst() {
        this.setState({
            dragFirst: this.state.myFirst[
                Math.floor(Math.random() * this.state.myFirst.length)
            ]
        });
    }
    getNewLast() {
        this.setState({
            dragLast: this.state.myLast[
                Math.floor(Math.random() * this.state.myLast.length)
            ]
        });
    }
    render() {
        if (!this.props.queens) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_3.gif" />
                </section>
            );
        }
        console.log("In the render of the namegen", this.state);
        return (
            <div id="namegen">
                {this.state.image && (
                    <div id="gify">
                        <img
                            src={this.state.image.images.original.url}
                            alt=""
                        />
                    </div>
                )}
                <div id="name">
                    {this.state.dragFirst && (
                        <div>
                            <h2>{this.state.dragFirst}</h2>
                            <button onClick={e => this.getNewFirst(e)}>
                                Change it!
                            </button>
                        </div>
                    )}

                    {this.state.dragLast && (
                        <div>
                            {" "}
                            <h2>{this.state.dragLast}</h2>
                            <button onClick={e => this.getNewLast(e)}>
                                {" "}
                                Change it!{" "}
                            </button>
                        </div>
                    )}
                </div>
                <button onClick={e => this.getFullName(e)}>
                    Get Fishyyyyy!
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state);
    return {
        queens: state.queens
    };
};

export default connect(mapStateToProps)(QueensNameGenerator);
