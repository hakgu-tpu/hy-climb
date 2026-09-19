-- Drops the jsonb columns superseded by 20260919100000_normalize_schema.sql
-- and backfilled by 20260919100100_normalize_data_backfill.sql, per
-- docs/wiki/09-decisions.md WIKI-DEC-006.
--
-- Cleared to run: hy-climb (src/contexts/DataContext.jsx) was verified
-- live 2026-09-19; the Project owner confirmed hy-climb-admin's
-- authenticated save/create/delete flows (center edit, price/SNS-link
-- rows, event/meeting activation) work end-to-end against the normalized
-- tables the same day. This is irreversible: the data already lives in
-- the normalized tables, but nothing restores these columns once dropped.

alter table public.centers
  drop column prices,
  drop column affiliate_prices,
  drop column sns_links,
  drop column parking,
  drop column i18n;

alter table public.app_config
  drop column departure,
  drop column event,
  drop column meeting;
