var pages = [].slice.call(document.querySelectorAll(".page[data-page]")).map(function(e) { return [e, e.dataset["page"]] }),
	scrolldots = document.querySelectorAll(".scrolldots .dot"),
	input = document.querySelector("#input"),
	input_submit = document.querySelector(".form button.check"),
	input_response = document.querySelector(".form .response"),
	input_response_domain = document.querySelector(".form .response .domain"),
	input_response_error = document.querySelector(".form .response-error"),
	features = document.querySelectorAll(".features .block"),
	features_info = document.querySelector(".features .info"),
	features_info_blocks = [].slice.call(document.querySelectorAll(".features .info > div"));

function scroll_to_page(e) {
	let pid = e.target.dataset["page"],
		page = pages.forEach(function(p) { if (p[1] === pid) return p[0].scrollIntoView(true); });
}

function form_submit(e) {
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

function change_features_info(e) {
	e.preventDefault();
	let iid = e.target.dataset["block"];console.log(iid, e);

	if (iid) {
		features_info.dataset["block"] = iid;
		features_info_blocks.forEach(function(e) { if (e.dataset["block"] === iid) { e.style.display = "block" } else { e.style.display = "none" } });
		e.stopPropagation();
	} else {
		iid = e.target.parentElement.dataset["block"];console.log(iid, e);
		if (iid) {
			features_info.dataset["block"] = iid;
			features_info_blocks.forEach(function(e) { if (e.dataset["block"] === iid) { e.style.display = "block" } else { e.style.display = "none" } });
		}
	}
}

Array.prototype.forEach.call(scrolldots, function(dot) { dot.addEventListener("click", scroll_to_page, true); });
Array.prototype.forEach.call(features, function(f) { f.addEventListener("click", change_features_info, true); });
input_submit.addEventListener("click", form_submit, true);
features_info_blocks[0].style.display = "block";
