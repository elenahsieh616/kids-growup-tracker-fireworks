/* ── DB Layer ── */
/* ── Supabase ── */
var S_URL='https://gfvccfpzwhwvuoxffafl.supabase.co';
var S_KEY='sb_publishable_7k8OUBz4clQhV57mSjkNlA_3xb_vTaA';
var db=supabase.createClient(S_URL,S_KEY);

/* ── DB Helpers ── */
async function db_getChildren(){
  // 兩個查詢互相獨立 → 並行，登入後清單載入更快
  var results=await Promise.all([
    db.from('children').select('*').eq('user_id',currentUser.id).order('created_at'),
    db.from('child_shares').select('id,child_id').eq('shared_with_email',currentUser.email)
  ]);
  var r1=results[0],r2=results[1];
  var own=(r1.data||[]).map(function(c){return Object.assign({},c,{_isOwner:true});});
  var shares=r2.data||[];
  var sharedChildren=[];
  if(shares.length){
    var ids=shares.map(function(s){return s.child_id;});
    var shareMap={};
    shares.forEach(function(s){shareMap[s.child_id]=s.id;});
    var r3=await db.from('children').select('*').in('id',ids);
    sharedChildren=(r3.data||[]).map(function(c){
      return Object.assign({},c,{_isOwner:false,_shareId:shareMap[c.id]});
    });
  }
  return own.concat(sharedChildren);
}
async function db_getShares(childId){
  var r=await db.from('child_shares').select('*').eq('child_id',childId).eq('owner_id',currentUser.id);
  return r.data||[];
}
async function db_addShare(childId,email){
  var r=await db.from('child_shares').insert({child_id:childId,owner_id:currentUser.id,shared_with_email:email}).select().single();
  if(r.error)throw r.error;
  return r.data;
}
async function db_removeShare(shareId){
  var r=await db.from('child_shares').delete().eq('id',shareId).eq('owner_id',currentUser.id);
  if(r.error)throw r.error;
}
async function db_insertChild(obj){
  var r=await db.from('children').insert(Object.assign({},obj,{user_id:currentUser.id})).select().single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_updateChild(id,obj){
  var r=await db.from('children').update(obj).eq('id',id);
  if(r.error) throw r.error;
}
async function db_deleteChild(childId){
  await db.from('supplements').delete().eq('child_id',childId);
  await db.from('measurements').delete().eq('child_id',childId);
  await db.storage.from('child-photos').remove([currentUser.id+'/'+childId+'.jpg']);
  var r=await db.from('children').delete().eq('id',childId);
  if(r.error) throw r.error;
}
async function db_getM(childId){
  var r=await db.from('measurements').select('id,date,height,weight,note').eq('child_id',childId).order('date',{ascending:false});
  return r.data||[];
}
async function db_insertM(obj){
  var r=await db.from('measurements').insert({date:obj.date,height:obj.height,weight:obj.weight,note:obj.note||null,child_id:currentChild.id,user_id:currentUser.id}).select('id,date,height,weight,note').single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_insertMBatch(arr){
  var rows=arr.map(function(r){return{date:r.date,height:r.height,weight:r.weight,note:r.note||null,child_id:currentChild.id,user_id:currentUser.id};});
  var r=await db.from('measurements').insert(rows).select('id,date,height,weight,note');
  if(r.error) throw r.error;
  return r.data||[];
}
async function db_deleteM(id){
  var r=await db.from('measurements').delete().eq('id',id);
  if(r.error) throw r.error;
}
async function db_getS(childId){
  var r=await db.from('supplements').select('id,date,type,name,note').eq('child_id',childId).order('date',{ascending:false});
  return r.data||[];
}
async function db_insertS(obj){
  var r=await db.from('supplements').insert({date:obj.date,type:obj.type,name:obj.name,note:obj.note||null,child_id:currentChild.id}).select('id,date,type,name,note').single();
  if(r.error) throw r.error;
  return r.data;
}
async function db_deleteS(id){
  var r=await db.from('supplements').delete().eq('id',id);
  if(r.error) throw r.error;
}
async function db_updateM(id,obj){
  var r=await db.from('measurements').update(obj).eq('id',id);
  if(r.error) throw r.error;
}
async function db_updateS(id,obj){
  var r=await db.from('supplements').update(obj).eq('id',id);
  if(r.error) throw r.error;
}

