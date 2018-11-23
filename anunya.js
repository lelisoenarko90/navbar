$('.quick-add a').click(function() {
  $('.basket-button').addClass('active');
  window.setTimeout(function() {
    $('.basket-button').removeClass('active');
  }, 500);
});

$('.category').click(function() {
  $(this).toggleClass('active');
  $('.category').toggleClass('hide');
  $('.subcategory').toggleClass('hide');
});

$('.menu-button, .overlay, .mobile-menu-button').click(togglemenu);
$('.search-button').click(function() {
  togglemenu();
  $('.search input').focus();
});

function togglemenu() {
  $('nav, .overlay').toggleClass('show');
}

$(".search input").focusin(function() {
  $('.search').addClass('focus');
});
$(".search input").focusout(function() {
  $('.search').removeClass('focus');
});

/* Favourite */
$('.product .fav').click(function() {
  $(this).toggleClass('active');
});

/* Info */
$('.product .info').click(function() {
  //console.log(viewportWidth)
  
  
  var isActive = $(this).hasClass('active');
  //console.log(isActive);
  if (isActive === true){
     $(this).removeClass('active');
     $(this).closest('.product').removeClass('showinfo');
  } else {
      if (viewportWidth > 40){
    $('.product.showinfo').removeClass('showinfo');
    $('.product .info.active').removeClass('active');
  }
     $(this).addClass('active');
     $(this).closest('.product').addClass('showinfo');
  
  }
  productAlignment();
 
});

/* Ripple */
$("a").click(ripple);

function ripple(e) {
  e.preventDefault();
  var $div = $('<div/>'),
    btnOffset = $(this).offset(),
    x = e.pageX - btnOffset.left,
    y = e.pageY - btnOffset.top;

  if (isNaN(x)) {
    var x = event.changedTouches[0].pageX - btnOffset.left
  }
  if (isNaN(y)) {
    var y = event.changedTouches[0].pageY - btnOffset.top
  }

  $div.addClass("ripple-effect");
  var $ripple = $(".ripple-effect");

  var top = y - 25,
    left = x - 25;
  var color = $(this).data("ripple-color")

  $div.css({
    "top": top,
    "left": left,
    "background": color
  }).appendTo($(this));
  window.setTimeout(function() {
    $div.remove();
  }, 2000);
}

$(document).ready(measureviewport);

function measureviewport() {
  viewportWidth = $(window).width() / parseFloat($("body").css("font-size"));
  viewportHeight = $(window).height();
}

function sizetoptabs() {
  measureviewport();
  //console.log(viewportWidth);
  if (viewportWidth < 51) {
    var totalWidth = 0;
    $('.tabs a').each(function() {
      var measuredWidth = $(this).outerWidth(true);
      totalWidth = totalWidth + measuredWidth + 5;
      //console.log(totalWidth);
    });
    $('.tabs .inner').css('width', totalWidth + 'px');
  } else {
    $('.tabs .inner').css('width', '');
  }
}

$(document).ready(sizetoptabs);
$(window).resize(sizetoptabs);

/* Google Play Syle Shopping Links */

function subsubMenu(dataheight) {
  //console.log(dataheight);
  var menuHeight = $('.menu-container').height();
  //console.log(menuHeight);
  var combined = menuHeight + parseInt(dataheight) + 20;
  if (combined > 300) {
    $('.menu-container').height(combined + 'px');
  } else {
    $('.menu-container').height('');
  }
}

function menuResize(addheight, removeheight) {
  window.setTimeout(function() {
    var menuHeight = $('.menu-container').height();
    if (parseInt(addheight) > 0) {
      var newHeight = menuHeight + parseInt(addheight) + 20;
    }
    if (parseInt(removeheight) > 0) {
      var newHeight = menuHeight - parseInt(removeheight) - 20;
    }
    if (newHeight > 300) {
      $('.menu-container').height(newHeight + 'px');
    } else {
      $('.menu-container').height('');
      $('nav .after').height('');
    }

    window.setTimeout(function() {
      var outerHeight = 0;
      $('nav > *:visible:not(.after)').each(function() {
        outerHeight += $(this).outerHeight();
      });
      //console.log(outerHeight);
      var newH = outerHeight + 20;
      $('nav .after').css({
        'height': newH + 'px'
      });
    }, 200);
  }, 300);

}

