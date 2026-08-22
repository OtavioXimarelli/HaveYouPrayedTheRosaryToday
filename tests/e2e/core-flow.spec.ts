import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

test('direct visits render every core page instead of an empty hydration shell', async ({page, isMobile}) => {
  await page.goto('/pt/sanctuary');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
  if (isMobile) {
    const title = await page.locator('.primary-prayer h2').boundingBox();
    const action = await page.locator('.primary-prayer .button').boundingBox();
    expect(title).not.toBeNull();
    expect(action).not.toBeNull();
    expect(title!.y).toBeLessThan(action!.y);
  }

  await page.goto('/pt/rosary');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();

  await page.goto('/pt/settings');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();

  await page.goto('/pt/liturgy');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
});

test('responsive shells do not clip and mobile navigation stays usable', async ({page, isMobile}) => {
  for (const route of ['inicio', 'sanctuary', 'rosary', 'liturgy', 'settings']) {
    await page.goto(`/pt/${route}`);
    const widths = await page.evaluate(() => ({viewport: window.innerWidth, document: document.documentElement.scrollWidth}));
    expect(widths.document).toBeLessThanOrEqual(widths.viewport);
  }

  await page.goto('/pt/sanctuary');
  if (isMobile) {
    await page.getByRole('button', {name: 'Abrir menu'}).click();
    const navigation = page.getByRole('navigation', {name: 'Menu de navegação'});
    await expect(navigation).toBeVisible();
    await navigation.getByRole('link', {name: 'A missão'}).click();
    await expect(page).toHaveURL(/\/pt\/about$/);
    const bottomNav = page.getByRole('navigation', {name: 'Navegação do aplicativo'});
    await expect(bottomNav.getByRole('link', {name: 'Ajustes'})).toBeVisible();
  } else {
    await expect(page.getByRole('navigation', {name: 'Navegação principal'})).toBeVisible();
  }
});

test('new visitor can personalize the sanctuary and start a resumable Rosary', async ({page}) => {
  await page.goto('/pt');
  await expect(page.getByRole('heading', {name: /um lugar simples/i})).toBeVisible();
  await page.getByRole('link', {name: /preparar meu espaço/i}).first().click();
  await page.getByLabel(/como podemos chamar/i).fill('Ana');
  const next = page.getByRole('button', {name: 'Continuar'});
  await next.click();
  await expect(page.getByText(/^Etapa 2 de 3$/)).toBeVisible();
  await next.click();
  await expect(page.getByText(/^Etapa 3 de 3$/)).toBeVisible();
  await page.getByRole('button', {name: /entrar no meu santuário/i}).dispatchEvent('click');
  await expect(page).toHaveURL(/\/pt\/sanctuary$/);
  await expect(page.getByRole('heading', {name: /ana/i})).toBeVisible();
  await page.getByRole('link', {name: /iniciar o rosário/i}).click();
  await expect(page.getByText(/passo 1 de 73/i).first()).toBeVisible();
  await page.getByRole('button', {name: /próxima oração/i}).click();
  await page.reload();
  await expect(page.getByText(/passo 2 de 73/i).first()).toBeVisible();
});

test('legacy and English routes preserve a clear destination', async ({page}) => {
  await page.goto('/pt/profile');
  await expect(page).toHaveURL(/\/pt\/settings$/);
  await page.goto('/en/about');
  await expect(page).toHaveURL(/\/pt\/about$/);
});

test('public home has no critical automated accessibility violations', async ({page}) => {
  await page.goto('/pt/inicio');
  const results = await new AxeBuilder({page}).analyze();
  expect(results.violations.filter((violation) => violation.impact === 'critical')).toEqual([]);
});

test('previously loaded Rosary reopens offline', async ({page, context}) => {
  await page.goto('/pt/rosary');
  await page.evaluate(() => navigator.serviceWorker?.ready);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText(/passo 1 de 73/i).first()).toBeVisible();
});
