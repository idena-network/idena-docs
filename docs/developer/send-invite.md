---
hide_title: true
title: Idena app URL for sending invite
sidebar_label: Send invite
---

# Send invite

You can use URL to send invite to the specified address. Invites can be sent using either Idena Web App or Idena Desktop App. It's recommended to use Idena Web App as a default method for sending invites. Users who have no Idena Web App account can send their invites with the Idena Desktop App by clicking `Open in Idena app` link below.

![image](/img/developer/signin-with-idena-web.png)

The Idena Desktop App pops up automatically when the user clicks `dna://invite/...` URL.

### URL format

URL example for sending invite with Idena Web App:

```
https://app.idena.io/dna/invite?address=0x01234567891asdasd
```

URL example for sending invite coins using Idena Desktop App:

```
dna://invite/v1?address=0x01234567891asdasd
```

Parameters:

- `address`: invitee address
