# albi-frontend

## Commit message

使用下面的规范

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

### type

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

## script 

### dev

开发模式使用命令 `npm run dev`

### build

如果有指定`APP_URL_PREFIX`时，需要使用`APP_URL_PREFIX=/admin npm build`
