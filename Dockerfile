FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
# Template: the entrypoint renders it to /etc/nginx/conf.d/default.conf,
# filling ${OPENROUTER_API_KEY} from the container environment.
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
