FROM debian:bookworm-slim

# Install Node.js and http-server
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g http-server && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory and copy app
WORKDIR /app
COPY public/ /app

# Expose port and run the server
EXPOSE 8080
CMD ["http-server", "-p", "8080"]