# Content

The files in schemas contain the schemas for what is in the title and contain some basic methods. So far, in app.js is a test suite to verify that things work.

## Done

Create a list for:

- users,
- bestsellers,
- orders,
- ingredients,
- time slots

In the end I added hash to make much quicker adding a sandwich to the list just comparing a string
Added a pseudo univocous hash for ingredients; it takes the first 3 letters of the name and the last 3 of the \_Id.
It is extremely unlikely to have a conflict, especially if ingredients begin with different names.

## Things to do

Create the following methods:

- getByState() to get a list of orders based on their state
- getByStateAndTime() to get the list of open orders sorted by slot time, used by the cooks to get the orders to be done in the right order;
- create a way to add statistics automatically whenever a new sandwich is created;
