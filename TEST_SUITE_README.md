# E2E Test Suite for Theme & Language Toggle App

## 🎯 Overview

This comprehensive E2E test suite covers all critical functionality of the Theme & Language Toggle App, ensuring robust testing of theme switching, language switching, persistence, and edge cases.

## 🧪 Test Coverage

### 1. **Theme Functionality** (`theme.spec.ts`)
- ✅ **Full User Journey**: Tests all 3 theme options (Light/Dark/System) with page refresh persistence
- ✅ **System Theme Detection**: Verifies OS theme changes are reflected in real-time
- ✅ **Theme Cookie Verification**: Validates actual cookies are set with correct properties
- ✅ **Theme Persistence**: Tests persistence across browser restart simulation

### 2. **Language Functionality** (`language.spec.ts`)
- ✅ **Language Persistence**: Tests language changes persist across page refresh
- ✅ **UI Translation**: Verifies UI text translates correctly between English/Spanish
- ✅ **Language Cookie Verification**: Validates language cookies are set correctly
- ✅ **Language Persistence**: Tests persistence across browser restart simulation
- ✅ **Theme Labels Translation**: Verifies theme dropdown labels are translated

### 3. **Combined Functionality** (`combined.spec.ts`)
- ✅ **Combined Usage**: Tests both theme and language changes together with persistence
- ✅ **Cookie Verification**: Comprehensive cookie validation with correct properties
- ✅ **Complex Workflow**: Multiple theme and language change sequences
- ✅ **Edge Cases**: Rapid changes and stress testing
- ✅ **Cross-Browser Session Persistence**: Settings persist across different browser contexts

### 4. **Comprehensive Test Suite** (`comprehensive.spec.ts`)
- ✅ **Full User Journey**: Complete workflow testing with all combinations
- ✅ **System Theme Detection**: Real-time OS theme change reflection
- ✅ **Cookie Verification**: Comprehensive cookie validation
- ✅ **Edge Cases and Stress Testing**: Rapid changes and consistency verification
- ✅ **Cross-Browser Session Simulation**: Multiple browser session testing

## 🚀 Running the Tests

### Quick Start
```bash
# Run all E2E tests across all browsers
yarn test:e2e:all

# Run tests with specific browser
yarn test:e2e:chromium
yarn test:e2e:firefox
yarn test:e2e:webkit

# Run all tests (default)
yarn test:e2e
```

### Manual Execution
```bash
# 1. Build the project
yarn build

# 2. Start development server
yarn dev

# 3. In another terminal, run tests
yarn playwright test

# 4. View HTML report
yarn playwright show-report
```

## 🔧 Test Configuration

### Playwright Config
- **Test Directory**: `./src/test/e2e`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled
- **Retries**: 2 in CI, 0 locally
- **HTML Reporter**: Enabled

### Test Environment
- **Clean State**: Each test starts with cleared cookies
- **Isolation**: Tests are independent and don't affect each other
- **Real Browser**: Tests run in actual browser environments

## 📊 Test Results

### HTML Report
After running tests, view detailed results at:
```
playwright-report/index.html
```

### Console Output
Tests provide real-time feedback with:
- ✅ Passed tests
- ❌ Failed tests with detailed error messages
- 📊 Performance metrics
- 🐛 Screenshots and traces for failed tests

## 🎭 Test Scenarios

### Theme Testing
1. **Light Theme**: Select light theme, verify persistence
2. **Dark Theme**: Select dark theme, verify persistence  
3. **System Theme**: Select system theme, verify OS theme detection
4. **Theme Switching**: Rapid theme changes with consistency verification
5. **Cookie Validation**: Verify theme cookies are set correctly

### Language Testing
1. **English**: Select English, verify persistence
2. **Spanish**: Select Spanish, verify persistence
3. **UI Translation**: Verify all text elements translate correctly
4. **Theme Label Translation**: Verify theme dropdown labels translate
5. **Cookie Validation**: Verify language cookies are set correctly

### Combined Testing
1. **Dual Changes**: Change both theme and language simultaneously
2. **Persistence**: Verify both settings persist across page refresh
3. **Browser Restart**: Simulate browser close/reopen scenarios
4. **Cross-Session**: Test persistence across different browser contexts
5. **Edge Cases**: Rapid changes, stress testing, consistency verification

## 🛠️ Test Utilities

### Cookie Management
- **Clear Cookies**: `await page.context().clearCookies()`
- **Verify Cookies**: `await page.context().cookies()`
- **Cookie Properties**: name, value, path, httpOnly, secure

### Browser Context Simulation
- **New Context**: `await browser.newContext()`
- **New Page**: `await context.newPage()`
- **Context Cleanup**: `await context.close()`

### Theme Detection Mocking
```typescript
await page.evaluate(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      // ... other properties
    }),
  });
});
```

## 🔍 Debugging Tests

### Failed Test Investigation
1. **Screenshots**: Automatically captured for failed tests
2. **Traces**: Available for detailed debugging
3. **Console Logs**: Browser console output during test execution
4. **Network Logs**: HTTP requests and responses

### Common Issues
- **Port Conflicts**: Ensure port 3000 is available
- **Dependencies**: Run `yarn install` if modules are missing
- **Build Errors**: Fix TypeScript errors before running tests
- **Browser Issues**: Update Playwright browsers with `yarn playwright install`

## 📈 Performance Metrics

### Test Execution Time
- **Individual Tests**: 2-5 seconds each
- **Full Suite**: ~2-3 minutes across all browsers
- **Parallel Execution**: Reduces total time significantly

### Resource Usage
- **Memory**: ~100-200MB per browser context
- **CPU**: Moderate usage during test execution
- **Network**: Minimal, mostly local testing

## 🎯 Best Practices

### Test Design
- **Isolation**: Each test is independent
- **Clean State**: Clear cookies before each test
- **Realistic Scenarios**: Test actual user workflows
- **Edge Cases**: Include boundary conditions

### Maintenance
- **Regular Updates**: Keep Playwright and browsers updated
- **Test Data**: Use realistic test data
- **Documentation**: Keep test descriptions clear and updated
- **CI Integration**: Run tests in continuous integration

## 🚨 Troubleshooting

### Common Errors
1. **Port Already in Use**: Kill processes on port 3000
2. **Browser Not Found**: Run `yarn playwright install`
3. **Test Timeout**: Increase timeout in Playwright config
4. **Cookie Issues**: Ensure cookie clearing works properly

### Debug Commands
```bash
# Install/update browsers
yarn playwright install

# Run tests with debug mode
yarn playwright test --debug

# Run specific test file
yarn playwright test theme.spec.ts

# Generate test code
yarn playwright codegen
```

## 📝 Contributing

### Adding New Tests
1. **Follow Naming Convention**: `feature.spec.ts`
2. **Use Descriptive Names**: Clear test descriptions
3. **Include Setup/Teardown**: Proper test isolation
4. **Add to Documentation**: Update this README

### Test Structure
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('Test Description', async ({ page }) => {
    // Test implementation
  });
});
```

---

**🎉 Happy Testing!** This comprehensive test suite ensures your Theme & Language Toggle App works flawlessly across all scenarios.
