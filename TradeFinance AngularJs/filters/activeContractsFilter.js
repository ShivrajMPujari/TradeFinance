app.filter('activeContracts',function(){
  return function(allContracts){

      var tempArray = [];
      for(let i=0;i<allContracts.length;i++){

          if(allContracts[i].completion == false){

            tempArray.push(allContracts[i]);

          }

      }
          return tempArray;
  }
}
);
