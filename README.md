# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->

#### Use Singleton Pattern for the DB instance
Currently, a new database connection is created for each request, which is inefficient
Instead, the database connection should be managed as a singleton to improve performance and reduce resource usage

#### Move the filtering to the backend instead of the frontend
Right now, filtering is being handled on the frontend, which can lead to performance issues with huge datasets

#### Database Structure 
There are three separate collections/tables, but it's unclear how they are related
If they reference each other (e.g., a hotel belongs to a city, which belongs to a country), a relation can be build using Foreign Keys

#### Improving the folder structure
By improving the folder structure we can achieve a higher separation of concern - each folder has its own assignment - clean and maintanable code
Which can lead to better reusability of the components and easier scalability for the future

#### Pagination 
Introducing pagination in the client can help with the clutter in the dropdown
Paginating the results will also improve the performance in the client when there are huge datasets

#### Centralized Middleware for error handling
Currently, errors are being caught manually in each route. 
Instead, a centralized error-handling middleware was added to improve the overall handling of errors

#### Debounce API calls in the frontend
Frequent API calls (on each search input) can overload the server. 
I added a debouncing to the API is called once the user stop typing for 300ms

#### Adding react router for displaying info
In order to display properly the info page, I added react router

#### REST API for Hotel CRUD Operations - Input Sanitization
All CRUD operations should be properly structured with input sanitization to prevent security risks (NoSQL injection)
This gives the users access to a better structured API where they can add,edit or delete a hotel

#### Authentication and Authorization
Currently, the API is open to everyone. Authentication  and Authorization should be implemented
Using JWT can help with that and each route can be protetected if needed with middleware

#### Tests
I've added some tests to the frontend to verify that the logic works as expected

#### Caching 
To reduce load on the database, frequently accessed data should be cached using Redis or other tool

_When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the section_

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
