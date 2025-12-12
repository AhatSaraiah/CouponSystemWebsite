# Coupon System Website

A web application for managing coupons, built with Angular. This system provides functionality for administrators, companies, and customers to manage and purchase coupons.

## Features

- **Admin Management**: Manage companies and customers with full CRUD operations
- **Company Portal**: Companies can manage their coupons, add/update/delete coupons, and filter by category or price
- **Customer Portal**: Customers can browse and purchase coupons, view their purchased coupons, and filter by category or price
- **Authentication**: Login functionality for Admin, Company, and Customer with form validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.x or higher (Node.js 16.x or 18.x LTS recommended for Angular 15)
- **npm**: Version 6.x or higher (comes with Node.js, npm 8.x+ recommended)
- **Angular CLI**: Will be installed as a dev dependency (v15.2.0)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AhatSaraiah/CouponSystemWebsite.git
cd CouponSystemWebsite
```

2. Install dependencies:
```bash
npm install
```

## Development Server

Run `ng serve` or `npm start` for a development server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

**Note**: The application starts at the login page by default. Ensure your backend server is running on `http://localhost:9096` before attempting to log in.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

For a production build, use:
```bash
ng build --configuration production
```

Note: The `--prod` flag is deprecated. Use `--configuration production` instead.

## Running Unit Tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

To run tests in headless mode (CI/CD friendly):
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

### Test Coverage

The project includes comprehensive unit tests:
- **Service Tests**: All HTTP services (CompanyService, CustomerService, AdminService) are fully tested
- **Component Tests**: Core components including AppComponent and LoginComponent
- **Total Test Count**: 33 tests, all passing

Test files are located in `src/app/**/*.spec.ts`.

## Code Quality

The project uses ESLint for code quality checks. Run linting with:
```bash
npm run lint
```

All files pass linting with zero errors and warnings.

## Security Audit

To check for security vulnerabilities in dependencies, run:
```bash
npm audit
```

To automatically fix vulnerabilities where possible:
```bash
npm audit fix
```

**Note**: Some vulnerabilities may require manual updates. The project has been upgraded to Angular 15 to address security concerns.

## Project Structure

- **src/app**: Contains the main application code and Angular components
  - **admin-companies**: Admin component for managing companies (displays company list)
  - **admin-customers**: Admin component for managing customers (displays customer list)
  - **company-coupons**: Company portal for managing coupons (CRUD operations, filtering)
  - **customer-coupons**: Customer portal for viewing and purchasing coupons (browsing, filtering, purchasing)
  - **login**: Login component for authentication (Admin/Company/Customer)
  - **layouts/default**: Default layout component
- **src/assets**: Contains static assets such as images and stylesheets
- **src/environments**: Contains environment configuration files
- **e2e**: End-to-end test directory (currently contains placeholder for future E2E framework)

## Component Features

### Login Component
- **Beautiful, modern UI** with gradient background and card-based design
- **Default route**: Login page is the first page users see when accessing the application
- Reactive forms with comprehensive validation
- Client type selection dropdown (Admin/Company/Customer) with Material Design icons
- Email and password validation with real-time error messages
- Password visibility toggle for better user experience
- Form fields with floating labels (Material Design outline appearance)
- Integrated with AdminService, CompanyService, and CustomerService
- URL encoding for email and password to handle special characters
- Enhanced error handling with user-friendly messages
- Automatic label positioning and notch width calculation

### Admin Components
- **AdminCompaniesComponent**: Displays and manages all companies
- **AdminCustomersComponent**: Displays and manages all customers

### Company Components
- **CompanyCouponsComponent**: 
  - View all company coupons
  - Filter by category
  - Filter by price
  - Add new coupons
  - Update existing coupons
  - Delete coupons

### Customer Components
- **CustomerCouponsComponent**:
  - View purchased coupons
  - Filter by category
  - Filter by price
  - Purchase new coupons

## Backend API

This application connects to a backend API running on `http://localhost:9096`. **Ensure the backend server is running before attempting to log in.**

### Starting the Backend

The backend is a separate application (typically a Spring Boot application) that must be started independently:

1. Navigate to your backend project directory
2. Start the backend server:
   - **Maven**: `mvn spring-boot:run`
   - **Gradle**: `./gradlew bootRun`
   - **JAR**: `java -jar your-backend.jar`
3. Wait for the server to start on port 9096
4. Verify it's running by checking `http://localhost:9096`

### Login Credentials

Login credentials are managed by your backend database. Contact your system administrator or check your backend configuration for the correct email and password combinations for Admin, Company, and Customer accounts.

### API Endpoints

- **Admin**: `/admin/*` - Company and customer management
  - `GET /admin/getAllCompanies` - Get all companies
  - `GET /admin/getAllCustomers` - Get all customers
  - `GET /admin/loginAdmin/{email}/{password}` - Admin login
- **Company**: `/company/*` - Coupon management for companies
  - `GET /company/getCompanyCoupons` - Get all company coupons
  - `GET /company/getCompanyCoupons/{category}` - Filter by category
  - `GET /company/getCompanyCoupons/{maxPrice}` - Filter by price
  - `GET /company/loginCompany/{email}/{password}` - Company login
- **Customer**: `/customer/*` - Coupon browsing and purchasing for customers
  - `GET /customer/getCustomerCoupons` - Get customer's coupons
  - `GET /customer/getCustomerCoupons/{category}` - Filter by category
  - `GET /customer/getCustomerCoupons/{maxPrice}` - Filter by price
  - `GET /customer/loginCustomer/{email}/{password}` - Customer login

## Technologies Used

- **Angular**: Framework for building web applications (v15.2.0)
- **TypeScript**: Superset of JavaScript for type-safe code (v4.9.5)
- **Angular Material**: UI component library (v15.2.0)
- **RxJS**: Reactive programming library (v7.8.0)
- **Karma & Jasmine**: Testing framework for unit tests
- **ESLint**: Code linting and quality checks
- **Angular Reactive Forms**: Form handling and validation
- **HTML/CSS**: Markup and styling of the application

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

### Development Guidelines

- Write unit tests for new features
- Follow Angular style guide
- Run linting before committing (`npm run lint`)
- Ensure all tests pass before submitting PR (`npm test`)
- Use TypeScript strict mode
- Follow ESLint rules (all files must pass linting)

## Recent Updates

- ✅ Upgraded from Angular 11 to Angular 15
- ✅ Replaced deprecated TSLint with ESLint
- ✅ Removed deprecated Protractor (E2E framework)
- ✅ Updated all dependencies to secure versions
- ✅ Added comprehensive unit test suite (33 tests, all passing)
- ✅ Fixed security vulnerabilities
- ✅ Implemented all component functionality:
  - Login component with form validation
  - Admin components for company and customer management
  - Company coupon management with CRUD operations
  - Customer coupon browsing and purchasing
- ✅ All linting errors resolved
- ✅ Code quality improvements

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact:

- **Ahat Saraiah**
- **Email**: [ahat.saraiah@gmail.com](mailto:ahat.saraiah@gmail.com)
- **GitHub**: [@AhatSaraiah](https://github.com/AhatSaraiah)
