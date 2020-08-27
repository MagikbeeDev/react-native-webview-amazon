/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Portions copyright for react-native-windows:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import React from 'react';
import { NativeWebViewAmazonWindows, WebViewAmazonSharedProps, WebViewAmazonProgressEvent, WebViewAmazonNavigationEvent, WebViewAmazonErrorEvent, WebViewAmazonHttpErrorEvent, WebViewAmazonMessageEvent, State } from './WebViewAmazonTypes';
export default class WebViewAmazon extends React.Component<WebViewAmazonSharedProps, State> {
    static defaultProps: {
        javaScriptEnabled: boolean;
    };
    state: State;
    webViewRef: React.RefObject<NativeWebViewAmazonWindows>;
    goForward: () => void;
    goBack: () => void;
    reload: () => void;
    injectJavaScript: (data: string) => void;
    postMessage: (data: string) => void;
    /**
     * We return an event with a bunch of fields including:
     *  url, title, loading, canGoBack, canGoForward
     */
    updateNavigationState: (event: WebViewAmazonNavigationEvent) => void;
    getWebViewAmazonHandle: () => number | null;
    onLoadingStart: (event: WebViewAmazonNavigationEvent) => void;
    onLoadingProgress: (event: WebViewAmazonProgressEvent) => void;
    onLoadingError: (event: WebViewAmazonErrorEvent) => void;
    onLoadingFinish: (event: WebViewAmazonNavigationEvent) => void;
    onMessage: (event: WebViewAmazonMessageEvent) => void;
    onHttpError: (event: WebViewAmazonHttpErrorEvent) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=WebViewAmazon.windows.d.ts.map