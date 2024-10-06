const input = document.getElementById("input");
const list = document.getElementsByClassName("grid")[0];

const searchIcon = document.querySelector("#search");
const grid = document.querySelector(".grid");

// adding day night theme
dayNightTheme = () => {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 7 && hour < 19) {
    document.body.style.backgroundColor = "whitesmoke";

    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";

    document.body.style.color = "white";
  }
};

window.addEventListener("load", dayNightTheme);
function removeImages() {
  grid.textContent = " ";
}

//! Main working mechanism

input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    console.log("Enter");
    apiRequest();
  }
});

searchIcon.addEventListener("click", () => {
  apiRequest();
});

apiRequest = () => {
  removeImages();
  const url =
    "https://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=12&client_id=[your_api_key]";

  fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      else alert(response.status);
    })
    .then((data) => {
      const imageNodes = [];

      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage =
          "url(" + data.results[i].urls.raw + ")";
        imageNodes[i].addEventListener("dblclick", () => {
          window.open(data.results[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
};
