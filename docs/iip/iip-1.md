---
hide_title: true
title: IIP-1
sidebar_label: IIP-1
---

## IIP-1: Idena Improvement Proposal Process

`Author`: midenaio

`Status`: Living

`Type`: Process

`Created`: 2022-01-27

### What is an IIP?

IIP stands for Idena Improvement Proposal. An IIP is a design document providing information to the Idena community, or describing a new feature for Idena or its processes or environment. The IIP should provide a concise technical specification of the feature and a rationale for the feature. The IIP author is responsible for building consensus within the community and documenting dissenting opinions.

### IIP Types

There are three types of IIP:

- `Standard` IIP describes any change that affects most or all Idena implementations, such as a change to the network protocol, validation protocol, a change in block or transaction validity rules, proposed application standards/conventions, or any change or addition that affects the interoperability of applications using Idena.
- `Meta` IIP describes a process surrounding Idena or proposes a change to (or an event in) a process.
- `Informational` IIP describes an Idena design issue, or provides general guidelines or information to the Idena community, but does not propose a new feature. Informational IIPs do not necessarily represent Idena community consensus or a recommendation, so users and implementers are free to ignore Informational IIPs or follow their advice.

### IIP Work Flow

`Idea` - An idea that is pre-draft. This is not tracked within the IIPs.

`Draft` - The first formally tracked stage of an IIP in development. An IIP is merged by an IIP Editor into the IIP repository when properly formatted.

`Review` - An IIP Author marks an IIP as ready for and requesting Peer Review and Oracle Voting.

If this period results in necessary normative changes it will revert the IIP to Drafts.

A Proposed IIP may progress to Final only when specific criteria reflecting real-world adoption has occurred. This is different for each IIP depending on the nature of its proposed changes. Evaluation of this status change should be objectively verifiable.

`Final` - This IIP represents the final standard. A Final IIP exists in a state of finality and should only be updated to correct errata and add non-normative clarifications.

`Stagnant` - Any IIP in `Draft` or `Review` if inactive for a period of 6 months or greater is moved to Stagnant. An IIP may be resurrected from this state by Authors or IIP Editors through moving it back to Draft or it’s earlier status. If not resurrected, a proposal may stay forever in this status.

`Withdrawn` - The IIP Author(s) have withdrawn the proposed IIP. This state has finality and can no longer be resurrected using this IIP number. If the idea is pursued at later date it is considered a new proposal.

`Living` - A special status for IIPs that are designed to be continually updated and not reach a state of finality. This includes most notably IIP-1.

### What belongs in a successful IIP?

Each IIP should have the following parts:

- Preamble - headers containing metadata about the IIP, including the IIP number, a short descriptive title (limited to a maximum of 44 characters), a description (limited to a maximum of 140 characters), and the author details. Irrespective of the category, the title and description should not include IIP number.
- Abstract - Abstract is a multi-sentence (short paragraph) technical summary. This should be a very terse and human-readable version of the specification section. Someone should be able to read only the abstract to get the gist of what this specification does.
- Motivation (optional) - A motivation section is critical for IIPs that want to change the Idena protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the IIP solves. IIP submissions without sufficient motivation may be rejected outright.
- Specification - The technical specification should describe the syntax and semantics of any new feature.
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.
- Backwards Compatibility - All IIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The IIP must explain how the author proposes to deal with these incompatibilities. IIP submissions without a sufficient backwards compatibility treatise may be rejected outright.
- Reference Implementation - An optional section that contains a reference/example implementation that people can use to assist in understanding or implementing this specification.
- Security Considerations - All IIPs must contain a section that discusses the security implications/considerations relevant to the proposed change. Include information that might be important for security discussions, surfaces risks and can be used throughout the life-cycle of the proposal. E.g. include security-relevant design decisions, concerns, important discussions, implementation-specific guidance and pitfalls, an outline of threats and risks and how they are being addressed. IIP submissions missing the “Security Considerations” section will be rejected. An IIP cannot proceed to status “Final” without a Security Considerations discussion deemed sufficient by the reviewers.

### IIP Header Preamble

Each IIP must begin with an header preamble. The headers must appear in the following order:

- `iip`: IIP number (determined by the IIP editor)

- `title`: The IIP title is a few words, not a complete sentence

- `description`: Description is one full (short) sentence

- `author`: The list of the author’s or authors’ name(s) and/or username(s), or name(s) and email(s).

- `discussions-to`: The url pointing to the discussion thread (please create [Github discussion](https://github.com/idena-network/idena-docs/discussions))

- `status`: Draft, Review, Final, Stagnant, Withdrawn, Living

- `type`: Standard, Meta, or Informational

- `created`: Date the IIP was created on

- `withdrawal-reason`: A sentence explaining why the IIP was withdrawn. (Optional field, only needed when status is Withdrawn)

- `Translations`: The url pointing to the translated version of IIP. Anchor of the URL must be an emoji with the flag of the language that represents the translated version of IIP.

### IIP Editors

The current IIP editors are

- midenaio

### IIP Editor Responsibilities

For each new IIP that comes in, an editor does the following:

- Read the IIP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don’t seem likely to get to final status.
- The title should accurately describe the content.
- Check the IIP for language (spelling, grammar, sentence structure, etc.), markup, code style

If the IIP isn’t ready, the editor will send it back to the author for revision.

Once the IIP is ready for the repository, the IIP editor will:

- Assign an IIP number
- Merge the corresponding pull request

The editors don’t pass judgment on IIPs. We merely do the administrative & editorial part.

### History

This document was derived heavily from Ethereum's EIP-1 and Bitcoin’s BIP-0001. In many places text was simply copied and modified.
