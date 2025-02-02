# Resume

## 개요
🚀<a href="deprecated/api/resumes">~~배포 링크~~</a>🚀 (AWS EC2)

- `.env`
  - DB_URL
  - ACCESS_TOKEN_SECRET_KEY
- <a href="https://drawsql.app/teams/me-662/diagrams/node4th-resume-api">ERD</a>
- 개발 기간: 2024.02.01 ~ 2024.02.05

## [API List](https://www.notion.so/ooheunda/Node-js-2dc62ec40dbf4ece9ccff9bdc98b60c1)

|기능명|endpoint|HTTP method|인증|
|---|---|---|---|
|회원가입|`/api/sign-up`|POST|X|
|로그인|`/api/sign-in`|POST|X|
|내 정보 조회|`/api/users`|GET|O|
|이력서 생성|`/api/resumes`|POST|O|
|이력서 목록 조회|`/api/resumes`|GET|X|
|이력서 상세 조회|`/api/resumes/:resumeId`|GET|X|
|이력서 수정|`/api/resumes/:resumeId`|PUT|O|
|이력서 삭제|`/api/resumes/:resumeId`|DELETE|O|

  
## 더 고민 해보기
- **암호화 방식**
  - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?  
    ➡️ 비밀번호를 DB에 저장할 때 Hash 이용, Hash는 단방향 암호화에 해당하여 비교시 별도의 메소드로 처리해야한다.
  - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?  
    ➡️ 평문화된 비밀번호가 아니라 Hahs 한 값을 저장하면 보안성이 높다.
    
- **인증 방식**
  - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?  
    ➡️ Access Token이 노출되었을 경우, 인증/인가가 필요한 작업에 아무나 접근할 수 있고 사용자의 정보가 탈취되거나 서버에 문제가 생길 수 있다.
  - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?  
    ➡️ Access Token의 만료 기간을 짧게 설정하고, 비교적 기간이 긴 Refresh Token을 같이 발급해준다. 추후에 Refresh Token을 이용해 Access Token을 발급 받을 수 있도록 한다.
    
- **인증과 인가**
  - 인증과 인가가 무엇인지 각각 설명해 주세요.  
    ➡️ 인증은 사용자가 누구인지 처음 확인하는 작업이고, 인가는 특정 작업을 할 때 사용자가 그 작업에 대한 권한이 있는지 확인하는 작업이다.
  - 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.  
    ➡️ auth.middleware.js는 인가에 해당한다. 내 정보 조회, 이력서 수정, 삭제 등 특정한 작업을 할 때만 거치기 떄문이다.
    
- **Http Status Code**
  - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.  
    ➡️  
    `200`: 기본적인 작업 성공 코드  
    `201`: 리소스를 생성/수정/삭제시의 성공 코드  
    `400`: 문법이 잘못된 경우의 실패 코드  
    `401`: 권한이 없는 경우의 실패 코드  
    `403`: 실패 코드. 문법엔 문제가 없으나 값 자체에 오류가 있는 경우(ValidationError) 사용했습니다.  
    `404`: Not Found  
    `409`: 서버와 충돌한 경우. 이미 존재하는 이메일로 회원가입 request시에 반환하였습니다.  
    `500`: 예외처리한 것 외의 모든 에러. error-handler.middleware.js의 마지막문으로 넣어 나머지 에러처리에 걸리도록 하였습니다.  
    
- **리팩토링**
  - MySQL, Prisma로 개발했는데 MySQL을 MongoDB로 혹은 Prisma 를 TypeORM 로 변경하게 된다면 많은 코드 변경이 필요할까요? 주로 어떤 코드에서 변경이 필요한가요?  
    ➡️ 기본적인 DB 연결 코드와, 라우터에서 DB와 통신하는 (await 붙어있는) 모든 코드들을 새로운 ORM에 맞춰 작성해야합니다. 아직 mongoDB mongoose와 mysql prisma만 써봐서 잘은 모르겠지만 많이 고쳐야 할 것 같습니다.  
  - 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.  
    ➡️ 겹치는 코드들을 함수나 클래스로 관리합니다.
  
- **API 명세서**
  - notion 혹은 엑셀에 작성하여 전달하는 것 보다 swagger 를 통해 전달하면 장점은 무엇일까요?  
    ➡️ 노션으로 작성하는 API 명세서는 한땀한땀 만들어야 하는데, swagger는 기본 틀도 잡혀있고 자동으로 갱신된다. 테스트도 가능하며 보기 좋다.
