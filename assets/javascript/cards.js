/* ====================================
VARIABLES
======================================= */
var cardCounter = 0;
var totalCards;
var jobsArray = [];
var searchResults = [];
var count = 0;
//array being passed to firebase containing the jobs that the user liked and will be pulled onto their myjobs page
var jobsLikedArray = [];
/* ====================================
FUNCTIONS
======================================= */

function animateOffScreen(e, direction) {
  eid = "#"+e;
  e = $(eid);
  console.log("e: " + e);
  var winWidth = parseInt($(window).width());
  var elementWidth = parseInt($(e).closest(".job").width());
  var distanceToMove = winWidth;
  var options = {};
  options[direction] = distanceToMove;
  console.log(options);
  $(e).closest(".job").animate(
    options,
    400,
    "easeInQuart",
    function() {
      console.log("Animation complete");
      $(e).closest(".job").css("display","none");
    }
  );
}

function showNextCard() {
  if(cardCounter < totalCards) {
    $("#job"+cardCounter).css("display", "block");
    cardCounter++;
  } else {
    $(".resultCards").html("No more cards.");
  }
}

function generateSearchResults(apiData) {
  // Did this file load?
  console.log("cards.js loaded");
  

  // Store jobs in an array
  var jobsArray = apiData.results;
  console.log("jobsArray=================");
  console.log(jobsArray[0].company);

  // Set global variable to number of jobs returned
  totalCards = jobsArray.length;

  // Create card elements
  for (var i=0; i < jobsArray.length; i++) {
    
    // format company name
    var company = jobsArray[i].company.trim();
    var jobtitle = jobsArray[i].jobtitle;
    var snippet = jobsArray[i].snippet;
    var url = jobsArray[i].url;
    // define logoPath
    var logoPath = "";
    

    $.ajax({
      url: "https://autocomplete.clearbit.com/v1/companies/suggest?query=" +company,
      format: "json",
      async: false
    })
    .done(function(data) {
      var output = "";
      console.log("DONE! We're on i="+i);
      console.log(data);
        
        if (jQuery.isEmptyObject(data)) {
          // do nothing
        } else {
          logoPath = data[0].logo;
          console.log("Logo path: "+logoPath);
        }
        console.log("Company name: "+company);
        console.log("Logo path outside loop: "+logoPath);
        // To make it more huamn readable, save large block of HTML as an array
        
        output = [
          "<div class='job' id='job"+i+"'>",
          "<div class='result card' style='z-index: "+(5000-i)+";'>",
          // "<div class='card-image waves-effect waves-block waves-light'>",
          // "<img class='activator' src='http://via.placeholder.com/800x200?text=company+logo'>",
          // "</div>",
          "<div class='card-content'>",
          "<img src='"+logoPath+"'>",
          "<h4 class='grey-text text-darken-1'>"+company+"</h4>",
          "<span class='card-title activator grey-text text-darken-4'>"+jobtitle+"</span>",
          "<p>"+snippet+"</p>",
          "<p><a href='"+url+"' target='_blank'>View full post</a></p>",
          "</div>",
          "<div class='card-action'>",
          "<a class='dislikeButton text-red' href='#'><i class='material-icons'>cancel</i></a>",
          "<a class='likeButton text-green' href='#'><i class='material-icons'>check_circle</i></a></div>",
          "</div>",
          "</div>"
        ];
        output = output.join("");
        console.log("OUTPUT VARIABLE");
        console.log(output);
        // $(".resultCards").append(output);
        var domObject = $(output);
        $(".resultCards").append(domObject);

    });
    
  
  } // end for loop
  
   // Show the first card
    showNextCard();
 
}

function logResults(json){

      var searchResults = json;
      console.log(searchResults);
      generateSearchResults(searchResults);

};
  
function logoResult(json) {
  var logoPath = "";
  if (json === []) {
     // default value
  } else {
    logoPath = json.logo;
    console.log("Logo path: "+logoPath);
  }
}
  

/* ====================================
DOCUMENT.READY
======================================= */
$(document).ready(function() {

 


  
$(document).on("click", ".theSubmitButton", function(e) {
    e.preventDefault();
    cardsCounter = 0;
    $(".resultCards").empty();
    var query = $("#query").val().trim();
    // We're not using location anymore...
    // var location = $("#location").val().trim();
    var radius = $("#radius").val();

  $.ajax({
      url: "https://indeed-indeed.p.mashape.com/apisearch?mashape-key=B8zL1T5fb4mshiv7R8JucmgUpliBp1GCiJJjsnBTqe44VNSFyv&limit=25&publisher=2548872276202692&q="+query+"&l=austin%2C+tx&sort=&radius="+radius+"&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=&v=2&format=json",
      dataType: "jsonp",
      jsonpCallback: "logResults"
    });
  });


  // Handlers for the like/dislike buttons on cards
  $(document).on("click", ".likeButton", function(e) {
    e.preventDefault();
    console.log("Like button clicked");
    showNextCard();
    var id = this.closest(".job");
    id = $(id).attr("id");
    animateOffScreen(id, "left");


   //  animateOffScreen(this, "left");
    // var id = this.closest(".job");
    // id = $(id).attr("id");
    // animateOffScreen(id, "left");
    

    //////////////// local storage and moving card to myjobspage

    // console.log("adding things to local storage");
    // var key = $(this).closest(".job");
    // // key = $(key).attr("id");

    // // jobCardsArray.push(key);
    // // jobCardsArray.push("foo");
    // localStorage.setItem("lastClicked", JSON.stringify(key));

    // var controls = $(key).attr("id");
    // console.log(controls);

    // // BUG: Because this is happening *before* the clone(), the user sees the
    // // card controls "disappear" before the card is animated off screen
    // $("#"+controls+" .card-action").remove();
    // $(key).attr("style", "display: block; position: relative !important;");
    // $(key).clone().appendTo(".myJobsPage");


    ////////////////
    
    
    //////////////// pushing liked cards into an array to send to firebase
    var $key = $(this).closest(".job");
    // $key.find(".card-action").addClass("removeAction");
    var str = $key.prop('outerHTML');
    console.log("This is the key stringified: ");
    console.log(str);
    jobsLikedArray.push(str);
    
    
    // var userId = firebase.auth().currentUser.uid;
    
    // get userId from global var in firebaseAuth.js
    // writeUserData(userId, jobsLikedArray); 
    
    database.ref("users/"+userId).update({
        myjobs: jobsLikedArray
    });
    
    readUserData(userId);
    
    // NOTE: This probably needs to be in a callback somewhere.
    // Calling these two functions right after the other will create
    // unpredictable results. I think it'll make most sense to call this
    // as a callback on writeUserData.
    // readUserData(userId);
    
    console.log("this is the myjobsfirebase array: " + jobsLikedArray);
    //////////////// 

  }); // like button

  $(document).on("click", ".dislikeButton", function(e) {
    e.preventDefault();
    console.log("Dislike button clicked");
    showNextCard();
    var id = this.closest(".job");
    id = $(id).attr("id");
    animateOffScreen(id, "right");
  }); // dislike button

// The counter for how many liked jobs to myJobsPage
  $(document).on("click", ".likeButton", function() {
    count++;
    $("#myJobsCounter").html(count);
    console.log("the like button was clicked");
  });

// The counter for how many meetup events display (Brent)
  // $(document).on("click", ".theSubmitButton", function() {
  //   count++;
  //   $("#meetUpNumbers").html(count);
  //   console.log("the like button was clicked");
  // });


});