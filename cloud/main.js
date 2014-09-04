require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:




Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("savePart", function(request, response){
  var query = new Parse.Query("Parts");
  query.equalTo("name", request.params.name);
  query.count().then(function(partCount){
     
    if(partCount > 0){
      response.error("we already have that part!  please choose another");
      return;
    }
     
    var part = new Parse.Object("Parts");
    part.set("name", request.params.name);
    part.save().then(function() {
      response.success();
    }, function(error) {
      response.error(error);
    });
     
  });
});

Parse.Cloud.define("findParts", function(request, response){
  var query = new Parse.Query("Parts");
  query.ascending("name");
  return query.find().then(function(results){
    var parts = results.map(function(part){
      return part.get("name");
    });
    console.log("Find parts = " + parts);
    return response.success(parts);
  },function(error){
      response.error(error);
  });
});



console.log('This console.log is running in the cloud and was created by Nates Mac');
