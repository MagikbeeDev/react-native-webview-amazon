/* eslint-disable react/no-multi-comp, max-classes-per-file */

import { ReactElement, Component } from 'react';
import {
  NativeSyntheticEvent,
  ViewProps,
  StyleProp,
  ViewStyle,
  NativeMethodsMixin,
  Constructor,
  UIManagerStatic,
  NativeScrollEvent,
} from 'react-native';

type WebViewAmazonCommands = 'goForward' | 'goBack' | 'reload' | 'stopLoading' | 'postMessage' | 'injectJavaScript' | 'loadUrl' | 'requestFocus';

type AndroidWebViewAmazonCommands = 'clearHistory' | 'clearCache' | 'clearFormData';



interface RNCWebViewAmazonUIManager<Commands extends string> extends UIManagerStatic {
  getViewManagerConfig: (
    name: string,
  ) => {
    Commands: {[key in Commands]: number};
  };
}

export type RNCWebViewAmazonUIManagerAndroid = RNCWebViewAmazonUIManager<WebViewAmazonCommands | AndroidWebViewAmazonCommands>
export type RNCWebViewAmazonUIManagerIOS = RNCWebViewAmazonUIManager<WebViewAmazonCommands>
export type RNCWebViewAmazonUIManagerMacOS = RNCWebViewAmazonUIManager<WebViewAmazonCommands>
export type RNCWebViewAmazonUIManagerWindows = RNCWebViewAmazonUIManager<WebViewAmazonCommands>


type WebViewAmazonState = 'IDLE' | 'LOADING' | 'ERROR';

interface BaseState {
  viewState: WebViewAmazonState;
}

interface NormalState extends BaseState {
  viewState: 'IDLE' | 'LOADING';
  lastErrorEvent: WebViewAmazonError | null;
}

interface ErrorState extends BaseState {
  viewState: 'ERROR';
  lastErrorEvent: WebViewAmazonError;
}

export type State = NormalState | ErrorState;

// eslint-disable-next-line react/prefer-stateless-function
declare class NativeWebViewAmazonIOSComponent extends Component<
  IOSNativeWebViewAmazonProps
> {}
declare const NativeWebViewAmazonIOSBase: Constructor<NativeMethodsMixin> &
  typeof NativeWebViewAmazonIOSComponent;
export class NativeWebViewAmazonIOS extends NativeWebViewAmazonIOSBase {}

// eslint-disable-next-line react/prefer-stateless-function
declare class NativeWebViewAmazonMacOSComponent extends Component<
  MacOSNativeWebViewAmazonProps
> {}
declare const NativeWebViewAmazonMacOSBase: Constructor<NativeMethodsMixin> &
  typeof NativeWebViewAmazonMacOSComponent;
export class NativeWebViewAmazonMacOS extends NativeWebViewAmazonMacOSBase {}

// eslint-disable-next-line react/prefer-stateless-function
declare class NativeWebViewAmazonAndroidComponent extends Component<
  AndroidNativeWebViewAmazonProps
> {}
declare const NativeWebViewAmazonAndroidBase: Constructor<NativeMethodsMixin> &
  typeof NativeWebViewAmazonAndroidComponent;
export class NativeWebViewAmazonAndroid extends NativeWebViewAmazonAndroidBase {}

// eslint-disable-next-line react/prefer-stateless-function
declare class NativeWebViewAmazonWindowsComponent extends Component<
  WindowsNativeWebViewAmazonProps
> {}
declare const NativeWebViewAmazonWindowsBase: Constructor<NativeMethodsMixin> &
  typeof NativeWebViewAmazonWindowsComponent;
export class NativeWebViewAmazonWindows extends NativeWebViewAmazonWindowsBase {}

