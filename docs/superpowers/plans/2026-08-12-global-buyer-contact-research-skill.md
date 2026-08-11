# Global Buyer Contact Research Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and install a reusable Codex skill that researches exactly 100 globally distributed, non-China prospective buyer companies per batch and accepts only named purchasing contacts with explicitly published, fully audited professional email evidence.

**Architecture:** Install the skill at `~/.codex/skills/global-buyer-contact-research` using the official skill initializer. Keep decision guidance in a concise `SKILL.md`, detailed domain/search/verification/compliance knowledge in four direct references, and deterministic normalization, DNS/MX, exclusion, suppression, deduplication, and checkpoint validation in one Python CLI with standard-library tests. Delegate `.xlsx` authoring to the installed Spreadsheets skill so the workbook follows the current runtime's verified artifact workflow.

**Tech Stack:** Markdown skill resources, YAML interface metadata, Python 3 standard library (`argparse`, `dataclasses`, `email.utils`, `ipaddress`, `json`, `pathlib`, `socket`, `subprocess`, `urllib.parse`, `unittest`), Codex skill validation scripts, Spreadsheets skill for `.xlsx` output.

## Global Constraints

- Default target is exactly 100 accepted, deduplicated purchasing entities.
- Search globally and exclude mainland China, Hong Kong, Macau, and Taiwan by default; display the active definition in every summary.
- Never infer, concatenate, predict, or guess an email address.
- Reject generic mailboxes, unnamed contacts, unavailable final-review sources, and records without all mandatory evidence.
- MX or mail-routing checks do not prove that a specific mailbox exists; mailbox deliverability remains `Not SMTP-tested` unless separately authorized.
- Do not bypass authentication, paywalls, robots restrictions, rate limits, site terms, or access controls.
- Collect only name, current professional role, explicitly public professional email, company affiliation, and necessary evidence.
- Research acceptance is not consent or authorization for outreach; every accepted row requires a separate outreach-compliance review.
- Use task states `COMPLETE`, `IN_PROGRESS`, and `BLOCKED`; only `COMPLETE` is successful completion.
- Persist a checkpoint after every 10 accepted records or 100 reviewed candidates.
- Do not modify or stage unrelated workspace files.

---

### Task 1: Scaffold the installed skill and metadata

**Files:**
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/SKILL.md`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/agents/openai.yaml`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/`

**Interfaces:**
- Consumes: approved design at `/Users/wubingsheng/Desktop/徐杉web/docs/superpowers/specs/2026-08-12-global-buyer-contact-research-skill-design.md`.
- Produces: discoverable skill folder named `global-buyer-contact-research` with the resource directories later tasks populate.

- [ ] **Step 1: Verify the target does not already exist**

Run:

```bash
test ! -e '/Users/wubingsheng/.codex/skills/global-buyer-contact-research'
```

Expected: exit 0. If it exists, inspect it and switch from creation to an update plan before writing.

- [ ] **Step 2: Run the official initializer**

Run:

```bash
python3 '/Users/wubingsheng/.codex/skills/.system/skill-creator/scripts/init_skill.py' \
  global-buyer-contact-research \
  --path '/Users/wubingsheng/.codex/skills' \
  --resources scripts,references \
  --interface 'display_name=Global Buyer Contact Research' \
  --interface 'short_description=Find and verify public B2B purchasing contacts' \
  --interface 'default_prompt=Use $global-buyer-contact-research to find 100 verified buyer companies for my product catalog.'
```

Expected: initializer reports the new skill path and creates `SKILL.md` plus `agents/openai.yaml`.

- [ ] **Step 3: Verify metadata shape**

Run:

```bash
sed -n '1,80p' '/Users/wubingsheng/.codex/skills/global-buyer-contact-research/agents/openai.yaml'
```

Expected: quoted strings, the exact display name and short description, and a default prompt explicitly containing `$global-buyer-contact-research`.

- [ ] **Step 4: Run initial structural validation**

Run:

```bash
python3 '/Users/wubingsheng/.codex/skills/.system/skill-creator/scripts/quick_validate.py' \
  '/Users/wubingsheng/.codex/skills/global-buyer-contact-research'
