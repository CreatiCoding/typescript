# CH9. 고급 타입

----

> @creco

## 9.1. 유니언 타입과 타입 가드

#### 9.1.1 유니언 타입

- 나열된 타입 중 하나의 타입에 속한 값만 할당 받을 수 있습니다.

```typescript
let 변수: 타입A | 타입B | 타입C = 값;
```

> ch9/advanced/src/ts-types/union-types/union-types-variables.ts

```typescript
/**
 * @author happygrammer
 */
let strNum: string | number = 1;
let booStr: boolean | string = true;

console.log(strNum);	// 1
console.log(booStr);	// true

booStr = 1;				// error
```



- 책 설명: 타입별로 나눠 처리할 때 유용

>ch9/advanced/src/ts-types/union-types/union-types.ts

```typescript
/**
 * @author happygrammer
 */
function check(p: string | number | boolean): string | number | boolean {
    if (typeof p === "string") {
        // p가 string 타입일때의 처리
        return p;
    }
    else if (typeof p === "number") {
        // p가 number 타입일때의 처리
        return p;
    }
    else {
        // p가 boolean 타입일때의 처리
        return p;
    }
}

console.log(typeof check(1), check(1));				// number 1
console.log(typeof check("hello"), check("hello"));	// string hello
console.log(typeof check(true), check(true)); 		// boolean true
```

> @creco: 타입별로 나눠 다르게 처리되는 함수는 여러 함수로 분리한다던가 하는 리펙토링이 필요하다고 봅니다.



#### 9.1.2 타입 가드

`typeof`나 `instanceof` 라는 연산자를 활용해 명시된 타입과 일치하는지 타입을 한번 더 검사하여 안정성을 확보하는 방법

- typeof

> ch9/advanced/src/ts-types/union-types/union-types-problem.ts

```typescript
/**
 * @author happygrammer
 * 주석 해제 후 테스트합니다.
 */
function myIndexOf(x: number | string, y: string) {
    // return x.indexOf(y); // 에러
}

console.log(myIndexOf("hello", "e"));
```

> @creco: x가 number인지 string인지 알 수 없기 때문에 indexOf(string)을 호출할 수 없습니다.

> ch9/advanced/src/ts-types/union-types/union-types-typeof-check.ts

```typescript
/**
 * @author happygrammer
 */
function myIndexOf2(x: number | string, y: string) {
    if (typeof x === "string") {
        return x.indexOf(y); // x가 string 타입일때
    }
    else {
        return -1; // x가 number 타입일때
    }
}

console.log(myIndexOf2("hello", "e"));	// 1
```

> @creco: 역시 마찬가지로 설명을 위한 코드일 뿐 number타입을 유니언 타입에 포함시키지 않으면 되는 함수

- instanceof

클래스 또한 유니언 타입 형태로 지정할 수 있는데 이때는 typeof가 아닌 instanceof를 통해 타입가드를 할 수 있습니다.

> ch9/advanced/src/ts-types/union-types/union-types-instanceof-check.ts

```typescript
/**
 * @author happygrammer
 */
class Cat {
    name = "cat";
    age = 13;
}

class Dog {
    name = "dog"
    leg = 4;
}

function diffCheck(x: Cat | Dog) {
    if (x instanceof Dog) {
        console.log(x.name);	// dog
        console.log(x.leg);		// 4
    }

    console.log(x.name);		// dog
    // console.log(x.leg); // 에러
    // console.log(x.age); // 에러
}

diffCheck(new Dog());
```



## 9.2. 알쓸 고급 타입

### 9.2.1 문자열 리터럴 타입

> ch9/advanced/src/advanced-types/string-literal-types.ts

```typescript
/**
 * @author happygrammer
 */
type EventType = "keyup" | "mouseover";

const myEvent: EventType = "keyup";
console.log(typeof myEvent, myEvent);

function on(event: EventType, callback: (message: string) => any) {
    console.log(typeof event, event);
    callback("callback!");
}

on(myEvent, (message) => console.log(message));
```

> @creco: `type` 변수를 선언하여 할당받을 문자열 리터럴을 정해주고 값을 강제하여 할당 받을 수 있습니다.

### 9.2.2 룩업 타입

> @creco: **인덱스 접근 타입**이라고도 불리는 룩업 타입은 keyof를 통해 하위 타입을 생성해 낼 수 있습니다.

> ch9/advanced/src/ts-types/lookup-keyof.ts