export interface ContentInsetProp {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface WebViewAmazonNativeEvent {
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: number;
}

export interface WebViewAmazonNativeProgressEvent extends WebViewAmazonNativeEvent {
  progress: number;
}

export interface WebViewAmazonNavigation extends WebViewAmazonNativeEvent {
  navigationType:
    | 'click'
    | 'formsubmit'
    | 'backforward'
    | 'reload'
    | 'formresubmit'
    | 'other';
  mainDocumentURL?: string;
}

export interface ShouldStartLoadRequest extends WebViewAmazonNavigation {
  isTopFrame: boolean;
}

export interface FileDownload {
  downloadUrl: string;
}

export type DecelerationRateConstant = 'normal' | 'fast';

export interface WebViewAmazonMessage extends WebViewAmazonNativeEvent {
  data: string;
}

export interface WebViewAmazonError extends WebViewAmazonNativeEvent {
  /**
   * `domain` is only used on iOS and macOS
   */
  domain?: string;
  code: number;
  description: string;
}

export interface WebViewAmazonHttpError extends WebViewAmazonNativeEvent {
  description: string;
  statusCode: number;
}

export interface WebViewAmazonRenderProcessGoneDetail {
  didCrash: boolean;
}

export type WebViewAmazonEvent = NativeSyntheticEvent<WebViewAmazonNativeEvent>;

export type WebViewAmazonProgressEvent = NativeSyntheticEvent<
  WebViewAmazonNativeProgressEvent
>;

export type WebViewAmazonNavigationEvent = NativeSyntheticEvent<WebViewAmazonNavigation>;

export type ShouldStartLoadRequestEvent = NativeSyntheticEvent<ShouldStartLoadRequest>;

export type FileDownloadEvent = NativeSyntheticEvent<FileDownload>;

export type WebViewAmazonMessageEvent = NativeSyntheticEvent<WebViewAmazonMessage>;

export type WebViewAmazonErrorEvent = NativeSyntheticEvent<WebViewAmazonError>;

export type WebViewAmazonTerminatedEvent = NativeSyntheticEvent<WebViewAmazonNativeEvent>;

export type WebViewAmazonHttpErrorEvent = NativeSyntheticEvent<WebViewAmazonHttpError>;

export type WebViewAmazonRenderProcessGoneEvent = NativeSyntheticEvent<WebViewAmazonRenderProcessGoneDetail>;

export type DataDetectorTypes =
  | 'phoneNumber'
  | 'link'
  | 'address'
  | 'calendarEvent'
  | 'trackingNumber'
  | 'flightNumber'
  | 'lookupSuggestion'
  | 'none'
  | 'all';

export type OverScrollModeType = 'always' | 'content' | 'never';

export type CacheMode = 'LOAD_DEFAULT' | 'LOAD_CACHE_ONLY' | 'LOAD_CACHE_ELSE_NETWORK' | 'LOAD_NO_CACHE';

export type AndroidLayerType = 'none' | 'software' | 'hardware';

export interface WebViewAmazonSourceUri {
  /**
   * The URI to load in the `WebViewAmazon`. Can be a local or remote file.
   */
  uri: string;

  /**
   * The HTTP Method to use. Defaults to GET if not specified.
   * NOTE: On Android, only GET and POST are supported.
   */
  method?: string;

  /**
   * Additional HTTP headers to send with the request.
   * NOTE: On Android, this can only be used with GET requests.
   */
  headers?: Object;

