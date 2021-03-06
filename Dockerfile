# base image
FROM node:alpine
ENV HOST 0.0.0.0
ENV BACKEND_URL https://andreas-tollanes.com/graphql
ENV USE_SSL = true

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn --silent

# copy everything to build the app
COPY . /app
RUN yarn build

# make sure there is an .env file
COPY .env.example /app/.env

# start app
CMD ["yarn", "start"]
