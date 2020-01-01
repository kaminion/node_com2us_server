import React, { Component, Fragment } from "react";
import Header from "./component/Header";
import GNB from "./component/GNB";
import Search from "./component/search/Search";
import Footer from "./component/Footer";

class App extends Component
{
    render()
    {
        return (
            <Fragment>
                <Header/>
                <GNB />
                <Search/>
                <Footer/>
            </Fragment>
            
        );
    }
}

export default App;