$(document).ready(function() {

  //give height attribute to each sub sub menu for smooth animation
  $('nav .sub-sub-menu').each(function() {
    var subsubHeight = $(this).height();
    $(this).attr('data-height', subsubHeight).css({
      'height': 0,
      'padding': 0,
      'opacity': 0
    });
  });

  $('nav .play-menu .sub-menu li.has-sub > a').click(function() {
    var thisLi = $(this).parent('li');
    var isOpen = thisLi.hasClass('open');

    if (isOpen === true) {
      thisLi.addClass('current');
      var subsubMenu = $('.current.open + .sub-sub-menu');
      var removeheight = subsubMenu.attr('data-height');
      subsubMenu.css({
        'height': 0,
        'padding': 0,
        'opacity': 0
      });
      thisLi.removeClass('open');
      thisLi.removeClass('current');
    } else {
      thisLi.addClass('current open');
      var subsubMenu = $('.current.open + .sub-sub-menu');
      var addheight = subsubMenu.attr('data-height');
      subsubMenu.css({
        'height': addheight + 'px',
        'padding': '',
        'opacity': ''
      });
      thisLi.removeClass('current');
    }

    menuResize(addheight, removeheight);
  });

  var link = $('.play-menu > li > a'),
    expander = $('.show-entries-hover'),
    container = $('.menu-container'),
    linkh = 63,
    pos1 = 0,
    pos2 = (linkh * 1) + "px",
    pos3 = (linkh * 2) + "px",
    pos4 = (linkh * 3) + "px",
    pos5 = (linkh * 4) + "px",
    pos6 = (linkh * 5) + "px",
    left = "-300px"
  openColour = "rgba(0,0,0,.2)",
    appsColor = "",
    moviesColor = "",
    musicColor = "",
    booksColor = "",
    devicesColor = "";

  // Initialization, start positions
  $('li#home').css('top', pos1);
  $('li#apps').css('top', pos2);
  $('li#movies').css('top', pos3);
  $('li#music').css('top', pos4);
  $('li#books').css('top', pos5);
  $('li#devices').css('top', pos6);

  // Click function standard
  link.each(function() {
    $(this).on('click', function() {
      // Remove Background-Color when i click on an unselected item
      // Hiding is removed for debugging
      link.not($(this)).parent().addClass('hide');
      expander.removeClass('hidden');
      link.not($(this)).children('.menu-entry-text').attr("style", "");
      // Hide all menus except the right one
      link.not($(this)).next('.sub-menu').css({
        'opacity': 0
      }).addClass('index').removeClass('active');
      $(this).next('.sub-menu').css({
        'opacity': 1
      }).addClass('active');

      // Resize menu-container to fit contents of submenu
      var activeHeight = $(this).next('.sub-menu').height();
      var linkHeight = $(this).height();
      var combined = activeHeight + linkHeight;
      if (combined > 300) {
        $('.menu-container, .after').height(combined + 'px');
      } else {
        $('.menu-container, .after').height('');
      }

      // Show the back button
      $('.show-entries-hover').css('opacity', 1);

      // Changing Background-Color and Position
      // "Home"
      // This also resets all menu entries to their initial order
      if ($(this).children().hasClass('home')) {
        //console.log("true")
        expander.addClass('hidden');
        $(this).parent().css('top', pos1).removeClass('hide').addClass('active');
        $('#apps').css('top', pos2);
        $('#movies').css('top', pos3);
        $('#music').css('top', pos4);
        $('#books').css('top', pos5);
        $('#devices').css('top', pos6);
        $('.open + .sub-sub-menu').css('opacity', 0);
        $('nav li').removeClass('hide');
      }

      // "Apps"
      else if ($(this).children().hasClass('party')) {
        $('.open + .sub-sub-menu').css('opacity', 1);
        //$(this).children('.menu-entry-text').css({'background-color' : appsColor,'color' : 'white'});
        $(this).parent().css('top', pos1).removeClass('hide');
        $('#home').css('top', pos6);
        $('#movies').css('top', pos2);
        $('#music').css('top', pos3);
        $('#books').css('top', pos4);
        $('#devices').css('top', pos5);
        $('.hide').css({
          'left': left,
          'opacity': 0,
          'transition': 'all 0s',
          '-webkit-transition': 'all 0s',
          '-moz-transition': 'all 0s'
        });
      }
      // "Movies"
      else if ($(this).children().hasClass('movies')) {
        $('.open + .sub-sub-menu').css('opacity', 1);
        $(this).children('.menu-entry-text').css({
          'background-color': moviesColor,
          'color': 'white'
        });
        $(this).parent().css('top', pos1).removeClass('hide');
        $('#home').css('top', pos6);
        $('#apps').css('top', pos2);
        $('#music').css('top', pos3);
        $('#books').css('top', pos4);
        $('#devices').css('top', pos5);
        $('.hide').css({
          'left': left,
          'opacity': 0,
          'transition': 'all 0s',
          '-webkit-transition': 'all 0s',
          '-moz-transition': 'all 0s'
        });
      }
      // "Music"
      else if ($(this).children().hasClass('music')) {
        $('.open + .sub-sub-menu').css('opacity', 1);
        $(this).children('.menu-entry-text').css({
          'background-color': musicColor,
          'color': 'white'
        });
        $(this).parent().css('top', pos1).removeClass('hide');
        $('#home').css('top', pos6);
        $('#apps').css('top', pos2);
        $('#movies').css('top', pos3);
        $('#books').css('top', pos4);
        $('#devices').css('top', pos5);
        $('.hide').css({
          'left': left,
          'opacity': 0,
          'transition': 'all 0s',
          '-webkit-transition': 'all 0s',
          '-moz-transition': 'all 0s'
        });
      }
      // "Books"
      else if ($(this).children().hasClass('books')) {
        $('.open + .sub-sub-menu').css('opacity', 1);
        $(this).children('.menu-entry-text').css({
          'background-color': booksColor,
          'color': 'white'
        });
        $(this).parent().css('top', pos1).removeClass('hide');
        $('#home').css('top', pos6);
        $('#apps').css('top', pos2);
        $('#movies').css('top', pos3);
        $('#music').css('top', pos4);
        $('#devices').css('top', pos5);
        $('.hide').css({
          'left': left,
          'opacity': 0,
          'transition': 'all 0s',
          '-webkit-transition': 'all 0s',
          '-moz-transition': 'all 0s'
        });
      }
      // "Devices"
      else if ($(this).children().hasClass('devices')) {
        $('.open + .sub-sub-menu').css('opacity', 1);
        $(this).children('.menu-entry-text').css({
          'background-color': devicesColor,
          'color': 'white'
        });
        $(this).parent().css('top', pos1).removeClass('hide');
        $('#home').css('top', pos6);
        $('#apps').css('top', pos2);
        $('#movies').css('top', pos3);
        $('#music').css('top', pos4);
        $('#books').css('top', pos5);
        $('.hide').css({
          'left': left,
          'opacity': 0,
          'transition': 'all 0s',
          '-webkit-transition': 'all 0s',
          '-moz-transition': 'all 0s'
        });
      }
      return false;
    });
  });

  // Hide menu when you leave the menu container
  container.on('mouseleave', function() {
    $('.show-entries-hover').css('opacity', 1);
    $('.hide').css({
      'left': left,
      'opacity': 0,
      'transition': '',
      '-webkit-transition': '',
      '-moz-transition': ''
    });
    $('.index').css('opacity', 1);
    $('.sub-menu').removeClass('index');
  })

  // Show the menu when you hover the trigger 
  expander.on('mouseover', function() {
    $('.show-entries-hover').css('opacity', 0);
    $('.hide').css({
      'left': 0,
      'opacity': 1,
      'transition': '',
      '-webkit-transition': '',
      '-moz-transition': ''
    });
    $('.sub-menu').addClass('index').css('opacity', 0);

  });
});

