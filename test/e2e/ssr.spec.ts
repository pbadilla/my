import { test, expect } from '@playwright/test';

test.describe('SSR Verification', () => {

  test('Home page renders HTML on server', async ({ page }) => {
    // Accede a la URL de tu app (puede ser localhost)
    await page.goto('http://localhost:3000/');

    // Obtén el HTML completo antes de que JS lo modifique
    const html = await page.content();

    // Comprueba que el contenido clave está presente
    expect(html).toContain('Top Rated Movies');  // ejemplo: tu título visible
    expect(html).toContain('Popular Movies');
  });

  test('Movie page renders server-side content', async ({ page }) => {
    await page.goto('http://localhost:3000/movie/1'); // cambia según tu ruta

    const html = await page.content();

    // Verifica que los datos de la película están presentes
    expect(html).toContain('Inception'); // ejemplo: título de la película
    expect(html).toContain('Action');    // categoría o contenido renderizado
  });

});
