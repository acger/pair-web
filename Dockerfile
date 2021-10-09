FROM nginx:alpine
 
COPY  /nginx/default.conf /etc/nginx/conf.d/
COPY  /dist/ /usr/share/nginx/html/

CMD ["nginx"]

EXPOSE 80