const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const LANGS = ['C', 'C++', 'Java', 'Python'];
let lang = '', ti = 0, li = 0, epoch = 0;   // epoch changes on every lesson, so old animations stop
const finished = new Set();
/* ================= theme ================= */
$('#themeBtn').onclick = () => {
  const d = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = d ? 'dark' : 'light';
  $('#themeBtn').textContent = d ? 'Light mode' : 'Dark mode';
};
/* ================= lesson helpers ================= */
const five = (what, why, when, where, how) => `<div class="five">${
  [['What', what], ['Why', why], ['When', when], ['Where', where], ['How', how]]
    .map(([h, t]) => `<div><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>`;
/* ================= visuals ================= */
const KINDS = {
  Linear: {
    text: 'Items sit one after another in a line. Each item has one before it and one after it.',
    ex: ['Array', 'Linked List', 'Stack', 'Queue'],
    pic: '<div class="mini"><span class="n">10</span>→<span class="n">20</span>→<span class="n">30</span>→<span class="n">40</span></div>'
  },
  'Non-linear': {
    text: 'Items branch out like a family tree or a map. One item can connect to many others.',
    ex: ['Tree', 'Heap', 'Graph'],
    pic: '<div class="tree"><div class="row"><span class="n">1</span></div><div class="row"><span class="n">2</span><span class="n">3</span></div><div class="row"><span class="n">4</span><span class="n">5</span><span class="n">6</span></div></div>'
  }
};
function kindsVisual(el) {
  el.innerHTML = `<div class="seg">${Object.keys(KINDS).map(k => `<button data-k="${k}">${k}</button>`).join('')}</div><div class="stage" id="kbox"></div>`;
  const pick = k => {
    $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    const d = KINDS[k];
    $('#kbox').innerHTML = `<h3>${k} structures</h3><p>${d.text}</p><div class="chips">${d.ex.map(e => `<span class="chip">${e}</span>`).join('')}</div>${d.pic}`;
  };
  $$('.seg button').forEach(b => b.onclick = () => pick(b.dataset.k));
  pick('Linear');
}
function helloVisual(el) {
  const my = epoch;
  el.innerHTML = `<div class="term"><div class="tb">Output</div><pre id="out"></pre></div><div class="toolbar"><button id="run">Run program</button></div>`;
  $('#run').onclick = async () => {
    const o = $('#out'); o.textContent = '';
    for (const ch of 'Hello, World!') { if (my !== epoch) return; o.textContent += ch; await sleep(70); }
  };
}
function opsVisual(el) {
  el.innerHTML = `<div class="toolbar"><label>a <input type="number" id="oa" value="7"></label><label>b <input type="number" id="ob" value="3"></label></div><table id="otab"></table>`;
  const draw = () => {
    const a = +$('#oa').value, b = +$('#ob').value;
    const rows = [['a + b', a + b, 'Add'], ['a - b', a - b, 'Subtract'], ['a * b', a * b, 'Multiply'],
      ['a / b', b ? Math.trunc(a / b) : 'undefined', 'Divide (C, C++, Java drop the decimal part)'],
      ['a % b', b ? a % b : 'undefined', 'Remainder after dividing'], ['a > b', a > b ? 'true' : 'false', 'Compare']];
    $('#otab').innerHTML = '<tr><th>Expression</th><th>Result</th><th>Meaning</th></tr>' +
      rows.map(r => `<tr><td><code>${r[0]}</code></td><td><b>${r[1]}</b></td><td>${r[2]}</td></tr>`).join('');
  };
  $('#oa').oninput = $('#ob').oninput = draw; draw();
}
function condVisual(el) {
  el.innerHTML = `<div class="toolbar"><label>marks <input type="number" id="mk" value="55"></label></div>
    <div class="stage flow"><div class="fb">marks &gt;= 40 ?</div>
    <div class="branches"><div class="fb" id="fy">Yes: print Pass</div><div class="fb" id="fn">No: print Fail</div></div></div>`;
  const d = () => { const ok = +$('#mk').value >= 40; $('#fy').classList.toggle('lit', ok); $('#fn').classList.toggle('lit', !ok); };
  $('#mk').oninput = d; d();
}
function loopVisual(el) {
  const my = epoch;
  el.innerHTML = `<div class="stage"><div class="cells" id="lc">${[1, 2, 3, 4, 5].map(i =>
    `<div class="cell" id="l${i}"><div class="box">${i}</div><span class="idx">i = ${i}</span></div>`).join('')}</div>
    <p class="st" id="lst">Press Run to start the loop.</p></div><div class="toolbar"><button id="run">Run loop</button></div>`;
  $('#run').onclick = async () => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
      $('#l' + i).classList.add('on'); $('#lst').textContent = `i = ${i}:  sum = ${sum} + ${i} = ${sum + i}`; sum += i;
      await sleep(800); if (my !== epoch) return; $('#l' + i).classList.remove('on');
    }
    $('#lst').textContent = `Loop finished. Final sum = ${sum}`;
  };
}
function factVisual(el) {
  const my = epoch; let busy = false;
  el.innerHTML = `<div class="toolbar"><label>n <input type="number" id="fnum" min="1" max="6" value="4"></label><button id="run">Run</button></div>
    <div class="stage"><p class="st" id="fst">Every call waits for the next call, like a stack of plates.</p><div class="stackbox" id="stk"></div></div>`;
  $('#run').onclick = async () => {
    if (busy) return; busy = true;
    const n = Math.min(6, Math.max(1, Math.floor(+$('#fnum').value) || 1)), stk = $('#stk'), st = t => $('#fst').textContent = t;
    stk.innerHTML = '';
    for (let k = n; k >= 1; k--) {
      stk.insertAdjacentHTML('beforeend', `<div class="frame">factorial(${k})</div>`);
      st(k > 1 ? `factorial(${k}) calls factorial(${k - 1})` : 'Base case reached: factorial(1) returns 1');
      await sleep(700); if (my !== epoch) return;
    }
    let res = 1;
    for (let k = 1; k <= n; k++) {
      res = k * res; stk.lastElementChild.textContent = `factorial(${k}) returns ${res}`;
      st(k === n ? `Done. ${n}! = ${res}` : `Returning ${res} to factorial(${k + 1})`);
      await sleep(700); if (my !== epoch) return;
      if (k < n) stk.lastElementChild.remove();
    }
    busy = false;
  };
}
function complexVisual(el) {
  el.innerHTML = `<div class="stage"><label class="slider">Input size n: <b id="nv">8</b><input type="range" id="ns" min="1" max="64" value="8"></label><div id="rows"></div></div>`;
  const C = [['O(1)', n => 1], ['O(log n)', n => Math.ceil(Math.log2(n)) || 1], ['O(n)', n => n],
    ['O(n log n)', n => Math.ceil(n * Math.log2(n)) || 1], ['O(n²)', n => n * n]];
  const draw = () => {
    const n = +$('#ns').value; $('#nv').textContent = n;
    $('#rows').innerHTML = C.map(([c, f]) => { const o = f(n);
      return `<div class="crow"><code>${c}</code><div class="bar"><i style="width:${Math.max(2, o / (n * n) * 100)}%"></i></div><span class="ops">${o}</span></div>`; }).join('');
  };
  $('#ns').oninput = draw; draw();
}
function casesVisual(el) {
  const my = epoch, arr = [10, 20, 30, 40]; let busy = false;
  el.innerHTML = `<div class="stage"><div class="cells">${arr.map((v, i) =>
    `<div class="cell" id="k${i}"><div class="box">${v}</div><span class="idx">[${i}]</span></div>`).join('')}</div>
    <p class="st" id="kst">Pick a value to search for.</p></div>
    <div class="toolbar"><button class="act" data-t="10">Search 10: best case</button><button class="act" data-t="30">Search 30: in the middle</button><button class="act" data-t="99">Search 99: worst case</button></div>`;
  $$('.toolbar button').forEach(b => b.onclick = async () => {
    if (busy) return; busy = true; const t = +b.dataset.t; let n = 0, hit = false;
    arr.forEach((_, i) => $('#k' + i).classList.remove('found'));
    for (let i = 0; i < arr.length; i++) {
      n++; $('#k' + i).classList.add('on'); $('#kst').textContent = `Step ${n}: is ${arr[i]} equal to ${t}?`;
      await sleep(650); if (my !== epoch) return; $('#k' + i).classList.remove('on');
      if (arr[i] === t) { hit = true; $('#k' + i).classList.add('found'); break; }
    }
    $('#kst').textContent = hit ? `Found ${t} after ${n} step${n > 1 ? 's' : ''}.` : `${t} is not in the array. It took all ${n} steps to find out.`;
    busy = false;
  });
}
function arrayLab(el, mode) {
  const my = epoch, read = mode === 'read'; let arr = [10, 20, 30, 40, 50], busy = false;
  el.innerHTML = `<div class="stage"><div class="cells" id="ac"></div><p class="st" id="ast">Ready.</p>` +
    (read ? `<div class="player"><button class="ghost" id="pB">Back</button><button id="pP">Play</button><button class="ghost" id="pN">Next</button><span id="pS">Press Traverse or Linear search</span></div>` : '') +
    `</div><div class="toolbar">` + (read
      ? `<button class="act" id="bT">Traverse</button><input type="number" id="vS" placeholder="Value" value="30"><button class="act" id="bS">Linear search</button>`
      : `<input type="number" id="vI" placeholder="Value" value="99"><input type="number" id="xI" placeholder="At index" value="1"><button class="act" id="bI">Insert</button><input type="number" id="xD" placeholder="Index" value="0"><button class="act" id="bD">Delete</button><button class="ghost" id="bR">Reset</button>`) + `</div>`;
  const st = t => $('#ast').textContent = t, cell = i => document.getElementById('a' + i);
  const draw = () => { $('#ac').innerHTML = arr.map((v, i) => `<div class="cell" id="a${i}"><div class="box">${v}</div><span class="idx">[${i}]</span></div>`).join(''); };
  draw();
  if (read) {
    let plan = [], pos = -1, timer = null;
    const stop = () => { clearInterval(timer); timer = null; $('#pP') && ($('#pP').textContent = 'Play'); };
    const show = k => {
      pos = k; const s = plan[k];
      arr.forEach((_, i) => cell(i).classList.remove('on', 'found'));
      s.on.forEach(i => cell(i).classList.add('on')); if (s.f != null) cell(s.f).classList.add('found');
      st(s.t); $('#pS').textContent = `Step ${k + 1} of ${plan.length}`;
    };
    const next = () => { if (my !== epoch) return stop(); if (pos < plan.length - 1) show(pos + 1); if (pos >= plan.length - 1) stop(); };
    const play = () => { if (!plan.length) return st('Press Traverse or Linear search first.'); if (pos >= plan.length - 1) show(0); $('#pP').textContent = 'Pause'; timer = setInterval(next, 750); };
    const start = p => { stop(); plan = p; show(0); play(); };
    $('#bT').onclick = () => start([...arr.map((v, i) => ({ on: [i], t: `Visiting index ${i}: value ${v}` })), { on: [], t: `Traversal done. ${arr.length} items visited.` }]);
    $('#bS').onclick = () => {
      const raw = $('#vS').value; if (raw === '') return st('Type a value to find.');
      const v = +raw, p = [];
      for (let i = 0; i < arr.length; i++) {
        p.push({ on: [i], t: `Checking index ${i}: is ${arr[i]} equal to ${v}?` });
        if (arr[i] === v) { p.push({ on: [], f: i, t: `Found ${v} at index ${i} after ${i + 1} checks.` }); return start(p); }
      }
      p.push({ on: [], t: `${v} is not in the array. All ${arr.length} items were checked.` }); start(p);
    };
    $('#pP').onclick = () => timer ? stop() : play();
    $('#pN').onclick = () => { stop(); next(); };
    $('#pB').onclick = () => { if (pos > 0) { stop(); show(pos - 1); } };
    return;
  }
  const lock = f => async () => { if (busy) return; busy = true; try { await f(); } finally { busy = false; } };
  $('#bI').onclick = lock(async () => {
    const raw = $('#vI').value, ir = $('#xI').value;
    if (raw === '') return st('Type a value to insert.');
    if (arr.length >= 10) return st('This demo holds up to 10 items.');
    const idx = ir === '' ? arr.length : +ir;
    if (!Number.isInteger(idx) || idx < 0 || idx > arr.length) return st(`Index must be from 0 to ${arr.length}.`);
    let moved = 0;
    for (let i = arr.length - 1; i >= idx; i--) {
      cell(i).classList.add('on'); st(`Shifting ${arr[i]} one place to the right`); moved++;
      await sleep(650); if (my !== epoch) return; cell(i).classList.remove('on');
    }
    arr.splice(idx, 0, +raw); draw(); cell(idx).classList.add('pop');
    st(`Inserted ${raw} at index ${idx}. ${moved} item${moved === 1 ? '' : 's'} had to shift.`);
  });
  $('#bD').onclick = lock(async () => {
    const raw = $('#xD').value, idx = +raw;
    if (raw === '' || !Number.isInteger(idx) || idx < 0 || idx >= arr.length) return st(`Index must be from 0 to ${arr.length - 1}.`);
    cell(idx).classList.add('on'); st(`Removing ${arr[idx]} at index ${idx}`);
    await sleep(650); if (my !== epoch) return;
    cell(idx).classList.add('gone'); await sleep(400); if (my !== epoch) return;
    const moved = arr.length - 1 - idx; arr.splice(idx, 1); draw();
    for (let i = idx; i < arr.length; i++) { cell(i).classList.add('on'); await sleep(250); if (my !== epoch) return; cell(i).classList.remove('on'); }
    st(`Deleted. ${moved} item${moved === 1 ? '' : 's'} shifted left to fill the gap.`);
  });
  $('#bR').onclick = () => { if (busy) return; arr = [10, 20, 30, 40, 50]; draw(); st('Array reset.'); };
}
/* ================= code for each language: [C, C++, Java, Python] ================= */
const HELLO = [
`#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
`#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
`print("Hello, World!")`];
const OPS = [
`int a = 7, b = 3;
printf("%d\\n", a + b);   // 10
printf("%d\\n", a % b);   // 1
printf("%d\\n", a > b);   // 1 means true`,
`int a = 7, b = 3;
cout << a + b << endl;     // 10
cout << a % b << endl;     // 1
cout << (a > b) << endl;   // 1 means true`,
`int a = 7, b = 3;
System.out.println(a + b);   // 10
System.out.println(a % b);   // 1
System.out.println(a > b);   // true`,
`a, b = 7, 3
print(a + b)    # 10
print(a % b)    # 1
print(a > b)    # True`];
const COND = [
`int marks = 55;
if (marks >= 40) {
    printf("Pass\\n");
} else {
    printf("Fail\\n");
}`,
`int marks = 55;
if (marks >= 40) {
    cout << "Pass" << endl;
} else {
    cout << "Fail" << endl;
}`,
`int marks = 55;
if (marks >= 40) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}`,
`marks = 55
if marks >= 40:
    print("Pass")
else:
    print("Fail")`];
