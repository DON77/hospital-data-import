### How to run locally?
1. Create a PostgreSQL database instance, and in the `.env` file change the following fields. `PG_USER=`
                                                                                         `PG_DATABASE=`
                                                                                         `PG_PASSWORD=`
                                                                                         `PG_PORT=`
                                                                                         `PG_HOST=`

2. Run `npm i` from the project directory
3. Run `npm start`

### How to use?

1. Upload files via "form-data" taking the following into account.
* You must choose 2 files, both Patient file and Treatment file to upload together.
* Your filenames are in hospitalname_Patient.csv and hospitalname_Treatment.csv shape.

**DISCLAIMER**: The service is ready for the given 2 types of data structures (files), if you want to add the third hospital, you have to add constants in the service constants. Additional extensions may be needed.   

