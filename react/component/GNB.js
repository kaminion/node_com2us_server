import React, {Component} from "react";

class GNB extends Component 
{
    render()
    {
        return (
            <nav>
                <ul>
                    <li><a href="/">선수검색</a></li>
                    <li><a>자유게시판</a></li>
                    <li><a>마이덱</a></li>
                </ul>
            </nav>
        );
    }
}

export default GNB;