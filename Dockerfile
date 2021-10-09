FROM nginx

ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /data/web
ENV LOG_DIR /data/log/nginx

RUN mkdir /data/log/nginx -p \
    && chown nginx.nginx -R /data/log/nginx

COPY  /dist/ /data/web/
COPY  /nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

ENTRYPOINT nginx -g "daemon off;"