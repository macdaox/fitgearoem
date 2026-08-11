# Global Buyer Contact Research Skill Design

## Objective

Create a reusable Codex skill that accepts one or more products or product catalogs and produces an Excel workbook containing 100 verified prospective buyer companies outside China. Every accepted row must include a named purchasing decision-maker and an explicitly published professional email address.

The skill is intended for overseas B2B prospecting for fitness products, including yoga mats and accessories, jump ropes, massage and recovery products, grip trainers, resistance products, and OEM/ODM fitness accessories. It must also work with future product catalogs rather than hard-code only the current catalog.

## Geographic Scope

- Search globally.
- Exclude mainland China, Hong Kong, Macau, and Taiwan by default. Expose this as a task parameter and display the active exclusion definition in every search summary.
- Search in English and, where useful, the target country's local language.
- Treat company headquarters and the contact's current employing entity as the location test. Exclude a record if the relevant purchasing entity is in an excluded region.
- By default, cap one country at 30 accepted companies so the batch is not dominated by one market. The user may override this distribution rule.

## Accepted Inputs

- Product name, description, category, model list, or keywords.
- PDF, PPTX, DOCX, XLSX, CSV, images, or a public catalog URL.
- Multiple products in one request.
- Optional suppression lists containing existing customers, competitors, previously contacted companies, disallowed brands, domains, people, or email addresses.

Extract product families, use cases, materials, differentiators, OEM/ODM capabilities, buyer types, product synonyms, and likely local-language search terms. Prices and other confidential commercial details may inform positioning but must not be copied into prospect outputs unless the user explicitly requests it.

## Prospect Definition

A qualifying company must plausibly purchase, import, distribute, wholesale, private-label, merchandise, or retail the supplied product. Manufacturers qualify only when the evidence shows they buy the relevant finished product or outsourced category; merely making a similar product is insufficient.

Priority company types include:

- Importers and distributors
- Sporting goods and fitness wholesalers
- Retail chains and specialist retailers
- Fitness, yoga, recovery, and running brands
- Private-label and e-commerce brands
- Gyms or studio groups with centralized procurement
- Promotional-product suppliers when the product and OEM offer fit

## Contact Definition

Accept a named person only when a public source confirms a current, relevant role. Priority titles include Procurement Manager, Purchasing Manager, Buyer, Senior Buyer, Category Manager, Sourcing Manager, Strategic Sourcing Manager, Merchandising Manager, Import Manager, Supply Chain Director, Head of Procurement, and equivalent local-language titles. Owner, Founder, Managing Director, or General Manager may qualify at a small company when that person plausibly owns purchasing decisions.

Reject generic departments, unnamed contacts, contact forms, and general mailboxes such as `info@`, `sales@`, `hello@`, or `purchasing@` without an identified individual.

Rank candidates for research efficiency without allowing a score to replace any mandatory evidence. Prefer direct procurement and category roles. Accept Owner, Founder, Managing Director, or General Manager only when company size and public evidence make purchasing responsibility plausible.

## Discovery Channels

Use channels for candidate discovery in this order, varying the order when regional coverage makes another source stronger:

1. Google and Bing search.
2. Official company websites, catalogs, team pages, press releases, and public PDFs.
3. Public LinkedIn company and professional pages.
4. Customs and shipment databases, including ImportYeti where US maritime coverage is relevant.
5. B2B directories such as Europages, Kompass, WLW, and Thomasnet.
6. Official exhibitor directories for relevant trade shows, including FIBO, IHRSA, ISPO, The Running Event, and Dubai Active.
7. Industry associations and public member directories.
8. Retailer, distributor, marketplace brand, and professional dealer directories.
9. Recent press releases, public job listings, and public corporate documents.

Directories, search snippets, shipment databases, and social profiles may identify candidates. They do not alone prove every required field.

Treat duplicated or syndicated content as one source. Two websites repeating the same press release, profile, directory record, or underlying dataset are not independent evidence.

Respect authentication, paywalls, robots restrictions, rate limits, applicable site terms, and technical access controls. Do not bypass restrictions or use credentials not authorized for the task.

## Evidence and Verification Contract

Every final row must pass all checks:

### Company fit

- The official website is accessible and identifies the company.
- Official product or business content directly supports product relevance.
- A second independent source supports the company's importer, distributor, retailer, brand, wholesale, or purchasing role when that role is not explicit on the official site.

### Person and role

- A company page, recent company publication, public professional profile, association page, or trade-show document identifies the person's full name and current relevant role.
- Prefer evidence published or updated within the last 24 months.
- Older evidence requires a separate current-role confirmation.

### Email

