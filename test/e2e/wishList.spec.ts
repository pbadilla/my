import { test, expect } from "@playwright/test";

test.describe("Wishlist Page (fast, mocked)", () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "wishlist-storage",
        JSON.stringify({ state: { items: [] }, version: 0 })
      );
    });
  });

  test("should show NoPage when wishlist is empty", async ({ page }) => {
    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    await expect(page.getByTestId("no-page")).toBeVisible();
    await expect(
      page.getByText("Looks like this scene got lost")
    ).toBeVisible();
  });

  test("should display movies in wishlist", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "wishlist-storage",
      JSON.stringify({
        state: {
          items: [
            {
              id: "123",
              title: "Inception",
              category: "Sci-Fi",
              posterUrl: "/test-inception.jpg",
            },
          ],
        },
        version: 0,
      })
    );
  });

  await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("Inception")).toBeVisible({ timeout: 10000 });
});

  // test("should display movies in wishlist", async ({ page }) => {
  //   await page.addInitScript(() => {
  //     (window as any).__wishlistSeed__ = [
  //       {
  //         id: "123",
  //         title: "Inception",
  //         category: "Sci-Fi",
  //         posterUrl: "/test-inception.jpg",
  //       },
  //     ];
  //   });

  //   await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

  //   await page.evaluate(() => {
  //     if ((window as any).__wishlistSeed__) {
  //       (window as any).__setWishlistForTests((window as any).__wishlistSeed__);
  //     }
  //   });

  //   await expect(page.getByText("Inception")).toBeVisible();
  // });

  // test("should remove a movie from wishlist", async ({ page }) => {
  //   // Preload a movie into persisted store
  //   await page.addInitScript(() => {
  //     localStorage.setItem(
  //       "wishlist-storage",
  //       JSON.stringify({
  //         state: {
  //           items: [
  //             {
  //               id: "456",
  //               title: "The Dark Knight",
  //               category: "Action",
  //               posterUrl: "/test-tdk.jpg",
  //             },
  //           ],
  //         },
  //         version: 0,
  //       })
  //     );
  //   });

  //   await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

  //   const removeButton = page.getByTestId("remove-wishlist-button");
  //   await expect(removeButton).toBeVisible();

  //   await removeButton.click();

  //   await expect(
  //     page.getByText("The Dark Knight removed from wishlist")
  //   ).toBeVisible();

  //   await expect(page.getByTestId("no-page")).toBeVisible();
  // });
});
