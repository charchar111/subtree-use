import { useState } from 'react';
import '@/app/styles/App.css';
import { Button as SCNButton } from '@/components/ui/button';
import { RouterProvider } from 'react-router-dom';
import browserRouter from './routes/Router';

/**
 * @module 리엑트 앱의 엔트리 모듈. 전역 설정
 * @description  리엑트와 관련한 글로벌 앱 설정을 세팅한다
 *
 * 예시 :
 * - 전역 상태 라이브러리 설정
 * - react-query 설정
 * - react-router-dom 설정
 *
 */
function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
