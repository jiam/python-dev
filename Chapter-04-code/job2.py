import requests
from bs4 import BeautifulSoup
import queue
from threading import Thread

start_page = "http://www.163.com"
domain = "163.com"
url_queue = queue.Queue()
seen = set()

seen.add(start_page)
url_queue.put(start_page)


def sotre(url):
    pass

def extract_urls(url):
    urls = []
    html = requests.get(url)
    soup = BeautifulSoup(html.content, "html.parser")
    for e in soup.findAll('a'):
        url = e.attrs.get('href', '#')
        urls.append(url)
    return urls


def spider():
    while True:
        try:
            current_url = url_queue.get()
            print(current_url)
            sotre(current_url)
            for next_url in extract_urls(current_url):
                if next_url not in seen and domain in next_url:
                    seen.add(next_url)
                    url_queue.put(next_url)
        except queue.Empty:
            break


for i in range(10):
    t = Thread(target=spider)
    t.start()