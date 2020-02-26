"use strict";

var pages = Array.from(document.querySelectorAll(".page[data-page]")).map(e => [e, e.dataset["page"]]),
	scrolldots = document.querySelectorAll(".scrolldots .dot"), // ".scrolldots .dot:not(.current)"
	input = document.querySelector("#input"),
	input_submit = document.querySelector(".form button.check"),
	input_response = document.querySelector(".form .response"),
	input_response_domain = document.querySelector(".form .response .domain"),
	input_response_error = document.querySelector(".form .response-error"),
	features = document.querySelectorAll(".features .block"),
	features_info = document.querySelector(".features .info");

const scroll_to_page = (e) => {
	let pid = e.target.dataset["page"],
		page = pages.find(p => p[1] === pid);

	if (page) page[0].scrollIntoView({block: "start", behavior: "smooth"});
}

const form_submit = (e) => {
	if (/^\w+\.\w+$/.test(input.value)) {
		// xhr
		input_response_domain.innerText = input.value.toLowerCase();
		input_response.classList.remove("hidden");
		if (!input_response_error.classList.contains("hidden")) input_response_error.classList.add("hidden");
	} else {
		input_response_error.classList.remove("hidden");
		if (!input_response.classList.contains("hidden")) input_response.classList.add("hidden");
	}
}

const change_features_info = (e) => {
	e.preventDefault();
	let iid = e.target.dataset["block"];

	if (iid) {
		features_info.dataset["block"] = iid;
		e.stopPropagation();
	} else {
		iid = e.target.parentElement.dataset["block"];
		if (iid) features_info.dataset["block"] = iid;
	}
}

for (let dot of scrolldots) dot.addEventListener("click", scroll_to_page, true);
for (let f of features) f.addEventListener("click", change_features_info, true);
input_submit.addEventListener("click", form_submit, true);
