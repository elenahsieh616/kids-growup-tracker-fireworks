-- ════════════════════════════════════════════════════════════════
-- Supabase 安全設定 — 寶貝成長紀錄
-- ════════════════════════════════════════════════════════════════
-- 狀態（2026-06-11 實測 + 透過 Management API 驗證）：
--
-- ✅ 四張表 RLS 已啟用：children / child_shares / measurements / supplements
-- ✅ 既有政策（先前在 Supabase 後台設定，運作正常，保留不動）：
--      children      : owner(ALL) + shared_read_children(SELECT)
--      child_shares  : owner_manage_shares(ALL) + shared_user_see_shares(SELECT)
--      measurements  : owner(ALL) + shared_read/write/update/delete(共享者可讀寫)
--      supplements   : owner(ALL) + shared_read/write/update/delete(共享者可讀寫)
--      storage child-photos : read/upload/update/delete（限擁有者自己資料夾）
-- ✅ child-photos bucket 為 private（匿名無法列檔/下載，已實測）
--
-- 本檔只負責「補上原本缺的那一塊」：被共享者可以「讀」被分享孩子的照片。
-- 原本 Storage 只允許擁有者讀，導致共享對象看不到照片，這裡補上。
-- 可安全重複執行（drop if exists）。
--
-- 備註（選用、非必要）：既有 shared_* 政策的 email 比對為大小寫敏感
-- （shared_with_email = auth.jwt()->>'email'）。Google 帳號 email 一律小寫，
-- 實務上無影響；若要更保險可改為 lower(...) = lower(...)。
-- ════════════════════════════════════════════════════════════════

-- 被共享者：可「讀」被分享孩子的照片（路徑 {user_id}/{child_id}.jpg，檔名去 .jpg = child_id）
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
