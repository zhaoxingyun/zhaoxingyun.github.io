'use strict';
const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;
const pug = require('pug');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');
const less = require('less');

const ARTICLES_PATH = 'articles';
const VIEWS_PATH = 'view';
const LIST_PATH = 'list';
const CSS_PATH = 'css';
const VIEW_ARTICLES = path.resolve(VIEWS_PATH, 'articles.pug');
const VIEW_LIST = path.resolve(VIEWS_PATH, 'list.pug');
const VIEW_INDEX = path.resolve(VIEWS_PATH, 'index.pug');
const PAGE_SIZE = 10;
const MENUS = [{
	title: 'XY.Z',
	path: '/'
}, {
	title: 'Blog',
	path: '/list/0.html'
}];

let makeLocals = (locals) => {
	locals.menus = MENUS;
	return locals;
};

/**
 * 生成目录
 * @param  {[type]} dirPath [description]
 * @return {[type]}         [description]
 */
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
/**
 * 初始化列表目录
 * @param  {[type]} htmls [description]
 * @return {[type]}       [description]
 */
let initListPath = (htmls)=> {
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
	let blogImg = null;
	// 计算页数
	let pageNum = Math.ceil(htmls.length / PAGE_SIZE);
	for (let pageIndex = 0; pageIndex < pageNum; pageIndex++) {
		let start = pageIndex * PAGE_SIZE;
		let end = start + PAGE_SIZE;
		let pageHtml = htmls.slice(start, end);
		let pageInfo = {
			prev: pageIndex == 0 ? null : pageIndex - 1,
			now: pageIndex,
			next: pageIndex + 1 == pageNum ? null : pageIndex + 1
		};
		// 渲染列表页面
		let html = pug.renderFile(VIEW_LIST, makeLocals({
			pageHtml: pageHtml,
			pageInfo: pageInfo
		}));
		// 生成文件
		fs.writeFileSync(path.join(listPath, pageIndex + '.html'), html);
		// 获取最新的图片
		if (!blogImg) {
			for (let page of pageHtml) {
				blogImg = page.img;
			}
		}
	}
	return blogImg;
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
				htmls.push(buildArticle(filePath));
			} catch(err) {
				console.error(`build ${filePath} error.`, err);
			}
		}
		// 安发表时间排序文章
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
let buildArticle = (filePath) => {
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
	// 获取摘要
	let summary = [];
	$('p').each((i, p) => {
		let $p = $(p);
		if (!$p.hasClass('time')) {
			summary.push($p.text());
		}
	});
	// 获取图片
	let $img = $('img');
	html = pug.renderFile(VIEW_ARTICLES, makeLocals({
		html: html,
		title: title
	}));
	// 写出HTML
	let dirPath = path.dirname(filePath);
	let fileName = path.basename(filePath, '.md') + '.html';
	let htmlPath = path.join(dirPath, fileName);
	fs.writeFileSync(htmlPath, html);

	return {
		time: time.getTime(),
		title: title,
		summary: summary.join('&nbsp;').substr(0, 100),
		name: fileName,
		img: $img.length ? $img.attr('src') : null
	};
};
/**
 * 编译CSS
 */
let buildCss = new Promise((resolve, reject) => {
	let cssDir = path.resolve(CSS_PATH);
	let files = fs.readdirSync(cssDir);

	let build = ()=> {
		let fileName = files.shift();
		if (!fileName) {
			resolve();
			return;
		}

		if (!/\.less$/.exec(fileName)) {
			build();
			return;
		}
		less.render(fs.readFileSync(path.join(cssDir, fileName)).toString(), {
			compress: true
		}, (err, output) => {
			if (err) {
				reject(err);
				return;
			}

			// 生成文件
			let baseName = path.basename(fileName, '.less');
			fs.writeFileSync(path.join(cssDir, baseName + '.min.css'), output.css);
			build();
		});
	};
	build();
});
let buildIndex = (blogImg) => {
	let html = pug.renderFile(VIEW_INDEX, {
		blogImg: blogImg
	});

	// 生成文件
	fs.writeFileSync(path.resolve('index.html'), html);
};

listArticles.then(initListPath).then(buildList).then(buildIndex).then(buildCss).then(() => {
	console.log('ok');
}).catch((err) => {
	console.error(err);
});
