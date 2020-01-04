import React, { Fragment } from 'react';

const SearchResult = ({props, event}) =>
{
    let playerAttribute = props;
    const team = playerAttribute.팀;
    const overall = playerAttribute.오버롤;
    const years = String(playerAttribute.연도).substring(2, 4);
    const name = playerAttribute.이름;
    const position = playerAttribute.포지션;
    const grade = playerAttribute.선수등급;
    // 선호타순여부로 타자/투수를 구분함
    const like  = playerAttribute.선호타순;
    const hand  = playerAttribute.핸드타입;

    // 미리 레코드를 저장함
    let recordArr = [];
    for(let i=1;i<=10;i++)
    {
        let record = playerAttribute["레코드" + i];
        if(record === undefined) continue;
        recordArr.push(record);
    }

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
                    <span className={overall >= 80 ? "purple grade" : overall >= 70 ? "sky grade" : overall >= 60 ? "green grade" : "brown grade"}>{overall}</span>
                    <a style={{cursor:"pointer", verticalAlign:"text-bottom"}} onClick={event} >[상세보기]</a>
                    <span className="none">{like}</span>
                    <span className="none">{hand}</span>
                    {
                        recordArr.map((record, index) => (<span key={index} className="none">{record}</span>))
                    }
                </Fragment>
            
                }
            </li>
        </Fragment>
        
    );

}



export default SearchResult;