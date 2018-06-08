(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.service('MenuGetService', MenuGetService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  
  menu.searchMenu = MenuSearchService.getMenuItems();
  console.log(menu.searchMenu);


}


MenuSearchService.$inject = ['MenuGetService'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  
  var promise = MenuGetService.getMenuItems();

  promise.then(function (response) {
    service.menuFilter = response.data.menu_items;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
  
  service.getMenuItems = function(){
	  return service.menuFilter;
  };
  
}

MenuGetService.$inject = ['$http', 'ApiBasePath'];
function MenuGetService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
	
  return response
  };
}



})();