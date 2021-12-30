---
hide_title: true
title: How to upload content to IPFS
sidebar_label: Uploading data
---

# Uploading data to IPFS

You can use the Idena Network for uploading and sharing your content. You can access the uploaded data by its `cid` using Idena node or IPFS node connected to the Idena Network or using any public Idena IPFS gateway (e.g: https://ipfs.idena.io)

Example: https://ipfs.idena.io/ipfs/bafkreicfjmxqcmzqt7yvl6ljpwl3kbkvh2einxpilggbczsx44giha6dua

## How to upload your content to IPFS?

Let's upload the following `html` file into Idena IPFS network:

```
<!DOCTYPE html>
<head>
	<title>HTML and CSS "Hello World"</title>
	<style>
		body {
			background-color: #2D2D2D;
		}
		
		h1 {
			color: #C26356;
			font-size: 30px;
			font-family: Menlo, Monaco, fixed-width;
		}
		
		p {
			color: white;
			font-family: "Source Code Pro", Menlo, Monaco, fixed-width;
		}
	</style>
</head>
<body>
	<h1>Hello World Example</h1>
	<p>This is "Hello World" example.</p>
</body>
</html>
```

### 1. Convert text into bytes
You can use online tool to convert text into bytes: https://onlineasciitools.com/convert-ascii-to-bytes
```
0x3c21444f43545950452...
```
### 2. Add prefix 
Add `0x` prefix to data as follows:
```
0x0x3c21444f43545950452...
```
### 3. Upload data


Call Idena Node `ipfs_add` method to upload data to your Idena node.
You can use https://rpc.idena.io to call methods of your Idena node.

Example: 

```
{
  "method": "ipfs_add",
  "params": [
    "0x3c21444f43545950452068746d6c3e0a3c686561643e0a093c7469746c653e48544d4c20616e6420435353202248656c6c6f20576f726c64223c2f7469746c653e0a093c7374796c653e0a0909626f6479207b0a0909096261636b67726f756e642d636f6c6f723a20233244324432443b0a09097d0a09090a09096831207b0a090909636f6c6f723a20234332363335363b0a090909666f6e742d73697a653a20333070783b0a090909666f6e742d66616d696c793a204d656e6c6f2c204d6f6e61636f2c2066697865642d77696474683b0a09097d0a09090a090970207b0a090909636f6c6f723a2077686974653b0a090909666f6e742d66616d696c793a2022536f7572636520436f64652050726f222c204d656e6c6f2c204d6f6e61636f2c2066697865642d77696474683b0a09097d0a093c2f7374796c653e0a3c2f686561643e0a3c626f64793e0a093c68313e48656c6c6f20576f726c64204578616d706c653c2f68313e0a093c703e54686973206973202248656c6c6f20576f726c6422206578616d706c652e3c2f703e0a3c2f626f64793e0a3c2f68746d6c3e0a",
    true
  ],
  "id": ...,
  "key": "..."
}
{
  "jsonrpc": "2.0",
  "id": 6,
  "result": "bafkreicfjmxqcmzqt7yvl6ljpwl3kbkvh2einxpilggbczsx44giha6dua"
}
```

Parameters:
- `data`: bytes
- `pin`: bool


Result of the method is `cid` which is also the hash of the data which should be used to access it.

The uploaded html is now accessible at the following URL address:
https://ipfs.idena.io/ipfs/bafkreicfjmxqcmzqt7yvl6ljpwl3kbkvh2einxpilggbczsx44giha6dua

## Data availability

The uploaded data is available as long as at least one Idena node stores it.
You should use the `pin` parameter when uploading your content to make sure that your own node stores it permanently.

Your Idena nodes will automatically delete all the unpinned data if there is a new data is uploaded (e.g. flips or blocks) and no free space left in your `/ipsf` folder.
By default `/ipfs` folder data is limited by `10Gb`.


## Broadcasting your data

You can call the `dna_storeToIpfs` method if you want other nodes to download your data.
Transaction `StoreToIpfsTx` will be sent automatically for the specified `cid`. 

Example:

```
{
  "method": "dna_storeToIpfs",
  "params": [
    {
      "cid": "bafkreicfjmxqcmzqt7yvl6ljpwl3kbkvh2einxpilggbczsx44giha6dua"
    }
  ],
  "id": ...,
  "key": "..."
}
{
  "jsonrpc": "2.0",
  "id": 8,
  "result": "0xd1b2fb..."
}
```

Once the `StoreToIpfsTx` transaction is confirmed, 20% of nodes are randomly selected to download the specified data.
These Idena nodes do not pin your data so it may be deleted if there is no free space left in their `/ipsf` folder.


### Fees

Fee for `StoreToIpfsTx` transaction is calculated automatically depending on the size of the data.
The total transaction fee is calculated as following:

```
transactionFee = currFeeRate * (transactionSize  + dataSize * 0.20)
```

_See more about [`currFeeRate`](/docs/developer/node/node-rpc#transaction-fees)_