const LOOP = [
`int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum = sum + i;
}
printf("%d\\n", sum);   // 15`,
`int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum = sum + i;
}
cout << sum << endl;   // 15`,
`int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum = sum + i;
}
System.out.println(sum);   // 15`,
`total = 0
for i in range(1, 6):
    total = total + i
print(total)   # 15`];
const FACT = [
`int factorial(int n) {
    if (n <= 1)
        return 1;           // base case
    return n * factorial(n - 1);
}`,
`int factorial(int n) {
    if (n <= 1)
        return 1;           // base case
    return n * factorial(n - 1);
}`,
`static int factorial(int n) {
    if (n <= 1)
        return 1;           // base case
    return n * factorial(n - 1);
}`,
`def factorial(n):
    if n <= 1:
        return 1            # base case
    return n * factorial(n - 1)`];
const SEARCH = [
`int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;      // found
    }
    return -1;             // not found
}`,
`int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;      // found
    }
    return -1;             // not found
}`,
`static int linearSearch(int[] arr, int key) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == key)
            return i;      // found
    }
    return -1;             // not found
}`,
`def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i       # found
    return -1              # not found`];
const INSERT = [
`// insert value at index pos
for (int i = n; i > pos; i--)
    arr[i] = arr[i - 1];   // shift right
arr[pos] = value;
n++;`,
`// insert value at index pos
for (int i = n; i > pos; i--)
    arr[i] = arr[i - 1];   // shift right
arr[pos] = value;
n++;`,
`// insert value at index pos
for (int i = n; i > pos; i--)
    arr[i] = arr[i - 1];   // shift right
arr[pos] = value;
n++;`,
`# insert value at index pos
arr.insert(pos, value)   # Python shifts the items for you`];
/* ================= NEW: helpers for DSA Basics ================= */
const h = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const par = e => /^\w+$/.test(e) ? e : `(${e})`;
/* cf: write one C-family template + one Python text, get [C, C++, Java, Python].
   @S{text} print line | @L{label::expr} print label and value | @V{expr} print value | @C{text} print without newline | @E new line */
