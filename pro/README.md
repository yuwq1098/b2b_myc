# 木有车项目中的注意事项

> 项目run起来报错的问题
1. $ npm install -g cnpm --registry=https://registry.npm.taobao.org
2. 使用cnpm install 后，目前会有两个插件包不兼容
	- vue-awesome-swiper插件包，请指定版本vue-awesome-swiper@2.4.2
	    * 具体体现在首页轮播图空白（ps: 内心是崩溃的，用vue+webpack的开发模式真是蛋疼）
	- vee-validate的版本也请指定vee-validate@^2.0.0-rc.8，
	    * 具体体现在使用登录的时候报 length未定义
	    * 还有has 错误之类的
	- ...（项目在以后肯定会遇到越来愈多的坑，主要是主开发人员的开发环境和后面开发人员的开发环境会有差异，cnpm不断的使用最新的插件包，插件包向前兼容的能力参差不齐，希望后来的开发人员能够耐心的去排错找错）
