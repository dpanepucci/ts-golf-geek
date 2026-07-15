//Score Differential = 113/Slope Rating X (adjusted gross score - course rating - PCC)

export const scoreDifferential = (slopeRating:number, grossScore:number, courseRating:number) => {
    if (slopeRating > 155 || slopeRating < 55) {
        throw Error("Invalid Slope Rating")
    }
    if (grossScore == 18) {
        throw Error("Why you lying bro?")
    }

    // Hard coded PCC into function (Average per course on any given day)
    let pcc = 0;

    let SlopeNumber = 113 / slopeRating
    let multiplier = (grossScore - courseRating) - pcc;
    let playHandicap = SlopeNumber * multiplier
    let roundHandicap = Math.round(playHandicap * 10) /10;

    return roundHandicap;
}

// console.log(scoreDifferential(134, 87, 72.6));
// console.log(scoreDifferential(134, 82, 72.6));

export const differentialAvg = (arrayArg:number[]) => {

    if (arrayArg.length < 3) {
        throw Error('Minimum of 3 rounds played')
    } else if (arrayArg.length == 3) {
        const lowofThree:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)

            const lowRoundOfThree = lowofThree[0]
            const threeRoundHC = (lowRoundOfThree) - 2;
            const threeBestHC = Math.round(threeRoundHC * 10) / 10;
            return threeBestHC

    } else if (arrayArg.length == 4) {
        const lowofFour:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)

            const lowRoundfFour = lowofFour[0]
            const fourRoundHC = (lowRoundfFour) - 1;
            const fourBestHC = Math.round(fourRoundHC * 10) / 10;
            return fourBestHC

    } else if (arrayArg.length == 5) {
        const lowofFive:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)

            const lowRoundofFive = lowofFive[0]
            const fiveBestHC = Math.round(lowRoundofFive * 10) / 10;
            return fiveBestHC

    } else if (arrayArg.length == 6) {
        const lowOfSix:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,2)

        const sixSum:number = lowOfSix.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const sixRoundHC = (sixSum / 2) - 1;
            const sixBestHC = Math.round(sixRoundHC * 10) / 10;
            return sixBestHC

    }else if (arrayArg.length >= 7 && arrayArg.length <= 8) {
        const lowOfEight:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,2);

        const eightSum:number = lowOfEight.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const eightRoundHC = (eightSum / 2);
            const eightBestHC = Math.round(eightRoundHC * 10) / 10;
            return eightBestHC

    } else if (arrayArg.length >= 9 && arrayArg.length <= 11) {
        const lowOfEleven:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,3)

        const elevenSum:number = lowOfEleven.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const elevenRoundHC = (elevenSum / 3);
            const elevenBestHC = Math.round(elevenRoundHC * 10) / 10;
            return elevenBestHC

    } else if (arrayArg.length >= 12 && arrayArg.length <= 14) {
        const lowOfFourTeen:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,4);

        const fourteenSum:number = lowOfFourTeen.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const fourteenRoundHC = (fourteenSum / 4);
            const fourteenBestHC = Math.round(fourteenRoundHC * 10) / 10;
            return fourteenBestHC;

    } else if (arrayArg.length >= 15 && arrayArg.length <= 16) {
        const lowOfSixTeen:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,5);

        const sixteenSum:number = lowOfSixTeen.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const sixteenRoundHC = (sixteenSum / 5);
            const sixteenBestHC = Math.round(sixteenRoundHC * 10) / 10;
            return sixteenBestHC;

    } else if (arrayArg.length >= 17 && arrayArg.length <= 18) {
        const lowOfEightTeen:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,6);

        const eighteenSum:number = lowOfEightTeen.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const eighteenRoundHC = (eighteenSum / 6);
            const eighteenBestHC = Math.round(eighteenRoundHC * 10) / 10;
            return eighteenBestHC;

    }  else if (arrayArg.length == 19) {
        const lowOfNineteen:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,7);

        const nineteenSum:number = lowOfNineteen.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const nineteenRoundHC = (nineteenSum / 7);
            const nineteenBestHC = Math.round(nineteenRoundHC * 10) / 10;
            return nineteenBestHC;

    } else if (arrayArg.length >= 20) {
        const lowOfOverall:number[] = arrayArg
            .slice()
            .sort((a,b) => a - b)
            .slice(0,8);

        const overallSum:number = lowOfOverall.reduce((runningTotal, currentScore) => runningTotal + currentScore, 0);
            const overallHC = (overallSum / 8);
            const overallBestHC = Math.round(overallHC * 10) / 10;
            return overallBestHC;
    }
}

let testArrayThree = [30, 10, 40] // 8
let testArrayFour = [30, 10, 6, 40] // 5
let testFive = [30, 10, 6, 40, 30] // 6
let testSix = [30, 10, 2, 40, 30, 25] // 5
let testArrayEight = [1, 2, 3, 4, 5, 6, 7, 8] // 1.5
let testEleven = [1, 2, 3, 4, 5, 6, 7, 8, 10, 3, 5] // 2
let testArrayFourteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // 2.5
let testSixteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7] // 3
let testEightteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 6, 7, 7, 20] // 3.5
let testNineTeen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 7, 7, 20, 22] // 4
let testArrayTwenty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15 ,16 ,17 ,18 ,19, 20] // 4.5

// console.log(differentialAvg(testArrayThree));
// console.log(differentialAvg(testArrayFour));
// console.log(differentialAvg(testFive));
// console.log(differentialAvg(testSix));
// console.log(differentialAvg(testArrayEight));
// console.log(differentialAvg(testEleven));
// console.log(differentialAvg(testSixteen))
// console.log(differentialAvg(testEightteen))
// console.log(differentialAvg(testNineTeen));
// console.log(differentialAvg(testArrayFourteen));
// console.log(differentialAvg(testArrayTwenty));