const cf = (t, py) => {
  const f = (S, L, V, C, E) => t.replace(/@(?:([SLVC])\{([^}]*)\}|(E))/g, (m, k, x, e) =>
    e ? E : k === 'S' ? S(x) : k === 'L' ? L(...x.split('::')) : k === 'V' ? V(x) : C(x));
  return [
    f(s => `printf("${s}\\n");`, (l, e) => `printf("${l.replace(/%/g, '%%')}%d\\n", ${e});`, e => `printf("%d\\n", ${e});`, s => `printf("${s}");`, 'printf("\\n");'),
    f(s => `cout << "${s}" << endl;`, (l, e) => `cout << "${l}" << ${par(e)} << endl;`, e => `cout << ${par(e)} << endl;`, s => `cout << "${s}";`, 'cout << endl;'),
    f(s => `System.out.println("${s}");`, (l, e) => `System.out.println("${l}" + ${par(e)});`, e => `System.out.println(${e});`, s => `System.out.print("${s}");`, 'System.out.println();')
      .replace(/^(int|void) (\w+)\(/gm, 'static $1 $2('),
    py];
};

const pickVisual = D => el => {
  const ks = Object.keys(D);
  el.innerHTML = `<div class="seg">${ks.map(k => `<button data-k="${k}">${k}</button>`).join('')}</div><div class="stage" id="kbox"></div>`;
  const pick = k => {
    $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    const d = D[k];
    $('#kbox').innerHTML = `<h3>${k}</h3><p>${d.text}</p><div class="chips">${d.ex.map(e => `<span class="chip">${e}</span>`).join('')}</div>${d.pic || ''}`;
  };
  $$('.seg button').forEach(b => b.onclick = () => pick(b.dataset.k));
  pick(ks[0]);
};

/* live table: change the inputs and every row updates */
const calcVisual = (ins, rows, head = 'Meaning') => el => {
  el.innerHTML = `<div class="toolbar">${ins.map(i => `<label>${i[0]} <input type="number" id="c_${i[0]}" value="${i[1]}"></label>`).join('')}</div><table id="ctab"></table>`;
  const draw = () => {
    const v = {}; ins.forEach(i => v[i[0]] = Math.trunc(+$('#c_' + i[0]).value || 0));
    $('#ctab').innerHTML = `<tr><th>Expression</th><th>Result</th><th>${head}</th></tr>` + rows.map(r => {
      let res; try { res = r[1](v); } catch (e) { res = 'error'; }
      return `<tr><td><code>${h(r[0])}</code></td><td><b>${h(res)}</b></td><td>${h(typeof r[2] === 'function' ? r[2](v) : r[2])}</td></tr>`;
    }).join('');
  };
  ins.forEach(i => $('#c_' + i[0]).oninput = draw); draw();
};

/* step-by-step player: make(values) returns steps [{t: what happens, o: text added to the output}] */
function tracer(el, ins, make, o = {}) {
  const my = epoch; let plan = [], pos = -1, timer = null;
  el.innerHTML = `<div class="toolbar">${ins.map(i => `<label>${i[0]} <input type="number" id="t_${i[0]}" value="${i[1]}"></label>`).join('')}<button class="act" id="tRun">Run</button></div>
    <div class="stage"><p class="st" id="tSt">${o.intro || 'Change the value if you like, then press Run.'}</p>
    <div class="player"><button class="ghost" id="tB">Back</button><button id="tP">Play</button><button class="ghost" id="tN">Next</button><span id="tS"></span></div></div>
    <div class="term"><div class="tb">${o.title || 'Output'}</div><pre id="tOut"></pre></div>`;
  const stop = () => { clearInterval(timer); timer = null; const b = $('#tP'); if (b) b.textContent = 'Play'; };
  const show = k => { pos = k; $('#tSt').textContent = plan[k].t; $('#tOut').textContent = plan.slice(0, k + 1).map(s => s.o || '').join(''); $('#tS').textContent = `Step ${k + 1} of ${plan.length}`; };
  const next = () => { if (my !== epoch) return stop(); if (pos < plan.length - 1) show(pos + 1); if (pos >= plan.length - 1) stop(); };
  const play = () => { if (!plan.length) return; if (pos >= plan.length - 1) show(0); $('#tP').textContent = 'Pause'; timer = setInterval(next, o.ms || 800); };
  $('#tRun').onclick = () => { stop(); const v = {}; ins.forEach(i => v[i[0]] = Math.trunc(+$('#t_' + i[0]).value || 0)); plan = make(v).slice(0, 120); show(0); play(); };
  $('#tP').onclick = () => timer ? stop() : play();
  $('#tN').onclick = () => { stop(); if (plan.length) next(); };
  $('#tB').onclick = () => { stop(); if (pos > 0) show(pos - 1); };
}

/* escape sequences: a tiny terminal that really moves the cursor */
function escVisual(el) {
  const E = [['\\n', 'New line: cursor goes to the start of the next line', 'Line1\\nLine2'],
    ['\\t', 'Tab: cursor jumps to the next tab stop (every 8 columns)', 'A\\tB\\tC'],
    ['\\v', 'Vertical tab: cursor goes one line down but stays in the same column', 'Hi\\vDSA'],
    ['\\b', 'Backspace: cursor moves one place left, the next letter overwrites', 'ABC\\bD'],
    ['\\r', 'Carriage return: cursor goes back to the start of the same line', 'Hello\\rJ'],
    ['\\\\', 'Prints one backslash', 'C:\\\\dsa'],
    ['\\"', 'Prints a double quote inside a string', 'Say \\"Hi\\"']];
  const dec = s => s.replace(/\\(.)/g, (m, c) => ({ n: '\n', t: '\t', v: '\v', b: '\b', r: '\r' })[c] || c);
  const sim = s => {
    const g = [[]]; let r = 0, c = 0;
    for (const ch of s) {
      if (ch === '\n') { r++; c = 0; g[r] = g[r] || []; }
      else if (ch === '\v') { r++; g[r] = g[r] || []; }
      else if (ch === '\t') c = (Math.floor(c / 8) + 1) * 8;
      else if (ch === '\b') c = Math.max(0, c - 1);
      else if (ch === '\r') c = 0;
      else { g[r][c] = ch; c++; }
    }
    return g.map(l => Array.from(l, x => x || ' ').join('').trimEnd()).join('\n');
  };
  el.innerHTML = `<table><tr><th>Code</th><th>What it does</th><th>Example</th><th></th></tr>${E.map((e, i) =>
    `<tr><td><code>${h(e[0])}</code></td><td>${e[1]}</td><td><code>"${h(e[2])}"</code></td><td><button class="act sm" data-i="${i}">Show</button></td></tr>`).join('')}</table>
    <p class="st" id="est">Press Show on any row to print its example.</p>
    <div class="term"><div class="tb">Output</div><pre id="eo"></pre></div>`;
  $$('.sm').forEach(b => b.onclick = () => { const e = E[+b.dataset.i]; $('#est').textContent = `Printing "${e[2]}" gives:`; $('#eo').textContent = sim(dec(e[2])); });
}

