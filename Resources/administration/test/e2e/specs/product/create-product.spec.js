module.exports = {
    'open product listing': (browser) => {
        browser
            // open product listing
            .assert.containsText('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text', 'Products')
            .click('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]')
            .waitForElementVisible('.smart-bar__actions a')
            .waitForElementVisible('.sw-page__smart-bar-amount')
            .assert.containsText('.sw-page__smart-bar-amount', '(0)');
    },
    'goto create page, fill and save': (browser) => {
        browser
            .click('a[href="#/sw/product/create"]')
            .waitForElementVisible('.sw-product-detail-base')
            .assert.urlContains('#/sw/product/create')
            .assert.containsText('.sw-card__title', 'Information')
            .setValue('input[name=sw-field--product-name]', 'Marci Darci')
            .setValue('select[name=sw-field--product-manufacturerId]', 'shopware AG')
            .setValue('select[name=sw-field--product-catalogId]', 'Default catalogue')
            .setValue('select[name=sw-field--product-taxId]', '19%')
            .setValue('input[name=sw-field--price-gross]', '99')
            .click('.smart-bar__actions button.sw-button--primary')
            .waitForElementVisible('.sw-notifications .sw-alert')
            .assert.containsText('.sw-alert__message', 'The product "Marci Darci" was saved successfully.')
            .assert.urlContains('#/sw/product/detail');
    },
    'go back to listing, search and verify creation': (browser) => {
        browser
            .click('a.smart-bar__back-btn')
            .waitForElementVisible('.sw-product-list__content')
            .setValue('input.sw-search-bar__input', ['Marci Darci', browser.Keys.ENTER])
            .click('.sw-alert button.sw-alert__close')
            .waitForElementNotPresent('.sw-alert__message')
            .waitForElementVisible('.sw-page__smart-bar-amount')
            .assert.containsText('.sw-page__smart-bar-amount', '(1)');
    },
    'delete created product and verify deletion': (browser) => {
        browser
            .assert.containsText('.sw-grid-row:first-child .sw-grid-column a', 'Marci Darci')
            .click('.sw-grid-row:first-child .sw-context-button__button')
            .waitForElementPresent('body > .sw-context-menu')
            .click('body > .sw-context-menu .sw-context-menu-item--danger')
            .waitForElementVisible('.sw-modal')
            .assert.containsText('.sw-modal .sw-product-list__confirm-delete-text', 'Do you really want to delete the product "Marci Darci"?')
            .click('.sw-modal__footer button.sw-button--primary')
            .pause(1000)
            .assert.containsText('.sw-page__smart-bar-amount', '(0)')
            .end();
    }
};
