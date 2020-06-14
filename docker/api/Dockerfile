FROM node:lts-alpine

# The context will be the "api" folder so keep this in mind
# when running COPY instructions and so on.
WORKDIR /usr/src/gmc.sh-api

COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 8081
CMD [ "npm", "run", "start:prod" ]