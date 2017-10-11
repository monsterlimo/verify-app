$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
    
var origin = document.location.pathname.split("/").slice(-2, -1).toString();

var exemptionService = $.urlParam('requestId')
var attemeptedIdp = $.urlParam('idp')






console.log("usersIdp:" + localStorage.chosenIdp)
console.log(attemeptedIdp)

// check users idp has been specified
// function defineIdp(selectedIdp){

//   if (selectedIdp == undefined){
//     usersIdp = localStorage.chosenIdp

//     return usersIdp
//   } else {
//     usersIdp = selectedIdp
//     return usersIdp
//   }

// }


$("button").click(function(){


  var userLOA = $.urlParam('userLOA')
  var serviceLOA = $.urlParam('serviceLOA')
  var usersIdp = $.urlParam('usersIdp1')
  var idp = $.urlParam('idp')
  



 


  console.log()

  // if ((usersIdp === idp)||(usersIdp === 'null')){

  //   console.log('matching')
  //   event.preventDefault();
  // } else 

  if ((userLOA < '1') && (userLOA <= serviceLOA)){

  
    $('.error-message').removeClass('hidden')
    $('.form-control').addClass("error-input")
    event.preventDefault();
  }
  // // ALLOW USERS THROUGH WITH CORRECT IDP

});





