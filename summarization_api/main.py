from flask import Flask
from flask import request
import os
import json
from newspaper import Article
from googletrans import Translator

app = Flask(__name__)

def summarize_translate(data, limit=1):
    docs_data = data
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
                articles.append({'article_text':article.summary,'article_lang':article.meta_lang, 'ref':url_found})
                ix = ix+1
        except Exception as ex: continue

        if ix >= limit: break

    results = []
    for article in articles:
        article_text = article['article_text']
        article_lang = article['article_lang']
        url_found = article['ref']
        translation = None
        if article_lang != "en":
            #translation = "Some translation"
            translator = Translator()
            translation = translator.translate(article_text).text

        results.append({'summarization':article_text, 'translation':translation,'ref':url_found})

    return json.dumps(results)

@app.route('/summarize', methods=['POST'])
def summarization_translation():
    data = request.get_json()
    summary = summarize_translate(data,2)
    return summary


if __name__ == '__main__':
    app.run(debug=True, port=5000)
