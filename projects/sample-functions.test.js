
const myFunctions = require('./sample-functions.js');

test('Testing div -- success', () => {
  const target = 4;
  const result = myFunctions.div(20, 5);
  expect(result).toBe(target);
});

test('Testing div -- pos num divided by a neg is neg', () => {
  const target = -2;
  const result = myFunctions.div(10, -5);;
  expect(result).toBe(target);
});

test('Testing div -- neg num divided by a neg is pos', () => {
  const target = 2;
  const result = myFunctions.div(-10, -5);
  expect(result).toBe(target);
});

test('Testing div -- zero divided by a num is zero', () => {
  const target = 0;
  const result = myFunctions.div(0, 1);
  expect(result).toBe(target);
});

test('Testing div -- division by one is the same number', () => {
  const target = 2;
  const result = myFunctions.div(2, 1);
  expect(result).toBe(target);
});

test('Testing div -- division by zero is infinite', () => {
  const target = Infinity;
  const result = myFunctions.div(20, 0);
  expect(result).toBe(target);
});

test('Testing contains numbers -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("aaa123q");
    expect(result).toBe(target);
});

test('Testing does not contains numbers -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("aaa");
    expect(result).toBe(target);
});

// This one fails!
//test('Testing does contains numbers but also a space -- success', () => {
//    const target = false;
//    const result = myFunctions.containsNumbers("aaa ");
//    expect(result).toBe(target);
//});
