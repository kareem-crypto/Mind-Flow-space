function makeDraggable(el){
  el.addEventListener('pointerdown', e=>{
    // نتأكد ان ما بنضغطش على زرار أو color-picker
    if(e.target.closest('.icon-btn') || e.target.closest('.color-picker')) return;
    
    let startX = e.clientX;
    let startY = e.clientY;
    let startLeft = parseFloat(el.style.left) || 0;
    let startTop = parseFloat(el.style.top) || 0;

    el.style.transition = 'transform 0.1s ease';

    function move(ev){
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      el.style.left = (startLeft + dx) + 'px';
      el.style.top = (startTop + dy) + 'px';
    }

    function up(){
      el.style.transition = '';
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      saveNotes(); // تحفظ الموقع بعد الحركة
    }

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  });
}

// تطبيق على كل نوتة موجودة
document.querySelectorAll('.note').forEach(n=>makeDraggable(n));

// لو أضفت نوتة جديدة أو To-Do
function addNote(){
  const n = document.createElement('div');
  n.className = 'note color1';
  n.style.left = '50px';
  n.style.top = '50px';
  n.innerHTML = `
    <div class="title" contenteditable="true">نوتة جديدة</div>
    <div class="content" contenteditable="true"></div>
    <div class="note-footer">
      <button class="icon-btn" onclick="this.parentElement.parentElement.remove(); saveNotes();">🗑️</button>
    </div>`;
  canvas.appendChild(n);
  makeDraggable(n);
  saveNotes();
}