```typescript
/**
 * @author happygrammer
 */
interface Profile {
    name: string;
    gender: string;
    age: number;
}

type Profile1 = keyof Profile;					// interface
type Profile2 = keyof Profile[];				// array
type Profile3 = keyof { [x: string]: Profile };	// 익명 배열 요소 문자열 타입 // any 문자열 가능
type Profile4 = keyof Profile["name"];			// Profile의 name이라는 문자열 타입

let pValue1: Profile1 = "name";
// let pValue2: Profile1 = "name2";
let pValue3: Profile2 = "length";
let pValue4: Profile2 = "push";
let pValue5: Profile3 = "hello";
let pValue6: Profile4 = "length";
// let pValue7: Profile4 = "abc";

console.log(`
1번 : ${pValue1} / 2번 : 에러 / 3번 : ${pValue3}
4번 : ${pValue4} / 5번 : ${pValue5} / 6번 : ${pValue6} / 7번 : 에러`);
```

> @creco: 더 쉬운 예제

```typescript
type t = keyof "str";
t="push";		// 에러
t="length";
```

### 9.2.3 non-nullable 타입

타입스크립트 2.0부터 strictNullCheck 옵션이 생겨 null, undefined를 할당하지 못하게 할 수 있습니다.

> ch9/advanced/tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es6",
    "strictNullChecks": true,
    "removeComments": true
  },  
  "exclude": [
    "node_modules",
    ".vscode"
  ]
}
```

> ch9/advanced 에서

```bash
ts-node --skip-project
> let a:string = undefined;
ts-node --files=tsconfig.json
> let a:string = undefined;
```

- non-nullable일때 null이나 undefined을 할당하는 법

```typescript
let title: string | null;
let title: string | undefined;
```

### 9.2.4 Never 타입

모든 타입의 변수에 never 타입을 할당할 수 있지만 any 타입을 never 타입에 할당할 수는 없습니다.

사용되는 case

1. 함수에 닿을 수 없는 코드영역이 있어 반환값이 존재하지 않을 때
2. 함수에 Throw 객체가 반환되어 오류가 발생할 때

- 함수에 닿을 수 없는 코드영역

> ch9/advanced/src/advanced-types/never-types.ts

```typescript
/**
 * @author happygrammer
 */

const neverTouch = function (): never {
    while (true) {
        console.log("Never");
    }
    // console.log(); // 닿을 수 없는 코드!
};
let resultNever: never = neverTouch();
```

> ch9/advanced/src/advanced-types/never-types2.ts

```typescript
/**
 * @author happygrammer
 */
function nevertest(value: string | number) {
    if (typeof value === "string") {
        return value;
    }
    else if (typeof value === "number") {
        return value;
    } else {
        return value;	// 닿을 수 없는 코드
    }
}
console.log(nevertest("test"));
```

> @creco: 역시 실제로는 잘 안쓰이는 코드, 책에서도 이를 아래 코드로 닿을 수 없는 코드 영역을 없애는 코드가 있습니다.

```typescript
if (typeof value === "string") {
    return value;
}
else {
    return value;
}
```

- Throw 객체가 반환

> ch9/advanced/src/advanced-types/never-types3.ts

```typescript
/**
 * @author happygrammer
 */
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error("error!!!");
}

fail();
```

- 반환값이 있는데 never 타입을 쓰면 생기는 일

> ch9/advanced/src/advanced-types/never-types4.ts

```typescript
/**
 * @author happygrammer
 * 주석 해제후 실행해야 합니다.
 */

function neverTouch2(): never{
    //닿을 수 있는 코드 영역
};
neverTouch2();
```

### 9.2.5 this 타입

다형적 this 타입 (polymorphic this type) 라고도 하는 this 타입은 체이닝 메서드(chaining method)를 정의할 때 사용합니다. 체이닝 형태로 선언하면 데이터가 물 흐르듯 표현할 수 있는데 이러한 패턴을 플루언트 인터페이스 패턴(fluent interface pattern), 줄여서 **플루언트 패턴**이라고 합니다.

> ch9/advanced/src/advanced-types/this-types.ts

```typescript
/**
 * @author happygrammer
 */
class AddCalc {
    public constructor(public value: number = 0) { }

    public add(operand: number): this {
        this.value += operand;
        return this;
    }

}

class MyCalc extends AddCalc {
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}

let calc = new MyCalc(3).multiply(5).add(10);		// <---플루언트 패턴
console.log(calc.value);
```



# 결론

> @creco: typescript의 타입의 특성을 강화하는 지향성과는 좀 반대되는 개념인 것 같아 실전에서 자주 쓰이지는 않을 것 같지만 이런 개념도 있다는 걸 알게되면 필요한 순간에 써 먹을 수 있을거라 생각합니다. 문자열 리터럴 타입과 룩업 타입의 경우 예제로 보여진 event 처리에 괜찮은 방식인 것 같습니다. non-nullable 타입과 never 타입 또한 필요한 순간이 올 때 유용하게 써먹을 수 있을 것 같고 this 타입의 경우 체이닝 기법을 사용할 때 유용하게 사용할 수 있는 타입인 것 같습니다.
>
> 9장에서 나온 유니언타입, 문자열 리터럴 타입, 룩업타입, never 타입을 제외하고 타입가드와 this 타입은 node 에서도 많이 쓰이는 걸로 알고 있습니다.