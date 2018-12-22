FROM nginx
MAINTAINER Stanislav Nesterovich
COPY core-client.conf /etc/nginx/conf.d/core-client.conf
COPY status.core-client.conf /etc/nginx/conf.d/status.core-client.conf
COPY poc.core-client.conf /etc/nginx/conf.d/poc.core-client.conf
COPY viewer.core-client.conf /etc/nginx/conf.d/viewer.core-client.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
