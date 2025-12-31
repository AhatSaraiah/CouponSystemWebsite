# Coupon System - Frontend

Angular web application for the Coupon Management System.

## 🛠️ Tech Stack

- **Angular 11.0.5** - Web framework
- **Angular Material 11.0.3** - UI component library
- **RxJS 6.6** - Reactive programming
- **TypeScript 4.0** - Type-safe JavaScript
- **Angular Flex Layout** - Responsive layouts
- **Angular Router** - Navigation

## 📦 Dependencies

```json
{
  "dependencies": {
    "@angular/animations": "~11.0.5",
    "@angular/common": "~11.0.5",
    "@angular/core": "~11.0.5",
    "@angular/forms": "~11.0.5",
    "@angular/material": "^11.0.3",
    "@angular/platform-browser": "~11.0.5",
    "@angular/router": "~11.0.5",
    "@angular/flex-layout": "^11.0.0-beta.33",
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2"
  }
}
```

## 🏗️ Project Structure

```
src/app/
├── layouts/
│   └── default/                    # Main layout with sidebar
│       ├── default.component.html
│       ├── default.component.css
│       ├── default.component.ts
│       └── default.module.ts       # Feature module
│
├── login/                          # Authentication
│   ├── login.component.html
│   ├── login.component.css
│   └── login.component.ts
│
├── admin-companies/                # Admin: Company management
│   ├── admin-companies.component.html
│   ├── admin-companies.component.css
│   └── admin-companies.component.ts
│
├── admin-customers/                # Admin: Customer management
│   ├── admin-customers.component.html
│   ├── admin-customers.component.css
│   └── admin-customers.component.ts
│
├── company-coupons/                # Company: Coupon CRUD
│   ├── company-coupons.component.html
│   ├── company-coupons.component.css
│   └── company-coupons.component.ts
│
├── customer-coupons/               # Customer: Browse & purchase
│   ├── customer-coupons.component.html
│   ├── customer-coupons.component.css
│   └── customer-coupons.component.ts
│
├── services/
│   ├── admin.service.ts            # Admin API calls
│   ├── company.service.ts          # Company API calls
│   ├── customer.service.ts         # Customer API calls
│   └── auth.service.ts             # Role-based auth
│
├── app-routing.module.ts           # Route configuration
├── app.component.ts                # Root component
└── styles.css                      # Global styles
```

## 🎨 Features

### **Role-Based Navigation**
- **Admin** sees: Companies, Customers
- **Company** sees: Company Coupons
- **Customer** sees: Browse & Buy

### **UI Components**

#### **Admin Dashboard**
- ✅ Structured HTML tables for companies/customers
- ✅ Delete buttons with confirmation
- ✅ Add forms for new entities
- ✅ Real-time data updates with Observables

#### **Company Coupons**
- ✅ Reactive form with validation
- ✅ **Material Datepicker** with calendar popup
- ✅ Category dropdown (Food, Fashion, Sport, Home, Electricity, Restaurant, Vacation)
- ✅ Coupon cards with badges, pricing, and expiration
- ✅ Delete functionality
- ✅ Toggle form visibility

#### **Customer Dashboard**
- ✅ **Browse Store** - View all available coupons
- ✅ **My Coupons** - View purchased coupons
- ✅ **Buy Now** button with confirmation
- ✅ Category badges and expiration dates
- ✅ Owned badge for purchased coupons

### **Material Design Components Used**
- `mat-form-field` - Form inputs
- `mat-select` - Dropdowns
- `mat-datepicker` - Calendar date picker
- `mat-button` - Buttons
- `mat-icon` - Material icons
- `mat-raised-button` - Elevated buttons

## 🚀 Running the Frontend

### **Development Server**
```bash
cd frontend
npm install
npm start
```
Navigate to `http://localhost:4200`

### **Production Build**
```bash
npm run build --prod
```
Output: `dist/frontend/`

### **Linting**
```bash
npm run lint
```

## 🔧 Configuration

### **API Base URLs**
Located in service files (`*.service.ts`):
```typescript
private baseUrl = 'http://localhost:9096';
```

