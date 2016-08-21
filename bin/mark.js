'use strict';
const fs = require('fs');
const path = require('path');
const markdown = require("markdown").markdown;

const articlesPath = path.resolve('./articles');

/*
读取文章目录
 */
let readArticles = new Promise((resolve, reject) => {
	fs.readdir(articlesPath, (err, files) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(files);
	});
});

/*
生成html
 */
let makeHtml = (file) => {
	let mdPath = path.join(articlesPath, file);
	let htmlPath = path.join(articlesPath, path.basename(file, '.md') + '.html');
	fs.writeFileSync(htmlPath, markdown.toHTML(fs.readFileSync(mdPath).toString()));
};

/*
遍历文件
 */
let iterateFiles = (files) => {
	for (let file of files) {
		makeHtml(file);
	}
};

readArticles.then(iterateFiles).catch((err) => {
	console.error(err);
	process.exit(1);
});