  /**
   * The HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   * NOTE: On Android, this can only be used with POST requests.
   */
  body?: string;
}

export interface WebViewAmazonSourceHtml {
  /**
   * A static HTML page to display in the WebViewAmazon.
   */
  html: string;
  /**
   * The base URL to be used for any relative links in the HTML.
   */
  baseUrl?: string;
}

export type WebViewAmazonSource = WebViewAmazonSourceUri | WebViewAmazonSourceHtml;

export interface ViewManager {
  startLoadWithResult: Function;
}

export interface WebViewAmazonNativeConfig {
  /**
   * The native component used to render the WebViewAmazon.
   */
  component?: typeof NativeWebViewAmazonIOS | typeof NativeWebViewAmazonMacOS | typeof NativeWebViewAmazonAndroid;
  /**
   * Set props directly on the native component WebViewAmazon. Enables custom props which the
   * original WebViewAmazon doesn't pass through.
   */
  props?: Object;
  /**
   * Set the ViewManager to use for communication with the native side.
   * @platform ios, macos
   */
  viewManager?: ViewManager;
}

export type OnShouldStartLoadWithRequest = (
  event: ShouldStartLoadRequest,
) => boolean;

export interface CommonNativeWebViewAmazonProps extends ViewProps {
  cacheEnabled?: boolean;
  incognito?: boolean;
  injectedJavaScript?: string;
  injectedJavaScriptBeforeContentLoaded?: string;
  injectedJavaScriptForMainFrameOnly?: boolean;
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: boolean;
  javaScriptCanOpenWindowsAutomatically?: boolean;
  mediaPlaybackRequiresUserAction?: boolean;
  messagingEnabled: boolean;
  onScroll?: (event: NativeScrollEvent) => void;
  onLoadingError: (event: WebViewAmazonErrorEvent) => void;
  onLoadingFinish: (event: WebViewAmazonNavigationEvent) => void;
  onLoadingProgress: (event: WebViewAmazonProgressEvent) => void;
  onLoadingStart: (event: WebViewAmazonNavigationEvent) => void;
  onHttpError: (event: WebViewAmazonHttpErrorEvent) => void;
  onMessage: (event: WebViewAmazonMessageEvent) => void;
  onShouldStartLoadWithRequest: (event: ShouldStartLoadRequestEvent) => void;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  // TODO: find a better way to type this.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  userAgent?: string;
  /**
   * Append to the existing user-agent. Overridden if `userAgent` is set.
   */
  applicationNameForUserAgent?: string;
}

export interface AndroidNativeWebViewAmazonProps extends CommonNativeWebViewAmazonProps {
  cacheMode?: CacheMode;
  allowFileAccess?: boolean;
  scalesPageToFit?: boolean;
  allowFileAccessFromFileURLs?: boolean;
  allowUniversalAccessFromFileURLs?: boolean;
  androidHardwareAccelerationDisabled?: boolean;
  androidLayerType?: AndroidLayerType;
  domStorageEnabled?: boolean;
  geolocationEnabled?: boolean;
  javaScriptEnabled?: boolean;
  mixedContentMode?: 'never' | 'always' | 'compatibility';
  onContentSizeChange?: (event: WebViewAmazonEvent) => void;
  onRenderProcessGone?: (event: WebViewAmazonRenderProcessGoneEvent) => void;
  overScrollMode?: OverScrollModeType;
  saveFormDataDisabled?: boolean;
  textZoom?: number;
  thirdPartyCookiesEnabled?: boolean;
  messagingModuleName?: string;
  readonly urlPrefixesForDefaultIntent?: string[];
}

export declare type ContentInsetAdjustmentBehavior = 'automatic' | 'scrollableAxes' | 'never' | 'always';

export declare type ContentMode = 'recommended' | 'mobile' | 'desktop';

export interface IOSNativeWebViewAmazonProps extends CommonNativeWebViewAmazonProps {
  allowingReadAccessToURL?: string;
  allowsBackForwardNavigationGestures?: boolean;
  allowsInlineMediaPlayback?: boolean;
  allowsLinkPreview?: boolean;
  automaticallyAdjustContentInsets?: boolean;
  bounces?: boolean;
  contentInset?: ContentInsetProp;
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;
  contentMode?: ContentMode;
  readonly dataDetectorTypes?: DataDetectorTypes | DataDetectorTypes[];
  decelerationRate?: number;
  directionalLockEnabled?: boolean;
  hideKeyboardAccessoryView?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  useSharedProcessPool?: boolean;
  onContentProcessDidTerminate?: (event: WebViewAmazonTerminatedEvent) => void;
  injectedJavaScriptForMainFrameOnly?: boolean;
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: boolean;
  onFileDownload?: (event: FileDownloadEvent) => void;
}

export interface MacOSNativeWebViewAmazonProps extends CommonNativeWebViewAmazonProps {
  allowingReadAccessToURL?: string;
  allowsBackForwardNavigationGestures?: boolean;
  allowsInlineMediaPlayback?: boolean;
  allowsLinkPreview?: boolean;
  automaticallyAdjustContentInsets?: boolean;
  bounces?: boolean;
  contentInset?: ContentInsetProp;
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;
  directionalLockEnabled?: boolean;
  hideKeyboardAccessoryView?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  useSharedProcessPool?: boolean;
  onContentProcessDidTerminate?: (event: WebViewAmazonTerminatedEvent) => void;
}

export interface WindowsNativeWebViewAmazonProps extends CommonNativeWebViewAmazonProps {
  testID?: string
}

export interface IOSWebViewAmazonProps extends WebViewAmazonSharedProps {
  /**
   * Does not store any data within the lifetime of the WebViewAmazon.
   */
  incognito?: boolean;

