// 메인 화면
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import Home from "./Home";

const Todo = lazy(() => import("./components/Todo"));
const Feed = lazy(() => import("./components/feed_강현수"));
// Suspense영역 태그는 밖에 lazy로딩이 되지 않기 때문에 import를 걸어줘야함
// const Navigation = lazy(() => import("./Navigation"));

// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    <Router>
      {/* return안에 메인 페이지 화면(index.html)에 보여질 html코드를 react코드형식(jsx)으로 작성함 */}
      {/* main container */}
      <div style={{ width: "900px" }} className='mx-auto'>
        <nav
          style={{ width: "200px", height: "100px", top: "20px" }}
          className='position-fixed'
        >
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/todo'>Todo</Link>
            </li>
            <li>
              <Link to='/feed'>Feed</Link>
            </li>
          </ul>
        </nav>
        <main style={{ marginLeft: "200px", marginTop: "20px" }}>
          <Suspense fallback={<div>Laoding...</div>}>
            {/* lazy로딩할 컴포넌트들은 Sumpense로 감싸줘야함 */}
            <Switch>
              {/* Switch 영역에 컴포넌트가 로딩됨 */}

              {/* 해당 경로에 대해서 로딩할 컴포넌트 목록을 작성 */}
              {/* Route로 경로를 설정함 */}
              {/* path='경로' component={해당 경로 컴포넌트}*/}
              {/* Route로 경로, 컴포넌트를 지정해주고 실제 이동시키는 역할을 Link가 함 */}
              <Route path='/' component={Home} exact />
              <Route path='/todo' component={Todo} />
              <Route path='/feed' component={Feed} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
// 파일 이름과 exprot 함수 이름과 import한 객체(index.tsx에서 선언한)(?) 이름을 통일하는게 일반적.
export default App;
