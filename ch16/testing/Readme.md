# 16 테스팅

## 16.1 테스팅 소개

### 16.1.1 테스팅의 필요성

1) 단위테스팅 : 코드 수준에서 각 모듈에 대한 테스팅

2) 통합테스팅 : 외부 모듈과 기존 모듈을 통합해 진행하는 테스팅

3) 시스템 테스팅 : 출시 전 완성된 제품을 대상으로 진행하는 테스팅

4) 인수 테스팅 : 제품의 사용자들을 대상으로 진행하는 테스팅

코드 규모가 커지고 변경이 잦아질 수록 문제를 발견하고 고치는 시간이 늘어납니다.

테스팅은 문제를 조기에 발견하고 시스템을 견고하게 만듭니다.



### 16.1.2 TDD와 단위 테스팅

TDD: 오류를 없애는 활동이 아닌 요구사항에 명시된 기능을 제대로 구현했는지 검증하여 코드의 품질을 점진적으로 개선

테스트 케이스가 요구사항에 1:1 대응되도록 구성

테스트 코드 작성 -> 테스트 통화 -> 리팩터링



### 16.1.3 BDD와 BDD 테스팅

BDD: 사용자 스토리를 고려해 내부 기능이 제대로 동작하는지를 테스트



## 16.2 테스트 환경 구축

### 16.2.1 패키지 설치

모카(mocha), 재스민(jasmine), QUnit 등등 중 mocha 로 진행

> 16장 package.json

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "test examples",
  "main": "",
  "scripts": {    
    "compile": "gulp compile",
    "test": "gulp test",
    "mocha": "mocha test/**/*.test.js"
  },
  "author": "happygrammer",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^3.5.0",
    "@types/jquery": "^2.0.41",
    "@types/mocha": "^2.2.44",
    "@types/node": "^7.0.13",
    "chai": "^3.5.0",
    "gulp": "^3.9.1",
    "gulp-mocha": "^4.3.0",
    "gulp-typescript": "^3.1.6",
    "jquery": "^3.2.1",
    "jsdom": "^9.12.0",
    "run-sequence": "^1.2.2",
    "typescript": "^2.6.2"
  }
}
```

테스트는 개발단계에서만 진행하기 때문에 **devDependencies** 에 두어 설치

### 16.2.2 모카의 TDD, BDD

> src/hello/tdd.ts

```bash
tsc tdd.ts
mocha --ui tdd tdd.js
mocha --ui tdd --reporter spec tdd.js
mocha --ui tdd --reporter json tdd.js
mocha --ui tdd --reporter progress tdd.js
ts-mocha --ui tdd --reporter spec src/hello/tdd.ts
```

> src/hello/bdd.ts

```bash
tsc bdd.ts
mocha bdd.js
mocha --reporter spec bdd.js
mocha --reporter json bdd.js
mocha --reporter progress bdd.js
ts-mocha --ui tdd --reporter spec src/hello/bdd.ts
```

> src/hello/hello.ts

```
tsc hello.test.ts
mocha hello.test.js
ts-mocha --ui tdd --reporter spec src/hello/hello.ts
```

> Src/hello/chai.test.ts

```
ts-mocha src/hello/chai.test.ts
```



### 16.2.3 걸프를 이용한 테스트 환경 구축

-> ts-mocha 로 대체 가능



## 16.3 테스트 실습

### 16.3.1 클래스 모듈 테스트

> src/calculator/calculator.ts

```
ts-mocha src/calculator/calculator.test.ts
```

### 16.3.2 네임스페이스 모듈 테스트

> src/my.validator/validator.ts

```
ts-mocha src/my.validator/validator.test.ts
```

### 16.3.3 DOM 테스트

```
ts-mocha src/dom/dom-input.test.ts
```

