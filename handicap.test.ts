import { test, expect } from "@jest/globals";
import { scoreDifferential, differentialAvg  } from "./handicap.ts";

// scoreDifferential function testing

test('Finds score differentail for round of 82', ()=> {
    const slopeRating = 134;
    const grossScore = 82;
    const courseRating = 72.6;
    expect(scoreDifferential(slopeRating, grossScore, courseRating)).toBe(7.9)
});

// differentialAvg Function testing
test('Finds handicap for 3 rounds posted', ()=> {
    const testArrayThree = [30, 10, 40];
    expect(differentialAvg(testArrayThree)).toBe(8);
})

test('Finds handicap for 4 rounds posted', ()=> {
    const testArrayFour = [30, 10, 6, 40];
    expect(differentialAvg(testArrayFour)).toBe(5);
})

test('Finds handicap for 5 rounds posted', ()=> {
    const testFive = [30, 10, 6, 40, 30];
    expect(differentialAvg(testFive)).toBe(6);
})

test('Finds handicap for 6 rounds posted', ()=> {
    const testSix = [30, 10, 2, 40, 30, 25];
    expect(differentialAvg(testSix)).toBe(5);
})

test('Finds handicap for 8 rounds posted', ()=> {
    const testArrayEight = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(differentialAvg(testArrayEight)).toBe(1.5);
})

test('Finds handicap for 11 rounds posted', ()=> {
    const testEleven = [1, 2, 3, 4, 5, 6, 7, 8, 10, 3, 5];
    expect(differentialAvg(testEleven)).toBe(2);
})

test('Finds handicap for 14 rounds posted', ()=> {
    const testArrayFourteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    expect(differentialAvg(testArrayFourteen)).toBe(2.5);
})

test('Finds handicap for 16 rounds posted', ()=> {
    const testSixteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7];
    expect(differentialAvg(testSixteen)).toBe(3);
})

test('Finds handicap for 18 rounds posted', ()=> {
    const testEightteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7, 7, 20];
    expect(differentialAvg(testEightteen)).toBe(3.5);
})

test('Finds handicap for 19 rounds posted', ()=> {
    const testNineTeen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 7, 7, 20, 22];
    expect(differentialAvg(testNineTeen)).toBe(4);
})

test('Finds handicap for 20 rounds posted', ()=> {
    const testArrayTwenty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15 ,16 ,17 ,18 ,19, 20];
    expect(differentialAvg(testArrayTwenty)).toBe(4.5);
})

// Invaild Input
test('Minimum of 3 rounds played', ()=> {
    expect(() => differentialAvg([10,20])).toThrow('Minimum of 3 rounds played');
});

// Sorting Scores 
 test('sorts correctly even when input is NOT pre-sorted', () => {
    const shuffled = [40, 10, 30];
    expect(differentialAvg(shuffled)).toBe(8);
  });

// Testing ranges of number of rounds played
  test('9 rounds (lower edge of 9-11 band): lowest 3 avg', () => {
    const nineRounds = [9, 1, 5, 7, 3, 20, 11, 13, 15];
    expect(differentialAvg(nineRounds)).toBe(3);
  });

  test('12 rounds (lower edge of 12-14 band): lowest 4 avg', () => {
    const twelveRounds = [12, 1, 2, 3, 4, 50, 60, 70, 80, 90, 100, 110];
    expect(differentialAvg(twelveRounds)).toBe(2.5);
  });

  test('15 rounds (lower edge of 15-16 band): lowest 5 avg', () => {
    const fifteenRounds = [1, 2, 3, 4, 5, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
    expect(differentialAvg(fifteenRounds)).toBe(3);
  });

  test('17 rounds (lower edge of 17-18 band): lowest 6 avg', () => {
    const seventeenRounds = [1, 2, 3, 4, 5, 6, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    expect(differentialAvg(seventeenRounds)).toBe(3.5);
  });