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