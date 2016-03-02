angular.module('moduleOne',[])

angular.module('moduleOne')
  .controller('mainController', ['$scope', '$http', 'picker', function($scope, $http, picker){
      var s = $scope

      s.loadFile = function(){
        picker.loadPicker()
        console.log('click worked')
      }


  }])

    