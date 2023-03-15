# Transportation calculator

This is really simple transportation calculator made as 2-3 fun project made with ReactJS, MUI, NodeJS, Prisma and Planetscale.

## Local setup
### Backend

#### Planetscale
You will need Planetscale account. Information about how to connect can found [here](https://planetscale.com/docs/tutorials/connect-any-application).

**NB!** You will need proxy to run Planetscale locally (check previous link). 
#### NodeJS 
Run ```yarn``` command in backend directory to install node modules. After that you need to add Planetscale environment variable to the backend directory. You can get environment variables from Planetscale after creating new table ('transportation') and selecting Prisma as connection type (Planetscale dashboard select 'Overview' and then 'connect', select Prisma).
#### Prisma 
Next setup Prisma - ```yarn prisma generate``` and then ```yarn prisma db push```.

### Frontend

#### ReactJS
In frontend directory run ```yarn```, meanwhile get your Mapbox token from [mapbox.com](mapbox.com). You need [Directions API](https://docs.mapbox.com/help/glossary/directions-api/) and  [Temporary Geocoding API](https://docs.mapbox.com/api/search/geocoding/).

## Run locally
1.Start Planetscale proxy ```pscale connect YOUR_TABLE_NAME```
2.Run ```yarn run dev``` in backend directory
3.Run ```yarn run start``` in frondend directory
