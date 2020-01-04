import React, {Component, Fragment} from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';

class Search extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {select:"team", keyword : "", result : [], count : 0};

        this.submitEvent = this.submitEvent.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
        this.clickEvent  = this.clickEvent.bind(this);
    }

    async submitEvent(e)
    {
        e.preventDefault();

        const {data : {data, cnt}} = await axios.get("http://localhost:3000/search/players?key="+ this.state.select + "&value=" + this.state.keyword);
        this.setState({keyword : "", result : data, count : cnt});
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

    clickEvent(e)
    {
        let playercardCls = document.querySelectorAll(".playercard");
        let selectCard = e.target;

        if(playercardCls === undefined || playercardCls === null ) return -1;
        
        for(let i=0;i<playercardCls.length;i++)
        {
            playercardCls[i].remove();
        }

        let like = selectCard.nextSibling.innerText;
        // 선호타순 체크
        if(like === "") return -1;

    }


    render()
    {
        const {keyword, select, result, count} = this.state;

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
            {count !== 0 ? (
            <li style={{color:"black"}}>총 {count}개의 결과가 있습니다.</li>) : 
            <li style={{color:"black"}}>"검색을 해주세요"</li> }

            {
                result.map( player => 
                    (<SearchResult key={player._id} props={player} event={this.clickEvent}/>)
                )
            }
            </ul>
        </Fragment> 
        );
            
    }

}

export default Search;