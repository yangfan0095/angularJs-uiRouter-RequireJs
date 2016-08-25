require.config({
	baseUrl: 'app',
	paths: {
		'domReady':"../lib/domReady",
		'jquery':"../lib/jquery.min",
		'jqueryMedia':"../lib/jquery.media",
		'app': '../app/config/app',
		'angular': '../lib/angular',
		'router': '../lib/angular-ui-router',
		"bootStrap":"../lib/bootstrap"
	},
	shim: {
		"jquery":{
			exports: 'jquery'
		},
		'angular': {
			exports: 'angular'
		},
		"jqueryMedia":{
			deps:['jquery']
		},
		'router': {
			deps: ['angular']
		},
		'app': {
			deps: ['router']
		}
	}
})
// 初始化myModule模块
require(["domReady!",'app'],function( document){
	angular.bootstrap(document, ['myModule'])
})