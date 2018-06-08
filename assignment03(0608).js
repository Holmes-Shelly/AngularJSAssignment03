(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")


function foundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.keyWord = "";
  
  menu.getMatchedMenuItems = function(){
    var promise = MenuSearchService.getMatchedMenuItems(menu.keyWord);

    promise.then(function (response) {
      menu.found = response;
	  console.log("menu.found is", menu.found);
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
  
  menu.removeItem = function(itemIndex){
	console.log("deleted item is", menu.found[itemIndex]);
	menu.found.splice(itemIndex, 1);
  };
	  

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (keyWord) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
	.then(function(result){
	  // process result and only keep items that match
	  //console.log("response is", response);
	  //console.log("result is", result);
	  var menu = result.data.menu_items;
	  var foundItems = [];
	  
	  for (var i in menu){
		if (menu[i].description.toLowerCase().indexOf(keyWord.toLowerCase()) > 0){
		  foundItems.push(menu[i]);
		};
	  };

	  return foundItems;
	})
	//console.log("response is", response);
    return response
  };
  
  };

})();