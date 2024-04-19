# Livewell Coding Challenge

This is my submission for the Livewell Coding Challenge as part of the interview process. To run this application in development, clone this repo, open the folder in a terminal and run `npm run dev`. The server should then serve the application at localhost:3000.

## Notes

I used static generation rather than server-side rendering as most of the application relied on the use of stateful data. Since I was already using static generation, this led me to use react contexts in order for data to persist locally. I chose data persiting locally rather than on a database as I ran out of time.

For data modelling, see the `src/app/types.ts` file and the comments attached to certain types which will explain how the data is modelled and why.
