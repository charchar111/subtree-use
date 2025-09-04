import NotFound404 from '@/pages/error/not-found-404/NotFound404';
import ApiReference2dSDK from '@/pages/Root/api-reference_2d_SDK/ApiReference2dSDK';
import Example2dSDK from '@/pages/Root/example_2d_SDK/Example2dSDK';
import Home from '@/pages/Root/home/Home';
import Root from '@/pages/Root/Root';
import {
  createBrowserRouter,
  type IndexRouteObject,
  type RouteObject,
} from 'react-router-dom';

// 파일 경로를 바꿀 때에는 ROUTE_BLOCK_URLS에서도 확인해주세요.

// type ICustomRouteObject = Omit<RouteObject, 'children'> & {
//   name?: string; // name을 선택적/필수로 할지 결정 가능
//   children?: ICustomRouteObject[];
// };

// "RouteObject + name" 규칙 정의
type WithName<T = RouteObject> = T & {
  name: string;
  children?: WithName[];
};

export const routeConfig: WithName[] = [
  {
    path: '/',
    element: <Root />,
    name: '공용 레이아웃 + 글로벌 설정',
    errorElement: <NotFound404 />,
    children: [
      {
        id: 'home',
        name: '홈 화면',
        index: true,
        element: <Home />,
      },
      {
        path: 'example_2d_sdk',
        id: 'example_2d_SDK',
        name: '2d sdk 예제',
        element: <Example2dSDK />,
      },
      {
        path: 'api_reference_2d_sdk',
        id: 'api_reference_2d_SDK',
        name: '2d sdk api 레퍼런스',
        element: <ApiReference2dSDK />,
      },
    ],
  },
];

const browserRouter = createBrowserRouter(routeConfig);
export default browserRouter;
