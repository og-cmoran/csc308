// Reflection on TDD is at bottom.

const { Portfolio, Holding } = require('./transactions.js');


describe('Portfolio', () => {
    let portfolio;

    beforeEach(() => {
        portfolio = new Portfolio();
    });

    test('2.1 portfolio starts empty -- sucess', () => {
        expect(portfolio.getHoldings().length).toBe(0);
    });

    test('2.2 portfolio isEmpty feature works when true -- success', () => {
        expect(portfolio.isEmpty()).toBe(true);
    });

    test('2.2 portfolio isEmpty feature works when false -- success', () => {
        portfolio.addHolding(new Holding('A', 1))
        expect(portfolio.isEmpty()).toBe(false);
    });

    test('2.3 adding a purchase to the portfolio -- success', () => {
        portfolio.addPurchase('A', 1);
        expect(portfolio.getHoldings().length).toBe(1);
        expect(portfolio.getHoldings()[0].ticker).toBe('A');
        expect(portfolio.getHoldings()[0].shares).toBe(1);
    });

    test('2.4 make a sale of a holding -- success', () => {
        portfolio.addPurchase('A', 1);
        portfolio.makeSale('A', 1);
        expect(portfolio.isEmpty()).toBe(true);
    });

    test('2.4 make a partial sale of a holding -- success', () => {
        portfolio.addPurchase('A', 2);
        portfolio.makeSale('A', 1);
        expect(portfolio.getHoldings().length).toBe(1);
        expect(portfolio.getHoldings()[0].ticker).toBe('A');
        expect(portfolio.getHoldings()[0].shares).toBe(1);
    });

    test('2.4 make a sale of a holding when there are multiple holdings -- success', () => {
        portfolio.addPurchase('A', 1);
        portfolio.addPurchase('B', 1);
        portfolio.makeSale('A', 1);
        expect(portfolio.getHoldings().length).toBe(1);
        expect(portfolio.getHoldings()[0].ticker).toBe('B');
        expect(portfolio.getHoldings()[0].shares).toBe(1);
    });

    test('2.4 make sale of holding that does not exist -- failure', () => {
        expect(() => {
            portfolio.makeSale('A', 1);
        }).toThrow('Holding A not found');
    });

    test('2.5 unique tickers feature works -- success', () => {
        portfolio.addPurchase('A', 1);
        portfolio.addPurchase('B', 1);
        expect(portfolio.uniqueTickers()).toBe(2);
    });

    test('2.5 unique tickers feature works when there are multiple holdings of same ticker -- success', () => {
        portfolio.addPurchase('A', 1);
        portfolio.addPurchase('A', 1);
        expect(portfolio.uniqueTickers()).toBe(1);
    });

    test('2.5 unique tickers feature works when there are no holdings -- success', () => {
        expect(portfolio.uniqueTickers()).toBe(0);
    });

    test('2.6 make holding with negative shares -- failure', () => {
        expect(() => {
            portfolio.addHolding(new Holding('A', -1));
        }).toThrow('Shares must be greater than 0');
    });

    test('2.6 add holding with negative shares -- failure', () => {
        expect(() => {
            portfolio.addPurchase('A', -1);
        }).toThrow('Shares must be greater than 0');
    });

    test('2.6 make sale with negative shares -- failure', () => {
        portfolio.addPurchase('A', 1);
        expect(() => {
            portfolio.makeSale('A', -1);
        }).toThrow('Shares must be greater than 0');
    });

    test('2.7 find shares finds shares for a ticker -- success', () => {
        portfolio.addPurchase('A', 1);
        expect(portfolio.findShares('A')).toBe(1);
    });

    test('2.7 find shares returns 0 for a ticker that does not exist -- success', () => {
        expect(portfolio.findShares('A')).toBe(0);
    });

    test('2.8 make sale with more shares than owned -- failure', () => {
        portfolio.addPurchase('A', 1);
        expect(() => {
            portfolio.makeSale('A', 2);
        }).toThrow('Not possible to sell this number of shares.');
    });

});


/**
 * Reflection on TDD
 * 
 * I feel although it was hard to train my brain to use TDD, as I would rather just
 * jump into writting the code, I was able to train myself to do so. The hardest part
 * is writting the test cases first, as you know little about your structure that 
 * you are testing. Even though it was slightly annoying, I feel learning to code
 * in this way, even if its to a smaller degree, is very valuable. It makes sure
 * you are activly thinking abou the code you are writing, and it is much easier to 
 * trust that the code works and the testing is adequate.
 */





