/**
 * @file 리엑트 앱 초기화, 리엑트 앱 외적 설정
 * @description 리엑트와 관련 없는 앱의 글로벌 설정을 담당한다.
 *
 * 예시 :
 * - tailwind 설정
 */
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';

createRoot(document.getElementById('root')!).render(<App />);
