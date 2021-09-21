(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  /* click on hamburger btn */
  hamburgerBtn.addEventListener("click", showNavMenu);

  /* click on close nav btn */
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    // bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    // bodyScrollingToggle();
  }

  /* for closing nav menu */
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  /* attach an event handler to document */
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      /* make sure event.target.hash has a value before overriding default behaviour */
      console.log(event.target.hash);
      if (event.target.hash !== "") {
        if (event.target.hash === "#home") {
          window.location.hash = "home";
          location.reload();
        } else {
          /* prevent default anchor click behaviour */
          event.preventDefault();
          const hash = event.target.hash;
          /* deactivate existing active 'section' */
          document.querySelector(".section.active").classList.add("hide");
          document.querySelector(".section.active").classList.remove("active");
          /* activate new 'section' */
          document.querySelector(hash).classList.add("active");
          document.querySelector(hash).classList.remove("hide");
          /* deactivating existing navigation menu 'link-item' */
          navMenu
            .querySelector(".active")
            .classList.add("outer-shadow", "hover-in-shadow");
          navMenu
            .querySelector(".active")
            .classList.remove("active", "inner-shadow");
          /* if clicked 'link-item' is contained within the navigation menu */
          if (navMenu.classList.contains("open")) {
            /* activating new navigation menu 'link-item' */
            event.target.classList.add("active", "inner-shadow");
            event.target.classList.remove("outer-shadow", "hover-in-shadow");
            /* closing nav menu */
            hideNavMenu();
          } else {
            let navItems = navMenu.querySelectorAll(".link-item");
            navItems.forEach((item) => {
              if (hash === item.hash) {
                /* activate new navigation menu 'link-item'  */
                item.classList.add("active", "inner-shadow");
                item.classList.remove("outer-shadow", "hover-in-shadow");
              }
            });
            fadeOutEffect();
          }
          /* add hash (#) to url */
          window.location.hash = hash;
        }
      }
    }
  });
})();

/* --------------------------------------------------- hide all seections except active ----------------------------------------------------- */

(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();
