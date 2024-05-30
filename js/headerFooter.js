$(function () {
    $("#header").load("header.html");
});
$(function () {
    $("#header-home").load("header-home.html");
});

$(function () {
    $("#header2").load("header2.html");
});
$(function () {
    $("#header3").load("header3.html");
});
$(function () {
    $("#headerHelp").load("headerHelp.html");
});
$(function () {
    $("#headerdashboard").load("../headerDashboard.html");
});

$(function () {
    $("#headerDashboard").load("headerDashboard.html");
});



$(function () {
    $("#profile-mobile-version").load("profileMobile.html");
});


$(function () {
    $("#footer").load("footer.html");
});
//mobile search bar

let prevScrollPos = window.pageYOffset;
const scrollThreshold = 550; // Adjust this value to control when the search bar should appear

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (currentScrollPos > scrollThreshold) {
    document.getElementById("search-bar").style.top = "0";
  } else {
    document.getElementById("search-bar").style.top = "-150px"; // Adjust based on the height of your search bar
  }
  prevScrollPos = currentScrollPos;
}

// Call the function to load header and footer when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadHeaderAndFooter);




//mobile footer

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scroll down
    document.getElementById("mobileFooter").style.transform = "translateY(100%)";
  } else {
    // Scroll up
    document.getElementById("mobileFooter").style.transform = "translateY(0)";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
