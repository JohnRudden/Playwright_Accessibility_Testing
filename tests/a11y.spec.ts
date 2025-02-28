import {test, expect} from '@playwright/test';  
import {AxeBuilder} from '@axe-core/playwright';
import { AxeResults } from 'axe-core';


let violations: AxeResults['violations'];

test.beforeEach(async ({page}) => {
  await page.goto('https://www.playwright.dev');
  const results = await new AxeBuilder({page}).withTags(["wcga2a", "wcga2aa"]).withRules([ 'accesskeys',
    'area-alt',
    'aria-allowed-role',
    'aria-braille-equivalent',
    'aria-conditional-attr',
    'aria-deprecated-role',
    'aria-dialog-name',
    'aria-prohibited-attr',
    'aria-roledescription',
    'aria-treeitem-name',
    'aria-text',
    'audio-caption',
    'blink',
    'duplicate-id',
    'empty-heading',
    'frame-focusable-content',
    'frame-title-unique',
    'heading-order',
    'html-xml-lang-mismatch',
    'identical-links-same-purpose',
    'image-redundant-alt',
    'input-button-name',
    'label-content-name-mismatch',
    'landmark-one-main',
    'link-in-text-block',
    'marquee',
    'meta-viewport',
    'nested-interactive',
    'no-autoplay-audio',
    'role-img-alt',
    'scrollable-region-focusable',
    'select-name',
    'server-side-image-map',
    'skip-link',
    'summary-name',
    'svg-img-alt',
    'tabindex',
    'table-duplicate-name',
    'table-fake-caption',
    'target-size',
    'td-has-header',
]).analyze();
  violations = results.violations;
  console.log(violations);
});

test('Accessibility test - fail if any violations are found', async ({page}) => {
  expect(violations.length).toBe(0);   
});

test('Accessibility test - fail if any serious violations are found', async ({page}) => {
  await page.goto('https://www.playwright.dev');
  const results = await new AxeBuilder({page}).analyze(); 
  const areSerious = violations.some(violation => violation.impact === 'serious');
  expect(areSerious).toBe(false);
});

test('Accessibility test - fail if more than 1 moderate violation found', async ({page}) => {
  const moderateCount = violations.filter(violation => violation.impact === 'moderate').length;
  expect(moderateCount).toBeLessThanOrEqual(1);
});