# TRACK SCRIPT #

This is the track script.

The main goal of this script is after you create a contact in your application the script will starting to track all pages that this contact viewed.

This script has a method to create a contact and after you place it on the HEAD of your application you will have a global var called trackAPI.

The method to create a contact is createContact.

You just have to declare it on the HEAD of your application and you must to have a backend as this one: https://github.com/thiagodsti/beertap to receive the track informations.

You can set the configuration of your API creating a trackrc.json file on the frontend application where you are using the track script. There's a example on this configuration below:

```
{
  "api": "https://track.project.com",
  "storage": "project-tracks",
  "storageEmail": "project-email"
}
```

The admin of this application where you can check the users and their tracks you can see here: https://github.com/thiagodsti/admin-beertap-track


### Live

You can test everything looking those projects: https://rd-beertap-ui.herokuapp.com/ and https://rd-beertap-admin-ui.herokuapp.com/ 

### How do I get set up? ###

#### Development

- Build
`yarn build`

- Run
`yarn start`

- Tests
`yarn test`

#### Docker

- build
`docker build -t beertap-ui .`

- run
`docker run -d -p 80:80 beertap-ui`

--------

### Contacts ###

Thiago Diniz da Silveira

+55 48 988416541

thiagods.ti@gmail.com
