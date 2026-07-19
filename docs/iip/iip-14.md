---
hide_title: true
title: IIP-14
sidebar_label: IIP-14 Repeated reported-flip penalty
---

## IIP-14: Repeated reported-flip penalty

`iip`: 14

`title`: Repeated reported-flip penalty

`description`: Penalize an identity when at least two of its flips receive the final reported grade in one validation ceremony.

`author`: ubiubi18

`discussions-to`: https://github.com/idena-network/idena-docs/discussions/187

`status`: Draft

`type`: Standard

`created`: 2025-08-05

`Translations`:

## Abstract

This proposal adds an identity-state penalty for an author with at least two flip submission slots whose final consensus grade is `GradeReported` in the same validation ceremony. If the ceremony succeeds, an identity whose pre-validation state is `Newbie` is killed. An identity whose pre-validation state is `Verified` or `Human` is suspended unless the existing validation rules already kill it. A single reported flip does not trigger the new state transition, but all existing penalties continue to apply.

The ordinary consequences of the resulting status still apply. Under the current consensus rules, killing a `Newbie` burns its full stake and removes its validation and invitation relationships. This proposal preserves the existing ceremony-wide failure guard: if no identity would remain `Newbie` or better, the ceremony fails and none of its calculated identity-state transitions are applied.

## Motivation

The protocol already withholds validation rewards from identities whose flips are reported, but that penalty may not deter identities that repeatedly publish reportable flips while retaining a validated identity. Repeated reported flips also consume reviewers' attention and reduce the quality of the validation experience.

Author-provided exploratory analysis suggests that some sampled epochs contain identities with multiple reported flips. The available artifacts do not include the complete raw dataset or the plotting program, do not establish author intent, and contain a noted epoch-label offset. They are therefore insufficient to justify activation by themselves. This proposal defines the consensus behavior while requiring a reproducible impact analysis before activation.

## Specification

### Definitions

- An **authored flip slot** is one position in the ceremony's canonical flip list together with the identity that submitted that position. It is identified by its canonical slot, not only by its CID.
- A **reported flip** is an authored flip slot whose immutable final `FlipQualification.grade`, produced by the existing qualification algorithm, is `GradeReported`.
- `reportedFlips(author)` is the number of that author's reported flip slots in the ceremony being finalized.
- **Pre-validation state** is the identity state used as the input to the ordinary validation transition.
- **Base next state** is the next identity state produced by every active consensus rule except this proposal.

### Counting reported flips

An implementation MUST derive `reportedFlips(author)` from the final `FlipQualification` array after the existing grading and invalid-grader filters have run. It MUST increment a separate per-author counter only when a slot has `grade == GradeReported`.

The count MUST NOT be inferred from `BadAuthors`, `AuthorResults.HasOneReportedFlip`, a reporter-reward map, raw report transactions, or an API field. Those representations either collapse multiple reports, include non-reported `QualifiedByNone` results, or are pruned for reward eligibility after flip grades are final. Removing a reporter from a reward map after qualification MUST NOT change the count.

The implementation MUST preserve the author and qualification of every canonical slot when two or more authors submit the same CID. Cross-author duplicate CIDs MUST NOT alias to one author or one slot during lottery assignment, qualification, or counting. The feature MUST remain disabled until the implementation handles this case deterministically.

### State transition

For every identity, an implementation MUST first calculate the base next state. It MUST then calculate the IIP-adjusted next state using the identity's pre-validation state:

| Reported flips | Pre-validation state | IIP-adjusted next state |
| --- | --- | --- |
| 0 or 1 | Any | Base next state |
| 2 or more | `Newbie` | `Killed` |
| 2 or more | `Verified` or `Human` | `Suspended`, unless the base next state is `Killed`; `Killed` MUST be preserved |
| 2 or more | Any other state | Base next state |

The new rule MUST NOT replace an outcome with a less severe state. In particular, a `Verified` identity that would ordinarily be killed remains `Killed`; it is not changed to `Suspended`.

Only the next state is adjusted. The pre-validation state used by existing stake-burning and other transition logic MUST remain unchanged. The adjusted next state MUST be calculated immediately after the base next state and before identity birthday calculation, invitation accounting, validation result construction, reporter reward eligibility, epoch-cache construction, and the count of identities remaining `Newbie` or better.

