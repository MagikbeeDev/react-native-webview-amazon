import React from 'react';
import { WebViewAmazonErrorEvent, WebViewAmazonHttpErrorEvent, WebViewAmazonMessageEvent, WebViewAmazonNavigationEvent, WebViewAmazonProgressEvent, WebViewAmazonTerminatedEvent, IOSWebViewAmazonProps, NativeWebViewAmazonIOS, State } from './WebViewAmazonTypes';
declare class WebViewAmazon extends React.Component<IOSWebViewAmazonProps, State> {
    static defaultProps: {
        javaScriptEnabled: boolean;
        cacheEnabled: boolean;
        originWhitelist: string[];
        useSharedProcessPool: boolean;
    };
    static isFileUploadSupported: () => Promise<boolean>;
    state: State;
    webViewRef: React.RefObject<NativeWebViewAmazonIOS>;
    getCommands: () => {
        goForward: number;
        goBack: number;
        reload: number;
        stopLoading: number;
        postMessage: number;
        injectJavaScript: number;
        loadUrl: number;
        requestFocus: number;
    };
    /**
     * Go forward one page in the web view's history.
     */
    goForward: () => void;
    /**
     * Go back one page in the web view's history.
     */
    goBack: () => void;
    /**
     * Reloads the current page.
     */
    reload: () => void;
    /**
     * Stop loading the current page.
     */
    stopLoading: () => void;
    /**
     * Request focus on WebViewAmazon rendered page.
     */
    requestFocus: () => void;
    /**
     * Posts a message to the web view, which will emit a `message` event.
     * Accepts one argument, `data`, which must be a string.
     *
     * In your webview, you'll need to something like the following.
     *
     * ```js
     * document.addEventListener('message', e => { document.title = e.data; });
     * ```
     */
    postMessage: (data: string) => void;
    /**
     * Injects a javascript string into the referenced WebViewAmazon. Deliberately does not
     * return a response because using eval() to return a response breaks this method
     * on pages with a Content Security Policy that disallows eval(). If you need that
     * functionality, look into postMessage/onMessage.
     */
    injectJavaScript: (data: string) => void;
    /**
     * We return an event with a bunch of fields including:
     *  url, title, loading, canGoBack, canGoForward
     */
    updateNavigationState: (event: WebViewAmazonNavigationEvent) => void;
    /**
     * Returns the native `WebViewAmazon` node.
     */
    getWebViewAmazonHandle: () => number;
    onLoadingStart: (event: WebViewAmazonNavigationEvent) => void;
    onLoadingError: (event: WebViewAmazonErrorEvent) => void;
    onHttpError: (event: WebViewAmazonHttpErrorEvent) => void;
    onLoadingFinish: (event: WebViewAmazonNavigationEvent) => void;
    onMessage: (event: WebViewAmazonMessageEvent) => void;
    onLoadingProgress: (event: WebViewAmazonProgressEvent) => void;
    onShouldStartLoadWithRequestCallback: (shouldStart: boolean, _url: string, lockIdentifier: number) => void;
    onContentProcessDidTerminate: (event: WebViewAmazonTerminatedEvent) => void;
    componentDidUpdate(prevProps: IOSWebViewAmazonProps): void;
    showRedboxOnPropChanges(prevProps: IOSWebViewAmazonProps, propName: keyof IOSWebViewAmazonProps): void;
    render(): JSX.Element;
}
export default WebViewAmazon;
//# sourceMappingURL=WebViewAmazon.ios.d.ts.map