/* Tower of Hanoi: all moves are printed first, then every move is played on the pegs */
function hanoiVisual(el) {
  const my = epoch, COL = ['#ffd23f', '#2dd4bf', '#ff8a7a', '#9db4ff'];
  let n = 3, moves = [], k = 0, busy = false;
  const gen = (d, f, t, a, m) => { if (d) { gen(d - 1, f, a, t, m); m.push({ d, f, t }); gen(d - 1, a, t, f, m); } return m; };
  el.innerHTML = `<div class="toolbar"><label>Disks <select id="hn" style="width:80px">${[1, 2, 3, 4].map(i => `<option ${i === 3 ? 'selected' : ''}>${i}</option>`).join('')}</select></label>
    <button id="hRun">Run all</button><button class="act" id="hNext">Next step</button><button class="ghost" id="hRes">Reset</button></div>
    <div class="term"><div class="tb">Output: every move the program prints</div><pre id="hout" class="hout"></pre></div>
    <div class="stage"><p class="st" id="hst"></p><div class="hanoi" id="hbox"></div></div>`;
  const draw = cur => {
    const P = { A: [], B: [], C: [] };
    for (let d = n; d >= 1; d--) P.A.push(d);
    for (let i = 0; i < k; i++) P[moves[i].t].push(P[moves[i].f].pop());
    $('#hbox').innerHTML = ['A', 'B', 'C'].map(x => `<div class="peg" id="pg${x}" data-n="Peg ${x}">${P[x].map(d =>
      `<div class="disk" style="width:${30 + d * 16}%;background:${COL[d - 1]}">${d}</div>`).join('')}</div>`).join('');
    $('#hout').innerHTML = moves.map((m, i) => `<span id="hl${i}" class="${i === cur ? 'cur' : ''}"><i>${i + 1}</i>Move disk ${m.d} from ${m.f} to ${m.t}</span>`).join('');
    if (cur >= 0) { const s = $('#hl' + cur); if (s) s.scrollIntoView({ block: 'nearest' }); }
  };
  const reset = () => {
    n = +$('#hn').value; moves = gen(n, 'A', 'C', 'B', []); k = 0; draw(-1);
    $('#hst').textContent = `The output above lists all ${moves.length} moves (2^${n} - 1). Press Next step to play them one by one.`;
  };
  const fly = async m => {
    const box = $('#hbox'), src = $('#pg' + m.f), dst = $('#pg' + m.t), el0 = src.lastElementChild;
    const br = box.getBoundingClientRect(), r = el0.getBoundingClientRect(), f = el0.cloneNode(true);
    f.classList.add('fly'); f.style.width = r.width + 'px'; f.style.left = (r.left - br.left) + 'px'; f.style.top = (r.top - br.top) + 'px';
    box.appendChild(f); el0.style.visibility = 'hidden'; await sleep(40);
    f.style.top = '0px'; await sleep(450); if (my !== epoch) return;                                   // lift up
    const dr = dst.getBoundingClientRect(); f.style.left = (dr.left - br.left + (dr.width - r.width) / 2) + 'px'; await sleep(500); if (my !== epoch) return;   // slide across
    const ph = el0.cloneNode(true); ph.style.visibility = 'hidden'; dst.appendChild(ph);
    f.style.top = (ph.getBoundingClientRect().top - br.top) + 'px'; await sleep(450);                   // drop down
  };
  const step = async () => {
    if (busy || k >= moves.length) return false;
    busy = true; const m = moves[k], i = k;
    $('#hst').textContent = `Step ${i + 1}: Move disk ${m.d} from ${m.f} to ${m.t}`;
    $$('#hout span').forEach((s, j) => s.classList.toggle('cur', j === i)); $('#hl' + i).scrollIntoView({ block: 'nearest' });
    await fly(m); if (my !== epoch) return false;
    k++; draw(i);
    $('#hst').textContent = k === moves.length ? `Done! All ${moves.length} moves are finished. Every disk is now on peg C.` : `Disk ${m.d} is now on peg ${m.t}. Press Next step for the next line of the output.`;
    busy = false; return true;
  };
  $('#hNext').onclick = step;
  $('#hRun').onclick = async () => {
    if (busy) return; if (k >= moves.length) reset();
    while (k < moves.length) { if (!await step()) break; await sleep(300); if (my !== epoch) return; }
  };
  $('#hRes').onclick = () => { if (!busy) reset(); };
  $('#hn').onchange = () => { if (busy) { $('#hn').value = n; return; } reset(); };
  reset();
}

/* ================= NEW: code for every example ================= */
const ES = [['Line1\\nLine2', '\\n new line'], ['A\\tB\\tC', '\\t tab'], ['Hi\\vDSA', '\\v vertical tab'], ['ABC\\bD', '\\b backspace, shows ABD'],
  ['Hello\\rJ', '\\r carriage return, shows Jello'], ['C:\\\\dsa', '\\\\ one backslash'], ['Say \\"Hi\\"', '\\" double quote']];
const ESC = [
  ES.map(([s, c]) => `printf("${s}\\n");   // ${c}`).join('\n'),
  ES.map(([s, c]) => `cout << "${s}\\n";   // ${c}`).join('\n'),
  ES.map(([s, c]) => s.includes('\\v') ? '// \\v does not exist in Java (use \\u000B)' : `System.out.println("${s}");   // ${c}`).join('\n'),
  ES.map(([s, c]) => `print("${s}")   # ${c}`).join('\n')];

const ARITH = cf(`int a = 7, b = 3;
@L{a + b = ::a + b}
@L{a - b = ::a - b}
@L{a * b = ::a * b}
@L{a / b = ::a / b}     // 2 (whole-number divide)
@L{a % b = ::a % b}     // 1 (remainder)`,
`a, b = 7, 3
print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a // b)   # // is the whole-number divide
print("a % b =", a % b)    # 1 (remainder)`);
const REL = cf(`int a = 7, b = 3;
@L{a == b : ::a == b}
@L{a != b : ::a != b}
@L{a > b : ::a > b}
@L{a < b : ::a < b}
@L{a >= b : ::a >= b}
@L{a <= b : ::a <= b}
// C and C++ print 1 for true and 0 for false. Java prints true or false.`,
`a, b = 7, 3
print("a == b :", a == b)
print("a != b :", a != b)
print("a > b :", a > b)
print("a < b :", a < b)
print("a >= b :", a >= b)
print("a <= b :", a <= b)   # Python prints True or False`);
const LOGIC = cf(`int a = 7, b = -3;
@L{(a > 0) && (b > 0) = ::(a > 0) && (b > 0)}   // AND
@L{(a > 0) || (b > 0) = ::(a > 0) || (b > 0)}   // OR
@L{!(a > b) = ::!(a > b)}                       // NOT`,
`a, b = 7, -3
print("(a > 0) and (b > 0) =", (a > 0) and (b > 0))   # AND
print("(a > 0) or (b > 0) =", (a > 0) or (b > 0))     # OR
print("not (a > b) =", not (a > b))                   # NOT`);
const ASSIGN = cf(`int x = 10, b = 3;
x += b;   // x = x + b
@L{After += : ::x}
x -= b;   // x = x - b
@L{After -= : ::x}
x *= b;   // x = x * b
@L{After *= : ::x}
x /= b;   // x = x / b
@L{After /= : ::x}
x %= b;   // x = x % b
@L{After %= : ::x}`,
`x, b = 10, 3
x += b    # x = x + b
print("After += :", x)
x -= b
print("After -= :", x)
x *= b
print("After *= :", x)
x //= b   # whole-number divide
print("After /= :", x)
x %= b
print("After %= :", x)`);
const UNARY = cf(`int x = 5, y;
y = x++;   // post: use x first, then add 1
@L{y = ::y}
@L{x = ::x}
x = 5;
y = ++x;   // pre: add 1 first, then use x
@L{y = ::y}
@L{x = ::x}
x = 5;
y = x--;   // post: use x first, then subtract 1
@L{y = ::y}
@L{x = ::x}
x = 5;
y = --x;   // pre: subtract 1 first, then use x
@L{y = ::y}
@L{x = ::x}`,
`# Python has no ++ or --. Use += 1 and -= 1.
x = 5
y = x; x += 1    # same as post-increment
print("y =", y)
print("x =", x)
x = 5
x += 1; y = x    # same as pre-increment
print("y =", y)
print("x =", x)
x = 5
y = x; x -= 1    # same as post-decrement
print("y =", y)
print("x =", x)
x = 5
x -= 1; y = x    # same as pre-decrement
print("y =", y)
print("x =", x)`);
const BITW = cf(`int a = 5, b = 3;   // 0101 and 0011
@L{a & b = ::a & b}    // AND: 1 only if both bits are 1
@L{a | b = ::a | b}    // OR: 1 if any bit is 1
@L{a ^ b = ::a ^ b}    // XOR: 1 if the bits are different
@L{~a = ::~a}          // NOT: flips every bit`,
`a, b = 5, 3   # 0101 and 0011
print("a & b =", a & b)   # AND
print("a | b =", a | b)   # OR
print("a ^ b =", a ^ b)   # XOR
print("~a =", ~a)         # NOT`);
const SHIFT = cf(`int a = 40;
@L{a << 2 = ::a << 2}   // 160: same as 40 * 4
@L{a >> 5 = ::a >> 5}   // 1: same as 40 / 32`,
`a = 40
print("a << 2 =", a << 2)   # 160: same as 40 * 4
print("a >> 5 =", a >> 5)   # 1: same as 40 // 32`);
const TERN = cf(`int a = 7, b = 3;
int big = (a > b) ? a : b;   // condition ? value_if_true : value_if_false
@L{Bigger = ::big}`,
`a, b = 7, 3
big = a if a > b else b   # value_if_true if condition else value_if_false
print("Bigger =", big)`);
const IF1 = cf(`int marks = 55;
if (marks >= 40) {
    @S{You passed}
}
@S{Done}`,
`marks = 55
if marks >= 40:
    print("You passed")
print("Done")`);
const LADDER = cf(`int marks = 72;
if (marks >= 90) {
    @S{Grade A}
} else if (marks >= 75) {
    @S{Grade B}
} else if (marks >= 60) {
    @S{Grade C}
} else {
    @S{Grade D}
}`,
`marks = 72
if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 60:
    print("Grade C")
else:
    print("Grade D")`);