- The complete professional email address must appear verbatim in an accessible public webpage or public document.
- Never generate, concatenate, infer, predict, or guess an address from a naming pattern.
- Never use email-finder output unless the exact address is independently visible in an acceptable public source.
- The address must be attributable to the named person.
- The email domain must match the company domain or have a documented relationship to the employing entity.
- Validate email syntax and confirm that the domain has usable DNS mail routing, including an MX record or documented mail fallback.
- Do not send a test email and do not perform invasive SMTP mailbox probing.
- Record email verification as separate facts:
  - `Publication Verified`: the full address appears verbatim in an acceptable public source.
  - `Identity Matched`: the source attributes the address to the named person.
  - `Domain Verified`: the domain belongs to the company or a documented employing entity.
  - `Mail Routing Verified`: the domain has usable MX or documented mail fallback.
  - `Mailbox Deliverability`: always state `Not SMTP-tested` unless the user separately authorizes a compliant mailbox-verification service.
- Never describe an address as a verified live mailbox solely because syntax and MX checks pass.

### Final row review

- Reopen every required person, role, company-fit, and email source before final output. If a required source is no longer accessible and no equivalent public source is found, reject the row as `Source unavailable`.
- Confirm the company and person are outside the excluded regions.
- Confirm the role remains relevant to purchasing the supplied product.
- Confirm the exact email is present in the cited source.
- Confirm domain and DNS/MX status.
- Record the verification date and final decision.
- Save the page title, source type, publication/update date when visible, access date, and a short evidence excerpt sufficient to prove the field. Do not copy unnecessary page content.

Only records that pass every required check enter the final workbook.

## Data Minimization and Outreach Compliance Boundary

Collect only the named person's full name, current professional role, explicitly published professional email, company affiliation, and evidence needed for verification. Do not collect private email addresses, personal telephone numbers, home addresses, family details, unrelated social information, or sensitive personal data.

This skill performs prospect research. A publicly available professional address does not automatically authorize marketing outreach. Do not represent an accepted research row as consent to contact.

For each row:

- Record whether the recipient appears to represent a corporation, sole trader, partnership, or an unknown entity type.
- Record any visible statement restricting unsolicited messages or reuse of the contact information.
- Mark the row `Outreach compliance review required` unless the user supplies a separate, jurisdiction-specific approved outreach policy.
- Preserve evidence needed to support any later consent or legitimate-interest assessment, but do not make a definitive legal conclusion.

Any later outreach workflow must separately evaluate applicable privacy and electronic-marketing rules, sender identification, physical-address disclosure, relevance to the recipient's duties, consent or other lawful basis, suppression lists, and unsubscribe handling.

The compliance reference must route future reviews to current primary regulator guidance rather than encode one global rule. Seed it with:

- US Federal Trade Commission CAN-SPAM business guidance: <https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business>
- UK Information Commissioner's Office B2B marketing guidance: <https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/>
- Canadian Radio-television and Telecommunications Commission guidance on implied consent and conspicuous publication: <https://crtc.gc.ca/eng/com500/guide.htm>

Treat these links as starting points that must be rechecked at the time of an outreach task; they do not replace jurisdiction-specific legal review.

## Search Loop

The batch target is exactly 100 accepted, deduplicated companies unless the user requests another number.

Repeat the following loop until the target is reached:

1. Select an under-searched product family, buyer type, region, country, language, title synonym, and discovery channel.
2. Generate search queries from product synonyms, applications, OEM/private-label terms, buyer types, and procurement titles.
3. Discover candidate companies.
4. Verify company fit.
5. Find and verify a named decision-maker.
6. Locate an explicitly published professional email.
7. Run domain and DNS/MX checks.
8. Deduplicate and accept or reject the record.
9. Update the search ledger so later rounds do not repeat exhausted combinations.

Persist progress after every 10 newly accepted records or every 100 newly reviewed candidates, whichever occurs first. A checkpoint must contain accepted and rejected candidate identifiers, normalized domains, suppression matches, searched queries, countries, languages, channels, rejection reasons, and the next search dimension. Resume from the latest valid checkpoint instead of restarting.

When a round yields too few accepted records, expand in this order:

- Product synonyms and adjacent use cases
- Buyer types and relevant title variants
- Countries and local-language searches
- Trade-show, association, B2B, and shipment-data sources
- Smaller qualifying companies where an owner or managing director plausibly controls purchasing

Never lower the evidence standard to reach the target. Use exactly three task states:

- `COMPLETE`: the requested number of accepted, deduplicated, fully reviewed companies is present.
- `IN_PROGRESS`: the target has not yet been reached, progress is checkpointed, and another search round remains possible.
- `BLOCKED`: accessible public sources and permitted channels are exhausted or required access is blocked by authentication, paywalls, rate limits, robots restrictions, or unavailable services; completing the target requires user-provided access or a scope decision.

When blocked, report the verified count, missing count, exhausted search dimensions, and exact blockers. `BLOCKED` is not successful completion. Do not claim completion or fabricate rows.

## Deduplication

