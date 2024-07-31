# build stage
FROM  node:20.12.1 as build-stage
ENV NODE_VERSION 20.12.1

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
RUN npm run build

# production stage
FROM nginx:stable

ENV ESC='$'

# Install Node and NPM to run Nuxt next to Nginx
RUN apt install curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt policy nodejs
RUN apt install nodejs -y
RUN node -v
RUN npm -v

# Install Process Manager to keep Nuxt running in background
RUN npm install pm2 -g
RUN echo PM2 version:
RUN pm2 --version

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.tmpl /etc/nginx/conf.d/nginx.tmpl
COPY --from=build-stage /app/.output /webroot/.output
COPY ecosystem.config.js /webroot/ecosystem.config.js

ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog nano\
        && apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd

COPY docker/sshd_config /etc/ssh/
COPY docker/init.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/init.sh
EXPOSE 80 2222
ENTRYPOINT ["init.sh"]