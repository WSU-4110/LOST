
const {  positive, negative, homeText, songText, attrText, loginText } = require('../src/components/utils');

let value;
let posVals;
let negVals;

beforeAll(() => {
    posVals = [12, 71, 3];
    negVals = [-3, -12, -6];
    value = posVals.concat(negVals);

})

test('should get positive values', () => {
    expect(positive(value)).toEqual(posVals);
});

test('should get negative values', () => {
    expect(negative(value)).toEqual(negVals);
});
test('home page text', () => {
    expect(homeText()).toEqual("This is the Home Page");
});
test('song page text', () => {
    expect(songText()).toEqual("This is the Song Page");
});
test('attribute page text', () => {
    expect(attrText()).toEqual("This is the Attribute Page");
});
test('login page text', () => {
    expect(loginText()).toEqual("This is the Login Page");
});