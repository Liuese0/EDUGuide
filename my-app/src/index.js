import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM의 createRoot를 임포트
import App from './App'; // App 컴포넌트를 임포트

// React 18에서 createRoot를 사용하여 앱을 렌더링
const root = ReactDOM.createRoot(document.getElementById('root')); // root element 선택
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링 */}
  </React.StrictMode>
);