import React, {Component, Fragment} from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';

class Search extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {select:"team", keyword : "", result : [], isSearching : false};

        this.submitEvent = this.submitEvent.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
    }

    async submitEvent(e)
    {
        e.preventDefault();

        const {data : {data}} = await axios.get("http://localhost:3000/search/players?key="+ this.state.select + "&value=" + this.state.keyword);
        this.setState({keyword : "", result : data, isSearching : true});
    }

    changeEvent(e)
    {
        // select 박스일경우 이벤트
        if(e.target === document.querySelector("select"))
        {
            this.setState({select : e.target.value});
        }
        else // 인풋일경우
        {
            this.setState({[e.target.name] : e.target.value});
        }
        
    }


    render()
    {
        const {keyword, select, result, isSearching} = this.state;
        return(
        <Fragment>
            <form onSubmit={this.submitEvent}>
                <select onChange={this.changeEvent}>
                    <option value="team">팀</option>
                    <option value="name">이름</option>
                    <option value="years">연도</option>
                    <option value="grade">선수등급</option>
                </select>
                <input name="keyword" value={this.state.keyword} onChange={this.changeEvent} />
                <button type="submit">검색</button>
            </form>
            <ul className="playerlist">
            {
                
                result.map( player => 
                
                    (<SearchResult key={player._id} props={player}/>)

                )
            }
            </ul>
        </Fragment> 
        );
            
    }

}

export default Search;