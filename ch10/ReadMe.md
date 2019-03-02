# CH10. 타입 선언과 변경, 타입 호환

------

> @creco

## 10.1. 타입 선언과 변경

#### 10.1.1 타입 에일리어스

- 단일 타입 선언

```
type <바인딩 식별자> = 타입;
```

**바인딩 식별자**는 타입의 별칭에 해당하는 타입 에일리어스입니다.

```typescript
type userNameType = string;
let userName: userNameType;
```

- 유니언 타입 선언

> ch10/conversion/src/use/type.ts

```typescript
/**
 * @author happygrammer
 */
type myId = string;
type myAlias = string | undefined;
type User = {
    id: myId;
    alias?: myAlias;
    city: string;
};

let id1: User = { id: "happy1", city: "seoul" };
let id2: User = { id: "happy2", alias: undefined, city: "daegu" };
let id3: User = { id: "happy3", alias: "happy3!!", city: "pusan" };

console.log(typeof id1, id1);
console.log(typeof id2, id2);
console.log(typeof id3, id3);
```

>  @creco: 물음표는 속성을 생략할 수 있다는 뜻입니다. 다른 말로 undefined이여도 되고 정의 안되도 상관 없다는 뜻

- 배열 타입 선언

> ch10/advanced/src/use/type-array.ts

```typescript
/**
 * @author happygrammer
 */
type MyArrayType = Array<number | boolean>;
let myArray: MyArrayType = [1, true];
console.log(myArray.toString());
console.log(typeof myArray[0], typeof myArray[1]);
```

> @creco: Array<number | boolean>으로 선언하면 "1"이나 "true"를 방지할 수 있습니다.

###  10.1.2 타입 추론

타입을 명시하지 않으면 추론을 통해 타입이 결정됩니다.

> ch10/conversion/src/use/type-inference.ts

```typescript
/**
 * @author happygrammer
 */
let values = [0, "c", null];
console.log(typeof values);
console.log(typeof values[0]);
console.log(typeof values[1]);
console.log(typeof values[2]);
```

추론 및 결정된 타입에는 다른 타입의 값을 넣을 수 없습니다.

> ch10/conversion/src/use/type-inference2.ts

```typescript
/**
 * @author happygrammer
 */
let first = 1;
let second = "2";
// first = second; // 에러
```



### 10.1.3 타입 캐스팅, 변환, 어설션

- 타입 캐스팅과 변환

타입 캐스팅은 명시적으로 타입을 캐스팅하는 것을 의미합니다. **Javascript의 인터프리터에 의해 타입이 바뀌는 타입 변환(type conversion)과는 구분됩니다.** 

> @creco: parseInt: Number와는 다르게 문자열안에서 숫자만 골라 파싱하여 타입 변경