const NEST = cf(`int age = 20, hasId = 1;
if (age >= 18) {
    if (hasId == 1) {
        @S{Entry allowed}
    } else {
        @S{Show your ID}
    }
} else {
    @S{Too young}
}`,
`age, has_id = 20, 1
if age >= 18:
    if has_id == 1:
        print("Entry allowed")
    else:
        print("Show your ID")
else:
    print("Too young")`);
const SW1 = cf(`int day = 2;
switch (day) {
    case 1:
        @S{Monday}
        break;       // leave the switch
    case 2:
        @S{Tuesday}
        break;
    case 3:
        @S{Wednesday}
        break;
    default:
        @S{Other day}
}`,
`day = 2
match day:            # Python 3.10+ (it never falls through)
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case _:
        print("Other day")`);
const SW2 = cf(`int day = 2;
switch (day) {
    case 1:
        @S{Monday}
    case 2:
        @S{Tuesday}      // match: runs from here...
    case 3:
        @S{Wednesday}    // ...falls into this one (no break)
    default:
        @S{Other day}    // ...and this one
}`,
`# Python has no fall-through, so this if chain copies the C-style behaviour
day = 2
hit = False
if day == 1: hit = True
if hit: print("Monday")
if day == 2: hit = True
if hit: print("Tuesday")
if day == 3: hit = True
if hit: print("Wednesday")
if hit or day not in (1, 2, 3): print("Other day")`);
const WHILE = cf(`int n = 3;
while (n > 0) {
    @L{n = ::n}
    n--;
}
@S{Liftoff}`,
`n = 3
while n > 0:
    print("n =", n)
    n -= 1
print("Liftoff")`);
const DOWHILE = cf(`int x = 10;
do {
    @L{x = ::x}
    x++;
} while (x < 3);   // false, but the body already ran once`,
`x = 10
while True:            # Python has no do-while
    print("x =", x)
    x += 1
    if not (x < 3):    # the check comes after the body
        break`);
const STARS = cf(`for (int i = 1; i <= 4; i++) {        // outer loop: rows
    for (int j = 1; j <= i; j++) {    // inner loop: stars in a row
        @C{* }
    }
    @E
}`,
`for i in range(1, 5):         # outer loop: rows
    for j in range(1, i + 1): # inner loop: stars in a row
        print("*", end=" ")
    print()`);
const FIB = cf(`int fib(int n) {
    if (n <= 1)
        return n;                     // base cases: fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2);   // two smaller calls
}
// in main():
@L{fib(5) = ::fib(5)}   // 5`,
`def fib(n):
    if n <= 1:
        return n                    # base cases: fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2)  # two smaller calls

print("fib(5) =", fib(5))   # 5`);
const HANOI = [
`void hanoi(int n, char from, char to, char aux) {
    if (n == 0)
        return;                      // base case: nothing to move
    hanoi(n - 1, from, aux, to);     // 1. move n-1 disks out of the way
    printf("Move disk %d from %c to %c\\n", n, from, to);   // 2. move disk n
    hanoi(n - 1, aux, to, from);     // 3. move n-1 disks on top of it
}
// start with: hanoi(3, 'A', 'C', 'B');`,
`void hanoi(int n, char from, char to, char aux) {
    if (n == 0)
        return;                      // base case: nothing to move
    hanoi(n - 1, from, aux, to);     // 1. move n-1 disks out of the way
    cout << "Move disk " << n << " from " << from << " to " << to << endl;   // 2. move disk n
    hanoi(n - 1, aux, to, from);     // 3. move n-1 disks on top of it
}
// start with: hanoi(3, 'A', 'C', 'B');`,
`static void hanoi(int n, char from, char to, char aux) {
    if (n == 0)
        return;                      // base case: nothing to move
    hanoi(n - 1, from, aux, to);     // 1. move n-1 disks out of the way
    System.out.println("Move disk " + n + " from " + from + " to " + to);   // 2. move disk n
    hanoi(n - 1, aux, to, from);     // 3. move n-1 disks on top of it
}
// start with: hanoi(3, 'A', 'C', 'B');`,
`def hanoi(n, src, dst, aux):
    if n == 0:
        return                       # base case: nothing to move
    hanoi(n - 1, src, aux, dst)      # 1. move n-1 disks out of the way
    print(f"Move disk {n} from {src} to {dst}")   # 2. move disk n
    hanoi(n - 1, aux, dst, src)      # 3. move n-1 disks on top of it

hanoi(3, "A", "C", "B")`];

