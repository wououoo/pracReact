import {Button, Navbar, Container, Nav } from 'react-bootstrap';
import {useState} from "react"
import logo from './logo.svg';
import './App.css';
import bg from './img/Capture001.png';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'



// html 에서 public폴더 이미지를 사용할 경우에는 그냥 /이미지경로
// src의 경우는 import를 해야함(import bg from './img/Capture001.png'; 이런식으로 그리고 작명된 이름을 가져다가 써야 함)
// 단 codingapple.com --> 여긴 가능
// codingapple.com/어쩌구/에 발행 시 문제 /어쩌구/파일이름 이렇게 쓰거나
// public 파일의 사용  권장방법은 src= {process.env.PUBLIC_URL + '/파일이름'} --> 이거임
// nested routes-- > 여러 유사한 페이지가 필요할 때 사용(뭐 하나하나 박스만 바뀌는 경우)

function App() {

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


          
          <Route path="/about" element={ <About/> } >  
            <Route path="member" element={ <div>멤버들</div> } />
            <Route path="location" element={ <div>회사위치</div> } />
          </Route>

          <Route path="/event" element={ <Event/> } >  
            <Route path="one" element={ <div>첫 주문 시 양배추즙 서비스</div> } />
            <Route path="two" element={ <div>생일기념 쿠폰받기</div> } />
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