- One final row per company domain by default.
- Normalize company legal names, trading names, and domains before comparison.
- Define a company by the purchasing entity and registrable root domain. Exclude subsidiaries that share centralized procurement unless a separate local buying function, distinct relevant contact, and distinct purchasing authority are evidenced. Different national entities within a group may qualify separately only when all three conditions are met.
- Deduplicate people by normalized name, company, and email.
- Do not reuse one contact across multiple product rows in the same batch; combine relevant product categories in one cell.

## Workbook Output

Create a polished `.xlsx` workbook with a primary sheet named `Verified Buyers` and a supporting sheet named `Search Summary`.

`Verified Buyers` columns:

1. Record ID
2. Product Category
3. Company Name
4. Country/Region
5. Company Website
6. Company Type
7. Named Contact
8. Current Title
9. Public Professional Email
10. Product Match Rationale
11. Company Verification Source
12. Purchasing/Import Evidence Source
13. Person/Role Source
14. Email Verbatim Source
15. Email Domain
16. Publication Verified
17. Identity Matched
18. Domain Verified
19. Mail Routing Verified
20. Mailbox Deliverability
21. Person Evidence Excerpt
22. Email Evidence Excerpt
23. Person Source Page Title
24. Email Source Page Title
25. Person Source Type
26. Email Source Type
27. Source Publication/Update Date
28. Source Access Date
29. Recipient Entity Type
30. Public No-Solicitation Notice
31. Outreach Compliance Review
32. Source Recency
33. Verification Date
34. Reverification Required
35. Final Review Status
36. Reviewer Notes

Use plain-text source URLs in cells. Freeze headers, enable filters, use readable widths and wrapping, and visually distinguish verified status without adding unnecessary dashboards.

`Search Summary` must record:

- Requested and verified counts
- Included and excluded geography
- Product families searched
- Channels and languages used
- Search rounds completed
- Rejection counts by reason
- Duplicate count
- Suppression-list exclusion count
- Remaining count and blockers, if incomplete
- Current task state: `COMPLETE`, `IN_PROGRESS`, or `BLOCKED`
- Country distribution and any user-approved overrides
- Checkpoint identifier and resume instructions when incomplete
- Start and final verification dates

## Error Handling

- If a source is inaccessible, seek another acceptable public source; do not bypass access controls.
- If person and email evidence conflict, reject the record unless an authoritative current source resolves the conflict.
- If a domain has no usable mail routing, reject the record.
- If a company fit is ambiguous, reject it rather than weakening the qualification rule.
- Preserve a private working ledger of rejected candidates and reasons to prevent repeated work, but do not include unnecessary personal data.
- Mark records for reverification when a source is older than 24 months, role evidence becomes inconsistent, the company changes domains, or the final review does not occur in the same research session.

## Skill Contents

The skill should contain:

- A concise `SKILL.md` describing triggers, workflow, evidence rules, loop behavior, and output contract.
- `references/product-taxonomy.md` seeded from the supplied fitness catalogs and designed for extension.
- `references/search-playbook.md` containing buyer types, job-title variants, channel guidance, query patterns, and regional-language expansion guidance.
- `references/verification-standard.md` containing acceptable evidence, rejection rules, freshness rules, and the final-review checklist.
- `references/compliance-boundary.md` containing data-minimization rules, jurisdiction-review flags, suppression-list requirements, and the strict separation between research and outreach authorization.
- A script for deterministic email syntax, domain normalization, DNS/MX checking, and duplicate detection. The script must never generate or infer email addresses.
- A persistent search-ledger and checkpoint format that supports safe resume without duplicating prior work.
- An Excel output template or deterministic workbook builder only if it materially improves repeated output quality.
- `agents/openai.yaml` with matching user-facing metadata.

## Validation

Before deployment:

- Run a baseline research scenario without the skill and document failures or omissions.
- Validate skill structure and metadata.
- Test the deterministic validation script with valid, invalid, duplicate, excluded-region, and missing-MX cases.
- Test registrable-domain normalization, subsidiary handling, suppression lists, syndicated-source detection, country caps, and checkpoint resume behavior.
- Forward-test the skill on at least one catalog product without exposing expected answers.
- Confirm the forward test refuses inferred emails and incomplete contacts.
- Confirm the forward test distinguishes publication, identity, domain, mail-routing, and mailbox-deliverability states.
- Confirm inaccessible final-review sources cause rejection rather than acceptance.
- Confirm the workbook schema, source fields, deduplication, and verification summary are complete.

## Success Criteria

The skill succeeds only in state `COMPLETE`: it produces a verified workbook at the requested batch size, with no excluded-region companies, no suppression-list matches, no generic or inferred email addresses, no duplicate purchasing entities, and accessible final-review evidence for company fit, current role, and the exact public email address. Every accepted row distinguishes public-source verification from mailbox deliverability and remains marked for a separate outreach-compliance review. `IN_PROGRESS` and `BLOCKED` are accurate non-success terminal reports for the current run, with a checkpoint or blocker record that enables continuation without manufacturing completion.
