#vue构建的项目

##提交更新代码流程
1.git add .
2.git commit -m '提交信息'
3.git push

###制作首页app组件
1.完成header区域，使用mint-ui的header组件
2.完成底部tabbar,使用mui的tabbar样式
    + 设置购物车字体图标的操作
    + 先把扩展图标的css样式拷贝到项目中
    + 在把扩展字体库 ttf文件添加到项目
    + 为购物车添加类  ‘mui-icon-extra mui-icon-extra-cart’
3.在中间部分配置router-view，用来放置匹配到的组件


#改造tabbar为router-link

##设置被选中的组件为高亮
    使用linkActiveClass属性

###点击tabbar中的路由连接，前往对应的组件


#制作首页轮播图

#加载首页轮播图数据
1.获取数据
2.使用vue-resource的this.$http.get(url)获取数据
3.获取到的数据要保存到data中
4.使用v-for循环渲染每一个item项目



##改造新闻资讯 路由连接

##新闻资讯  页面制作
1.绘制界面
2.使用vue-resource获取数据
3.渲染真实数据

##实现新闻列表点击显示新闻详情
1.把列表中的每一项改造为router-link,同时跳转的时候应该携带id


###发表评论功能
1.文本框内容双向数据绑定
2.为发表按钮添加一个点击事件
3.校验是否为空
4.通过vue-resource发送请求给服务器
5.当发表评论ok后，重新刷新列表，最新评论显示在最上面


#改造图片分析 按钮为 路由的链接并显示对应的组件页面

#绘制图片列表 组件页面结构并美化样式
1.制作 顶部的滑动条
2.制作 底部的图片

### 制作顶部滑动条的坑们：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js
  + 调用官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
  4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
    + 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
    + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
    + 最终，我们选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
   5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
   6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；
   7. 获取所有分类，并渲染 分类列表；
