let loginVerifier = angular.module('LoginVerifier',[]);
loginVerifier.controller('LoginController',function($scope,$http){
   
    $scope.checkCredentials = function(){
        let data = {
            username: $scope.login.username,
            password: $scope.login.password
        };
        console.log(data);
        $http.post("http://localhost:3000/",JSON.stringify(data)).then((res) => {
            console.log(res.data);
        });
    };
});
