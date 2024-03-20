# Pokemon Search App Flowchart

## Start

User enters search term in `#search-input` input
Clicks `#search-button` button

## Fetch Pokemon Data

-Make API call to `API_LINK` to retrieve Pokemon data

## Check for Errors

- Is status code of response 404 (Not Found)?
  - Yes: Display alert "Pokemon not found"
  - No: Continue

## Parse Pokemon Data

- Extract relevant data from response: name, id, weight, height, hp, attack, defense, special-attack, special-defense, speed, types, front_default_image

## Display Pokemon Info

- Set content of `#pokemon-name` to Pokemon name
- Set content of `#pokemon-id` to Pokemon ID
- Set content of `#weight `to Pokemon weight
- Set content of `#height` to Pokemon height
- Set content of `#hp` to Pokemon HP
- Set content of `#attack` to Pokemon Attack
- Set content of `#defense` to Pokemon Defense
- Set content of `#special-attack` to Pokemon Special Attack
- Set content of `#special-defense` to Pokemon Special Defense
- Set content of `#speed` to Pokemon Speed

## Display Pokemon Image

- Create an `<img>` element with id `#sprite`
- Set the src attribute of the image to `front_default_image` URL

## Display Pokemon Types

- Clear content of #types element
- Loop through Pokemon types array
  - For each type:
    - Create a new inner element within #types
    - Set the content of the inner element to the type name

## End
