# Delete all from a core
curl "http://localhost:8983/solr/tweets_p2/update?stream.body=<delete><query>*:*</query></delete>&commit=true"

# Reload a core
curl "http://localhost:8983/solr/admin/cores?action=RELOAD&core=tweets_p2"