![image](https://user-images.githubusercontent.com/33514304/53685243-635f0280-3d5b-11e9-8814-2120e0bcd69d.png)

> @creco: parseInt와 Number의 공통점은 런타임 때 사용되므로 typescript 컴파일 이후에도 유지됩니다.

- 타입 어설션

컴파일 이후에는 사라지는 타입 유효성 검사입니다. <,>와 as를 이용할 수 있지만 jsx의 문법과 유사해 충돌을 일으켜 as 방식을 권고합니다.

> typescript에서

```typescript
let num4: number = <number> myNum;
let num5: number = myNum as number;
```

> 컴파일된 javascript에서

```
let num4 = myNum;
let num5 = myNum;
```

이렇게 컴파일된 코드에서는 사라집니다. 아래 타입 호환에 대한 예시입니다.

> ch10/conversion/src/use/type-casting-assertion.ts

```typescript
/**
 * @author happygrammer
 */
let myNum: any = "2017";

// 타입 캐스팅
let num1 = + myNum;
let num2 = Number(myNum);
let num3 = parseInt(myNum);
console.log(`num1=${num1}, ${typeof num1}`);
console.log(`num2=${num2}, ${typeof num2}`);
console.log(`num3=${num3}, ${typeof num3}`);

// 타입 호환
let num4: number = <number>myNum;
let num5: number = myNum as number;
console.log(`num4=${num4}, ${typeof num4}`);
console.log(`num5=${num5}, ${typeof num5}`);
```

```bash
num1=2017, number
num2=2017, number
num3=2017, number
num4=2017, string
num5=2017, string
```

>  @creco: 이 결과를 통해 typescript의 타입과 typeof의 결과는 일치하지 않는다는 것을 알 수 있습니다.
>
>  @creco: 또한 어설션은 타입을 캐스팅하지 않고 컴파일 이후에는 사라집니다.

타입 호환에 대해 더 자세히 알아보겠습니다.

## 10.2. 타입 호환

### 10.2.1 프로그래밍 언어의 타입 시스템

- 동적 타입 검사 ( dynamic type checking) - 자바스크립트, 런타임 시점에서 수행
- 정적 타입 검사 ( static type checking) - 타입스크립트, 컴파일 시점에서 수행

- 덕 타이핑(duck typing): 자바스크립트가 런타임 시점에서 동적 타입 검사를 수행하는 대표적인 사례
- 구조타입시스텝: 타입의 구조와 정의만 같다면 타입 호환 가능 ( Typescript )
- 명목타입시스템: 명시적으로 같은 타입이어야 함 ( Typescript, C++, Java )

##### Typescript의 지원하는 타이핑 방식

1. 덕 타이핑: 런타임 시 동적으로 타입의 구조가 정해지는 타입 지정 방식
2. 구조 타이핑: 타입의 구조만 같으면 서로 호환 가능한 타입 지정 방식
3. 구조 서브 타이핑: 구조가 부분적으로 같더라도 타입 호환을 지원하는 타입 지정 방식
4. 명목 타이핑: 구조 뿐 아니라 타입까지 같아야 호환 가능한 타입 지정 방식

### 10.2.2 덕 타이핑

> ch10/conversion/src/structural-typing/duck-typing.ts

```typescript
/**
 * @author happygrammer
 */
class Duck {
    speak() {
        console.log("Quak!");
    }

    swim() {
        console.log("Duck swimming");
    }
}

class Goose {
    speak() {
        console.log("squawk!");
    }

    swim() {
        console.log("Goose swimming");
    }
}

// Duck, Goose 둘다 같은 구조로 이뤄져있기 때문에 호출 가능
function swim(obj) {
    obj.speak();		
    obj.swim();
}

let duck = new Duck();
let goose = new Goose();
swim(duck);
swim(goose);
```

동적으로 타입이 결정되기 때문에 유연하지만 타입 안전성은 떨어집니다.

타입 안전성을 강화하려면 인터페이스를 사용하면 됩니다.

```typescript
interface DuckGoose{
    speak();
    swim();
}
function swim(obj: DuckGoose){
    obj.speak();
    obj.swim();
}
```

> @creco: swim 함수의 매개 변수의 타입을 Duck과 Goose의 Union Type으로 해도 되지 않을까 싶습니다.

### 10.2.3 구조 타이핑

컴파일 시간에 타입 호환이 가능한지를 검사, 불가능하면 컴파일 오류를 출력

- 구조가 같은 클래스 간의 구조 타이핑

> ch10/conversion/src/structural-typing/class2class.ts

```typescript
/**
 * @author happygrammer
 */
class Animal {
    name: number;
    constructor(name: string, weight: number) { }
}

class Bird {
    name: number;
    constructor(speed: number) { }
}

let animal: Animal = new Animal("happy", 100);
let bird: Bird = new Bird(10);

animal = bird; // 타입 호환이 가능
bird = animal; // 타입 호환이 가능
```

> @creco: 구조가 같아 문제없이 컴파일 되며 호환됩니다.

- 구조가 같은 클래스 간의 구조 타이핑(상속관계고려)

> creaticoding/git/typescript/ch10/conversion/src/structural-typing/class2hierarchy.ts

```typescript
/**
 * @author happygrammer
 */
class Person {
    public name: string;
}

class Member extends Person {
    public grade: number;
}

class Admin extends Member { }

class MemberCard {
    public name: string;
    public grade: number;
}

let admin: Admin = new Admin();
admin = new MemberCard(); // 타입 호환이 가능함
```

> @creco: 역시 구조가 같아 문제없이 컴파일 되며 호환됩니다.

- 구조가 같은 클래스와 인터페이스 간의 구조 타이핑

> ch10/conversion/src/structural-typing/class2interface.ts

```typescript
/**
 * @author happygrammer
 */
interface Person {
    name: string;
}

class Employee {
    name: string;
}

let person: Person;
person = new Employee(); // 타입 호환이 가능함
```

> @creco: Employee가 명시적으로 Person을 구현하고 있지 않아도 구조가 같아 문제없이 호환됩니다.

### 10.2.4 구조 서브타이핑

구조가 완벽히 같지 않고 부분적으로 같더라도 타입이 호환되는 경우입니다. 하위타입은 상위타입의 속성을 포함합니다. 상위 타입과 하위 타입의 예시입니다.

```
상위타입: { a: string, b: string }
하위타입: { a: string, b: string, c: string }
```

> ch10/conversion/src/structural-sub-typing/uppertype-subtype.ts

```typescript
type upper = { a: string, b: string };
type sub = { a: string, b: string, c: string };
let objectUpper: upper = { a: "a", b: "b" }; // 상위 타입
let objectSub: sub = { a: "a", b: "b", c: "c" }; // 하위 타입
objectUpper = objectSub; // 상위 타입 = 하위 타입
console.log(objectUpper); // { a: 'a', b: 'b', c: 'c' }

let infoUpper = { name: "wook", country: "korea" };
let infoSub = { name: "wook", country: "korea", alias: "happy" };
infoUpper = infoSub;
```

>  @creco: 하위타입에서 정의된 속성이 상위타입에는 없으니까 하위타입에 상위타입으로 넣는 호환은 불가하며 반대의 경우는 가능합니다.

- 타입이 없지만 구조가 일부 같은 변수 간의 구조 서브타이핑

```typescript
let infoUpper = { name: "creco", country: "korea" };
let infoSub = { name: "creco", country: "korea", alias: "happy" };
infoUpper = infoSub;
```

> @creco: 정의가 된 타입이 아니더라도 구조상 하위에서 상위로 호환이 가능합니다.

- 매개변수 개수가 다른 함수 타입 간의 구조 서브타이핑

자바스크립트와는 다르게 타입스크립트에서는 함수의 인수가 다르면 오류가 발생합니다.

```typescript
function add(a,b,c){
    return a+b;
}
add(1,2);	// Typescript에서는 오류, Javascript 에서는 정상
```

> @creco: 함수 타입의 구조 서브 타이핑에서는 예외적으로 반대로 동작합니다. 상위타입 = 하위타입 이 아니라 하위타입 = 상위타입으로 이루어 집니다. 따라서 매개변수 적은 상위 함수 타입이 매개 변수가 많은 하위 함수 타입으로 호환이 가능합니다.

> ch10/conversion/src/structural-sub-typing/func2func.ts

```typescript
/**
 * @author happygrammer
 */
// 익명 함수에 선언된 매개변수가 다른 경우
let funcSub = (a: string, b: string) => a + b; // 상위 타입
let funcUpper = (a: string) => a; // 하위 타입

funcSub = funcUpper; // 상위 타입 = 하위 타입
// funcUpper = funcSub; // 에러 - 타입 호환 불가
console.log(`${funcSub("hello", "world")}`); // 실제로 funcUpper 함수가 호출 됨
```

- 구조가 일부 같은 객체와 인터페이스 간의 구조 서브 타이핑

```typescript
interface GroupUpper{ name: string; }
let groupSub = { name: "Typescript Group", id: 1};
let groupUpper: GroupUpper;
groupUpper = groupSub;
```

> @creco: 예상대로 하위 타입이 상위 타입으로 호환이 가능합니다. 다만 여기서 주의할 점은 **구조 서브 타이핑이 적용되었기 때문에 groupUpper에서 id로 접근할 수 없게 된다는 점**입니다.

### 10.2.5 명목 타이핑

흔히 알고 있는 C++, C#, Java의 명목 타이핑 방식입니다. Typescript에서 볼수 있는 대표적엔 사례는 Enum입니다.

>ch10/conversion/src/nominal-typing/enum.ts

```typescript
/**
 * @author happygrammer
 */
// enum
enum EastAsia1 { korea = 88, china = 86, japan = 81 }
enum EastAsia2 { korea = 88, china = 86, japan = 81 }

let east1: EastAsia1 = EastAsia1.china;
let east2: EastAsia2 = EastAsia2.korea;

// var east1: EastAsia1 = EastAsia2.china;
// var east2: EastAsia2 = EastAsia1.korea;

east1 = 1000;
east2 = 2000;

console.log(`east=${east1} ${typeof east1}
east2=${east2} ${typeof east2}
`);

// east1 = east2; // 에러
// east2 = east1; // 에러
```

다른 Enum 타입의 변수 간에는 타입 호환이 불가능 하여 오류가 발생합니다.

# 결론

> @creco
>
> 타입의 기초에 대해 알게 되었고 type이라는 키워드가 타입의 alias를 위한 키워드임을 알게 되었습니다.
>
> 또한 typescript에서 내부적으로 동작하는 타입 호환이 어떻게 이루어지고 있는지 알게되었습니다.
>
> 이를 통해 뭔가 코딩적으로 기술을 알게되는 것은 아니고 타입스크립트의 동작 방식을 이해하게 되어 수월하게 코드를 짤 수 있을 것 같습니다. ( 타입 에러는 그만 보고싶은.. )

