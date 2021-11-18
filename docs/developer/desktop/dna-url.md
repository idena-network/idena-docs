---
hide_title: true
title: Idena app URL scheme dna://
sidebar_label: dna:// URL
---

# Idena app URL scheme dna://

Idena app supports handling URL with the following format:

```
dna://<method>/<version>?<parameters>
```

Currently version `v1` must be used.

There are following methods supported:

1. Sending DNA coins: `send`
2. Open Oracle voting: `vote`
3. Authentication with a client's public key: `signin`
4. Sign and send a raw transaction: `raw`

## 1. Send DNA coins

URL example for sending DNA coins:

```
dna://send/v1?address=0x01234567891asdasd&
              amount=123&
              comment=mycomment&
              callback_url=https%3A%2F%2Fmywebsite.com
```

Once send transaction is successfully sent by user the `callback_url` will be opened in the user's browser with `tx` hash parameter as follows:

```
https://mywebsite.com?tx=0xFd242hGRg2dsdwertu23Fd242hGRg2dsdGRg2dsdGRg2d
```

## 2. Open Oracle voting

URL example for opening Oracle voting form:

```
dna://vote/v1?address=0x01234567891...
```

## 3. Sign-in with Idena

URL example for signing in with Idena public address:

```
dna://signin/v1?token=session_token&
            callback_url=https%3A%2F%2Fmywebsite.com&
            nonce_endpoint=https%3A%2F%2Fmywebsite.com%2Fauth%2Fv1%2Fstart-session&
            authentication_endpoint=https%3A%2F%2Fmywebsite.com%2Fauth%2Fv1%2Fauthenticate
            favicon_url=https%3A%2F%2Fmywebsite.com%2Ffavicon.ico
```

See more details about [Sign-in with Idena](./sign-in).

## 4. Sign and send a raw transaction

URL example:

```
dna://raw/v1?tx=0x01234567891...&
             callback_url=https%3A%2F%2Fmywebsite.com

```
## 5. Send invitation to address

URL example for sending invitation to the specified address:

```
dna://invite/v1?address=0x01234567891...
```

