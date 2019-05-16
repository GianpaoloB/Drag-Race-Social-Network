import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
export default function Welcome() {
    return (
        <section className="project">
            <h2>
                Welcome to the main stage of the Dragrace world, the social
                network for the Queenzz and their sickening friendzzzz!
            </h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </section>
    );
}