### **Routing**
`app-routing.module.ts`:
```typescript
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'DefaultComponent',
    component: DefaultComponent,
    children: [
      { path: 'admin-companies', component: AdminCompaniesComponent },
      { path: 'admin-customers', component: AdminCustomersComponent },
      { path: 'company-coupons', component: CompanyCouponsComponent },
      { path: 'customer-coupons', component: CustomerCouponsComponent }
    ]
  }
];
```

### **Material Theme**
`styles.css`:
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

## 🎯 Key Implementation Details

### **Reactive Forms**
```typescript
this.couponForm = this.fb.group({
  title: ['', Validators.required],
  category: ['', Validators.required],
  description: [''],
  startDate: ['', Validators.required],
  endDate: ['', Validators.required],
  amount: [1, [Validators.required, Validators.min(1)]],
  price: [0, [Validators.required, Validators.min(0)]]
});
```

### **HTTP Service Calls**
```typescript
// Using Observables
getCoupons(): Observable<any> {
  return this.http.get(`${this.baseUrl}/company/getCompanyCoupons`);
}

// Subscribe in component
this.coupons$ = this.companyService.getCoupons();
```

### **Async Pipe (No Manual Unsubscribe)**
```html
<div *ngFor="let coupon of coupons$ | async">
  {{ coupon.title }}
</div>
```

### **Role-Based Rendering**
```html
<ng-container *ngIf="(userRole$ | async) === 'company'">
  <h3>Management</h3>
  <ul>
    <li>
      <a routerLink="/DefaultComponent/company-coupons">
        Company Coupons
      </a>
    </li>
  </ul>
</ng-container>
```

### **Material Datepicker**
```html
<mat-form-field appearance="outline">
  <mat-label>Start Date</mat-label>
  <input matInput [matDatepicker]="startPicker" formControlName="startDate">
  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
  <mat-datepicker #startPicker></mat-datepicker>
</mat-form-field>
```

## 🎨 Styling Highlights

### **Coupon Cards**
```css
.coupon-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.coupon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
```

### **Category Badges**
```css
.category-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
```

### **Responsive Grid**
```css
.coupons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}
```

## 🔐 Authentication Flow

1. **Login** → Select role (Admin/Company/Customer)
2. **AuthService** stores role in BehaviorSubject
3. **Navigate** to `/DefaultComponent`
4. **Sidebar** renders role-specific menu items
5. **Components** fetch data based on role

## 🐛 Common Issues

### **CORS Errors**
- Ensure backend has `@CrossOrigin(origins = "http://localhost:4200")`
- Check browser console for specific CORS error

### **Material Components Not Working**
- Verify `@angular/material` is installed
- Import required modules in `default.module.ts`
- Import Material theme in `styles.css`

### **Datepicker Not Showing**
- Import `MatDatepickerModule` and `MatNativeDateModule`
- Add `<mat-datepicker>` element with template reference variable

### **Forms Not Validating**
- Import `ReactiveFormsModule` in module
- Ensure `FormGroup` is initialized in constructor
- Bind `[formGroup]` and `formControlName` correctly

## 📱 Responsive Design

- **Flex Layout** for responsive sidebar/content
- **Material Grid** for coupon cards
- **Mobile-friendly** forms and buttons
- **Breakpoints** handled by Angular Flex Layout

## 🚀 Future Enhancements

- [ ] Logout button with session clearing
- [ ] Route guards for role-based access
- [ ] Loading spinners for async operations
- [ ] Toast notifications (Snackbar)
- [ ] Form field error messages
- [ ] Search and filter functionality
- [ ] Pagination for large datasets
- [ ] Image upload for coupons
- [ ] User profile page
- [ ] Dark mode toggle

## 🧪 Testing

### **Unit Tests**
```bash
npm run test
```

### **E2E Tests**
```bash
npm run e2e
```

## 📝 Development Notes

- **No manual unsubscribe** needed when using `async` pipe
- **Observables** preferred over Promises for HTTP calls
- **OnPush change detection** can be added for performance
- **Lazy loading** can be implemented for feature modules

---

**Angular Version:** 11.0.5  
**Node Version:** 14+  
**Package Manager:** npm
