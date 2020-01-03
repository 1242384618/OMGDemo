//javascript实现逻辑的部分

   var headerBtn = document.getElementsByClassName("header-btn")[0],
        home  = document.getElementsByClassName("home")[0],
       answer = document.getElementsByClassName("answer")[0],
       choose = document.getElementsByClassName("choose")[0],
       selects = document.getElementsByClassName("select")[0],
       len = selects.length,
       item;
              selects.onclick  = function (e) {
                  var e =  e || window.event;
                 selects.setAttribute("src","images/selected.png");

                  }



       //   choose.addEventListener("click",function () {
      //        console.log(choose,select);
      //       select.setAttribute("src","images/selected.png");
      // },false)

       headerBtn.addEventListener('click',function () {

           home.classList.contains("unshow")?home.className:home.classList.add("unshow");
           answer.classList.contains("unshow")?answer.classList.remove("unshow"):  home.classList.add("unshow");


       },false)