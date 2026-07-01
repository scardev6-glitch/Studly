# Studly App - Comprehensive Testing Guide

## Overview

Complete test suites for both backend (Node.js/Express) and frontend (React) applications.

## Backend Tests

### Test Framework: Jest with Supertest

- **Location**: `/tests/` directory
- **Configuration**: `jest.config.js` and `jest.setup.js`
- **Test Database**: MongoDB in-memory for isolation

### Backend Test Structure

#### Unit Tests - Controllers (`tests/unit/controllers/`)

- **auth.test.js**: Authentication (signup, login, password reset)
- **notes.test.js**: Note creation, retrieval, updates, deletion
- **quiz.test.js**: Quiz submission, evaluation, performance tracking
- **progress.test.js**: XP tracking, leveling, subject progress
- **focus.test.js**: Focus sessions, violations, completion
- **notifications.test.js**: Notification CRUD, read status, unread count
- **planner.test.js**: Study plan creation and management
- **chat.test.js**: Community messages, topic discussions
- **leaderboard.test.js**: Global rankings, subject-specific rankings
- **study.test.js**: Study sessions, topic retrieval
- **syllabus.test.js**: Syllabus organization, topic search
- **video.test.js**: Video retrieval, filtering, search

### Running Backend Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test suites
npm run test:controllers    # All controller tests
npm run test:unit          # All unit tests
npm run test:integration   # Integration tests
npm run test:routes        # Route tests

# Generate coverage report
npm test -- --coverage
```

### Backend Test Coverage

- **Controllers**: CRUD operations, error handling, validation
- **Routes**: API endpoint validation, authentication, authorization
- **Models**: Schema validation, data relationships
- **Services**: Business logic, external API interactions
- **Middleware**: Error handling, authentication, validation

### Test Coverage Targets

```
- Branches: 60%+
- Functions: 60%+
- Lines: 60%+
- Statements: 60%+
```

### Backend Test Examples

#### Auth Controller Tests

```javascript
✓ Create user with valid data
✓ Reject duplicate emails
✓ Reject invalid emails
✓ Reject weak passwords
✓ Login with correct credentials
✓ Reject wrong passwords
✓ Send password reset emails
✓ Return current user info
```

#### Quiz Controller Tests

```javascript
✓ Retrieve quiz questions for topic
✓ Not expose correct answers in quiz
✓ Evaluate submissions and return score
✓ Award XP on successful submission
✓ Retrieve quiz history
✓ Calculate performance statistics
```

#### Focus Controller Tests

```javascript
✓ Start new focus session
✓ Complete focus session with points
✓ Abandon focus session
✓ Record focus violations
✓ Retrieve session history
✓ Get current session status
✓ Calculate focus statistics
```

---

## Frontend Tests

### Test Framework: Vitest with React Testing Library

- **Location**: `frontend/tests/` directory
- **Configuration**: `vitest.config.js` and `tests/setup.js`
- **Environment**: jsdom for DOM simulation

### Frontend Test Structure

#### Component Tests (`frontend/tests/components/`)

- **App.test.jsx**: Main app component, routing
- **Loading.test.jsx**: Loading spinner component
- **EmptyState.test.jsx**: Empty state display
- **Toast.test.jsx**: Toast notifications
- **AppShell.test.jsx**: Layout and navigation

#### Page Tests (`frontend/tests/pages/`)

- **LoginPage.test.jsx**: Login form, validation
- **DashboardPage.test.jsx**: Dashboard stats, quick actions
- **StudyPage.test.jsx**: Study materials, topic selection
- **Pages.test.jsx**: Notes, Planner, Progress pages
- Other page components (Achievement, Settings, Community, etc.)

#### Service Tests (`frontend/tests/services/`)

- **api.test.js**: API client, authentication, error handling

#### Context Tests (`frontend/tests/context/`)

- **AppContext.test.js**: Global state management

### Running Frontend Tests

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Frontend Test Coverage

- **Components**: Rendering, user interactions, props
- **Pages**: Layout, data display, navigation
- **Services**: API calls, error handling, authentication
- **Context**: State management, provider functionality
- **Hooks**: State updates, side effects

### Frontend Test Examples

#### LoginPage Tests

```javascript
✓ Render login form
✓ Display email and password inputs
✓ Show signup link
✓ Show forgot password link
✓ Handle form submission
✓ Show validation errors
```

#### DashboardPage Tests

```javascript
✓ Render dashboard with user info
✓ Display user statistics (XP, Level, Streak)
✓ Show quick action buttons
✓ Display recent activity
✓ Handle navigation to other pages
```

#### API Service Tests

```javascript
✓ Create API instance with base URL
✓ Add authentication tokens to requests
✓ Handle 401 responses
✓ Support GET, POST, PUT, DELETE methods
✓ Handle network errors
✓ Handle API errors gracefully
```

---

## Setting Up Tests Locally

### Backend Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file at project root
# Tests use the root .env file directly

# 3. Ensure MongoDB is available (tests use in-memory)
# No special setup needed - uses mongodb-memory-server-core

# 4. Run tests
npm test
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run tests
npm test
```

