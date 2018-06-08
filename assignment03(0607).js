(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")


function foundItemsDirective() {
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
  
  menu.removeItem = function(itemIndex){
	MenuSearchService.removeItem(itemIndex);
  };
	  

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (keyWord) {
	//console.log(keyWord);
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
	.then(function(result){
	  // process result and only keep items that match
	  var menu = result.data.menu_items;
	  
	  for (var i in menu){
		if (menu[i].description.toLowerCase().indexOf(keyWord.toLowerCase()) > 0){
		  foundItems.push(menu[i]);
		};
	  };
	  
	  return foundItems;
	})
    return response
  };
  
  service.removeItem = function (itemIndex) {
	foundItems[itemIndex];
    foundItems.splice(itemIndex, 1);
  };


}

})();