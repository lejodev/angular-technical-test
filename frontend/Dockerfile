FROM node:14.15.5 as build-stage

WORKDIR /usr/src/app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build -- --prod

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]