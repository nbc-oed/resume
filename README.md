# node4th-resume-api
- `.env`
  - DB_URL
  - ACCESS_TOKEN_SECRET_KEY
- <a href="https://www.notion.so/ooheunda/Node-js-2dc62ec40dbf4ece9ccff9bdc98b60c1?pvs=4">API 명세서</a>
- <a href="https://drawsql.app/teams/me-662/diagrams/node4th-resume-api">ERD</a>
  
## 더 고민 해보기
- **암호화 방식**
  - 비밀번호를 DB에 저장할 때 Hash 이용, Hash는 단방향 암호화에 해당하여 비교시 별도의 메소드로 처리해야한다.
  - 평문화된 비밀번호가 아니라 Hahs 한 값을 저장하면 보안성이 높다.
- **인증 방식**
  - Access Token이 노출되었을 경우, 인증/인가가 필요한 작업에 아무나 접근할 수 있고 사용자의 정보가 탈취되거나 서버에 문제가 생길 수 있다.
  - Access Token의 만료 기간을 짧게 설정하고, 비교적 기간이 긴 Refresh Token을 같이 발급해 Refresh Token을 이용해 Access Token을 발급 받을 수 있도록 한다.
- **인증과 인가**
- **Http Status Code**
- **리팩토링**
- **API 명세서**
