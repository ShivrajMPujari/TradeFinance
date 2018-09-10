app.service("loginService",function(){

this.clearStorageOnLogin = function(key){
      keyString = localStorage.getItem(key);
      keyObject = JSON.parse(keyString);
      console.log(keyObject);

      if(keyObject!=null){
        localStorage.removeItem(key);
        myJSON={};
        jsonString = JSON.stringify(myJSON);
        localStorage.setItem(key, jsonString);
        keyJson = localStorage.getItem(key);
        console.log(keyObject+"gaag");
        var allItem = JSON.parse(keyJson);
        return allItem;
      }

      if(keyObject==null){
        myJSON={};
        jsonString = JSON.stringify(myJSON);
        localStorage.setItem(key, jsonString);
        keyJson = localStorage.getItem(key);
        console.log(keyObject+"gaag");
        var allItem = JSON.parse(keyJson);
        return allItem;
      }

      return keyObject;
    }


}
);
