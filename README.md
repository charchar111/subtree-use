# 산림청 프로젝트

# 컨셉

2D 플랫폼

개발자 지원 플랫폼임

# 파일 설명

tsconfig.app.json
웹 브라우저에서 ts 파일 빌드 시 사용

tsconfig.node.json
vite.config.ts로 빌드할 때 쓰는 것 같아서 놔둠

# 기능 설명

문서 통합 모듈

라우트 설명

홈
지도 예제

API 레퍼런스

## 라우팅

react-router-dom@v6 으로 사용함

### v7이 나왔는데 6을 쓰는 이유

- 레퍼런스가 많아서

- 써본 경험이 많아서 빨리 개발이 되어서

### v6을 쓸 때 우려 사항

- 장기적으로 보면 v6이 2021년 즈음 릴리스라, 이 프로젝트가 오래되면 나중에 다른 신형 라이브러리랑 호환성 오류가 나지 않을까 싶음

- SSR, SSG 같은 Remix 기반 기능 못씀. 어차피 CSR이라 상관없긴 한데, 만약 필요가 생기면 마이그레이션이 불가피

# 빌드 설명

nginx config 설정 파일
웹 서버 호스팅용

jenkinsFile
ci/cd 용

# 개발 관련

## 커밋 컨벤션

feat

fix

doc

## prettier 설정

`.prettierrc` 랑 `.prettierignore` 에 있으니 참고

## 환경 설정

### 노드 환경 설정 방법

의존성 버전에 맞춰서 node 최소 버전을 명시해 놨음(vite 때문에 node 최소 버전이 높음)

.nvmrc 파일을 보고 수동으로 맞추거나

nvm 으로 버전 관리를 한다면 다음 커맨드 실행

```bash
# 명시된 노드 버전이 있는지 확인
nvm install (Get-Content .nvmrc)

# 명시된 노드 버전 사용
nvm use (Get-Content .nvmrc)

```