### Ceremony-wide failure precedence

The existing ceremony-wide failure guard takes precedence over the table above. After all IIP-adjusted next states are calculated, if no identity would remain `Newbie` or better, the ceremony is failed using the existing consensus behavior. None of the calculated state transitions, including this proposal's penalties, are applied for that ceremony. This proposal does not otherwise change failed-ceremony processing.

### Status effects and existing penalties

This proposal reuses the existing `Killed` and `Suspended` status semantics; it does not introduce separate balance or cleanup rules. Under the consensus rules current when this IIP was drafted:

- A `Newbie` changed to `Killed` has 100% of its stake burned and its validation and invitation relationships removed.
- A `Verified` or `Human` identity changed to `Suspended` keeps its stake but is no longer validated until it passes a later validation under the existing recovery rules.

This proposal does not change how a flip receives `GradeReported`, how reporters are filtered or rewarded, or how a bad author affects validation and invitation rewards. Those rules apply in addition to the state transition above. An identity with exactly one reported flip receives no new state penalty.

### Activation requirements

This rule changes consensus and MUST be disabled before activation. It MUST be enabled only by a future consensus upgrade accepted through the existing hard-fork process. This proposal does not reserve an application release number, consensus version, fork number, block, or epoch.

Activation MUST NOT be scheduled until all of the following are published and reviewed:

1. A production implementation and the integration tests listed in the Reference Implementation section.
2. A pinned, reproducible historical impact report containing the collector, aggregation program, immutable inputs, software versions, and exact epoch mapping. It MUST report affected identities by epoch, pre-validation state, and base next state; expected stake burned; expected suspensions; invitation effects; remaining validator and shard sizes; and any ceremony that would hit the global failure guard.
3. A threat analysis covering report-committee manipulation and its downstream stake and invitation consequences, cross-author duplicate CIDs, and distribution of flips across multiple identities.
4. An activation window and upgrade instructions that give node operators time to upgrade before the first ceremony governed by the new rule.

Because malicious intent is not observable from `GradeReported` alone, any claimed false-positive classification MUST include a documented labeling method and its limitations. The measurable historical impact data above is required even if no intent labels are used.

## Rationale

The threshold is an absolute count of two rather than a fraction of the author's required flips. This is simple to evaluate and targets repeated reports in one ceremony. A proportional rule such as two of three or three of five was considered in the discussion, but it would leave some identities unpenalized after publishing two reported flips and would add denominator-dependent thresholds.

The discussion also considered excluding `Newbie` identities, using a multi-epoch ratio of reported to created flips, and downgrading a `Human` identity to `Verified` instead of suspending it. Excluding `Newbie` identities would avoid an irreversible novice penalty but would also leave rotating new identities outside the deterrent. A multi-epoch ratio may reduce sensitivity to one ceremony, but it requires new persistent consensus state and delays the response. A `Human`-to-`Verified` downgrade preserves validated status and therefore does not meet this draft's goal of temporarily removing repeat offenders from the validator set. These are material governance choices rather than implementation details; they must be reconsidered using the required impact report before this IIP advances from Draft if the measured harm is disproportionate.

The rule uses the pre-validation state so an identity cannot escape the intended result through an ordinary transition in the same ceremony. It preserves an ordinary `Killed` result so the new rule cannot reduce an existing penalty.

The term `GradeReported` ties the proposal to a value already calculated by consensus. Phrases such as "bad flip," "low effort," or "malicious flip" are motivations, not additional consensus criteria.

The current global failure guard is preserved because changing the network-wide definition of a failed ceremony would be a separate consensus change. Its fail-open effect for this penalty is documented below and must be included in activation analysis.

## Evidence status

