import React, { Component, Fragment } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";

class App extends Component
{
    render()
    {
        return (
            <Fragment>
                <Header/>
                <h1>컴프매라이브</h1>
                <Footer/>
            </Fragment>
            
        );
    }
}

export default App;