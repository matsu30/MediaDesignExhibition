function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById("js-hamburger");
  var blackBg = document.getElementById("js-black-bg");
  var menu1 = document.getElementById("js-menu--1");
  var menu2 = document.getElementById("js-menu--2");

  hamburger.addEventListener("click", function() {
    body.classList.toggle("nav-open");
    body.classList.remove("nav-open-1");
    body.classList.remove("nav-open-2");

    TweenMax.to(".global-nav--1", 0.6, { right: -740 });
    TweenMax.to(".global-nav--2", 0.6, { right: -740 });
  });

  blackBg.addEventListener("click", function() {
    body.classList.remove("nav-open");
    body.classList.remove("nav-open-1");
    body.classList.remove("nav-open-2");

    TweenMax.to(".global-nav--1", 0.6, { right: -740 });
    TweenMax.to(".global-nav--2", 0.6, { right: -740 });
  });

  menu1.addEventListener("click", function() {
    var tl = new TimelineMax({
      onStart: function() {
        // アニメーションが開始した時の処理
        body.classList.add("nav-open-1");
      },
      onComplete: function() {
        body.classList.remove("nav-open-2");
      }
    });

    if (body.classList.contains("nav-open-2")) {
      // .global-nav--2 が開いて入ればこの中を処理する
      // .global-nav--2 を隠す
      tl.to(".global-nav--2", 0.6, { right: -740 });
    }
    // .global-nav--1 を表示する
    tl.to(".global-nav--1", 0.6, { right: 0 });
  });

  menu2.addEventListener("click", function() {
    var tl = new TimelineMax({
      onStart: function() {
        // アニメーションが開始した時の処理
        body.classList.add("nav-open-2");
      },
      onComplete: function() {
        body.classList.remove("nav-open-1");
      }
    });

    if (body.classList.contains("nav-open-1")) {
      // .global-nav--1 が開いて入ればこの中を処理する
      // .global-nav--1 を隠す
      tl.to(".global-nav--1", 0.6, { right: -740 });
    }
    // .global-nav--2 を表示する
    tl.to(".global-nav--2", 0.6, { right: 0 });
  });
}

toggleNav();
