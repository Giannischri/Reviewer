# Stage 1: Build Angular App
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

## Copy rest of the source code
#COPY src/app/components/navbar /src/app/components/navbar
#COPY src/app/components/loginform /src/app/components/loginform
#COPY src/app/components/signupform /src/app/components/signup
#COPY src/app/shared/services/authv2.service.ts  /src/app/shared/services/authv2.service.ts
##COPY src/app/shared/services/authv2.service.spec.ts  /src/app/shared/services/authv2.service.spec.ts
#COPY src/app/shared/services/auth.service.spec.ts  /src/app/shared/services/authv2.service.spec.ts
#
#COPY src/app/shared/services/auth.service.ts  /src/app/shared/services/auth.service.ts

COPY . .

# Build the Angular app in production mode
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy custom nginx config (optional but recommended for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular files from builder stage
COPY --from=builder /app/dist/ng-project2 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
