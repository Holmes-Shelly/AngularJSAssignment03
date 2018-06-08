(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  var promise = MenuSearchService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data.menu_items;
	console.log(menu.items);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });


}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = []

  service.getMenuItems = function () {
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
	.then(function(result){
		foundItems = result.data.menu_items;
		console.log(foundItems);
	}, function(error){
		console.log("Something went terribly wrong.");
	});
    
  };


}

})();