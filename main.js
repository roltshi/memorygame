function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoxes(diff) {
  let game = document.querySelector(".game-display");
  let easyurls = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
  ];
  let mediumurls = [
    ...easyurls,
    "images/img7.jpg",
    "images/img8.jpg",
    "images/img9.jpg",
    "images/img10.jpg",
    "images/img11.jpg",
    "images/img12.jpg",
  ];
  let hardurls = [
    ...mediumurls,
    "images/img13.jpg",
    "images/img14.jpg",
    "images/img15.jpg",
    "images/img16.jpg",
    "images/img17.jpg",
    "images/img18.jpg",
    "images/img19.jpg",
    "images/img20.jpg",
    "images/img21.jpg",
    "images/img22.jpg",
    "images/img23.jpg",
    "images/img24.jpg",
  ];
  let urls = "";
  if (diff == "easy") {
    urls = [...easyurls, ...easyurls];
  } else if (diff == "medium") {
    urls = [...mediumurls, ...mediumurls];
  } else if (diff == "hard") {
    urls = [...hardurls, ...hardurls];
  }
  shuffle(urls);

  for (let i = 0; i < urls.length; i++) {
    let box = document.createElement("DIV");
    let img = document.createElement("IMG");
    img.setAttribute("src", "images/question.png");
    box.classList.add("box");
    img.setAttribute("data-id", urls[i]);
    img.setAttribute("data-flipped", "false");

    box.appendChild(img);
    game.appendChild(box);
  }
}

function isMatching(box1, box2) {
  if (box1 === box2) {
    return true;
  } else {
    return false;
  }
}

function isWin() {
  let boxes = document.querySelectorAll(".box img");
  let wins = boxes.length;
  let count = 0;
  boxes.forEach((box) => {
    if (box.getAttribute("data-flipped") === "true") {
      count++;
    }

    if (wins == count) {
      document.getElementById("status").innerHTML = "Nyertél! Gratulálok! ";
    }
  });
}

$(function () {
  let clicks = 0;
  let box1 = "";
  let box2 = "";

  // Create boxes

  //game mode Easy
  $("#btn-easy").on("click", function () {
    $(".game-display").html("");
    $(".diffpanel").fadeOut();
    createBoxes("easy");
  });

  //game mode Medium
  $("#btn-medium").on("click", function () {
    $(".game-display").html("");
    $(".diffpanel").fadeOut();
    createBoxes("medium");
  });

  //game mode Hard
  $("#btn-hard").on("click", function () {
    $(".game-display").html("");
    $(".diffpanel").fadeOut();
    createBoxes("hard");
  });

  // Game mechanic

  $(".game-display").on("click", ".box", function () {
    if ($(".box").hasClass("animate-back")) {
      $(".box").removeClass("animate-back");
    }

    let img = $(this).children();
    let src = $(this).children().attr("data-id");
    $("#status").text("...");

    clicks++;

    //First Click
    if (clicks == 1) {
      box1 = img;
      box1.parent().css("pointer-events", "none");
      box1.parent().addClass("animate");
      img.attr("src", src);
    }
    //Second Click
    if (clicks == 2) {
      box2 = img;
      box2.parent().addClass("animate");
      box2.parent().css("pointer-events", "none");
      img.attr("src", src);

      if (box1.attr("data-flipped") === "false" && box2.attr("data-flipped") === "false") {
        if (isMatching(box1.attr("data-id"), box2.attr("data-id"))) {
          // If it macthes
          $("#status").text("Találat!");
          box1.attr("data-flipped", "true");
          box2.attr("data-flipped", "true");
          isWin();
          clicks = 0;
        } else {
          setTimeout(function () {
            box1.attr("src", "images/question.png");
            box2.attr("src", "images/question.png");
            box1.parent().css("pointer-events", "auto");
            box2.parent().css("pointer-events", "auto");
            box1.parent().addClass("animate-back");
            box2.parent().addClass("animate-back");
            box1.parent().removeClass("animate");
            box2.parent().removeClass("animate");
            clicks = 0;
          }, 1200);
        }
      }
    }
  });
});
