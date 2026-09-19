-- Backfills the tables/columns from 20260919100000 using the existing jsonb
-- data. Run this once, immediately after that migration, before any
-- operator edits happen through the old jsonb columns (this reads live
-- jsonb state, not a fixed snapshot, but running it twice will duplicate
-- center_prices/center_sns_links/center_translations/events/meetings rows).

-- parking (1:1)
update public.centers
set
  parking_type = parking ->> 'type',
  parking_description = parking ->> 'description'
where parking is not null;

-- i18n -> center_translations (locale 'en', the only locale in use today)
insert into public.center_translations (center_id, locale, name, address, description, parking_description)
select
  id,
  'en',
  i18n ->> 'name',
  i18n ->> 'address',
  i18n ->> 'description',
  i18n #>> '{parking,description}'
from public.centers
where i18n is not null;

-- prices -> center_prices (is_affiliate = false)
insert into public.center_prices (center_id, is_affiliate, name, name_en, price, sort_order)
select
  c.id,
  false,
  p.value ->> 'name',
  p.value ->> 'nameEn',
  (p.value ->> 'price')::integer,
  p.ordinality - 1
from public.centers c
cross join lateral jsonb_array_elements(c.prices) with ordinality as p(value, ordinality)
where c.prices is not null;

-- affiliate_prices -> center_prices (is_affiliate = true)
insert into public.center_prices (center_id, is_affiliate, name, name_en, price, sort_order)
select
  c.id,
  true,
  p.value ->> 'name',
  p.value ->> 'nameEn',
  (p.value ->> 'price')::integer,
  p.ordinality - 1
from public.centers c
cross join lateral jsonb_array_elements(c.affiliate_prices) with ordinality as p(value, ordinality)
where c.affiliate_prices is not null;

-- sns_links -> center_sns_links
insert into public.center_sns_links (center_id, type, url, sort_order)
select
  c.id,
  s.value ->> 'type',
  s.value ->> 'url',
  s.ordinality - 1
from public.centers c
cross join lateral jsonb_array_elements(c.sns_links) with ordinality as s(value, ordinality)
where c.sns_links is not null;

-- departure (1:1)
update public.app_config
set
  departure_name = departure ->> 'name',
  departure_name_en = departure ->> 'nameEn',
  departure_naver_place_id = departure ->> 'naverPlaceId'
where departure is not null;

-- event -> events (one row today; the table allows history going forward)
insert into public.events (active, title, title_en, description, description_en, event_date, end_date, link_url, link_label, link_label_en)
select
  coalesce((event ->> 'active')::boolean, false),
  event ->> 'title',
  event ->> 'titleEn',
  event ->> 'description',
  event ->> 'descriptionEn',
  nullif(event ->> 'date', '')::date,
  nullif(event ->> 'endDate', '')::date,
  event ->> 'linkUrl',
  event ->> 'linkLabel',
  event ->> 'linkLabelEn'
from public.app_config
where event is not null and id = true;

-- meeting -> meetings
insert into public.meetings (active, center_id, meeting_date, meeting_time)
select
  coalesce((meeting ->> 'active')::boolean, false),
  nullif(meeting ->> 'centerId', ''),
  nullif(meeting ->> 'date', '')::date,
  nullif(meeting ->> 'time', '')::time
from public.app_config
where meeting is not null and id = true;
