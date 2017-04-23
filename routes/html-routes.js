var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");
var Saved = require("../models/Saved.js");
var Note = require("../models/Note.js");

module.exports = function(app) {
  
  app.get("/", function(req, res) {

    Article.find({}, function(error, doc) {
      if (error){
        res.send(error);
      }else{
        console.log("doc: " + doc)
        res.render("index", {
        article: doc
      });
      }
      });

  });



  // A GET request to scrape the npr website
app.get("/scrape", function(req, res) {

  console.log("removed old documents");
  // First, we grab the body of the html with request
  request("http://www.npr.org/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every article tag, and do the following:
    $("article").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
  
      result.title = $(this).find("h1.title").text();
      result.link = $(this).find("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);

        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  
  res.redirect('/articles');
});

 //Route to saved articles view
 app.get("/saved", function(req, res) {

    Saved.find({}, function(error, doc) {
      if (error){
        res.send(error);
      }else{
        console.log("doc: " + doc)
        res.render("saved", {
        saved: doc
      });
      }
      });

  });

 // Create a new note or replace an existing note
app.post("/saved", function(req, res) {

  var newSave = new Saved(req.body);

  newSave.save(function(error, doc){
    if (error) {
      res.send(error);
    }else{
      console.log("ran that saved post in routes");
      // console.log("doc" + doc);
      res.redirect("/saved");

    }
  })
});

//Route to articles view
app.get("/articles", function(req, res){

      Article.find({}, function(error, doc) {
        if (error){
          res.send(error);
        }else{
          console.log("doc: " + doc)
          res.render("index", {
          article: doc
          });
        }
      });

});

// Create a new note or replace an existing note
app.post("/saved/:id", function(req, res) {

  var newNote = new Note(req.body);

  newNote.save(function(error, doc){
    if (error) {
      res.send(error);
    }else{
      Saved.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})

      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else{
          res.send(doc);
        }
      })
    }
  });
});

};  //end module.exports





