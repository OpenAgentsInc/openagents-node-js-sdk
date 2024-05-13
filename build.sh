#!/bin/bash
npm i
npm run build

cd build
cp ../package.json .

TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [[ -n "$TAG" ]]; then
    TAG=${TAG#v}
    sed -i "s/\"version\": \".*\"/\"version\": \"$TAG\"/g" package.json
fi

mkdir -p ../dist
        
npm pack --pack-destination ../dist/
