app.filter('completedContract',function(){

  return function(allContracts){

      var tempArray = [];
      for(let i=0;i<allContracts.length;i++){
          if(allContracts[i].completion == true){
            tempArray.push(allContracts[i]);
          }

      }
          return tempArray;
  }
});
