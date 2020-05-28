window.addEventListener("load", () => {
  let long;
  let lat;

  let location = document.querySelector(".location-timezone");
  let tempDegree = document.querySelector(".temp-degree");
  let tempDesc = document.querySelector(".temp-desc");
  let tempSection = document.querySelector(".temp");
  let tempSpan = document.querySelector(".temp span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //DOM

          tempDegree.textContent = temperature;
          tempDesc.textContent = summary;
          location.textContent = data.timezone;
          
            //celcius calc
          let celsius = (temperature - 32) * (5 / 9);

          //icon
          setIcons(icon, document.querySelector(".icon"));

          //to Celsius/Fahrenhite
          tempSpan.textContent = "°C";
          tempDegree.textContent = Math.floor(celsius);
            
            tempSection.addEventListener('click', () => {
                if(tempSpan.textContent === '°F') {
                    tempSpan.textContent = "°C";
                    tempDegree.textContent = Math.floor(celsius);
                } else {
                    tempSpan.textContent = "°F";
                    tempDegree.textContent = temperature;
                }
            })

        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

//37.8267,-122.4233
