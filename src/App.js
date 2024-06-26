import {Button, Navbar, Container, Nav } from 'react-bootstrap';
import {lazy, Suspense, useEffect, useState} from "react"
import logo from './logo.svg';
import './App.css';
import bg from './img/Capture001.png';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import Detail from './routes/Detail.js'
import styled from 'styled-components';
import React, { createContext } from 'react';
import axios from 'axios'
// import Cart from './routes/Cart.js'
import { useQuery} from 'react-query';
// 메인페이지 로드 시 필요 없는건 늦게 로드하여 성능 향상
// 사이트 발행할 때도 별도의 js 파일로 분리가 된다
// 단점: cart, detail 페이지 이동 시 로딩시간 발생
const Detail = lazy(()=>{ import('./routes/Detail.js')})
const Cart = lazy(()=>{ import('./routes/Cart.js')})



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

/*
  redux 쓰는 이유
  1. 컴포넌트간 state 이동이 매우 편함
*/
/*
  Local storage 사용(개발자도구 -> application)
  1. 문자데이터만 가능
  2. 5mb까지 문자만 저장가능
  3. 사이트에 재 접속해도 남아있음(브라우저 청소시 삭제)

  localStorage.setItem('age', '20')     // 저장
  localStorage.getItem('age')           // 불러오기
  localStorage.removeItem('age')        // 삭제
  수정하는 문법은 없음
  session storage 이것도 동일
  array/object는 저장불가
  그러나 json형태로 바꾸면 저장 가능
  단점 : 꺼내도 JSON형태로 나오므로  다시 바꿔줘야 함

  session storage
  --> 브라우저 끄면 날라감
*/

/*
react query: 실시간 데이터를 계속 가져와야 하는 사이트들이 쓰면 좋음(코인거래소 등)
 장점
 1. state를 만들지 않아도 된다
 2. 자동으로 refetch해줌(staleTime : 2000, 이런식으로 시간설정 가능)(계속 정보를 가져옴)
 3. 실패했을 때 RETRY를 알아서 해준다
 4. state 공유를 안해도 된다
 5. ajax 결과 캐싱기능(기억한다) 
*/

/*
 spa의 특징
 1. 발행하면 js파일 하나에 모든 코드를 다 쑤셔넣는다
  -- > 로딩이 느림
 
*/

/*
  꼭 필요할 때만 재랜더링 하려면 memo  -> cart.js파일 참고
  원리(props가 변할 때만 재랜더링 해준다)
  props가 길고 복잡하면 손해일 수도 있음

  useMemo 사용법
 */



function App() {

  useEffect(()=>{
    if(localStorage.getItem('watched') != ''){}
    localStorage.setItem('watched', JSON.stringify([]))
  },[])


// createContext를 사용하여 컨텍스트 생성
const Context1 = createContext();

  let [shoes] = useState(data);
  useNavigate(); // 훅 : 유용한 정보들이 들어있는 함수 ->  페이지 이동 도와줌(useNavigate)
  let navigate = useNavigate();
  // let obj = {name : 'kim'}
  // localStorage.setItem('data', JSON.stringify(obj))
  // let 꺼낸거 = localStorage.getItem('data')
  // console.log(JSON.parse(꺼낸거).name)
 
  
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data  
    }),
    { staleTime : 2000} //
  
  )
  
  



  return (

    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
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
          <Route path = "/detail/:id" element={
            <Suspense fallback ={<div>로딩중임</div>}>  
              <Detail shoes={shoes}/>
          </Suspense>
          }/> 

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
