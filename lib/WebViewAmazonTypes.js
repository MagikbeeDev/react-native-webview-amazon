/* eslint-disable react/no-multi-comp, max-classes-per-file */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from 'react';
var NativeWebViewAmazonIOS = /** @class */ (function (_super) {
    __extends(NativeWebViewAmazonIOS, _super);
    function NativeWebViewAmazonIOS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewAmazonIOS;
}(NativeWebViewAmazonIOSBase));
export { NativeWebViewAmazonIOS };
var NativeWebViewAmazonMacOS = /** @class */ (function (_super) {
    __extends(NativeWebViewAmazonMacOS, _super);
    function NativeWebViewAmazonMacOS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewAmazonMacOS;
}(NativeWebViewAmazonMacOSBase));
export { NativeWebViewAmazonMacOS };
var NativeWebViewAmazonAndroid = /** @class */ (function (_super) {
    __extends(NativeWebViewAmazonAndroid, _super);
    function NativeWebViewAmazonAndroid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewAmazonAndroid;
}(NativeWebViewAmazonAndroidBase));
export { NativeWebViewAmazonAndroid };
var NativeWebViewAmazonWindows = /** @class */ (function (_super) {
    __extends(NativeWebViewAmazonWindows, _super);
    function NativeWebViewAmazonWindows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewAmazonWindows;
}(NativeWebViewAmazonWindowsBase));
export { NativeWebViewAmazonWindows };