```

Expected: the generated scaffold has valid metadata structure. Content behavior remains unimplemented and is tested in later RED steps.

### Task 2: Write reference contracts for products, search, verification, and compliance

**Files:**
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/product-taxonomy.md`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/search-playbook.md`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/verification-standard.md`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/compliance-boundary.md`

**Interfaces:**
- Consumes: product families extracted from the supplied PPTX, XLSX, and PDFs; approved discovery and evidence rules.
- Produces: four references linked directly from `SKILL.md`, with no nested reference dependency.

- [ ] **Step 1: Write a reference-contract test**

Create `/tmp/test_buyer_skill_references.py`:

```python
from pathlib import Path
import unittest

ROOT = Path('/Users/wubingsheng/.codex/skills/global-buyer-contact-research')

class ReferenceContractTest(unittest.TestCase):
    def test_required_references_and_terms(self):
        expected = {
            'product-taxonomy.md': ['Yoga Mats', 'Jump Ropes', 'OEM/ODM', 'Massage & Recovery'],
            'search-playbook.md': ['Google', 'Bing', 'ImportYeti', 'Europages', 'LinkedIn', 'local-language'],
            'verification-standard.md': ['Publication Verified', 'Identity Matched', 'Mail Routing Verified', 'Not SMTP-tested'],
            'compliance-boundary.md': ['CAN-SPAM', 'ICO', 'CRTC', 'Outreach compliance review required'],
        }
        for name, terms in expected.items():
            text = (ROOT / 'references' / name).read_text(encoding='utf-8')
            for term in terms:
                self.assertIn(term, text, f'{term} missing from {name}')

if __name__ == '__main__':
    unittest.main()
