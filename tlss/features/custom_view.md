# 个性化显示

## API 接口

### 获取个性化显示模板

返回当前所有可用的个性化显示模板信息。可以基于多个URL进行过滤，只返回匹配URL的结果
采用restful接口方式，使用`get`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|urls|Array|否|进行过滤的URL结合，如果传入此参数，只返回匹配URL的结果|
|r|Int|是|随机数，防止缓存，建议使用UNIX TIME毫秒数|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/custom_view?url=url1&url=url2&r=123123123&token=abcdefghijk
```

接口以`json`格式返回模板集合。
结果中包含了“id”，“标题”，“图标”，“匹配正则”，“描述信息”，“渲染脚本”，“版本”内容。
对于没有查询结果的，返回空对象。返回数据形式如下：

```json
[{
	"id": 1,
	"title": "stackoverflow",
	"icon": "iconurl",
	"regex": "stackoverflow\\.com\/questions\/\\d+",
	"desc": "StckOverflow问题页面个性化模板",
	"script": "script",
	"version": 1
}]
```

### 新增个性化显示模板

新增个性化显示模板。
采用restful接口方式，使用`post`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|title|String|是|模板显示标题||
|icon|String|是|图标路径|
|regex|String|是|模板匹配正则|
|desc|String|是|模板描述|
|script|String|是|模板脚本|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/custom_view/?token=abcdefghijk
```

返回结果为新增的模板：

```json
{
	"id": 1,
	"title": "stackoverflow",
	"icon": "iconurl",
	"regex": "stackoverflow\\.com\/questions\/\\d+",
	"desc": "StckOverflow问题页面个性化模板",
	"script": "script",
	"version": 1
}
```

### 更新个性化显示模板

通过模板ID更新个性化显示模板。每次更新`version`自动增长。
采用restful接口方式，使用`put`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|id|Int|否|模板ID，参数在url path中体现|
|title|String|是|模板显示标题||
|icon|String|是|图标路径|
|regex|String|是|模板匹配正则|
|desc|String|是|模板描述|
|script|String|是|模板脚本|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/custom_view/{id}?token=abcdefghijk
```

返回结果为更新后的模板：

```json
{
	"id": 1,
	"title": "stackoverflow",
	"icon": "iconurl",
	"regex": "stackoverflow\\.com\/questions\/\\d+",
	"desc": "StckOverflow问题页面个性化模板",
	"script": "script",
	"version": 2
}
```

### 删除个性化显示模板

通过模板ID删除个性化显示模板。
采用restful接口方式，使用`delete`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|id|Int|否|模板ID，参数在url path中体现|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/custom_view/{id}?token=abcdefghijk
```

### 个性化显示渲染

通过指定的显示模板和网页DOM树，返回渲染后的DOM结果。
采用restful接口方式，使用`post`方式请求，可以接受以下参数：

|参数|类型|必填|备注|
|--|--|--|--|
|id|Int|是|用来渲染的模板ID|
|dom|String|是|需要进行渲染的DOM内容|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/custom_view/view?id=1&dom=domstring&token=abcdefghijk
```

接口返回渲染后的DOM内容。
