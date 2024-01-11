const getUserBtn = document.getElementById('getUserBtn');

function getRandomUser() {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userLocation = document.getElementById('userLocation');
  const userPhone = document.getElementById('userPhone');
  const userImage = document.getElementById('userImage');
  // fetch random user from API
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      const user = data.results[0];
      userName.textContent = `${user.name.first} ${user.name.last}`;
      userEmail.textContent = user.email;
      userLocation.textContent = `${user.location.city}, ${user.location.state}`;
      userPhone.textContent = user.phone;
      userImage.setAttribute('src', user.picture.large);
    })
    .catch((error) => console.log(error));
}

getRandomUser();
getUserBtn.addEventListener('click', getRandomUser);