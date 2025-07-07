# Walmart Store Management System

A comprehensive physical store management application built with React and Tailwind CSS, designed to handle all aspects of Walmart store operations including user management, inventory, queue management, and sales processing.

## Features

### User Roles & Permissions

The application supports 4 distinct user roles with different capabilities:

#### 1. SUPER_ADMIN 👑

- **Store Management**: Add, edit, and delete store locations
- **Admin Assignment**: Assign store administrators to specific stores
- **Global Analytics**: Access overall sales dashboard and analytics
- **AI Reports**: Generate AI-powered reports with one click
- **Revenue Tracking**: Monitor revenue across all stores

#### 2. STORE_ADMIN 🏪

- **Cashier Management**: Assign cashiers to counters (matching counter count)
- **Inventory Management**: Dashboard with filters and search functionality
- **ML Predictions**: One-click ML-based inventory predictions for next month
- **Sales Records**: Access and analyze store-specific sales data
- **Store Analytics**: Monitor store performance metrics

#### 3. CASHIER 💼

- **Counter Status**: Mark counters as vacant, occupied, or busy
- **Customer Cart**: Add items to customer carts (offline store model)
- **Billing**: Generate bills and complete transactions
- **Queue Management**: Handle customer queue assignments
- **Real-time Updates**: Monitor queue status and customer flow

#### 4. CUSTOMER 👤

- **Store Selection**: Choose the store they're currently visiting
- **Queue Management**: Join queue with ML-based timing predictions
- **Real-time Updates**: Monitor queue position and estimated wait times
- **Notifications**: Receive alerts when it's their turn
- **Timer Tracking**: Track time spent in queue

## Technical Architecture

### Frontend Stack

- **React 19**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **Component Architecture**: Modular, reusable components

### Component Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx     # Multi-variant button component
│   │   ├── Input.jsx      # Form input with validation
│   │   ├── Card.jsx       # Content container component
│   │   ├── Modal.jsx      # Modal dialog component
│   │   └── Table.jsx      # Data table component
│   ├── layout/            # Layout components
│   │   ├── Layout.jsx     # Main layout wrapper
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   └── Header.jsx     # Top header with notifications
│   ├── dashboard/         # Dashboard components
│   │   ├── StatsCard.jsx  # Statistics display cards
│   │   └── ChartCard.jsx  # Chart container component
│   ├── store/             # Store management components
│   │   ├── StoreCard.jsx  # Store information display
│   │   └── StoreForm.jsx  # Store add/edit form
│   ├── cashier/           # Cashier-specific components
│   │   ├── CounterStatus.jsx  # Counter management
│   │   └── CustomerCart.jsx   # Customer cart interface
│   └── customer/          # Customer-facing components
│       ├── StoreSelector.jsx  # Store selection interface
│       └── QueueStatus.jsx    # Queue management interface
├── pages/                 # Page components
│   └── Dashboard.jsx      # Role-based dashboard
└── App.jsx               # Main application component
```

### Key Features

#### 1. Role-Based Navigation

- Dynamic sidebar navigation based on user role
- Context-aware menu items and permissions
- Seamless role switching for demo purposes

#### 2. Responsive Design

- Mobile-first responsive design
- Tailwind CSS utility classes
- Consistent design system across components

#### 3. State Management

- React hooks for local state management
- Props drilling for component communication
- Mock data for demonstration purposes

#### 4. Queue Management System

- Real-time queue position tracking
- ML-based wait time predictions
- Timer functionality for queue duration
- Visual progress indicators

#### 5. Store Management

- CRUD operations for store locations
- Store status monitoring
- Revenue tracking and analytics
- Counter and cashier assignment

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Walmart_Sparkathon/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Tailwind CSS and additional dependencies**

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npm install @headlessui/react @heroicons/react react-router-dom lucide-react
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Usage

1. **Role Selection**: Use the role selector at the top to switch between different user types
2. **Navigation**: Use the sidebar to navigate between different sections
3. **Demo Features**:
   - Add new stores (Super Admin)
   - Join queue as customer
   - Manage counter status as cashier
   - View analytics and reports

## Component Documentation

### UI Components

#### Button Component

```jsx
<Button
	variant="primary" // primary, secondary, danger, success, outline
	size="md" // sm, md, lg, xl
	onClick={handleClick}
	disabled={false}
>
	Button Text
</Button>
```

#### Input Component

```jsx
<Input
	label="Field Label"
	type="text"
	value={value}
	onChange={handleChange}
	error={errorMessage}
	required={true}
/>
```

#### Modal Component

```jsx
<Modal
	isOpen={isOpen}
	onClose={handleClose}
	title="Modal Title"
	size="md" // sm, md, lg, xl, full
>
	Modal content
</Modal>
```

### Layout Components

#### Layout Component

```jsx
<Layout
	userRole={userRole}
	currentPath={currentPath}
	onNavigate={handleNavigate}
	notifications={notifications}
	onLogout={handleLogout}
>
	Page content
</Layout>
```

## Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles and component classes
- Use Tailwind utility classes for component styling

### Adding New Features

1. Create new components in appropriate directories
2. Add navigation items to `Sidebar.jsx`
3. Update routing logic in `App.jsx`
4. Add role-based permissions as needed

### Mock Data

- Update mock data in `App.jsx` for demonstration
- Replace with API calls in production
- Add proper error handling and loading states

## Future Enhancements

### Backend Integration

- RESTful API endpoints for all CRUD operations
- Real-time WebSocket connections for queue updates
- Authentication and authorization system
- Database integration (PostgreSQL/MongoDB)

### Advanced Features

- Real-time inventory tracking
- Advanced analytics and reporting
- Mobile app development
- Push notifications
- Payment processing integration
- Customer loyalty program

### ML/AI Features

- Predictive analytics for inventory management
- Customer behavior analysis
- Dynamic pricing algorithms
- Fraud detection systems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
