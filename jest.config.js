// module.exports = {
//   "moduleNameMapper": {
//     "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
//   },
//   transform: {
//     "^.+\\.tsx?$": `ts-jest`,
//     "^.+\\.js?$": `babel-jest`,
//   },
//   testRegex: `.test.(js?|jsx?|tsx?)$`,
//   moduleFileExtensions: [
//     `ts`,
//     `tsx`,
//     `js`,
//     `jsx`,
//     `json`,
//     `node`
//   ],
// };

module.exports = {
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
};