The [exploratory collection scripts and sample artifacts](https://github.com/ubiubi18/wrongwordsTRUE/tree/f1e2c36f74f087ceb6d0ecba62625a6b14515017) query historical Idena API data, but the repository does not contain the complete raw inputs or the program that produced its percentage chart. A sample artifact also notes an epoch-label offset. The chart is therefore omitted from this IIP and the repository is cited only as non-normative background. It does not satisfy the activation requirements above.

## Backwards Compatibility

This change is not backwards compatible. Once activated, an old node can calculate a different post-validation identity state and state root in a ceremony where the rule triggers. Nodes must upgrade before the activation window to remain on the canonical chain.

## Reference Implementation

There is no production reference implementation at the time of publication.

An implementation is expected to:

1. Create a separate exact reported-flip counter keyed by author from the final qualification array. Existing bad-author flags and reporter-reward structures MUST retain their current meanings.
2. Preserve a stable per-slot author and qualification throughout lottery assignment and analysis, including cross-author duplicate CIDs.
3. Apply the adjusted state immediately after the ordinary next-state calculation and before every downstream consumer, while preserving the original pre-validation state.
4. Include the adjusted state in the count used by the existing ceremony-wide failure guard and preserve that guard's current behavior.
5. Gate all new behavior behind the consensus upgrade that activates this proposal.

Integration tests MUST cover:

- Every row in the transition table, including a `Verified` identity whose base next state is already `Killed`.
- Zero, one, and two final `GradeReported` results; `QualifiedByNone` without `GradeReported`; reports removed by invalid-grader filters; and reporters removed later only from reward eligibility.
- Identical CIDs submitted by different authors without author or slot aliasing.
- Full Newbie stake burning, identity and invitation-link cleanup, suspension without stake burning, validation results, and epoch-cache replay.
- A ceremony where every otherwise surviving identity is penalized and the global failure guard discards all transitions, plus a ceremony with one unpenalized survivor where the penalties are applied.
- Identical ceremony input immediately before and after activation, with the feature disabled and enabled respectively.

The relevant current node paths are [flip qualification](https://github.com/idena-network/idena-go/blob/938be81dbdeff85f888f4337060a8ebabb12e5b5/core/ceremony/qualification.go#L117-L218), [author analysis](https://github.com/idena-network/idena-go/blob/938be81dbdeff85f888f4337060a8ebabb12e5b5/core/ceremony/ceremony.go#L1340-L1412), [identity-state finalization](https://github.com/idena-network/idena-go/blob/938be81dbdeff85f888f4337060a8ebabb12e5b5/core/ceremony/ceremony.go#L1135-L1207), and [state application](https://github.com/idena-network/idena-go/blob/938be81dbdeff85f888f4337060a8ebabb12e5b5/core/ceremony/ceremony.go#L947-L1027).

## Security Considerations

- **Irreversible false positives:** `GradeReported` is a committee-derived result, not proof of malicious intent. Two reported grades kill a `Newbie` and currently burn its full stake. The reproducible impact report and labeling limitations required above are safeguards against adopting the rule without quantifying who and how much it affects.
- **Coordinated reporting:** An attacker able to influence enough of a flip's report committee may cause `GradeReported`. This proposal increases the consequence from lost rewards to suspension or full Newbie stake loss and can also affect invitation accounting. It does not change report thresholds or committee selection.
- **Duplicate-CID aliasing:** The current node uses CID-keyed lookup in parts of author and lottery processing. Cross-author duplicate CIDs can alias slots and distort attribution or counting unless the implementation preserves stable per-slot data.
- **Identity distribution:** An attacker can avoid the new state penalty by limiting each identity to one reported flip or distributing flips across identities. Existing reward penalties still apply, but this proposal does not eliminate that strategy.
- **Global failure fail-open:** If the adjusted states leave no identity `Newbie` or better, the existing global guard fails the ceremony and applies none of the penalties. Preserving this behavior protects the existing liveness safeguard but creates an edge case that implementations and activation analysis must cover.
- **Network participation:** Killing or suspending identities can reduce the active validator set, including honest participants. Activation analysis must quantify the expected effects on validator and shard sizes.
- **Determinism:** Nodes must use the same final qualifications, canonical slot-to-author mapping, transition point, and failure precedence. Using mutable reward maps, API fields, or CID-only author lookup can cause a consensus split.
- **Penalty monotonicity:** The new transition must never improve an identity's base next state, and ordinary status side effects must remain intact.

## References

- [Community discussion](https://github.com/idena-network/idena-docs/discussions/187)
- [Exploratory historical scripts and sample artifacts](https://github.com/ubiubi18/wrongwordsTRUE/tree/f1e2c36f74f087ceb6d0ecba62625a6b14515017)
- [Current `idena-go` ceremony implementation](https://github.com/idena-network/idena-go/tree/938be81dbdeff85f888f4337060a8ebabb12e5b5/core/ceremony)
