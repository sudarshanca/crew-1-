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


// Function to load header and footer
//function loadHeaderAndFooter() {
//  // Load header
//    fetch('https://crewdogsconnect.com/demo/header.html')
//      .then(response => response.text())
//      .then(headerHTML => {
//          document.getElementById('header').innerHTML = headerHTML;
//      });
//  // Load header
//  fetch('../header2.html')
//      .then(response => response.text())
//      .then(headerHTML => {
//          document.getElementById('header2').innerHTML = headerHTML;
//      });

//  // Load header
//  fetch('../header3.html')
//      .then(response => response.text())
//      .then(headerHTML => {
//          document.getElementById('header3').innerHTML = headerHTML;
//      });
//  // Load headerHelp
//  fetch('../headerHelp.html')
//      .then(response => response.text())
//      .then(headerHTML => {
//          document.getElementById('headerHelp').innerHTML = headerHTML;
//      });

//  // Load searchBar
//  fetch('../searchBar.html')
//      .then(response => response.text())
//      .then(headerHTML => {
//          document.getElementById('searchBar').innerHTML = headerHTML;
//      });

//  // Load footer
//  fetch('../footer.html')
//      .then(response => response.text())
//      .then(footerHTML => {
//          document.getElementById('footer').innerHTML = footerHTML;
//      });
//}

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
