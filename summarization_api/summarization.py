import json
import urllib.request
import os
from newspaper import Article
from googletrans import Translator


def summarize_translate(data, limit=1):
    docs_data = data['response']['docs']
    moreLikeThisDocs = data['moreLikeThis']
    highlightedDocs = data['highlighting']

    articles = []
    ix = 0
    article_text = ""
    # default language article needs to be english
    article_lang = "en"

    for doc in docs_data:
        url_found = ""
        try:
            url_found = doc['tweet_urls'][0]
            if url_found:
                article = Article(url=url_found)
                article.download()
                article.parse()
                article.nlp()
                article_text = article.summary
                article_lang = article.meta_lang
                articles.append(article)
                ix = ix+1
        except Exception as ex: continue

        if ix >= limit: break

    results = []
    for article in articles:

        translation = None
        if article_lang != "en":
            translator = Translator()
            translation = translator.translate(article_text)

        results.append({'summarization':article_text, 'translation':translation.text})

    return results

query_text = "Protestas en mexico"
query_text = urllib.parse.quote(query_text)
query_url = "http://localhost:8983/solr/tweets/select?hl.fl=text_en%20text_fr%20text_es&hl=on&hl.method=unified&indent=on&q="+query_text+"&mlt=true&mlt.fl=text_en%20text_fr%20text_es&mlt.mindf=1&mlt.mintf=1&mlt.count=10&wt=json"
data = urllib.request.urlopen(query_url).read().decode('utf-8')

summary = summarize_translate(json.loads(data),2)

print(summary)
