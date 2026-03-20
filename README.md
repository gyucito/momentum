## Gyumentum

HTML CSS JS로 만든 **Momentum** 스타일의 개인 대시보드입니다.

- 실시간 시계 (12/24시간제 토글)
- 사용자 이름 입력 후 인사말 (시간대별)
- 오늘의 할 일(To-Do) 리스트 (완료 체크, 수정, 삭제, 목록 토글)
- Pomodoro 타이머 (집중/휴식 모드, 시간 조절, 알람)
- 배경 이미지 (랜덤)
- 반응형 디자인 (모바일 지원)

## 데모 스크린샷

![로그인](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fq0juN%2FdJMcagEQVYf%2FAAAAAAAAAAAAAAAAAAAAAP9TWTJnKbJ_SWMpZ638BBN2aNyYLoZfV1NPssm-kKN3%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DE8hGMNTb%252BP1gb2T8ZO13fCPOf6A%253D)

![할 일](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FchUaHP%2FdJMcaduvoJp%2FAAAAAAAAAAAAAAAAAAAAAGJ_6ne4FTecdFBSW0YMuxc1MlSrfcnvIil52KLC5krD%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DtGa0cNamh1yASGWcvuEWcoYng4s%253D)

![뽀모도로](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fu0s3o%2FdJMcaduvoJw%2FAAAAAAAAAAAAAAAAAAAAAGAGg2HFuTYXzOndicyxkgpmM0BwD3p0_Dfsx_z5f2ud%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DjmyBdi29oHWmE%252BketIh6OLCyzMU%253D)

## 주요 기능

- **로그인**  
  - 이름 입력 후 Enter → localStorage 저장
  - 이름 없으면 로그인 화면 표시

- **실시간 시계**  
  - 24시간제 ↔ 12시간제 토글 버튼
  - localStorage로 설정 유지

- **시간대별 인사말**  
  - 아침/점심/저녁 구분
  - 할 일 탭에서만 표시

- **To-Do 리스트**  
  - 오늘 날짜 기준 할 일 관리 (localStorage)
  - 입력 → 추가 → 완료 체크 → 수정 or 삭제
  - 목록 전체 보이기/숨기기 토글 (아이콘 전환)
  - 포모도로 탭에서도 유지 (입력창만 숨김)

- **Pomodoro 타이머**  
  - 집중(기본 25분) ↔ 휴식(기본 5분) 전환
  - 집중/휴식 시간 +1/-1 조절
  - 시작/일시정지/리셋 버튼
  - 종료 시 알람 (소리 or 시각 깜빡임)
  - 무소음 모드 토글
  - 알람 길이 8초 자동 종료

## 기술 스택

- HTML5 / CSS3
- Vanilla JavaScript
- localStorage (데이터 영속화)

## 체험하기  
  [Gyumentum 바로가기](https://gyumentum.netlify.app/)

## 설치 & 실행

**1. 저장소 클론**
```bash
git clone https://github.com/gyucito/momentum.git
cd momentum
```

VS Code Live Server 또는 간단한 웹 서버 실행
index.html을 브라우저에서 직접 열어도 됨

(선택) 배경 이미지 추가
img 태그의 src를 원하는 배경 이미지 URL로 변경


**2. 사용 방법**
- 처음 접속 → 이름 입력 (Enter)
- 할 일 탭: 할 일 추가/관리
- 포모도로 탭: 집중 타이머 시작
- 오른쪽 상단 토글: 12/24시간제 전환
- 할 일 토글: 할 일 목록 보이기/숨기기
- 포모도로 무소음 토글: 소리 on/off

## 파일 구조
```
├── audio/
│   └── singing-bowl-low-and-loud.mp3 (알람 사운드)
├── css/
│   ├── clock.css
│   ├── global.css
│   ├── greeting.css
│   ├── pomodoro.css
│   ├── quotes.css
│   ├── todo.css
│   └── weather.css
├── img/
│   ├── 0.jpg
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   ├── 6.jpg
│   ├── 7.jpg
│   ├── 8.jpg
│   ├── 9.jpg
│   ├── 10.jpg
│   └── 11.jpg
├── js/
│   ├── bg.js
│   ├── clock.js
│   ├── greeting.js
│   ├── main.js
│   ├── pomodoro.js
│   ├── quotes.js
│   ├── todo.js
│   ├── utils.js
│   └── weather.js
└── index.html
```