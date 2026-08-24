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

test('compact beta notice does not cover the mobile prayer experience', async ({page}) => {
  test.skip((page.viewportSize()?.width ?? 0) > 620, 'Compact notice is specific to phone layouts');
  await page.goto('/pt/sanctuary');
  const notice = page.getByRole('complementary', {name: /caminho em construção/i});
  await expect(notice).toBeVisible();

  const noticeBox = await notice.boundingBox();
  const mainBox = await page.locator('main.site-main').boundingBox();
  const bottomNavBox = await page.getByRole('navigation', {name: 'Navegação do aplicativo'}).boundingBox();
  expect(noticeBox).not.toBeNull();
  expect(mainBox).not.toBeNull();
  expect(bottomNavBox).not.toBeNull();
  expect(noticeBox!.y + noticeBox!.height).toBeLessThanOrEqual(mainBox!.y + 1);
  expect(noticeBox!.y + noticeBox!.height).toBeLessThan(bottomNavBox!.y);
});

test('new visitor can personalize the sanctuary and start a resumable Rosary', async ({page}) => {
  await page.goto('/pt');
  await expect(page.getByRole('heading', {name: /um lugar simples/i})).toBeVisible();
  await page.getByRole('link', {name: /preparar meu espaço/i}).first().click();
  await page.getByLabel(/como podemos chamar/i).fill('Ana');
  const next = page.getByRole('button', {name: 'Continuar'});
  await next.click();
  await expect(page.getByLabel(/horário do lembrete/i)).toBeVisible();
  await next.click();
  await expect(page.getByRole('group', {name: /tamanho do texto/i})).toBeVisible();
  await page.getByRole('button', {name: /entrar no meu santuário/i}).click();
  await expect(page).toHaveURL(/\/pt\/sanctuary$/);
  await expect(page.getByRole('heading', {name: /ana/i})).toBeVisible();
  await page.getByRole('link', {name: /iniciar o rosário/i}).click();
  await expect(page.getByLabel(/passo 1 de 73/i)).toBeVisible();
  await page.getByRole('button', {name: /próxima oração/i}).click();
  await page.reload();
  await expect(page.getByLabel(/passo 2 de 73/i)).toBeVisible();
});

test('legacy and English routes preserve a clear destination', async ({page}) => {
  await page.goto('/pt/profile');
  await expect(page).toHaveURL(/\/pt\/settings$/);
  await page.goto('/en/about');
  await expect(page).toHaveURL(/\/pt\/about$/);
});

test('settings erase every Evangelizae browser record and return to a clean start', async ({page, context}) => {
  await page.goto('/pt/settings');
  await page.evaluate(() => {
    localStorage.setItem('evangelizae-test-private-data', 'remove-me');
    sessionStorage.setItem('evangelizae-test-session-data', 'remove-me');
    document.cookie = 'evangelizae_onboarded=1; Path=/; SameSite=Lax';
  });
  const betaClose = page.getByRole('button', {name: 'Fechar'});
  if (await betaClose.isVisible()) await betaClose.click();
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', {name: /apagar todos os dados locais/i}).click();
  await expect(page).toHaveURL(/\/pt\/inicio/);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage).filter((key) => key.startsWith('evangelizae-')),
    session: Object.keys(sessionStorage).filter((key) => key.startsWith('evangelizae-')),
  }))).toEqual({local: [], session: []});
  expect((await context.cookies()).some((cookie) => cookie.name === 'evangelizae_onboarded')).toBe(false);
});

test('beta pages have no serious automated accessibility violations', async ({page, isMobile}) => {
  test.skip(isMobile, 'One semantic pass is enough; responsive behavior is covered separately');
  for (const route of ['inicio', 'comecar', 'sanctuary', 'rosary', 'liturgy', 'settings', 'about', 'privacy', 'offline', 'rota-inexistente']) {
    await page.goto(`/pt/${route}`);
    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    const results = await new AxeBuilder({page}).analyze();
    expect(
      results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious'),
      `Accessibility violations on /pt/${route}`,
    ).toEqual([]);
  }
});

test('previously loaded Rosary reopens offline', async ({page, context}) => {
  await page.goto('/pt/rosary');
  await page.getByRole('button', {name: /mistérios? de hoje/i}).click();
  await expect(page.getByLabel(/passo 1 de 73/i)).toBeVisible();
  await page.evaluate(async () => { await navigator.serviceWorker?.ready; });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByLabel(/passo 1 de 73/i)).toBeVisible();
});
