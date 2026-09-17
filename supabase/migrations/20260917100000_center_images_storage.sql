-- Supabase Storage bucket for center images uploaded from the admin app
-- (hy-climb-admin). Public read so the main SPA can render a plain
-- `https://<project>.supabase.co/storage/v1/object/public/center-images/...`
-- URL; write restricted to operators via the same is_operator() check used
-- by the centers/app_config tables (docs/wiki/09-decisions.md WIKI-DEC-005).

insert into storage.buckets (id, name, public)
values ('center-images', 'center-images', true)
on conflict (id) do nothing;

create policy "center_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'center-images');

create policy "center_images_operator_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'center-images' and public.is_operator());

create policy "center_images_operator_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'center-images' and public.is_operator())
  with check (bucket_id = 'center-images' and public.is_operator());

create policy "center_images_operator_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'center-images' and public.is_operator());
