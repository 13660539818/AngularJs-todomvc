(function (angular) {
	'use strict';
	/**
	 * MyTodoMvc Module
	 * 应用程序主模块
	 */
	var myApp = angular.module("MyTodoMvc", []);
	myApp.controller("MainController", ["$scope", function ($scope) {
		// 获取不重复的id
		function getId() {
			var id = Math.random();
			for(var i = 0; i < $scope.todos.length; i++){
				if($scope.todos[i].id === id) {
					id = getId();
					break;
				}
			} 
			return id;
		}

		// 文本框需要一个模型
		$scope.text = "";

		// 任务列表也需要一个模型
		// 每一个任务的结构{id: 1, text: "study", completed: true}
		$scope.todos = [{
				id: 0.11,
				text: "study",
				completed: true
			},
			{
				id: 0.12,
				text: "sleep",
				completed: false
			},
			{
				id: 0.13,
				text: "eat",
				completed: false
			},
		];
		// 添加todo
		$scope.add = function () {
			if(!$scope.text) {
				return;
			}
			$scope.todos.push({
				id: getId(),
				text: $scope.text,
				completed: false
			});
			// 清空文本框
			$scope.text = "";
		};
		//删除功能
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1)
					break;
				}
			}
		};
		//清空已完成
		$scope.clear = function() {
			var result = [];
			for(var i = 0;i < $scope.todos.length; i++){
				if(!$scope.todos[i].completed) {
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		};
		//是否有已经完成的
		$scope.existCompleted = function() {
			//该函数一定要有返回值
			for(var i = 0; i < $scope.todos.length; i++) {
				if($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};
		//当前编辑哪个元素
		$scope.currentEditingId = -1;
		$scope.editing = function(id) {
			$scope.currentEditingId = id;
		};
		//停止编辑
		$scope.saveEditing = function(id) {
			$scope.currentEditingId = -1;
		};

		// $scope.checkall = false;
		// $scope.$watch("checkall", function(now, old) {
		// 	for(var i = 0; i < $scope.todos.length; i++) {
		// 		$scope.todos[i].completed = now;
		// 	}
		// });
		var now = false;
		$scope.toggleAll = function() {
			for(var i = 0;i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		};
	}]);

})(angular);