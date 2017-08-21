'use strict';

let myChart = echarts.init(document.getElementById('main'));

let commonMap = {
	"毕华": 1,
	"Rachel": 5,
	"゛和风说话的孩子": 2,
	"〃*Low bee、O.o)": 17,
	"☆┈--→啥！": 14,
	"水华": 34,
	"？！": 2,
	"妙恋人生": 1,
	"乡下人": 9,
	"彭勤": 2,
	"乔良闱": 16,
	"海棠无香": 6,
	"→〓◆★●〓": 3,
	"张晓迪": 28,
	"小妮子阿朱": 9,
	"牵着蜗牛游天下": 1,
	"一叶扁舟": 2,
	"Anthony": 1,
	"旺仔☆牛奶": 11,
	"安安靜靜的孩子": 5,
	"乔少河": 11,
	"魑魅魍魉": 4,
	"认真的狐狸": 1,
	"我心飞翔": 1,
	"段艳敏": 1,
	"不喝二锅头": 1,
	"Jacky Wang": 24,
	"北纬在爱36°": 4,
	"╰风吹淡一切": 3,
	"随~": 50,
	"晴听允洛": 9,
	"Clark": 36,
	"砒霜...。": 4,
	"豆豆dou逗逗": 3,
	"雨散": 7,
	"我爱毛毛虫": 3,
	"沫": 17,
	"浮生未歇": 4,
	"碙碙恏娿": 4,
	"inner peace": 1,
	"一个人的狂欢": 1,
	"元亨利贞": 2,
	"佛叶": 1,
	"Libra": 1,
	"╭ァ木林森づ": 4,
	"谁与争锋": 1,
	" シ逸钒シ": 1,
	"艾虎": 6,
	"Mandy": 1,
	"fǒrēvēr琼": 1,
	"妮*khun": 2,
	"微笑": 1,
	"默": 1,
	"TIAN TIAN": 2,
	"静心等待幸福": 1,
	"追@憶&人": 1,
	"山不转～水转": 1,
	"颩雨狆嶶笑": 3,
	"lorry": 1,
	"记忆@夏天≡风": 6,
	"一九八一": 1,
	"堕落☠龙君": 1,
	"YAWEI": 1,
	"I-LE-MY": 1,
	"M-dreamli": 1
};

let reMap = {
	"〃*Low bee、O.o)": 7,
	"水华": 18,
	"乡下人": 5,
	"☆┈--→啥！": 4,
	"゛和风说话的孩子": 1,
	"乔良闱": 6,
	"海棠无香": 4,
	"→〓◆★●〓": 2,
	"安安靜靜的孩子": 2,
	"张晓迪": 16,
	"小妮子阿朱": 4,
	"旺仔☆牛奶": 4,
	"Rachel": 2,
	"乔少河": 10,
	"魑魅魍魉": 3,
	"认真的狐狸": 1,
	"我心飞翔": 1,
	"一叶￡§扁舟": 1,
	"段艳敏": 1,
	"Jacky Wang": 8,
	"北纬在爱36°": 3,
	"╰风吹淡一切": 2,
	"晴听允洛": 7,
	"Clark": 15,
	"雨散": 4,
	"沫": 10,
	"浮生未歇": 4,
	"碙碙恏娿": 3,
	"inner peace": 1,
	"随~": 22,
	"我爱毛毛虫": 1,
	"砒霜...。": 1,
	"妮*khun": 2,
	"微笑": 1,
	"默": 1,
	"TIAN TIAN": 1,
	"艾虎": 2,
	"颩雨狆嶶笑": 2,
	"╭ァ木林森づ": 1,
	"lorry": 1,
	"记忆@夏天≡风": 2,
	"堕落☠龙君": 1
};

let category = [];

for (let key of Object.keys(commonMap)) {
	category.push({
		key: key,
		num: commonMap[key]
	});
}

category.sort((a, b) => {
	return a.num - b.num;
});

for (var i = 0; i < category.length; i++) {
	category[i] = category[i].key;
}

for (let key of Object.keys(reMap)) {
	if (category.indexOf(key) < 0) {
		category.unshift(key);
	}
}

let commonList = [];
let reList = [];
for (let key of category) {
	commonList.push(commonMap[key]);
	reList.push(reMap[key]);
}


let option = {
	title: {
		text: '评论数和回复数'
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['评论数', '回复数']
	},
	toolbox: {
		show: true,
		feature: {
			dataView: {
				show: true,
				readOnly: false
			},
			magicType: {
				show: true,
				type: ['bar', 'tiled', 'stack']
			},
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		}
	},
	calculable: true,
	yAxis: [{
		type: 'category',
		data: category
	}],
	xAxis: [{
		type: 'value'
	}],
	series: [{
		name: '评论数',
		type: 'bar',
		data: commonList,
		markPoint: {
			data: [{
				type: 'max',
				name: '最大值'
			}]
		},
		markLine: {
			data: [{
				type: 'average',
				name: '平均值'
			}]
		}
	}, {
		name: '回复数',
		type: 'bar',
		data: reList,
		markPoint: {
			data: [{
				type: 'max',
				name: '最大值'
			}]
		},
		markLine: {
			data: [{
				type: 'average',
				name: '平均值'
			}]
		}
	}]
};
myChart.setOption(option);
