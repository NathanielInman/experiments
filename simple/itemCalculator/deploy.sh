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
npm run build:production
echo "Creating log..."
{
  echo "site: itemcalculator@www.itemcalculator.nathanielinman.com";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: itemcalculator";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../itemcalculator.tar.gz .
cd ../
echo "Moving files to server..."
rsync -avhtz -e "ssh -i $KEY" itemcalculator.tar.gz nate@$IP:./
echo "Extracting files..."
ssh -i "$KEY" nate@$IP << EOF
  sudo rm -rf /var/www/itemcalculator
  sudo mkdir /var/www/itemcalculator
  sudo tar -C /var/www/itemcalculator -zxvf itemcalculator.tar.gz
EOF
echo "Cleaning up deployment files..."
rm ./itemcalculator.tar.gz
echo "Verifying successful deploy..."
sleep 5
curl https://itemcalculator.nathanielinman.com/deploy.txt
