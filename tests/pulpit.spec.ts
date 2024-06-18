import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('Zwrot');

        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot');
    });

    test('successful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('40');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        // await page.locator('#widget_1_topup_agreement').click(); - ten gorszy bo był obok, nie powinno tam byc

        // await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.locator('#execute_phone_btn').click();
        await page.getByTestId('close-button').click();

        // await expect(page.locator('#widget_1_topup_agreement')).toBeChecked();
        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx');
    });
    
});