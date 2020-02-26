"use strict";

var uploader = document.querySelector(".profile-confirm-wrap .profile-confirm-uploaders .uploader.upload-photo"),
	//uploaders_factory = [],
	input = uploader.querySelector("input"),
	title = uploader.querySelector(".upload-text-title"),
	subtitle = uploader.querySelector(".upload-text-subtitle"),
	file = {},
	state = "idle";
if (uploader.classList.contains("uploading")) {
	state = "uploading";
} else if (uploader.classList.contains("wait")) {
	state = "wait";
} else if (uploader.classList.contains("error")) {
	state = "error";
} else if (uploader.classList.contains("success")) {
	state = "success";
}

const get_size = function(size_bytes) {
	if (size_bytes === 0) return "0 B";
	let size_name = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = parseInt(Math.floor(Math.log(size_bytes) / Math.log(1024))),
		p = Math.pow(1024, i),
		s = Math.round(size_bytes / p, 2);
	return s + " " + size_name[i];
};
const oninput = function(e) {
	if (state === "error") uploader.classList.remove(state);
	state = "uploading";
	uploader.classList.add(state);
	// get file data
	file = file || input.files[0];
	if (file && file.size > 1125899906842624) {
		return onerror(e);
	} else if (!file) {
		return;
	}
	// open xhr
	setTimeout(function() {
		onupload(e);
	}, 3000);
};
const onupload = function(e) {
	uploader.classList.remove(state);
	state = "wait";
	uploader.classList.add(state);
	title.innerText = "Файл загружен";
	subtitle.innerText = file.name + " (" + get_size(file.size) + ")";
	// processing on server side
	setTimeout(function() {
		if (Math.random() >= 0.5) {
			onsuccess(e);
		} else {
			onerror(e);
		}
	}, 2000);
};
const onsuccess = function(e) {
	uploader.classList.remove(state);
	state = "success";
	uploader.classList.add(state);
	title.innerText = "Страница с фотографией";
};
const onerror = function(e) {
	uploader.classList.remove(state);
	state = "error";
	uploader.classList.add(state);
	title.innerText = "Загрузить скан с фотографией";
	subtitle.innerText = "Размер файла не более 5 Мб";
	input.value = null;
};

input.addEventListener("input", oninput, true);
input.ondrag = input.ondragstart = input.ondragover = input.ondragenter = input.ondragleave = input.ondragend = function(e) {
	if (e.preventDefault) e.preventDefault();
	return false;
};
input.ondrop = function(e) {
	if (e.preventDefault) e.preventDefault();
	console.log(e, e.dataTransfer, e.dataTransfer.files);
	if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
		file = e.dataTransfer.files[0];
		oninput(e);
	}
	return false;
};
