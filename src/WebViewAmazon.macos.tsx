import React from 'react';
import {
  UIManager as NotTypedUIManager,
  View,
  requireNativeComponent,
  NativeModules,
  Image,
  findNodeHandle,
  ImageSourcePropType,
} from 'react-native';
import invariant from 'invariant';

import {
  defaultOriginWhitelist,
  createOnShouldStartLoadWithRequest,
  defaultRenderError,
  defaultRenderLoading,
} from './WebViewAmazonShared';
import {
  WebViewAmazonErrorEvent,
  WebViewAmazonHttpErrorEvent,
  WebViewAmazonMessageEvent,
  WebViewAmazonNavigationEvent,
  WebViewAmazonProgressEvent,
  WebViewAmazonTerminatedEvent,
  MacOSWebViewAmazonProps,
  NativeWebViewAmazonMacOS,
  ViewManager,
  State,
  RNCWebViewAmazonUIManagerMacOS,
} from './WebViewAmazonTypes';

import styles from './WebViewAmazon.styles';

const UIManager = NotTypedUIManager as RNCWebViewAmazonUIManagerMacOS;

const { resolveAssetSource } = Image;

const RNCWebViewAmazonManager = NativeModules.RNCWebViewAmazonManager as ViewManager;

const RNCWebViewAmazon: typeof NativeWebViewAmazonMacOS = requireNativeComponent(
  'RNCWebViewAmazon',
);

class WebViewAmazon extends React.Component<MacOSWebViewAmazonProps, State> {
  static defaultProps = {
    javaScriptEnabled: true,
    cacheEnabled: true,
    originWhitelist: defaultOriginWhitelist,
    useSharedProcessPool: true,
  };

  static isFileUploadSupported = async () => {
    // no native implementation for macOS, depends only on permissions
    return true;
  };

  state: State = {
    viewState: this.props.startInLoadingState ? 'LOADING' : 'IDLE',
    lastErrorEvent: null,
  };

  webViewRef = React.createRef<NativeWebViewAmazonMacOS>();

  // eslint-disable-next-line react/sort-comp
  getCommands = () => UIManager.getViewManagerConfig('RNCWebViewAmazon').Commands;

  /**
   * Go forward one page in the web view's history.
   */
  goForward = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().goForward,
      undefined,
    );
  };

  /**
   * Go back one page in the web view's history.
   */
  goBack = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().goBack,
      undefined,
    );
  };

  /**
   * Reloads the current page.
   */
  reload = () => {
    this.setState({ viewState: 'LOADING' });
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().reload,
      undefined,
    );
  };

  /**
   * Stop loading the current page.
   */
  stopLoading = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().stopLoading,
      undefined,
    );
  };

  /**
   * Request focus on WebViewAmazon rendered page.
   */
  requestFocus = () => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().requestFocus,
      undefined,
    );
  };

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
  postMessage = (data: string) => {
    UIManager.dispatchViewManagerCommand(
      this.getWebViewAmazonHandle(),
      this.getCommands().postMessage,
      [String(data)],
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
    if (onLoadStart) {
      onLoadStart(event);
    }
    this.updateNavigationState(event);
  };

  onLoadingError = (event: WebViewAmazonErrorEvent) => {
    event.persist(); // persist this event because we need to store it
    const { onError, onLoadEnd } = this.props;
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    if (onError) {
      onError(event);
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

  onLoadingFinish = (event: WebViewAmazonNavigationEvent) => {
    const { onLoad, onLoadEnd } = this.props;
    if (onLoad) {
      onLoad(event);
    }
    if (onLoadEnd) {
      onLoadEnd(event);
    }
    this.setState({
      viewState: 'IDLE',
    });
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
    if (onLoadProgress) {
      onLoadProgress(event);
    }
  };

  onShouldStartLoadWithRequestCallback = (
    shouldStart: boolean,
    _url: string,
    lockIdentifier: number,
  ) => {
    const viewManager
      = (this.props.nativeConfig && this.props.nativeConfig.viewManager)
      || RNCWebViewAmazonManager;

    viewManager.startLoadWithResult(!!shouldStart, lockIdentifier);
  };

  onContentProcessDidTerminate = (event: WebViewAmazonTerminatedEvent) => {
    const { onContentProcessDidTerminate } = this.props;
    if (onContentProcessDidTerminate) {
      onContentProcessDidTerminate(event);
    }
  };

  componentDidUpdate(prevProps: MacOSWebViewAmazonProps) {
    this.showRedboxOnPropChanges(prevProps, 'allowsInlineMediaPlayback');
    this.showRedboxOnPropChanges(prevProps, 'incognito');
    this.showRedboxOnPropChanges(prevProps, 'mediaPlaybackRequiresUserAction');
  }

  showRedboxOnPropChanges(
    prevProps: MacOSWebViewAmazonProps,
    propName: keyof MacOSWebViewAmazonProps,
  ) {
    if (this.props[propName] !== prevProps[propName]) {
      console.error(
        `Changes to property ${propName} do nothing after the initial render.`,
      );
    }
  }

  render() {
    const {
      nativeConfig = {},
      onMessage,
      onShouldStartLoadWithRequest: onShouldStartLoadWithRequestProp,
      originWhitelist,
      renderError,
      renderLoading,
      style,
      containerStyle,
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

    const onShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest(
      this.onShouldStartLoadWithRequestCallback,
      // casting cause it's in the default props
      originWhitelist as readonly string[],
      onShouldStartLoadWithRequestProp,
    );

    const NativeWebViewAmazon
      = (nativeConfig.component as typeof NativeWebViewAmazonMacOS | undefined)
      || RNCWebViewAmazon;

    const webView = (
      <NativeWebViewAmazon
        key="webViewKey"
        {...otherProps}
        messagingEnabled={typeof onMessage === 'function'}
        onLoadingError={this.onLoadingError}
        onLoadingFinish={this.onLoadingFinish}
        onLoadingProgress={this.onLoadingProgress}
        onLoadingStart={this.onLoadingStart}
        onHttpError={this.onHttpError}
        onMessage={this.onMessage}
        onScroll={this.props.onScroll}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onContentProcessDidTerminate={this.onContentProcessDidTerminate}
        ref={this.webViewRef}
        // TODO: find a better way to type this.
        source={resolveAssetSource(this.props.source as ImageSourcePropType)}
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