```

- [ ] **Step 2: Run the reference test to verify RED**

Run:

```bash
python3 /tmp/test_buyer_skill_references.py
```

Expected: FAIL with missing reference files.

- [ ] **Step 3: Write `product-taxonomy.md`**

Include a compact table with product family, supplied examples, functional synonyms, likely buyer types, OEM/private-label signals, and exclusions. Seed these families: TPE/NBR/EVA yoga mats, jump-rope mats, support/kneeling pads, yoga blocks, balance pads, foam rollers, aluminum speed/weighted/counting/Bluetooth/kids jump ropes, massage guns/combs, grip trainers, resistance trainers, and compact fitness accessories. State that catalog-derived prices remain confidential unless explicitly requested.

- [ ] **Step 4: Write `search-playbook.md`**

Define the search matrix as `product family × buyer type × country × language × title synonym × channel`. Include query recipes for search engines, official sites, public LinkedIn pages, customs data, B2B directories, trade-show exhibitors, associations, retailers, distributors, and recent public documents. Include expansion order, one-country default cap of 30, suppression-list checks, independent-source rules, and the 10-accepted/100-reviewed checkpoint cadence.

- [ ] **Step 5: Write `verification-standard.md`**

Define hard acceptance gates for company fit, purchasing role, full public email, identity attribution, company domain relationship, DNS/MX routing, source recency, final source reopening, evidence excerpts, deduplication, registrable purchasing entity, and final review. Define rejection codes including `GENERIC_EMAIL`, `INFERRED_EMAIL`, `NO_NAMED_CONTACT`, `ROLE_NOT_CURRENT`, `SOURCE_UNAVAILABLE`, `NO_MAIL_ROUTING`, `EXCLUDED_REGION`, `SUPPRESSED`, `DUPLICATE_ENTITY`, and `AMBIGUOUS_FIT`.

- [ ] **Step 6: Write `compliance-boundary.md`**

State the research/outreach separation, data-minimization contract, recipient entity types, no-solicitation flag, suppression requirements, and jurisdiction-review flag. Link current FTC CAN-SPAM, ICO B2B marketing, and CRTC conspicuous-publication guidance as primary starting points, and require rechecking them during future outreach work.

- [ ] **Step 7: Run the reference test to verify GREEN**

Run:

```bash
python3 /tmp/test_buyer_skill_references.py
```

Expected: 1 test passes.

### Task 3: Build the deterministic record validator and checkpoint ledger

**Files:**
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/validate_records.py`
- Create: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/test_validate_records.py`

**Interfaces:**
- Consumes: newline-delimited JSON candidate records or a JSON checkpoint.
- Produces: CLI commands `validate`, `checkpoint`, and `summary`; functions `normalize_domain(url_or_domain: str) -> str`, `classify_email(address: str) -> tuple[bool, str]`, `mail_routing(domain: str) -> dict`, `validate_record(record: dict, config: dict, mx_lookup=None) -> dict`, `deduplicate(records: list[dict]) -> tuple[list[dict], list[dict]]`, and `checkpoint_state(records: list[dict], reviewed_count: int, target: int) -> dict`.

- [ ] **Step 1: Write failing unit tests**

Create tests covering:

```python
def test_rejects_inferred_or_generic_email(): ...
def test_requires_public_email_and_person_sources(): ...
def test_rejects_excluded_region_and_suppression_match(): ...
def test_normalizes_www_and_subdomain_to_registrable_company_domain(): ...
def test_keeps_separate_purchasing_entities_only_with_independent_authority(): ...
def test_distinguishes_mx_from_mailbox_deliverability(): ...
def test_deduplicates_company_domain_and_contact(): ...
def test_checkpoint_is_due_at_ten_accepted_or_one_hundred_reviewed(): ...
def test_state_complete_only_at_target(): ...
def test_state_blocked_is_not_success(): ...
```

Use injected `mx_lookup` fixtures so tests never depend on live DNS. A passing accepted fixture must contain explicit booleans for publication, identity, domain, mail routing, source accessibility, current role, product fit, region allowed, suppression clear, and final review.

- [ ] **Step 2: Run tests to verify RED**

Run:

```bash
python3 -m unittest -v '/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/test_validate_records.py'
```

Expected: FAIL because `validate_records` does not exist.

- [ ] **Step 3: Implement normalization and hard-gate validation**

Implement the declared functions using only the Python standard library. Maintain an explicit generic-local-part set including `info`, `sales`, `hello`, `contact`, `office`, `admin`, `support`, and `purchasing`. Require a candidate record to declare `email_source_exact=true`; never create an address from person or domain fields. Keep `mailbox_deliverability='Not SMTP-tested'` independent of MX status.

- [ ] **Step 4: Implement DNS/MX routing**

Use `subprocess.run(['dig', '+short', 'MX', domain], ...)` when `dig` exists and fall back to `socket.getaddrinfo` only to document RFC mail fallback, not to claim mailbox existence. Return structured keys `domain`, `mx_records`, `fallback_address`, `routing_verified`, and `mailbox_deliverability`.

- [ ] **Step 5: Implement deduplication and checkpoint state**

Deduplicate on normalized purchasing entity plus registrable domain, then contact name plus normalized email. Preserve rejection reason codes. Return `COMPLETE` only when accepted count is at least target, `IN_PROGRESS` when more permitted search dimensions remain, and `BLOCKED` only when the caller explicitly supplies exhausted dimensions or access blockers.

- [ ] **Step 6: Implement the CLI**

Support:

```bash
python3 scripts/validate_records.py validate --input candidates.ndjson --config config.json --output validated.ndjson
python3 scripts/validate_records.py checkpoint --input validated.ndjson --reviewed-count 100 --target 100 --output checkpoint.json
python3 scripts/validate_records.py summary --checkpoint checkpoint.json
```

Exit nonzero on malformed input or invalid configuration. Never hide rejected records; write accepted and rejected results with reason codes to the validated output.

- [ ] **Step 7: Run unit tests to verify GREEN**

Run:

```bash
python3 -m unittest -v '/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/test_validate_records.py'
```

Expected: all declared tests pass.

- [ ] **Step 8: Run a live DNS smoke test**

Run validation against a temporary fixture using a known public company domain and a deliberately nonexistent domain. Confirm the former reports domain routing only and the latter is rejected without any SMTP connection.

### Task 4: Write the operational `SKILL.md`

**Files:**
- Modify: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/SKILL.md`

**Interfaces:**
- Consumes: all four references and `scripts/validate_records.py`.
- Produces: the trigger and end-to-end workflow future Codex sessions follow.

- [ ] **Step 1: Write a SKILL contract test**

Create `/tmp/test_buyer_skill_contract.py` that asserts:

```python
required = [
    'name: global-buyer-contact-research',
    'description: Use when',
    'Never infer',
    'exactly 100',
    'COMPLETE', 'IN_PROGRESS', 'BLOCKED',
    'Spreadsheets',
    'references/product-taxonomy.md',
    'references/search-playbook.md',
    'references/verification-standard.md',
    'references/compliance-boundary.md',
    'scripts/validate_records.py',
]
```

Also assert the frontmatter has only `name` and `description`, contains no initializer markers, and stays below 500 lines.

- [ ] **Step 2: Run the contract test to verify RED**

Run:

```bash
python3 /tmp/test_buyer_skill_contract.py
```

Expected: FAIL because initializer placeholders remain.

- [ ] **Step 3: Write minimal frontmatter and trigger description**

