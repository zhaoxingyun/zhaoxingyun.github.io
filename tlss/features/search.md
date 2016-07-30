# 搜索

## API接口

### 互联网数据接口

互联网数据接口返回各种搜索引擎或特定网站查询结果。
采用restful接口方式，使用`get`方式请求,可以接受以下参数为:

|参数|类型|必填|备注|
|--|--|--|--|
|keyword|String|是|查询关键词，需要进行URL编码|
|start|Int|否|结果返回起始位置|
|lr|String|否|查询结果语言，取值范围：`lang_zh-CN`，`lang_zh-TW`，`lang_en`|
|tbs|String|否|查询结果时间范围，取值范围：`qdr:h`，`qdr:d`，`qdr:w`，`qdr:m`，`qdr:y`|
|r|Int|是|随机数，防止缓存，建议使用UNIX TIME毫秒数|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/search?q=keyword&r=1234567890&start=10&lr=lang_zh&tbs=qdr:m&token=abcdefghijk
```

接口以`json`格式返回查询结果集合和分页信息集合。
结果中包含了“标题”，“结果地址”，“结果引用”，“结果简介”内容。
对于没有查询结果的，返回空对象。返回数据形式如下：

```json
{
	"list" : [{
			"title" : "“我有一壶酒，足以慰风尘。尽倾江海里，赠饮天下人。”？ - 知乎",
			"url" : "https://www.zhihu.com/question/40720542",
			"cite" : "https://www.zhihu.com/question/40720542",
			"summary" : "&#x4E8E;&#x662F;&#xFF0C;&#x4E00;&#x3001;&#x201C;<em>&#x5C3D;&#x503E;&#x6C5F;&#x6D77;&#x91CC;</em>&#xFF0C;<em>&#x8D60;&#x996E;&#x5929;&#x4E0B;&#x4EBA;</em>&#x201D;&#x7406;&#x8BBA;&#x4E0A;&#x662F;&#x771F;&#x7684;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#xFF1B;&#x4E8C;&#x3001;&#x963F;&#x4F0F;&#x4F3D;&#x5FB7;&#x7F57;&#x5E38;&#x6570;&#x771F;&#x7684;&#x5F88;&#x5927;&#xFF0C;&#x5206;&#x5B50;&#x771F;&#x7684;&#x5F88;&#x5C0F;&#xFF0C;&#x53EF;&#x4EE5;&#x62FF;&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#x6765;&#x6559;&#x80B2;&#x521A;&#x63A5;&#x89E6;&#x7269;&#x7406;&#x548C;&#x5316;&#x5B66;&#x7684;&#x521D;&#x4E2D;&#x751F;&#xFF1B;&#x4E09;&#xFF0C;&#x4E0D;&#xA0;..."
		}
	],
	"paging" : [{
			"text" : "",
			"cur" : false
		}, {
			"text" : "1",
			"cur" : true
		}, {
			"text" : "2",
			"cur" : false,
			"start" : "10"
		}, {
			"text" : "下一页",
			"cur" : false,
			"start" : "10",
			"id" : "pnnext"
		}
	]
}
```

### 本地搜索接口

本地搜索接口在最终用户本地索引中查询关键字相关信息，并返回查询结果。
采用restful接口方式，使用`get`方式请求，可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|keyword|String|是|查询关键词，需要进行URL编码|
|start|Int|否|结果返回起始位置|
|lr|String|否|查询结果语言，取值范围：`lang_zh-CN`，`lang_zh-TW`，`lang_en`|
|tbs|String|否|查询结果时间范围，取值范围：`qdr:h`，`qdr:d`，`qdr:w`，`qdr:m`，`qdr:y`|
|r|Int|是|随机数，防止缓存，建议使用UNIX TIME毫秒数|

```
http://localhost/api/search?q=keyword&r=1234567890&start=10&lr=lang_zh&tbs=qdr:m
```

接口以`json`格式返回查询结果集合和分页信息集合。
结果中包含了“标题”，“结果地址”，“结果引用”，“结果简介”内容。
对于没有查询结果的，返回空对象。返回数据形式如下：

```json
{
	"list" : [{
			"title" : "“我有一壶酒，足以慰风尘。尽倾江海里，赠饮天下人。”？ - 知乎",
			"url" : "https://www.zhihu.com/question/40720542",
			"cite" : "https://www.zhihu.com/question/40720542",
			"summary" : "&#x4E8E;&#x662F;&#xFF0C;&#x4E00;&#x3001;&#x201C;<em>&#x5C3D;&#x503E;&#x6C5F;&#x6D77;&#x91CC;</em>&#xFF0C;<em>&#x8D60;&#x996E;&#x5929;&#x4E0B;&#x4EBA;</em>&#x201D;&#x7406;&#x8BBA;&#x4E0A;&#x662F;&#x771F;&#x7684;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#xFF1B;&#x4E8C;&#x3001;&#x963F;&#x4F0F;&#x4F3D;&#x5FB7;&#x7F57;&#x5E38;&#x6570;&#x771F;&#x7684;&#x5F88;&#x5927;&#xFF0C;&#x5206;&#x5B50;&#x771F;&#x7684;&#x5F88;&#x5C0F;&#xFF0C;&#x53EF;&#x4EE5;&#x62FF;&#x8FD9;&#x4E2A;&#x6848;&#x4F8B;&#x6765;&#x6559;&#x80B2;&#x521A;&#x63A5;&#x89E6;&#x7269;&#x7406;&#x548C;&#x5316;&#x5B66;&#x7684;&#x521D;&#x4E2D;&#x751F;&#xFF1B;&#x4E09;&#xFF0C;&#x4E0D;&#xA0;..."
		}
	],
	"paging" : [{
			"text" : "",
			"cur" : false
		}, {
			"text" : "1",
			"cur" : true
		}, {
			"text" : "2",
			"cur" : false,
			"start" : "10"
		}, {
			"text" : "下一页",
			"cur" : false,
			"start" : "10",
			"id" : "pnnext"
		}
	]
}
```