/* ================= NEW: the DSA Basics lessons ================= */
const BASICS = [
  { title: 'What is DSA?', visual: kindsVisual,
    text: `<p>A <b>data structure</b> organizes data. An <b>algorithm</b> is the list of steps that solves a problem using that data. First, see the two big families.</p>` +
      five('A data structure stores data in an organized way. An algorithm is a set of steps.', 'The right choice makes programs faster and lighter.', 'Whenever a program stores or searches many items.', 'Contacts, maps, game scores, search engines.', 'Pick the structure that fits the job, then follow an algorithm on it.') +
      `<h3>What DSA Basics will cover</h3><ol class="cover"><li><b>Hello World</b> and escape sequences (<code>\\n</code>, <code>\\t</code>, <code>\\v</code>)</li><li><b>Operators</b>: arithmetic, relational, logical, assignment, unary, bitwise, shift and ternary</li><li><b>Conditions</b>: if, if-else, else-if, nested if, switch</li><li><b>Loops</b>: for, while, do-while and nested loops</li><li><b>Recursion</b>: factorial, Fibonacci and Tower of Hanoi</li></ol>` },
  { title: 'Hello World', visual: helloVisual, code: HELLO,
    text: '<p>Every language starts here: print a message on the screen. Press <b>Run program</b> and watch the output appear.</p>' },
  { title: 'Escape sequences', visual: escVisual, code: ESC,
    text: '<p>A backslash <code>\\</code> followed by a letter is an <b>escape sequence</b>. It does not print letters. It gives the screen a small instruction, like "start a new line". Press <b>Show</b> on each row to see its effect.</p><p>Note: Java has no <code>\\v</code>.</p>' },
  { title: 'Operators: the 3 types', visual: pickVisual({
      Unary: { text: 'Works on <b>one</b> operand.', ex: ['x++', '--x', '-x', '!x', '~x'], pic: '<p><code>x++</code> changes only x.</p>' },
      Binary: { text: 'Works on <b>two</b> operands, with the operator in the middle.', ex: ['a + b', 'a &gt; b', 'a &amp;&amp; b', 'a &amp; b', 'a &lt;&lt; 2', 'x += 5'], pic: '<p><code>a + b</code> needs both a and b.</p>' },
      Ternary: { text: 'Works on <b>three</b> operands. There is only one: <code>? :</code>', ex: ['(a &gt; b) ? a : b'], pic: '<p><code>condition ? if_true : if_false</code></p>' } }),
    text: '<p>Operators are symbols that do work on values. Count the operands and you get <b>3 types</b>: unary, binary and ternary. Click each one.</p><p>Next we visit each group with its own example: arithmetic, relational, logical, assignment, unary, bitwise, shift and ternary.</p>' },
  { title: 'Arithmetic operators', visual: calcVisual([['a', 7], ['b', 3]], [
      ['a + b', v => v.a + v.b, 'Add'], ['a - b', v => v.a - v.b, 'Subtract'], ['a * b', v => v.a * v.b, 'Multiply'],
      ['a / b', v => v.b ? Math.trunc(v.a / v.b) : 'undefined', 'Divide (C, C++, Java drop the decimal part)'],
      ['a % b', v => v.b ? v.a % v.b : 'undefined', 'Remainder after dividing']]), code: ARITH,
    text: '<p>The five maths operators: <code>+ - * / %</code>. Change <b>a</b> and <b>b</b> and watch every result update.</p>' },
  { title: 'Relational operators', visual: calcVisual([['a', 7], ['b', 3]], [
      ['a == b', v => v.a === v.b, 'Equal to'], ['a != b', v => v.a !== v.b, 'Not equal to'], ['a > b', v => v.a > v.b, 'Greater than'],
      ['a < b', v => v.a < v.b, 'Less than'], ['a >= b', v => v.a >= v.b, 'Greater than or equal to'], ['a <= b', v => v.a <= v.b, 'Less than or equal to']]), code: REL,
    text: '<p>Relational operators <b>compare</b> two values. The answer is always true or false. Conditions and loops are built on them.</p>' },
  { title: 'Logical operators', visual: calcVisual([['a', 7], ['b', -3]], [
      ['(a > 0) && (b > 0)', v => v.a > 0 && v.b > 0, 'AND: true only if both sides are true'],
      ['(a > 0) || (b > 0)', v => v.a > 0 || v.b > 0, 'OR: true if at least one side is true'],
      ['!(a > b)', v => !(v.a > v.b), 'NOT: flips true to false and false to true']]), code: LOGIC,
    text: '<p>Logical operators join true/false answers: <code>&amp;&amp;</code> (AND), <code>||</code> (OR) and <code>!</code> (NOT). Python writes them as <code>and</code>, <code>or</code>, <code>not</code>.</p>' },
  { title: 'Assignment operators', visual: (el) => tracer(el, [['x', 10], ['b', 3]], v => {
      let x = v.x; const b = v.b || 1, s = [{ t: `Start with x = ${x} and b = ${b}.` }];
      [['+=', 'x + b', (p) => p + b], ['-=', 'x - b', (p) => p - b], ['*=', 'x * b', (p) => p * b], ['/=', 'x / b', (p) => Math.trunc(p / b)], ['%=', 'x % b', (p) => p % b]].forEach(([op, ex, f]) => {
        const old = x; x = f(x); s.push({ t: `x ${op} b means x = ${ex}. So x goes from ${old} to ${x}.`, o: `After ${op} : ${x}\n` }); });
      return s; }, { intro: 'b cannot be 0 here. Press Run to apply the operators one after another.' }), code: ASSIGN,
    text: '<p><code>=</code> stores a value. The short forms <code>+= -= *= /= %=</code> update a variable in one go: <code>x += 3</code> means <code>x = x + 3</code>.</p>' },
  { title: 'Unary operators: ++ and --', visual: (el) => tracer(el, [['x', 5]], v => { const x = v.x; return [
      { t: `Start with x = ${x}.` },
      { t: `y = x++ (post): y takes the OLD value ${x}, then x grows to ${x + 1}.`, o: `y = ${x}\nx = ${x + 1}\n` },
      { t: `Reset x = ${x}. y = ++x (pre): x grows to ${x + 1} FIRST, then y takes ${x + 1}.`, o: `y = ${x + 1}\nx = ${x + 1}\n` },
      { t: `Reset x = ${x}. y = x-- (post): y takes ${x}, then x drops to ${x - 1}.`, o: `y = ${x}\nx = ${x - 1}\n` },
      { t: `Reset x = ${x}. y = --x (pre): x drops to ${x - 1} FIRST, then y takes ${x - 1}.`, o: `y = ${x - 1}\nx = ${x - 1}\n` }]; }, { ms: 1500 }), code: UNARY,
    text: '<p>Unary operators use one operand. <code>++</code> adds 1 and <code>--</code> subtracts 1. <b>Post</b> (<code>x++</code>): use the value, then change it. <b>Pre</b> (<code>++x</code>): change it, then use it. Other unary operators: <code>-x</code>, <code>!x</code>, <code>~x</code>.</p>' },
  { title: 'Bitwise operators', visual: (() => { const b8 = n => (n & 255).toString(2).padStart(8, '0'); return calcVisual([['a', 5], ['b', 3]], [
      ['a & b', v => v.a & v.b, v => `AND, both bits 1: ${b8(v.a)} & ${b8(v.b)} = ${b8(v.a & v.b)}`],
      ['a | b', v => v.a | v.b, v => `OR, any bit 1: ${b8(v.a)} | ${b8(v.b)} = ${b8(v.a | v.b)}`],
      ['a ^ b', v => v.a ^ v.b, v => `XOR, bits differ: ${b8(v.a)} ^ ${b8(v.b)} = ${b8(v.a ^ v.b)}`],
      ['~a', v => ~v.a, v => `NOT, flip all bits: ~${b8(v.a)} = ${b8(~v.a)}`]], 'In 8-bit binary'); })(), code: BITW,
    text: '<p>Bitwise operators work on the <b>binary bits</b> of numbers, one bit at a time. 5 is <code>0101</code> and 3 is <code>0011</code>. Change a and b and compare the bits.</p>' },
  { title: 'Shift operators', visual: (() => { const b16 = n => (n & 65535).toString(2).padStart(16, '0'); return calcVisual([['a', 40], ['n', 2]], [
      ['a << 2', v => v.a << 2, v => `Left shift by 2 = a x 4: ${b16(v.a)} becomes ${b16(v.a << 2)}`],
      ['a >> 5', v => v.a >> 5, v => `Right shift by 5 = a / 32: ${b16(v.a)} becomes ${b16(v.a >> 5)}`],
      ['a << n', v => v.a << v.n, v => `Left shift by n = a x 2^n: ${b16(v.a << v.n)}`],
      ['a >> n', v => v.a >> v.n, v => `Right shift by n = a / 2^n: ${b16(v.a >> v.n)}`]], 'In 16-bit binary'); })(), code: SHIFT,
    text: '<p><code>&lt;&lt;</code> slides all bits to the <b>left</b> (each step doubles the number). <code>&gt;&gt;</code> slides them to the <b>right</b> (each step halves it). Try <code>a &lt;&lt; 2</code> and <code>a &gt;&gt; 5</code>.</p>' },
  { title: 'Ternary operator', visual: (el) => tracer(el, [['a', 7], ['b', 3]], v => { const big = v.a > v.b ? v.a : v.b, c = v.a > v.b;
      return [{ t: `Evaluate the condition before the ?  : ${v.a} > ${v.b}` }, { t: `The condition is ${c}, so the value ${c ? 'before' : 'after'} the colon is chosen: ${big}.` }, { t: `big = ${big}`, o: `Bigger = ${big}\n` }]; }), code: TERN,
    text: '<p>The <b>ternary operator</b> <code>? :</code> is a short if-else in one line: <code>condition ? value_if_true : value_if_false</code>. It is the only operator with three operands.</p>' },
  { title: 'Conditions: if', visual: (el) => tracer(el, [['marks', 55]], v => { const ok = v.marks >= 40; return [
      { t: `marks = ${v.marks}. Check the condition: ${v.marks} >= 40 ?` },
      ok ? { t: 'True, so the code inside { } runs.', o: 'You passed\n' } : { t: 'False, so the whole { } block is skipped.' },
      { t: 'The program continues after the if.', o: 'Done\n' }]; }), code: IF1,
    text: '<p>A plain <b>if</b> runs its block only when the condition is true. If it is false, the block is skipped and nothing else happens.</p>' },
  { title: 'Conditions: if / else', visual: condVisual, code: COND,
    text: '<p><b>if-else</b> gives two paths: one for true and one for false. Change the marks and see which branch lights up.</p>' },
  { title: 'Conditions: else if ladder', visual: (el) => tracer(el, [['marks', 72]], v => { const s = [];
      for (const [lim, g] of [[90, 'Grade A'], [75, 'Grade B'], [60, 'Grade C']]) { const ok = v.marks >= lim;
        s.push({ t: `Is ${v.marks} >= ${lim} ? ${ok ? 'Yes. This branch runs and the rest are skipped.' : 'No. Try the next condition.'}`, o: ok ? g + '\n' : '' }); if (ok) return s; }
      s.push({ t: 'No condition matched, so the final else runs.', o: 'Grade D\n' }); return s; }), code: LADDER,
    text: '<p>An <b>else if ladder</b> checks conditions from top to bottom. The <b>first</b> true one runs, the rest are skipped. <code>else</code> at the end catches everything left.</p>' },
  { title: 'Conditions: nested if', visual: (el) => tracer(el, [['age', 20], ['hasId', 1]], v => { const s = [{ t: `Outer check: age ${v.age} >= 18 ?` }];
      if (v.age >= 18) { s.push({ t: 'Yes. Now the inner if is checked: hasId == 1 ?' });
        s.push(v.hasId === 1 ? { t: 'Yes. Both conditions are true.', o: 'Entry allowed\n' } : { t: 'No. The inner else runs.', o: 'Show your ID\n' }); }
      else s.push({ t: 'No. The outer else runs. The inner if is never checked.', o: 'Too young\n' });
      return s; }, { intro: 'Try age 15, then age 20 with hasId 0, then hasId 1.' }), code: NEST,
    text: '<p>A <b>nested if</b> is an if inside another if. The inner condition is checked only when the outer one is true.</p>' },
  { title: 'Conditions: switch with break', visual: (el) => tracer(el, [['day', 2]], v => { const N = ['Monday', 'Tuesday', 'Wednesday'], s = [{ t: `switch looks at day = ${v.day}.` }];
      for (let i = 1; i <= 3; i++) { if (v.day === i) { s.push({ t: `case ${i} matches, so its code runs.`, o: N[i - 1] + '\n' }); s.push({ t: 'break jumps out of the switch. Nothing else runs.' }); return s; } s.push({ t: `case ${i}? No match, skip it.` }); }
      s.push({ t: 'No case matched, so default runs.', o: 'Other day\n' }); return s; }, { intro: 'Try day = 1, 2, 3 and 7.' }), code: SW1,
    text: '<p><b>switch</b> compares one value with many <code>case</code> labels. With <b>break</b> after each case, only the matching case runs. <code>default</code> runs when nothing matches.</p>' },
  { title: 'Conditions: switch without break', visual: (el) => tracer(el, [['day', 2]], v => { const N = ['Monday', 'Tuesday', 'Wednesday'], s = [{ t: `switch looks at day = ${v.day}.` }];
      for (let i = 1; i <= 3; i++) { if (v.day === i) { s.push({ t: `case ${i} matches, so its code runs.`, o: N[i - 1] + '\n' });
          for (let j = i + 1; j <= 3; j++) s.push({ t: `There is no break, so execution falls into case ${j} and runs it too.`, o: N[j - 1] + '\n' });
          s.push({ t: 'It falls into default as well, then the switch ends.', o: 'Other day\n' }); return s; } s.push({ t: `case ${i}? No match, skip it.` }); }
      s.push({ t: 'No case matched, so default runs.', o: 'Other day\n' }); return s; }, { intro: 'Try day = 1, 2, 3 and 7. Compare with the version that has break.' }), code: SW2,
    text: '<p>Without <b>break</b>, execution <b>falls through</b>: after the matching case, every case below it runs too, until a break or the end. Usually this is a bug, but sometimes it is useful.</p>' },
  { title: 'Loops: for, while, do-while', visual: pickVisual({
      'for': { text: 'Use <b>for</b> when you know <b>how many times</b> to repeat (a fixed interval). Start, test and update all sit on one line.', ex: ['Count 1 to 10', 'Visit every array item', 'Print a table'], pic: '<p><code>for (i = 1; i &lt;= 5; i++)</code></p>' },
      'while': { text: 'Use <b>while</b> when you <b>do not know</b> the count in advance. It tests the condition first, so it may run zero times.', ex: ['Read until the user types 0', 'Split a number into digits'], pic: '<p><code>while (n &gt; 0)</code></p>' },
      'do-while': { text: 'Use <b>do-while</b> when the body must run <b>at least once</b>. It tests the condition after the body.', ex: ['Show a menu, then ask again', 'Retry until the input is valid'], pic: '<p><code>do { ... } while (x &lt; 3);</code></p>' } }),
    text: '<p>A loop repeats work. There are <b>3 kinds</b>. Click each one to see when to use it. After that, each loop gets its own example.</p>' },
  { title: 'The for loop', visual: loopVisual, code: LOOP,
    text: '<p><code>for (start; test; update)</code>. This one adds the numbers 1 to 5. It runs a fixed number of times. Press <b>Run loop</b> to see each round.</p>' },
  { title: 'The while loop', visual: (el) => tracer(el, [['n', 3]], v => { let n = Math.min(8, v.n); const s = [{ t: `Start with n = ${n}.` }];
      for (;;) { s.push({ t: `Check: n > 0 ?  (${n} > 0) is ${n > 0 ? 'true' : 'false, so the loop ends'}.` }); if (n <= 0) break;
        s.push({ t: 'Run the body: print n.', o: `n = ${n}\n` }); n--; s.push({ t: `n-- makes n = ${n}.` }); }
      s.push({ t: 'The loop is over, so the next line runs.', o: 'Liftoff\n' }); return s; }), code: WHILE,
    text: '<p><b>while</b> checks the condition <b>first</b>. If it is false from the start, the body never runs. Try n = 0.</p>' },
  { title: 'The do-while loop', visual: (el) => tracer(el, [['x', 10]], v => { let x = v.x; const s = [];
      for (let r = 0; r < 8; r++) { s.push({ t: 'Run the body first: print x.', o: `x = ${x}\n` }); x++; s.push({ t: `x++ makes x = ${x}. Now check: ${x} < 3 ? ${x < 3 ? 'true, repeat' : 'false, stop'}.` }); if (x >= 3) break; }
      return s; }, { intro: 'x starts at 10. The condition is already false, but watch what happens.' }), code: DOWHILE,
    text: '<p><b>do-while</b> runs the body <b>first</b> and checks after. So it always runs at least once, even when the condition is false. Try x = 1 to see it repeat.</p>' },
  { title: 'Nested loops: star pattern', visual: (el) => tracer(el, [['rows', 4]], v => { const R = Math.min(6, Math.max(1, v.rows)), s = [];
      for (let i = 1; i <= R; i++) { for (let j = 1; j <= i; j++) s.push({ t: `i = ${i}, j = ${j}: the inner loop prints a star.`, o: '* ' });
        s.push({ t: `The inner loop ends (j went past ${i}). Print a new line, then i goes up.`, o: '\n' }); }
      s.push({ t: 'The outer loop ends. The pattern is complete.' }); return s; }, { ms: 450, intro: 'The code on the right uses 4 rows. Try 1 to 6 here.' }), code: STARS,
    text: '<p>A <b>nested loop</b> is a loop inside a loop. For every round of the outer loop (a row), the inner loop runs fully (the stars in that row).</p>' },
  { title: 'Why recursion matters', visual: null,
    text: '<p>Recursion means a function solves a big problem by calling <b>itself</b> on a smaller version of the same problem.</p>' +
      five('A function that calls itself with a smaller input until it reaches a base case.', 'Many DSA problems are a smaller copy of themselves: trees, graphs, divide and conquer.', 'When a problem splits into similar sub-problems.', 'Tree traversal, DFS, merge sort, quick sort, binary search, backtracking.', 'Each call waits on the call stack. The base case stops the calls, then the answers return.') +
      '<p>Two rules: always have a <b>base case</b>, and make every call move <b>closer</b> to it. Next: factorial, Fibonacci and Tower of Hanoi.</p>' },
  { title: 'Recursion: factorial', visual: factVisual, code: FACT,
    text: '<p><code>n! = n x (n-1)!</code> and <code>1! = 1</code>. Press <b>Run</b> and watch the call stack grow, then shrink as answers return.</p>' },
  { title: 'Recursion: Fibonacci', visual: (el) => tracer(el, [['n', 4]], v => { const n = Math.min(6, Math.max(0, v.n)), s = [];
      const f = (k, d) => { const p = '  '.repeat(d); s.push({ t: `fib(${k}) is called.`, o: `${p}fib(${k})\n` });
        if (k < 2) { s.push({ t: `Base case: fib(${k}) returns ${k}.`, o: `${p}returns ${k}\n` }); return k; }
        const a = f(k - 1, d + 1), b = f(k - 2, d + 1); s.push({ t: `fib(${k}) = fib(${k - 1}) + fib(${k - 2}) = ${a} + ${b} = ${a + b}.`, o: `${p}returns ${a + b}\n` }); return a + b; };
      const r = f(n, 0); s.push({ t: `Done. fib(${n}) = ${r}.` }); return s; }, { title: 'Call log (indent = deeper call)', ms: 600, intro: 'Each fib call makes two smaller calls. Press Run (n from 0 to 6).' }), code: FIB,
    text: '<p>Fibonacci: each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8... <code>fib(n) = fib(n-1) + fib(n-2)</code>. The call log shows every call, indented by depth.</p>' },
  { title: 'Recursion: Tower of Hanoi', visual: hanoiVisual, code: HANOI,
    text: '<p>Move all disks from peg <b>A</b> to peg <b>C</b>. Rules: move one disk at a time, and never put a bigger disk on a smaller one. The recursive idea: move <code>n-1</code> disks to B, move the biggest to C, then move the <code>n-1</code> disks from B to C.</p><p>The output lists every move first. Then press <b>Next step</b> and watch each line happen on the pegs, or press <b>Run all</b>.</p>' }
];

