"use strict";

var uploaders = document.querySelectorAll(".profile-confirm-wrap .profile-confirm-uploaders .uploader.upload-photo"); //".profile-confirm-wrap .profile-confirm-uploaders .uploader"

const Uploader = class Uploader {
	constructor(uploader) {
		this.uploader = uploader;
		this.input = uploader.querySelector("input");
		this.title = uploader.querySelector(".upload-text-title");
		this.subtitle = uploader.querySelector(".upload-text-subtitle");
		if (this.uploader.classList.contains("uploading")) {
			this.state = "uploading";
		} else if (this.uploader.classList.contains("wait")) {
			this.state = "wait";
		} else if (this.uploader.classList.contains("error")) {
			this.state = "error";
		} else if (this.uploader.classList.contains("success")) {
			this.state = "success";
		} else {
			this.state = "idle";
		}
		this.file = {};
		this.input.addEventListener("input", this.oninput.bind(this), true);
	}
	get_size(size_bytes) {
		if (size_bytes === 0) return "0 B";
		let size_name = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
			i = parseInt(Math.floor(Math.log(size_bytes) / Math.log(1024))),
			p = Math.pow(1024, i),
			s = Math.round(size_bytes / p, 2);
		return s + " " + size_name[i];
	}
	oninput(e) {
		if (this.state === "error") this.uploader.classList.remove(this.state);
		this.state = "uploading";
		this.uploader.classList.add(this.state);
		// get file data
		this.file = this.input.files[0];
		if (this.file && this.file.size > (1024 ** 5)) {
			return this.onerror(e);
		} else if (!this.file) {
			return;
		}
		// open xhr
		setTimeout(() => {
			this.onupload(e);
		}, 3000);
	}
	onupload(e) {
		this.uploader.classList.remove(this.state);
		this.state = "wait";
		this.uploader.classList.add(this.state);
		this.title.innerText = "Файл загружен";
		this.subtitle.innerText = this.file.name + " (" + this.get_size(this.file.size) + ")";
		// processing on server side
		setTimeout(() => {
			if (Math.random() >= 0.5) {
				this.onsuccess(e);
			} else {
				this.onerror(e);
			}
		}, 2000);
	}
	onsuccess(e) {
		this.uploader.classList.remove(this.state);
		this.state = "success";
		this.uploader.classList.add(this.state);
		this.title.innerText = "Страница с фотографией";
	}
	onerror(e) {
		this.uploader.classList.remove(this.state);
		this.state = "error";
		this.uploader.classList.add(this.state);
		this.title.innerText = "Загрузить скан с фотографией";
		this.subtitle.innerText = "Размер файла не более 5 Мб";
		this.input.value = null;
	}
};

for (let u of uploaders) new Uploader(u);
