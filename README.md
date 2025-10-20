

https://themes.angular-material.dev/colors

https://material.angular.dev/guides

Lazy Loading Example - 
/src/Screenshot/lazy loading.png


Without Lazy Loading Example - 
/src/Screenshot/without Lazy loading.png


to run all apps at once use this command in package.json file
"serve-all": "concurrently \"json-server --watch src/app/database/db.json\" \"ng serve\""
then run npm run serve-all

"build-all": "concurrently \"npm run build:host-app\" \"npm run build:carts-app\" \"npm run build:products-app\""