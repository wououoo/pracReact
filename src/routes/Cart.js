import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useState, memo} from "react"
import { changeName, increase } from './../store/userSlice'
import {addCount} from './../store'


// let child = memo(function Child(){
//     return <div>자식임</div> 
// })

// function 함수(){
//     return 반복분 10억번 돌린결과
// }



function Cart(){

    let state = useSelector( (state)=> state )       // redux store을 가져와 준다
    // state == store 안에 있던 모든 state, 딱 하나만 가져오려면 RETURN절에 STATE 대신 STATE.STOCK 이런식으로 써야 함
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)
    // let result = 함수();
    // useMemo(()=>{return 함수}, [state])

    return(
        <div>
            {/* <Child count={count}></Child> */}
            <button onClick={()=>{setCount(count +1)}}>+</button>
            <h6>{state.user.name}{state.user.age}</h6>
            <button onClick = {()=>{dispatch(increase(100))}}>버튼</button>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.cart.map((a,i)=>
                    <tr key ={i}>
                        <td>{state.cart[i].id}</td>
                        <td>{state.cart[i].name}</td>
                        <td>{state.cart[i].count}</td>
                        <td><button onClick={()=>{
                            dispatch(addCount(state.cart[i].id))
                        }}>+</button></td>
                    </tr>
                    )    
                }

            </tbody>
        </Table> 
        </div>
    )
}

export default Cart