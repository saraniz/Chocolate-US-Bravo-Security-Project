#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root (use sudo)"
  exit 1
fi

# Update package list
apt-get update

# Install Redis
apt-get install -y redis-server

# Enable Redis to start on boot
systemctl enable redis-server

# Start Redis
systemctl start redis-server

# Check Redis status
systemctl status redis-server

echo "Redis has been installed and started. You can now run your Node.js application." 