---

## Test Data & Mocking

### Backend Mocking

- **Google Generative AI**: Mocked to return predetermined responses
- **Email Service**: Mocked to prevent actual email sending
- **AI Engine**: Mocked for AI-based features
- **Gamification Engine**: Mocked for points/XP calculations

### Frontend Mocking

- **API Service**: Mocked to prevent actual API calls
- **localStorage**: Mocked for local storage operations
- **window.matchMedia**: Mocked for responsive design tests
- **fetch**: Mocked globally for all HTTP requests

---

## Continuous Integration

### GitHub Actions Example (.github/workflows/test.yml)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm test -- --coverage

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: cd frontend && npm install
      - run: cd frontend && npm test
```

---

## Test Maintenance

### Adding New Tests

1. Create test file in appropriate directory
2. Follow existing naming conventions: `feature.test.js`
3. Use describe/it structure
4. Mock external dependencies
5. Test happy paths and error cases
6. Include edge cases

### Updating Tests

When modifying code:

1. Run related tests to ensure no breakage
2. Update tests if behavior changes
3. Add tests for new features
4. Maintain coverage thresholds

### Common Testing Patterns

#### Backend Controller Test Template

```javascript
describe("FeatureController", () => {
  let userId, token;

  beforeEach(async () => {
    // Setup test data
  });

  afterAll(async () => {
    // Cleanup
  });

  describe("POST /api/feature", () => {
    it("should create feature", async () => {
      const res = await request(app)
        .post("/api/feature")
        .set("Authorization", `Bearer ${token}`)
        .send(data)
        .expect(201);

      expect(res.body).toHaveProperty("_id");
    });
  });
});
```

#### Frontend Component Test Template

```javascript
describe("FeatureComponent", () => {
  const mockProps = {
    /* ... */
  };

  it("should render", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <FeatureComponent {...mockProps} />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
```

---

## Performance Testing

### Backend Performance

```bash
# Run tests with timing
npm test -- --verbose

# Identify slow tests
npm test -- --verbose 2>&1 | grep "ms"
```

### Frontend Performance

```bash
# Check component render times
npm run test:watch
```

---

## Troubleshooting

### Backend Issues

| Issue                     | Solution                                  |
| ------------------------- | ----------------------------------------- |
| MongoDB connection errors | Ensure mongodb-memory-server is installed |
| Timeout errors            | Increase jest timeout in jest.config.js   |
| Mock not working          | Ensure mock is above test file imports    |
| Token validation fails    | Check JWT_SECRET in jest.setup.js         |

### Frontend Issues

| Issue                   | Solution                             |
| ----------------------- | ------------------------------------ |
| Component not rendering | Check for required context providers |
| Async test failures     | Use waitFor() for async operations   |
| Mock API calls failing  | Verify mock path matches import      |
| localStorage errors     | Check setup.js mock configuration    |

---

## Best Practices

### ✅ DO

- ✅ Test user interactions, not implementation
- ✅ Use meaningful test names
- ✅ Test both success and failure cases
- ✅ Mock external dependencies
- ✅ Keep tests focused and isolated
- ✅ Use beforeEach for common setup
- ✅ Clean up after tests (afterEach)
- ✅ Aim for >60% coverage

### ❌ DON'T

- ❌ Test implementation details
- ❌ Create test interdependencies
- ❌ Make actual API calls
- ❌ Use real databases
- ❌ Write overly complex tests
- ❌ Ignore test failures
- ❌ Hard-code values
- ❌ Skip error case testing

---

## Resources

### Documentation

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest Documentation](https://github.com/visionmedia/supertest)

### Useful Commands

```bash
# Run specific test file
npm test -- notes.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should create"

# Update snapshots
npm test -- --updateSnapshot

# Run tests with coverage
npm test -- --coverage --coverageReporters=text-summary
```

---

## Test Metrics

### Target Coverage

- **Statements**: 60%+
- **Branches**: 60%+
- **Functions**: 60%+
- **Lines**: 60%+

### Current Test Count

- **Backend Controllers**: 12 suites (120+ tests)
- **Frontend Components**: 5 suites (25+ tests)
- **Frontend Pages**: 7 suites (35+ tests)
- **Services**: 2 suites (15+ tests)
- **Total**: 25+ test suites (190+ tests)

---

## Contact & Support

For test-related questions or to add new tests:

1. Review existing test patterns
2. Follow naming conventions
3. Maintain coverage standards
4. Document complex test scenarios
