$(function () {
  $("#dashboardHeader").load("dashboardHeader.html", function() {
  });

  $("#listing-details-photo").load("listing-details-photo.html", function() {
    // Initialize Scrollspy after content is loaded
    const scrollElement1 = document.querySelector('#ListingDetails1');
    const scrollSpy1 = new bootstrap.ScrollSpy(scrollElement1, {
      target: '#page1',
      smoothScroll: true 
    });
  });
  
  $("#pricingapi1").load("pricingapi1.html", function() {
    // Initialize Scrollspy after content is loaded
    const scrollElement2 = document.querySelector('#PricingApi');
    const scrollSpy2 = new bootstrap.ScrollSpy(scrollElement2, {
      target: '#page2',
      smoothScroll: true 
    });
  });

  $("#rulesAndPolices").load("rulesAndPolices.html", function() {
    // Initialize Scrollspy after content is loaded
    const scrollElement2 = document.querySelector('#PricingApi');
    const scrollSpy2 = new bootstrap.ScrollSpy(scrollElement2, {
      target: '#page2',
      smoothScroll: true 
    });
  });

  $("#calander-availability").load("calander-availability.html", function() {
    // Initialize Scrollspy after content is loaded
    const scrollElement2 = document.querySelector('#PricingApi');
    const scrollSpy2 = new bootstrap.ScrollSpy(scrollElement2, {
      target: '#page2',
      smoothScroll: true 
    });
  });
});