/* ================= the learning path (your topic list) ================= */
const TOPICS = [
  { n: 'DSA Basics', sub: 'Hello World, operators, conditions, loops, recursion', lessons: BASICS },
  { n: 'Complexity', sub: 'Time and space, best, average and worst case', lessons: [
    { title: 'Time and space complexity', visual: complexVisual,
      text: '<p><b>Time complexity</b> counts how many steps an algorithm takes as the input grows. <b>Space complexity</b> counts the extra memory it needs. Drag the slider and compare.</p>' +
        five('A way to measure how work grows with input size.', 'Tells you which solution will stay fast on big data.', 'Before choosing an algorithm.', 'Every performance question, from apps to exams.', 'Count the steps in terms of n, ignore small details.') },
    { title: 'Best, average and worst case', visual: casesVisual,
      text: '<p>The same algorithm can be quick or slow depending on the data. Try the three searches below and count the steps.</p>' }
  ] },
  { n: 'Arrays', sub: 'Traverse, search, insert and delete', lessons: [
    { title: 'What is an array?', visual: null,
      text: five('A row of same-type values side by side in memory, each with an index starting at 0.', 'You can jump to any item instantly using its index.', 'When you know roughly how many items you need.', 'Marks lists, pixel rows, scoreboards, lookup tables.', 'Items sit in consecutive memory. Address = start + index × size.') +
        `<table><tr><th>Operation</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr>
        <tr><td>Access by index</td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>O(1)</td></tr>
        <tr><td>Traverse</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>O(1)</td></tr>
        <tr><td>Linear search</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(1)</td></tr>
        <tr><td>Insert</td><td>O(1) at end</td><td>O(n)</td><td>O(n) at start</td><td>O(1)</td></tr>
        <tr><td>Delete</td><td>O(1) at end</td><td>O(n)</td><td>O(n) at start</td><td>O(1)</td></tr></table>` },
    { title: 'Traverse and linear search', visual: el => arrayLab(el, 'read'), code: SEARCH,
      text: '<p>Traverse visits every item once. Linear search checks items one by one until it finds the value. Use <b>Back</b> and <b>Next</b> to move step by step.</p>' },
    { title: 'Insert and delete', visual: el => arrayLab(el, 'edit'), code: INSERT,
      text: '<p>Inserting or deleting in the middle forces the other items to <b>shift</b>. Try inserting at index 0 and see how much work that is.</p>' }
  ] },
  { n: 'Searching', sub: 'Linear and binary search' },
  { n: 'Sorting', sub: 'Bubble, selection, insertion, count, radix, bucket' },
  { n: 'Linked Lists', sub: 'Single, circular and double' },
  { n: 'Stack', sub: 'Array and list, infix, postfix, prefix' },
  { n: 'Queue', sub: 'Simple, circular, deque, priority' },
  { n: 'Trees', sub: 'Binary, BST, AVL, Red-Black, B-Tree' },
  { n: 'Heap', sub: 'Min heap, max heap, heap sort' },
  { n: 'Graphs', sub: 'BFS and DFS' },
  { n: 'Hashing', sub: 'Linear probing, quadratic probing, chaining' },
  { n: 'Quick and Merge Sort', sub: 'Divide and conquer' }
];
/* ================= start flow ================= */
const go = n => {
  $$('.screen').forEach((s, i) => s.classList.toggle('active', i === n));
  $$('.dot').forEach((d, i) => d.classList.toggle('on', i <= n));
};
$$('.go').forEach(b => b.onclick = () => go(+b.dataset.go));
$('#road').innerHTML = TOPICS.map(t =>
  `<li class="${t.lessons ? '' : 'soon'}"><b>${t.n}</b><span>${t.sub}</span><em>${t.lessons ? 'Ready' : 'Coming soon'}</em></li>`).join('');
