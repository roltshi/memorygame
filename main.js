function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoxes() {
  let game = document.querySelector(".game-display");
  let imgurls = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
  ];
  let urls = [...imgurls, ...imgurls];
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
  createBoxes();
  // Flip
  $(".box").click(function () {
    let img = $(this).children();
    let src = $(this).children().attr("data-id");
    $("#status").text("");

    clicks++;

    if (clicks == 1) {
      box1 = img;
      box1.parent().css("pointer-events", "none");
      box1.parent().addClass("animate");
      img.attr("src", src);
    }
    if (clicks == 2) {
      box2 = img;
      box2.parent().addClass("animate");
      box2.parent().css("pointer-events", "none");
      img.attr("src", src);

      if (box1.attr("data-flipped") === "false" && box2.attr("data-flipped") === "false") {
        if (isMatching(box1.attr("data-id"), box2.attr("data-id"))) {
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
            box1.parent().removeClass("animate");
            box2.parent().removeClass("animate");
            clicks = 0;
          }, 1200);
        }
      }
    }
  });
});
