# Coding Exercise
## Overview
Using the programming language(s) of your choice, consume the public JSON API and render a responsive grid of cards, displaying each `"creature"` card. The application should display the first 20 cards and automatically retrieve additional cards as the user scrolls down the page. Expect your solution to be viewed on modern desktop and mobile browsers.

## API
Use the following API (not affiliated with Wizards of the Coast) to retrieve a filtered list of `Magic: The Gathering` cards. For this exercise, we want you to display cards of the creature type.

* API Location: https://api.magicthegathering.io/v1/cards
* API Documentation:
https://docs.magicthegathering.io/
https://docs.magicthegathering.io/#api_v1cards_list

## Design Details
> Here are the basic design parameters for this exercise:
* Display the results in a "card" format, where the cards flow from left to right across the width of the screen and then down to the next row creating as many rows as necessary.
* Each card should display: image, name, artist, set name, and original type. You may also display additional fields.
* The card's image should be displayed prominently. How and when the other data is displayed is up to you.
* Use a responsive design. The cards should reflow as-needed based on the size of the browser window. You may limit the maximum display area but may not use a fixed width.
* As the user scrolls down the page, additional cards should be loaded and appended. (This method of displaying results is often referred to as "infinite scroll.")
* Include a page header. You may also include additional layout elements at your discretion.
* Display a loading indicator when communicating with the API.

> Once your basic design is working, add these additional features (you get to decide all the details):
* Search (at a minimum, by the card's name)
* Sort (card name, set, artist, etc.)

## Implementation Requirements
> Please be sure to handle the following requirements in your implementation:
* For this exercise, **only** display cards that are of type `"creature"`.
* Initially, display the first 20 results returned by the API.
* Use the API to sort the results alphabetically by the card's name.
* Retrieve additional pages of results as-needed to fill the window, but do not load more than 50 with each request.
* Do not preload all results.
* As noted previously, we're not going to limit you on what web technologies you want to use.
* Be creative! You don't have to stop with these requirements.

## Above & Beyond
Is this all too easy, or not sufficient to show off your dev skills? No problem! Complete the requirements and then keep going. We’d love to see you take this a step further to showcase your creativity and talents. Here are some suggestions, but feel free to come up with some of your own!
* Filter cards (feel free to exceed the type restriction as long as it defaults to `"creature"`)
* Display number of cards loaded
* Group by set (and/or other fields)
* Show related cards (e.g., cards of the same type, cards in the same set)
* Add cards to a list or collection (e.g., build a deck)


