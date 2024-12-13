# NestJS Service Boilerplate with Database Connection and Custom Logger

This boilerplate provides a foundational setup for a NestJS application with:
- A simple connection to a database (e.g., MySQL).
- A custom logger for structured and configurable logging.

## Features
- **Database Integration**: Easily connect to a MySQL database using Sequelize ORM.
- **Custom Logger**: Enhanced logging functionality integrated with NestJS's built-in logger.
- **Modular Design**: Adheres to the modular design pattern for scalability.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running MySQL instance

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   Or, if using yarn:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and provide the necessary database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=example
   DB_DATABASE=mydb
   LOG_LEVEL=debug
   ```

## Usage

### Running the Application
To start the application in development mode:
```bash
npm run start:dev
```
Or, using yarn:
```bash
yarn start:dev
```

### Database Connection
The boilerplate uses Sequelize for database interactions. Upon startup, the app will attempt to connect to the database using the credentials provided in the `.env` file. It will also synchronize models with the database schema.

### Custom Logger
The custom logger extends NestJS's built-in logger, allowing for structured logs and configurable log levels.

To log messages in your services or controllers, use the logger as follows:
```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class ExampleService {
    private readonly logger = new Logger(ExampleService.name);

    someMethod() {
        this.logger.log('This is an info log');
        this.logger.error('This is an error log');
        this.logger.debug('This is a debug log');
    }
}
```

## Project Structure
```plaintext
src
├── app.module.ts         # Main application module
├── config                # Configuration files and environment management
├── database              # Database module and providers
├── logger                # Custom logger implementation
├── services              # Application-specific services
└── main.ts               # Application entry point
```

## Configuration

### Database
The database configuration is managed via the `ConfigService` and `@nestjs/config`.
- Modify the `databaseProvider` to add additional settings if required.

### Logger
The logger can be configured by changing the `LOG_LEVEL` in the `.env` file.
Available log levels: `debug`, `verbose`, `log`, `warn`, `error`.

## Scripts
- `start`: Run the application in production mode.
- `start:dev`: Run the application in development mode with live reload.
- `build`: Build the application for production.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the [MIT License](LICENSE).


