 #!/bin/bash

echo "START Mongo Output"

# service mongod start
startTime=$(date +'%T')
SECONDS=0
echo "Starting at: $startTime"



mongo photo_caro --eval "printjson(db.images.find({'restaurant_id': 50}))"


endTime=$(date +'%T')
echo "Finished at: $endTime"
totalTime=$SECONDS
echo -e "\nSuccess. Total time: $(($totalTime)) seconds\n"
echo "FINISHED"

