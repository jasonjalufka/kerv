FROM node:latest

# set working directory
RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY .  /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json

RUN npm install
#RUN npm install react-scripts@1.1.1 -g

EXPOSE 3000

# start app
CMD ["npm", "start"]
