// This is a basic JavaScript file

// Populate the Return on Equity dropdown with values from 5% to 60% in 2.5% increments
const roeSelect = document.getElementById('roe');
for (let i = 5; i <= 60; i += 2.5) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${i}%`;
    roeSelect.add(option);

    if (i === 20) {
        option.selected = true;
    }
}

// Populate the After Tax Required Return dropdown with values from 5% to 60% in 2.5% increments
const afterTaxReturnSelect = document.getElementById('after-tax-return');
for (let i = 8; i <= 14; i += 1) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${i}%`;
    afterTaxReturnSelect.add(option);

    if (i === 10) {
        option.selected = true;
    }
}

console.log("added drop downs");


// Your code goes here
// const table = document.querySelector('#earningsmultiplier');
function getEarningsMultiplierTable() {
    const table = document.getElementById('earningmultiplier');
    const rows = table.querySelectorAll('tr');
    let earningMultiplier = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];

        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });

        earningMultiplier.push(rowData.slice(1, rowData.length));
    });
    earningMultiplier = earningMultiplier.slice(1, earningMultiplier.length);
    return earningMultiplier;
}

function getDividendMultiplierTable() {
    const table = document.getElementById('dividendmultiplier');
    const rows = table.querySelectorAll('tr');
    let dividendmultiplier = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];

        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });

        dividendmultiplier.push(rowData.slice(1, rowData.length));
    });
    dividendmultiplier = dividendmultiplier.slice(1, dividendmultiplier.length);
    return dividendmultiplier;
}


function getPayoutRatio(eps, dps) { return dps / eps; }

function getDividendMultiplier(roe, requiredReturn) {
    return getDividendMultiplierTable()[(roe-5)/2.5][requiredReturn-8];
}

function getEarningsMultipier(roe, requiredReturn) {
    return getEarningsMultiplierTable()[(roe-5)/2.5][requiredReturn-8];
}

function calculate() {
    console.log("CALCULATING:");
    const shares = Number(document.getElementById('shares').value);
    const equity = Number(document.getElementById('equity').value);
    const roe = Number(document.getElementById('roe').value);
    const afterTaxReturn = Number(document.getElementById('after-tax-return').value);
    const eps = Number(document.getElementById('eps').value);
    const dps = Number(document.getElementById('dps').value);

    console.log(shares, equity, roe, afterTaxReturn, eps, dps);
    console.log("equity per share:", equity/shares);
    
    const payoutRatio = getPayoutRatio(eps, dps);
    const dividendMultiplier = getDividendMultiplier(roe, afterTaxReturn);
    const earningMultiplier = getEarningsMultipier(roe, afterTaxReturn);
    
    console.log("payout ratio:", getPayoutRatio(eps, dps));
    console.log("dividend multiplier:", getDividendMultiplier(roe, afterTaxReturn));
    console.log("earning multiplier:", getEarningsMultipier(roe, afterTaxReturn));

    document.getElementById('equity-per-share').textContent = equity/shares;
    document.getElementById('payout-ratio').textContent = payoutRatio;
    document.getElementById('dividend-multiplier').textContent = dividendMultiplier;
    document.getElementById('earning-multiplier').textContent = earningMultiplier;
    
    
    const intrinsicValue = equity/shares*dividendMultiplier*payoutRatio + equity/shares*earningMultiplier*(1-payoutRatio);
    document.getElementById('intrinsic-value').textContent = intrinsicValue;

    console.log(intrinsicValue);
}


document.getElementById('calculate').addEventListener('click', calculate);