//This code is for the search bar animations
$(document).ready(function() {
  //jquery goes inside


});

// Functions to hide/show the searchResults and login form ////

$("#btnLogout").on("click", function() {
  // window.location.href="file:///Users/BrentG/Desktop/Aviato/index.html";
  $(".container").addClass("hide");
        $(".signInForm").removeClass("hide");
        $("#btnLogout").addClass("hide");
});



  // on.Clicks for navbar buttons


$(".search").on("click", function() {
  $(".myJobsPage").addClass("hide hoverable");
  $(".searchBar").removeClass("hide");
  $(".resultCards").removeClass("hide");
  $(this).addClass("hide");
  $(".heart").removeClass("hide");
});

$(".heart").on("click", function() {
    $(".searchBar").addClass("hide");
    $(".resultCards").addClass("hide");
    // addClass hide when we have buttons
    $(".myJobsPage").removeClass("hide");
    $(this).addClass("hide");
    $(".search").removeClass("hide");
});


