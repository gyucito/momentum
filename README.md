<div align="center">
  <h1>Gyumentum</h1>
  
  <p>
    <strong>HTML · CSS · JavaScript</strong>로 만든 <strong>Momentum</strong> 스타일 개인 생산성 대시보드
  </p>

  <p>
    <a href="https://gyumentum.netlify.app/">
      <img src="https://img.shields.io/badge/바로_체험하기-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo">
    </a>
    &nbsp;
    <a href="https://github.com/gyucito/momentum/stargazers">
      <img src="https://img.shields.io/github/stars/gyucito/momentum?style=for-the-badge" alt="GitHub stars">
    </a>
  </p>
  <br><br>
  <em>실시간 시계 · 인사말 · To-Do · Pomodoro · 날씨</em>
</div>

### ✨ 주요 기능

- **실시간 시계** — 12시간 / 24시간제 토글 (localStorage 저장)
- **시간대별 인사말** — 아침 / 오후 / 저녁 인사말 + 사용자 이름
- **To-Do 리스트** — 추가 · 완료 체크 · 수정 · 삭제 · 전체 토글 (localStorage, 오늘 날짜 기준)
- **Pomodoro 타이머** — 집중(25분) ↔ 휴식(5분), 시간 조절, 시작/일시정지/리셋, 알람(8초 자동 종료), 무소음 모드 (시간 디스플레이 깜빡임)
- **실시간 날씨** — OpenWeatherMap API 연동 (현재 위치 기반 온도 / 날씨 표시)
- **랜덤 배경 이미지** — 매 로드마다 바뀌는 고화질 사진 (img/ 폴더 12장)
- **랜덤 Quote 출력** — 하단에 매 로드마다 바뀌는 명언 출력 
- **반응형** — 모바일에서도 편안하게 사용 가능

### 🛠 기술 스택

- **기술**: HTML5 · CSS3 · Vanilla JS
- **저장**: localStorage (이름, To-Do, 설정 등 영속화)
- **API**: OpenWeatherMap (날씨)
- **배포**: Netlify

### 📸 스크린샷

<div align="center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fq0juN%2FdJMcagEQVYf%2FAAAAAAAAAAAAAAAAAAAAAP9TWTJnKbJ_SWMpZ638BBN2aNyYLoZfV1NPssm-kKN3%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DE8hGMNTb%252BP1gb2T8ZO13fCPOf6A%253D" width="100%" alt="로그인 화면" />
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FchUaHP%2FdJMcaduvoJp%2FAAAAAAAAAAAAAAAAAAAAAGJ_6ne4FTecdFBSW0YMuxc1MlSrfcnvIil52KLC5krD%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DtGa0cNamh1yASGWcvuEWcoYng4s%253D" width="100%" alt="할 일 & 인사말" />
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fu0s3o%2FdJMcaduvoJw%2FAAAAAAAAAAAAAAAAAAAAAGAGg2HFuTYXzOndicyxkgpmM0BwD3p0_Dfsx_z5f2ud%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DjmyBdi29oHWmE%252BketIh6OLCyzMU%253D" width="100%" alt="Pomodoro 타이머" />
</div>

### 🚀 바로 체험하기

**[Gyumentum 데모](https://gyumentum.netlify.app/)**  

### 설치 & 로컬 실행

```bash
# 1. 저장소 클론
git clone https://github.com/gyucito/momentum.git
cd momentum

# 2. 실행 (가장 편한 방법)
# VS Code → Live Server 확장 프로그램 열기
# 또는 index.html을 브라우저에서 직접 열기
📂 파일 구조
├── audio/
│   └── singing-bowl-low-and-loud.mp3     # Pomodoro 알람 사운드
├── css/                                  # 기능별 CSS 분리
│   ├── clock.css
│   ├── global.css
│   ├── greeting.css
│   ├── pomodoro.css
│   ├── quotes.css
│   ├── todo.css
│   └── weather.css
├── img/                                  # 배경 이미지 (0~11.jpg)
├── js/                                   
│   ├── bg.js
│   ├── clock.js
│   ├── greeting.js
│   ├── main.js
│   ├── pomodoro.js
│   ├── quotes.js
│   ├── todo.js
│   ├── utils.js
│   └── weather.js                        # OpenWeatherMap 연동
└── index.html
```