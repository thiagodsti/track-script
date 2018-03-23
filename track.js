/*eslint-disable */
window.trackAPI = (function loadTrack() {
  return new Promise((resolve, reject) => {

    fetch('trackrc.json')
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          return data;
        } catch (err) {
          return {
            'api': 'https://rd-beertap.herokuapp.com',
            'storage': 'beertap-tracks',
            'storageEmail': 'beertap-email'
          }
        }
      }).then((data) => resolve(new Track(data)) );
  });
})();

function Track(config) {

  const { api, storage, storageEmail } = config;

  this.trackUrl = () => {
    return new Promise((resolve, reject) => {
      tracks = localStorage.getItem(storage);
      if (!tracks) {
        var tracks = [];
      } else {
        var tracks = JSON.parse(tracks);
      }

      tracks.push({
        'uri': window.location.href,
        'date': new Date().getTime()
      });
      localStorage.setItem(storage, JSON.stringify(tracks));
      resolve(tracks);
    });
  };

  this.send = function (tracks) {
    const email = localStorage.getItem(storageEmail);
    if (!email) {
      return;
    }

    const request = {
      'email': email,
      'tracks': tracks
    }

    fetch(`${config.api}/tracks/batch`, {
      method: "POST", 
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(request)
    }).then(res => {
      return new Promise((resolve, reject) => {
        if (res.ok) {
          localStorage.removeItem(storage);
          resolve(res);
        } else {
          reject(res);
        }
      })
    });
  };

  this.createContact = function (contact) {
    return fetch(`${config.api}/users`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(contact)
    }).then(res => {
      return new Promise((resolve, reject) => {
        if (res.ok) {
          localStorage.setItem(storageEmail, contact.email);
          const tracks = localStorage.getItem(storage);
          this.send(JSON.parse(tracks));
          resolve(res);
        } else {
          res.json().then((err) => {
            if (err.message.indexOf('constraint') > 0) {
              reject(`${contact.email} is already in use`);
            } else {
              reject(`Unexpected error: ${err.message}`);
            }
          });
        }
      })
    });
  }

};

trackAPI.then((track) => {
  track.trackUrl().then((tracks => {
    track.send(tracks);
  }))
});
