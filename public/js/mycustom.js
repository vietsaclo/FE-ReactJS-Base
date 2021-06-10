$(document).ready(function () {
  $(function () {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $("#suggest").autocomplete({
      source: availableTags
    });
  });

  $(".menu-mb").click(function () {
    $(".menu-top").toggle("slow", function () { });
  });

  $(document).mouseup(function (e) {
    if ($(window).width() < 960) {
      var container = $(".menu-top");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    }
  });

  $(".filters-menu").click(function () {
    $(".cont-l").toggle(300);
  });

  $(".close-cont-l").click(function () {
    $(".cont-l").hide(300);
  });

  $(".search-mb").click(function () {
    $(".search-box").show(200);
    $(".search-mb").hide(200);
    $(".logo").hide(200);
  });

  $(document).ready(function () {
    $('.slide-b').owlCarousel({
      loop: true,
      margin: 25,
      autoplay: 6000,
      responsiveClass: true,
      nav: false,
      dots: true,
      items: 1
    })
  })

  $(document).ready(function () {
    $('.new-listing').owlCarousel({
      loop: true,
      margin: 25,
      responsiveClass: true,
      nav: true,
      dots: false,
      items: 4,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1230: {
          items: 4
        }
      }
    })
  })

  $(document).ready(function () {
    $('.collection').owlCarousel({
      loop: true,
      margin: 25,
      responsiveClass: true,
      nav: true,
      dots: false,
      items: 4,
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4
        }
      }
    })
  });

  //========================== product category ==========================
  $(".close-col-left").click(function () {
    $(".col-left").hide(300);
  });

  $(".ul-scroll > li > .bt-main").click(function () {
    $(".ul-scroll li").removeClass("active");
    $(this).parents(".ul-scroll > li").addClass("active");
    $(this).parents(".ul-scroll > li").children(".unselect-b").show();
    $(this).parents(".ul-scroll > li").children(".ul-scroll-2").show();
  });

  $(".unselect-b").click(function () {
    $(this).parents(".ul-scroll li").removeClass("active");
    $(".unselect-b").hide();
    $(".unselect-b2").hide();
  });

  $(".ul-scroll-2 > li > .bt-main").click(function () {
    $(".ul-scroll-2 > li").removeClass("active");
    $(this).parents(".ul-scroll-2 > li").addClass("active");
    $(this).parents(".ul-scroll-2 > li").children(".unselect-b2").show();
  });

  $(".filters-l").click(function () {
    $(".col-left").show(300);
  });

  $(document).mouseup(function (e) {
    if ($(window).width() < 960) {
      var container = $(".menu-top");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    }
    //Show menu page Category Product
    if ($(window).width() < 1230) {
      var container = $(".col-right .menu-top");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    }
  });

  $(".search-mb").click(function () {
    $(".search-box").show(200);
    $(".search-mb").hide(200);
    $(".logo").hide(200);
  });
});

$(document).ready(function () {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    autoplay: false,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: 3,
      dots: false,
      nav: true,
      margin: 8,
      smartSpeed: 200,
      slideSpeed: 500,
      responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });

  $(".more-list").click(function () {
    $(".ul-more").hide(300);
    $(this).children(".ul-more").toggle(300);
  });

  $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {
  let myChart = null;
  try {
    myChart = document.getElementById('myChart').getContext('2d');
  } catch (_e) {
    return;
  }
  // Global Options
  Chart.defaults.global.defaultFontFamily = 'poppins-m';
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.defaultFontColor = '#fff';

  let massPopChart = new Chart(myChart, {
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ['28/4', '29/4', '30/4', '1/5', '2/5', '3/5', '4/5', '5/5'],
      datasets: [{
        labels: 'dates',
        data: [
          2,
          1.5,
          1,
          0.5,
          0
        ],
        //backgroundColor:'green',
        backgroundColor: [
          'rgba(255, 255, 255, 0)'
        ],
        borderWidth: 1,
        borderColor: '#8077FF',
        hoverBorderWidth: 3,
        hoverBorderColor: '#E31FBB'
      }]
    },
    options: {
      title: {
        display: false,
        text: '',
        fontSize: 25
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: '#000'
        }
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
});
