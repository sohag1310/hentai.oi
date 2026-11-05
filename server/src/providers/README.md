# Provider interface

`DemoProvider` is intentionally the default provider. Replace it only with a source you own,
have permission to access, or a licensed content API. Do not scrape private endpoints,
bypass access controls, or proxy copyrighted streams without authorization.

A real provider must implement `CatalogProvider` in `../types.ts` and return only verified,
authorized poster and playback URLs.
