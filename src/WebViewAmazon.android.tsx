import React from 'react';

import {
  Image,
  requireNativeComponent,
  UIManager as NotTypedUIManager,
  View,
  NativeModules,
  ImageSourcePropType,
  findNodeHandle,
} from 'react-native';

import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';

import invariant from 'invariant';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
  defaultRenderError,
  defaultRenderLoading,
} from './WebViewAmazonShared';
import {
  WebViewAmazonRenderProcessGoneEvent,
  WebViewAmazonErrorEvent,
  WebViewAmazonHttpErrorEvent,
  WebViewAmazonMessageEvent,
  WebViewAmazonNavigationEvent,
  WebViewAmazonProgressEvent,
  AndroidWebViewAmazonProps,
  NativeWebViewAmazonAndroid,
  State,
  RNCWebViewAmazonUIManagerAndroid,
} from './WebViewAmazonTypes';

import styles from './WebViewAmazon.styles';

const UIManager = NotTypedUIManager as RNCWebViewAmazonUIManagerAndroid;

const RNCWebViewAmazon = requireNativeComponent(
  'RNCWebViewAmazon',
) as typeof NativeWebViewAmazonAndroid;
const { resolveAssetSource } = Image;

/**
 * A simple counter to uniquely identify WebViewAmazon instances. Do not use this for anything else.
 */
let uniqueRef = 0;

/**
 * Renders a native WebViewAmazon.
 */
class WebViewAmazon extends React.Component<AndroidWebViewAmazonProps, State> {
  static defaultProps = {
    overScrollMode: 'always',
    javaScriptEnabled: true,
    thirdPartyCookiesEnabled: true,
    scalesPageToFit: true,
    allowsFullscreenVideo: false,
    allowFileAccess: false,
    saveFormDataDisabled: false,
    cacheEnabled: true,
    androidHardwareAccelerationDisabled: false,
    androidLayerType: 'none',
    originWhitelist: defaultOriginWhitelist,
  };

  static isFileUploadSupported = async () => {
    // native implementation should return "true" only for Android 5+
    return NativeModules.RNCWebViewAmazon.isFileUploadSupported();
  };

  startUrl: string | null = null;

  state: State = {
    viewState: this.props.startInLoadingState ? 'LOADING' : 'IDLE',
    lastErrorEvent: null,
  };

  onShouldStartLoadWithRequest: ReturnType<typeof createOnShouldStartLoadWithRequest> | null = null;

  webViewRef = React.createRef<NativeWebViewAmazonAndroid>();

  messagingModuleName = `WebViewAmazonMessageHandler${uniqueRef+=1}`;

  componentDidMount = () => {
    BatchedBridge.registerCallableModule(this.messagingModuleName, this);
  };

  getCommands = () => UIManager.getViewManagerConfig('RNCWebViewAmazon').Commands;

