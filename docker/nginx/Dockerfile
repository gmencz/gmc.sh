FROM nginx:stable-alpine

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN rm /etc/nginx/nginx.conf

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf