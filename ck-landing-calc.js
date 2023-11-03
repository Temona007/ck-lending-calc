/* ====== CK Landing Calculator ========= */

// Counter
const counterAnim = (qSelector, start = 0, end, duration = 1000, prefix) => {
  const target = document.querySelector(qSelector);
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress   = Math.min((timestamp - startTimestamp) / duration, 1);
      target.innerText = prefix + Math.floor(progress * (end - start) + start).toLocaleString("en-US");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
  window.requestAnimationFrame(step);
};

function LendingCalc() {

	// Input values:
	let orderAmmount;
	let loanTerms;

	// Order Amount
	let orderAmmountText   = document.getElementById('orderAmmount').value;
	let orderAmmountCommas = orderAmmountText.split(',').join('');
		  orderAmmount       = orderAmmountCommas * 1;

	// Interest Rate %
	let interestRate   = document.getElementById('range').value / 100;

	// Loan Terms
	let e 				= document.getElementById('loanTerms');
		  loanTerms = e.options[e.selectedIndex].value * 1;

	// console.log(orderAmmount);
	// console.log(term);

	// Calculations
	let monthlyInterest 					 = orderAmmount * interestRate;
	let monthlyInterestZeroPercent = monthlyInterest * (loanTerms-1)/loanTerms;
	let monthlyPrincipal           = orderAmmount / loanTerms;
	let totalInterest							 = monthlyInterestZeroPercent * loanTerms;
	let monthlyPaymentAmount       = monthlyInterestZeroPercent + monthlyPrincipal;

	if (orderAmmount > 0.01   && loanTerms > 0) {
		// Results
		document.getElementById('monthlyInterestZeroPercent').innerHTML = "$" + Math.round(monthlyInterestZeroPercent).toLocaleString("en-US").toString(2);
		document.getElementById('totalInterest').innerHTML              = "$" + Math.round(totalInterest).toLocaleString("en-US").toString(2);
		document.getElementById('monthlyPaymentAmount').innerHTML       = "$" + Math.round(monthlyPaymentAmount).toLocaleString("en-US").toString(2);

		// Animation
		counterAnim("#monthlyInterestZeroPercent", 0, monthlyInterestZeroPercent, 1000, "$");
		counterAnim("#totalInterest",              0, totalInterest,              1000, "$");
		counterAnim("#monthlyPaymentAmount",       0, monthlyPaymentAmount,       1000, "$");
		// counterAnim("#totalRevenueLift",    0, totalRevenueLift, 1000, " %");
	}
}

// Add dollar sign
function addDollarSign2() {
	let inputDollar = document.getElementById("inputDollar2");
	inputDollar.className += " input-dollar";
	document.getElementById("orderAmmount").style.paddingLeft = '25px';
}

// Limitation to input by characters
function enforceMaxLength(element, maxLength) {
  if (element.value.length > maxLength) {
    element.value = element.value.slice(0, maxLength);
  }
}

// commas to thousands
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}