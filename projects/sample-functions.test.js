
const myFunctions = require('./sample-functions.js');

test('Testing div -- success', () => {
  const target = 4;
  const result = myFunctions.div(20, 5);
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

test('Testing does contains numbers but also a space -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("aaa ");
    expect(result).toBe(target);
});
