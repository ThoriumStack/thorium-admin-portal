### STAGE 1: Build ###


FROM node:9.11.1-alpine as builder
ARG build_environment=production
RUN echo "$build_environment"
WORKDIR /app
COPY *.json ./
#RUN npm install -g gulp
#RUN npm install gulp
RUN npm install
COPY . .
RUN echo "$build_environment"
COPY "./.env.${build_environment}" ./.env.production
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
