import { test, expect } from "@jest/globals";
import { scoreDifferential, differentialAvg  } from "./handicap.ts";

// scoreDifferential function testing

test('Finds score differentail for round of 82', ()=> {
    expect(scoreDifferential(134, 82, 72.6)).toBe(7.9)
});

// differentialAvg Function testing
let testArrayThree = [30, 10, 40]

test('Finds handicap for 3 rounds posted', ()=> {
    expect(differentialAvg(testArrayThree)).toBe(8);
})

let testArrayFour = [30, 10, 6, 40] // 5

test('Finds handicap for 4 rounds posted', ()=> {
    expect(differentialAvg(testArrayFour)).toBe(5);
})

let testFive = [30, 10, 6, 40, 30] // 6

test('Finds handicap for 5 rounds posted', ()=> {
    expect(differentialAvg(testFive)).toBe(6);
})

let testSix = [30, 10, 2, 40, 30, 25] // 5

test('Finds handicap for 6 rounds posted', ()=> {
    expect(differentialAvg(testSix)).toBe(5);
})

let testArrayEight = [1, 2, 3, 4, 5, 6, 7, 8] // 1.5

test('Finds handicap for 8 rounds posted', ()=> {
    expect(differentialAvg(testArrayEight)).toBe(1.5);
})

let testEleven = [1, 2, 3, 4, 5, 6, 7, 8, 10, 3, 5] // 2

test('Finds handicap for 11 rounds posted', ()=> {
    expect(differentialAvg(testEleven)).toBe(2);
})

let testArrayFourteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // 2.5

test('Finds handicap for 14 rounds posted', ()=> {
    expect(differentialAvg(testArrayFourteen)).toBe(2.5);
})

let testSixteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7] // 3

test('Finds handicap for 16 rounds posted', ()=> {
    expect(differentialAvg(testSixteen)).toBe(3);
})

let testEightteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7, 7, 20] // 3.5

test('Finds handicap for 18 rounds posted', ()=> {
    expect(differentialAvg(testEightteen)).toBe(3.5);
})

let testNineTeen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 7, 7, 20, 22] // 4

test('Finds handicap for 19 rounds posted', ()=> {
    expect(differentialAvg(testNineTeen)).toBe(4);
})

let testArrayTwenty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15 ,16 ,17 ,18 ,19, 20] // 4.5

test('Finds handicap for 20 rounds posted', ()=> {
    expect(differentialAvg(testArrayTwenty)).toBe(4.5);
})