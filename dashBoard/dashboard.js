$(function () {
  // Load the dashboard header
  $("#dashboardHeader").load("dashboardHeader.html");

  // Load the listing details and initialize Scrollspy
  $("#listingdetails").load("listingdetails.html", function() {
    new bootstrap.ScrollSpy(document.body, {
      target: '#ListingDetails'
    });
  });

  // Load the pricing API content and initialize Scrollspy
  $("#pricingAirbnb").load("pricingAirbnb.html", function() {
    new bootstrap.ScrollSpy(document.body, {
      target: '#PricingApi'
    });
  });

  // Load the rules and policies and initialize Scrollspy
  $("#rulesAndPolices").load("rulesAndPolices.html", function() {
    new bootstrap.ScrollSpy(document.body, {
      target: '#Rules-and-Policies'
    });
  });

  // Load the calendar and availability and initialize Scrollspy
  $("#calander-availability").load("calander-availability.html", function() {
    new bootstrap.ScrollSpy(document.body, {
      target: '#Calendar-and-availability'
    });
  });
});
