var jobCardsArray = [];


$( document ).ready(function(){


$(document).on("click", ".likebutton", function(){

    console.log("adding things to local storage");
    var key = $(this).closest(".job");
    // key = $(key).attr("id");

    // jobCardsArray.push(key);
    // jobCardsArray.push("foo");
    localStorage.setItem("lastClicked", JSON.stringify(key));
    var controls = $(key).attr("id");
    console.log(controls);
    $("#"+controls+" .card-action").remove();
    $(key).attr("style", "display: block; position: relative !important;");
    $(key).clone().appendTo(".myJobsPage");




    // Sorry! No Web Storage support..

});
});
