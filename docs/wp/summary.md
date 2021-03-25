---
hide_title: true
title: Idena introduction
sidebar_label: Introduction
---

<img src="/img/idena_logo_square.svg" alt="Idena validation flow" width="20%"
style={{display: "block", margin: "auto", padding: "40px"}} />

_This document introduces the foundational concepts of the Idena blockchain and provides a formal specification of iDNA, its native coin_

## What is Idena

Idena is an open source project started in October 2018.

The Idena blockchain is driven by Proof-of-Person consensus with every node linked to a cryptoidentity, one person with equal voting power. It suggests a novel way to formalize people on the Internet: Idena proves the humanness and uniqueness of its participants without collecting personally identifiable information by running a Turing test at the same time globally.

## Idena team

We are an anonymous group of like-minded engineers and computer scientists who stand for the human right to share information and exchange value freely and privately.

We believe that there is a way to redesign the way software systems in general and blockchains in particular work to achieve greater decentralization and scalability.

Contacts: `info@idena.io`

## The problem of unique identity

Anonymous and Sybil-resistant identity is a missing part for Web 3.0 (Internet applications, blockchains, dapps, and self-sovereign identity space).

The design requirements of this decentralized anonymous identity to a large extent follow the properties introduced by Bitcoin:

- Global and verifiable online
- Permissionless and inclusive
- Decentralized, without reliance on trusted third parties
- Sybil-resitant
- Anonymous and privacy-preserving
- Censorship-resistant and plausibly deniable

Existing state-of-the-art identity mechanisms fail to achieve this:

- OpenID identity solutions such as those of Facebook and Google, based on a social information, rely on a centralized service, are not available in many countries, can be purchased on the market, and are easily spoofed.
- Government ID relies on trusted know-your-customer (KYC) verifiers, requires the sharing of personally identifying information (PII) with a centralized service, is not inclusive, and leads to an Orwellian world.
- Biometrics relies on specific sensors and algorithms, can be faked, and cannot have plausible deniability.
- Video identification can be faked with AI algorithms which can produce a high quality deepfakes unidentifiable as deepfakes.
- Self-sovereign identities (SSI) rely on trusted verifiers based on Social ID and Government ID attestation.
- Web of Trust (WoT) approaches do not allow to build the consensus about the registry of valid identities across all nodes.
