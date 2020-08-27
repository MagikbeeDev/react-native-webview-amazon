import { Component } from 'react';
// eslint-disable-next-line
import { IOSWebViewAmazonProps, AndroidWebViewAmazonProps } from './lib/WebViewAmazonTypes';

export { FileDownload, WebViewAmazonMessageEvent, WebViewAmazonNavigation } from "./lib/WebViewAmazonTypes";

export type WebViewAmazonProps = IOSWebViewAmazonProps & AndroidWebViewAmazonProps;

declare class WebViewAmazon extends Component<WebViewAmazonProps> {
    /**
     * Go back one page in the webview's history.
     */
    goBack: () => void;

    /**
     * Go forward one page in the webview's history.
     */
    goForward: () => void;

    /**
     * Reloads the current page.
     */
    reload: () => void;

    /**
     * Stop loading the current page.
     */
    stopLoading(): void;

    /**
     * Extra Native Component Config.
     */
    extraNativeComponentConfig: () => any;

    /**
     * Executes the JavaScript string.
     */
    injectJavaScript: (script: string) => void;

    /**
     * Focuses on WebViewAmazon redered page.
     */
    requestFocus: () => void;
}

export {WebViewAmazon};
export default WebViewAmazon;
