(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.keyWord = "";
  
  menu.getMatchedMenuItems = function(){
    var promise = MenuSearchService.getMatchedMenuItems(menu.keyWord);

    promise.then(function (response) {
      menu.found = response;
	  console.log(menu.found);
	  if (menu.found.length){
		menu.msg = "";
	  }
	  else {
		menu.msg = "Nothing found!";
	  };
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };


}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (keyWord) {
	//console.log(keyWord);
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
	.then(function(result){
	  // process result and only keep items that match
	  var menu = result.data.menu_items;
	  var foundItems = [];
	  
	  for (var i in menu){
		if (menu[i].description.indexOf(keyWord) > 0){
		  foundItems.push(menu[i]);
		};
	  };
	  
	  return foundItems;
	})
    return response
  };


}

})();