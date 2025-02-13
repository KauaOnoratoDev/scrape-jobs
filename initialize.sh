#!/bin/bash

mkdir uploads &
node main/server.js &
until lsof -i :3001 > /dev/null; do sleep 1; done

ngrok http 3001 > /dev/null &
sleep 5

node main/whatsapp.js

PID_SERVER=$(lsof -t -i :3001)
if [ -n "$PID_SERVER" ]; then
  kill -9 $PID_SERVER
fi

PID_NGROK=$(ps aux | grep '[n]grok' | awk '{print $2}')
if [ -n "$PID_NGROK" ]; then
  kill -9 $PID_NGROK
fi
