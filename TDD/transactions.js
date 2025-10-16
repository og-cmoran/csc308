
class Portfolio {
    constructor() {
        this.holdings = [];
    }

    getHoldings() {
        return this.holdings;
    }
    
    addHolding(holding) {
        if (holding.shares <= 0) {
            throw new Error('Shares must be greater than 0');
        }
        this.holdings.push(holding);
    }
    
    addPurchase(ticker, shares) {
        if (shares <= 0) {
            throw new Error('Shares must be greater than 0');
        }
        this.holdings.push(new Holding(ticker, shares));
    }
    
    isEmpty() {
        return this.holdings.length === 0;
    }

    makeSale(ticker, shares) {
        if (shares <= 0) {
            throw new Error('Shares must be greater than 0');
        }
        const holding = this.holdings.find(hold => hold.ticker === ticker);
        if (!holding) {
            throw new Error(`Holding ${ticker} not found`);
        }
        if (shares > holding.shares) {
            throw new Error(`Not possible to sell this number of shares.`);
        }
        holding.shares -= shares;
        if (holding.shares <= 0) {
            this.holdings.splice(this.holdings.indexOf(holding), 1);
        }
    }

    uniqueTickers() {
        const tickers = new Set();
        for (const holding of this.holdings) {
            tickers.add(holding.ticker);
        }
        return tickers.size;
    }

    findShares(ticker) {
        const holding = this.holdings.find(hold => hold.ticker === ticker);
        if (!holding) {
            return 0;
        }
        return holding.shares;
    }
}

class Holding {
    constructor(ticker, shares) {
        if (shares <= 0) {
            throw new Error('Shares must be greater than 0');
        }
        this.ticker = ticker;
        this.shares = shares;
    }
}

module.exports = {Portfolio, Holding} 
