---
hide_title: true
title: Idena app URL for sending iDNA
sidebar_label: Send iDNA
---

# Send iDNA

You can use URL to send iDNA coins. Simple example:

```
https://app.idena.io/dna/send?address=0x0000000000000000000000000000000000000000&amount=0.1
```

iDNA coins can be sent using either Idena Web App or Idena Desktop App. It's recommended to use Idena Web App as a default method for sending iDNA. Users who have no Idena Web App account can send the coins with the Idena Desktop App by clicking `Open in Idena app` link below.

![image](/img/developer/signin-with-idena-web.png)

The Idena Desktop App pops up automatically when the user clicks `dna://send/...` URL.

### URL format

URL example for sending iDNA with Idena Web App:

```
https://app.idena.io/dna/send?address=0x01234567891asdasd&
              amount=123&
              comment=mycomment&
              callback_format=html&
              callback_url=https://mywebsite.com
```

URL example for sending DNA coins using Idena Desktop App:

```
dna://send/v1?address=0x01234567891asdasd&
              amount=123&
              comment=mycomment&
              callback_url=https%3A%2F%2Fmywebsite.com&
              callback_format=html
```

Parameters:

- `address`(\*): recipient's Idena wallet address
- `amount`(\*): amount of iDNA coins that will be sent
- `comment`: text data that will be recorded into transaction payload
- `callback_url`: specified URL that must return correct json for `Content-Type: application-json` request or html for `Content-Type: text/html` request
- `callback_format`: `json`/`html` specifies if the callback_url supports json format or not (default: `html`)

(\*) - required parameters

## Callback URL with `html` format

By default the web page specified in `callback_url` will be automatically opened in the user's browser once the `SentTx` is sent to network. Callback URL example:

```
https://mywebsite.com?tx=0xAd142hGRg2dsdwertu23Fd242hGRg2dsd...
```

`tx` parameter specifies the hash of the `SendTx` transaction.

## Callback URL with `json` format (advanced)

We recommend you to use `callback_format=json` parameter to get transaction hash on your server before `SendTx` transaction is sent to network. Endpoint specified in `callback_url` will be called with `tx` parameter. Callback URL example (`Content-Type: application-json`):

```
https://mywebsite.com?tx=0xAd142hGRg2dsdwertu23Fd242hGRg2dsd...
```

Callback URL should return the following response:

```
{
"success": true,
"url": "https://..."
}
```

Error response example:

```
{
"success": false,
"url": "https://..."
"error": "This is the error message that will be shown to the user"
}
```

Once successful response is received, `SendTx` transaction will be sent to the network and the following dialog will be displayed:

![image](/img/developer/dna-send-success.png)

When _Continue_ button is clicked the web page specified in `url` will open in the user's browser.