  goForward = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().goForward,
      undefined
    );
  };

  goBack = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().goBack,
      undefined
    );
  };

  reload = () => {
    this.setState({
      viewState: 'LOADING',
    });
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().reload,
      undefined
    );
  };

  stopLoading = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().stopLoading,
      undefined
    );
  };

  requestFocus = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().requestFocus,
      undefined
    );
  };

  postMessage = (data: string) => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().postMessage,
      [String(data)],
    );
  };

  clearFormData = () => {
    UIManager.dispatchViewManagerCommand(
       this.getWebViewAmazonHandle(),
       this.getCommands().clearFormData,
        undefined,
    );
  }

  clearCache = (includeDiskFiles: boolean) => {
    UIManager.dispatchViewManagerCommand(
       this.getWebViewAmazonHandle(),
       this.getCommands().clearCache,
       [includeDiskFiles],
    );
  };

  clearHistory = () => {
    UIManager.dispatchViewManagerCommand(
       this.getWebViewAmazonHandle(),
       this.getCommands().clearHistory,
        undefined,
    );
  };

  /**
   * Injects a javascript string into the referenced WebViewAmazon. Deliberately does not
   * return a response because using eval() to return a response breaks this method
   * on pages with a Content Security Policy that disallows eval(). If you need that
   * functionality, look into postMessage/onMessage.
   */
  injectJavaScript = (data: string) => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().injectJavaScript,
      [data],
    );
  };

  /**
   * We return an event with a bunch of fields including:
   *  url, title, loading, canGoBack, canGoForward
   */
  updateNavigationState = (event: WebViewAmazonNavigationEvent) => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  };

  /**
   * Returns the native `WebViewAmazon` node.
   */
  getWebViewAmazonHandle = () => {
    const nodeHandle = findNodeHandle(this.webViewRef.current);
    invariant(nodeHandle != null, 'nodeHandle expected to be non-null');
    return nodeHandle as number;
  };

  onLoadingStart = (event: WebViewAmazonNavigationEvent) => {
    const { onLoadStart } = this.props;
    const { nativeEvent: { url } } = event;
    this.startUrl = url;
    if (onLoadStart) {
      onLoadStart(event);
    }
    this.updateNavigationState(event);
  };

  onLoadingError = (event: WebViewAmazonErrorEvent) => {
    event.persist(); // persist this event because we need to store it
    const { onError, onLoadEnd } = this.props;
    if (onError) {
      onError(event);
    }
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    console.warn('Encountered an error loading page', event.nativeEvent);

    this.setState({
      lastErrorEvent: event.nativeEvent,
      viewState: 'ERROR',
    });
  };

  onHttpError = (event: WebViewAmazonHttpErrorEvent) => {
    const { onHttpError } = this.props;
    if (onHttpError) {
      onHttpError(event);
    }
  }

  onRenderProcessGone = (event: WebViewAmazonRenderProcessGoneEvent) => {
    const { onRenderProcessGone } = this.props;
    if (onRenderProcessGone) {
      onRenderProcessGone(event);
    }
  }

  onLoadingFinish = (event: WebViewAmazonNavigationEvent) => {
    const { onLoad, onLoadEnd } = this.props;
    const { nativeEvent: { url } } = event;
    if (onLoad) {
      onLoad(event);
    }
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    if (url === this.startUrl) {
      this.setState({
        viewState: 'IDLE',
      });
    }
    this.updateNavigationState(event);
  };

  onMessage = (event: WebViewAmazonMessageEvent) => {
    const { onMessage } = this.props;
    if (onMessage) {
      onMessage(event);
    }
  };

  onLoadingProgress = (event: WebViewAmazonProgressEvent) => {
    const { onLoadProgress } = this.props;
    const { nativeEvent: { progress } } = event;
    if (progress === 1) {
      this.setState((state) => {
        if (state.viewState === 'LOADING') {
          return { viewState: 'IDLE' };
        }
        return null;
      });
    }
    if (onLoadProgress) {
      onLoadProgress(event);
    }
  };

  onShouldStartLoadWithRequestCallback = (
    shouldStart: boolean,
    url: string,
    lockIdentifier?: number,
  ) => {
    if (lockIdentifier) {
      NativeModules.RNCWebViewAmazon.onShouldStartLoadWithRequestCallback(shouldStart, lockIdentifier);
    } else if (shouldStart) {
      UIManager.dispatchViewManagerCommand(
        this.getWebViewAmazonHandle(),
        this.getCommands().loadUrl,
        [String(url)],
      );
    }
  };

  render() {
    const {
      onMessage,
      onShouldStartLoadWithRequest: onShouldStartLoadWithRequestProp,
      originWhitelist,
      renderError,
      renderLoading,
      source,
      style,
      containerStyle,
      nativeConfig = {},
      ...otherProps
    } = this.props;

    let otherView = null;

    if (this.state.viewState === 'LOADING') {
      otherView = (renderLoading || defaultRenderLoading)();
    } else if (this.state.viewState === 'ERROR') {
      const errorEvent = this.state.lastErrorEvent;
      invariant(errorEvent != null, 'lastErrorEvent expected to be non-null');
      otherView = (renderError || defaultRenderError)(
        errorEvent.domain,
        errorEvent.code,
        errorEvent.description,
      );
    } else if (this.state.viewState !== 'IDLE') {
      console.error(
        `RNCWebViewAmazon invalid state encountered: ${this.state.viewState}`,
      );
    }

    const webViewStyles = [styles.container, styles.webView, style];
    const webViewContainerStyle = [styles.container, containerStyle];

    if (typeof source !== "number" && source && 'method' in source) {
      if (source.method === 'POST' && source.headers) {
        console.warn(
          'WebViewAmazon: `source.headers` is not supported when using POST.',
        );
      } else if (source.method === 'GET' && source.body) {
        console.warn('WebViewAmazon: `source.body` is not supported when using GET.');
      }
    }

    const NativeWebViewAmazon
      = (nativeConfig.component as typeof NativeWebViewAmazonAndroid) || RNCWebViewAmazon;

    this.onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
      this.onShouldStartLoadWithRequestCallback,
      // casting cause it's in the default props
      originWhitelist as readonly string[],
      onShouldStartLoadWithRequestProp,
    );

    const webView = (
      <NativeWebViewAmazon
        key="webViewKey"
        {...otherProps}
        messagingEnabled={typeof onMessage === 'function'}
        messagingModuleName={this.messagingModuleName}
        onLoadingError={this.onLoadingError}
        onLoadingFinish={this.onLoadingFinish}
        onLoadingProgress={this.onLoadingProgress}
        onLoadingStart={this.onLoadingStart}
        onHttpError={this.onHttpError}
        onRenderProcessGone={this.onRenderProcessGone}
        onMessage={this.onMessage}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        ref={this.webViewRef}
        // TODO: find a better way to type this.
        source={resolveAssetSource(source as ImageSourcePropType)}
        style={webViewStyles}
        {...nativeConfig.props}
      />
    );

    return (
      <View style={webViewContainerStyle}>
        {webView}
        {otherView}
      </View>
    );
  }
}

export default WebViewAmazon;
