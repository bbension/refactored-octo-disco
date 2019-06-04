var TV_Shows = ["Modern Family", "American Pickers", "Animal Planet", "Toy Story"];
var object;

function generateGIFS() {
    event.preventDefault();

    var show = $(this).attr("data-name");

    var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        show +
        "&api_key=C8kS8GRV68QJ76tWGEJnzg2JfIBVftlS&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var data = response.data;
        object = response.data;
        for (var i = 0; i < data.length; i++) {
            var gifDiv = $("<div> </div>");
            $(gifDiv).append(
                "<h4><strong>Rating: " + data[i].rating + "</strong></h4>"
            );
            $(gifDiv).append("<br>");
            var newGif = $("<img/>");
            newGif.attr("src", data[i].images.fixed_width_still.url);
            newGif.attr("still", "yes");
            newGif.addClass("images");
            gifDiv.append(newGif);
            $("#gif-output").prepend(gifDiv);
        }
    });
}

// Function for displaying movie data
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < TV_Shows.length; i++) {
        var a = $("<button>");

        a.addClass("gif btn btn-primary");

        a.attr("data-name", TV_Shows[i]);

        a.text(TV_Shows[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var show = $("#gif-input")
        .val()
        .trim();

    TV_Shows.push(show);

    renderButtons();
});

$(document).on("click", ".gif", generateGIFS);

renderButtons();

$(document).on("click", ".images", function() {
    var still = $(this).attr("still");
    console.log(still);
    if (still === "yes") {
        var index = object.length - 1 - $(".images").index(this);
        console.log(index);
        $(this).attr("still", "no");
        $(this).attr("src", object[index].images.fixed_width.url);
    } else {
        var index = object.length - 1 - $(".images").index(this);
        console.log(index);
        $(this).attr("still", "yes");
        $(this).attr("src", object[index].images.fixed_width_still.url);
    }
});