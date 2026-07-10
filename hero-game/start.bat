@echo off
cd /d "%~dp0"
echo Starting Raise One Hero...
echo Close this window to stop the server.
npx http-server -p 8123 -o -c-1
