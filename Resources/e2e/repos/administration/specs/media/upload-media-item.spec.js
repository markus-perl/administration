module.exports = {
    '@tags': ['media-upload'],
    'open media listing': (browser) => {
        browser
            .openMainMenuEntry('#/sw/media/index', 'Media')
            .assert.urlContains('#/sw/media/index');
    },
    'upload and create new media item': (browser) => {
        browser
            .waitForElementVisible('.sw-media-upload__url-upload-action')
            .click('.sw-media-upload__url-upload-action')
            .waitForElementVisible('.sw-media-url-form')
            .fillField('input[name=sw-field--url]', `${process.env.APP_URL}/bundles/administration/static/fixtures/sw-login-background.png`)
            .click('.sw-modal__footer .sw-button--primary')
            .waitForElementVisible('.sw-alert--success')
            .click('.sw-alert__close');
    },
    'look and search for the items in media index': (browser) => {
        browser
            .fillGlobalSearchField('sw-login-background')
            .refresh()
            .waitForElementVisible('.sw-media-media-item:nth-of-type(1)');
    },
    'click preview thumbnail to open sidebar': (browser) => {
        browser
            .click('.sw-media-preview__item:nth-of-type(1)')
            .waitForElementVisible('.sw-sidebar-item__content');
    },
    'verify meta data': (browser) => {
        browser
            .assert.containsText('.sw-media-quickinfo-metadata-name', 'Name:')
            .assert.containsText('.sw-media-quickinfo-metadata-name', 'sw-login-background')
            .assert.containsText('.sw-media-quickinfo-metadata-mimeType', 'MIME-Type:')
            .assert.containsText('.sw-media-quickinfo-metadata-mimeType', 'image/png')
            .assert.containsText('.sw-media-quickinfo-metadata-size', 'Size:')
            .assert.containsText('.sw-media-quickinfo-metadata-size', '501.38KB')
            .assert.containsText('.sw-media-quickinfo-metadata-createdAt', 'Uploaded at:')
            .assert.containsText('.sw-media-quickinfo-metadata-url', 'URL:');
    },
    'delete item and verify that': (browser) => {
        browser
            .click('li.quickaction--delete')
            .waitForElementVisible('div.sw-modal.sw-modal--small.sw-media-modal-delete')
            .assert.containsText('.sw-modal__body', 'Do you want to delete "sw-login-background.png" ?')
            .waitForElementVisible('.sw-modal__footer .sw-media-modal-delete__confirm')
            .click('.sw-media-modal-delete__confirm')
            .waitForElementNotPresent('.sw-modal__footer')
            .checkNotification('File "sw-login-background.png" successfully Deleted',false)
            .click('.sw-alert__close')
            .useXpath()
            .waitForElementNotPresent(`//*[contains(text(), 'File "sw-login-background.png" successfully Deleted')]`)
            .useCss()
            .checkNotification('Media item successfully deleted.');
    },
    after: (browser) => {
        browser.end();
    }
};
