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
  echo "site: territorycalculator@www.territorycalculator.nathanielinman.com";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: territorycalculator";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../territorycalculator.tar.gz .
cd ../
echo "Moving files to server..."
rsync -avhtz -e "ssh -i $KEY" territorycalculator.tar.gz nate@$IP:./
echo "Extracting files..."
ssh -i "$KEY" nate@$IP << EOF
  sudo rm -rf /var/www/territorycalculator
  sudo mkdir /var/www/territorycalculator
  sudo tar -C /var/www/territorycalculator -zxvf territorycalculator.tar.gz
EOF
echo "Cleaning up deployment files..."
rm ./territorycalculator.tar.gz
echo "Verifying successful deploy..."
sleep 5
curl https://territorycalculator.nathanielinman.com/deploy.txt
