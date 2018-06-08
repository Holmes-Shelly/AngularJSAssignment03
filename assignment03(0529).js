(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchMenu = MenuSearchService.getMenuItems();
  console.log(menu.searchMenu);


}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  //var foundItems = []

  service.getMenuItems = function () {
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
	.then(function(result){
		var foundItems = result.data.menu_items;
		console.log(foundItems);
	}, function(error){
		console.log("Something went terribly wrong.");
	});
    return foundItems
  };


}

})();