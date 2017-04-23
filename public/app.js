$(document).ready(function() {

// When you click the scrape button
$(document).on("click", "#scrapeButton", function() {
 	

  // Run a GET request to run the /scrape route
  $.ajax({
    method: "GET",
    url: "/scrape"
   
  })
    // With that done
    .done(function(data) {
    //   // Log the response
    alert("scrape complete");

    });

 });

// When you click the saveArticle button
$(".articleData").on("click", "#saveArticle", function() {
  // Grab the id associated with the article from the submit button
  // var thisId = $(this).attr("data-articleId");
  var thisTitle = $(this).attr("data-articleTitle");
  var thisLink = $(this).attr("data-articleLink");

  var queryData = {
			"title": thisTitle,
			"link": thisLink
		};
  // Run a POST request to save the article, using the data attributes
  $.ajax({
    method: "POST",
    url: "/saved",
    data: queryData
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      
    });
    console.log("ran that on click function in app js")
});

$(".articleData").on("click", "#createNote", function() {
	var thisTitle = $(this).attr("data-articleTitle");
	var thisId = $(this).attr("data-articleId");
	$('#noteModal').attr(thisId);
	$('#noteModal').attr(thisTitle);
	$('#noteModal').modal('show'); 
});
	
$(".noteModal").on("click", "#saveNote", function(){
	// Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-articleId");
  var noteBody = $("#articleNote").val();
  console.log(noteBody);
	$.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    data: {
      // Value taken from note textarea
      body: noteBody
    }
  })
	    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });  
});


});  //end document.ready