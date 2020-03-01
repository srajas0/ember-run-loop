import Component from '@ember/component';
import { later, next, run, schedule, scheduleOnce } from '@ember/runloop';

export default Component.extend({
    isError: false,
    didRender() {
        this._super(...arguments);
        console.log(`didrendered ${this.label}`);     
    },
    _syncBinding() {
        // didRender will be called only once, how many times you changes
        this.set('isError', true);
        this.set('isError', false);
        this.set('isError', false);
        this.set('isError', true);
        this.set('isError', true);
        this.set('isError', false);
    },
    _Wrappers() {
        // didRender will be called three times.
        run(() => {
            this.set('isError', true);
        });
        run(() => {
            this.set('isError', false);
        });
        run(() => {
            this.set('isError', true);
        });

        // run(() => {
        //     this.set('isError', true);
        // });
    },
    _schedulers() {
        // These will be called after the our above custom run loops.
        schedule('render', this, () => {
            console.log('schedule rendering');
        });
        schedule('afterRender', this, () => {
            console.log('schedule afterRendering');
        });
        schedule('destroy', this, () => {
            console.log('schedule destroying');
        });
    },
    actions: {
        focusedOut() {
            this._syncBinding();
            // this._schedulers();
            // this._Wrappers();
        }
    }
});
