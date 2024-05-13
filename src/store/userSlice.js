import { createSlice} from '@reduxjs/toolkit'

let user = createSlice({                           // useState()역할임, state하나를 slice라고 부른다
    name : 'user',          // state 이름
    initialState : {name : 'kim', age: 20},
 
    reducers :{
        changeName(state){
           state.name = 'park'                  // array/object의 경우 직접 수정해도 state 변경됨(immer.js가 도와주기 때문)
        },
        increase(state, action){
            state.age += action.payload                  // array/object의 경우 직접 수정해도 state 변경됨(immer.js가 도와주기 때문)
        },
    }
})


export let {changeName, increase} = user.actions // user의 state 변경함수들이 담김

export default user