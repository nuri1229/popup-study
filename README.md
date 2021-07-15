# React(CSR)에서 팝업 사용하기

## opener-popup communication

## 목차
1. Dom 직접 조작
2. Redux
3. WindowObject
4. PostMessage
5. localStorage

---
### 1. Dom 직접 조작
#### 코드
```tsx
// num 스테이트가 변경될 때 팝업의 돔에 접근하여 같이 변경시킨다.
useEffect(() => {
    if (popupRef.current) {
      const $span = popupRef.current.document.querySelector('#fromOpenerReceivedData');
      if($span && $span.innerHTML) {
        $span.innerHTML = `${num}`;
      }
    }
}, [num]);
```
#### 문제점 
* 돔의 innerHTML을 변경시켜 보여지는 값을 변경 시키기 가능하나 스테이트에 접근할 수 없음
* 스테이트에 따라 렌더링을 하는 리액트의 동작 방식에 어울리지 않음
* 팝업 오픈과 함꼐 팝업의 돔에 직접 접근할 때에는 CSR 특성상 렌더링 시간에 대한 딜레이가 필요
```tsx
/* fad */
  const popup = window.open('/join/documents/popup', 'imagePopup', `width=${width},height=${height},scrollbars=1`);
  if (popup) {
    const interval = setInterval(() => { // 인터벌로 렌더링 체크
      const doc = popup.document.getElementById('wrap_popup_image');
      if (doc) {
        clearInterval(interval); //인터벌 제거
        doc.appendChild(img); // 로직
      }
    }, 100);

```
---

### 2. Redux
#### 코드
```tsx
/* opener */
const counter = useSelector((state: GlobalState)=>state.counter);
const [num, setNum] = useState<number>(counter); //스토어에 있는 값을 스테이트 값으로 주입.

const increase = () => { // 버튼 클릭 시 스토어 값 +1
  dispatch(setCounterAction(counter + 1));
}

useEffect(() => {
  if(num !== counter) setNum(counter);
}, [counter, num]) // 스토어값 변경 시 스테이트 값도 함께 변경

// 팝업도 같은 스토어 값을 사용
```
#### 문제점
* opener와 popup의 실행 컨텍스트(root)가 다름.
* 팝업에서 실행되는 리액트 어플리케이션은 오프너에서 실행된 리액트 어플리케이션과 별개
* 서로 관계 없는 리액트 어플리케이션 두 개가 존재하게 됨.
* 커뮤니케이션 불가
---
### 3. Window Object
#### 코드
```tsx
/* opener */ 
const openPopup = () => {
  popupRef.current = window.open('/popup3', 'popup3', 'width=300,height=300,right=0,top=0');
  if(popupRef.current) {
    (popupRef.current as any)['setOpenerCount'] = (count:number) => {
      setNum(count);
    }
  }
} // 전역변수의 프로퍼티로 오프너 셋스테이트 함수 추가

/* popup */
useEffect(() => {
  (window as any)['setPopupCount'] = (count:number) => {
    setNum(count);
  }
}, []); // 전역변수의 프로퍼티로 팝업 셋스테이트 함수 추가


/* opener */
useEffect(() => {
  if (popupRef.current && (popupRef.current as any)['setPopupCount']) {
    (popupRef.current as any)['setPopupCount'](num);
  }
}, [num]); //오프너의 state가 변화하면 전역변수에 세팅된 팝업 셋스테이트 함수를 사용하여 팝업의 스테이트 변경

/* popup */
useEffect(() => {
  (window as any)['setOpenerCount'](num);
}, [num]);
```
#### 문제점
* window 객체에 접근하여 타 전역변수 이용 부분과의 충돌 우려
* 리액트 영역 내에서 사용되는 함수를 외부 전역으로 노출시키는 방식이라 은닉화의 문제
---
### 4. postMessage
#### 코드
```tsx
/* opener */
useEffect(() => {
  window.addEventListener("message", (event) => {
    if (event.origin !== origin) return;
    if (event.data.source === "popup" && event.data.count) setNum(event.data.count);
  })
}, []) //메시지 이벤트에 대한 리스너 세팅

useEffect(() => {
  if (popupRef.current) popupRef.current.postMessage({
    source: "opener",
    count: num
  }, "http://localhost:3001");
}, [num]); //스테이트 변경시 팝업으로 postMessage 전송

/* popup */
useEffect(() => {
  window.addEventListener('message', (event) => {
    if (event.origin !== origin) return;
    if (event.data.source === "opener" && event.data.count) setNum(event.data.count);
  })
}, []); //메시지 이벤트에 대한 리스너 세팅

useEffect(() => {
  if(window.opener) {
    (window.opener as Window).postMessage({
      source: 'popup',
      count: num
    }, "http://localhost:3001")
  }
}, [num]); //스테이트 변경시 opener로 postMessage 전송
```
#### 문제점
* popup, iframe 등 한 창(window)를 통해서 열린 window 끼리만 포스트메시지 송수신이 가능
* 엔카 인앱 브라우저에서 팝업이 열리지 않고 새로운 웹뷰(창-팝업이 아닌 창-창의 관계)가 뜨게 될 때는 커뮤니케이션 불가
---
### 5. localStorage
#### 코드
```tsx
/* opener */
useEffect(() => {
  window.addEventListener("storage", (event) => {
    if (event.key === 'CHANGED_COUNT' && event.newValue && event.newValue !== `${num}`) {
      setNum(Number(localStorage.getItem("CHANGED_COUNT")));
    }
  })
}, []) //스토리지 이벤트 리스닝

useEffect(() => {
  localStorage.setItem("CHANGED_COUNT", `${num}`);
}, [num]); //스테이트 변경시 로컬 스토리지 변경

/* popup */
useEffect(() => {
  window.addEventListener("storage", (event) => {
    if (event.key === 'CHANGED_COUNT' && event.newValue && event.newValue !== `${num}`) {
      setNum(Number(localStorage.getItem("CHANGED_COUNT")));
    }
  })
}, []) //스토리지 이벤트 리스닝

useEffect(() => {
  localStorage.setItem("CHANGED_COUNT", `${num}`);
}, [num]); //스테이트 변경시 로컬 스토리지 변경
```

#### 문제점
* 창 - 창의 관계에서도 커뮤니케이션 가능하나 사용한 데이터가 영구적으로 스토리지에 쌓인다는 단점
* 스토리지 제거 시점에 대한 고려 필요


## over-development를 지양하기 위해 개발 범위나 기능에 맞게 잘 선택할 필요

## 웬만하면 모달로 하는게 좋은 것 같다

