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

$(function () {
    $("#calander").load("calander.html");
});

// Load searchbarmain.html and append it to #searchbarmain
$(function () {
    $.get("searchbarmain.html", function (data) {
        $("#searchbarmain").append(data);
        // Call function to initialize JavaScript after appending
        initializeDynamicContent();
    });
});







// Call the function to load header and footer when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadHeaderAndFooter);