  /**
   * Boolean value that determines whether the web view bounces
   * when it reaches the edge of the content. The default value is `true`.
   * @platform ios
   */
  bounces?: boolean;

  /**
   * A floating-point number that determines how quickly the scroll view
   * decelerates after the user lifts their finger. You may also use the
   * string shortcuts `"normal"` and `"fast"` which match the underlying iOS
   * settings for `UIScrollViewDecelerationRateNormal` and
   * `UIScrollViewDecelerationRateFast` respectively:
   *
   *   - normal: 0.998
   *   - fast: 0.99 (the default for iOS web view)
   * @platform ios
   */
  decelerationRate?: DecelerationRateConstant | number;

  /**
   * Boolean value that determines whether scrolling is enabled in the
   * `WebViewAmazon`. The default value is `true`.
   * @platform ios
   */
  scrollEnabled?: boolean;

  /**
   * If the value of this property is true, the scroll view stops on multiples
   * of the scroll view’s bounds when the user scrolls.
   * The default value is false.
   * @platform ios
   */
  pagingEnabled?: boolean;

  /**
   * Controls whether to adjust the content inset for web views that are
   * placed behind a navigation bar, tab bar, or toolbar. The default value
   * is `true`.
   * @platform ios
   */
  automaticallyAdjustContentInsets?: boolean;

  /**
   * This property specifies how the safe area insets are used to modify the
   * content area of the scroll view. The default value of this property is
   * "never". Available on iOS 11 and later.
   */
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;

  /**
   * The amount by which the web view content is inset from the edges of
   * the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.
   * @platform ios
   */
  contentInset?: ContentInsetProp;

  /**
   * Defaults to `recommended`, which loads mobile content on iPhone
   * and iPad Mini but desktop content on other iPads.
   *
   * Possible values are:
   * - `'recommended'`
   * - `'mobile'`
   * - `'desktop'`
   * @platform ios
   */
  contentMode?: ContentMode;

  /**
   * Determines the types of data converted to clickable URLs in the web view's content.
   * By default only phone numbers are detected.
   *
   * You can provide one type or an array of many types.
   *
   * Possible values for `dataDetectorTypes` are:
   *
   * - `'phoneNumber'`
   * - `'link'`
   * - `'address'`
   * - `'calendarEvent'`
   * - `'none'`
   * - `'all'`
   *
   * With the new WebKit implementation, we have three new values:
   * - `'trackingNumber'`,
   * - `'flightNumber'`,
   * - `'lookupSuggestion'`,
   *
   * @platform ios
   */
  readonly dataDetectorTypes?: DataDetectorTypes | DataDetectorTypes[];

  /**
   * Boolean that determines whether HTML5 videos play inline or use the
   * native full-screen controller. The default value is `false`.
   *
   * **NOTE** : In order for video to play inline, not only does this
   * property need to be set to `true`, but the video element in the HTML
   * document must also include the `webkit-playsinline` attribute.
   * @platform ios
   */
  allowsInlineMediaPlayback?: boolean;
  /**
   * Hide the accessory view when the keyboard is open. Default is false to be
   * backward compatible.
   */
  hideKeyboardAccessoryView?: boolean;
  /**
   * A Boolean value indicating whether horizontal swipe gestures will trigger
   * back-forward list navigations.
   */
  allowsBackForwardNavigationGestures?: boolean;
  /**
   * A Boolean value indicating whether WebKit WebViewAmazon should be created using a shared
   * process pool, enabling WebViewAmazons to share cookies and localStorage between each other.
   * Default is true but can be set to false for backwards compatibility.
   * @platform ios
   */
  useSharedProcessPool?: boolean;

  /**
   * The custom user agent string.
   */
  userAgent?: string;

  /**
   * A Boolean value that determines whether pressing on a link
   * displays a preview of the destination for the link.
   *
   * This property is available on devices that support 3D Touch.
   * In iOS 10 and later, the default value is `true`; before that, the default value is `false`.
   * @platform ios
   */
  allowsLinkPreview?: boolean;

