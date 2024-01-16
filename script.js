window.addEventListener("DOMContentLoaded",() => { //Wait for DOM to load
	const c = new Clock(".clock"); //Create Clock object
});

class Clock { //Clock class
	constructor(el) { //Constructor function
		this.el = document.querySelector(el); //Get element
		this.init();
	}
	init() {
		this.timeUpdate(); //Initialize clock
	}

	get datetimeAsObject() { //Get date and time as object
		const date = new Date();
		const Y = date.getFullYear();
		const M = date.getMonth() + 1;
		const D = date.getDate();
		const h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();

		return {Y,M,D,h,m,s};
	}

	get datetimeAsString() { //Get date and time as string
		const [Mt,Mo,Dt,Do,Yth,Yh,Yt,Yo,ht,ho,mt,mo,st,so,ap,m] = this.datetimeDigits;
		const date = `${Mt}${Mo}/${Dt}${Do}/${Yth}${Yh}${Yt}${Yo}`;
		const time = `${ht}${ho}:${mt}${mo}:${st}${so} ${ap}${m}`;

		return `${date} ${time}`.trim();
	}

	get datetimeDigits() { //Expand datetime to individual digits
		let {Y,M,D,h,m,s} = this.datetimeAsObject;
		//Year
		const YYYY = `${Y}`.split("");
		//Month
		let MM = `${M}`.split("");
		if (M < 10) MM.unshift(" ");
		//Day
		let DD = `${D}`.split("");
		if (D < 10) DD.unshift(" ");
		// Meridiem
		const ap = h > 11 ? "P" : "A";
		if (h > 12) h -= 12;
		if (h === 0) h = 12;
		//Hour
		let hh = `${h}`.split("");
		if (h < 10) hh.unshift(" ");
		//Minute
		let mm = `${m}`.split("");
		if (m < 10) mm.unshift("0");
		//Second
		let ss = `${s}`.split("");
		if (s < 10) ss.unshift("0");

		return [...MM,...DD,...YYYY,...hh,...mm,...ss,ap,"M"];
	}

	timeUpdate() { 
		//Update the title
		this.el?.setAttribute("title", this.datetimeAsString);
		//Update the digits
		this.datetimeDigits.forEach((digit,i) => {
			const digitEl = this.el.querySelectorAll("[data-digit]")[i];
			if (!digitEl) return;

			digitEl.setAttribute("data-digit",digit);
		});
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}