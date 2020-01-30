## Installation and Running

- yarn install
  
- yarn start 
or 
- yarn develop (to run with typechecking)

Open chrome browser to http://localhost:1234

(you can replace yarn command with npm run)

## Other commandline options

- yarn build - create a hostable ready build
- yarn test - run all __test__ subdirectory for jest and react-testing-library tests (examples only)
- yarn test:watch - run all tests in watch mode, waiting and hot reloading changes
- yarn type-check - run a check of all typescript types in the project
- yarn type-check:watch - runs a typescript type check in watch mode and hot reloades changes


## Known Issues
### Defects
  - the local state recovery will in some navigation sequences have lingering state and will recover last game (i.e. in the middle of game, directly via url go to the main page, click start and it will recover last game, without notifying user, see potential extensions)
  - spring issue with a no-op/action on unmounted component/memory leak (potentially), examine the useEffect hooks (if they can be cleaned up) and there is a known react-spring issues 
  - at smaller media query size, hamburger button with icons (no text) does not work
  - at smaller media query size, true and false buttons overlap and lose integrity
  - at smaller media query size, bottom control box does not stack well
  - at < 900px, right button (next button) is not in correct posistion and can fall outside of conainer
  - sometimes the next button or previous button click does not produce any action (may be related to the spring no-op issue)

## Accessibilty (via Axe plugin)

### Layout
- Links must have discernable test (header icon text items)
- Document must have one main landmark
- Page must contain a level-one heading
- All page content must be contained by landmarks

### Main
- Elements must have sufficient color contrast (start button icon)

### Play
- Buttons must have dicernable text (next and previous buttons)
- Elements must have sufficient contrast (entire bottom half of screen)

### Result
- Elements must have sufficient contrast (Play Again)


## Explanation of Approach
- Project stack uses a strong set of development tools related to the react eco system (React, React Hooks, Typescript, Immer (for currying redux-style store)), Reach Router, 
- Project uses the leading set of development tools for react development (parcel, eslint, yarn, circle ci, prettier (via eslint))
- Project structure is essentially Pages-Components-Actions-Store


## Interesting Features
- using local storage to automatically (and optionally from start screen to restart game in progress, see potential extensions)
- through the use of the reducer(redux) pattern, can shift between game modes (basic or with transitions)
- react springs are used to animate movement from one card to another, to orient user that they are moving and in which direction


## Potential Extensions
- start page can easily query for whether local state exists and allow user to resume game
- last page should tell user whether they have any answers missing
- testing, only sample test are included, but a real app would have a full test suite
- lower res should offer user text options for the two image icon links from hamburger button
- alter design to address accessibility issues
- Improve on Lighthouse scores 100-86-86-70 (performance, accessibilty, best practices, seo)
- The highlighted submit could be a lot smarter
- Should look at caching the question set  