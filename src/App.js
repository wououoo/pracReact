import {Button, Navbar, Container, Nav } from 'react-bootstrap';
import {useState} from "react"
import logo from './logo.svg';
import './App.css';
import bg from './img/Capture001.png';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import styled from 'styled-components';
import React, { createContext } from 'react';
// import axios from 'axios'
import Cart from './routes/Cart.js'



// styled-component 장점
/*
  1. css 파일을 안열어도 된다
  2. 스타일이 다른 js파일로 오염되지 않는다
  3. 페이지 로딩시간 단축

  ** 이거 안쓰고 오염 방지하려면 CSS파일 제목을 컴포넌트.module.css 로 작명
  삼항연산자 그런거 다 가능
  let NewBtn = styled.button(YellowBtn)``   --> 이런 식으로 기존 스타일 복사 가능
  */

let YellowBtn = styled.button `
  background : ${props => props.bg};   
  color: black;
  padding : 10px;
`


// html 에서 public폴더 이미지를 사용할 경우에는 그냥 /이미지경로
// src의 경우는 import를 해야함(import bg from './img/Capture001.png'; 이런식으로 그리고 작명된 이름을 가져다가 써야 함)
// 단 codingapple.com --> 여긴 가능
// codingapple.com/어쩌구/에 발행 시 문제 /어쩌구/파일이름 이렇게 쓰거나
// public 파일의 사용  권장방법은 src= {process.env.PUBLIC_URL + '/파일이름'} --> 이거임
// nested routes-- > 여러 유사한 페이지가 필요할 때 사용(뭐 하나하나 박스만 바뀌는 경우)

/*
  single page application의 단점
  1. 컴포넌트간 state 공유가 어렵다
  2. 
*/



function App() {


// createContext를 사용하여 컨텍스트 생성
const Context1 = createContext();



  let [shoes] = useState(data);
  useNavigate(); // 훅 : 유용한 정보들이 들어있는 함수 ->  페이지 이동 도와줌(useNavigate)
  let navigate = useNavigate();


  return (

    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
          <Route path = "/" element={
            <div>
              <div className ="main-bg" style = {{backgroundImage : 'url(' + bg + ')' }}></div>
              <div className = "container">
                <YellowBtn bg="blue">버튼 </YellowBtn> 
                <div className = "row">
                  {
                    shoes.map((a,i)=>{
                      return(
                        <Card shoes = {shoes[i]} i ={i}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }/>
          <Route path = "/detail/:id" element={<Detail shoes={shoes}/>}/> 

          <Route path = "/cart" element={
              <Cart/>
          }/> 
          
          <Route path="/about" element={ <About/> } >  
            <Route path="member" element={ <div>멤버들</div> } />
            <Route path="location" element={ <div>회사위치</div> } />
          </Route>

          
      </Routes>

      
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}



function Card(props){
  return(
    <div className = "col-md-4">
      <img src = {'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width = "80%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}







export default App;
