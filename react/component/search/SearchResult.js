import React, { Fragment } from 'react';

const SearchResult = ({props}) =>
{
    let playerAttribute = props;
    const team = playerAttribute.팀;
    const overall = playerAttribute.오버롤;
    const years = String(playerAttribute.연도).substring(2, 4);
    const name = playerAttribute.이름;
    const position = playerAttribute.포지션;
    const grade = playerAttribute.선수등급;

    return(
        <Fragment>
            <li className={grade==="에이스" ? "ace" : grade==="몬스터" ? "monster" : grade==="스페셜" ? "special" : "normal"}>
                {/* {Object.entries(playerAttribute).map(player => (
                    player[0] === "_id" ? "" : 
                    
                    <Fragment>
                        <span>{player[0] + " : " + player[1] }</span>
                    </Fragment>) //END OF MAP
                        ) // END OF ENTRIES
                } */
                
                <Fragment>
                    <span>{team}</span>
                    <span className="name">{years === "-" ? name : years + " " + name}</span>
                    <span>{position}</span>
                    <span>{grade}</span>
                    <span className={overall >= 80 ? "purple" : overall >= 70 ? "sky" : overall >= 60 ? "green" : "brown" }>{overall}</span>
                </Fragment>
            
                }
            </li>
        </Fragment>
        
    );

}



export default SearchResult;