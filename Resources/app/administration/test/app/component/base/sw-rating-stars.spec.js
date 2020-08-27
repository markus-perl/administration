import { createLocalVue, shallowMount } from '@vue/test-utils';
import 'src/app/component/base/sw-rating-stars';

function createWrapper(propsData = {}) {
    const localVue = createLocalVue();
    localVue.directive('tooltip', {});

    return shallowMount(Shopware.Component.build('sw-rating-stars'), {
        localVue,
        stubs: {
            'sw-icon': true
        },
        provide: {
        },
        mocks: {
            $tc: () => {}
        },
        propsData: {
            ...{
                value: 3.5
            },
            ...propsData
        }
    });
}

const cases = {
    full: [
        { value: 2.0, renderPercentage: 0 },
        { value: 3.0, renderPercentage: 0 },
        { value: 7.0, renderPercentage: 0 },
        { value: 12.2, renderPercentage: 35 }
    ],
    partial: [
        { value: 1.3, renderPercentage: 35 },
        { value: 2.5, renderPercentage: 50 },
        { value: 1.4, renderPercentage: 50 },
        { value: 2.15, renderPercentage: 35 },
        { value: 1.8, renderPercentage: 65 }
    ]
};

describe('src/app/component/base/sw-rating-stars', () => {
    it('should be a Vue.js component', () => {
        const wrapper = createWrapper();

        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    const maxStarCases = [5, 3, 8];

    maxStarCases.forEach((maxStars) => {
        it(`should round render float values per default into full stars (MaxStars = ${maxStars})`, () => {
            cases.full.forEach(({ value }) => {
                const wrapper = createWrapper({ value, maxStars });

                const partialStar = wrapper.find('.star-partial');
                expect(partialStar.exists()).toBeFalsy();
            });
        });
    });

    maxStarCases.forEach((maxStars) => {
        it(`should round render float values per default into quarter stars (MaxStars = ${maxStars})`, () => {
            cases.partial.forEach(({ value, renderPercentage }) => {
                const wrapper = createWrapper({ value, maxStars });

                const partialStar = wrapper.find('.star-partial');
                expect(partialStar.attributes().style).toContain(`clip-path: inset(0 ${100 - renderPercentage}% 0 0);`);
            });
        });
    });
});
