# worklogger
A simple nodejs application that logs work done by a user on a particular day.

## test
```npm test```

## run
1. ```npm install```
2. ```npm start```

## load testing
1. ```cd artillery```
2. ```artillery run artillery-dev.yml -o artillery-rep-worklog.json```
3. ```artillery report artillery-rep-worklog.json```
4. A report will be generated with in file ```artillery-rep-worklog.json.html```
