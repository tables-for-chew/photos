 #!/bin/bash

echo "START Mongo Output"

service mongod start
startTime=$(date +'%T')
SECONDS=0
echo "Starting at: $startTime"


mongo photo_caro --eval "printjson(db.dropDatabase())"

mongoimport --db photo_caro --collection restaurants --type csv --fields _id,restaurant_name --file ./../util/restaurantDataFile.csv

mongoimport --db photo_caro --collection images --type csv --fields _id,restaurant_id,image_url,caption,date_posted,username,hover_data --file ./../util/imageDataFile.csv

endTime=$(date +'%T')
echo "Finished at: $endTime"
totalTime=$SECONDS
echo -e "\nSuccess. Total time: $(($totalTime)) seconds\n"
echo "FINISHED"

