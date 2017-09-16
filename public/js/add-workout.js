// This code makes works with the add-workout page. It makes the sets select input visible when clicking on the exercise check box

var count = document.querySelectorAll('[name="exercise"]');
     
      for(var i = 0; i < count.length; i++){
        document.querySelector(".exercise_" + i).addEventListener("change", function(){
          var exercise_num = document.querySelector("[name='exercise']").className[9];
          var sets_num = document.querySelector("[name='sets']").className[4];
             if (!this.checked){
                document.querySelector(".set_" + this.className[9]).classList.add("sets-display");
                document.querySelector(".set_" + this.className[9]).setAttribute("disabled", '');
             } else {
               document.querySelector(".set_" + this.className[9]).classList.remove("sets-display");
              document.querySelector(".set_" + this.className[9]).removeAttribute("disabled");
             }
        });
      }