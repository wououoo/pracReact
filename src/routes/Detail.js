import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
// import {Context1} from './../App.js'
import {addItem} from "./../store"
import { useDispatch } from "react-redux";

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

    // let {재고, shoes} = useContext(Context1)

    let [fade2, setFade2] =useState('')


    useEffect(()=>{
      // mount, update 시 실행됨
      let a = setTimeout(()=>{setAlert(false)}, 1000)

      return ()=>{
        // useEffect 동작 전에 실행되는 return()=>{}
        // clean up function은 mount시 실행이 안되고 unmount시 실행된다(다른페이지로 갈때)
        // 여기서의 사용처:기존타이머는 제거해주세요!     
        clearTimeout(a) // 타이머를 제거해주는 함수
      }
    }, [])

    useEffect(()=>{
      setFade2('end')
      return ()=>{
        setFade2('')
      }
    })

    let dispatch = useDispatch()

    /*
    즉 useEffect는
    1. 재랜더링마다 코드 실행하고 싶을 때
    2. mount 시 1회 코드를 실행하고 싶으면
    3. return 에서 작성되는건 unmount 시 1회 코드를 실행하고 싶으면 
    
    [count] --> dependency라고 함
    위의 경우 count라는 state가 변하는 경우마다 실행
    [] 안에 없는 경우로 쓰는 경우도 있음
    */


    /*
    전환 애니메이션 만드는 법
    1. css파일에 부착하면 애니메이션 나오는 className 하나 만들고
    2. 원할 때 부착하면 된다

    즉 
    1. 애니메이션 동작 전 className을 만들고
    2. 동작 후 className을 만들기
    3. className에 transition 속성 추가
    4. 원할 때 2번 className 부착
    */

    /*
    props를 사용하는 경우 부모에서 자식객체로 너무 많이 보낼 경우 쓸 수 있는 방법
    1. Context API --> 리액트 기본문법  --> props없이 자식객체가 부모 state 사용 가능
     --> 단점
      1) state 변경 시 쓸데없는 것까지 재랜더링
      2) 나중에 컴포넌트 재사용이 어려워진다
    2. Redux  --> 외부 라이브러리
    */




    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x){
      return x.id == id
    });
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(0);
   
    useEffect(()=>{
      let 꺼낸거 = localStorage.getItem('watched')
      꺼낸거 = JSON.parse(꺼낸거)
      꺼낸거.push(찾은상품.id)
      꺼낸거 = new Set(꺼낸거)

      localStorage.setItem('watched', JSON.stringify(꺼낸거))
    }, [])

    return(
      <div className={'container start ' + fade2}>
        {
          alert == true 
          ? <div className = "alert alert-warning">
              2초 이내 구매시 할인
            </div>
          : null
        }
        {count}
        <button onClick={()=>{ setCount(count+1)  }}></button>
        {/* {재고[0]} */}
        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes' + [찾은상품.id+1] + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <button className="btn btn-danger" onClick = {()=>{

            }}>주문하기</button> 
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick = {()=>{탭변경(0)}}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick = {()=>{탭변경(1)}}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick = {()=>{탭변경(2)}}>버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent 탭 = {탭} shoes = {props.shoes}/>  
      </div> 
    )
  }

   // 리액트의 automatic batching 기능 --> 여러 state들이 인접해 있다면 한번에 모아서 실행하고 재랜더링함
   // 따라서 타이머를 설정해서 실행시키면 해결할 수 있음
  function TabContent({탭, shoes}){
    // let {재고} = useContext(Context1)

    let [fade, setFade] = useState('')

    useEffect(()=>{ 
      let a = setTimeout(()=>{setFade('end')}, 100)

      return ()=>{
        clearTimeout(a)
        setFade('')
      }
    },[탭])

    return <div className = {'start ' + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
      </div>
  }


  export default Detail;