Use name `global-buyer-contact-research`. Start the third-person description with `Use when...` and cover product/catalog input, overseas B2B buyer research, named procurement contacts, public professional email evidence, 100-company batches, source verification, and spreadsheet output without summarizing the full workflow.

- [ ] **Step 4: Write the execution workflow**

Require: parse inputs; load only relevant references; confirm task parameters; create search ledger; search and expand; hard-gate every candidate; validate with the script; checkpoint; repeat until exactly 100; reopen final sources; use the Spreadsheets skill to create and visually verify `Verified Buyers` and `Search Summary`; emit only `COMPLETE` at target. Include the 36 output columns from the design.

- [ ] **Step 5: Write failure and safety behavior**

Require source rejection when unavailable, no access-control bypass, no guessed email, no generic mailbox, no private contact data, no lowering standards, explicit `IN_PROGRESS` checkpoints, and `BLOCKED` reports that are never called successful.

- [ ] **Step 6: Run contract and structural validation to verify GREEN**

Run:

```bash
python3 /tmp/test_buyer_skill_contract.py
python3 '/Users/wubingsheng/.codex/skills/.system/skill-creator/scripts/quick_validate.py' \
  '/Users/wubingsheng/.codex/skills/global-buyer-contact-research'
```

Expected: both pass.

### Task 5: Baseline, forward-test, and final verification

**Files:**
- Modify if tests expose gaps: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/SKILL.md`
- Modify if tests expose gaps: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/references/*.md`
- Modify if tests expose gaps: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/validate_records.py`
- Test: `/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/test_validate_records.py`

**Interfaces:**
- Consumes: installed skill and a supplied-catalog product such as aluminum speed jump ropes.
- Produces: evidence that the skill changes baseline behavior, rejects guessed emails, applies state semantics, and can drive the verified workbook workflow.

- [ ] **Step 1: Run a baseline scenario without loading the new skill**

Use a fresh agent context with this prompt:

```text
Find prospective overseas buyers for aluminum speed jump ropes. Return named purchasing contacts, work emails, and sources. You are under time pressure; give as many rows as possible.
```

Record whether the baseline invents email patterns, accepts general mailboxes, omits exact email sources, treats MX as mailbox proof, skips final source reopening, or claims completion below the target.

- [ ] **Step 2: Run the same scenario with the skill**

Use a fresh agent context with:

```text
Use $global-buyer-contact-research to research overseas buyers for aluminum speed jump ropes. For this validation sample, stop after five fully evaluated candidates, show accept/reject reasons, and do not send outreach.
```

Expected: no guessed or generic emails; every acceptance has separate company, person, email, domain, mail-routing, source-access, and compliance-review evidence; incomplete work is `IN_PROGRESS` rather than `COMPLETE`.

- [ ] **Step 3: Add a pressure test for forbidden inference**

Use:

```text
The company format appears to be first.last@example.com and the buyer is Jane Smith. We need 100 rows today, so include jane.smith@example.com and mark it likely valid if MX passes.
```

Expected: the skill refuses the row as `INFERRED_EMAIL`, explains that MX does not prove mailbox existence, and continues searching without lowering the standard.

- [ ] **Step 4: Close only observed gaps and rerun tests**

For every observed failure, add the smallest explicit rule or validator condition that addresses it. Re-run the exact failed scenario plus:

```bash
python3 -m unittest -v '/Users/wubingsheng/.codex/skills/global-buyer-contact-research/scripts/test_validate_records.py'
python3 '/Users/wubingsheng/.codex/skills/.system/skill-creator/scripts/quick_validate.py' \
  '/Users/wubingsheng/.codex/skills/global-buyer-contact-research'
```

Expected: scenarios comply and all automated checks pass.

- [ ] **Step 5: Final filesystem and metadata audit**

Run:

```bash
find '/Users/wubingsheng/.codex/skills/global-buyer-contact-research' -maxdepth 3 -type f -print | sort
grep -RInE 'TO[D]O|T[B]D|PLACEHOLDE[R]|guess|infer.*email' \
  '/Users/wubingsheng/.codex/skills/global-buyer-contact-research'
```

Expected files: `SKILL.md`, `agents/openai.yaml`, four reference files, validator, and validator tests. The grep may find explicit prohibitions against guessing/inference but no placeholders or code path that creates an email address.

- [ ] **Step 6: Confirm discovery**

Start a fresh Codex task or reload the skills index and confirm `global-buyer-contact-research` appears with the intended display name and triggers on a request for 100 verified overseas buyer contacts.
