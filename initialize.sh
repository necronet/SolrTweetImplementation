#!/bin/sh

solr_path=$1
SOLR_SERVER="http://localhost:8983"
DEFAULT_CORE="tweet"

if [ -d $solr_path ]   # for file "if [-f /home/rama/file]"
then
    echo "Checking if Solr ${solr_path} is running on port 8983"
    RESULT=$(curl -s -o /dev/null -I -w '%{http_code}' $SOLR_SERVER/solr/admin/cores?action=STATUS)
    if [ "$RESULT" -eq '200' ]; then
        echo "Solr running"
        
    else
        echo "Solr is not running"
    fi

else
    echo "Invalid solr directory was provided"
fi
