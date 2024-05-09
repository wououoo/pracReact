import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// styled-conponents를 쓰지않고 오염을 방지하려면 컴포넌트.module.css로 작명
// 스타일이 다른 js 파일로 오염되지 않는다 --> styled-conponents 장점
// 페이지 로딩시간을 단축해줌
// 단점: js파일이 길어짐
// 2. 다른파일 IMPORT해서 써야되는데  CSS와 다를게 없음
// 3. 협업 시 css담당의 숙련도 이슈
// let YellowBtn = styled.button`
//   background-color: ${props => props.bg};
//   color: ${props => props.bg == 'blue' ? 'white' : 'black'};
//   padding: 10px;
// `

// let NewBtn = styled.button(YellowBtn);
// let BlackBox = styled.div`
//   background: grey;
//   padding : 20px;
// `

// 컴포넌트의 Lifecycle --> 갈고리 달기 useEffect --> 쓰는이유
// 복잡한 연산을 처리할 때 좋음 --> html을 먼저 그리고 후에 동작하기 때문
// 어려운연산, 서버에서 데이터 가져오는 작업, 타이머 장착하는 것
// 특징: 실행 시점이 다름(랜더링 후 동작함)



function Detail(props){

    useEffect(()=>{
      // mount, update 시 실행됨

    })

    setTimeout(()=>{실행할 코드}, 100)

    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x){
      return x.id == id
    });

    let [count, setCount] = useState(0);
    
    return(
      <div className="container">
        <div className = "alert alert-warning">
          2초이내 구매 시 할인
        </div>
        {count}
        <button onClick={()=>{ setCount(count+1)  }}></button>
        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes' + [찾은상품.id+1] + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div> 
    )
  }

  export default Detail;