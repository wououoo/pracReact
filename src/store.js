import { configureStore,createSlice} from '@reduxjs/toolkit'
import user from './store/userSlice.js'



let stock = createSlice({                          
    name : 'stock',          // state 이름, 재고
    initialState : '[10,11,12]'
})


let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let 번호 = state.findIndex((a)=>{return a.id === action.payload})       // a는 object 안에 있는 모든 데이터를 의미
            state[번호].count++
        },
        addItem(state, action){
            state.push(action.payload)                              // push 배열에 추가해주는 함수
        }
    }
})

export let {addCount, addItem} = cart.actions

 
// 모든 state를 여기에 넣지는 말자!
    // redux의 state 변경법
    /*
        1. state 수정해주는 함수 만들고
        2. 원할 때 그함수 실행해달라고 store.js에 요청
        3. 사용하는 파일에서 import해서 사용
        4. dispatch(state변경함수())
    */

export default configureStore({
  reducer: {
    user : user.reducer,         // redux store에 state 보관하는 법
    stock : stock.reducer,
    cart : cart.reducer
    }
}) 