/// <reference types="react" />
import { OnShouldStartLoadWithRequest, ShouldStartLoadRequestEvent } from './WebViewAmazonTypes';
declare const defaultOriginWhitelist: string[];
declare const createOnShouldStartLoadWithRequest: (loadRequest: (shouldStart: boolean, url: string, lockIdentifier: number) => void, originWhitelist: readonly string[], onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest | undefined) => ({ nativeEvent }: ShouldStartLoadRequestEvent) => void;
declare const defaultRenderLoading: () => JSX.Element;
declare const defaultRenderError: (errorDomain: string | undefined, errorCode: number, errorDesc: string) => JSX.Element;
export { defaultOriginWhitelist, createOnShouldStartLoadWithRequest, defaultRenderLoading, defaultRenderError, };
//# sourceMappingURL=WebViewAmazonShared.d.ts.map