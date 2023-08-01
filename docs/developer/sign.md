---
hide_title: true
title: Idena app URL for singing messages
sidebar_label: Sing message
---

# Sign message

You can use URL to sign messages. Simple example:

```
https://app.idena.io/dna/sign?message=some_message_to_sign&
            callback_url=https%3A%2F%2Fmywebsite.com
```

Messages can be signed using either Idena Web App or Idena Desktop App. It's recommended to use Idena Web App as a default method for signing messages. Users who have no Idena Web App account can sign their messages with the Idena Desktop App by clicking `Open in Idena app` link below.

![image](/img/developer/signin-with-idena-web.png)

The Idena Desktop App pops up automatically when the user clicks `dna://sign/...` URL.

## URL format

URL example for signing messages with Idena Web App:

```
https://app.idena.io/dna/sign?message=some_message_to_sign&
            format=prefix&
            callback_url=https%3A%2F%2Fmywebsite.com&
            callback_format=html&
            favicon_url=https%3A%2F%2Fmywebsite.com%2Ffavicon.ico
```

URL example for signing messages using Idena Desktop App:

```
dna://sign/v1?message=some_message_to_sign&
            format=prefix&
            callback_url=https%3A%2F%2mywebsite.com&
            callback_format=html&
            favicon_url=https%3A%2F%2mywebsite.com%2Ffavicon.ico
```

Parameters:

- `message`(\*): message string for signing
- `format`: `doubleHash`/`prefix` specifies signed data format (default: `doubleHash`)
- `callback_url`(\*): specifies URL that will be opened in the client's browser automatically after successful signing
- `favicon_url`: specifies custom URL for the icon displayed for user in the Idena app

(\*) - required parameter

### Format

`format` specifies the format of the signed data

#### doubleHash (default)

The message is hashed twice before signing it

#### prefix

The message is prepended with `\x00Idena Signed Message:\n<length of message>` before hashing and signing it

### Callback URL

The web page specified in `callback_url` will be automatically opened in the user's browser once the message is signed. Callback URL example:

```
https://mywebsite.com?signature=0x09e4fef26dcec9418e...
```

`signature` parameter specifies the signature