  /**
   * Set true if shared cookies from HTTPCookieStorage should used for every load request.
   * The default value is `false`.
   * @platform ios
   */
  sharedCookiesEnabled?: boolean;

  /**
   * A Boolean value that determines whether scrolling is disabled in a particular direction.
   * The default value is `true`.
   * @platform ios
   */
  directionalLockEnabled?: boolean;

  /**
   * A Boolean value indicating whether web content can programmatically display the keyboard.
   *
   * When this property is set to true, the user must explicitly tap the elements in the
   * web view to display the keyboard (or other relevant input view) for that element.
   * When set to false, a focus event on an element causes the input view to be displayed
   * and associated with that element automatically.
   *
   * The default value is `true`.
   * @platform ios
   */
  keyboardDisplayRequiresUserAction?: boolean;

  /**
   * A String value that indicates which URLs the WebViewAmazon's file can then
   * reference in scripts, AJAX requests, and CSS imports. This is only used
   * for WebViewAmazons that are loaded with a source.uri set to a `'file://'` URL.
   *
   * If not provided, the default is to only allow read access to the URL
   * provided in source.uri itself.
   * @platform ios
   */
  allowingReadAccessToURL?: string;

  /**
   * Function that is invoked when the WebKit WebViewAmazon content process gets terminated.
   * @platform ios
   */
  onContentProcessDidTerminate?: (event: WebViewAmazonTerminatedEvent) => void;

  /**
   * If `true` (default), loads the `injectedJavaScript` only into the main frame.
   * If `false`, loads it into all frames (e.g. iframes).
   * @platform ios
  */
  injectedJavaScriptForMainFrameOnly?: boolean;

  /**
   * If `true` (default), loads the `injectedJavaScriptBeforeContentLoaded` only into the main frame.
   * If `false`, loads it into all frames (e.g. iframes).
   * @platform ios
  */
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: boolean;

  /**
   * Boolean value that determines whether a pull to refresh gesture is
   * available in the `WebViewAmazon`. The default value is `false`.
   * If `true`, sets `bounces` automatically to `true`
   * @platform ios
   *
  */
  pullToRefreshEnabled?: boolean;

  /**
   * Function that is invoked when the client needs to download a file.
   *
   * iOS 13+ only: If the webview navigates to a URL that results in an HTTP
   * response with a Content-Disposition header 'attachment...', then
   * this will be called.
   *
   * iOS 8+: If the MIME type indicates that the content is not renderable by the
   * webview, that will also cause this to be called. On iOS versions before 13,
   * this is the only condition that will cause this function to be called.
   *
   * The application will need to provide its own code to actually download
   * the file.
   *
   * If not provided, the default is to let the webview try to render the file.
   */
  onFileDownload?: (event: FileDownloadEvent) => void;
}

export interface MacOSWebViewAmazonProps extends WebViewAmazonSharedProps {
  /**
   * Does not store any data within the lifetime of the WebViewAmazon.
   */
  incognito?: boolean;

  /**
   * Boolean value that determines whether the web view bounces
   * when it reaches the edge of the content. The default value is `true`.
   * @platform macos
   */
  bounces?: boolean;

  /**
   * Boolean value that determines whether scrolling is enabled in the
   * `WebViewAmazon`. The default value is `true`.
   * @platform macos
   */
  scrollEnabled?: boolean;

  /**
   * If the value of this property is true, the scroll view stops on multiples
   * of the scroll view’s bounds when the user scrolls.
   * The default value is false.
   * @platform macos
   */
  pagingEnabled?: boolean;

  /**
   * Controls whether to adjust the content inset for web views that are
   * placed behind a navigation bar, tab bar, or toolbar. The default value
   * is `true`.
   * @platform macos
   */
  automaticallyAdjustContentInsets?: boolean;

  /**
   * This property specifies how the safe area insets are used to modify the
   * content area of the scroll view. The default value of this property is
   * "never". Available on iOS 11 and later.
   */
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;

  /**
   * The amount by which the web view content is inset from the edges of
   * the scroll view. Defaults to {top: 0, left: 0, bottom: 0, right: 0}.
   * @platform macos
   */
  contentInset?: ContentInsetProp;