$$('.lang-btn').forEach(b => b.onclick = () => {
  lang = b.dataset.lang;
  $$('.lang-btn').forEach(x => x.classList.toggle('sel', x === b));
  $('#startBtn').disabled = false;
});
$('#startBtn').onclick = () => {
  $('#flow').hidden = true; $('#learn').hidden = false;
  $('#language').value = lang; openLesson(0, 0);
};
(async () => {   // welcome screen: one scan across the cells
  $('#heroCells').innerHTML = [7, 3, 9, 1, 5].map((v, i) =>
    `<div class="cell" id="h${i}"><div class="box">${v}</div><span class="idx">${i}</span></div>`).join('');
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { $('#h' + i).classList.add('on'); await sleep(420); $('#h' + i).classList.remove('on'); }
})();
/* ================= lessons ================= */
function sidebar() {
  $('#side').innerHTML = TOPICS.map((t, i) =>
    `<li><button data-i="${i}" class="${i === ti ? 'cur' : ''} ${finished.has(i) ? 'fin' : ''}" ${t.lessons ? '' : 'disabled'}><i class="num">${i + 1}</i><b>${t.n}</b><small>${t.sub}</small><em>${t.lessons ? 'Ready' : 'Not yet'}</em></button></li>`).join('');
  $$('#side button').forEach(b => b.onclick = () => openLesson(+b.dataset.i, 0));
}
function renderCode() {
  const L = TOPICS[ti].lessons[li];
  $('#rcol').hidden = !L.code; $('#lgrid').classList.toggle('solo', !L.code);
  if (L.code) { $('#cLang').textContent = lang; $('#cBlock').textContent = L.code[LANGS.indexOf(lang)]; }
}
function openLesson(t, l) {
  ti = t; li = l; epoch++;
  const T = TOPICS[t], L = T.lessons[l];
  $('#doneCard').hidden = true; $('#lgrid').hidden = false; $('#lfoot').hidden = false;
  $('#crumb').textContent = `${T.n}: lesson ${l + 1} of ${T.lessons.length}`;
  $('#lTitle').textContent = L.title; $('#lText').innerHTML = L.text;
  $('#lVisual').innerHTML = ''; if (L.visual) L.visual($('#lVisual'));
  renderCode(); sidebar();
  $('#lBack').disabled = l === 0;
  $('#lProg').textContent = `${l + 1} / ${T.lessons.length}`;
  $('#lNext').textContent = l === T.lessons.length - 1 ? 'Finish topic' : 'Next';
  window.scrollTo(0, 0);
}
function finishTopic() {
  epoch++; finished.add(ti); sidebar();
  const nxt = TOPICS[ti + 1], card = $('#doneCard');
  $('#lgrid').hidden = true; $('#lfoot').hidden = true; card.hidden = false;
  $('#crumb').textContent = TOPICS[ti].n;
  if (nxt && nxt.lessons) {
    card.innerHTML = `<h2>${TOPICS[ti].n} complete!</h2><p>Great work. Click below to go to the next topic: <b>${nxt.n}</b>.</p>
      <div class="nav"><button class="ghost" id="again">Review this topic</button><button id="goNext">Go to ${nxt.n}</button></div>`;
    $('#goNext').onclick = () => openLesson(ti + 1, 0);
  } else {
    card.innerHTML = `<h2>${TOPICS[ti].n} complete!</h2><p>You have finished every topic that is ready so far. The next topic, <b>${nxt ? nxt.n : 'the end'}</b>, is coming soon.</p>
      <div class="nav"><button id="again">Review this topic</button></div>`;
  }
  $('#again').onclick = () => openLesson(ti, 0);
}
$('#lNext').onclick = () => li < TOPICS[ti].lessons.length - 1 ? openLesson(ti, li + 1) : finishTopic();
$('#lBack').onclick = () => li > 0 && openLesson(ti, li - 1);
$('#language').onchange = e => { lang = e.target.value; renderCode(); };
$('#copyBtn').onclick = () => {
  navigator.clipboard.writeText($('#cBlock').textContent);
  $('#copyBtn').textContent = 'Copied'; setTimeout(() => $('#copyBtn').textContent = 'Copy', 1200);
};

fetch("/api/ping")
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    });