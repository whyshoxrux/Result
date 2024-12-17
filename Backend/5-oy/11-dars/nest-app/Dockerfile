FROM node:18 AS development

WORKDIR /src/app

COPY package*.json ./

RUN npm install
# RUN npm install pg --save

COPY . .

RUN npm run build


# EXPOSE 4000

CMD ["npm", "run", "start:dev"]