// Touch Scroll changes
var lastScrollTop = 0;

function ScrollEnd() {
  if (viewportWidth <= 32) {
    var st = $(this).scrollTop();
    var downBuffer = lastScrollTop + 50;
    var upBuffer = lastScrollTop - 150;
    if (st > downBuffer) {
      //alert("scroll down \nlastScrollTop: "+lastScrollTop+" \nst: "+st+" \ndownBuffer: "+downBuffer);
      $('.topnav').addClass('hide-tabs');
    } else if (st === 0) {
      //alert("top of page \nlastScrollTop: "+lastScrollTop+"\nst: "+st);
      $('.topnav').removeClass('hide-tabs');
    } else if (st < upBuffer) {
      //alert("scroll up \nlastScrollTop: "+lastScrollTop+" \nst: "+st+" \nupBuffer: "+upBuffer);
      $('.topnav').removeClass('hide-tabs');
    }
    lastScrollTop = st;
  }
}
$(window).scroll(function() {
  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function() {
    //ScrollEnd();
  }, 200));
});

// Change look depending on data-colours

function showStyle() {
  var colours = $(this).attr('data-colours');
  if (typeof colours !== typeof undefined && colours !== false) {
    //showPageStyle(colours);
    $('head').append('<style id="afterbg">nav .after {background: linear-gradient(226deg,' + colours + ')}</style>');
    $('nav').addClass('show-after');
  } else {
    $('nav').removeClass('show-after');
  }
}
//$('nav a').mouseover(showStyle);
var styleinuse = false;

