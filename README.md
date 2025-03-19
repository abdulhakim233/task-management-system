API Documentation
For API documentation, please refer to the Postman API Documentation.

Front-End Setup
1.Clone the repository:
git clone https://github.com/abdulhakim233/task-management-system.git

2.Navigate to the client folder:
cd task-management-system/client

3.Install dependencies:
npm install

4.Create a .env file in the client folder and add the following:
VITE_API_BASE_URL=http://localhost:8000/api

5.Run the development server:
npm run dev

Back-End Setup

1.Install PHP dependencies:
composer install
2.Create a .env file in the Server folder and add the following configuration:
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:gDMQTwCY5lJjVxJOvxvVnvFl0VRBN7pYNueNYg1AuYg=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120

CACHE_STORE=database

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

MAIL_MAILER=log

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

VITE_APP_NAME="${APP_NAME}"

3.Verify allowed_origins in Server/config/cors.php is set to the correct localhost address:

'allowed_origins' => ['http://localhost:8080']
4.Run the back-end development server:
php artisan serve
