# Solution Notes
Live demo: https://mtgcodechallenge.netlify.com/

## Environment:
* Used: `create-react-app`
* Added: `Eslint` with Google guidelines
* Added: `gulp` for task automation
* Added: `gulp-imagemin` plugin for minifying images
* Added: `api.http` for testing provided REST API with the help of VS Code `REST Client` extension
* Used: `Koala` tool for compiling SCSS into CSS
* Used: `axios` for data fetching and cancelling subsequent requests (in case of searching)
* Used: `react-router-dom` for routing
* Used: `context API` for to share "global" data, in this case - `collection of cards` and methods related to it

## Development Considerations:
* Added: logo for the app (minified -5.8% in size) and new favicon.ico
   * ![logo](/src/images/minified/MTGlogo.png)
   * ![favicon](public/favicon.ico)
* Created: basic mockup for the page in Photoshop to meet the following requirements:
   * Display the results in a "card" format, where the cards flow from left to right across the width of the screen and then down to the next row creating as many rows as necessary.
   * Each card should display: image, name, artist, set name, and original type. You may also display additional fields.
   * Include a page header. You may also include additional layout elements at your discretion.
   * ![basic layout](basic_layout.jpg)
* Created: additional mockup to incorporate the following:
   * Search (at a minimum, by the card's name)
   * Sort (card name, set, artist, etc.)
   * ![layout with controls](layout_with_controls.jpg)
* Separated design into the following components within `<App/>`:
   * `Header` with the logo
   * `Main` that contains page title, `Cards`, `Card`, `Loader`
* Created: file structure with components
* Created: `mixins.scss` and `variables.scss` files to accelerate styling of components
* Utilized: flex-box and fluid typography to ensure responsive design
* Considered & Utilized: WCAG recommendations for UI
* Considered & Utilized: atomic BEM principles for class naming
   * `l-` prefix for layout
   * `a-` prefix for appearance
   * `t /s` - prefix for typography
   * `has/is-` - prefix for modifiers
 * Considered & Utilized: Context API
 * Developed in Google Chrome, tested in Mozilla, Safari, Opera, Edge (observer issues).

## Screenshots
> On Load
  ![screenshot on load](screenshot-default-onload.png)
> After subsequent scroll
  ![screenshot after subsequent scroll](screenshot-default-after-scroll.png)
> After search and sort
  ![screenshot after search and sort](screenshot-search&sort.png)
> Mobile screen view
  ![screenshot on load with search mobile](screenshot-mobile.png)
> Card Details
  ![screenshot of card details page](screenshot-card-details.png)
> Card Collection
  ![screenshot of card collection](screenshot-collection.png)

## Places for Improvement:
* Accessibility with `aria`-attributes
* Better organization of SCSS code
* SEO
* Fancy `Loader`
* Move `Controls` / `Button` to a separate component
* Implement "globally" `componentWillUnmount` to prevent memory leaks
* Implement addition and removal of cards to/from collection from a card itself
* Use cache / localStorage or something like that to store added cards
* Spread collection into categories
* Load more similar cards then just 20
* Preserve fetched data when navigating -> move cards data into `context`, improve `search` and `filter` functions.
* Automated testing
* Fixes for Edge

## Issues
* Query results have duplicated names, however `id`s are different so I've kept the results. As a future consideration, maybe add filtering on results by some criteria. For example, API has `contains` that "filters cards based on whether or not they have a specific field available (like imageUrl)"
* Per requirement, sorting by name needs to be done via API call, however, I've encountered a problem using provided API when paginated -> database sends duplicates (if there is no `orderBy` -> there is no problem). Via documentation it is not clear to me how to conduct sorting both on `name` and `id` to ensure that there are no duplicates, so I've decided to handle that (duplicates) on the client side.
* Edge bug