  /**
   * Boolean that determines whether HTML5 videos play inline or use the
   * native full-screen controller. The default value is `false`.
   *
   * **NOTE** : In order for video to play inline, not only does this
   * property need to be set to `true`, but the video element in the HTML
   * document must also include the `webkit-playsinline` attribute.
   * @platform macos
   */
  allowsInlineMediaPlayback?: boolean;
  /**
   * Hide the accessory view when the keyboard is open. Default is false to be
   * backward compatible.
   */
  hideKeyboardAccessoryView?: boolean;
  /**
   * A Boolean value indicating whether horizontal swipe gestures will trigger
   * back-forward list navigations.
   */
  allowsBackForwardNavigationGestures?: boolean;
  /**
   * A Boolean value indicating whether WebKit WebViewAmazon should be created using a shared
   * process pool, enabling WebViewAmazons to share cookies and localStorage between each other.
   * Default is true but can be set to false for backwards compatibility.
   * @platform macos
   */
  useSharedProcessPool?: boolean;

  /**
   * The custom user agent string.
   */
  userAgent?: string;

  /**
   * A Boolean value that determines whether pressing on a link
   * displays a preview of the destination for the link.
   *
   * This property is available on devices that support Force Touch trackpad.
   * @platform macos
   */
  allowsLinkPreview?: boolean;

  /**
   * Set true if shared cookies from HTTPCookieStorage should used for every load request.
   * The default value is `false`.
   * @platform macos
   */
  sharedCookiesEnabled?: boolean;

  /**
   * A Boolean value that determines whether scrolling is disabled in a particular direction.
   * The default value is `true`.
   * @platform macos
   */
  directionalLockEnabled?: boolean;

  /**
   * A Boolean value indicating whether web content can programmatically display the keyboard.
   *
   * When this property is set to true, the user must explicitly tap the elements in the
   * web view to display the keyboard (or other relevant input view) for that element.
   * When set to false, a focus event on an element causes the input view to be displayed
   * and associated with that element automatically.
   *
   * The default value is `true`.
   * @platform macos
   */
  keyboardDisplayRequiresUserAction?: boolean;

  /**
   * A String value that indicates which URLs the WebViewAmazon's file can then
   * reference in scripts, AJAX requests, and CSS imports. This is only used
   * for WebViewAmazons that are loaded with a source.uri set to a `'file://'` URL.
   *
   * If not provided, the default is to only allow read access to the URL
   * provided in source.uri itself.
   * @platform macos
   */
  allowingReadAccessToURL?: string;

