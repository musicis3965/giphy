//creating our array and declaring all the variables first
var topics = ["eric", "donna", "hyde", "jackie", "fez", "kelso"];
var gifs = 10;
var image;
var rating;



// 2. Your app should take the topics in this array and create buttons in your HTML.
// * Try using a loop that appends a button for each string in the array.

function renderButtons() {
  $("#buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    //assigns a variable to button, and gives the
    // defined variable a class, 
    // all done on one line, cruz style
    var chrButton = $("<button>").addClass("chrButton").attr("data-name", topics[i]);
    //could've technically added this to the line above, but
    // didn't want it to be too long
    chrButton.text(topics[i]);
    //this puts the buttons on the html!
    $("#buttons").append(chrButton); 
  }
}

renderButtons();

//this allows user to add new character, pero it's not
// working rn :(
$("#add-character").on("click", function() {
    //the variable newChr now equals what was inputted in the 
    // form. the .trim gets rid of any spaces they may
    // have put in
    var newChr = $("#character-input").val().trim();
    //takes character and .pushes it to our array
    topics.push(newChr);
  
  });
// on button click this will display the images
$(document).on("click", ".chrButton", displayImages);

function displayImages() {
  //gets rid of images from last click
  $("#gifss").empty();
    var character = $(this).html();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sGjNhBaS9kQNWfBrvSg1WjHeqV27YtYd&q=" + character + " that-70s-show" + "&limit=10&offset=0&rating=PG&lang=en";

    //
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      //
      var results = response.data;

      
    //   ------------ // 

      
    //   for loop loading the various states of the gifs
      for (var i = 0; i < gifs; i++) {
        
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var image = $("<img>").addClass("gif");
        $("#gifss").prepend(gifDiv);
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        gifDiv.prepend(image);
        gifDiv.prepend(p);
        }

      //animate gif function
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }
        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
      });
    });
  
  }




