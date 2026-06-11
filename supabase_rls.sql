-- ════════════════════════════════════════════════════════════════
-- Supabase Row Level Security (RLS) policies — 寶貝成長紀錄
-- ════════════════════════════════════════════════════════════════
-- 為什麼需要：前端用的是 publishable key（公開金鑰），任何人都看得到。
-- 真正的存取控制必須由資料庫的 RLS 把關，否則別人可改/刪你的資料。
--
-- 使用方式：
--   1. 進 Supabase 後台 → SQL Editor → New query
--   2. 全選本檔內容貼上 → Run
--   3. 重新整理 app，確認自己的資料讀寫正常、共享功能正常
--
-- 權限模型：
--   • children        擁有者(user_id)可全權；被共享者只能讀
--   • child_shares    擁有者管理；被共享者可讀到「分享給我」的紀錄
--   • measurements    擁有者或被共享者皆可讀寫（依 child 存取權）
--   • supplements     同上
-- ════════════════════════════════════════════════════════════════

-- ── helper：目前使用者對某個 child 是否有存取權（擁有者 或 被共享者）──
create or replace function public.has_child_access(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1 from public.children c
      where c.id = cid and c.user_id = auth.uid()
    )
    or exists (
      select 1 from public.child_shares s
      where s.child_id = cid
        and lower(s.shared_with_email) = lower(auth.jwt() ->> 'email')
    );
$$;

-- ── children ──────────────────────────────────────────────────────
alter table public.children enable row level security;

drop policy if exists children_select on public.children;
create policy children_select on public.children
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.child_shares s
      where s.child_id = children.id
        and lower(s.shared_with_email) = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists children_insert on public.children;
create policy children_insert on public.children
  for insert with check (user_id = auth.uid());

drop policy if exists children_update on public.children;
create policy children_update on public.children
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists children_delete on public.children;
create policy children_delete on public.children
  for delete using (user_id = auth.uid());

-- ── child_shares ──────────────────────────────────────────────────
alter table public.child_shares enable row level security;

drop policy if exists child_shares_select on public.child_shares;
create policy child_shares_select on public.child_shares
  for select using (
    owner_id = auth.uid()
    or lower(shared_with_email) = lower(auth.jwt() ->> 'email')
  );

drop policy if exists child_shares_insert on public.child_shares;
create policy child_shares_insert on public.child_shares
  for insert with check (owner_id = auth.uid());

drop policy if exists child_shares_delete on public.child_shares;
create policy child_shares_delete on public.child_shares
  for delete using (owner_id = auth.uid());

-- ── measurements ──────────────────────────────────────────────────
alter table public.measurements enable row level security;

drop policy if exists measurements_all on public.measurements;
create policy measurements_all on public.measurements
  for all
  using (public.has_child_access(child_id))
  with check (public.has_child_access(child_id));

-- ── supplements ───────────────────────────────────────────────────
alter table public.supplements enable row level security;

drop policy if exists supplements_all on public.supplements;
create policy supplements_all on public.supplements
  for all
  using (public.has_child_access(child_id))
  with check (public.has_child_access(child_id));

-- ════════════════════════════════════════════════════════════════
-- 儲存空間 child-photos（照片桶）—— defense-in-depth
-- ────────────────────────────────────────────────────────────────
-- 現況：桶已是 private（外部/匿名無法存取，已實測）。
-- 以下政策再多一層：限制「已登入使用者」只能存取自己 + 被共享孩子的照片，
-- 避免有人猜路徑直接讀別人的照片。
-- 照片路徑格式：{user_id}/{child_id}.jpg
--
-- 前置：確認桶存在且為 private（後台 Storage → child-photos → 非 public）。
-- ════════════════════════════════════════════════════════════════

-- 擁有者：對自己資料夾（{auth.uid()}/...）可讀可寫
drop policy if exists child_photos_owner_all on storage.objects;
create policy child_photos_owner_all on storage.objects
  for all to authenticated
  using (
    bucket_id = 'child-photos'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  )
  with check (
    bucket_id = 'child-photos'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

-- 被共享者：只能「讀」被分享孩子的照片（檔名去掉 .jpg = child_id）
drop policy if exists child_photos_shared_read on storage.objects;
create policy child_photos_shared_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'child-photos'
    and exists (
      select 1 from public.child_shares s
      where s.child_id::text = regexp_replace(storage.filename(name), '\.jpg$', '')
        and lower(s.shared_with_email) = lower(auth.jwt() ->> 'email')
    )
  );
