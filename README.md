# 광고 정산 데이터 리포트 프로젝트

이 프로젝트는 광고 정산 데이터를 받아와 해당 데이터를 통해 제공할 수 있는 다양한 형태의 리포트를 보여주는 React 프로젝트입니다.

## 데모

[광고 정산 데이터 리포트 데모](https://ad-report.vercel.app/)

## 기술 스택

- **UI 라이브러리**: React.js
- **빌드 도구**: Vite
- **언어**: TypeScript
- **상태 관리 및 서버 상태 동기화**:
  - TanStack Query (구 React Query)
  - Zustand (클라이언트 상태 관리)
- **라우팅**: React Router
- **HTTP 클라이언트**: Axios
- **UI 컴포넌트**:
  - shadcn
- **스타일링**:
  - Tailwind CSS (유틸리티 기반 CSS 프레임워크)
- **테이블**: TanStack Table

## 프로젝트 구조

```
src/
├── components/   # 재사용 가능한 UI 컴포넌트
├── hooks/        # 커스텀 React 훅
├── lib/          # 유틸리티 함수
├── pages/        # 페이지 컴포넌트
│   ├── dashboard/
│   │   ├── components/
│   │   └── hooks/
│   ├── monthly/
│   │   ├── components/
│   │   └── hooks/
│   ├── top/
│   │   ├── components/
│   │   └── hooks/
│   └── yearly/
│       ├── components/
│       └── hooks/
├── providers/    # React Context Providers
└── services/     # API 통신 및 데이터 처리 로직
```

각 페이지 폴더 내부에 `components`와 `hooks`를 추가하여 해당 페이지에서 사용되는 컴포넌트와 훅을 모아두었습니다.

## 실행 방법

프로젝트를 실행하려면 다음 명령어를 사용하세요:

```bash
yarn && yarn dev
```

## 주요 고민 사항

### 대시보드 페이지

- Dashboard 페이지에서는 최소 단위의 데이터로 빠른 초기 로딩 구현
- 데이터 로딩 중 Progress Bar를 통한 사용자 피드백 제공
- Production이라면 최신 데이터를 불러왔을 것. 허나 데모용 데이터를 고려해 랜덤한 데이터를 불러오도록 처리.

### 대용량 데이터 처리

- 홈페이지 진입과 동시에 백그라운드에서 대용량 데이터 사전 요청 및 캐싱.
- 최대 8초 정도 걸리는 큰 요청의 체감 시간 줄임

## 레포트 구성

레포트는 연간, 월간, 그리고 캠페인 성과 데이터로 구분되어 제공됩니다.

### 대시보드

<img src="https://github.com/user-attachments/assets/c7d28ed2-70a4-40c0-913f-5d2252918ced" alt="대시보드" width="600"/>

### 연간 레포트

<img src="https://github.com/user-attachments/assets/c260c9fe-95eb-41d9-b3a4-146d8c278bc7" alt="연도별 성과 레포트" width="600"/>

- 수익, 수수료, 완료 캠페인, 캠페인 당 수익에 대한 연간 데이터 차트 제공
- 필터링 가능한 데이터 테이블 제공

### 월간 레포트

<img src="https://github.com/user-attachments/assets/63e6918e-79fb-4f05-af94-f86507c9edb4" alt="월별 성과 레포트" width="600"/>

- 선택한 월의 다년간 데이터 비교 기능
- 수익, 수수료, 완료 캠페인, 캠페인 당 수익에 대한 월간 데이터 차트 제공
- 필터링 가능한 데이터 테이블 제공

### 상위 캠페인 레포트

<img src="https://github.com/user-attachments/assets/13f33ce2-fce5-4245-852f-324b03a324d2" alt="상위 캠페인 레포트" width="600"/>

- 선택한 월의 상위 5개 캠페인과 기타(others) 카테고리로 구성된 차트 제공
  (총 7개 미만 캠페인의 경우 모든 캠페인 개별 표시)
- 상세 데이터 테이블 제공
