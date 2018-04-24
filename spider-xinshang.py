#!/usr/bin/python
#coding=utf-8
from __future__ import unicode_literals
import urllib2,re,urlparse,json,codecs
from bs4 import BeautifulSoup


vues = [{'el':"#Shizhan",'data':{'courses':[]}},{'el':"#Xinshang",'data':{'courses':[]}},{'el':"#Xinshou",'data':{'courses':[]}},
       {'el':"#Jineng",'data':{'courses':[]}},{'el':"#Qianyan",'data':{'courses':[]}}]
fout = codecs.open("js/spider-imooc.js","w+","utf-8")
root_url = "https://www.imooc.com"

html = urllib2.urlopen(root_url)
soup = BeautifulSoup(html,'html.parser')
bg_div = soup.select("#main .bgfff")[1]
lists = bg_div.select(".course-card-container a")

for vue in vues:
    #img content info users price new hot
    for card in lists:
        try:
            c = {'label':[],'info':[]}
            labels = card.find_all('label')
            if len(labels) !=0 :
                for label in labels:
                    c['label'].append(label.get_text())
            c["href"] = urlparse.urljoin(root_url,card["href"])
            try:
                c["img"] = urlparse.urljoin(root_url,card.find("img")["src"])
            except:
                img_up_url = card.select(".img-up")[0]["style"][24:-2]
                #print "url: %s\n" % img_up_url
                c["img"] = urlparse.urljoin("https://",img_up_url)
            try:
                c["users"] = card.select(".course-card-info .icon-set_sns")[0].parent.get_text()
                c["content"] = card.select(".course-card-name")[0].get_text()
                c["price"] = card.select(".course-card-price")[0].get_text()
            except BaseException,e:
                print e,34 
            for span in card.select(".course-card-info span"):
                if(len(span.select("i"))!=0):
                    break
                c['info'].append(span.get_text())
            if card.find("div",{'class':'course-stat new'}) !=None:
                c['new']=1
            if card.find("div",{'class':'course-stat hot'}) !=None:
                c['hot']=1
            vue["data"]["courses"].append(c)
            #print 49
        except BaseException,e:
            print e,46  
    fout.write("var course%s = new Vue(" % vue['el'][1:-1] +json.dumps(vue,ensure_ascii=False)+")\n" )
    try:
        bg_div = bg_div.find_next_sibling()
        #print bg_div['class']
        lists = bg_div.select(".course-card-container a")
    except BaseException,e:
        print e,52
    #print 'count'
fout.close()