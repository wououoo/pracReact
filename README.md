리액트 강의를 보면서 정리하는 곳!

  let[modal, setModal] = useState(false);  -> 이런식으로 state생성
  
  modal: state의 값을 가진 state명
  setModal: state 변경함수  --> 얘가 필요한 이유는 얘를 이용해서만 state를 변경할 수 있기 때문임
  
  state 변경함수 특징
    기존 state 를 신규 state로 변경해준다
    단, 기존 state == 신규 state 이면 변경안함
     * 주의점(참조형 사용 시)
      array/object 특징: array/object를 담은 변수엔 화살표만 저장됨 따라서 그냥 변경하면 state에서는 변경이 안되므로
      변경이 필요한 곳에
      let copy = [...modal];
      setModal(true)
      이런식으로 바꾸어야함 ... 필요!
      위의 예시는 상관없지만 array/object 요런 값을 가진 state를 사용할 경우 주의!

  * 알아두면 좋은 것
    let [a, c] = [num[0], num[1]];        // destructuring 문법: 객체나 배열에서 필요한 데이터만 추출하여 사용할 때 특히 유용함!
  
  컴포넌트 만드는 법 --> 첫 글자를 대문자로 작성(규칙)
      1.  function 만들고 --> html 안에 만들면 안됨 바깥쪽에 있어야 함
      2. return() 안에 html 담기
      3. <함수명></함수명> 쓰기
      4. 만약 html안에 병렬 기입을 원하면 div로 하나 더 감싸서 그 안에 넣으면 됨
      의미없는 div 대신 <> </> 이렇게도 사용가능(리액트 문법)
  
      어떤 것을 컴포넌트로 만들면 좋은가 
        1. 반복적인 html을 축약할 경우
        2. 큰 페이지들
        3. 자주 변경되는 것들
    
      단점
        STATE를 가져다 쓸 경우 문제가 생긴다  ---> 따라서 props가 필요하다!
    
  부모 -> 자식으로 STATE 전송하는 법 (PROPS)  
    1. <자식컴포넌트 modal = {modal}>  --> 이런식으로 modal의 값을 보내주는 과정이 필요하다(없으면 값을 받을 수 없음)
    2. props 파라미터 등록 후 props.modal 사용
    3. props 전송은 부모에서 자식으로만 가능하다


  map() -- > 많은 div들을 반복문으로 줄여야 할 경우 사용
      1. array 자료 갯수만큼 함수안의 코드를 실행해준다
      2. 함수의 파라미터는 array안에 있던 자료임
      3. return으로 무엇을 적을 경우 array로 담아준다

사용예시 
    [1,2,3].map(function(a){
        return '12312312321'
    })
    --> 배열 안에 값이 세개 있으므로 세번 반복(배열 안의 값이 12312312321이걸로 대체됨)

styled-component
import styled from 'styled-components';

장점
  1. css 파일을 안열어도 된다
  2. 스타일이 다른 js파일로 오염되지 않는다
  3. 페이지 로딩시간 단축

단점
  1. JS 파일이 복잡해짐
  2. 중복 스타일은 컴포넌트간 IMPORT할텐데 CSS와 다른게 없음

** 이거 안쓰고 오염 방지하려면 CSS파일 제목을 컴포넌트.module.css 로 작명
  삼항연산자 그런거 다 가능
  let NewBtn = styled.button(YellowBtn)``   --> 이런 식으로 기존 스타일 복사 가능



    

  동적인 UI만드는 step
    1. html css로 미리 디자인 완성
    2. UI의 현재 상태를 state로 저장
    3. state에 따라 UI가 어떻게 보일지 작성

onClick 쓰는 법 -> 자바스크립트와 비슷하지만 중괄호 필요(onClick={여기안에 만들어놓은 함수를 적거나 () => {} 이렇게 함수를 여기서 작성하거나})



