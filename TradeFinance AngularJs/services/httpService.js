app.service('httpServices',function($http){

   this.postRequest = function(url,postData){


     return new Promise(function(resolve, reject) {
    	// Do async job
      var data={};
      $http.post(url,postData).then(

        function(response){
          data = response;
          console.log(data);
          return data;
        },
        function(reason){
          console.log(reason);
        data = reason;
        return data;
        }
      );

    })




     }

});
