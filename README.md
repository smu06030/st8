# 모아 Project

## 프로젝트 소개

사용자가 국내 여행을 기록하고 방문한 장소별로 스탬프를 찍어 추억을 남길 수 있는 디지털 플랫폼입니다.

#### 📅 프로젝트 기간 : 2024.10.21 ~ 2024.11.21

#### 💻 배포 링크 : [MOA 바로가기](https://st8-dev.vercel.app/)

#### 🏠 팀 노션 : [팀 노션 바로가기](https://www.notion.so/teamsparta/8-bf17275ec94f4ac988eb0362363e3df6)

---

### 선정 배경

최근 통계에 따르면, 전 세계적 팬데믹 상황과 경제적 불안정성으로 인해 해외여행 수요가 급감하고 있으며, 이에 따라 가성비 좋은 국내 여행에 대한 관심이 높아지고 있습니다. 특히 ‘YOLO’(You Only Live Once) 트렌드에서 'YO NO’(해외여행을 자제하는 경향)로 변화하는 사회적 흐름이 이를 뒷받침합니다.  

이러한 흐름 속에서 모아 Project는 사용자가 국내 숨은 명소와 다양한 관광지를 찾아 나서는 여정을 돕고, 이를 기록으로 남기며 공유할 수 있는 공간을 제공합니다. 사용자들은 지역별 스탬프를 모으고, 방문한 장소에 대한 사진을 포토 앨범에 업로드하여 여행의 추억을 한곳에 모을 수 있습니다. 이 과정을 통해 사용자들은 단순한 여행 기록을 넘어, 자신만의 여행 컬렉션을 구축하는 재미를 느낄 수 있습니다.

모아 Project는 이러한 디지털 여행 기록 방식을 통해 사용자가 국내여행을 새롭고 의미 있게 즐길 수 있도록 돕고자 합니다.

---

### 기획 의도

- **특화 포인트**  
  국내 여행 활성화를 위해 전국의 숨은 명소와 지역 특색이 담긴 다양한 관광지를 소개하며, 사용자들의 여행 의욕을 북돋고 국내 여행 소비를 촉진합니다.

- **차별화된 내용**  
  스탬프 투어 기능을 모바일 기기로 손쉽게 이용할 수 있으며, 사용자는 방문한 각 지역마다 스탬프를 수집할 수 있어 여행 기록이 하나의 컬렉션으로 남습니다. 여행 도중 스탬프를 찍는 경험 자체가 또 다른 재미 요소로 작용하여 사용자들이 자연스럽게 여행을 기록하고 공유할 수 있습니다.

---