  /**
   * Function that is invoked when the WebKit WebViewAmazon content process gets terminated.
   * @platform macos
   */
  onContentProcessDidTerminate?: (event: WebViewAmazonTerminatedEvent) => void;
}

export interface AndroidWebViewAmazonProps extends WebViewAmazonSharedProps {
  onNavigationStateChange?: (event: WebViewAmazonNavigation) => void;
  onContentSizeChange?: (event: WebViewAmazonEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` process crashes or is killed by the OS.
   * Works only on Android (minimum API level 26).
   */
  onRenderProcessGone?: (event: WebViewAmazonRenderProcessGoneEvent) => void;

  /**
   * https://developer.android.com/reference/android/webkit/WebSettings.html#setCacheMode(int)
   * Set the cacheMode. Possible values are:
   *
   * - `'LOAD_DEFAULT'` (default)
   * - `'LOAD_CACHE_ELSE_NETWORK'`
   * - `'LOAD_NO_CACHE'`
   * - `'LOAD_CACHE_ONLY'`
   *
   * @platform android
   */
  cacheMode?: CacheMode;

  /**
   * https://developer.android.com/reference/android/view/View#OVER_SCROLL_NEVER
   * Sets the overScrollMode. Possible values are:
   *
   * - `'always'` (default)
   * - `'content'`
   * - `'never'`
   *
   * @platform android
   */
  overScrollMode?: OverScrollModeType;

  /**
   * Boolean that controls whether the web content is scaled to fit
   * the view and enables the user to change the scale. The default value
   * is `true`.
   */
  scalesPageToFit?: boolean;

  /**
   * Sets whether Geolocation is enabled. The default is false.
   * @platform android
   */
  geolocationEnabled?: boolean;


  /**
   * Boolean that sets whether JavaScript running in the context of a file
   * scheme URL should be allowed to access content from other file scheme URLs.
   * Including accessing content from other file scheme URLs
   * @platform android
   */
  allowFileAccessFromFileURLs?: boolean;

  /**
   * Boolean that sets whether JavaScript running in the context of a file
   * scheme URL should be allowed to access content from any origin.
   * Including accessing content from other file scheme URLs
   * @platform android
   */
  allowUniversalAccessFromFileURLs?: boolean;

  /**
   * Sets whether the webview allow access to file system.
   * @platform android
   */
  allowFileAccess?: boolean;

  /**
   * Used on Android only, controls whether form autocomplete data should be saved
   * @platform android
   */
  saveFormDataDisabled?: boolean;

  /**
   * Used on Android only, controls whether the given list of URL prefixes should
   * make {@link com.facebook.react.views.webview.ReactWebViewAmazonClient} to launch a
   * default activity intent for those URL instead of loading it within the webview.
   * Use this to list URLs that WebViewAmazon cannot handle, e.g. a PDF url.
   * @platform android
   */
  readonly urlPrefixesForDefaultIntent?: string[];

  /**
   * Boolean value to disable Hardware Acceleration in the `WebViewAmazon`. Used on Android only
   * as Hardware Acceleration is a feature only for Android. The default value is `false`.
   * @platform android
   */
  androidHardwareAccelerationDisabled?: boolean;

    /**
   * https://developer.android.com/reference/android/webkit/WebViewAmazon#setLayerType(int,%20android.graphics.Paint)
   * Sets the layerType. Possible values are:
   *
   * - `'none'` (default)
   * - `'software'`
   * - `'hardware'`
   *
   * @platform android
   */
  androidLayerType?: AndroidLayerType;

  /**
   * Boolean value to enable third party cookies in the `WebViewAmazon`. Used on
   * Android Lollipop and above only as third party cookies are enabled by
   * default on Android Kitkat and below and on iOS. The default value is `true`.
   * @platform android
   */
  thirdPartyCookiesEnabled?: boolean;

  /**
   * Boolean value to control whether DOM Storage is enabled. Used only in
   * Android.
   * @platform android
   */
  domStorageEnabled?: boolean;

  /**
   * Sets the user-agent for the `WebViewAmazon`.
   * @platform android
   */
  userAgent?: string;

  /**
   * Sets number that controls text zoom of the page in percent.
   * @platform android
   */
  textZoom?: number;

  /**
   * Specifies the mixed content mode. i.e WebViewAmazon will allow a secure origin to load content from any other origin.
   *
   * Possible values for `mixedContentMode` are:
   *
   * - `'never'` (default) - WebViewAmazon will not allow a secure origin to load content from an insecure origin.
   * - `'always'` - WebViewAmazon will allow a secure origin to load content from any other origin, even if that origin is insecure.
   * - `'compatibility'` -  WebViewAmazon will attempt to be compatible with the approach of a modern web browser with regard to mixed content.
   * @platform android
   */
  mixedContentMode?: 'never' | 'always' | 'compatibility';

  /**
   * Sets ability to open fullscreen videos on Android devices.
   */
  allowsFullscreenVideo?: boolean;
}

export interface WebViewAmazonSharedProps extends ViewProps {
  /**
   * Loads static html or a uri (with optional headers) in the WebViewAmazon.
   */
  source?: WebViewAmazonSource;

  /**
   * Boolean value to enable JavaScript in the `WebViewAmazon`. Used on Android only
   * as JavaScript is enabled by default on iOS. The default value is `true`.
   * @platform android
   */
  javaScriptEnabled?: boolean;

  /**
   * A Boolean value indicating whether JavaScript can open windows without user interaction.
   * The default value is `false`.
   */
  javaScriptCanOpenWindowsAutomatically?: boolean;

  /**
   * Stylesheet object to set the style of the container view.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Function that returns a view to show if there's an error.
   */
  renderError?: (
    errorDomain: string | undefined,
    errorCode: number,
    errorDesc: string,
  ) => ReactElement; // view to show if there's an error

  /**
   * Function that returns a loading indicator.
   */
  renderLoading?: () => ReactElement;

  /**
   * Function that is invoked when the `WebViewAmazon` scrolls.
   */
  onScroll?: (event: NativeScrollEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` has finished loading.
   */
  onLoad?: (event: WebViewAmazonNavigationEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` load succeeds or fails.
   */
  onLoadEnd?: (event: WebViewAmazonNavigationEvent | WebViewAmazonErrorEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` starts loading.
   */
  onLoadStart?: (event: WebViewAmazonNavigationEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` load fails.
   */
  onError?: (event: WebViewAmazonErrorEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` receives an error status code.
   * Works on iOS and Android (minimum API level 23).
   */
  onHttpError?: (event: WebViewAmazonHttpErrorEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` loading starts or ends.
   */
  onNavigationStateChange?: (event: WebViewAmazonNavigation) => void;

  /**
   * Function that is invoked when the webview calls `window.ReactNativeWebViewAmazon.postMessage`.
   * Setting this property will inject this global into your webview.
   *
   * `window.ReactNativeWebViewAmazon.postMessage` accepts one argument, `data`, which will be
   * available on the event object, `event.nativeEvent.data`. `data` must be a string.
   */
  onMessage?: (event: WebViewAmazonMessageEvent) => void;

  /**
   * Function that is invoked when the `WebViewAmazon` is loading.
   */
  onLoadProgress?: (event: WebViewAmazonProgressEvent) => void;

  /**
   * Boolean value that forces the `WebViewAmazon` to show the loading view
   * on the first load.
   */
  startInLoadingState?: boolean;

  /**
   * Set this to provide JavaScript that will be injected into the web page
   * when the view loads.
   */
  injectedJavaScript?: string;

  /**
   * Set this to provide JavaScript that will be injected into the web page
   * once the webview is initialized but before the view loads any content.
   */
  injectedJavaScriptBeforeContentLoaded?: string;

  /**
   * If `true` (default; mandatory for Android), loads the `injectedJavaScript` only into the main frame.
   * If `false` (only supported on iOS and macOS), loads it into all frames (e.g. iframes).
   */
  injectedJavaScriptForMainFrameOnly?: boolean;

  /**
   * If `true` (default; mandatory for Android), loads the `injectedJavaScriptBeforeContentLoaded` only into the main frame.
   * If `false` (only supported on iOS and macOS), loads it into all frames (e.g. iframes).
   */
  injectedJavaScriptBeforeContentLoadedForMainFrameOnly?: boolean;

  /**
   * Boolean value that determines whether a horizontal scroll indicator is
   * shown in the `WebViewAmazon`. The default value is `true`.
   */
  showsHorizontalScrollIndicator?: boolean;

  /**
   * Boolean value that determines whether a vertical scroll indicator is
   * shown in the `WebViewAmazon`. The default value is `true`.
   */
  showsVerticalScrollIndicator?: boolean;

  /**
   * Boolean that determines whether HTML5 audio and video requires the user
   * to tap them before they start playing. The default value is `true`.
   */
  mediaPlaybackRequiresUserAction?: boolean;

  /**
   * List of origin strings to allow being navigated to. The strings allow
   * wildcards and get matched against *just* the origin (not the full URL).
   * If the user taps to navigate to a new page but the new page is not in
   * this whitelist, we will open the URL in Safari.
   * The default whitelisted origins are "http://*" and "https://*".
   */
  readonly originWhitelist?: string[];

  /**
   * Function that allows custom handling of any web view requests. Return
   * `true` from the function to continue loading the request and `false`
   * to stop loading. The `navigationType` is always `other` on android.
   */
  onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest;

  /**
   * Override the native component used to render the WebViewAmazon. Enables a custom native
   * WebViewAmazon which uses the same JavaScript as the original WebViewAmazon.
   */
  nativeConfig?: WebViewAmazonNativeConfig;

  /**
   * Should caching be enabled. Default is true.
   */
  cacheEnabled?: boolean;

  /**
   * Append to the existing user-agent. Overridden if `userAgent` is set.
   */
  applicationNameForUserAgent?: string;
}
