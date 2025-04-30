# 비즈니스캔버스 FE 채용 과제

개발 기간: 2025.04.29 - 2025.04.30

## 프로젝트 실행 방법

1. install dependencies  
   `yarn`

2. run project  
   `yarn dev`

## 구현 내용

- 회원 목록 Table 구현
  - `useMemberRecord` 훅 분리하여 storage env 체크 및 레코드 추가/수정/삭제 로직 추상화
  - `useTable` 훅으로 테이블의 column 등의 공통 props 분리
  - `ModalContext`를 전역으로 정의하여 모달 open/close 로직을 일관된 방식으로 처리할 수 있도록 구현
  - `FormItem` 컴포넌트를 분리하여 Form을 구성하는 아이템을 field 타입에 따라 렌더링되도록 구현
