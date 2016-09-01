'use strict';
const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;
const pug = require('pug');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');

const ARTICLES_PATH = 'articles';
const VIEWS_PATH = 'view';
const LIST_PATH = 'list';
const VIEW_ARTICLES = path.resolve(VIEWS_PATH, 'articles.pug');
const VIEW_LIST = path.resolve(VIEWS_PATH, 'list.pug');
const PAGE_SIZE = 10;


let mkdir = (dirPath) => {
	return new Promise((resolve, reject) => {
		mkdirp(dirPath, (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
};
let initListPath = (htmls)=> {
	console.log(htmls);
	let listPath = path.resolve(LIST_PATH);
	return new Promise((resolve, reject) => {
		fs.access(listPath, (err) => {
			if (err) {
				mkdir(listPath).then(() => {
					resolve({
						listPath: listPath,
						htmls: htmls
					});
				});
				return;
			}
			fs.readdir(listPath, (err, files) => {
				if (err) {
					reject(err);
					return;
				}
				try {
					for (let fileName of files) {
						fs.unlinkSync(path.join(listPath, fileName));
					}
					resolve({
						listPath: listPath,
						htmls: htmls
					});
				} catch (err) {
					reject(err);
				}
			});
		});
	});
};
/**
 * 构建列表页
 */
let buildList = (result)=> {
	let listPath = result.listPath;
	let htmls = result.htmls;
	// 计算页数
	console.log(listPath, htmls);
	let pageNum = Math.ceil(htmls.length / PAGE_SIZE);
	for (let pageIndex = 0; pageIndex < pageNum; pageIndex++) {
		let start = pageIndex * PAGE_SIZE;
		let end = start + PAGE_SIZE;
		let pageHtml = htmls.slice(start, end);
		// 读取列表页面模板
		let html = pug.renderFile(VIEW_LIST, {
			pageHtml: pageHtml
		});
		// 生成文件
		fs.writeFileSync(path.join(listPath, pageIndex + '.html'), html);
	}
};

/**
 * 遍历文章
 * @type {Promise}
 */
let listArticles = new Promise((resolve, reject)=> {
	let articlesPath = path.resolve(ARTICLES_PATH);
	// 读取文章列表
	fs.readdir(articlesPath, (err, files) => {
		if (err) {
			reject(err);
			return;
		}
		// 遍历文章列表
		let htmls = [];
		for (let fileName of files) {
			if (!/\.md$/.exec(fileName)) continue;
			let filePath = path.join(articlesPath, fileName);
			try {
				htmls.push(buildHtml(filePath));
			} catch(err) {
				console.error(`build ${filePath} error.`, err);
			}
		}
		// 排序文章
		htmls = htmls.sort((a, b) => {
			return b.time - a.time;
		});
		resolve(htmls);
	});
});

/**
 * 生成文章HTML
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
let buildHtml = (filePath) => {
	let content = fs.readFileSync(filePath).toString();
	// 生成HTML
	let html = markdown.toHTML(content);
	// 获取时间
	let $ = cheerio.load(html);
	let $time = $('p').eq(0);
	let time = new Date($time.text());
	$time.addClass('time').text(time.toLocaleString());
	html = $.html();
	// 获取标题
	let title = $('h1').eq(0).text();
	html = pug.renderFile(VIEW_ARTICLES, {
		html: html,
		title: title
	});
	// 写出HTML
	let dirPath = path.dirname(filePath);
	let fileName = path.basename(filePath, '.md') + '.html';
	let htmlPath = path.join(dirPath, fileName);
	fs.writeFileSync(htmlPath, html);

	return {
		time: time.getTime(),
		path: htmlPath
	};
};

listArticles.then(initListPath).then(buildList).catch((err) => {
	console.error(err);
});
