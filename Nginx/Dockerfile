FROM nginx
MAINTAINER Stanislav Nesterovich
COPY infra-health-status.conf /etc/nginx/conf.d/infra-health-status.conf
COPY proc.infra-health-status.conf /etc/nginx/conf.d/proc.infra-health-status.conf
COPY index.html /var/www/infra-health-status.corp/index.html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
