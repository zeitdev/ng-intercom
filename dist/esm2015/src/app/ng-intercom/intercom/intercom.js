/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, PLATFORM_ID, Optional, isDevMode, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { IntercomConfig } from '../shared/intercom-config';
/**
 * A provider with every Intercom.JS method
 */
export class Intercom {
    /**
     * @param {?} config
     * @param {?} platformId
     * @param {?} router
     * @param {?} rendererFactory
     * @param {?} document
     */
    constructor(config, platformId, router, rendererFactory, document // Document
    ) {
        this.config = config;
        this.platformId = platformId;
        this.router = router;
        this.rendererFactory = rendererFactory;
        this.document = document;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.renderer2 = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
        // Subscribe to router changes
        if (config && config.updateOnRouterChange) {
            this.router.events.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event instanceof NavigationEnd))).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                this.update();
            }));
        }
        else if (isDevMode()) {
            console.warn(`
      Common practice in single page applications is to update whenever the route changes.
      ng-intercom supports this functionality out of the box just set 'updateOnRouterChange' to true in your Intercom Module config.
       This warning will not appear in production, if you choose not to use router updating.
     `);
        }
    }
    /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     * @param {?=} intercomData
     * @return {?}
     */
    boot(intercomData) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        /** @type {?} */
        const app_id = intercomData.app_id ? intercomData.app_id : this.config.appId
        // Run load and attach to window
        ;
        // Run load and attach to window
        this.loadIntercom(this.config, (/**
         * @param {?=} event
         * @return {?}
         */
        (event) => {
            // then boot the intercom js
            /** @type {?} */
            const data = Object.assign({}, intercomData, { app_id });
            return this._callIntercom('boot', data);
        }));
    }
    /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     * @return {?}
     */
    shutdown() {
        return this._callIntercom('shutdown');
    }
    /**
     * Calling the update method without any other arguments will trigger the JavaScript to look for new messages
     * that should be displayed to the current user (the one whose details are in the window.intercomSettings variable)
     * and show them if they exist.
     *
     * Calling the update method with a JSON object of user details will update those fields on the current user
     * in addition to logging an impression at the current URL and looking for new messages for the user.
     * @param {?=} data
     * @return {?}
     */
    update(data) {
        return this._callIntercom('update', data);
    }
    /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     * @return {?}
     */
    hide() {
        return this._callIntercom('hide');
    }
    /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     * @param {?=} message
     * @return {?}
     */
    show(message) {
        if (message) {
            return this.showNewMessage(message);
        }
        return this._callIntercom('show');
    }
    /**
     * To open the message window with the message list you can call `showMessages()`.
     * @return {?}
     */
    showMessages() {
        return this._callIntercom('showMessages');
    }
    /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     * @param {?=} message
     * @return {?}
     */
    showNewMessage(message) {
        return this._callIntercom('showNewMessage', message);
    }
    /**
     * You can submit an event using the trackEvent method.
     * This will associate the event with the currently logged in user and send it to Intercom.
     * The final parameter is a map that can be used to send optional metadata about the event.
     *
     * You can also add custom information to events in the form of event metadata.
     * @param {?} eventName
     * @param {?=} metadata
     * @return {?}
     */
    trackEvent(eventName, metadata) {
        return this._callIntercom('trackEvent', eventName, metadata);
    }
    /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     * @return {?}
     */
    getVisitorId() {
        return this._callIntercom('getVisitorId');
    }
    /**
     * Alias for getVisitorId()
     * \@alias getVisitorId()
     * \@readonly
     * @return {?}
     */
    get visitorId() {
        return this._callIntercom('getVisitorId');
    }
    /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onShow(handler) {
        return this._callIntercom('onShow', handler);
    }
    /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onHide(handler) {
        return this._callIntercom('onHide', handler);
    }
    /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     * @param {?} handler
     * @return {?}
     */
    onUnreadCountChange(handler) {
        return this._callIntercom('onUnreadCountChange', handler);
    }
    /**
     * If you would like to trigger a tour based on an action a user or visitor takes in your site or application,
     * ou can use this API method. You need to call this method with the id of the tour you wish to show. The id of
     * the tour can be found in the “Use tour everywhere” section of the tour editor.
     *
     * Please note that tours shown via this API must be published and the “Use tour everywhere” section must be
     * turned on. If you're calling this API using an invalid tour id, nothing will happen.
     * @param {?} tourId
     * @return {?}
     */
    startTour(tourId) {
        return this._callIntercom('startTour', tourId);
    }
    /**
     * Private handler to run Intercom methods safely
     * @private
     * @param {?} fn
     * @param {...?} args
     * @return {?}
     */
    _callIntercom(fn, ...args) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (((/** @type {?} */ (window))).Intercom) {
            return ((/** @type {?} */ (window))).Intercom(fn, ...args);
        }
        return;
    }
    /**
     * @param {?} conf
     * @param {?} afterInjectCallback
     * @return {?}
     */
    injectIntercomScript(conf, afterInjectCallback) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        // Set the window configuration to conf
        ((/** @type {?} */ (window))).intercomSettings = conf;
        // Create the intercom script in document
        /** @type {?} */
        const s = this.document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${this.id}`;
        if (((/** @type {?} */ (s))).attachEvent) {
            ((/** @type {?} */ (s))).attachEvent('onload', afterInjectCallback);
        }
        else {
            s.addEventListener('load', afterInjectCallback, false);
        }
        if (this.renderer2 && this.renderer2.appendChild) {
            this.renderer2.appendChild(this.document.head, s);
        }
        ((/** @type {?} */ (window))).Intercom('update', conf);
    }
    /**
     * @param {?} config
     * @param {?} afterLoadCallback
     * @return {?}
     */
    loadIntercom(config, afterLoadCallback) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.id = config.appId;
        /** @type {?} */
        const w = (/** @type {?} */ (window));
        /** @type {?} */
        const ic = w.Intercom
        // Set window config for Intercom
        ;
        // Set window config for Intercom
        w.intercomSettings = config;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', config);
            afterLoadCallback();
        }
        else {
            /** @type {?} */
            const i = (/**
             * @return {?}
             */
            function () {
                i.c(arguments);
            });
            i.q = [];
            i.c = (/**
             * @param {?} args
             * @return {?}
             */
            function (args) {
                i.q.push(args);
            });
            w.Intercom = i;
            this.injectIntercomScript(config, afterLoadCallback);
        }
    }
}
Intercom.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Intercom.ctorParameters = () => [
    { type: IntercomConfig, decorators: [{ type: Inject, args: [IntercomConfig,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: Router, decorators: [{ type: Optional }, { type: Inject, args: [Router,] }] },
    { type: RendererFactory2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.id;
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.renderer2;
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Intercom.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.router;
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.rendererFactory;
    /**
     * @type {?}
     * @private
     */
    Intercom.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjb20uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1pbnRlcmNvbS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmctaW50ZXJjb20vaW50ZXJjb20vaW50ZXJjb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFhLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3BJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUN2QyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUE7Ozs7QUFPMUQsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7O0lBTW5CLFlBQ2tDLE1BQXNCLEVBQ3ZCLFVBQWtCLEVBQ2IsTUFBYyxFQUMxQyxlQUFpQyxFQUNILFFBQWEsQ0FBQyxXQUFXOztRQUovQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMxQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDSCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBR25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xFLEVBQUUsRUFBRSxJQUFJO1lBQ1IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsTUFBTSxFQUFFLEVBQUU7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QUFHLEVBQUUsQ0FBQTtZQUNSLENBQUMsQ0FBQyxDQUFDOzs7O1lBQUcsVUFBVSxJQUFTO2dCQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoQixDQUFDLENBQUEsQ0FBQTtZQUNELENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBO1lBQ2QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1NBQ3JEO0lBRUgsQ0FBQzs7O1lBbFFGLFVBQVU7Ozs7WUFORixjQUFjLHVCQWNsQixNQUFNLFNBQUMsY0FBYztZQUNxQixNQUFNLHVCQUFoRCxNQUFNLFNBQUMsV0FBVztZQWxCZCxNQUFNLHVCQW1CVixRQUFRLFlBQUksTUFBTSxTQUFDLE1BQU07WUFyQjRDLGdCQUFnQjs0Q0F1QnJGLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTs7Ozs7OztJQVQ5QixzQkFBa0I7Ozs7O0lBRWxCLDZCQUE0Qjs7Ozs7SUFHMUIsMEJBQXNEOzs7OztJQUN0RCw4QkFBaUQ7Ozs7O0lBQ2pELDBCQUFrRDs7Ozs7SUFDbEQsbUNBQXlDOzs7OztJQUN6Qyw0QkFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lELCBPcHRpb25hbCwgaXNEZXZNb2RlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJ1xuXG5pbXBvcnQgeyBJbnRlcmNvbUNvbmZpZyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmNvbS1jb25maWcnXG5pbXBvcnQgeyBCb290SW5wdXQgfSBmcm9tICcuLi90eXBlcy9ib290LWlucHV0J1xuXG4vKipcbiAqIEEgcHJvdmlkZXIgd2l0aCBldmVyeSBJbnRlcmNvbS5KUyBtZXRob2RcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEludGVyY29tIHtcblxuICBwcml2YXRlIGlkOiBzdHJpbmdcblxuICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyXG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChJbnRlcmNvbUNvbmZpZykgcHJpdmF0ZSBjb25maWc6IEludGVyY29tQ29uZmlnLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChSb3V0ZXIpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55IC8vIERvY3VtZW50XG5cbiAgKSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyMiA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHRoaXMuZG9jdW1lbnQsIHtcbiAgICAgIGlkOiAnLTEnLFxuICAgICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICAgIHN0eWxlczogW10sXG4gICAgICBkYXRhOiB7fVxuICAgIH0pXG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gcm91dGVyIGNoYW5nZXNcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy51cGRhdGVPblJvdXRlckNoYW5nZSkge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFxuICAgICAgQ29tbW9uIHByYWN0aWNlIGluIHNpbmdsZSBwYWdlIGFwcGxpY2F0aW9ucyBpcyB0byB1cGRhdGUgd2hlbmV2ZXIgdGhlIHJvdXRlIGNoYW5nZXMuXG4gICAgICBuZy1pbnRlcmNvbSBzdXBwb3J0cyB0aGlzIGZ1bmN0aW9uYWxpdHkgb3V0IG9mIHRoZSBib3gganVzdCBzZXQgJ3VwZGF0ZU9uUm91dGVyQ2hhbmdlJyB0byB0cnVlIGluIHlvdXIgSW50ZXJjb20gTW9kdWxlIGNvbmZpZy5cbiAgICAgICBUaGlzIHdhcm5pbmcgd2lsbCBub3QgYXBwZWFyIGluIHByb2R1Y3Rpb24sIGlmIHlvdSBjaG9vc2Ugbm90IHRvIHVzZSByb3V0ZXIgdXBkYXRpbmcuXG4gICAgIGApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHlvdSdkIGxpa2UgdG8gY29udHJvbCB3aGVuIEludGVyY29tIGlzIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlICdib290JyBtZXRob2QuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGluIHNpdHVhdGlvbnMgbGlrZSBhIG9uZS1wYWdlIEphdmFzY3JpcHQgYmFzZWQgYXBwbGljYXRpb24gd2hlcmUgdGhlIHVzZXIgbWF5IG5vdCBiZSBsb2dnZWQgaW5cbiAgICogd2hlbiB0aGUgcGFnZSBsb2Fkcy4gWW91IGNhbGwgdGhpcyBtZXRob2Qgd2l0aCB0aGUgc3RhbmRhcmQgaW50ZXJjb21TZXR0aW5ncyBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYm9vdChpbnRlcmNvbURhdGE/OiBCb290SW5wdXQpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhcHBfaWQgPSBpbnRlcmNvbURhdGEuYXBwX2lkID8gaW50ZXJjb21EYXRhLmFwcF9pZCA6IHRoaXMuY29uZmlnLmFwcElkXG4gICAgLy8gUnVuIGxvYWQgYW5kIGF0dGFjaCB0byB3aW5kb3dcbiAgICB0aGlzLmxvYWRJbnRlcmNvbSh0aGlzLmNvbmZpZywgKGV2ZW50PzogRXZlbnQpID0+IHtcbiAgICAgIC8vIHRoZW4gYm9vdCB0aGUgaW50ZXJjb20ganNcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIC4uLmludGVyY29tRGF0YSxcbiAgICAgICAgYXBwX2lkXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9jYWxsSW50ZXJjb20oJ2Jvb3QnLCBkYXRhKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IGhhdmUgdGhlIFJlc3BvbmQgcHJvZHVjdCAoY29tYmluZWQgd2l0aCBhbm90aGVyIHByb2R1Y3QgbGlrZSBFbmdhZ2UpXG4gICAqIHlvdSBzaG91bGQgY2FsbCB0aGUgSW50ZXJjb20gc2h1dGRvd24gbWV0aG9kIHRvIGNsZWFyIHlvdXIgdXNlcnPigJkgY29udmVyc2F0aW9ucyBhbnl0aW1lIHRoZXkgbG9nb3V0XG4gICAqIG9mIHlvdXIgYXBwbGljYXRpb24uIE90aGVyd2lzZSwgdGhlIGNvb2tpZSB3ZSB1c2UgdG8gdHJhY2sgd2hvIHdhcyBtb3N0IHJlY2VudGx5IGxvZ2dlZCBpbiBvbiBhIGdpdmVuIGRldmljZVxuICAgKiBvciBjb21wdXRlciB3aWxsIGtlZXAgdGhlc2UgY29udmVyc2F0aW9ucyBpbiB0aGUgTWVzc2VuZ2VyIGZvciBvbmUgd2Vlay5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBlZmZlY3RpdmVseSBjbGVhciBvdXQgYW55IHVzZXIgZGF0YSB0aGF0IHlvdSBoYXZlIGJlZW4gcGFzc2luZyB0aHJvdWdoIHRoZSBKUyBBUEkuXG4gICAqL1xuICBwdWJsaWMgc2h1dGRvd24oKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxJbnRlcmNvbSgnc2h1dGRvd24nKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhlIHVwZGF0ZSBtZXRob2Qgd2l0aG91dCBhbnkgb3RoZXIgYXJndW1lbnRzIHdpbGwgdHJpZ2dlciB0aGUgSmF2YVNjcmlwdCB0byBsb29rIGZvciBuZXcgbWVzc2FnZXNcbiAgICogdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSBjdXJyZW50IHVzZXIgKHRoZSBvbmUgd2hvc2UgZGV0YWlscyBhcmUgaW4gdGhlIHdpbmRvdy5pbnRlcmNvbVNldHRpbmdzIHZhcmlhYmxlKVxuICAgKiBhbmQgc2hvdyB0aGVtIGlmIHRoZXkgZXhpc3QuXG4gICAqXG4gICAqIENhbGxpbmcgdGhlIHVwZGF0ZSBtZXRob2Qgd2l0aCBhIEpTT04gb2JqZWN0IG9mIHVzZXIgZGV0YWlscyB3aWxsIHVwZGF0ZSB0aG9zZSBmaWVsZHMgb24gdGhlIGN1cnJlbnQgdXNlclxuICAgKiBpbiBhZGRpdGlvbiB0byBsb2dnaW5nIGFuIGltcHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgVVJMIGFuZCBsb29raW5nIGZvciBuZXcgbWVzc2FnZXMgZm9yIHRoZSB1c2VyLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkYXRhPzogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxJbnRlcmNvbSgndXBkYXRlJywgZGF0YSlcblxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBoaWRlIHRoZSBtYWluIE1lc3NlbmdlciBwYW5lbCBpZiBpdCBpcyBvcGVuLiBJdCB3aWxsIG5vdCBoaWRlIHRoZSBNZXNzZW5nZXIgTGF1bmNoZXIuXG4gICAqL1xuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdoaWRlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgc2hvdyB0aGUgTWVzc2VuZ2VyLiBJZiB0aGVyZSBhcmUgbm8gY29udmVyc2F0aW9ucyBpdCB3aWxsIG9wZW4gd2l0aCB0aGUgbmV3IG1lc3NhZ2UgdmlldyxcbiAgICogaWYgdGhlcmUgYXJlIGl0IHdpbGwgb3BlbiB3aXRoIHRoZSBtZXNzYWdlIGxpc3QuXG4gICAqXG4gICAqIElmIGEgYG1lc3NhZ2VgIHBhcmFtZXRlciBpcyBzdXBwbGllZCwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IG9wZW4gYSBuZXcgbWVzc2FnZSB3aW5kb3csIGFsaWFzaW5nIHNob3dOZXdNZXNzYWdlKCkuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgc2hvdyhtZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dOZXdNZXNzYWdlKG1lc3NhZ2UpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxsSW50ZXJjb20oJ3Nob3cnKVxuXG4gIH1cblxuICAvKipcbiAgICogVG8gb3BlbiB0aGUgbWVzc2FnZSB3aW5kb3cgd2l0aCB0aGUgbWVzc2FnZSBsaXN0IHlvdSBjYW4gY2FsbCBgc2hvd01lc3NhZ2VzKClgLlxuICAgKi9cbiAgcHVibGljIHNob3dNZXNzYWdlcygpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdzaG93TWVzc2FnZXMnKVxuICB9XG5cbiAgLyoqXG4gICAqIFRvIG9wZW4gdGhlIG1lc3NhZ2Ugd2luZG93IHdpdGggdGhlIG5ldyBtZXNzYWdlIHZpZXcgeW91IGNhbiBjYWxsIHNob3dOZXdNZXNzYWdlKCkuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJlLXBvcHVsYXRlIHRoZSBtZXNzYWdlIGNvbXBvc2VyIGFzIHNob3duIGJlbG93LlxuICAgKi9cbiAgcHVibGljIHNob3dOZXdNZXNzYWdlKG1lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdzaG93TmV3TWVzc2FnZScsIG1lc3NhZ2UpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBZb3UgY2FuIHN1Ym1pdCBhbiBldmVudCB1c2luZyB0aGUgdHJhY2tFdmVudCBtZXRob2QuXG4gICAqIFRoaXMgd2lsbCBhc3NvY2lhdGUgdGhlIGV2ZW50IHdpdGggdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlciBhbmQgc2VuZCBpdCB0byBJbnRlcmNvbS5cbiAgICogVGhlIGZpbmFsIHBhcmFtZXRlciBpcyBhIG1hcCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlbmQgb3B0aW9uYWwgbWV0YWRhdGEgYWJvdXQgdGhlIGV2ZW50LlxuICAgKlxuICAgKiBZb3UgY2FuIGFsc28gYWRkIGN1c3RvbSBpbmZvcm1hdGlvbiB0byBldmVudHMgaW4gdGhlIGZvcm0gb2YgZXZlbnQgbWV0YWRhdGEuXG4gICAqL1xuICBwdWJsaWMgdHJhY2tFdmVudChldmVudE5hbWU6IHN0cmluZywgbWV0YWRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCd0cmFja0V2ZW50JywgZXZlbnROYW1lLCBtZXRhZGF0YSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEEgdmlzaXRvciBpcyBzb21lb25lIHdobyBnb2VzIHRvIHlvdXIgc2l0ZSBidXQgZG9lcyBub3QgdXNlIHRoZSBtZXNzZW5nZXIuXG4gICAqIFlvdSBjYW4gdHJhY2sgdGhlc2UgdmlzaXRvcnMgdmlhIHRoZSB2aXNpdG9yIHVzZXJfaWQuXG4gICAqIFRoaXMgdXNlcl9pZCBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSB0aGUgdmlzaXRvciBvciBsZWFkIHRocm91Z2ggdGhlIFJFU1QgQVBJLlxuICAgKi9cbiAgcHVibGljIGdldFZpc2l0b3JJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jYWxsSW50ZXJjb20oJ2dldFZpc2l0b3JJZCcpXG4gIH1cblxuICAvKipcbiAgICogQWxpYXMgZm9yIGdldFZpc2l0b3JJZCgpXG4gICAqIEBhbGlhcyBnZXRWaXNpdG9ySWQoKVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGdldCB2aXNpdG9ySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdnZXRWaXNpdG9ySWQnKVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVzIHlvdSB0aGUgYWJpbGl0eSB0byBob29rIGludG8gdGhlIHNob3cgZXZlbnQuIFJlcXVpcmVzIGEgZnVuY3Rpb24gYXJndW1lbnQuXG4gICAqL1xuICBwdWJsaWMgb25TaG93KGhhbmRsZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdvblNob3cnLCBoYW5kbGVyKVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVzIHlvdSB0aGUgYWJpbGl0eSB0byBob29rIGludG8gdGhlIGhpZGUgZXZlbnQuIFJlcXVpcmVzIGEgZnVuY3Rpb24gYXJndW1lbnQuXG4gICAqL1xuICBwdWJsaWMgb25IaWRlKGhhbmRsZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdvbkhpZGUnLCBoYW5kbGVyKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gcmVnaXN0ZXIgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHVucmVhZCBtZXNzYWdlcyBjaGFuZ2VzLlxuICAgKi9cbiAgcHVibGljIG9uVW5yZWFkQ291bnRDaGFuZ2UoaGFuZGxlcjogKHVucmVhZENvdW50PzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxJbnRlcmNvbSgnb25VbnJlYWRDb3VudENoYW5nZScsIGhhbmRsZXIpXG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IHdvdWxkIGxpa2UgdG8gdHJpZ2dlciBhIHRvdXIgYmFzZWQgb24gYW4gYWN0aW9uIGEgdXNlciBvciB2aXNpdG9yIHRha2VzIGluIHlvdXIgc2l0ZSBvciBhcHBsaWNhdGlvbiwgXG4gICAqIG91IGNhbiB1c2UgdGhpcyBBUEkgbWV0aG9kLiBZb3UgbmVlZCB0byBjYWxsIHRoaXMgbWV0aG9kIHdpdGggdGhlIGlkIG9mIHRoZSB0b3VyIHlvdSB3aXNoIHRvIHNob3cuIFRoZSBpZCBvZiBcbiAgICogdGhlIHRvdXIgY2FuIGJlIGZvdW5kIGluIHRoZSDigJxVc2UgdG91ciBldmVyeXdoZXJl4oCdIHNlY3Rpb24gb2YgdGhlIHRvdXIgZWRpdG9yLlxuICAgKlxuICAgKiBQbGVhc2Ugbm90ZSB0aGF0IHRvdXJzIHNob3duIHZpYSB0aGlzIEFQSSBtdXN0IGJlIHB1Ymxpc2hlZCBhbmQgdGhlIOKAnFVzZSB0b3VyIGV2ZXJ5d2hlcmXigJ0gc2VjdGlvbiBtdXN0IGJlIFxuICAgKiB0dXJuZWQgb24uIElmIHlvdSdyZSBjYWxsaW5nIHRoaXMgQVBJIHVzaW5nIGFuIGludmFsaWQgdG91ciBpZCwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICovXG4gIHB1YmxpYyBzdGFydFRvdXIodG91cklkOiBudW1iZXIpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEludGVyY29tKCdzdGFydFRvdXInLCB0b3VySWQpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBoYW5kbGVyIHRvIHJ1biBJbnRlcmNvbSBtZXRob2RzIHNhZmVseVxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsbEludGVyY29tKGZuOiBzdHJpbmcsIC4uLmFyZ3MpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoKDxhbnk+d2luZG93KS5JbnRlcmNvbSkge1xuICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuSW50ZXJjb20oZm4sIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgaW5qZWN0SW50ZXJjb21TY3JpcHQoY29uZjogSW50ZXJjb21Db25maWcsIGFmdGVySW5qZWN0Q2FsbGJhY2s6IChldjogRXZlbnQpID0+IGFueSk6IHZvaWQge1xuXG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIHdpbmRvdyBjb25maWd1cmF0aW9uIHRvIGNvbmZcbiAgICAoPGFueT53aW5kb3cpLmludGVyY29tU2V0dGluZ3MgPSBjb25mXG5cbiAgICAvLyBDcmVhdGUgdGhlIGludGVyY29tIHNjcmlwdCBpbiBkb2N1bWVudFxuICAgIGNvbnN0IHMgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgcy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBzLmFzeW5jID0gdHJ1ZVxuICAgIHMuc3JjID0gYGh0dHBzOi8vd2lkZ2V0LmludGVyY29tLmlvL3dpZGdldC8ke3RoaXMuaWR9YFxuXG4gICAgaWYgKChzIGFzIGFueSkuYXR0YWNoRXZlbnQpIHtcbiAgICAgIChzIGFzIGFueSkuYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGFmdGVySW5qZWN0Q2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFmdGVySW5qZWN0Q2FsbGJhY2ssIGZhbHNlKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnJlbmRlcmVyMiAmJiB0aGlzLnJlbmRlcmVyMi5hcHBlbmRDaGlsZCkge1xuICAgICAgdGhpcy5yZW5kZXJlcjIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCBzKVxuICAgIH1cblxuICAgICg8YW55PndpbmRvdykuSW50ZXJjb20oJ3VwZGF0ZScsIGNvbmYpXG4gIH1cblxuICBsb2FkSW50ZXJjb20oY29uZmlnOiBJbnRlcmNvbUNvbmZpZywgYWZ0ZXJMb2FkQ2FsbGJhY2s6IChldj86IEV2ZW50KSA9PiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuaWQgPSBjb25maWcuYXBwSWRcbiAgICBjb25zdCB3ID0gPGFueT53aW5kb3dcbiAgICBjb25zdCBpYyA9IHcuSW50ZXJjb21cblxuICAgIC8vIFNldCB3aW5kb3cgY29uZmlnIGZvciBJbnRlcmNvbVxuICAgIHcuaW50ZXJjb21TZXR0aW5ncyA9IGNvbmZpZ1xuXG4gICAgaWYgKHR5cGVvZiBpYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWMoJ3JlYXR0YWNoX2FjdGl2YXRvcicpXG4gICAgICBpYygndXBkYXRlJywgY29uZmlnKVxuICAgICAgYWZ0ZXJMb2FkQ2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpOiBhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGkuYyhhcmd1bWVudHMpXG4gICAgICB9XG4gICAgICBpLnEgPSBbXVxuICAgICAgaS5jID0gZnVuY3Rpb24gKGFyZ3M6IGFueSkge1xuICAgICAgICBpLnEucHVzaChhcmdzKVxuICAgICAgfVxuICAgICAgdy5JbnRlcmNvbSA9IGlcbiAgICAgIHRoaXMuaW5qZWN0SW50ZXJjb21TY3JpcHQoY29uZmlnLCBhZnRlckxvYWRDYWxsYmFjaylcbiAgICB9XG5cbiAgfVxufVxuIl19