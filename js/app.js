const sections = document.querySelectorAll("section");
const navbarList = document.querySelector("#navbar__list");
const fab = document.querySelector("#fab");

const observerCB = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("your-active-class");
    else if (entry.target.classList.contains("your-active-class")) {
      entry.target.classList.remove("your-active-class");
    }
  });
};

let observer = new IntersectionObserver(observerCB, {
  root: document,
  rootMargin: "0px",
  threshold: 0.6
});

sections.forEach((section) => {
  observer.observe(section);

  const menuLink = document.createElement("li");
  menuLink.textContent = section.dataset.nav;
  menuLink.dataset.nav = section.id;
  menuLink.classList.add("menu__link");

  navbarList.appendChild(menuLink);
});

navbarList.addEventListener("click", (event) => {
  document.querySelector(`#${event.target.dataset.nav}`).scrollIntoView({
    behavior: "smooth",
    block: "end"
  });
});

let timeoutID;

document.addEventListener("scroll", (event) => {
  if (window.scrollY === 0) {
    if (timeoutID > 0) clearTimeout(timeoutID);
    navbarList.style.height = "100%";
    fab.style.display = "none";
  } else {
    fab.style.display = "block";
    navbarList.style.height = "100%";
    if (timeoutID > 0) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      if (!navbarList.matches(":hover")) navbarList.style.height = "0";
    }, 1000);
  }
});

fab.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
