import React from 'react';
import { createOnShouldStartLoadWithRequest } from './WebViewAmazonShared';
import { WebViewAmazonRenderProcessGoneEvent, WebViewAmazonErrorEvent, WebViewAmazonHttpErrorEvent, WebViewAmazonMessageEvent, WebViewAmazonNavigationEvent, WebViewAmazonProgressEvent, AndroidWebViewAmazonProps, NativeWebViewAmazonAndroid, State } from './WebViewAmazonTypes';
/**
 * Renders a native WebViewAmazon.
 */
declare class WebViewAmazon extends React.Component<AndroidWebViewAmazonProps, State> {
    static defaultProps: {
        overScrollMode: string;
        javaScriptEnabled: boolean;
        thirdPartyCookiesEnabled: boolean;
        scalesPageToFit: boolean;
        allowsFullscreenVideo: boolean;
        allowFileAccess: boolean;
        saveFormDataDisabled: boolean;
        cacheEnabled: boolean;
        androidHardwareAccelerationDisabled: boolean;
        androidLayerType: string;
        originWhitelist: string[];
    };
    static isFileUploadSupported: () => Promise<any>;
    startUrl: string | null;
    state: State;
    onShouldStartLoadWithRequest: ReturnType<typeof createOnShouldStartLoadWithRequest> | null;
    webViewRef: React.RefObject<NativeWebViewAmazonAndroid>;
    messagingModuleName: string;
    componentDidMount: () => void;
    getCommands: () => {
        goForward: number;
        goBack: number;
        reload: number;
        stopLoading: number;
        postMessage: number;
        injectJavaScript: number;
        loadUrl: number;
        requestFocus: number;
        clearHistory: number;
        clearCache: number;
        clearFormData: number;
    };
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    stopLoading: () => void;
    requestFocus: () => void;
    postMessage: (data: string) => void;
    clearFormData: () => void;
    clearCache: (includeDiskFiles: boolean) => void;
    clearHistory: () => void;
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
    onRenderProcessGone: (event: WebViewAmazonRenderProcessGoneEvent) => void;
    onLoadingFinish: (event: WebViewAmazonNavigationEvent) => void;
    onMessage: (event: WebViewAmazonMessageEvent) => void;
    onLoadingProgress: (event: WebViewAmazonProgressEvent) => void;
    onShouldStartLoadWithRequestCallback: (shouldStart: boolean, url: string, lockIdentifier?: number | undefined) => void;
    render(): JSX.Element;
}
export default WebViewAmazon;
//# sourceMappingURL=WebViewAmazon.android.d.ts.map