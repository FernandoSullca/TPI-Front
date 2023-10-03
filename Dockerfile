FROM node:16.16-alpine3.16 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
# Fin build app
# Inicio deploy nginx
FROM nginx:1.25.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

## test-deploy nombre carpeta app (repo)
COPY --from=build-step /app/dist/tpi-front /usr/share/nginx/html
#RUN docker build -t angular-deploy .
#RUN docker run -d -it -p 80:80 angular-deploy
