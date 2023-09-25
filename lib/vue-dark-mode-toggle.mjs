function Nn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const M = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, bn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Je = () => {
}, vn = /^on[^a-z]/, On = (e) => vn.test(e), y = Object.assign, Sn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, yn = Object.prototype.hasOwnProperty, m = (e, t) => yn.call(e, t), h = Array.isArray, Q = (e) => Te(e) === "[object Map]", Vn = (e) => Te(e) === "[object Set]", w = (e) => typeof e == "function", D = (e) => typeof e == "string", Ye = (e) => typeof e == "symbol", O = (e) => e !== null && typeof e == "object", xn = (e) => O(e) && w(e.then) && w(e.catch), In = Object.prototype.toString, Te = (e) => In.call(e), jt = (e) => Te(e).slice(8, -1), Tn = (e) => Te(e) === "[object Object]", ke = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Qe = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Dn = /-(\w)/g, be = Qe((e) => e.replace(Dn, (t, n) => n ? n.toUpperCase() : "")), oe = Qe(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), Cn = Qe(
  (e) => e ? `on${oe(e)}` : ""
), ie = (e, t) => !Object.is(e, t), Rn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Et;
const Fe = () => Et || (Et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xe(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = D(s) ? Fn(s) : Xe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (D(e))
      return e;
    if (O(e))
      return e;
  }
}
const $n = /;(?![^(]*\))/g, Mn = /:([^]+)/, Pn = /\/\*[^]*?\*\//g;
function Fn(e) {
  const t = {};
  return e.replace(Pn, "").split($n).forEach((n) => {
    if (n) {
      const s = n.split(Mn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function De(e) {
  let t = "";
  if (D(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = De(e[n]);
      s && (t += s + " ");
    }
  else if (O(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function wt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let zt;
function An(e, t = zt) {
  t && t.active && t.effects.push(e);
}
function jn() {
  return zt;
}
const ce = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Kt = (e) => (e.w & K) > 0, Ht = (e) => (e.n & K) > 0, zn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= K;
}, Kn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Kt(r) && !Ht(r) ? r.delete(e) : t[n++] = r, r.w &= ~K, r.n &= ~K;
    }
    t.length = n;
  }
}, Ae = /* @__PURE__ */ new WeakMap();
let te = 0, K = 1;
const je = 30;
let b;
const L = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), ze = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Bt {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, An(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = z;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, z = !0, K = 1 << ++te, te <= je ? zn(this) : Nt(this), this.fn();
    } finally {
      te <= je && Kn(this), K = 1 << --te, b = this.parent, z = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (Nt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Nt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let z = !0;
const Ut = [];
function Ze() {
  Ut.push(z), z = !1;
}
function et() {
  const e = Ut.pop();
  z = e === void 0 ? !0 : e;
}
function S(e, t, n) {
  if (z && b) {
    let s = Ae.get(e);
    s || Ae.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = ce());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    Ke(r, o);
  }
}
function Ke(e, t) {
  let n = !1;
  te <= je ? Ht(e) || (e.n |= K, n = !Kt(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(
    y(
      {
        effect: b
      },
      t
    )
  ));
}
function H(e, t, n, s, r, o) {
  const i = Ae.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const u = Number(s);
    i.forEach((d, l) => {
      (l === "length" || l >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? ke(n) && c.push(i.get("length")) : (c.push(i.get(L)), Q(e) && c.push(i.get(ze)));
        break;
      case "delete":
        h(e) || (c.push(i.get(L)), Q(e) && c.push(i.get(ze)));
        break;
      case "set":
        Q(e) && c.push(i.get(L));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Y(c[0], a) : Y(c[0]));
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    process.env.NODE_ENV !== "production" ? Y(ce(u), a) : Y(ce(u));
  }
}
function Y(e, t) {
  const n = h(e) ? e : [...e];
  for (const s of n)
    s.computed && bt(s, t);
  for (const s of n)
    s.computed || bt(s, t);
}
function bt(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(y({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Hn = /* @__PURE__ */ Nn("__proto__,__v_isRef,__isVue"), Lt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ye)
), Bn = /* @__PURE__ */ tt(), Un = /* @__PURE__ */ tt(!0), Ln = /* @__PURE__ */ tt(!0, !0), vt = /* @__PURE__ */ Wn();
function Wn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = f(this);
      for (let o = 0, i = this.length; o < i; o++)
        S(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(f)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ze();
      const s = f(this)[t].apply(this, n);
      return et(), s;
    };
  }), e;
}
function qn(e) {
  const t = f(this);
  return S(t, "has", e), t.hasOwnProperty(e);
}
function tt(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? Yt : Jt : t ? lr : Gt).get(s))
      return s;
    const i = h(s);
    if (!e) {
      if (i && m(vt, r))
        return Reflect.get(vt, r, o);
      if (r === "hasOwnProperty")
        return qn;
    }
    const c = Reflect.get(s, r, o);
    return (Ye(r) ? Lt.has(r) : Hn(r)) || (e || S(s, "get", r), t) ? c : v(c) ? i && ke(r) ? c : c.value : O(c) ? e ? kt(c) : st(c) : c;
  };
}
const Gn = /* @__PURE__ */ Jn();
function Jn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (B(i) && v(i) && !v(r))
      return !1;
    if (!e && (!ve(r) && !B(r) && (i = f(i), r = f(r)), !h(n) && v(i) && !v(r)))
      return i.value = r, !0;
    const c = h(n) && ke(s) ? Number(s) < n.length : m(n, s), a = Reflect.set(n, s, r, o);
    return n === f(o) && (c ? ie(r, i) && H(n, "set", s, r, i) : H(n, "add", s, r)), a;
  };
}
function Yn(e, t) {
  const n = m(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && H(e, "delete", t, void 0, s), r;
}
function kn(e, t) {
  const n = Reflect.has(e, t);
  return (!Ye(t) || !Lt.has(t)) && S(e, "has", t), n;
}
function Qn(e) {
  return S(e, "iterate", h(e) ? "length" : L), Reflect.ownKeys(e);
}
const Xn = {
  get: Bn,
  set: Gn,
  deleteProperty: Yn,
  has: kn,
  ownKeys: Qn
}, Wt = {
  get: Un,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && wt(
      `Set operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && wt(
      `Delete operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  }
}, Zn = /* @__PURE__ */ y(
  {},
  Wt,
  {
    get: Ln
  }
), nt = (e) => e, Ce = (e) => Reflect.getPrototypeOf(e);
function pe(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = f(e), o = f(t);
  n || (t !== o && S(r, "get", t), S(r, "get", o));
  const { has: i } = Ce(r), c = s ? nt : n ? it : le;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function de(e, t = !1) {
  const n = this.__v_raw, s = f(n), r = f(e);
  return t || (e !== r && S(s, "has", e), S(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function he(e, t = !1) {
  return e = e.__v_raw, !t && S(f(e), "iterate", L), Reflect.get(e, "size", e);
}
function Ot(e) {
  e = f(e);
  const t = f(this);
  return Ce(t).has.call(t, e) || (t.add(e), H(t, "add", e, e)), this;
}
function St(e, t) {
  t = f(t);
  const n = f(this), { has: s, get: r } = Ce(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && qt(n, s, e) : (e = f(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ie(t, i) && H(n, "set", e, t, i) : H(n, "add", e, t), this;
}
function yt(e) {
  const t = f(this), { has: n, get: s } = Ce(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && qt(t, n, e) : (e = f(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && H(t, "delete", e, void 0, o), i;
}
function Vt() {
  const e = f(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Q(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && H(e, "clear", void 0, void 0, n), s;
}
function _e(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = f(i), a = t ? nt : e ? it : le;
    return !e && S(c, "iterate", L), i.forEach((u, d) => s.call(r, a(u), a(d), o));
  };
}
function ge(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = f(r), i = Q(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = r[e](...s), d = n ? nt : t ? it : le;
    return !t && S(
      o,
      "iterate",
      a ? ze : L
    ), {
      // iterator protocol
      next() {
        const { value: l, done: p } = u.next();
        return p ? { value: l, done: p } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function F(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${oe(e)} operation ${n}failed: target is readonly.`,
        f(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function er() {
  const e = {
    get(o) {
      return pe(this, o);
    },
    get size() {
      return he(this);
    },
    has: de,
    add: Ot,
    set: St,
    delete: yt,
    clear: Vt,
    forEach: _e(!1, !1)
  }, t = {
    get(o) {
      return pe(this, o, !1, !0);
    },
    get size() {
      return he(this);
    },
    has: de,
    add: Ot,
    set: St,
    delete: yt,
    clear: Vt,
    forEach: _e(!1, !0)
  }, n = {
    get(o) {
      return pe(this, o, !0);
    },
    get size() {
      return he(this, !0);
    },
    has(o) {
      return de.call(this, o, !0);
    },
    add: F("add"),
    set: F("set"),
    delete: F("delete"),
    clear: F("clear"),
    forEach: _e(!0, !1)
  }, s = {
    get(o) {
      return pe(this, o, !0, !0);
    },
    get size() {
      return he(this, !0);
    },
    has(o) {
      return de.call(this, o, !0);
    },
    add: F("add"),
    set: F("set"),
    delete: F("delete"),
    clear: F("clear"),
    forEach: _e(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = ge(
      o,
      !1,
      !1
    ), n[o] = ge(
      o,
      !0,
      !1
    ), t[o] = ge(
      o,
      !1,
      !0
    ), s[o] = ge(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  tr,
  nr,
  rr,
  sr
] = /* @__PURE__ */ er();
function rt(e, t) {
  const n = t ? e ? sr : rr : e ? nr : tr;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    m(n, r) && r in s ? n : s,
    r,
    o
  );
}
const or = {
  get: /* @__PURE__ */ rt(!1, !1)
}, ir = {
  get: /* @__PURE__ */ rt(!0, !1)
}, cr = {
  get: /* @__PURE__ */ rt(!0, !0)
};
function qt(e, t, n) {
  const s = f(n);
  if (s !== n && t.call(e, s)) {
    const r = jt(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Gt = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap();
function ar(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ur(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ar(jt(e));
}
function st(e) {
  return B(e) ? e : ot(
    e,
    !1,
    Xn,
    or,
    Gt
  );
}
function kt(e) {
  return ot(
    e,
    !0,
    Wt,
    ir,
    Jt
  );
}
function me(e) {
  return ot(
    e,
    !0,
    Zn,
    cr,
    Yt
  );
}
function ot(e, t, n, s, r) {
  if (!O(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = ur(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function W(e) {
  return B(e) ? W(e.__v_raw) : !!(e && e.__v_isReactive);
}
function B(e) {
  return !!(e && e.__v_isReadonly);
}
function ve(e) {
  return !!(e && e.__v_isShallow);
}
function He(e) {
  return W(e) || B(e);
}
function f(e) {
  const t = e && e.__v_raw;
  return t ? f(t) : e;
}
function fr(e) {
  return Rn(e, "__v_skip", !0), e;
}
const le = (e) => O(e) ? st(e) : e, it = (e) => O(e) ? kt(e) : e;
function Qt(e) {
  z && b && (e = f(e), process.env.NODE_ENV !== "production" ? Ke(e.dep || (e.dep = ce()), {
    target: e,
    type: "get",
    key: "value"
  }) : Ke(e.dep || (e.dep = ce())));
}
function Xt(e, t) {
  e = f(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? Y(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Y(n));
}
function v(e) {
  return !!(e && e.__v_isRef === !0);
}
function Zt(e) {
  return pr(e, !1);
}
function pr(e, t) {
  return v(e) ? e : new dr(e, t);
}
class dr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : f(t), this._value = n ? t : le(t);
  }
  get value() {
    return Qt(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ve(t) || B(t);
    t = n ? t : f(t), ie(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : le(t), Xt(this, t));
  }
}
function hr(e) {
  return v(e) ? e.value : e;
}
const _r = {
  get: (e, t, n) => hr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return v(r) && !v(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function gr(e) {
  return W(e) ? e : new Proxy(e, _r);
}
class mr {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Bt(t, () => {
      this._dirty || (this._dirty = !0, Xt(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = f(this);
    return Qt(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Er(e, t, n = !1) {
  let s, r;
  const o = w(e);
  o ? (s = e, r = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Je) : (s = e.get, r = e.set);
  const i = new mr(s, r, o || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const q = [];
function wr(e) {
  q.push(e);
}
function Nr() {
  q.pop();
}
function E(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  Ze();
  const n = q.length ? q[q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = br();
  if (s)
    G(
      s,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${gn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...vr(r)), console.warn(...o);
  }
  et();
}
function br() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function vr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Or(n));
  }), t;
}
function Or({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${gn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Sr(e.props), o] : [r + o];
}
function Sr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...en(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function en(e, t, n) {
  return D(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : v(t) ? (t = en(e, f(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = f(t), n ? t : [`${e}=`, t]);
}
const ct = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function G(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    tn(o, t, n);
  }
  return r;
}
function Oe(e, t, n, s) {
  if (w(e)) {
    const o = G(e, t, n, s);
    return o && xn(o) && o.catch((i) => {
      tn(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Oe(e[o], t, n, s));
  return r;
}
function tn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? ct[n] : n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      G(
        a,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  yr(e, n, r, s);
}
function yr(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = ct[t];
    if (n && wr(n), E(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Nr(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Se = !1, Be = !1;
const C = [];
let j = 0;
const X = [];
let $ = null, A = 0;
const nn = /* @__PURE__ */ Promise.resolve();
let lt = null;
const Vr = 100;
function xr(e) {
  const t = lt || nn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ir(e) {
  let t = j + 1, n = C.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ae(C[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function at(e) {
  (!C.length || !C.includes(
    e,
    Se && e.allowRecurse ? j + 1 : j
  )) && (e.id == null ? C.push(e) : C.splice(Ir(e.id), 0, e), rn());
}
function rn() {
  !Se && !Be && (Be = !0, lt = nn.then(on));
}
function sn(e) {
  h(e) ? X.push(...e) : (!$ || !$.includes(
    e,
    e.allowRecurse ? A + 1 : A
  )) && X.push(e), rn();
}
function Tr(e) {
  if (X.length) {
    const t = [...new Set(X)];
    if (X.length = 0, $) {
      $.push(...t);
      return;
    }
    for ($ = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $.sort((n, s) => ae(n) - ae(s)), A = 0; A < $.length; A++)
      process.env.NODE_ENV !== "production" && cn(e, $[A]) || $[A]();
    $ = null, A = 0;
  }
}
const ae = (e) => e.id == null ? 1 / 0 : e.id, Dr = (e, t) => {
  const n = ae(e) - ae(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function on(e) {
  Be = !1, Se = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), C.sort(Dr);
  const t = process.env.NODE_ENV !== "production" ? (n) => cn(e, n) : Je;
  try {
    for (j = 0; j < C.length; j++) {
      const n = C[j];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        G(n, null, 14);
      }
    }
  } finally {
    j = 0, C.length = 0, Tr(e), Se = !1, lt = null, (C.length || X.length) && on(e);
  }
}
function cn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Vr) {
      const s = t.ownerInstance, r = s && gt(s.type);
      return E(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Fe().__VUE_HMR_RUNTIME__ = {
  createRecord: $e(Cr),
  rerender: $e(Rr),
  reload: $e($r)
});
const ye = /* @__PURE__ */ new Map();
function Cr(e, t) {
  return ye.has(e) ? !1 : (ye.set(e, {
    initialDef: re(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function re(e) {
  return mn(e) ? e.__vccOpts : e;
}
function Rr(e, t) {
  const n = ye.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, re(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function $r(e, t) {
  const n = ye.get(e);
  if (!n)
    return;
  t = re(t), xt(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = re(r.type);
    ee.has(o) || (o !== n.initialDef && xt(o, t), ee.add(o)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (ee.add(o), r.ceReload(t.styles), ee.delete(o)) : r.parent ? at(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  sn(() => {
    for (const r of s)
      ee.delete(
        re(r.type)
      );
  });
}
function xt(e, t) {
  y(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function $e(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
function Mr(e, ...t) {
}
const Pr = /* @__PURE__ */ Fr(
  "component:updated"
  /* COMPONENT_UPDATED */
);
function Fr(e) {
  return (t) => {
    Mr(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let I = null, Re = null;
function It(e) {
  const t = I;
  return I = e, Re = e && e.type.__scopeId || null, t;
}
function Ar(e) {
  Re = e;
}
function jr() {
  Re = null;
}
function zr(e, t = I, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Pt(-1);
    const o = It(t);
    let i;
    try {
      i = e(...r);
    } finally {
      It(o), s._d && Pt(1);
    }
    return process.env.NODE_ENV !== "production" && Pr(t), i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
const Kr = (e) => e.__isSuspense;
function Hr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : sn(e);
}
function Br(e, t) {
  return ut(
    e,
    null,
    process.env.NODE_ENV !== "production" ? y({}, t, { flush: "post" }) : { flush: "post" }
  );
}
const Ee = {};
function Ur(e, t, n) {
  return process.env.NODE_ENV !== "production" && !w(t) && E(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), ut(e, t, n);
}
function ut(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = M) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (g) => {
    E(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = jn() === ((c = P) == null ? void 0 : c.scope) ? P : null;
  let d, l = !1, p = !1;
  if (v(e) ? (d = () => e.value, l = ve(e)) : W(e) ? (d = () => e, s = !0) : h(e) ? (p = !0, l = e.some((g) => W(g) || ve(g)), d = () => e.map((g) => {
    if (v(g))
      return g.value;
    if (W(g))
      return k(g);
    if (w(g))
      return G(g, u, 2);
    process.env.NODE_ENV !== "production" && a(g);
  })) : w(e) ? t ? d = () => G(e, u, 2) : d = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), Oe(
        e,
        u,
        3,
        [V]
      );
  } : (d = Je, process.env.NODE_ENV !== "production" && a(e)), t && s) {
    const g = d;
    d = () => k(g());
  }
  let _, V = (g) => {
    _ = T.onStop = () => {
      G(g, u, 4);
    };
  }, x = p ? new Array(e.length).fill(Ee) : Ee;
  const U = () => {
    if (T.active)
      if (t) {
        const g = T.run();
        (s || l || (p ? g.some(
          (En, wn) => ie(En, x[wn])
        ) : ie(g, x))) && (_ && _(), Oe(t, u, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          x === Ee ? void 0 : p && x[0] === Ee ? [] : x,
          V
        ]), x = g);
      } else
        T.run();
  };
  U.allowRecurse = !!t;
  let fe;
  r === "sync" ? fe = U : r === "post" ? fe = () => Mt(U, u && u.suspense) : (U.pre = !0, u && (U.id = u.uid), fe = () => at(U));
  const T = new Bt(d, fe);
  return process.env.NODE_ENV !== "production" && (T.onTrack = o, T.onTrigger = i), t ? n ? U() : x = T.run() : r === "post" ? Mt(
    T.run.bind(T),
    u && u.suspense
  ) : T.run(), () => {
    T.stop(), u && u.scope && Sn(u.scope.effects, T);
  };
}
function Lr(e, t, n) {
  const s = this.proxy, r = D(e) ? e.includes(".") ? Wr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = P;
  We(this);
  const c = ut(r, o.bind(s), n);
  return i ? We(i) : _n(), c;
}
function Wr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function k(e, t) {
  if (!O(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), v(e))
    k(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      k(e[n], t);
  else if (Vn(e) || Q(e))
    e.forEach((n) => {
      k(n, t);
    });
  else if (Tn(e))
    for (const n in e)
      k(e[n], t);
  return e;
}
function qr(e, t) {
  return w(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => y({ name: e.name }, t, { setup: e }))()
  ) : e;
}
function Gr(e, t, n = P, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Ze(), We(n);
      const c = Oe(t, n, e, i);
      return _n(), et(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Cn(ct[e].replace(/ hook$/, ""));
    E(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const ft = (e) => (t, n = P) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  Gr(e, (...s) => t(...s), n)
), Jr = ft("bm"), Yr = ft("m"), kr = ft("um"), Ue = "components", ln = Symbol.for("v-ndc");
function Qr(e) {
  return D(e) ? Xr(Ue, e, !1) || e : e || ln;
}
function Xr(e, t, n = !0, s = !1) {
  const r = I || P;
  if (r) {
    const o = r.type;
    if (e === Ue) {
      const c = gt(
        o,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (c && (c === t || c === be(t) || c === oe(be(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Tt(r[e] || o[e], t) || // global registration
      Tt(r.appContext[e], t)
    );
    if (!i && s)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === Ue ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      E(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && E(
      `resolve${oe(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Tt(e, t) {
  return e && (e[t] || e[be(t)] || e[oe(be(t))]);
}
const Le = (e) => e ? ms(e) ? ws(e) || e.proxy : Le(e.parent) : null, se = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? me(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? me(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? me(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? me(e.refs) : e.refs,
    $parent: (e) => Le(e.parent),
    $root: (e) => Le(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ts(e),
    $forceUpdate: (e) => e.f || (e.f = () => at(e.update)),
    $nextTick: (e) => e.n || (e.n = xr.bind(e.proxy)),
    $watch: (e) => Lr.bind(e)
  })
), Zr = (e) => e === "_" || e === "$", Me = (e, t) => e !== M && !e.__isScriptSetup && m(e, t), es = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const _ = i[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Me(s, t))
          return i[t] = 1, s[t];
        if (r !== M && m(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && m(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== M && m(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = se[t];
    let l, p;
    if (d)
      return t === "$attrs" ? (S(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && S(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== M && m(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, m(p, t)
    )
      return p[t];
    process.env.NODE_ENV !== "production" && I && (!D(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== M && Zr(t[0]) && m(r, t) ? E(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === I && E(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Me(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && m(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== M && m(s, t) ? (s[t] = n, !0) : m(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== M && m(e, i) || Me(t, i) || (c = o[0]) && m(c, i) || m(s, i) || m(se, i) || m(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : m(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (es.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Dt(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ts(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => Ve(a, u, i, !0)
  ), Ve(a, t, i)), O(t) && o.set(t, a), a;
}
function Ve(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Ve(e, o, n, !0), r && r.forEach(
    (i) => Ve(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = ns[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ns = {
  data: Ct,
  props: $t,
  emits: $t,
  // objects
  methods: ne,
  computed: ne,
  // lifecycle
  beforeCreate: N,
  created: N,
  beforeMount: N,
  mounted: N,
  beforeUpdate: N,
  updated: N,
  beforeDestroy: N,
  beforeUnmount: N,
  destroyed: N,
  unmounted: N,
  activated: N,
  deactivated: N,
  errorCaptured: N,
  serverPrefetch: N,
  // assets
  components: ne,
  directives: ne,
  // watch
  watch: ss,
  // provide / inject
  provide: Ct,
  inject: rs
};
function Ct(e, t) {
  return t ? e ? function() {
    return y(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function rs(e, t) {
  return ne(Rt(e), Rt(t));
}
function Rt(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function N(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ne(e, t) {
  return e ? y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function $t(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : y(
    /* @__PURE__ */ Object.create(null),
    Dt(e),
    Dt(t ?? {})
  ) : t;
}
function ss(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = y(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = N(e[s], t[s]);
  return n;
}
const Mt = Hr, os = (e) => e.__isTeleport, pt = Symbol.for("v-fgt"), is = Symbol.for("v-txt"), cs = Symbol.for("v-cmt"), ls = Symbol.for("v-stc"), we = [];
let R = null;
function dt(e = !1) {
  we.push(R = e ? null : []);
}
function as() {
  we.pop(), R = we[we.length - 1] || null;
}
let ue = 1;
function Pt(e) {
  ue += e;
}
function an(e) {
  return e.dynamicChildren = ue > 0 ? R || bn : null, as(), ue > 0 && R && R.push(e), e;
}
function un(e, t, n, s, r, o) {
  return an(
    Z(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function us(e, t, n, s, r) {
  return an(
    xe(
      e,
      t,
      n,
      s,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function fs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const ps = (...e) => dn(
  ...e
), fn = "__vInternal", pn = ({ key: e }) => e ?? null, Ne = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? D(e) || v(e) || w(e) ? { i: I, r: e, k: t, f: !!n } : e : null);
function Z(e, t = null, n = null, s = 0, r = null, o = e === pt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pn(t),
    ref: t && Ne(t),
    scopeId: Re,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: I
  };
  return c ? (ht(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= D(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), ue > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  R && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && R.push(a), a;
}
const xe = process.env.NODE_ENV !== "production" ? ps : dn;
function dn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === ln) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = cs), fs(e)) {
    const c = Ie(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ht(c, n), ue > 0 && !o && R && (c.shapeFlag & 6 ? R[R.indexOf(e)] = c : R.push(c)), c.patchFlag |= -2, c;
  }
  if (mn(e) && (e = e.__vccOpts), t) {
    t = ds(t);
    let { class: c, style: a } = t;
    c && !D(c) && (t.class = De(c)), O(a) && (He(a) && !h(a) && (a = y({}, a)), t.style = Xe(a));
  }
  const i = D(e) ? 1 : Kr(e) ? 128 : os(e) ? 64 : O(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && He(e) && (e = f(e), E(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Z(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function ds(e) {
  return e ? He(e) || fn in e ? y({}, e) : e : null;
}
function Ie(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? _s(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && pn(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? h(r) ? r.concat(Ne(t)) : [r, Ne(t)] : Ne(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(hn) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== pt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ie(e.ssContent),
    ssFallback: e.ssFallback && Ie(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function hn(e) {
  const t = Ie(e);
  return h(e.children) && (t.children = e.children.map(hn)), t;
}
function hs(e = " ", t = 0) {
  return xe(is, null, e, t);
}
function ht(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ht(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(fn in t) ? t._ctx = I : r === 3 && I && (I.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    w(t) ? (t = { default: t, _ctx: I }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [hs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function _s(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = De([t.class, s.class]));
      else if (r === "style")
        t.style = Xe([t.style, s.style]);
      else if (On(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let P = null;
const gs = () => P || I;
let _t, J, Ft = "__VUE_INSTANCE_SETTERS__";
(J = Fe()[Ft]) || (J = Fe()[Ft] = []), J.push((e) => P = e), _t = (e) => {
  J.length > 1 ? J.forEach((t) => t(e)) : J[0](e);
};
const We = (e) => {
  _t(e), e.scope.on();
}, _n = () => {
  P && P.scope.off(), _t(null);
};
function ms(e) {
  return e.vnode.shapeFlag & 4;
}
let Es = !1;
function ws(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(gr(fr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in se)
          return se[n](e);
      },
      has(t, n) {
        return n in t || n in se;
      }
    }));
}
const Ns = /(?:^|[-_])(\w)/g, bs = (e) => e.replace(Ns, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function gt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function gn(e, t, n = !1) {
  let s = gt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? bs(s) : n ? "App" : "Anonymous";
}
function mn(e) {
  return w(e) && "__vccOpts" in e;
}
const vs = (e, t) => Er(e, t, Es);
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
function Os() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return O(l) ? l.__isVue ? ["div", e, "VueInstance"] : v(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : W(l) ? [
        "div",
        {},
        ["span", e, Pe(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${B(l) ? " (readonly)" : ""}`
      ] : B(l) ? [
        "div",
        {},
        ["span", e, Pe(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const p = [];
    l.type.props && l.props && p.push(i("props", f(l.props))), l.setupState !== M && p.push(i("setup", l.setupState)), l.data !== M && p.push(i("data", f(l.data)));
    const _ = a(l, "computed");
    _ && p.push(i("computed", _));
    const V = a(l, "inject");
    return V && p.push(i("injected", V)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), p;
  }
  function i(l, p) {
    return p = y({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((_) => [
          "div",
          {},
          ["span", s, _ + ": "],
          c(p[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, p = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : O(l) ? ["object", { object: p ? f(l) : l }] : ["span", n, String(l)];
  }
  function a(l, p) {
    const _ = l.type;
    if (w(_))
      return;
    const V = {};
    for (const x in l.ctx)
      u(_, x, p) && (V[x] = l.ctx[x]);
    return V;
  }
  function u(l, p, _) {
    const V = l[_];
    if (h(V) && V.includes(p) || O(V) && p in V || l.extends && u(l.extends, p, _) || l.mixins && l.mixins.some((x) => u(x, p, _)))
      return !0;
  }
  function d(l) {
    return Pe(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Ss(e) {
  const t = gs();
  if (!t) {
    process.env.NODE_ENV !== "production" && E("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (r = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((o) => Ge(o, r));
  }, s = () => {
    const r = e(t.proxy);
    qe(t.subTree, r), n(r);
  };
  Br(s), Yr(() => {
    const r = new MutationObserver(s);
    r.observe(t.subTree.el.parentNode, { childList: !0 }), kr(() => r.disconnect());
  });
}
function qe(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      qe(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Ge(e.el, t);
  else if (e.type === pt)
    e.children.forEach((n) => qe(n, t));
  else if (e.type === ls) {
    let { el: n, anchor: s } = e;
    for (; n && (Ge(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function Ge(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t)
      n.setProperty(`--${s}`, t[s]);
  }
}
function ys() {
  Os();
}
process.env.NODE_ENV !== "production" && ys();
const mt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Vs = {}, xs = {
  xmlns: "http://www.w3.org/2000/svg",
  height: "1em",
  viewBox: "0 0 384 512"
}, Is = /* @__PURE__ */ Z("path", { d: "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" }, null, -1), Ts = [
  Is
];
function Ds(e, t) {
  return dt(), un("svg", xs, Ts);
}
const Cs = /* @__PURE__ */ mt(Vs, [["render", Ds]]), Rs = {}, $s = {
  xmlns: "http://www.w3.org/2000/svg",
  height: "1em",
  viewBox: "0 0 512 512"
}, Ms = /* @__PURE__ */ Z("path", { d: "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" }, null, -1), Ps = [
  Ms
];
function Fs(e, t) {
  return dt(), un("svg", $s, Ps);
}
const As = /* @__PURE__ */ mt(Rs, [["render", Fs]]), js = (e) => (Ar("data-v-7d4abe5f"), e = e(), jr(), e), zs = /* @__PURE__ */ js(() => /* @__PURE__ */ Z("span", { class: "dark-mode-bg" }, null, -1)), Ks = { class: "dark-mode-rotate" }, Hs = /* @__PURE__ */ qr({
  __name: "VueDarkModeToggle",
  props: {
    darkModeEnabled: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "span"
    }
  },
  setup(e) {
    const t = e;
    Ss((s) => ({
      "718330e3": n.value
    }));
    const n = Zt(0);
    return Jr(() => {
      t.darkModeEnabled && (n.value = 180);
    }), Ur(
      () => t.darkModeEnabled,
      () => {
        n.value += 180;
      }
    ), (s, r) => (dt(), us(Qr(e.as), {
      class: De(["dark-mode-toggle", { night: e.darkModeEnabled }]),
      "aria-label": "Toggle Dark Mode"
    }, {
      default: zr(() => [
        zs,
        Z("span", Ks, [
          xe(Cs, { class: "moon" }),
          xe(As, { class: "sun" })
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
});
const Us = /* @__PURE__ */ mt(Hs, [["__scopeId", "data-v-7d4abe5f"]]), At = {
  applyTo: "html",
  localStorageKey: "enable-dark-mode",
  defaultValue: !1,
  className: "dark"
};
function Ls(e = At) {
  const t = st({
    ...At,
    ...e
  }), n = Zt(void 0), s = vs({
    get() {
      if (n.value === void 0) {
        const c = localStorage.getItem(t.localStorageKey);
        c === null ? n.value = window?.matchMedia("(prefers-color-scheme: dark)").matches ?? t.defaultValue : n.value = c === "true";
      }
      return r(), n.value;
    },
    set(c) {
      localStorage.setItem(t.localStorageKey, String(c)), n.value = c, r();
    }
  });
  function r() {
    if (!t.applyTo)
      return;
    let c = null;
    t.applyTo instanceof HTMLElement ? c = t.applyTo : typeof t.applyTo == "string" && (c = document.querySelector(t.applyTo)), c?.classList[n.value ? "add" : "remove"](t.className);
  }
  function o() {
    s.value = !s.value;
  }
  function i() {
    localStorage.removeItem(t.localStorageKey);
  }
  return { enabled: s, toggle: o, clearPreference: i };
}
export {
  Us as default,
  Ls as useDarkMode
};
