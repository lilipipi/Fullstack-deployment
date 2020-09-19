#!/bin/bash
set +ex

# build docker image for server
cd demo && sudo docker build -t demoapp .
cd ..

# build docker image for frontend
cd demo-react-frontend && sudo docker build -t demoapp-frontend .