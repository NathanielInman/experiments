#!/bin/bash

# Main variables
IP='159.203.80.149'
VERSION=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
HASH=$(git rev-parse head)
TODAY=$(date)
USER=$(whoami)
KEY="/home/$USER/.ssh/id_rsa"

# Now package and move to server
echo "Cleaning distribution folder..."
rm -rf dist
echo "Compiling production build..."
npm run build:production
echo "Creating log..."
{
  echo "site: homecalculator@www.homecalculator.nathanielinman.com";
  echo "date: $TODAY";
  echo "user: $USER";
  echo "hash: $HASH";
  echo "application: homecalculator";
  echo "version: $VERSION";
} > ./dist/deploy.txt
echo "Packaging files..."
cd ./dist
tar -czvf ../homecalculator.tar.gz .
cd ../
echo "Moving files to server..."
rsync -avhtz -e "ssh -i $KEY" homecalculator.tar.gz nate@$IP:./
echo "Extracting files..."
ssh -i "$KEY" nate@$IP << EOF
  sudo rm -rf /var/www/homecalculator
  sudo mkdir /var/www/homecalculator
  sudo tar -C /var/www/homecalculator -zxvf homecalculator.tar.gz
EOF
echo "Cleaning up deployment files..."
rm ./homecalculator.tar.gz
echo "Verifying successful deploy..."
sleep 5
curl https://homecalculator.nathanielinman.com/deploy.txt
