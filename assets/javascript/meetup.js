var meetupCardCounter = 0;
var totalMeetupCards;
var meetUpCounter;

// FUNCTIONS
// ==========================================================
function generateMeetupResults(apiData) {
  // Did this file load?
  console.log("cards.js loaded");

  // Store jobs in an array
  var meetupArray = apiData.data;

  // Set global variable to number of jobs returned
  totalMeetupCards = meetupArray.length;

  // Create card elements
  for (var i=0; i < meetupArray.length; i++) {
    // convert timestamp to human readable format using Moment.js plugin
    var toEpoch = (meetupArray[i].time)/1000;
    var meetupDate = moment.unix(toEpoch).format("MM/DD/YYYY h:mma");
    // To make it more huamn readable, save large block of HTML as an array
    var output = [
      "<div class='meetup hoverable' id='meetup"+i+"'>",
      "<div class='result card' style='z-index: "+(10000-i)+";'>",
      "<div class='card-content'>",
      "<h4 class='grey-text text-darken-1'>"+meetupDate+"</h4>",
      "<span class='card-title activator grey-text text-darken-4'>"+meetupArray[i].name+"</span>",
      // "<p>"+meetupArray[i].snippet+"</p>",
      "<p><a href='"+meetupArray[i].link+"' target='_blank'>View event details</a></p>",
      "</div>",
      "</div>"
    ];
    output = output.join("");
    $("#meetups").append(output);



  }
  // Show the first card
  showNextMeetupCard();
}

function showNextMeetupCard() {
  if(meetupCardCounter < totalMeetupCards) {
    $("#meetup"+meetupCardCounter).css("display", "block");
    meetupCardCounter++;
  } else {
    $(".resultCards").html("No more cards.");
  }
}


// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runMeetupQuery(queryURL) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "jsonp",
    jsonpCallback: "logMeetupResults"
  });
} // runMeetupQuery

function logMeetupResults(json) {
  console.log(json);
  generateMeetupResults(json);
} // logResults

$(document).ready(function() {

$(document).on("click", ".theSubmitButton", function(e) {
    e.preventDefault();
    cardCounter = 0;
    $("#meetups").empty();
    // These variables will be used to build the Meetup API request
    var authKey = "2f3f3e6d2a6d20647953153870106d61";
    // queryURLBase is the start of our API endpoint.
    var queryURLBase = "https://api.meetup.com/find/events?sign=true&key=" +
      authKey;
    var query = $("#query").val().trim();
    console.log("query input: " + query);
    var radius = $("#radius").val();
    console.log("radius input: " + radius);

    var queryURL = queryURLBase + "&text=" + query + "&radius=" + radius;
    runMeetupQuery(queryURL);

  });

});
