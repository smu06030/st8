# 모아 Project

## 프로젝트 소개

온라인으로 개인 여행을 기록하고, 그에 대한 스템프를 찍으면서 추억을 남기는 플랫폼입니다.

#### 📅 프로젝트 기간 : 2024.10.21 ~ 2024.11.07

#### 💻 배포 링크 : [MOA 바로가기](https://st8-dev.vercel.app/)

#### 🏠 팀 노션 : [팀 노션 바로가기](https://www.notion.so/teamsparta/8-bf17275ec94f4ac988eb0362363e3df6)

### 선정 배경

이전에는 YOLO라며 해외여행, 오마카세등을 즐기는 추세였다면 최근에는 YO NO로 해외여행이 줄어들고 있는 추세입니다. 이런 시기에 해외여행을 대체할 수 있는 가성비 국내여행을 하는 사람들에게 내가 갔었던 여행에 대한 기록을 남겨 추억하게 하는 플랫폼을 제작하는것을 목표로 생각하였습니다.

### 기획 의도

- 특화 포인트<br/>
  : 국내 여행 활성화를 위해 국내의 숨은 명소와 다양한 관광지를 소개하면 사용자들의 국내여행 소비를 촉진시킬 수 있다.

- 차별화된 내용<br/>
  : 스탬프 투어를 모바일 기기로 쉽게 할 수 있으면 다양한 스탬프 투어 경험을 제공 할 수 있다.

## 📚 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

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

## ⚔️ 역할

### 혜인

추천 여행지 : 북마크

- 관광지 목록 페이지: Supabase에서 자료를 불러와 사용자에게 다양한 관광지를 표시하는 페이지를 구성하였습니다. 데이터는 Tanstack Query를 사용하여 비동기적으로 불러오고, 사용자 경험을 향상시키기 위해 React Query의 캐싱 기능을 활용하여 페이지 로딩 속도를 최적화했습니다.

- 관광지 디테일 페이지: 공공 API를 이용해 각 관광지의 상세 정보를 불러와 세부 정보를 제공하는 페이지를 구현하였습니다. Kakao Map API를 통합하여 사용자가 지도 상에서 해당 관광지의 위치를 시각적으로 확인할 수 있도록 하였으며, 북마크 기능을 추가하여 사용자가 관심 있는 관광지를 쉽게 저장하고 관리할 수 있도록 했습니다.

- 찜한 목록(북마크) 페이지: 사용자가 북마크한 관광지를 관리하는 페이지를 제작하였습니다. Supabase를 통해 사용자별 북마크 데이터를 저장하고 불러오며, 사용자가 북마크 상태를 실시간으로 업데이트할 수 있도록 Tanstack Query의 invalidateQueries를 사용하여 최신 상태를 유지하도록 구성하였습니다.

### 보라

스탬프 추가삭제, 스탬프목록, 앨범목록

- Geolocation API와 Kakao map을 사용하여 사용자의 현재위치를 기준으로 지역별 카테고리로 나눈 스탬프가 활성화되게하고, 사용자 본인의 스탬프 현황을 알 수 있는 목록화면을 구성하였습니다. 
- 사용자의 기준의 데이터를 TanstackQuery로 불러와 사용자가 업로드한 사진을 시각화하였고, useMutations으로 이미지를 올릴 수 있는 input과 데이터를 연결하여 파일리더가 로드되었을때 데이터가 저장되어 추가되는 기능과 사용자의 아이디를 기준으로 삭제할 수 있는 기능으로 사용자의 경험을 향상시켰습니다. 
또한 TanstackQuery에서 제공하는 invalidateQueries로 항상 최신상태를 유지하도록 구현하였습니다.

### 인철

메인 페이지, 지도 : 지도 불러오기, 스탬프 , 추천여행지

- 카카오맵 행정구역 데이터를 json 형태로 받아와 필터링 과정을 거쳐서 폴리곤을 렌더링 했습니다. 근데 json 데이터에 폴리곤과 멀티폴리곤 형태로 나눠져 있어 필터링 과정을 거치고 폴리곤을 렌더링 할 수 있게 로직을 수정했습니다!

