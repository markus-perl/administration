/// <reference types="Cypress" />

import CustomerPageObject from '../../../support/pages/module/sw-customer.page-object';

let product;
let storefrontCustomer;

describe('Dashboard:  Visual tests', () => {
    beforeEach(() => {
        cy.setToInitialState()
            .then(() => {
                // freezes the system time to Jan 1, 2018
                const now = new Date(2018, 1, 1);
                cy.clock(now);
            })
            .then(() => {
                cy.loginViaApi();
            })
            .then(() => {
                return cy.createProductFixture();
            })
            .then(() => {
                return cy.searchViaAdminApi({
                    endpoint: 'product',
                    data: {
                        field: 'name',
                        value: 'Product name'
                    }
                });
            })
            .then((result) => {
                return cy.createGuestOrder(result.id);
            })
            .then(() => {
                return cy.fixture('product')
            })
            .then((result) => {
                product = result;
            })
            .then(() => {
                return cy.fixture('storefront-customer')
            })
            .then((result) => {
                storefrontCustomer = result;
            })
            .then(() => {
                cy.openInitialPage(`${Cypress.env('admin')}`);
            });
    });

    it('@visual: check appearance of basic dashboard workflow', () => {
        // Take snapshot for visual testing
        cy.takeSnapshot('Customer detail - address listing', '.sw-dashboard-index__content');
    });
});
