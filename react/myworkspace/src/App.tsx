// 메인 화면
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
// global 저장소를 사용할 수 있게 제공해줌
import { Provider } from "react-redux"; // react 앱애 redux store 제공
import { store } from "./store"; // redux store

import Home from "./Home";
import Profile from "./domain/profile/Profile";

const Contact = lazy(() => import("./domain/contact/Contact_강현수"));
const Todo = lazy(() => import("./domain/todo/Todo"));
const feed = lazy(() => import("./domain/feed/feed"));
const Photo = lazy(() => import("./domain/photo/Photo"));
// Suspense영역 태그는 밖에 lazy로딩이 되지 않기 때문에 import를 걸어줘야함
// const Navigation = lazy(() => import("./Navigation"));

// React == 컴포넌트 개발 라이브러리
// body안의 태그를 작성
function App() {
  return (
    // Provider로 감싸진 부분을 store(index.ts에서 만든 저장소)를 사용할 수 있게 함
    <Provider store={store}>
      <Router>
        {/* return안에 메인 페이지 화면(index.html)에 보여질 html코드를 react코드형식(jsx)으로 작성함 */}
        {/* main container */}
        <div className='mx-auto'>
          <header className='app-bar d-flex justify-content-end bg-primary shadow'>
            <Profile />
          </header>
          <nav className='drawer-menu position-fixed bg-light shadow-sm'>
            <h3 className='ms-2'>MY WORKSPACE</h3>
            <ul>
              <li>
                <Link to='/Home'>Home</Link>
              </li>
              <li>
                <Link to='/Todo'>Todo</Link>
              </li>
              <li>
                <Link to='/feed'>feed</Link>
              </li>
              <li>
                <Link to='/Contact'>Contact</Link>
              </li>
              <li>
                <Link to='/Photos'>Photos</Link>
              </li>
            </ul>
          </nav>
          <main className='content-container'>
            <Suspense fallback={<div>Laoding...</div>}>
              {/* lazy로딩할 컴포넌트들은 Sumpense로 감싸줘야함 */}
              <Switch>
                {/* Switch 영역에 컴포넌트가 로딩됨 */}

                {/* 해당 경로에 대해서 로딩할 컴포넌트 목록을 작성 */}
                {/* Route로 경로를 설정함 */}
                {/* path='경로' component={해당 경로 컴포넌트}*/}
                {/* Route로 경로, 컴포넌트를 지정해주고 실제 이동시키는 역할을 Link가 함 */}
                {/* <Route path='/Contact' component={Contact} /> */}
                <Route path='/Home' component={Home} exact />
                <Route path='/Todo' component={Todo} />
                <Route path='/Contact' component={Contact} />
                <Route path='/feed' component={feed} />
                <Route path='/Photos' component={Photo} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
// 파일 이름과 exprot 함수 이름과 import한 객체(index.tsx에서 선언한)(?) 이름을 통일하는게 일반적.
export default App;