```ts
import { CoordinatesType } from '@/types/stampMap/CoordRegionCode.types';
import coordRegionCode from '../../../coordregioncode.json';

// 행정구역 PathList 가져오기
export const pathListFormatter = () => {
  const { features } = coordRegionCode;

  const data = features.map((item) => {
    const { geometry, properties } = item;
    const { CTP_KOR_NM } = properties;
    const { coordinates, type } = geometry;

    const pathList =
      type === 'Polygon'
        ? getPolygonPathList(coordinates)
        : type === 'MultiPolygon'
          ? getMultiPolygonPathList(coordinates)
          : [];

    return {
      name: CTP_KOR_NM,
      path: pathList,
      isHover: false,
      key: Math.random()
    };
  });

  return data;
};

// Polygon pathList 포멧 (3차원 배열)
const getPolygonPathList = (coordinates: CoordinatesType) => {
  return coordinates.map((areaList) => areaList.map(([lng, lat]) => ({ lng: Number(lng), lat: Number(lat) })));
};

// MultiPolygon pathList 포멧 (4차원 배열)
const getMultiPolygonPathList = (coordinates: CoordinatesType) => {
  return coordinates.flatMap((polygon) =>
    polygon.map(
      (areaList) =>
        areaList
          .map((area) => {
            if (Array.isArray(area)) {
              const [lng, lat] = area;
              return { lng: Number(lng), lat: Number(lat) };
            }
            return null; // null을 반환하는 대신 에러를 방지
          })
          .filter((item): item is { lng: number; lat: number } => item !== null) // null 제거
    )
  );
};
```

### 규리

로그인, 회원가입, 마이페이지 : Supabase를 활용한 로그인, 로그아웃, 회원 가입과 마이 페이지
- 인풋창을 분리하여 재사용이 가능하도록 구현하였고, 동작에 따라 창의 색을 달리하여 유저가 시각적으로 액티브상태를 볼 수 있도록 하였습니다.
```ts
 const styles = {
    default: {
      border: 'border-gray-300',
      iconColor: '#9C9C9C',
      textColor: 'text-gray-400'
    },
    active: {
      border: 'border-secondary-800',
      iconColor: '#00688A',
      textColor: 'text-secondary-800'
    },
    done: {
      border: 'border-green-900',
      iconColor: '#1D1D1D',
      textColor: 'text-green-900'
    }
  };

useEffect(() => {
    if (!value) {
      setCurrentStatus('default');
    } else if (status === 'done') {
      setCurrentStatus('done');
    } else {
      setCurrentStatus('active');
    }
  }, [value, status]);

   <Icon name={iconName} color={currentStyle.iconColor} />
        <input
          type={type}
          placeholder={placeholder}
          className={`flex-grow bg-transparent text-sm font-normal text-[#004156] focus:outline-none ${currentStyle.textColor}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

```


- 보다 재미있고 친근하게 회원가입을 할 수 있도록 스텝 페이지 작업을 하였습니다.

```ts
import NicknameStep from './signup/StepNicknameForm';
import EmailStep from './signup/StepEmailForm';
import PasswordStep from './signup/StepPasswordForm';
import GoMainStep from './signup/StepMainForm';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {step === 0 && <NicknameStep onNext={(nickname: string) => handleNext({ nickname })} />}
      {step === 1 && <EmailStep onNext={(email: string) => handleNext({ email })} />}
      {step === 2 && <PasswordStep onNext={(password: string) => handleNext({ password })} />}
      {step === 3 && <GoMainStep onNext={() => handleSignup()} />}
    </div>
  );
```

<img width="180" alt="스크린샷 2024-11-07 오전 12 20 28" src="https://github.com/user-attachments/assets/862aec71-9576-4b2d-8c5c-736ea25f2832">

<img width="180" alt="스크린샷 2024-11-07 오전 12 20 38" src="https://github.com/user-attachments/assets/b3c94b75-5570-4cce-abb3-b8e691a9dc31">

<img width="180" alt="스크린샷 2024-11-07 오전 12 20 12" src="https://github.com/user-attachments/assets/a43aa871-818a-4b3a-818e-8cec57b5fa08">

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
  - [ ] 나의 추억들
  - [ ] 나의 발자취
  - [x] 로그아웃
- [x] 공통
  - [x] tailwind
  - [x] supabase

## 모아 미리보기



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

저희는 코드리팩토링을 중점으로, UT를 반영하여 개선사항위주로 추가 진행을 하면서 필요에따라 기능추가를 할 예정입니다.
