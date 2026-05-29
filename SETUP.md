# Hush Hush Tan — Shopify Theme Setup

## Upload
1. Shopify admin → **Online Store → Themes → Add theme → Upload zip file**.
2. Select `hush-hush-tan-theme.zip`.
3. Click **Customize** to start configuring.

## Navigation menus (Online Store → Navigation)
Create these menus and assign in the Header section:
- **main-menu** (header): Locations, Services & Pricing, Products, Parties & Events, Gift Certificates, About
- **footer-locations**: Austin, Dallas, Houston
- **footer-services**: Services Overview, Group Tanning, Mobile Tanning, Gift Certificates
- **footer-company**: About, Press, FAQ, Careers, Contact, Tanning Tips (blog)
- **footer-help**: Shipping, Privacy, Terms, Parental Consent

Then in **Customize → Header**, choose `main-menu`. In **Footer** blocks, assign each menu column to one of the above.

## Pages to create (Online Store → Pages)
Create the following pages and assign templates from the dropdown:

| Page title              | Handle             | Template                  |
|-------------------------|--------------------|---------------------------|
| Locations               | locations          | page.locations            |
| Austin                  | location-austin    | page.location-austin      |
| Dallas                  | location-dallas    | page.location-dallas      |
| Houston                 | location-houston   | page.location-houston     |
| Services & Pricing      | services           | page.services             |
| Austin Pricing          | services-austin    | page.services-austin      |
| Dallas Pricing          | services-dallas    | page.services-dallas      |
| Houston Pricing         | services-houston   | page.services-houston     |
| Group Tanning & Mimosas | group-tanning      | page.group-tanning        |
| Austin Mobile Tanning   | mobile-tanning     | page.mobile-tanning       |
| About / Our Story       | about              | page.about                |
| Contact                 | contact            | page.contact              |
| Press                   | press              | page.press                |
| FAQ                     | faq                | page.faq                  |
| Careers                 | careers            | page.careers              |

## Theme settings (Customize → Theme settings)
- **Logo**: upload the Hush Hush Tan horizontal logo.
- **Colors**: pre-set to white / lavender / dark text. Adjust if needed.
- **Booking links**: paste the Booker / SecureBooker URLs for Austin, Dallas, Houston.
- **Gift certificates**: paste the three external gift cert links.
- **Locations**: enter address, phone, hours, map link per city.
- **Parental consent**: paste form URL.

## Home page
Customize → Home page. Sections in order: Hero, Locations, Promise, Services, Glow grid, How it works, Pricing tabs, Parties (rich text), Featured products, Press, Newsletter, Final CTA. Set the Featured products collection to **Tanning Products** (or your equivalent handle).

## Product accordion content
Either add accordion blocks on each product in the customizer, or set product metafields:
- `custom.how_to_use` (rich text)
- `custom.benefits` (rich text)
- `custom.ingredients` (rich text)

## Sticky Book button
Picks up the user's last clicked location automatically (localStorage). Falls back to the Austin booking URL set in Theme settings.

## Policies
Settings → Policies. Shopify auto-creates Privacy / Shipping / Terms — links already wired in the footer.

## Notes
- All products and collections pull dynamically from Shopify — no hardcoded products.
- Cart drawer is AJAX; checkout button uses native Shopify checkout.
- Pricing tabs are hardcoded in `snippets/pricing-austin-houston.liquid` and `snippets/pricing-dallas.liquid` per the brand-supplied pricing sheet. Edit those snippets to update prices later.
