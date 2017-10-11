//  $.urlParam = function(name){
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (results==null){
//        return null;
//     }
//     else{
//        return results[1] || 0;
//     }
// }
// var validation = $.urlParam('validation')
   
 



    function validateForm(){

      // inputs = document.getElementsByClassName('form-control');
      // formGroups = document.getElementsByClassName('form-group');
      // error = document.getElementsByClassName('error-message');

      // for (var i = inputs.length - 1; i >= 0; i--) {
    
      //   if (inputs[i].requirede.value == '') {

      //     console.log(inputs[i].value + 'is empty')
      //     inputs[i].className += " error-input";
      //     document.getElementById('error-message-answer-all-questions').classList.remove('hidden')
      //     event.preventDefault();

      //   } else {

      //   }
      // } 

          // event.preventDefault();

      // for (var i = formGroups.length - 1; i >= 0; i--) {
        
      //   console.log(formGroups[i].getElementsByClassName('form-control'))
      //   alert(formGroups[i])
          
      //   if (formGroups[i].value == '') {

      //     console.log(formGroups[i].value + 'is empty')
      //     formGroups[i].getElementsByTAGName('input').className += " error-input";
      //     document.getElementById('error-message-answer-all-questions').classList.remove('hidden')
      //     event.preventDefault();
      //   } 
      // } 

      // if (validation == 'true'){

      //   inputs = document.getElementsByClassName('form-control');

      //   console.log(validation)
      //   for (var i = inputs.length - 1; i >= 0; i--) {
      
      //       if (inputs[i].checkValidity() == false) {

      //         inputs[i].className += " error-input";
      //         console.log(inputs[i].closest('div > label'))


      //         formGroup = inputs[i].parentElement
      //         errorLabel = inputs[i].nextElementSibling
      //         errorLabelName = formGroup.firstChild.nextElementSibling.innerHTML 
      //         errorLabel.innerHTML = 'Please enter your ' + errorLabelName.toLowerCase()
      //         errorLabel.classList.remove('hidden')
      //         // document.getElementById('error-message-answer-all-questions').classList.remove('hidden')
      //         event.preventDefault();

      //       } else {
      //         // inputs[i].classList.remove("error-input");
      //         // inputs[i].nextElementSibling.classList.add("hidden")

      //       }
      //     } 


      // } else if (validation != 'true') {

      //   for (var i = inputs.length - 1; i >= 0; i--) {

      //     if (inputs[i].hasAttribute("reqired")) {
      //       inputs[i].removeAttribute("reqired")
      //     }

      //   }

      // }

      
      inputs = document.getElementsByClassName('form-control');


      for (var i = inputs.length - 1; i >= 0; i--) {

        inputs[i].removeAttribute("reqired")
        console.log(inputs[i])

return
      }

// function myFunction() {
//     var inpObj = document.getElementById("id1");
//         document.getElementById("demo").innerHTML = inpObj.validationMessage;
//     } else {
//         document.getElementById("demo").innerHTML = "Input OK";
//     } 
// }


    }

