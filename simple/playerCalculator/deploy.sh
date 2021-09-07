#!/bin/bash

# Main variables
IP='159.203.80.149'
VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
HASH=$(git rev-parse head)
TODAY=$(date)
USER=$(whoami)
KEY="/Users/$USER/.ssh/id_rsa"

# Now package and move to server
echo "Cleaning distribution folder..."
rm -rf dist
echo "Compiling production build..."
npm run production
echo "Creating log..."
{
  echo "site: playercalculator@www.playercalculator.nathanielinman.com";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: playercalculator";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../playercalculator.tar.gz .
cd ../
echo "Moving files to server..."
rsync -avhtz -e "ssh -i $KEY" playercalculator.tar.gz nate@$IP:./
echo "Extracting files..."
ssh -i "$KEY" nate@$IP << EOF
  sudo rm -rf /var/www/playercalculator
  sudo mkdir /var/www/playercalculator
  sudo tar -C /var/www/playercalculator -zxvf playercalculator.tar.gz
EOF
echo "Cleaning up deployment files..."
rm ./playercalculator.tar.gz
echo "Verifying successful deploy..."
sleep 5
curl https://playercalculator.nathanielinman.com/deploy.txt
