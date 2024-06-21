FROM python:3.10

# Set thw working directory in the container
WORKDIR /app

# Copy requirements file into container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the project file into container
COPY . .

# Expose port that the container will be running in
EXPOSE 8000

# Run the application
CMD ["uvicorn", "app:app"]