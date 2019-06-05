# TransitApp
Angular web application for a public city transit service where users can see busline information, routes and buy a variety of tickets.
The full specification can be found [here](./specification.pdf).

## Run
Under the Angular project directory (/TransitApp) install all required dependencies:

`npm i`

Once they are installed run the application (available on *localhost:4200*):

`ng serve` 

Run the Web API project from the (/WebApp) solution

## Features

- [x] Home Page
- [x] Login / Register
- [x] Profile panel (edit information / change password / upload document image)
- [x] Admin panel (add or edit buslines / stations / pricelists / ticket inspectors)
- [x] Ticket Inspector panel (verify user document images & validate tickets)
- [x] Busline departure times for every day of the week
- [x] Busline routes (on an OpenLayers map)
- [x] Ticket plans
- [ ] Busline route simulation (SignalR)