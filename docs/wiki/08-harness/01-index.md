# Harness Index

이 폴더는 LLM harness 운영 기준, agent 계약, 작업 소유권, 품질 게이트를 다룬다. 제품 범위와 기능 의미는 상위 위키 문서를 따른다.

## 읽는 순서

1. [02-operating-model.md](02-operating-model.md), harness 수준, packet, DoneClaim, escalation 기준을 확인한다.
2. [03-context-isolation.md](03-context-isolation.md), stale context, dirty worktree, prompt injection, misleading success 대응을 확인한다.
3. [04-agent-contracts.md](04-agent-contracts.md), worker packet과 verifier 계약을 확인한다.
4. [05-worktree-and-ownership.md](05-worktree-and-ownership.md), path ownership와 충돌 방지 규칙을 확인한다.
5. [06-quality-and-evolution.md](06-quality-and-evolution.md), gate, regression handling, roadmap 경계를 확인한다.
