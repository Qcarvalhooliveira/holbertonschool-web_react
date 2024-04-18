export interface MajorCredits {
    _majorCreditBrand: void;
    credits: number;
  }

  export interface MinorCredits {
    _minorCreditBrand: void;
    credits: number;
  }

  export function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    return { credits: subject1.credits + subject2.credits } as MajorCredits;
  }

  export function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    return { credits: subject1.credits + subject2.credits } as MinorCredits;
  }


//Making tests to see the functions working:
//const majorCredit1: MajorCredits = { _majorCreditBrand: undefined, credits: 3 };
//const majorCredit2: MajorCredits = { _majorCreditBrand: undefined, credits: 5 };

//const minorCredit1: MinorCredits = { _minorCreditBrand: undefined, credits: 2 };
//const minorCredit2: MinorCredits = { _minorCreditBrand: undefined, credits: 2 };


//const resultMajor = sumMajorCredits(majorCredit1, majorCredit2);
//const resultMinor = sumMinorCredits(minorCredit1, minorCredit2);

//console.log(`Major credits sum: ${resultMajor.credits}`); // result: 8
//console.log(`Minor credits sum: ${resultMinor.credits}`); // result: 4
  