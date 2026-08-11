# Global Buyer Contact Research Skill Design

## Objective

Create a reusable Codex skill that accepts one or more products or product catalogs and produces an Excel workbook containing 100 verified prospective buyer companies outside China. Every accepted row must include a named purchasing decision-maker and an explicitly published professional email address.

The skill is intended for overseas B2B prospecting for fitness products, including yoga mats and accessories, jump ropes, massage and recovery products, grip trainers, resistance products, and OEM/ODM fitness accessories. It must also work with future product catalogs rather than hard-code only the current catalog.

## Geographic Scope

- Search globally.
- Exclude mainland China, Hong Kong, Macau, and Taiwan.
- Search in English and, where useful, the target country's local language.
- Treat company headquarters and the contact's current employing entity as the location test. Exclude a record if the relevant purchasing entity is in an excluded region.

## Accepted Inputs

- Product name, description, category, model list, or keywords.
- PDF, PPTX, DOCX, XLSX, CSV, images, or a public catalog URL.
- Multiple products in one request.

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

### Final row review

- Reopen every cited source before output when practical.
- Confirm the company and person are outside the excluded regions.
- Confirm the role remains relevant to purchasing the supplied product.
- Confirm the exact email is present in the cited source.
- Confirm domain and DNS/MX status.
- Record the verification date and final decision.

Only records that pass every required check enter the final workbook.

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

When a round yields too few accepted records, expand in this order:

- Product synonyms and adjacent use cases
- Buyer types and relevant title variants
- Countries and local-language searches
- Trade-show, association, B2B, and shipment-data sources
- Smaller qualifying companies where an owner or managing director plausibly controls purchasing

Never lower the evidence standard to reach the target. If accessible public sources are exhausted or access is blocked by authentication, paywalls, rate limits, robots restrictions, or unavailable services, report the verified count, missing count, exhausted search dimensions, and exact blockers. Do not claim completion or fabricate rows.

## Deduplication

- One final row per company domain by default.
- Normalize company legal names, trading names, and domains before comparison.
- Exclude subsidiaries that share centralized procurement unless a separate local buying function and distinct contact are evidenced.
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
16. DNS/MX Check
17. Source Recency
18. Verification Date
19. Final Review Status
20. Reviewer Notes

Use plain-text source URLs in cells. Freeze headers, enable filters, use readable widths and wrapping, and visually distinguish verified status without adding unnecessary dashboards.

`Search Summary` must record:

- Requested and verified counts
- Included and excluded geography
- Product families searched
- Channels and languages used
- Search rounds completed
- Rejection counts by reason
- Duplicate count
- Remaining count and blockers, if incomplete
- Start and final verification dates

## Error Handling

- If a source is inaccessible, seek another acceptable public source; do not bypass access controls.
- If person and email evidence conflict, reject the record unless an authoritative current source resolves the conflict.
- If a domain has no usable mail routing, reject the record.
- If a company fit is ambiguous, reject it rather than weakening the qualification rule.
- Preserve a private working ledger of rejected candidates and reasons to prevent repeated work, but do not include unnecessary personal data.

## Skill Contents

The skill should contain:

- A concise `SKILL.md` describing triggers, workflow, evidence rules, loop behavior, and output contract.
- `references/product-taxonomy.md` seeded from the supplied fitness catalogs and designed for extension.
- `references/search-playbook.md` containing buyer types, job-title variants, channel guidance, query patterns, and regional-language expansion guidance.
- `references/verification-standard.md` containing acceptable evidence, rejection rules, freshness rules, and the final-review checklist.
- A script for deterministic email syntax, domain normalization, DNS/MX checking, and duplicate detection. The script must never generate or infer email addresses.
- An Excel output template or deterministic workbook builder only if it materially improves repeated output quality.
- `agents/openai.yaml` with matching user-facing metadata.

## Validation

Before deployment:

- Run a baseline research scenario without the skill and document failures or omissions.
- Validate skill structure and metadata.
- Test the deterministic validation script with valid, invalid, duplicate, excluded-region, and missing-MX cases.
- Forward-test the skill on at least one catalog product without exposing expected answers.
- Confirm the forward test refuses inferred emails and incomplete contacts.
- Confirm the workbook schema, source fields, deduplication, and verification summary are complete.

## Success Criteria

The skill succeeds when it produces a verified workbook at the requested batch size, with no excluded-region companies, no generic or inferred email addresses, no duplicate companies, and accessible evidence for company fit, current role, and the exact public email address. If external constraints make the requested size impossible, success means preserving the verification standard and reporting the incomplete count and blockers accurately rather than manufacturing completion.
