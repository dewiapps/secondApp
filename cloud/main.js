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
    part.set("likes", 0);
    part.set("dislikes", 0);
    part.save().then(function() {
      response.success();
    }, function(error) {
      response.error(error);
    });
     
  });
});

Parse.Cloud.define("voteUp", function(request, response){
  var query = new Parse.Query("Parts");
  query.equalTo("objectId", request.params.id);
  query.first().then(function(part){
    console.log("you clicked: " + part);
    part.increment("likes");
    part.save().then(function() {
      response.success();
    }, function(error) {
      response.error(error);
    });
     
  });
});

Parse.Cloud.define("voteDown", function(request, response){
  var query = new Parse.Query("Parts");
  query.equalTo("objectId", request.params.id);
  query.first().then(function(part){
    console.log("you clicked: " + part);
    part.increment("dislikes");
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
    return response.success(results);
  },function(error){
      response.error(error);
  });
});



console.log('This console.log is running in the cloud and was created by Nates Mac');
