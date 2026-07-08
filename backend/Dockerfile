# Use a stable, lightweight Python 3.10 image
FROM python:3.10-slim

# Prevent Python from writing .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies efficiently
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY . /app/

# Expose port 8000 for the Gunicorn server
EXPOSE 8000

# Set the default runtime command to automatically run migrations and start Gunicorn
CMD ["sh", "-c", "python manage.py migrate && gunicorn vsms.wsgi:application --bind 0.0.0.0:8000"]
