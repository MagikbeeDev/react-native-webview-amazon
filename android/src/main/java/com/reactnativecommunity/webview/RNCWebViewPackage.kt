package com.reactnativecommunity.webview

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext


class RNCWebViewAmazonPackage: ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext) = listOf(
    RNCWebViewAmazonModule(reactContext)
  )

  override fun createViewManagers(reactContext: ReactApplicationContext) = listOf(
    RNCWebViewAmazonManager()
  )
}
