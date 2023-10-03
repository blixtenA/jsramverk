!/bin/bash

# Clear existing data in your MongoDB Atlas database
# WARNING: This will delete all data in the specified MongoDB database

mongo_uri="mongodb+srv://adriandedorson2:8PJFVm5m6xStZS59@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority" # Replace with your MongoDB Atlas URI
database_name="test" # Replace with your MongoDB database name

# Execute the dropDatabase() command and capture the exit code
mongo $mongo_uri/$database_name --eval "db.dropDatabase()"
exit_code=$?

# Check the exit code
if [ $exit_code -eq 0 ]; then
  echo "Database $database_name dropped successfully."
  
  # Create the 'test' database and 'tickets' collection
  mongo $mongo_uri/$database_name --eval "db.createCollection('tickets')"
  create_collection_exit_code=$?
  
  if [ $create_collection_exit_code -eq 0 ]; then
    echo "Database $database_name and collection 'tickets' created successfully."
  else
    echo "An error occurred while creating collection 'tickets' in $database_name. Exit code: $create_collection_exit_code"
  fi
elif [ $exit_code -eq 5 ]; then
  # Exit code 5 indicates authentication failure
  echo "Authentication error. Check your MongoDB URI or credentials."
else
  # Handle other exit codes as needed
  echo "An error occurred while dropping the database. Exit code: $exit_code"
fi