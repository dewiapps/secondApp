
//function listParts(){
//  
//var counter = 0;  
//var query = new Parse.Query('Parts');
//query.ascending('name');
//query.find().then(function(results){
//  $('#content').html('');
//  _.each(results, function(item){
//    $('#content').append(
//      '<div id="' + item.get('name') + '"  class="part btn btn-warning btn-sm">' + item.get('name') + '</div><br>'
//    );
//  });
//  
// $('.part').click(function(){
//  var part = this.id;
//  var query = new Parse.Query('Parts');
//  query.equalTo("name", part);
//  query.first({
//  success: function(object) {
//    object.destroy().then(function(){
//      listParts();
//    });
//    
//  },
//  error: function(error) {
//    alert("Error: " + error.code + " " + error.message);
//  }
//});
//});// end click handler  
//  
//  
//}); // end then promise
// 
//}// listParts function
//
//
//
//
//
//
//
//$(function(){
//  
//  listParts();
//  
//  Parse.Cloud.run("getContent").then(function(response){
//    console.log(response);
//  });
//  
//  $('#partInput').keyup(function(e){
//    if(e.which === 13){
//      var currInput = $(this).val();
//      if (currInput !== ""){
//        Parse.Cloud.run('savePart', {name: currInput}).then(function(results){
//          listParts();
//        },function(error){
//          alert(error.message);
//        });
//        $(this).val('');
//      }
//    }
//  
//});
//  
//  
//}); // end document loaded