## 🏗️ 아키텍쳐
![Moa Architecture](https://github.com/user-attachments/assets/70d8cbe6-7466-4347-aac7-81d3bcf93fb3)

---

## 📚 기술 스택
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React Query](https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## **기술적 의사결정**

| 기술 스택             | 선택 이유                                                                                                                                                                                                                       |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Next.js** 🚀       | 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 초기 로딩 속도와 SEO에 유리하며, 파일 기반 라우팅으로 별도의 설정 없이도 직관적인 페이지 관리를 제공하여 선택하였습니다.                                                        |
| **Supabase** 🛠️     | 백엔드 인프라를 직접 구축하지 않고도 API 생성, 인증, 파일 스토리지, 실시간 데이터 동기화 등의 기능을 제공하여 빠르게 애플리케이션을 개발할 수 있어 선택하였습니다.                                                                       |
| **Zustand** 🌐      | 전역 상태를 간편하게 관리하며, 보일러 플레이트가 단순하여 빠르게 환경 설정이 가능하고 컴포넌트 간 데이터 흐름을 최적화하여 효율적인 데이터 관리가 가능해 선택하였습니다.                                                              |
| **TanStack Query** 🔄 | 자동 캐싱과 동기화를 통해 네트워크 요청을 줄이고 성능을 향상시키며, 로딩과 에러 상태 관리가 용이하고 자동으로 재시도 및 업데이트를 처리하여 편리하게 로직을 작성할 수 있어 선택하였습니다.                                               |
| **Vercel** ⚙️        | GitHub와 연동하여 코드 푸시 시 자동으로 빌드와 배포가 이루어져 CI/CD 프로세스를 간편하게 설정할 수 있어 선택하였습니다.                                                                                                          |
| **Tailwind CSS** 🎨  | 유틸리티 우선 접근 방식으로 미리 정의된 클래스를 활용하여 일관된 스타일링이 가능하며, CSS 파일 없이도 빠르고 유연하게 디자인을 적용할 수 있어 개발 생산성이 높아 선택하였습니다.                                                       |

---

## 🪖 팀원

<table>
   <tr>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
  </tr>
  <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/songhyein0123" width="100px" /></td>   
    <td align="center"><img src="https://avatars.githubusercontent.com/lim-bora" width="100px" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/smu06030" width="100px" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/kyulipark" width="100px" /></td>
  </tr>
  <tr>
      <td align="center"><b><a href="https://github.com/kyulipark">팀장 : 송혜인</a></b></td>
    <td align="center"><b><a href="https://github.com/lim-bora">팀원 : 임보라</a></b></td> 
    <td align="center"><b><a href="https://github.com/smu06030">팀원 : 유인철</a></b></td> 
    <td align="center"><b><a href="https://github.com/kyulipark">팀원 : 박규리</a></b></td>
  </tr>
</table>

---

## 🏠 역할 소개

### 전국팔도 8조

| 이름      | 역할      | 담당 기능                                                                                                                                                 |
|---------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **송혜인** | 리더      | 관광지 목록, 관광지 상세, 공공API, 카카오맵 API                                                                                                       |
| **임보라** | 부리더   | Geolocation API, 스탬프 목록, 스탬프 상세 페이지, 앨범 목록, 앨범 상세페이지, 지역별 필터링, 레이아웃, CRUD                                  |
| **유인철** | 팀원      | 카카오맵 API, 메인페이지, 추천여행지 목록, 추천여행지 상세페이지, CRUD                                                                               |
| **박규리** | 팀원      | 회원가입, 로그인(소셜로그인), 마이페이지, 레이아웃                                                                                                   |
| **김재범** | 디자이너  | 웹/모바일 디자인, 배너, 아이콘, 로고, 브로셔 디자인                                                                                                 |

---

## 📚 주요 기능

### 🗺️ 스탬프 서비스

#### **스탬프 지도 페이지**
- 지역별 카테고리를 슬라이드하여 특정 지역을 선택할 수 있습니다.
- 찍은 스탬프의 위치를 표시하여 지역별 스탬프 현황을 확인하고, 클릭 시 해당 장소의 정보를 제공합니다.
- **전체 스탬프 목록 페이지**로 이동할 수 있습니다.

#### **스탬프 찍는 페이지**
- 사용자의 현재 위치를 기반으로 해당 지역의 스탬프를 찍을 수 있습니다.
- 찍은 스탬프는 사용자가 별명을 지정하여 쉽게 추억할 수 있습니다.

#### **스탬프 목록 페이지**
- 17개의 지역별 스탬프가 활성화/비활성화 상태로 표시되어 사용자 소유 스탬프 현황을 한눈에 파악할 수 있습니다.
- 비활성화된 스탬프가 활성화되며 모으는 재미를 더했습니다.
- 활성화된 스탬프를 누르면 **상세 페이지**로 이동합니다.

#### **지역별 스탬프 상세 페이지**
- 활성화된 스탬프의 이미지와 처음 찍은 일시, 주소, 총 개수를 제공합니다.
- 히스토리 드롭다운에서 해당 지역에서 찍은 스탬프의 장소 정보를 확인할 수 있습니다.

---

### 🚎 지역별 관광지 소개

#### **관광지 목록 페이지**
- 전국의 관광지 정보를 키워드별, 지역별로 확인할 수 있습니다.
- 각 관광지별 **북마크 기능**을 제공하며, 저장한 관광지는 마이페이지에서 확인할 수 있습니다.

#### **관광지 상세 페이지**
- 해당 관광지의 운영 시간, 주차 여부, 휴일 등 주요 정보를 확인할 수 있습니다.
- 위치와 상세 정보도 함께 제공하여 여행 계획을 쉽게 세울 수 있습니다.

---

### 🌉 포토앨범 기록

#### **포토앨범 페이지**
- 사용자가 특정 지역의 사진을 업로드해 여행의 추억을 앨범으로 모을 수 있습니다.
- 이미지를 확대하거나 슬라이드 방식으로 앨범을 감상할 수 있어 추억을 쉽게 돌아볼 수 있습니다.

---

### 👣 마이페이지

#### **마이페이지 기능**
- 사용자 닉네임을 변경할 수 있으며, 찜한 여행지, 모은 스탬프 현황, 업로드한 사진 갯수를 한눈에 확인할 수 있습니다.
- **최근 여행지**와 **과거의 오늘**을 슬라이드 형식으로 볼 수 있어 개인화된 여행 기록을 제공합니다.

---

### 😀 로그인/회원가입

- 구글, 카카오 계정으로 **소셜 로그인**이 가능합니다.
- 이메일과 비밀번호 유효성 검사를 통해 가입 여부를 체크합니다.
- 아이디/비밀번호 찾기 기능을 제공하며, **자동 로그인**으로 편리한 사용 경험을 제공합니다.

---

## 기술적 의사결정

- Next.js <br/>
- pnpm<br/>
- tailwind<br/>
- supabase<br/>
- zustand<br/>
- tanstack <br/>
- API
  - 카카오지도 Api
  - Geolocation Api
  - 한국 관광공사 Api

---

## MVP

- [x] **`landing` 페이지**
- [x] **`loading` 페이지**
- [x] **`home` 페이지**
  - [x] 지도로 보는 나의 여행기록
    - [x] 지역별 핀
  - [x] 스탬프
    - [x] 스탬프 찍기
    - [x] 스탬프 보러가기
  - [x] 모아가 추천하는 여행지
- [x] **`stamp` 페이지**
  - [x] 모아온 스탬프 보기
    - [x] 스탬프 상세
    - [x] 스탬프 히스토리
- [x] **`album` 페이지**

  - [x] 나의 추억들
    - [x] 전체보기, 지역별 보기
    - [x] 전체보기로 이미지업로드시 지역선택모달창 
    - [x] 지역별로 이미지업로드
    - [x] 지역별 이미지 상세보기
    - [x] 사진 슬라이드, 편집기능

- [x] **`login` 페이지**
- [x] 이메일 로그인
- [x] 소셜 로그인

- [x] **`singup` 페이지**
- [x] 닉네임 페이지
- [x] 이메일 페이지
- [x] 비밀번호 페이지
  - [x] 유효성 검사
- [x] 가입완료 페이지

- [x] **`tourism` 페이지**
- [x] 국내 추천 여행지
  - [x] 추천여행지 상세
- [x] **`mypage` 페이지**
  - [x] 내 정보 수정(닉네임)
  - [x] 내가 찜한 여행지
  - [x] 나의 추억들
  - [x] 나의 발자취
  - [x] 로그아웃
- [x] 공통
  - [x] tailwind
  - [x] supabase

---

## 모아 미리보기

<img width="180" alt="스크린샷 2024-11-07 오전 9 30 01" src="https://github.com/user-attachments/assets/90b8ec8c-24d3-4240-9354-937682725a14">
<img width="180" alt="스크린샷 2024-11-07 오전 9 28 05" src="https://github.com/user-attachments/assets/0a327fbd-3f1a-4fcb-98a1-1afda8eb0559">
<img width="180" alt="스크린샷 2024-11-07 오전 9 28 49" src="https://github.com/user-attachments/assets/0b6f0c2a-3542-4532-b445-b01e9e8a4477">
<img width="180" alt="스크린샷 2024-11-07 오전 9 28 58" src="https://github.com/user-attachments/assets/ba6d6c2a-006c-4814-873b-bb1b7bed0ab0">
<img width="180" alt="스크린샷 2024-11-07 오전 9 29 16" src="https://github.com/user-attachments/assets/c359b6aa-eb7c-46ed-b53f-a9805eac929c">
<img width="180" alt="스크린샷 2024-11-07 오전 9 29 23" src="https://github.com/user-attachments/assets/027b4b5a-d61b-458d-aff7-e5f3bf51f13b">
<img width="180" alt="스크린샷 2024-11-07 오전 9 29 34" src="https://github.com/user-attachments/assets/bf770b57-8a11-47ff-bdad-45dff341e47e">
<img width="180" alt="스크린샷 2024-11-07 오전 9 29 43" src="https://github.com/user-attachments/assets/51007137-283c-47c8-954a-c3f656025b8f">
---

## 🔥 트러블슈팅

### 1. Icon

기존에는 아이콘을 각각 만들어서 **`중복되는 코드`** 들이 너무 많은 문제가 있었습니다.<br />

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWYmIO%2FbtsKvek48H4%2FvykkNRU3pKsXL2LB6s6oG0%2Fimg.png">

### 기존 코드

```ts
const AlbumIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="...."
          fill=black
      />
    </svg>
  );
};
```

### 리팩토링 코드

path 크기를 **동적으로 렌더링**하고 **배경색과 아이콘 반경을 조정**할 수 있게 수정

```ts
import { ICONS } from '@/constants/icons';

interface IconProprType {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  bgColor?: string;
  rx?: string;
}

const Icon = ({ name, size = 28, color = 'black', bgColor, rx }: IconProprType) => {
  const icon = ICONS[name];

  // 사이즈 동적 조절
  const scale = size >= 28 ? size / 28 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex items-center justify-center"
    >
      {bgColor && <rect width={size} height={size} rx={rx} fill={bgColor} />}
      <g transform={`scale(${scale})`}>
        <path fillRule="evenodd" clipRule="evenodd" d={icon} fill={color} />
      </g>
    </svg>
  );
};

export default Icon;
```

### 2. Modal

모달창을 구현하다 보니 다양한 컴포넌트에서 **`동일한 모달 로직을 반복적으로 사용하는 문제`** 가 있었습니다.

### useModal 커스텀 훅 분리

커스텀 훅을 이용한 모달 상태 관리와 포탈 렌더링을 분리해 사용해서 **재사용성**과 **가독성**을 높일 수 있었습니다.

```ts
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalElement(document.getElementById('overlays'));
    }
  }, [isOpen]);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal = ({ children }: { children: React.ReactNode }) => {
    if (!isOpen || !portalElement) return null;

    return createPortal(
      <div
        onClick={closeModal}
        style={{ zIndex: 999, backgroundColor: 'rgba(53, 53, 53, 0.6)' }}
        className="fixed inset-0"
      >
        {children}
      </div>,
      portalElement
    );
  };

  return { isOpen, openModal, closeModal, Modal };
};

export default useModal;
```

### 3. 배포

미리 배포를 하고 개발을 시작하여서, 배포 오류를 바로바로 찾아 수정 작업을 한것이 너무 좋았습니다.

## 추후 개발 방향

3주동안 프로젝트를 진행하면서 기능을 넣는것에 집중하느라 , 폴더와 파일들이 많아지는데도 리팩토링이 아직 부족해서 최종 발표까지는 진도를 빼는것만이 아닌 개개인의 코드리뷰와 피드백을 반영하며, 리팩토링을 중점으로 차근차근 진행하고,  UT를 반영하여 개선사항위주로 추가 진행을 하면서 필요에따라 기능추가를 할 예정입니다