function setStyle() {
  var colours = $(this).attr('data-colours');
  var buttoncolours = $(this).attr('data-button-colours');
  if (typeof colours !== typeof undefined && colours !== false) {
    styleinuse = true;
    //animate in overlay 
    $('head').append('<style class="colour-after">nav .after, topnav .after, .mobile-menu-button .after {background: linear-gradient(226deg,' + colours + ')}</style>');
    $('.product .buttons .quick-add a').css('opacity', 0);

    $('nav, .topnav, .mobile-menu-button').addClass('show-after');

    // then change bg after 200ms
    window.setTimeout(function() {
      $('head').append('<style class="colour-bg">nav, .topnav, .mobile-menu-button {background: linear-gradient(226deg,' + colours + ')}</style>');
      $('nav, .topnav, .mobile-menu-button').removeClass('show-after');
      $('head').append('<style class="colour-buttons">.product .buttons .quick-add a, .mobile-menu-button {background: linear-gradient(226deg,' + buttoncolours + ')}</style>');
    }, 200);

    window.setTimeout(function() {
      $('.product .buttons .quick-add a').css('opacity', 1);
    }, 400);
  } else {
    if (styleinuse === true) {
      $('.colour-after').remove();
      $('.product .buttons .quick-add a').css('opacity', 0);
      window.setTimeout(function() {
        $('.colour-buttons').remove();
        $('.product .buttons .quick-add a').css('opacity', 1);
      }, 500);

      //animate in overlay with default menu colours
      $('nav, .topnav').addClass('show-after');

      // remove inline css and overlay
      window.setTimeout(function() {
        $('.colour-bg').remove();
        $('nav, .topnav').removeClass('show-after');
      }, 200);
      styleinuse = false;
    }
  }
}
$('nav .sub-sub-menu a').click(setStyle);

// Page Transition

// hide all sections apart from home
$('.content.starwars').css('opacity',1);
$('.content.home').css({
  'opacity': 0,
  'height': 0,
  'padding': 0
});
//$('.content.starwars').css('opacity', 1);

function hasPage() {
  $('a.active').removeClass('active');
  $(this).addClass('active');
  var page = $(this).attr('data-page');
  if (typeof page !== typeof undefined && page !== false) {
    //console.log(page);
    
    $('.content').css('opacity', 0);
    window.setTimeout(function() {
      $('.content:not(.' + page + ')').css({
        'height': 0,
        'padding': 0
      });
      $('.content.' + page).css({
        'height': '',
        'padding': '',
        'opacity': 1
      });
      window.scrollTo(0,0);
      $('.overlay').click();
    }, 500);
  }
}
$('nav a').click(hasPage);

$(document).ready(productAlignment);
$(window).resize(productAlignment);
function productAlignment() {
  ////////   Remove swatch containers   /////// 
  $(".product").each(function () {
      var e = $(this).position().top;
      $(this).attr("data-top", e);
  });
  
  // count products AND expanded products (count as 2)
  
  // work out the grid
 // console.log(viewportWidth);
  if (viewportWidth > 77) {
    if (viewportWidth > 94) {
    var products = 4
  } else {
    var products = 3
  }
    
  } 
  //console.log(products);
  
  // remove swatch containers not needed for image alignment
  $(".swatch.age, .swatch.colour").closest(".product").each(function () {
     ThisProductTop = $(this).attr("data-top");
    $(".product[data-top='" + ThisProductTop + "'] .swatch").addClass("keep");
  });
  $(".swatch").not( $( ".swatch.keep" ) ).remove();
  $(".swatch.keep").removeClass('keep');

}

