FROM nginx:1.11.10

COPY ./public /app
COPY ./nginx.conf /nginx/nginx.conf

ENTRYPOINT nginx -c "/nginx/nginx.conf" -g "daemon off;"
