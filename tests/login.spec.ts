import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  test.beforeEach( async ({ page }) => {
    await page.goto('/')
  });

  test('login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'magda123';
    const userPassword = 'test1234';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unccessfull login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserID = 'magda';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(incorrectUserID);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorMessage);
  });

  test('unccessfull login with too short password', async ({ page }) => {
    // Arrange
    const userID = 'magda';
    const incorrectPassword = '123';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
