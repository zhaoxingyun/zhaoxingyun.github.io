# 分类

## API接口

### 获取分类树

返回当前用户所有可见分类树，包括公共分类树（type=0）和私有分类树（type=1）。
采用restful接口方式，使用`get`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|r|Int|是|随机数，防止缓存，建议使用UNIX TIME毫秒数|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tree?r=123123123&token=abcdefghijk
```

接口以`json`格式返回分类树集合。
结果中包含了“id”，“标题”，“图标”，“类型”，“子节点集合”，“标签集合”，“描述信息”，“版本”内容。
“子节点”包含了“id”，“标题”，“子节点集合”，“描述信息”内容。
返回数据形式如下：

```json
[{
	"id": 1,
	"title": "J2EE技能分类树",
	"icon": "iconurl",
	"type": 1,
	"tags": ["tag1", "tag2"],
	"children": [{
		"id": 2,
		"title": "title",
		"desc": "desc"
	}],
	"desc": "StckOverflow问题页面个性化模板",
	"version": 1
}]
```

### 新增分类树

创建新的分类树。分类树id生成规则为：不同分类树的根节点id保持唯一。相同根节点的所有子节点id保持唯一。
采用restful接口方式，使用`post`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|tree|String|是|要添加的分类树JSON字符串|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tree?token=abcdefghijk
```

接口返回保存成功的分类树信息。
返回数据形式如下：

```json
[{
	"id": 1,
	"title": "J2EE技能分类树",
	"icon": "iconurl",
	"type": 1,
	"tags": ["tag1", "tag2"],
	"children": [{
		"id": 2,
		"title": "title",
		"desc": "desc"
	}],
	"desc": "StckOverflow问题页面个性化模板",
	"version": 1
}]
```

### 新增分类树节点

可以向指定分类树根节点id和子节点id进行节点添加节点。如果对根节点进行添加，可以不传入子节点id。
新增分类树节点，会引起根节点version属性加1。
采用restful接口方式，使用`put`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|rootId|Int|是|根节点ID|
|childId|Int|否|子节点ID|
|item|String|是|要新增的节点JSON字符串|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tree/{rootId}/{childId}?token=abcdefghijk
```

接口返回新增成功的分类树节点信息。
返回数据形式如下：

```json
{
	"id": 1,
	"title": "J2EE技能分类树",
	"icon": "iconurl",
	"type": 1,
	"tags": ["tag1", "tag2"],
	"desc": "StckOverflow问题页面个性化模板",
	"version": 1
}
```

### 更新分类树节点

通过指定分类树根节点id和子节点id进行节点内容更新。如果对根节点进行修改，可以不传入子节点id。
更新节点不能增加或删除节点的子节点。
更新分类树节点，会引起根节点version属性加1。
采用restful接口方式，使用`put`方式请求,可以接受以下参数:


|参数|类型|必填|备注|
|--|--|--|--|
|rootId|Int|是|根节点ID|
|childId|Int|否|子节点ID|
|item|String|是|节点JSON字符串|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tree/{rootId}/{childId}?token=abcdefghijk
```

接口返回更新成功的分类树节点信息。
返回数据形式如下：

```json
{
	"id": 1,
	"title": "J2EE技能分类树",
	"icon": "iconurl",
	"type": 1,
	"tags": ["tag1", "tag2"],
	"desc": "StckOverflow问题页面个性化模板",
	"version": 1
}
```

### 删除分类树或分类树节点

通过指定分类树根节点id和子节点id进行节点删除，被删除节点的子节点会被同时删除。
删除子节点，会引起根节点version属性加1。
采用restful接口方式，使用`put`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|rootId|Int|是|根节点ID|
|childId|Int|否|子节点ID|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tree/{rootId}/{childId}?token=abcdefghijk
```

### 获取标签集合

获取token对应用户的所有标签。
采用restful接口方式，使用`get`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|r|Int|是|随机数，防止缓存|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tag?r=1234567&token=abcdefghijk
```

接口返回标签信息，包括“id”，“标签名称”，“所属分类树节点集合”信息。
返回数据形式如下：

```json
[{
	"id": 1,
	"tag": "java",
	"treeItems": [1, 2, 3]
}]
```

### 新增标签

创建新的标签，标签“tag”属性在一个“token”对应的用户中必须唯一。
采用restful接口方式，使用`post`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|tag|String|是|标签名称|
|treeItems|Array|否|所属分类树节点ID集合|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tag?token=abcdefghijk
```

接口返回新增的标签信息。
返回数据形式如下：

```json
{
	"id": 1,
	"tag": "java",
	"treeItems": [{
		"root": 1,
		"child": 2
	}]
}
```

### 更新标签

通过指定ID更新已有的标签，标签“tag”属性在一个“token”对应的用户中必须唯一。
采用restful接口方式，使用`put`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|id|String|是|标签ID|
|tag|String|是|标签名称|
|treeItems|Array|否|所属分类树节点ID集合|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tag/{id}?token=abcdefghijk
```

接口返回更新后的标签信息。
返回数据形式如下：

```json
{
	"id": 1,
	"tag": "java",
	"treeItems": [{
		"root": 1,
		"child": 2
	}]
}
```

### 删除标签

通过指定ID删除已有的标签。
采用restful接口方式，使用`delete`方式请求,可以接受以下参数:

|参数|类型|必填|备注|
|--|--|--|--|
|id|String|是|标签ID|
|token|String|是|认证凭证|

形式如下：

```
http://host/api/category/tag/{id}?token=abcdefghijk
```

### 结果创建分类信息

针对用户查看的互联网搜索结果和本地文件结果创建分类信息。
采用restful接口方式，使用`post`方式请求，可以接受以下参数：

|参数|类型|必填|备注|
|--|--|--|--|
|id|String|是|结果ID|
|token|String|是|认证凭证|

形式如下：

```
http://localhost/api/result/category?token=abcdefghijk
```

接口返回创建了分类信息的结果。在原有结果基础上增加了“所属标签”和“所属分类树节点”信息。
返回数据形式如下：

```json
{
	"id": 1,
	"title" : "“我有一壶酒，足以慰风尘。尽倾江海里，赠饮天下人。”？ - 知乎",
	"url" : "https://www.zhihu.com/question/40720542",
	"cite" : "https://www.zhihu.com/question/40720542",
	"summary" : "如何续写更有韵味？",
	"tags": [{
		"id": 1,
		"tag": "知乎",
		"treeItems": [{
			"root": 1,
			"child": 2
		}]
	}],
	"treeItems": [{
		"root": 1,
		"child": 2
	}]
}
```
