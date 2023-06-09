var app = (function () {
    "use strict";
    function e() {}
    function t(e, t) {
        for (const n in t) e[n] = t[n];
        return e;
    }
    function n(e) {
        return e();
    }
    function r() {
        return Object.create(null);
    }
    function a(e) {
        e.forEach(n);
    }
    function i(e) {
        return "function" == typeof e;
    }
    function o(e, t) {
        return e != e
            ? t == t
            : e !== t || (e && "object" == typeof e) || "function" == typeof e;
    }
    function s(e, n, r, a) {
        return e[1] && a ? t(r.ctx.slice(), e[1](a(n))) : r.ctx;
    }
    function l(e, t, n, r, a, i, o) {
        const l = (function (e, t, n, r) {
            if (e[2] && r) {
                const a = e[2](r(n));
                if (void 0 === t.dirty) return a;
                if ("object" == typeof a) {
                    const e = [],
                        n = Math.max(t.dirty.length, a.length);
                    for (let r = 0; r < n; r += 1) e[r] = t.dirty[r] | a[r];
                    return e;
                }
                return t.dirty | a;
            }
            return t.dirty;
        })(t, r, a, i);
        if (l) {
            const a = s(t, n, r, o);
            e.p(a, l);
        }
    }
    function c(e) {
        return null == e ? "" : e;
    }
    function u(e, t) {
        e.appendChild(t);
    }
    function d(e, t, n) {
        e.insertBefore(t, n || null);
    }
    function p(e) {
        e.parentNode.removeChild(e);
    }
    function h(e, t) {
        for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
    }
    function g(e) {
        return document.createElement(e);
    }
    function f(e) {
        return document.createElementNS("http://www.w3.org/2000/svg", e);
    }
    function m(e) {
        return document.createTextNode(e);
    }
    function b() {
        return m(" ");
    }
    function _() {
        return m("");
    }
    function w(e, t, n, r) {
        return (
            e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)
        );
    }
    function v(e, t, n) {
        null == n
            ? e.removeAttribute(t)
            : e.getAttribute(t) !== n && e.setAttribute(t, n);
    }
    function y(e, t) {
        const n = Object.getOwnPropertyDescriptors(e.__proto__);
        for (const r in t)
            null == t[r]
                ? e.removeAttribute(r)
                : "style" === r
                ? (e.style.cssText = t[r])
                : "__value" === r
                ? (e.value = e[r] = t[r])
                : n[r] && n[r].set
                ? (e[r] = t[r])
                : v(e, r, t[r]);
    }
    function k(e, t, n) {
        t in e
            ? (e[t] = ("boolean" == typeof e[t] && "" === n) || n)
            : v(e, t, n);
    }
    function $(e, t) {
        (t = "" + t), e.wholeText !== t && (e.data = t);
    }
    function E(e, t) {
        e.value = null == t ? "" : t;
    }
    function x(e, t, n, r) {
        e.style.setProperty(t, n, r ? "important" : "");
    }
    function S(e, t) {
        for (let n = 0; n < e.options.length; n += 1) {
            const r = e.options[n];
            if (r.__value === t) return void (r.selected = !0);
        }
    }
    let C, A;
    function L() {
        if (void 0 === C) {
            C = !1;
            try {
                "undefined" != typeof window &&
                    window.parent &&
                    window.parent.document;
            } catch (e) {
                C = !0;
            }
        }
        return C;
    }
    function M(e, t, n) {
        e.classList[n ? "add" : "remove"](t);
    }
    class T {
        constructor(e = null) {
            (this.a = e), (this.e = this.n = null);
        }
        m(e, t, n = null) {
            this.e || ((this.e = g(t.nodeName)), (this.t = t), this.h(e)),
                this.i(n);
        }
        h(e) {
            (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
        }
        i(e) {
            for (let t = 0; t < this.n.length; t += 1) d(this.t, this.n[t], e);
        }
        p(e) {
            this.d(), this.h(e), this.i(this.a);
        }
        d() {
            this.n.forEach(p);
        }
    }
    function j(e) {
        A = e;
    }
    function I() {
        if (!A)
            throw new Error("Function called outside component initialization");
        return A;
    }
    function N(e) {
        I().$$.before_update.push(e);
    }
    function O(e) {
        I().$$.on_mount.push(e);
    }
    function P(e) {
        I().$$.on_destroy.push(e);
    }
    function R() {
        const e = I();
        return (t, n) => {
            const r = e.$$.callbacks[t];
            if (r) {
                const a = (function (e, t) {
                    const n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(e, !1, !1, t), n;
                })(t, n);
                r.slice().forEach((t) => {
                    t.call(e, a);
                });
            }
        };
    }
    const H = [],
        z = [],
        B = [],
        q = [],
        D = Promise.resolve();
    let U = !1;
    function F() {
        U || ((U = !0), D.then(J));
    }
    function G() {
        return F(), D;
    }
    function V(e) {
        B.push(e);
    }
    let W = !1;
    const K = new Set();
    function J() {
        if (!W) {
            W = !0;
            do {
                for (let e = 0; e < H.length; e += 1) {
                    const t = H[e];
                    j(t), Z(t.$$);
                }
                for (j(null), H.length = 0; z.length; ) z.pop()();
                for (let e = 0; e < B.length; e += 1) {
                    const t = B[e];
                    K.has(t) || (K.add(t), t());
                }
                B.length = 0;
            } while (H.length);
            for (; q.length; ) q.pop()();
            (U = !1), (W = !1), K.clear();
        }
    }
    function Z(e) {
        if (null !== e.fragment) {
            e.update(), a(e.before_update);
            const t = e.dirty;
            (e.dirty = [-1]),
                e.fragment && e.fragment.p(e.ctx, t),
                e.after_update.forEach(V);
        }
    }
    const Q = new Set();
    let X;
    function Y() {
        X = { r: 0, c: [], p: X };
    }
    function ee() {
        X.r || a(X.c), (X = X.p);
    }
    function te(e, t) {
        e && e.i && (Q.delete(e), e.i(t));
    }
    function ne(e, t, n, r) {
        if (e && e.o) {
            if (Q.has(e)) return;
            Q.add(e),
                X.c.push(() => {
                    Q.delete(e), r && (n && e.d(1), r());
                }),
                e.o(t);
        }
    }
    function re(e, t) {
        ne(e, 1, 1, () => {
            t.delete(e.key);
        });
    }
    function ae(e, t) {
        const n = {},
            r = {},
            a = { $$scope: 1 };
        let i = e.length;
        for (; i--; ) {
            const o = e[i],
                s = t[i];
            if (s) {
                for (const e in o) e in s || (r[e] = 1);
                for (const e in s) a[e] || ((n[e] = s[e]), (a[e] = 1));
                e[i] = s;
            } else for (const e in o) a[e] = 1;
        }
        for (const e in r) e in n || (n[e] = void 0);
        return n;
    }
    function ie(e) {
        return "object" == typeof e && null !== e ? e : {};
    }
    function oe(e) {
        e && e.c();
    }
    function se(e, t, r, o) {
        const {
            fragment: s,
            on_mount: l,
            on_destroy: c,
            after_update: u,
        } = e.$$;
        s && s.m(t, r),
            o ||
                V(() => {
                    const t = l.map(n).filter(i);
                    c ? c.push(...t) : a(t), (e.$$.on_mount = []);
                }),
            u.forEach(V);
    }
    function le(e, t) {
        const n = e.$$;
        null !== n.fragment &&
            (a(n.on_destroy),
            n.fragment && n.fragment.d(t),
            (n.on_destroy = n.fragment = null),
            (n.ctx = []));
    }
    function ce(t, n, i, o, s, l, c = [-1]) {
        const u = A;
        j(t);
        const d = (t.$$ = {
            fragment: null,
            ctx: null,
            props: l,
            update: e,
            not_equal: s,
            bound: r(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u ? u.$$.context : n.context || []),
            callbacks: r(),
            dirty: c,
            skip_bound: !1,
        });
        let h = !1;
        if (
            ((d.ctx = i
                ? i(t, n.props || {}, (e, n, ...r) => {
                      const a = r.length ? r[0] : n;
                      return (
                          d.ctx &&
                              s(d.ctx[e], (d.ctx[e] = a)) &&
                              (!d.skip_bound && d.bound[e] && d.bound[e](a),
                              h &&
                                  (function (e, t) {
                                      -1 === e.$$.dirty[0] &&
                                          (H.push(e), F(), e.$$.dirty.fill(0)),
                                          (e.$$.dirty[(t / 31) | 0] |=
                                              1 << t % 31);
                                  })(t, e)),
                          n
                      );
                  })
                : []),
            d.update(),
            (h = !0),
            a(d.before_update),
            (d.fragment = !!o && o(d.ctx)),
            n.target)
        ) {
            if (n.hydrate) {
                const e = (function (e) {
                    return Array.from(e.childNodes);
                })(n.target);
                d.fragment && d.fragment.l(e), e.forEach(p);
            } else d.fragment && d.fragment.c();
            n.intro && te(t.$$.fragment),
                se(t, n.target, n.anchor, n.customElement),
                J();
        }
        j(u);
    }
    class ue {
        $destroy() {
            le(this, 1), (this.$destroy = e);
        }
        $on(e, t) {
            const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
            return (
                n.push(t),
                () => {
                    const e = n.indexOf(t);
                    -1 !== e && n.splice(e, 1);
                }
            );
        }
        $set(e) {
            var t;
            this.$$set &&
                ((t = e), 0 !== Object.keys(t).length) &&
                ((this.$$.skip_bound = !0),
                this.$$set(e),
                (this.$$.skip_bound = !1));
        }
    }
    function de(t) {
        let n,
            r,
            a,
            i,
            o,
            s,
            l,
            c,
            h = t[0].method + "",
            f = t[0].name + "";
        return {
            c() {
                (n = g("a")),
                    (r = g("strong")),
                    (a = m(h)),
                    (o = b()),
                    (s = g("span")),
                    (l = m(f)),
                    v(r, "class", (i = t[0].method.toLowerCase())),
                    v(n, "href", (c = "#" + t[0]._id)),
                    v(n, "class", "sidebar-list-link name");
            },
            m(e, t) {
                d(e, n, t), u(n, r), u(r, a), u(n, o), u(n, s), u(s, l);
            },
            p(e, [t]) {
                1 & t && h !== (h = e[0].method + "") && $(a, h),
                    1 & t &&
                        i !== (i = e[0].method.toLowerCase()) &&
                        v(r, "class", i),
                    1 & t && f !== (f = e[0].name + "") && $(l, f),
                    1 & t && c !== (c = "#" + e[0]._id) && v(n, "href", c);
            },
            i: e,
            o: e,
            d(e) {
                e && p(n);
            },
        };
    }
    function pe(e, t, n) {
        let { request: r } = t;
        return (
            (e.$$set = (e) => {
                "request" in e && n(0, (r = e.request));
            }),
            [r]
        );
    }
    class he extends ue {
        constructor(e) {
            super(), ce(this, e, pe, de, o, { request: 0 });
        }
    }
    function ge(e, t, n) {
        const r = e.slice();
        return (r[6] = t[n]), r;
    }
    function fe(e, t, n) {
        const r = e.slice();
        return (r[9] = t[n]), r;
    }
    function me(e) {
        let t, n, r, a, i;
        return {
            c() {
                (t = g("span")),
                    (n = g("span")),
                    (r = m(e[2])),
                    v(t, "class", "sidebar-list-link name svelte-dbizbl"),
                    M(t, "expanded", e[0]);
            },
            m(o, s) {
                d(o, t, s),
                    u(t, n),
                    u(n, r),
                    a || ((i = w(t, "click", e[5])), (a = !0));
            },
            p(e, n) {
                4 & n && $(r, e[2]), 1 & n && M(t, "expanded", e[0]);
            },
            d(e) {
                e && p(t), (a = !1), i();
            },
        };
    }
    function be(e) {
        let t,
            n,
            r,
            a = e[3],
            i = [];
        for (let t = 0; t < a.length; t += 1) i[t] = _e(fe(e, a, t));
        const o = (e) =>
            ne(i[e], 1, 1, () => {
                i[e] = null;
            });
        let s = e[4],
            l = [];
        for (let t = 0; t < s.length; t += 1) l[t] = we(ge(e, s, t));
        const c = (e) =>
            ne(l[e], 1, 1, () => {
                l[e] = null;
            });
        return {
            c() {
                t = g("ul");
                for (let e = 0; e < i.length; e += 1) i[e].c();
                n = b();
                for (let e = 0; e < l.length; e += 1) l[e].c();
                v(t, "class", "svelte-dbizbl");
            },
            m(e, a) {
                d(e, t, a);
                for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
                u(t, n);
                for (let e = 0; e < l.length; e += 1) l[e].m(t, null);
                r = !0;
            },
            p(e, r) {
                if (8 & r) {
                    let s;
                    for (a = e[3], s = 0; s < a.length; s += 1) {
                        const o = fe(e, a, s);
                        i[s]
                            ? (i[s].p(o, r), te(i[s], 1))
                            : ((i[s] = _e(o)),
                              i[s].c(),
                              te(i[s], 1),
                              i[s].m(t, n));
                    }
                    for (Y(), s = a.length; s < i.length; s += 1) o(s);
                    ee();
                }
                if (16 & r) {
                    let n;
                    for (s = e[4], n = 0; n < s.length; n += 1) {
                        const a = ge(e, s, n);
                        l[n]
                            ? (l[n].p(a, r), te(l[n], 1))
                            : ((l[n] = we(a)),
                              l[n].c(),
                              te(l[n], 1),
                              l[n].m(t, null));
                    }
                    for (Y(), n = s.length; n < l.length; n += 1) c(n);
                    ee();
                }
            },
            i(e) {
                if (!r) {
                    for (let e = 0; e < a.length; e += 1) te(i[e]);
                    for (let e = 0; e < s.length; e += 1) te(l[e]);
                    r = !0;
                }
            },
            o(e) {
                i = i.filter(Boolean);
                for (let e = 0; e < i.length; e += 1) ne(i[e]);
                l = l.filter(Boolean);
                for (let e = 0; e < l.length; e += 1) ne(l[e]);
                r = !1;
            },
            d(e) {
                e && p(t), h(i, e), h(l, e);
            },
        };
    }
    function _e(e) {
        let n, r, a;
        const i = [e[9]];
        let o = {};
        for (let e = 0; e < i.length; e += 1) o = t(o, i[e]);
        return (
            (r = new ke({ props: o })),
            {
                c() {
                    (n = g("li")), oe(r.$$.fragment), v(n, "class", "folder");
                },
                m(e, t) {
                    d(e, n, t), se(r, n, null), (a = !0);
                },
                p(e, t) {
                    const n = 8 & t ? ae(i, [ie(e[9])]) : {};
                    r.$set(n);
                },
                i(e) {
                    a || (te(r.$$.fragment, e), (a = !0));
                },
                o(e) {
                    ne(r.$$.fragment, e), (a = !1);
                },
                d(e) {
                    e && p(n), le(r);
                },
            }
        );
    }
    function we(e) {
        let t, n, r;
        return (
            (n = new he({ props: { request: e[6] } })),
            {
                c() {
                    (t = g("li")), oe(n.$$.fragment), v(t, "class", "request");
                },
                m(e, a) {
                    d(e, t, a), se(n, t, null), (r = !0);
                },
                p(e, t) {
                    const r = {};
                    16 & t && (r.request = e[6]), n.$set(r);
                },
                i(e) {
                    r || (te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    ne(n.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(t), le(n);
                },
            }
        );
    }
    function ve(e) {
        let t,
            n,
            r,
            a = !e[1] && me(e),
            i = e[0] && be(e);
        return {
            c() {
                a && a.c(), (t = b()), i && i.c(), (n = _());
            },
            m(e, o) {
                a && a.m(e, o),
                    d(e, t, o),
                    i && i.m(e, o),
                    d(e, n, o),
                    (r = !0);
            },
            p(e, [r]) {
                e[1]
                    ? a && (a.d(1), (a = null))
                    : a
                    ? a.p(e, r)
                    : ((a = me(e)), a.c(), a.m(t.parentNode, t)),
                    e[0]
                        ? i
                            ? (i.p(e, r), 1 & r && te(i, 1))
                            : ((i = be(e)),
                              i.c(),
                              te(i, 1),
                              i.m(n.parentNode, n))
                        : i &&
                          (Y(),
                          ne(i, 1, 1, () => {
                              i = null;
                          }),
                          ee());
            },
            i(e) {
                r || (te(i), (r = !0));
            },
            o(e) {
                ne(i), (r = !1);
            },
            d(e) {
                a && a.d(e), e && p(t), i && i.d(e), e && p(n);
            },
        };
    }
    function ye(e, t, n) {
        let { root: r = !1 } = t,
            { expanded: a = !1 } = t,
            { name: i } = t,
            { children: o } = t,
            { requests: s } = t;
        return (
            (e.$$set = (e) => {
                "root" in e && n(1, (r = e.root)),
                    "expanded" in e && n(0, (a = e.expanded)),
                    "name" in e && n(2, (i = e.name)),
                    "children" in e && n(3, (o = e.children)),
                    "requests" in e && n(4, (s = e.requests));
            }),
            [
                a,
                r,
                i,
                o,
                s,
                function () {
                    n(0, (a = !a));
                },
            ]
        );
    }
    class ke extends ue {
        constructor(e) {
            super(),
                ce(this, e, ye, ve, o, {
                    root: 1,
                    expanded: 0,
                    name: 2,
                    children: 3,
                    requests: 4,
                });
        }
    }
    function $e(e) {
        let t, n, r;
        return (
            (n = new ke({
                props: {
                    name: e[2].name,
                    children: e[1],
                    requests: e[0],
                    root: !0,
                    expanded: !0,
                },
            })),
            {
                c() {
                    (t = g("aside")),
                        oe(n.$$.fragment),
                        v(t, "class", "svelte-dekk65"),
                        M(t, "visible", e[3]);
                },
                m(e, a) {
                    d(e, t, a), se(n, t, null), (r = !0);
                },
                p(e, [r]) {
                    const a = {};
                    4 & r && (a.name = e[2].name),
                        2 & r && (a.children = e[1]),
                        1 & r && (a.requests = e[0]),
                        n.$set(a),
                        8 & r && M(t, "visible", e[3]);
                },
                i(e) {
                    r || (te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    ne(n.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(t), le(n);
                },
            }
        );
    }
    function Ee(e, t, n) {
        let { requests: r } = t,
            { groups: a } = t,
            { workspace: i } = t,
            { visible: o } = t;
        return (
            (e.$$set = (e) => {
                "requests" in e && n(0, (r = e.requests)),
                    "groups" in e && n(1, (a = e.groups)),
                    "workspace" in e && n(2, (i = e.workspace)),
                    "visible" in e && n(3, (o = e.visible));
            }),
            [r, a, i, o]
        );
    }
    class xe extends ue {
        constructor(e) {
            super(),
                ce(this, e, Ee, $e, o, {
                    requests: 0,
                    groups: 1,
                    workspace: 2,
                    visible: 3,
                });
        }
    }
    function Se(e) {
        return (
            e instanceof Map
                ? (e.clear =
                      e.delete =
                      e.set =
                          function () {
                              throw new Error("map is read-only");
                          })
                : e instanceof Set &&
                  (e.add =
                      e.clear =
                      e.delete =
                          function () {
                              throw new Error("set is read-only");
                          }),
            Object.freeze(e),
            Object.getOwnPropertyNames(e).forEach(function (t) {
                var n = e[t];
                "object" != typeof n || Object.isFrozen(n) || Se(n);
            }),
            e
        );
    }
    var Ce = Se,
        Ae = Se;
    Ce.default = Ae;
    class Le {
        constructor(e) {
            void 0 === e.data && (e.data = {}),
                (this.data = e.data),
                (this.isMatchIgnored = !1);
        }
        ignoreMatch() {
            this.isMatchIgnored = !0;
        }
    }
    function Me(e) {
        return e
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
    }
    function Te(e, ...t) {
        const n = Object.create(null);
        for (const t in e) n[t] = e[t];
        return (
            t.forEach(function (e) {
                for (const t in e) n[t] = e[t];
            }),
            n
        );
    }
    const je = (e) => !!e.kind;
    class Ie {
        constructor(e, t) {
            (this.buffer = ""),
                (this.classPrefix = t.classPrefix),
                e.walk(this);
        }
        addText(e) {
            this.buffer += Me(e);
        }
        openNode(e) {
            if (!je(e)) return;
            let t = e.kind;
            e.sublanguage || (t = `${this.classPrefix}${t}`), this.span(t);
        }
        closeNode(e) {
            je(e) && (this.buffer += "</span>");
        }
        value() {
            return this.buffer;
        }
        span(e) {
            this.buffer += `<span class="${e}">`;
        }
    }
    class Ne {
        constructor() {
            (this.rootNode = { children: [] }), (this.stack = [this.rootNode]);
        }
        get top() {
            return this.stack[this.stack.length - 1];
        }
        get root() {
            return this.rootNode;
        }
        add(e) {
            this.top.children.push(e);
        }
        openNode(e) {
            const t = { kind: e, children: [] };
            this.add(t), this.stack.push(t);
        }
        closeNode() {
            if (this.stack.length > 1) return this.stack.pop();
        }
        closeAllNodes() {
            for (; this.closeNode(); );
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4);
        }
        walk(e) {
            return this.constructor._walk(e, this.rootNode);
        }
        static _walk(e, t) {
            return (
                "string" == typeof t
                    ? e.addText(t)
                    : t.children &&
                      (e.openNode(t),
                      t.children.forEach((t) => this._walk(e, t)),
                      e.closeNode(t)),
                e
            );
        }
        static _collapse(e) {
            "string" != typeof e &&
                e.children &&
                (e.children.every((e) => "string" == typeof e)
                    ? (e.children = [e.children.join("")])
                    : e.children.forEach((e) => {
                          Ne._collapse(e);
                      }));
        }
    }
    class Oe extends Ne {
        constructor(e) {
            super(), (this.options = e);
        }
        addKeyword(e, t) {
            "" !== e && (this.openNode(t), this.addText(e), this.closeNode());
        }
        addText(e) {
            "" !== e && this.add(e);
        }
        addSublanguage(e, t) {
            const n = e.root;
            (n.kind = t), (n.sublanguage = !0), this.add(n);
        }
        toHTML() {
            return new Ie(this, this.options).value();
        }
        finalize() {
            return !0;
        }
    }
    function Pe(e) {
        return e ? ("string" == typeof e ? e : e.source) : null;
    }
    const Re = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
    const He =
            "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
        ze = { begin: "\\\\[\\s\\S]", relevance: 0 },
        Be = {
            className: "string",
            begin: "'",
            end: "'",
            illegal: "\\n",
            contains: [ze],
        },
        qe = {
            className: "string",
            begin: '"',
            end: '"',
            illegal: "\\n",
            contains: [ze],
        },
        De = {
            begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
        },
        Ue = function (e, t, n = {}) {
            const r = Te(
                { className: "comment", begin: e, end: t, contains: [] },
                n
            );
            return (
                r.contains.push(De),
                r.contains.push({
                    className: "doctag",
                    begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
                    relevance: 0,
                }),
                r
            );
        },
        Fe = Ue("//", "$"),
        Ge = Ue("/\\*", "\\*/"),
        Ve = Ue("#", "$"),
        We = { className: "number", begin: "\\b\\d+(\\.\\d+)?", relevance: 0 },
        Ke = { className: "number", begin: He, relevance: 0 },
        Je = { className: "number", begin: "\\b(0b[01]+)", relevance: 0 },
        Ze = {
            className: "number",
            begin: "\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0,
        },
        Qe = {
            begin: /(?=\/[^/\n]*\/)/,
            contains: [
                {
                    className: "regexp",
                    begin: /\//,
                    end: /\/[gimuy]*/,
                    illegal: /\n/,
                    contains: [
                        ze,
                        {
                            begin: /\[/,
                            end: /\]/,
                            relevance: 0,
                            contains: [ze],
                        },
                    ],
                },
            ],
        },
        Xe = { className: "title", begin: "[a-zA-Z]\\w*", relevance: 0 },
        Ye = { className: "title", begin: "[a-zA-Z_]\\w*", relevance: 0 },
        et = { begin: "\\.\\s*[a-zA-Z_]\\w*", relevance: 0 };
    var tt = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: "[a-zA-Z]\\w*",
        UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
        NUMBER_RE: "\\b\\d+(\\.\\d+)?",
        C_NUMBER_RE: He,
        BINARY_NUMBER_RE: "\\b(0b[01]+)",
        RE_STARTERS_RE:
            "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        SHEBANG: (e = {}) => {
            const t = /^#![ ]*\//;
            return (
                e.binary &&
                    (e.begin = (function (...e) {
                        return e.map((e) => Pe(e)).join("");
                    })(t, /.*\b/, e.binary, /\b.*/)),
                Te(
                    {
                        className: "meta",
                        begin: t,
                        end: /$/,
                        relevance: 0,
                        "on:begin": (e, t) => {
                            0 !== e.index && t.ignoreMatch();
                        },
                    },
                    e
                )
            );
        },
        BACKSLASH_ESCAPE: ze,
        APOS_STRING_MODE: Be,
        QUOTE_STRING_MODE: qe,
        PHRASAL_WORDS_MODE: De,
        COMMENT: Ue,
        C_LINE_COMMENT_MODE: Fe,
        C_BLOCK_COMMENT_MODE: Ge,
        HASH_COMMENT_MODE: Ve,
        NUMBER_MODE: We,
        C_NUMBER_MODE: Ke,
        BINARY_NUMBER_MODE: Je,
        CSS_NUMBER_MODE: Ze,
        REGEXP_MODE: Qe,
        TITLE_MODE: Xe,
        UNDERSCORE_TITLE_MODE: Ye,
        METHOD_GUARD: et,
        END_SAME_AS_BEGIN: function (e) {
            return Object.assign(e, {
                "on:begin": (e, t) => {
                    t.data._beginMatch = e[1];
                },
                "on:end": (e, t) => {
                    t.data._beginMatch !== e[1] && t.ignoreMatch();
                },
            });
        },
    });
    function nt(e, t) {
        "." === e.input[e.index - 1] && t.ignoreMatch();
    }
    function rt(e, t) {
        t &&
            e.beginKeywords &&
            ((e.begin =
                "\\b(" +
                e.beginKeywords.split(" ").join("|") +
                ")(?!\\.)(?=\\b|\\s)"),
            (e.__beforeBegin = nt),
            (e.keywords = e.keywords || e.beginKeywords),
            delete e.beginKeywords,
            void 0 === e.relevance && (e.relevance = 0));
    }
    function at(e, t) {
        Array.isArray(e.illegal) &&
            (e.illegal = (function (...e) {
                return "(" + e.map((e) => Pe(e)).join("|") + ")";
            })(...e.illegal));
    }
    function it(e, t) {
        if (e.match) {
            if (e.begin || e.end)
                throw new Error("begin & end are not supported with match");
            (e.begin = e.match), delete e.match;
        }
    }
    function ot(e, t) {
        void 0 === e.relevance && (e.relevance = 1);
    }
    const st = [
        "of",
        "and",
        "for",
        "in",
        "not",
        "or",
        "if",
        "then",
        "parent",
        "list",
        "value",
    ];
    function lt(e, t) {
        return t
            ? Number(t)
            : (function (e) {
                  return st.includes(e.toLowerCase());
              })(e)
            ? 0
            : 1;
    }
    function ct(e, { plugins: t }) {
        function n(t, n) {
            return new RegExp(
                Pe(t),
                "m" + (e.case_insensitive ? "i" : "") + (n ? "g" : "")
            );
        }
        class r {
            constructor() {
                (this.matchIndexes = {}),
                    (this.regexes = []),
                    (this.matchAt = 1),
                    (this.position = 0);
            }
            addRule(e, t) {
                (t.position = this.position++),
                    (this.matchIndexes[this.matchAt] = t),
                    this.regexes.push([t, e]),
                    (this.matchAt +=
                        (function (e) {
                            return (
                                new RegExp(e.toString() + "|").exec("").length -
                                1
                            );
                        })(e) + 1);
            }
            compile() {
                0 === this.regexes.length && (this.exec = () => null);
                const e = this.regexes.map((e) => e[1]);
                (this.matcherRe = n(
                    (function (e, t = "|") {
                        let n = 0;
                        return e
                            .map((e) => {
                                n += 1;
                                const t = n;
                                let r = Pe(e),
                                    a = "";
                                for (; r.length > 0; ) {
                                    const e = Re.exec(r);
                                    if (!e) {
                                        a += r;
                                        break;
                                    }
                                    (a += r.substring(0, e.index)),
                                        (r = r.substring(
                                            e.index + e[0].length
                                        )),
                                        "\\" === e[0][0] && e[1]
                                            ? (a +=
                                                  "\\" +
                                                  String(Number(e[1]) + t))
                                            : ((a += e[0]),
                                              "(" === e[0] && n++);
                                }
                                return a;
                            })
                            .map((e) => `(${e})`)
                            .join(t);
                    })(e),
                    !0
                )),
                    (this.lastIndex = 0);
            }
            exec(e) {
                this.matcherRe.lastIndex = this.lastIndex;
                const t = this.matcherRe.exec(e);
                if (!t) return null;
                const n = t.findIndex((e, t) => t > 0 && void 0 !== e),
                    r = this.matchIndexes[n];
                return t.splice(0, n), Object.assign(t, r);
            }
        }
        class a {
            constructor() {
                (this.rules = []),
                    (this.multiRegexes = []),
                    (this.count = 0),
                    (this.lastIndex = 0),
                    (this.regexIndex = 0);
            }
            getMatcher(e) {
                if (this.multiRegexes[e]) return this.multiRegexes[e];
                const t = new r();
                return (
                    this.rules.slice(e).forEach(([e, n]) => t.addRule(e, n)),
                    t.compile(),
                    (this.multiRegexes[e] = t),
                    t
                );
            }
            resumingScanAtSamePosition() {
                return 0 !== this.regexIndex;
            }
            considerAll() {
                this.regexIndex = 0;
            }
            addRule(e, t) {
                this.rules.push([e, t]), "begin" === t.type && this.count++;
            }
            exec(e) {
                const t = this.getMatcher(this.regexIndex);
                t.lastIndex = this.lastIndex;
                let n = t.exec(e);
                if (this.resumingScanAtSamePosition())
                    if (n && n.index === this.lastIndex);
                    else {
                        const t = this.getMatcher(0);
                        (t.lastIndex = this.lastIndex + 1), (n = t.exec(e));
                    }
                return (
                    n &&
                        ((this.regexIndex += n.position + 1),
                        this.regexIndex === this.count && this.considerAll()),
                    n
                );
            }
        }
        if (
            (e.compilerExtensions || (e.compilerExtensions = []),
            e.contains && e.contains.includes("self"))
        )
            throw new Error(
                "ERR: contains `self` is not supported at the top-level of a language.  See docs."
            );
        return (
            (e.classNameAliases = Te(e.classNameAliases || {})),
            (function t(r, i) {
                const o = r;
                if (r.isCompiled) return o;
                [it].forEach((e) => e(r, i)),
                    e.compilerExtensions.forEach((e) => e(r, i)),
                    (r.__beforeBegin = null),
                    [rt, at, ot].forEach((e) => e(r, i)),
                    (r.isCompiled = !0);
                let s = null;
                if (
                    ("object" == typeof r.keywords &&
                        ((s = r.keywords.$pattern), delete r.keywords.$pattern),
                    r.keywords &&
                        (r.keywords = (function e(t, n, r = "keyword") {
                            const a = {};
                            return (
                                "string" == typeof t
                                    ? i(r, t.split(" "))
                                    : Array.isArray(t)
                                    ? i(r, t)
                                    : Object.keys(t).forEach(function (r) {
                                          Object.assign(a, e(t[r], n, r));
                                      }),
                                a
                            );
                            function i(e, t) {
                                n && (t = t.map((e) => e.toLowerCase())),
                                    t.forEach(function (t) {
                                        const n = t.split("|");
                                        a[n[0]] = [e, lt(n[0], n[1])];
                                    });
                            }
                        })(r.keywords, e.case_insensitive)),
                    r.lexemes && s)
                )
                    throw new Error(
                        "ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) "
                    );
                return (
                    (s = s || r.lexemes || /\w+/),
                    (o.keywordPatternRe = n(s, !0)),
                    i &&
                        (r.begin || (r.begin = /\B|\b/),
                        (o.beginRe = n(r.begin)),
                        r.endSameAsBegin && (r.end = r.begin),
                        r.end || r.endsWithParent || (r.end = /\B|\b/),
                        r.end && (o.endRe = n(r.end)),
                        (o.terminatorEnd = Pe(r.end) || ""),
                        r.endsWithParent &&
                            i.terminatorEnd &&
                            (o.terminatorEnd +=
                                (r.end ? "|" : "") + i.terminatorEnd)),
                    r.illegal && (o.illegalRe = n(r.illegal)),
                    r.contains || (r.contains = []),
                    (r.contains = [].concat(
                        ...r.contains.map(function (e) {
                            return (function (e) {
                                e.variants &&
                                    !e.cachedVariants &&
                                    (e.cachedVariants = e.variants.map(
                                        function (t) {
                                            return Te(e, { variants: null }, t);
                                        }
                                    ));
                                if (e.cachedVariants) return e.cachedVariants;
                                if (
                                    (function e(t) {
                                        return (
                                            !!t &&
                                            (t.endsWithParent || e(t.starts))
                                        );
                                    })(e)
                                )
                                    return Te(e, {
                                        starts: e.starts ? Te(e.starts) : null,
                                    });
                                if (Object.isFrozen(e)) return Te(e);
                                return e;
                            })("self" === e ? r : e);
                        })
                    )),
                    r.contains.forEach(function (e) {
                        t(e, o);
                    }),
                    r.starts && t(r.starts, i),
                    (o.matcher = (function (e) {
                        const t = new a();
                        return (
                            e.contains.forEach((e) =>
                                t.addRule(e.begin, { rule: e, type: "begin" })
                            ),
                            e.terminatorEnd &&
                                t.addRule(e.terminatorEnd, { type: "end" }),
                            e.illegal &&
                                t.addRule(e.illegal, { type: "illegal" }),
                            t
                        );
                    })(o)),
                    o
                );
            })(e)
        );
    }
    function ut(e) {
        const t = {
            props: ["language", "code", "autodetect"],
            data: function () {
                return { detectedLanguage: "", unknownLanguage: !1 };
            },
            computed: {
                className() {
                    return this.unknownLanguage
                        ? ""
                        : "hljs " + this.detectedLanguage;
                },
                highlighted() {
                    if (!this.autoDetect && !e.getLanguage(this.language))
                        return (
                            console.warn(
                                `The language "${this.language}" you specified could not be found.`
                            ),
                            (this.unknownLanguage = !0),
                            Me(this.code)
                        );
                    let t = {};
                    return (
                        this.autoDetect
                            ? ((t = e.highlightAuto(this.code)),
                              (this.detectedLanguage = t.language))
                            : ((t = e.highlight(
                                  this.language,
                                  this.code,
                                  this.ignoreIllegals
                              )),
                              (this.detectedLanguage = this.language)),
                        t.value
                    );
                },
                autoDetect() {
                    return (
                        !this.language ||
                        ((e = this.autodetect), Boolean(e || "" === e))
                    );
                    var e;
                },
                ignoreIllegals: () => !0,
            },
            render(e) {
                return e("pre", {}, [
                    e("code", {
                        class: this.className,
                        domProps: { innerHTML: this.highlighted },
                    }),
                ]);
            },
        };
        return {
            Component: t,
            VuePlugin: {
                install(e) {
                    e.component("highlightjs", t);
                },
            },
        };
    }
    const dt = {
        "after:highlightElement": ({ el: e, result: t, text: n }) => {
            const r = ht(e);
            if (!r.length) return;
            const a = document.createElement("div");
            (a.innerHTML = t.value),
                (t.value = (function (e, t, n) {
                    let r = 0,
                        a = "";
                    const i = [];
                    function o() {
                        return e.length && t.length
                            ? e[0].offset !== t[0].offset
                                ? e[0].offset < t[0].offset
                                    ? e
                                    : t
                                : "start" === t[0].event
                                ? e
                                : t
                            : e.length
                            ? e
                            : t;
                    }
                    function s(e) {
                        a +=
                            "<" +
                            pt(e) +
                            [].map
                                .call(e.attributes, function (e) {
                                    return (
                                        " " +
                                        e.nodeName +
                                        '="' +
                                        Me(e.value) +
                                        '"'
                                    );
                                })
                                .join("") +
                            ">";
                    }
                    function l(e) {
                        a += "</" + pt(e) + ">";
                    }
                    function c(e) {
                        ("start" === e.event ? s : l)(e.node);
                    }
                    for (; e.length || t.length; ) {
                        let t = o();
                        if (
                            ((a += Me(n.substring(r, t[0].offset))),
                            (r = t[0].offset),
                            t === e)
                        ) {
                            i.reverse().forEach(l);
                            do {
                                c(t.splice(0, 1)[0]), (t = o());
                            } while (t === e && t.length && t[0].offset === r);
                            i.reverse().forEach(s);
                        } else
                            "start" === t[0].event
                                ? i.push(t[0].node)
                                : i.pop(),
                                c(t.splice(0, 1)[0]);
                    }
                    return a + Me(n.substr(r));
                })(r, ht(a), n));
        },
    };
    function pt(e) {
        return e.nodeName.toLowerCase();
    }
    function ht(e) {
        const t = [];
        return (
            (function e(n, r) {
                for (let a = n.firstChild; a; a = a.nextSibling)
                    3 === a.nodeType
                        ? (r += a.nodeValue.length)
                        : 1 === a.nodeType &&
                          (t.push({ event: "start", offset: r, node: a }),
                          (r = e(a, r)),
                          pt(a).match(/br|hr|img|input/) ||
                              t.push({ event: "stop", offset: r, node: a }));
                return r;
            })(e, 0),
            t
        );
    }
    const gt = {},
        ft = (e) => {
            console.error(e);
        },
        mt = (e, ...t) => {
            console.log("WARN: " + e, ...t);
        },
        bt = (e, t) => {
            gt[`${e}/${t}`] ||
                (console.log(`Deprecated as of ${e}. ${t}`),
                (gt[`${e}/${t}`] = !0));
        },
        _t = Me,
        wt = Te,
        vt = Symbol("nomatch");
    var yt = (function (e) {
        const t = Object.create(null),
            n = Object.create(null),
            r = [];
        let a = !0;
        const i = /(^(<[^>]+>|\t|)+|\n)/gm,
            o =
                "Could not find the language '{}', did you forget to load/include a language module?",
            s = { disableAutodetect: !0, name: "Plain text", contains: [] };
        let l = {
            noHighlightRe: /^(no-?highlight)$/i,
            languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: null,
            __emitter: Oe,
        };
        function c(e) {
            return l.noHighlightRe.test(e);
        }
        function u(e, t, n, r) {
            let a = "",
                i = "";
            "object" == typeof t
                ? ((a = e),
                  (n = t.ignoreIllegals),
                  (i = t.language),
                  (r = void 0))
                : (bt(
                      "10.7.0",
                      "highlight(lang, code, ...args) has been deprecated."
                  ),
                  bt(
                      "10.7.0",
                      "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"
                  ),
                  (i = e),
                  (a = t));
            const o = { code: a, language: i };
            $("before:highlight", o);
            const s = o.result ? o.result : d(o.language, o.code, n, r);
            return (s.code = o.code), $("after:highlight", s), s;
        }
        function d(e, n, i, s) {
            function c(e, t) {
                const n = w.case_insensitive ? t[0].toLowerCase() : t[0];
                return (
                    Object.prototype.hasOwnProperty.call(e.keywords, n) &&
                    e.keywords[n]
                );
            }
            function u() {
                null != $.subLanguage
                    ? (function () {
                          if ("" === S) return;
                          let e = null;
                          if ("string" == typeof $.subLanguage) {
                              if (!t[$.subLanguage]) return void x.addText(S);
                              (e = d($.subLanguage, S, !0, E[$.subLanguage])),
                                  (E[$.subLanguage] = e.top);
                          } else
                              e = p(
                                  S,
                                  $.subLanguage.length ? $.subLanguage : null
                              );
                          $.relevance > 0 && (C += e.relevance),
                              x.addSublanguage(e.emitter, e.language);
                      })()
                    : (function () {
                          if (!$.keywords) return void x.addText(S);
                          let e = 0;
                          $.keywordPatternRe.lastIndex = 0;
                          let t = $.keywordPatternRe.exec(S),
                              n = "";
                          for (; t; ) {
                              n += S.substring(e, t.index);
                              const r = c($, t);
                              if (r) {
                                  const [e, a] = r;
                                  if (
                                      (x.addText(n),
                                      (n = ""),
                                      (C += a),
                                      e.startsWith("_"))
                                  )
                                      n += t[0];
                                  else {
                                      const n = w.classNameAliases[e] || e;
                                      x.addKeyword(t[0], n);
                                  }
                              } else n += t[0];
                              (e = $.keywordPatternRe.lastIndex),
                                  (t = $.keywordPatternRe.exec(S));
                          }
                          (n += S.substr(e)), x.addText(n);
                      })(),
                    (S = "");
            }
            function h(e) {
                return (
                    e.className &&
                        x.openNode(
                            w.classNameAliases[e.className] || e.className
                        ),
                    ($ = Object.create(e, { parent: { value: $ } })),
                    $
                );
            }
            function g(e) {
                return 0 === $.matcher.regexIndex
                    ? ((S += e[0]), 1)
                    : ((M = !0), 0);
            }
            function f(e) {
                const t = e[0],
                    n = e.rule,
                    r = new Le(n),
                    a = [n.__beforeBegin, n["on:begin"]];
                for (const n of a)
                    if (n && (n(e, r), r.isMatchIgnored)) return g(t);
                return (
                    n &&
                        n.endSameAsBegin &&
                        (n.endRe = new RegExp(
                            t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
                            "m"
                        )),
                    n.skip
                        ? (S += t)
                        : (n.excludeBegin && (S += t),
                          u(),
                          n.returnBegin || n.excludeBegin || (S = t)),
                    h(n),
                    n.returnBegin ? 0 : t.length
                );
            }
            function m(e) {
                const t = e[0],
                    r = n.substr(e.index),
                    a = (function e(t, n, r) {
                        let a = (function (e, t) {
                            const n = e && e.exec(t);
                            return n && 0 === n.index;
                        })(t.endRe, r);
                        if (a) {
                            if (t["on:end"]) {
                                const e = new Le(t);
                                t["on:end"](n, e), e.isMatchIgnored && (a = !1);
                            }
                            if (a) {
                                for (; t.endsParent && t.parent; ) t = t.parent;
                                return t;
                            }
                        }
                        if (t.endsWithParent) return e(t.parent, n, r);
                    })($, e, r);
                if (!a) return vt;
                const i = $;
                i.skip
                    ? (S += t)
                    : (i.returnEnd || i.excludeEnd || (S += t),
                      u(),
                      i.excludeEnd && (S = t));
                do {
                    $.className && x.closeNode(),
                        $.skip || $.subLanguage || (C += $.relevance),
                        ($ = $.parent);
                } while ($ !== a.parent);
                return (
                    a.starts &&
                        (a.endSameAsBegin && (a.starts.endRe = a.endRe),
                        h(a.starts)),
                    i.returnEnd ? 0 : t.length
                );
            }
            let b = {};
            function _(t, r) {
                const o = r && r[0];
                if (((S += t), null == o)) return u(), 0;
                if (
                    "begin" === b.type &&
                    "end" === r.type &&
                    b.index === r.index &&
                    "" === o
                ) {
                    if (((S += n.slice(r.index, r.index + 1)), !a)) {
                        const t = new Error("0 width match regex");
                        throw ((t.languageName = e), (t.badRule = b.rule), t);
                    }
                    return 1;
                }
                if (((b = r), "begin" === r.type)) return f(r);
                if ("illegal" === r.type && !i) {
                    const e = new Error(
                        'Illegal lexeme "' +
                            o +
                            '" for mode "' +
                            ($.className || "<unnamed>") +
                            '"'
                    );
                    throw ((e.mode = $), e);
                }
                if ("end" === r.type) {
                    const e = m(r);
                    if (e !== vt) return e;
                }
                if ("illegal" === r.type && "" === o) return 1;
                if (L > 1e5 && L > 3 * r.index) {
                    throw new Error(
                        "potential infinite loop, way more iterations than matches"
                    );
                }
                return (S += o), o.length;
            }
            const w = v(e);
            if (!w)
                throw (
                    (ft(o.replace("{}", e)),
                    new Error('Unknown language: "' + e + '"'))
                );
            const y = ct(w, { plugins: r });
            let k = "",
                $ = s || y;
            const E = {},
                x = new l.__emitter(l);
            !(function () {
                const e = [];
                for (let t = $; t !== w; t = t.parent)
                    t.className && e.unshift(t.className);
                e.forEach((e) => x.openNode(e));
            })();
            let S = "",
                C = 0,
                A = 0,
                L = 0,
                M = !1;
            try {
                for ($.matcher.considerAll(); ; ) {
                    L++,
                        M ? (M = !1) : $.matcher.considerAll(),
                        ($.matcher.lastIndex = A);
                    const e = $.matcher.exec(n);
                    if (!e) break;
                    const t = _(n.substring(A, e.index), e);
                    A = e.index + t;
                }
                return (
                    _(n.substr(A)),
                    x.closeAllNodes(),
                    x.finalize(),
                    (k = x.toHTML()),
                    {
                        relevance: Math.floor(C),
                        value: k,
                        language: e,
                        illegal: !1,
                        emitter: x,
                        top: $,
                    }
                );
            } catch (t) {
                if (t.message && t.message.includes("Illegal"))
                    return {
                        illegal: !0,
                        illegalBy: {
                            msg: t.message,
                            context: n.slice(A - 100, A + 100),
                            mode: t.mode,
                        },
                        sofar: k,
                        relevance: 0,
                        value: _t(n),
                        emitter: x,
                    };
                if (a)
                    return {
                        illegal: !1,
                        relevance: 0,
                        value: _t(n),
                        emitter: x,
                        language: e,
                        top: $,
                        errorRaised: t,
                    };
                throw t;
            }
        }
        function p(e, n) {
            n = n || l.languages || Object.keys(t);
            const r = (function (e) {
                    const t = {
                        relevance: 0,
                        emitter: new l.__emitter(l),
                        value: _t(e),
                        illegal: !1,
                        top: s,
                    };
                    return t.emitter.addText(e), t;
                })(e),
                a = n
                    .filter(v)
                    .filter(k)
                    .map((t) => d(t, e, !1));
            a.unshift(r);
            const i = a.sort((e, t) => {
                    if (e.relevance !== t.relevance)
                        return t.relevance - e.relevance;
                    if (e.language && t.language) {
                        if (v(e.language).supersetOf === t.language) return 1;
                        if (v(t.language).supersetOf === e.language) return -1;
                    }
                    return 0;
                }),
                [o, c] = i,
                u = o;
            return (u.second_best = c), u;
        }
        const h = {
                "before:highlightElement": ({ el: e }) => {
                    l.useBR &&
                        (e.innerHTML = e.innerHTML
                            .replace(/\n/g, "")
                            .replace(/<br[ /]*>/g, "\n"));
                },
                "after:highlightElement": ({ result: e }) => {
                    l.useBR && (e.value = e.value.replace(/\n/g, "<br>"));
                },
            },
            g = /^(<[^>]+>|\t)+/gm,
            f = {
                "after:highlightElement": ({ result: e }) => {
                    l.tabReplace &&
                        (e.value = e.value.replace(g, (e) =>
                            e.replace(/\t/g, l.tabReplace)
                        ));
                },
            };
        function m(e) {
            let t = null;
            const r = (function (e) {
                let t = e.className + " ";
                t += e.parentNode ? e.parentNode.className : "";
                const n = l.languageDetectRe.exec(t);
                if (n) {
                    const t = v(n[1]);
                    return (
                        t ||
                            (mt(o.replace("{}", n[1])),
                            mt(
                                "Falling back to no-highlight mode for this block.",
                                e
                            )),
                        t ? n[1] : "no-highlight"
                    );
                }
                return t.split(/\s+/).find((e) => c(e) || v(e));
            })(e);
            if (c(r)) return;
            $("before:highlightElement", { el: e, language: r }), (t = e);
            const a = t.textContent,
                i = r ? u(a, { language: r, ignoreIllegals: !0 }) : p(a);
            $("after:highlightElement", { el: e, result: i, text: a }),
                (e.innerHTML = i.value),
                (function (e, t, r) {
                    const a = t ? n[t] : r;
                    e.classList.add("hljs"), a && e.classList.add(a);
                })(e, r, i.language),
                (e.result = {
                    language: i.language,
                    re: i.relevance,
                    relavance: i.relevance,
                }),
                i.second_best &&
                    (e.second_best = {
                        language: i.second_best.language,
                        re: i.second_best.relevance,
                        relavance: i.second_best.relevance,
                    });
        }
        const b = () => {
            if (b.called) return;
            (b.called = !0),
                bt(
                    "10.6.0",
                    "initHighlighting() is deprecated.  Use highlightAll() instead."
                );
            document.querySelectorAll("pre code").forEach(m);
        };
        let _ = !1;
        function w() {
            if ("loading" === document.readyState) return void (_ = !0);
            document.querySelectorAll("pre code").forEach(m);
        }
        function v(e) {
            return (e = (e || "").toLowerCase()), t[e] || t[n[e]];
        }
        function y(e, { languageName: t }) {
            "string" == typeof e && (e = [e]),
                e.forEach((e) => {
                    n[e.toLowerCase()] = t;
                });
        }
        function k(e) {
            const t = v(e);
            return t && !t.disableAutodetect;
        }
        function $(e, t) {
            const n = e;
            r.forEach(function (e) {
                e[n] && e[n](t);
            });
        }
        "undefined" != typeof window &&
            window.addEventListener &&
            window.addEventListener(
                "DOMContentLoaded",
                function () {
                    _ && w();
                },
                !1
            ),
            Object.assign(e, {
                highlight: u,
                highlightAuto: p,
                highlightAll: w,
                fixMarkup: function (e) {
                    return (
                        bt(
                            "10.2.0",
                            "fixMarkup will be removed entirely in v11.0"
                        ),
                        bt(
                            "10.2.0",
                            "Please see https://github.com/highlightjs/highlight.js/issues/2534"
                        ),
                        (t = e),
                        l.tabReplace || l.useBR
                            ? t.replace(i, (e) =>
                                  "\n" === e
                                      ? l.useBR
                                          ? "<br>"
                                          : e
                                      : l.tabReplace
                                      ? e.replace(/\t/g, l.tabReplace)
                                      : e
                              )
                            : t
                    );
                    var t;
                },
                highlightElement: m,
                highlightBlock: function (e) {
                    return (
                        bt(
                            "10.7.0",
                            "highlightBlock will be removed entirely in v12.0"
                        ),
                        bt("10.7.0", "Please use highlightElement now."),
                        m(e)
                    );
                },
                configure: function (e) {
                    e.useBR &&
                        (bt(
                            "10.3.0",
                            "'useBR' will be removed entirely in v11.0"
                        ),
                        bt(
                            "10.3.0",
                            "Please see https://github.com/highlightjs/highlight.js/issues/2559"
                        )),
                        (l = wt(l, e));
                },
                initHighlighting: b,
                initHighlightingOnLoad: function () {
                    bt(
                        "10.6.0",
                        "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."
                    ),
                        (_ = !0);
                },
                registerLanguage: function (n, r) {
                    let i = null;
                    try {
                        i = r(e);
                    } catch (e) {
                        if (
                            (ft(
                                "Language definition for '{}' could not be registered.".replace(
                                    "{}",
                                    n
                                )
                            ),
                            !a)
                        )
                            throw e;
                        ft(e), (i = s);
                    }
                    i.name || (i.name = n),
                        (t[n] = i),
                        (i.rawDefinition = r.bind(null, e)),
                        i.aliases && y(i.aliases, { languageName: n });
                },
                unregisterLanguage: function (e) {
                    delete t[e];
                    for (const t of Object.keys(n)) n[t] === e && delete n[t];
                },
                listLanguages: function () {
                    return Object.keys(t);
                },
                getLanguage: v,
                registerAliases: y,
                requireLanguage: function (e) {
                    bt(
                        "10.4.0",
                        "requireLanguage will be removed entirely in v11."
                    ),
                        bt(
                            "10.4.0",
                            "Please see https://github.com/highlightjs/highlight.js/pull/2844"
                        );
                    const t = v(e);
                    if (t) return t;
                    throw new Error(
                        "The '{}' language is required, but not loaded.".replace(
                            "{}",
                            e
                        )
                    );
                },
                autoDetection: k,
                inherit: wt,
                addPlugin: function (e) {
                    !(function (e) {
                        e["before:highlightBlock"] &&
                            !e["before:highlightElement"] &&
                            (e["before:highlightElement"] = (t) => {
                                e["before:highlightBlock"](
                                    Object.assign({ block: t.el }, t)
                                );
                            }),
                            e["after:highlightBlock"] &&
                                !e["after:highlightElement"] &&
                                (e["after:highlightElement"] = (t) => {
                                    e["after:highlightBlock"](
                                        Object.assign({ block: t.el }, t)
                                    );
                                });
                    })(e),
                        r.push(e);
                },
                vuePlugin: ut(e).VuePlugin,
            }),
            (e.debugMode = function () {
                a = !1;
            }),
            (e.safeMode = function () {
                a = !0;
            }),
            (e.versionString = "10.7.2");
        for (const e in tt) "object" == typeof tt[e] && Ce(tt[e]);
        return (
            Object.assign(e, tt),
            e.addPlugin(h),
            e.addPlugin(dt),
            e.addPlugin(f),
            e
        );
    })({});
    const kt = [
            "as",
            "in",
            "of",
            "if",
            "for",
            "while",
            "finally",
            "var",
            "new",
            "function",
            "do",
            "return",
            "void",
            "else",
            "break",
            "catch",
            "instanceof",
            "with",
            "throw",
            "case",
            "default",
            "try",
            "switch",
            "continue",
            "typeof",
            "delete",
            "let",
            "yield",
            "const",
            "class",
            "debugger",
            "async",
            "await",
            "static",
            "import",
            "from",
            "export",
            "extends",
        ],
        $t = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        Et = [].concat(
            [
                "setInterval",
                "setTimeout",
                "clearInterval",
                "clearTimeout",
                "require",
                "exports",
                "eval",
                "isFinite",
                "isNaN",
                "parseFloat",
                "parseInt",
                "decodeURI",
                "decodeURIComponent",
                "encodeURI",
                "encodeURIComponent",
                "escape",
                "unescape",
            ],
            [
                "arguments",
                "this",
                "super",
                "console",
                "window",
                "document",
                "localStorage",
                "module",
                "global",
            ],
            [
                "Intl",
                "DataView",
                "Number",
                "Math",
                "Date",
                "String",
                "RegExp",
                "Object",
                "Function",
                "Boolean",
                "Error",
                "Symbol",
                "Set",
                "Map",
                "WeakSet",
                "WeakMap",
                "Proxy",
                "Reflect",
                "JSON",
                "Promise",
                "Float64Array",
                "Int16Array",
                "Int32Array",
                "Int8Array",
                "Uint16Array",
                "Uint32Array",
                "Float32Array",
                "Array",
                "Uint8Array",
                "Uint8ClampedArray",
                "ArrayBuffer",
                "BigInt64Array",
                "BigUint64Array",
                "BigInt",
            ],
            [
                "EvalError",
                "InternalError",
                "RangeError",
                "ReferenceError",
                "SyntaxError",
                "TypeError",
                "URIError",
            ]
        );
    function xt(e) {
        return St("(?=", e, ")");
    }
    function St(...e) {
        return e
            .map((e) => {
                return (t = e) ? ("string" == typeof t ? t : t.source) : null;
                var t;
            })
            .join("");
    }
    var Ct = function (e) {
        const t = "[A-Za-z$_][0-9A-Za-z$_]*",
            n = "<>",
            r = "</>",
            a = {
                begin: /<[A-Za-z0-9\\._:-]+/,
                end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                isTrulyOpeningTag: (e, t) => {
                    const n = e[0].length + e.index,
                        r = e.input[n];
                    "<" !== r
                        ? ">" === r &&
                          (((e, { after: t }) => {
                              const n = "</" + e[0].slice(1);
                              return -1 !== e.input.indexOf(n, t);
                          })(e, { after: n }) ||
                              t.ignoreMatch())
                        : t.ignoreMatch();
                },
            },
            i = {
                $pattern: "[A-Za-z$_][0-9A-Za-z$_]*",
                keyword: kt,
                literal: $t,
                built_in: Et,
            },
            o = "\\.([0-9](_?[0-9])*)",
            s = {
                className: "number",
                variants: [
                    {
                        begin: `(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((${o})|\\.)?|(${o}))[eE][+-]?([0-9](_?[0-9])*)\\b`,
                    },
                    {
                        begin: `\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((${o})\\b|\\.)?|(${o})\\b`,
                    },
                    { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
                    { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
                    { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
                    { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
                    { begin: "\\b0[0-7]+n?\\b" },
                ],
                relevance: 0,
            },
            l = {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}",
                keywords: i,
                contains: [],
            },
            c = {
                begin: "html`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [e.BACKSLASH_ESCAPE, l],
                    subLanguage: "xml",
                },
            },
            u = {
                begin: "css`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [e.BACKSLASH_ESCAPE, l],
                    subLanguage: "css",
                },
            },
            d = {
                className: "string",
                begin: "`",
                end: "`",
                contains: [e.BACKSLASH_ESCAPE, l],
            },
            p = {
                className: "comment",
                variants: [
                    e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                        relevance: 0,
                        contains: [
                            {
                                className: "doctag",
                                begin: "@[A-Za-z]+",
                                contains: [
                                    {
                                        className: "type",
                                        begin: "\\{",
                                        end: "\\}",
                                        relevance: 0,
                                    },
                                    {
                                        className: "variable",
                                        begin: t + "(?=\\s*(-)|$)",
                                        endsParent: !0,
                                        relevance: 0,
                                    },
                                    { begin: /(?=[^\n])\s/, relevance: 0 },
                                ],
                            },
                        ],
                    }),
                    e.C_BLOCK_COMMENT_MODE,
                    e.C_LINE_COMMENT_MODE,
                ],
            },
            h = [
                e.APOS_STRING_MODE,
                e.QUOTE_STRING_MODE,
                c,
                u,
                d,
                s,
                e.REGEXP_MODE,
            ];
        l.contains = h.concat({
            begin: /\{/,
            end: /\}/,
            keywords: i,
            contains: ["self"].concat(h),
        });
        const g = [].concat(p, l.contains),
            f = g.concat([
                {
                    begin: /\(/,
                    end: /\)/,
                    keywords: i,
                    contains: ["self"].concat(g),
                },
            ]),
            m = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: i,
                contains: f,
            };
        return {
            name: "Javascript",
            aliases: ["js", "jsx", "mjs", "cjs"],
            keywords: i,
            exports: { PARAMS_CONTAINS: f },
            illegal: /#(?![$_A-z])/,
            contains: [
                e.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
                {
                    label: "use_strict",
                    className: "meta",
                    relevance: 10,
                    begin: /^\s*['"]use (strict|asm)['"]/,
                },
                e.APOS_STRING_MODE,
                e.QUOTE_STRING_MODE,
                c,
                u,
                d,
                p,
                s,
                {
                    begin: St(
                        /[{,\n]\s*/,
                        xt(
                            St(
                                /(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,
                                t + "\\s*:"
                            )
                        )
                    ),
                    relevance: 0,
                    contains: [
                        {
                            className: "attr",
                            begin: t + xt("\\s*:"),
                            relevance: 0,
                        },
                    ],
                },
                {
                    begin:
                        "(" +
                        e.RE_STARTERS_RE +
                        "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    contains: [
                        p,
                        e.REGEXP_MODE,
                        {
                            className: "function",
                            begin:
                                "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" +
                                e.UNDERSCORE_IDENT_RE +
                                ")\\s*=>",
                            returnBegin: !0,
                            end: "\\s*=>",
                            contains: [
                                {
                                    className: "params",
                                    variants: [
                                        {
                                            begin: e.UNDERSCORE_IDENT_RE,
                                            relevance: 0,
                                        },
                                        {
                                            className: null,
                                            begin: /\(\s*\)/,
                                            skip: !0,
                                        },
                                        {
                                            begin: /\(/,
                                            end: /\)/,
                                            excludeBegin: !0,
                                            excludeEnd: !0,
                                            keywords: i,
                                            contains: f,
                                        },
                                    ],
                                },
                            ],
                        },
                        { begin: /,/, relevance: 0 },
                        { className: "", begin: /\s/, end: /\s*/, skip: !0 },
                        {
                            variants: [
                                { begin: n, end: r },
                                {
                                    begin: a.begin,
                                    "on:begin": a.isTrulyOpeningTag,
                                    end: a.end,
                                },
                            ],
                            subLanguage: "xml",
                            contains: [
                                {
                                    begin: a.begin,
                                    end: a.end,
                                    skip: !0,
                                    contains: ["self"],
                                },
                            ],
                        },
                    ],
                    relevance: 0,
                },
                {
                    className: "function",
                    beginKeywords: "function",
                    end: /[{;]/,
                    excludeEnd: !0,
                    keywords: i,
                    contains: [
                        "self",
                        e.inherit(e.TITLE_MODE, { begin: t }),
                        m,
                    ],
                    illegal: /%/,
                },
                { beginKeywords: "while if switch catch for" },
                {
                    className: "function",
                    begin:
                        e.UNDERSCORE_IDENT_RE +
                        "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                    returnBegin: !0,
                    contains: [m, e.inherit(e.TITLE_MODE, { begin: t })],
                },
                {
                    variants: [{ begin: "\\." + t }, { begin: "\\$" + t }],
                    relevance: 0,
                },
                {
                    className: "class",
                    beginKeywords: "class",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    illegal: /[:"[\]]/,
                    contains: [
                        { beginKeywords: "extends" },
                        e.UNDERSCORE_TITLE_MODE,
                    ],
                },
                {
                    begin: /\b(?=constructor)/,
                    end: /[{;]/,
                    excludeEnd: !0,
                    contains: [
                        e.inherit(e.TITLE_MODE, { begin: t }),
                        "self",
                        m,
                    ],
                },
                {
                    begin: "(get|set)\\s+(?=" + t + "\\()",
                    end: /\{/,
                    keywords: "get set",
                    contains: [
                        e.inherit(e.TITLE_MODE, { begin: t }),
                        { begin: /\(\)/ },
                        m,
                    ],
                },
                { begin: /\$[(.]/ },
            ],
        };
    };
    function At(e) {
        return (function (...e) {
            return e
                .map((e) => {
                    return (t = e)
                        ? "string" == typeof t
                            ? t
                            : t.source
                        : null;
                    var t;
                })
                .join("");
        })("(?=", e, ")");
    }
    var Lt = function (e) {
        const t = {
                $pattern: /[A-Za-z]\w+|__\w+__/,
                keyword: [
                    "and",
                    "as",
                    "assert",
                    "async",
                    "await",
                    "break",
                    "class",
                    "continue",
                    "def",
                    "del",
                    "elif",
                    "else",
                    "except",
                    "finally",
                    "for",
                    "from",
                    "global",
                    "if",
                    "import",
                    "in",
                    "is",
                    "lambda",
                    "nonlocal|10",
                    "not",
                    "or",
                    "pass",
                    "raise",
                    "return",
                    "try",
                    "while",
                    "with",
                    "yield",
                ],
                built_in: [
                    "__import__",
                    "abs",
                    "all",
                    "any",
                    "ascii",
                    "bin",
                    "bool",
                    "breakpoint",
                    "bytearray",
                    "bytes",
                    "callable",
                    "chr",
                    "classmethod",
                    "compile",
                    "complex",
                    "delattr",
                    "dict",
                    "dir",
                    "divmod",
                    "enumerate",
                    "eval",
                    "exec",
                    "filter",
                    "float",
                    "format",
                    "frozenset",
                    "getattr",
                    "globals",
                    "hasattr",
                    "hash",
                    "help",
                    "hex",
                    "id",
                    "input",
                    "int",
                    "isinstance",
                    "issubclass",
                    "iter",
                    "len",
                    "list",
                    "locals",
                    "map",
                    "max",
                    "memoryview",
                    "min",
                    "next",
                    "object",
                    "oct",
                    "open",
                    "ord",
                    "pow",
                    "print",
                    "property",
                    "range",
                    "repr",
                    "reversed",
                    "round",
                    "set",
                    "setattr",
                    "slice",
                    "sorted",
                    "staticmethod",
                    "str",
                    "sum",
                    "super",
                    "tuple",
                    "type",
                    "vars",
                    "zip",
                ],
                literal: [
                    "__debug__",
                    "Ellipsis",
                    "False",
                    "None",
                    "NotImplemented",
                    "True",
                ],
                type: [
                    "Any",
                    "Callable",
                    "Coroutine",
                    "Dict",
                    "List",
                    "Literal",
                    "Generic",
                    "Optional",
                    "Sequence",
                    "Set",
                    "Tuple",
                    "Type",
                    "Union",
                ],
            },
            n = { className: "meta", begin: /^(>>>|\.\.\.) / },
            r = {
                className: "subst",
                begin: /\{/,
                end: /\}/,
                keywords: t,
                illegal: /#/,
            },
            a = { begin: /\{\{/, relevance: 0 },
            i = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE],
                variants: [
                    {
                        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                        end: /'''/,
                        contains: [e.BACKSLASH_ESCAPE, n],
                        relevance: 10,
                    },
                    {
                        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                        end: /"""/,
                        contains: [e.BACKSLASH_ESCAPE, n],
                        relevance: 10,
                    },
                    {
                        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                        end: /'''/,
                        contains: [e.BACKSLASH_ESCAPE, n, a, r],
                    },
                    {
                        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                        end: /"""/,
                        contains: [e.BACKSLASH_ESCAPE, n, a, r],
                    },
                    { begin: /([uU]|[rR])'/, end: /'/, relevance: 10 },
                    { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 },
                    { begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/ },
                    { begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ },
                    {
                        begin: /([fF][rR]|[rR][fF]|[fF])'/,
                        end: /'/,
                        contains: [e.BACKSLASH_ESCAPE, a, r],
                    },
                    {
                        begin: /([fF][rR]|[rR][fF]|[fF])"/,
                        end: /"/,
                        contains: [e.BACKSLASH_ESCAPE, a, r],
                    },
                    e.APOS_STRING_MODE,
                    e.QUOTE_STRING_MODE,
                ],
            },
            o = "[0-9](_?[0-9])*",
            s = `(\\b(${o}))?\\.(${o})|\\b(${o})\\.`,
            l = {
                className: "number",
                relevance: 0,
                variants: [
                    { begin: `(\\b(${o})|(${s}))[eE][+-]?(${o})[jJ]?\\b` },
                    { begin: `(${s})[jJ]?` },
                    { begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b" },
                    { begin: "\\b0[bB](_?[01])+[lL]?\\b" },
                    { begin: "\\b0[oO](_?[0-7])+[lL]?\\b" },
                    { begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b" },
                    { begin: `\\b(${o})[jJ]\\b` },
                ],
            },
            c = {
                className: "comment",
                begin: At(/# type:/),
                end: /$/,
                keywords: t,
                contains: [
                    { begin: /# type:/ },
                    { begin: /#/, end: /\b\B/, endsWithParent: !0 },
                ],
            },
            u = {
                className: "params",
                variants: [
                    { className: "", begin: /\(\s*\)/, skip: !0 },
                    {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: t,
                        contains: ["self", n, l, i, e.HASH_COMMENT_MODE],
                    },
                ],
            };
        return (
            (r.contains = [i, l, n]),
            {
                name: "Python",
                aliases: ["py", "gyp", "ipython"],
                keywords: t,
                illegal: /(<\/|->|\?)|=>/,
                contains: [
                    n,
                    l,
                    { begin: /\bself\b/ },
                    { beginKeywords: "if", relevance: 0 },
                    i,
                    c,
                    e.HASH_COMMENT_MODE,
                    {
                        variants: [
                            { className: "function", beginKeywords: "def" },
                            { className: "class", beginKeywords: "class" },
                        ],
                        end: /:/,
                        illegal: /[${=;\n,]/,
                        contains: [
                            e.UNDERSCORE_TITLE_MODE,
                            u,
                            { begin: /->/, endsWithParent: !0, keywords: t },
                        ],
                    },
                    {
                        className: "meta",
                        begin: /^[\t ]*@/,
                        end: /(?=#)|$/,
                        contains: [l, u, i],
                    },
                ],
            }
        );
    };
    function Mt(...e) {
        return e
            .map((e) => {
                return (t = e) ? ("string" == typeof t ? t : t.source) : null;
                var t;
            })
            .join("");
    }
    var Tt = function (e) {
        const t = {},
            n = {
                begin: /\$\{/,
                end: /\}/,
                contains: ["self", { begin: /:-/, contains: [t] }],
            };
        Object.assign(t, {
            className: "variable",
            variants: [
                { begin: Mt(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])") },
                n,
            ],
        });
        const r = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                contains: [e.BACKSLASH_ESCAPE],
            },
            a = {
                begin: /<<-?\s*(?=\w+)/,
                starts: {
                    contains: [
                        e.END_SAME_AS_BEGIN({
                            begin: /(\w+)/,
                            end: /(\w+)/,
                            className: "string",
                        }),
                    ],
                },
            },
            i = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [e.BACKSLASH_ESCAPE, t, r],
            };
        r.contains.push(i);
        const o = {
                begin: /\$\(\(/,
                end: /\)\)/,
                contains: [
                    { begin: /\d+#[0-9a-f]+/, className: "number" },
                    e.NUMBER_MODE,
                    t,
                ],
            },
            s = e.SHEBANG({
                binary: `(${[
                    "fish",
                    "bash",
                    "zsh",
                    "sh",
                    "csh",
                    "ksh",
                    "tcsh",
                    "dash",
                    "scsh",
                ].join("|")})`,
                relevance: 10,
            }),
            l = {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
                relevance: 0,
            };
        return {
            name: "Bash",
            aliases: ["sh", "zsh"],
            keywords: {
                $pattern: /\b[a-z._-]+\b/,
                keyword:
                    "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in:
                    "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            },
            contains: [
                s,
                e.SHEBANG(),
                l,
                o,
                e.HASH_COMMENT_MODE,
                a,
                i,
                { className: "", begin: /\\"/ },
                { className: "string", begin: /'/, end: /'/ },
                t,
            ],
        };
    };
    function jt(...e) {
        return e
            .map((e) => {
                return (t = e) ? ("string" == typeof t ? t : t.source) : null;
                var t;
            })
            .join("");
    }
    var It = function (e) {
        const t =
                "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",
            n = {
                keyword:
                    "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
                built_in: "proc lambda",
                literal: "true false nil",
            },
            r = { className: "doctag", begin: "@[A-Za-z]+" },
            a = { begin: "#<", end: ">" },
            i = [
                e.COMMENT("#", "$", { contains: [r] }),
                e.COMMENT("^=begin", "^=end", { contains: [r], relevance: 10 }),
                e.COMMENT("^__END__", "\\n$"),
            ],
            o = { className: "subst", begin: /#\{/, end: /\}/, keywords: n },
            s = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, o],
                variants: [
                    { begin: /'/, end: /'/ },
                    { begin: /"/, end: /"/ },
                    { begin: /`/, end: /`/ },
                    { begin: /%[qQwWx]?\(/, end: /\)/ },
                    { begin: /%[qQwWx]?\[/, end: /\]/ },
                    { begin: /%[qQwWx]?\{/, end: /\}/ },
                    { begin: /%[qQwWx]?</, end: />/ },
                    { begin: /%[qQwWx]?\//, end: /\// },
                    { begin: /%[qQwWx]?%/, end: /%/ },
                    { begin: /%[qQwWx]?-/, end: /-/ },
                    { begin: /%[qQwWx]?\|/, end: /\|/ },
                    { begin: /\B\?(\\\d{1,3})/ },
                    { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ },
                    { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ },
                    {
                        begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/,
                    },
                    { begin: /\B\?\\(c|C-)[\x20-\x7e]/ },
                    { begin: /\B\?\\?\S/ },
                    {
                        begin: /<<[-~]?'?(\w+)\n(?:[^\n]*\n)*?\s*\1\b/,
                        returnBegin: !0,
                        contains: [
                            { begin: /<<[-~]?'?/ },
                            e.END_SAME_AS_BEGIN({
                                begin: /(\w+)/,
                                end: /(\w+)/,
                                contains: [e.BACKSLASH_ESCAPE, o],
                            }),
                        ],
                    },
                ],
            },
            l = {
                className: "number",
                relevance: 0,
                variants: [
                    {
                        begin: "\\b([1-9](_?[0-9])*|0)(\\.([0-9](_?[0-9])*))?([eE][+-]?([0-9](_?[0-9])*)|r)?i?\\b",
                    },
                    { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
                    { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
                    { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
                    { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },
                    { begin: "\\b0(_?[0-7])+r?i?\\b" },
                ],
            },
            c = {
                className: "params",
                begin: "\\(",
                end: "\\)",
                endsParent: !0,
                keywords: n,
            },
            u = [
                s,
                {
                    className: "class",
                    beginKeywords: "class module",
                    end: "$|;",
                    illegal: /=/,
                    contains: [
                        e.inherit(e.TITLE_MODE, {
                            begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?",
                        }),
                        {
                            begin: "<\\s*",
                            contains: [
                                {
                                    begin:
                                        "(" + e.IDENT_RE + "::)?" + e.IDENT_RE,
                                    relevance: 0,
                                },
                            ],
                        },
                    ].concat(i),
                },
                {
                    className: "function",
                    begin: jt(
                        /def\s+/,
                        ((d = t + "\\s*(\\(|;|$)"), jt("(?=", d, ")"))
                    ),
                    relevance: 0,
                    keywords: "def",
                    end: "$|;",
                    contains: [e.inherit(e.TITLE_MODE, { begin: t }), c].concat(
                        i
                    ),
                },
                { begin: e.IDENT_RE + "::" },
                {
                    className: "symbol",
                    begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                    relevance: 0,
                },
                {
                    className: "symbol",
                    begin: ":(?!\\s)",
                    contains: [s, { begin: t }],
                    relevance: 0,
                },
                l,
                {
                    className: "variable",
                    begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])",
                },
                {
                    className: "params",
                    begin: /\|/,
                    end: /\|/,
                    relevance: 0,
                    keywords: n,
                },
                {
                    begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
                    keywords: "unless",
                    contains: [
                        {
                            className: "regexp",
                            contains: [e.BACKSLASH_ESCAPE, o],
                            illegal: /\n/,
                            variants: [
                                { begin: "/", end: "/[a-z]*" },
                                { begin: /%r\{/, end: /\}[a-z]*/ },
                                { begin: "%r\\(", end: "\\)[a-z]*" },
                                { begin: "%r!", end: "![a-z]*" },
                                { begin: "%r\\[", end: "\\][a-z]*" },
                            ],
                        },
                    ].concat(a, i),
                    relevance: 0,
                },
            ].concat(a, i);
        var d;
        (o.contains = u), (c.contains = u);
        const p = [
            { begin: /^\s*=>/, starts: { end: "$", contains: u } },
            {
                className: "meta",
                begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
                starts: { end: "$", contains: u },
            },
        ];
        return (
            i.unshift(a),
            {
                name: "Ruby",
                aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
                keywords: n,
                illegal: /\/\*/,
                contains: [e.SHEBANG({ binary: "ruby" })]
                    .concat(p)
                    .concat(i)
                    .concat(u),
            }
        );
    };
    var Nt = function (e) {
        const t = {
            keyword:
                "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
            literal: "true false iota nil",
            built_in:
                "append cap close complex copy imag len make new panic print println real recover delete",
        };
        return {
            name: "Go",
            aliases: ["golang"],
            keywords: t,
            illegal: "</",
            contains: [
                e.C_LINE_COMMENT_MODE,
                e.C_BLOCK_COMMENT_MODE,
                {
                    className: "string",
                    variants: [
                        e.QUOTE_STRING_MODE,
                        e.APOS_STRING_MODE,
                        { begin: "`", end: "`" },
                    ],
                },
                {
                    className: "number",
                    variants: [
                        { begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
                        e.C_NUMBER_MODE,
                    ],
                },
                { begin: /:=/ },
                {
                    className: "function",
                    beginKeywords: "func",
                    end: "\\s*(\\{|$)",
                    excludeEnd: !0,
                    contains: [
                        e.TITLE_MODE,
                        {
                            className: "params",
                            begin: /\(/,
                            end: /\)/,
                            keywords: t,
                            illegal: /["']/,
                        },
                    ],
                },
            ],
        };
    };
    var Ot = function (e) {
        const t = {
                className: "variable",
                begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*(?![A-Za-z0-9])(?![$])",
            },
            n = {
                className: "meta",
                variants: [
                    { begin: /<\?php/, relevance: 10 },
                    { begin: /<\?[=]?/ },
                    { begin: /\?>/ },
                ],
            },
            r = {
                className: "subst",
                variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }],
            },
            a = e.inherit(e.APOS_STRING_MODE, { illegal: null }),
            i = e.inherit(e.QUOTE_STRING_MODE, {
                illegal: null,
                contains: e.QUOTE_STRING_MODE.contains.concat(r),
            }),
            o = e.END_SAME_AS_BEGIN({
                begin: /<<<[ \t]*(\w+)\n/,
                end: /[ \t]*(\w+)\b/,
                contains: e.QUOTE_STRING_MODE.contains.concat(r),
            }),
            s = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, n],
                variants: [
                    e.inherit(a, { begin: "b'", end: "'" }),
                    e.inherit(i, { begin: 'b"', end: '"' }),
                    i,
                    a,
                    o,
                ],
            },
            l = {
                className: "number",
                variants: [
                    { begin: "\\b0b[01]+(?:_[01]+)*\\b" },
                    { begin: "\\b0o[0-7]+(?:_[0-7]+)*\\b" },
                    { begin: "\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b" },
                    {
                        begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?",
                    },
                ],
                relevance: 0,
            },
            c = {
                keyword:
                    "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
                literal: "false null true",
                built_in:
                    "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass",
            };
        return {
            aliases: ["php3", "php4", "php5", "php6", "php7", "php8"],
            case_insensitive: !0,
            keywords: c,
            contains: [
                e.HASH_COMMENT_MODE,
                e.COMMENT("//", "$", { contains: [n] }),
                e.COMMENT("/\\*", "\\*/", {
                    contains: [{ className: "doctag", begin: "@[A-Za-z]+" }],
                }),
                e.COMMENT("__halt_compiler.+?;", !1, {
                    endsWithParent: !0,
                    keywords: "__halt_compiler",
                }),
                n,
                { className: "keyword", begin: /\$this\b/ },
                t,
                { begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ },
                {
                    className: "function",
                    relevance: 0,
                    beginKeywords: "fn function",
                    end: /[;{]/,
                    excludeEnd: !0,
                    illegal: "[$%\\[]",
                    contains: [
                        { beginKeywords: "use" },
                        e.UNDERSCORE_TITLE_MODE,
                        { begin: "=>", endsParent: !0 },
                        {
                            className: "params",
                            begin: "\\(",
                            end: "\\)",
                            excludeBegin: !0,
                            excludeEnd: !0,
                            keywords: c,
                            contains: ["self", t, e.C_BLOCK_COMMENT_MODE, s, l],
                        },
                    ],
                },
                {
                    className: "class",
                    variants: [
                        { beginKeywords: "enum", illegal: /[($"]/ },
                        {
                            beginKeywords: "class interface trait",
                            illegal: /[:($"]/,
                        },
                    ],
                    relevance: 0,
                    end: /\{/,
                    excludeEnd: !0,
                    contains: [
                        { beginKeywords: "extends implements" },
                        e.UNDERSCORE_TITLE_MODE,
                    ],
                },
                {
                    beginKeywords: "namespace",
                    relevance: 0,
                    end: ";",
                    illegal: /[.']/,
                    contains: [e.UNDERSCORE_TITLE_MODE],
                },
                {
                    beginKeywords: "use",
                    relevance: 0,
                    end: ";",
                    contains: [e.UNDERSCORE_TITLE_MODE],
                },
                s,
                l,
            ],
        };
    };
    yt.registerLanguage("javascript", Ct),
        yt.registerLanguage("node", Ct),
        yt.registerLanguage("python", Lt),
        yt.registerLanguage("curl", Tt),
        yt.registerLanguage("ruby", It),
        yt.registerLanguage("go", Nt),
        yt.registerLanguage("php", Ot);
    var Pt =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {};
    function Rt(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var Ht,
        zt = Rt(function (e) {
            (function () {
                function t(e) {
                    var t = {
                        omitExtraWLInCodeBlocks: {
                            defaultValue: !1,
                            describe:
                                "Omit the default extra whiteline added to code blocks",
                            type: "boolean",
                        },
                        noHeaderId: {
                            defaultValue: !1,
                            describe: "Turn on/off generated header id",
                            type: "boolean",
                        },
                        prefixHeaderId: {
                            defaultValue: !1,
                            describe:
                                "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
                            type: "string",
                        },
                        rawPrefixHeaderId: {
                            defaultValue: !1,
                            describe:
                                'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
                            type: "boolean",
                        },
                        ghCompatibleHeaderId: {
                            defaultValue: !1,
                            describe:
                                "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
                            type: "boolean",
                        },
                        rawHeaderId: {
                            defaultValue: !1,
                            describe:
                                "Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",
                            type: "boolean",
                        },
                        headerLevelStart: {
                            defaultValue: !1,
                            describe: "The header blocks level start",
                            type: "integer",
                        },
                        parseImgDimensions: {
                            defaultValue: !1,
                            describe: "Turn on/off image dimension parsing",
                            type: "boolean",
                        },
                        simplifiedAutoLink: {
                            defaultValue: !1,
                            describe: "Turn on/off GFM autolink style",
                            type: "boolean",
                        },
                        excludeTrailingPunctuationFromURLs: {
                            defaultValue: !1,
                            describe:
                                "Excludes trailing punctuation from links generated with autoLinking",
                            type: "boolean",
                        },
                        literalMidWordUnderscores: {
                            defaultValue: !1,
                            describe:
                                "Parse midword underscores as literal underscores",
                            type: "boolean",
                        },
                        literalMidWordAsterisks: {
                            defaultValue: !1,
                            describe:
                                "Parse midword asterisks as literal asterisks",
                            type: "boolean",
                        },
                        strikethrough: {
                            defaultValue: !1,
                            describe: "Turn on/off strikethrough support",
                            type: "boolean",
                        },
                        tables: {
                            defaultValue: !1,
                            describe: "Turn on/off tables support",
                            type: "boolean",
                        },
                        tablesHeaderId: {
                            defaultValue: !1,
                            describe: "Add an id to table headers",
                            type: "boolean",
                        },
                        ghCodeBlocks: {
                            defaultValue: !0,
                            describe:
                                "Turn on/off GFM fenced code blocks support",
                            type: "boolean",
                        },
                        tasklists: {
                            defaultValue: !1,
                            describe: "Turn on/off GFM tasklist support",
                            type: "boolean",
                        },
                        smoothLivePreview: {
                            defaultValue: !1,
                            describe:
                                "Prevents weird effects in live previews due to incomplete input",
                            type: "boolean",
                        },
                        smartIndentationFix: {
                            defaultValue: !1,
                            description:
                                "Tries to smartly fix indentation in es6 strings",
                            type: "boolean",
                        },
                        disableForced4SpacesIndentedSublists: {
                            defaultValue: !1,
                            description:
                                "Disables the requirement of indenting nested sublists by 4 spaces",
                            type: "boolean",
                        },
                        simpleLineBreaks: {
                            defaultValue: !1,
                            description:
                                "Parses simple line breaks as <br> (GFM Style)",
                            type: "boolean",
                        },
                        requireSpaceBeforeHeadingText: {
                            defaultValue: !1,
                            description:
                                "Makes adding a space between `#` and the header text mandatory (GFM Style)",
                            type: "boolean",
                        },
                        ghMentions: {
                            defaultValue: !1,
                            description: "Enables github @mentions",
                            type: "boolean",
                        },
                        ghMentionsLink: {
                            defaultValue: "https://github.com/{u}",
                            description:
                                "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
                            type: "string",
                        },
                        encodeEmails: {
                            defaultValue: !0,
                            description:
                                "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
                            type: "boolean",
                        },
                        openLinksInNewWindow: {
                            defaultValue: !1,
                            description: "Open all links in new windows",
                            type: "boolean",
                        },
                        backslashEscapesHTMLTags: {
                            defaultValue: !1,
                            description:
                                "Support for HTML Tag escaping. ex: <div>foo</div>",
                            type: "boolean",
                        },
                        emoji: {
                            defaultValue: !1,
                            description:
                                "Enable emoji support. Ex: `this is a :smile: emoji`",
                            type: "boolean",
                        },
                        underline: {
                            defaultValue: !1,
                            description:
                                "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
                            type: "boolean",
                        },
                        completeHTMLDocument: {
                            defaultValue: !1,
                            description:
                                "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
                            type: "boolean",
                        },
                        metadata: {
                            defaultValue: !1,
                            description:
                                "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
                            type: "boolean",
                        },
                        splitAdjacentBlockquotes: {
                            defaultValue: !1,
                            description: "Split adjacent blockquote blocks",
                            type: "boolean",
                        },
                    };
                    if (!1 === e) return JSON.parse(JSON.stringify(t));
                    var n = {};
                    for (var r in t)
                        t.hasOwnProperty(r) && (n[r] = t[r].defaultValue);
                    return n;
                }
                var n = {},
                    r = {},
                    a = {},
                    i = t(!0),
                    o = "vanilla",
                    s = {
                        github: {
                            omitExtraWLInCodeBlocks: !0,
                            simplifiedAutoLink: !0,
                            excludeTrailingPunctuationFromURLs: !0,
                            literalMidWordUnderscores: !0,
                            strikethrough: !0,
                            tables: !0,
                            tablesHeaderId: !0,
                            ghCodeBlocks: !0,
                            tasklists: !0,
                            disableForced4SpacesIndentedSublists: !0,
                            simpleLineBreaks: !0,
                            requireSpaceBeforeHeadingText: !0,
                            ghCompatibleHeaderId: !0,
                            ghMentions: !0,
                            backslashEscapesHTMLTags: !0,
                            emoji: !0,
                            splitAdjacentBlockquotes: !0,
                        },
                        original: { noHeaderId: !0, ghCodeBlocks: !1 },
                        ghost: {
                            omitExtraWLInCodeBlocks: !0,
                            parseImgDimensions: !0,
                            simplifiedAutoLink: !0,
                            excludeTrailingPunctuationFromURLs: !0,
                            literalMidWordUnderscores: !0,
                            strikethrough: !0,
                            tables: !0,
                            tablesHeaderId: !0,
                            ghCodeBlocks: !0,
                            tasklists: !0,
                            smoothLivePreview: !0,
                            simpleLineBreaks: !0,
                            requireSpaceBeforeHeadingText: !0,
                            ghMentions: !1,
                            encodeEmails: !0,
                        },
                        vanilla: t(!0),
                        allOn: (function () {
                            var e = t(!0),
                                n = {};
                            for (var r in e) e.hasOwnProperty(r) && (n[r] = !0);
                            return n;
                        })(),
                    };
                function l(e, t) {
                    var r = t
                            ? "Error in " + t + " extension->"
                            : "Error in unnamed extension",
                        a = { valid: !0, error: "" };
                    n.helper.isArray(e) || (e = [e]);
                    for (var i = 0; i < e.length; ++i) {
                        var o = r + " sub-extension " + i + ": ",
                            s = e[i];
                        if ("object" != typeof s)
                            return (
                                (a.valid = !1),
                                (a.error =
                                    o +
                                    "must be an object, but " +
                                    typeof s +
                                    " given"),
                                a
                            );
                        if (!n.helper.isString(s.type))
                            return (
                                (a.valid = !1),
                                (a.error =
                                    o +
                                    'property "type" must be a string, but ' +
                                    typeof s.type +
                                    " given"),
                                a
                            );
                        var l = (s.type = s.type.toLowerCase());
                        if (
                            ("language" === l && (l = s.type = "lang"),
                            "html" === l && (l = s.type = "output"),
                            "lang" !== l && "output" !== l && "listener" !== l)
                        )
                            return (
                                (a.valid = !1),
                                (a.error =
                                    o +
                                    "type " +
                                    l +
                                    ' is not recognized. Valid values: "lang/language", "output/html" or "listener"'),
                                a
                            );
                        if ("listener" === l) {
                            if (n.helper.isUndefined(s.listeners))
                                return (
                                    (a.valid = !1),
                                    (a.error =
                                        o +
                                        '. Extensions of type "listener" must have a property called "listeners"'),
                                    a
                                );
                        } else if (
                            n.helper.isUndefined(s.filter) &&
                            n.helper.isUndefined(s.regex)
                        )
                            return (
                                (a.valid = !1),
                                (a.error =
                                    o +
                                    l +
                                    ' extensions must define either a "regex" property or a "filter" method'),
                                a
                            );
                        if (s.listeners) {
                            if ("object" != typeof s.listeners)
                                return (
                                    (a.valid = !1),
                                    (a.error =
                                        o +
                                        '"listeners" property must be an object but ' +
                                        typeof s.listeners +
                                        " given"),
                                    a
                                );
                            for (var c in s.listeners)
                                if (
                                    s.listeners.hasOwnProperty(c) &&
                                    "function" != typeof s.listeners[c]
                                )
                                    return (
                                        (a.valid = !1),
                                        (a.error =
                                            o +
                                            '"listeners" property must be an hash of [event name]: [callback]. listeners.' +
                                            c +
                                            " must be a function but " +
                                            typeof s.listeners[c] +
                                            " given"),
                                        a
                                    );
                        }
                        if (s.filter) {
                            if ("function" != typeof s.filter)
                                return (
                                    (a.valid = !1),
                                    (a.error =
                                        o +
                                        '"filter" must be a function, but ' +
                                        typeof s.filter +
                                        " given"),
                                    a
                                );
                        } else if (s.regex) {
                            if (
                                (n.helper.isString(s.regex) &&
                                    (s.regex = new RegExp(s.regex, "g")),
                                !(s.regex instanceof RegExp))
                            )
                                return (
                                    (a.valid = !1),
                                    (a.error =
                                        o +
                                        '"regex" property must either be a string or a RegExp object, but ' +
                                        typeof s.regex +
                                        " given"),
                                    a
                                );
                            if (n.helper.isUndefined(s.replace))
                                return (
                                    (a.valid = !1),
                                    (a.error =
                                        o +
                                        '"regex" extensions must implement a replace string or function'),
                                    a
                                );
                        }
                    }
                    return a;
                }
                function c(e, t) {
                    return "¨E" + t.charCodeAt(0) + "E";
                }
                (n.helper = {}),
                    (n.extensions = {}),
                    (n.setOption = function (e, t) {
                        return (i[e] = t), this;
                    }),
                    (n.getOption = function (e) {
                        return i[e];
                    }),
                    (n.getOptions = function () {
                        return i;
                    }),
                    (n.resetOptions = function () {
                        i = t(!0);
                    }),
                    (n.setFlavor = function (e) {
                        if (!s.hasOwnProperty(e))
                            throw Error(e + " flavor was not found");
                        n.resetOptions();
                        var t = s[e];
                        for (var r in ((o = e), t))
                            t.hasOwnProperty(r) && (i[r] = t[r]);
                    }),
                    (n.getFlavor = function () {
                        return o;
                    }),
                    (n.getFlavorOptions = function (e) {
                        if (s.hasOwnProperty(e)) return s[e];
                    }),
                    (n.getDefaultOptions = function (e) {
                        return t(e);
                    }),
                    (n.subParser = function (e, t) {
                        if (n.helper.isString(e)) {
                            if (void 0 === t) {
                                if (r.hasOwnProperty(e)) return r[e];
                                throw Error(
                                    "SubParser named " + e + " not registered!"
                                );
                            }
                            r[e] = t;
                        }
                    }),
                    (n.extension = function (e, t) {
                        if (!n.helper.isString(e))
                            throw Error("Extension 'name' must be a string");
                        if (
                            ((e = n.helper.stdExtName(e)),
                            n.helper.isUndefined(t))
                        ) {
                            if (!a.hasOwnProperty(e))
                                throw Error(
                                    "Extension named " +
                                        e +
                                        " is not registered!"
                                );
                            return a[e];
                        }
                        "function" == typeof t && (t = t()),
                            n.helper.isArray(t) || (t = [t]);
                        var r = l(t, e);
                        if (!r.valid) throw Error(r.error);
                        a[e] = t;
                    }),
                    (n.getAllExtensions = function () {
                        return a;
                    }),
                    (n.removeExtension = function (e) {
                        delete a[e];
                    }),
                    (n.resetExtensions = function () {
                        a = {};
                    }),
                    (n.validateExtension = function (e) {
                        var t = l(e, null);
                        return !!t.valid || (console.warn(t.error), !1);
                    }),
                    n.hasOwnProperty("helper") || (n.helper = {}),
                    (n.helper.isString = function (e) {
                        return "string" == typeof e || e instanceof String;
                    }),
                    (n.helper.isFunction = function (e) {
                        return e && "[object Function]" === {}.toString.call(e);
                    }),
                    (n.helper.isArray = function (e) {
                        return Array.isArray(e);
                    }),
                    (n.helper.isUndefined = function (e) {
                        return void 0 === e;
                    }),
                    (n.helper.forEach = function (e, t) {
                        if (n.helper.isUndefined(e))
                            throw new Error("obj param is required");
                        if (n.helper.isUndefined(t))
                            throw new Error("callback param is required");
                        if (!n.helper.isFunction(t))
                            throw new Error(
                                "callback param must be a function/closure"
                            );
                        if ("function" == typeof e.forEach) e.forEach(t);
                        else if (n.helper.isArray(e))
                            for (var r = 0; r < e.length; r++) t(e[r], r, e);
                        else {
                            if ("object" != typeof e)
                                throw new Error(
                                    "obj does not seem to be an array or an iterable object"
                                );
                            for (var a in e)
                                e.hasOwnProperty(a) && t(e[a], a, e);
                        }
                    }),
                    (n.helper.stdExtName = function (e) {
                        return e
                            .replace(/[_?*+\/\\.^-]/g, "")
                            .replace(/\s/g, "")
                            .toLowerCase();
                    }),
                    (n.helper.escapeCharactersCallback = c),
                    (n.helper.escapeCharacters = function (e, t, n) {
                        var r = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
                        n && (r = "\\\\" + r);
                        var a = new RegExp(r, "g");
                        return (e = e.replace(a, c));
                    }),
                    (n.helper.unescapeHTMLEntities = function (e) {
                        return e
                            .replace(/&quot;/g, '"')
                            .replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                            .replace(/&amp;/g, "&");
                    });
                var u = function (e, t, n, r) {
                    var a,
                        i,
                        o,
                        s,
                        l,
                        c = r || "",
                        u = c.indexOf("g") > -1,
                        d = new RegExp(t + "|" + n, "g" + c.replace(/g/g, "")),
                        p = new RegExp(t, c.replace(/g/g, "")),
                        h = [];
                    do {
                        for (a = 0; (o = d.exec(e)); )
                            if (p.test(o[0]))
                                a++ || (s = (i = d.lastIndex) - o[0].length);
                            else if (a && !--a) {
                                l = o.index + o[0].length;
                                var g = {
                                    left: { start: s, end: i },
                                    match: { start: i, end: o.index },
                                    right: { start: o.index, end: l },
                                    wholeMatch: { start: s, end: l },
                                };
                                if ((h.push(g), !u)) return h;
                            }
                    } while (a && (d.lastIndex = i));
                    return h;
                };
                (n.helper.matchRecursiveRegExp = function (e, t, n, r) {
                    for (
                        var a = u(e, t, n, r), i = [], o = 0;
                        o < a.length;
                        ++o
                    )
                        i.push([
                            e.slice(a[o].wholeMatch.start, a[o].wholeMatch.end),
                            e.slice(a[o].match.start, a[o].match.end),
                            e.slice(a[o].left.start, a[o].left.end),
                            e.slice(a[o].right.start, a[o].right.end),
                        ]);
                    return i;
                }),
                    (n.helper.replaceRecursiveRegExp = function (
                        e,
                        t,
                        r,
                        a,
                        i
                    ) {
                        if (!n.helper.isFunction(t)) {
                            var o = t;
                            t = function () {
                                return o;
                            };
                        }
                        var s = u(e, r, a, i),
                            l = e,
                            c = s.length;
                        if (c > 0) {
                            var d = [];
                            0 !== s[0].wholeMatch.start &&
                                d.push(e.slice(0, s[0].wholeMatch.start));
                            for (var p = 0; p < c; ++p)
                                d.push(
                                    t(
                                        e.slice(
                                            s[p].wholeMatch.start,
                                            s[p].wholeMatch.end
                                        ),
                                        e.slice(
                                            s[p].match.start,
                                            s[p].match.end
                                        ),
                                        e.slice(s[p].left.start, s[p].left.end),
                                        e.slice(
                                            s[p].right.start,
                                            s[p].right.end
                                        )
                                    )
                                ),
                                    p < c - 1 &&
                                        d.push(
                                            e.slice(
                                                s[p].wholeMatch.end,
                                                s[p + 1].wholeMatch.start
                                            )
                                        );
                            s[c - 1].wholeMatch.end < e.length &&
                                d.push(e.slice(s[c - 1].wholeMatch.end)),
                                (l = d.join(""));
                        }
                        return l;
                    }),
                    (n.helper.regexIndexOf = function (e, t, r) {
                        if (!n.helper.isString(e))
                            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
                        if (t instanceof RegExp == !1)
                            throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
                        var a = e.substring(r || 0).search(t);
                        return a >= 0 ? a + (r || 0) : a;
                    }),
                    (n.helper.splitAtIndex = function (e, t) {
                        if (!n.helper.isString(e))
                            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
                        return [e.substring(0, t), e.substring(t)];
                    }),
                    (n.helper.encodeEmailAddress = function (e) {
                        var t = [
                            function (e) {
                                return "&#" + e.charCodeAt(0) + ";";
                            },
                            function (e) {
                                return (
                                    "&#x" + e.charCodeAt(0).toString(16) + ";"
                                );
                            },
                            function (e) {
                                return e;
                            },
                        ];
                        return (e = e.replace(/./g, function (e) {
                            if ("@" === e)
                                e = t[Math.floor(2 * Math.random())](e);
                            else {
                                var n = Math.random();
                                e =
                                    n > 0.9
                                        ? t[2](e)
                                        : n > 0.45
                                        ? t[1](e)
                                        : t[0](e);
                            }
                            return e;
                        }));
                    }),
                    (n.helper.padEnd = function (e, t, n) {
                        return (
                            (t >>= 0),
                            (n = String(n || " ")),
                            e.length > t
                                ? String(e)
                                : ((t -= e.length) > n.length &&
                                      (n += n.repeat(t / n.length)),
                                  String(e) + n.slice(0, t))
                        );
                    }),
                    "undefined" == typeof console &&
                        (console = {
                            warn: function (e) {
                                alert(e);
                            },
                            log: function (e) {
                                alert(e);
                            },
                            error: function (e) {
                                throw e;
                            },
                        }),
                    (n.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }),
                    (n.helper.emojis = {
                        "+1": "👍",
                        "-1": "👎",
                        100: "💯",
                        1234: "🔢",
                        "1st_place_medal": "🥇",
                        "2nd_place_medal": "🥈",
                        "3rd_place_medal": "🥉",
                        "8ball": "🎱",
                        a: "🅰️",
                        ab: "🆎",
                        abc: "🔤",
                        abcd: "🔡",
                        accept: "🉑",
                        aerial_tramway: "🚡",
                        airplane: "✈️",
                        alarm_clock: "⏰",
                        alembic: "⚗️",
                        alien: "👽",
                        ambulance: "🚑",
                        amphora: "🏺",
                        anchor: "⚓️",
                        angel: "👼",
                        anger: "💢",
                        angry: "😠",
                        anguished: "😧",
                        ant: "🐜",
                        apple: "🍎",
                        aquarius: "♒️",
                        aries: "♈️",
                        arrow_backward: "◀️",
                        arrow_double_down: "⏬",
                        arrow_double_up: "⏫",
                        arrow_down: "⬇️",
                        arrow_down_small: "🔽",
                        arrow_forward: "▶️",
                        arrow_heading_down: "⤵️",
                        arrow_heading_up: "⤴️",
                        arrow_left: "⬅️",
                        arrow_lower_left: "↙️",
                        arrow_lower_right: "↘️",
                        arrow_right: "➡️",
                        arrow_right_hook: "↪️",
                        arrow_up: "⬆️",
                        arrow_up_down: "↕️",
                        arrow_up_small: "🔼",
                        arrow_upper_left: "↖️",
                        arrow_upper_right: "↗️",
                        arrows_clockwise: "🔃",
                        arrows_counterclockwise: "🔄",
                        art: "🎨",
                        articulated_lorry: "🚛",
                        artificial_satellite: "🛰",
                        astonished: "😲",
                        athletic_shoe: "👟",
                        atm: "🏧",
                        atom_symbol: "⚛️",
                        avocado: "🥑",
                        b: "🅱️",
                        baby: "👶",
                        baby_bottle: "🍼",
                        baby_chick: "🐤",
                        baby_symbol: "🚼",
                        back: "🔙",
                        bacon: "🥓",
                        badminton: "🏸",
                        baggage_claim: "🛄",
                        baguette_bread: "🥖",
                        balance_scale: "⚖️",
                        balloon: "🎈",
                        ballot_box: "🗳",
                        ballot_box_with_check: "☑️",
                        bamboo: "🎍",
                        banana: "🍌",
                        bangbang: "‼️",
                        bank: "🏦",
                        bar_chart: "📊",
                        barber: "💈",
                        baseball: "⚾️",
                        basketball: "🏀",
                        basketball_man: "⛹️",
                        basketball_woman: "⛹️&zwj;♀️",
                        bat: "🦇",
                        bath: "🛀",
                        bathtub: "🛁",
                        battery: "🔋",
                        beach_umbrella: "🏖",
                        bear: "🐻",
                        bed: "🛏",
                        bee: "🐝",
                        beer: "🍺",
                        beers: "🍻",
                        beetle: "🐞",
                        beginner: "🔰",
                        bell: "🔔",
                        bellhop_bell: "🛎",
                        bento: "🍱",
                        biking_man: "🚴",
                        bike: "🚲",
                        biking_woman: "🚴&zwj;♀️",
                        bikini: "👙",
                        biohazard: "☣️",
                        bird: "🐦",
                        birthday: "🎂",
                        black_circle: "⚫️",
                        black_flag: "🏴",
                        black_heart: "🖤",
                        black_joker: "🃏",
                        black_large_square: "⬛️",
                        black_medium_small_square: "◾️",
                        black_medium_square: "◼️",
                        black_nib: "✒️",
                        black_small_square: "▪️",
                        black_square_button: "🔲",
                        blonde_man: "👱",
                        blonde_woman: "👱&zwj;♀️",
                        blossom: "🌼",
                        blowfish: "🐡",
                        blue_book: "📘",
                        blue_car: "🚙",
                        blue_heart: "💙",
                        blush: "😊",
                        boar: "🐗",
                        boat: "⛵️",
                        bomb: "💣",
                        book: "📖",
                        bookmark: "🔖",
                        bookmark_tabs: "📑",
                        books: "📚",
                        boom: "💥",
                        boot: "👢",
                        bouquet: "💐",
                        bowing_man: "🙇",
                        bow_and_arrow: "🏹",
                        bowing_woman: "🙇&zwj;♀️",
                        bowling: "🎳",
                        boxing_glove: "🥊",
                        boy: "👦",
                        bread: "🍞",
                        bride_with_veil: "👰",
                        bridge_at_night: "🌉",
                        briefcase: "💼",
                        broken_heart: "💔",
                        bug: "🐛",
                        building_construction: "🏗",
                        bulb: "💡",
                        bullettrain_front: "🚅",
                        bullettrain_side: "🚄",
                        burrito: "🌯",
                        bus: "🚌",
                        business_suit_levitating: "🕴",
                        busstop: "🚏",
                        bust_in_silhouette: "👤",
                        busts_in_silhouette: "👥",
                        butterfly: "🦋",
                        cactus: "🌵",
                        cake: "🍰",
                        calendar: "📆",
                        call_me_hand: "🤙",
                        calling: "📲",
                        camel: "🐫",
                        camera: "📷",
                        camera_flash: "📸",
                        camping: "🏕",
                        cancer: "♋️",
                        candle: "🕯",
                        candy: "🍬",
                        canoe: "🛶",
                        capital_abcd: "🔠",
                        capricorn: "♑️",
                        car: "🚗",
                        card_file_box: "🗃",
                        card_index: "📇",
                        card_index_dividers: "🗂",
                        carousel_horse: "🎠",
                        carrot: "🥕",
                        cat: "🐱",
                        cat2: "🐈",
                        cd: "💿",
                        chains: "⛓",
                        champagne: "🍾",
                        chart: "💹",
                        chart_with_downwards_trend: "📉",
                        chart_with_upwards_trend: "📈",
                        checkered_flag: "🏁",
                        cheese: "🧀",
                        cherries: "🍒",
                        cherry_blossom: "🌸",
                        chestnut: "🌰",
                        chicken: "🐔",
                        children_crossing: "🚸",
                        chipmunk: "🐿",
                        chocolate_bar: "🍫",
                        christmas_tree: "🎄",
                        church: "⛪️",
                        cinema: "🎦",
                        circus_tent: "🎪",
                        city_sunrise: "🌇",
                        city_sunset: "🌆",
                        cityscape: "🏙",
                        cl: "🆑",
                        clamp: "🗜",
                        clap: "👏",
                        clapper: "🎬",
                        classical_building: "🏛",
                        clinking_glasses: "🥂",
                        clipboard: "📋",
                        clock1: "🕐",
                        clock10: "🕙",
                        clock1030: "🕥",
                        clock11: "🕚",
                        clock1130: "🕦",
                        clock12: "🕛",
                        clock1230: "🕧",
                        clock130: "🕜",
                        clock2: "🕑",
                        clock230: "🕝",
                        clock3: "🕒",
                        clock330: "🕞",
                        clock4: "🕓",
                        clock430: "🕟",
                        clock5: "🕔",
                        clock530: "🕠",
                        clock6: "🕕",
                        clock630: "🕡",
                        clock7: "🕖",
                        clock730: "🕢",
                        clock8: "🕗",
                        clock830: "🕣",
                        clock9: "🕘",
                        clock930: "🕤",
                        closed_book: "📕",
                        closed_lock_with_key: "🔐",
                        closed_umbrella: "🌂",
                        cloud: "☁️",
                        cloud_with_lightning: "🌩",
                        cloud_with_lightning_and_rain: "⛈",
                        cloud_with_rain: "🌧",
                        cloud_with_snow: "🌨",
                        clown_face: "🤡",
                        clubs: "♣️",
                        cocktail: "🍸",
                        coffee: "☕️",
                        coffin: "⚰️",
                        cold_sweat: "😰",
                        comet: "☄️",
                        computer: "💻",
                        computer_mouse: "🖱",
                        confetti_ball: "🎊",
                        confounded: "😖",
                        confused: "😕",
                        congratulations: "㊗️",
                        construction: "🚧",
                        construction_worker_man: "👷",
                        construction_worker_woman: "👷&zwj;♀️",
                        control_knobs: "🎛",
                        convenience_store: "🏪",
                        cookie: "🍪",
                        cool: "🆒",
                        policeman: "👮",
                        copyright: "©️",
                        corn: "🌽",
                        couch_and_lamp: "🛋",
                        couple: "👫",
                        couple_with_heart_woman_man: "💑",
                        couple_with_heart_man_man: "👨&zwj;❤️&zwj;👨",
                        couple_with_heart_woman_woman: "👩&zwj;❤️&zwj;👩",
                        couplekiss_man_man: "👨&zwj;❤️&zwj;💋&zwj;👨",
                        couplekiss_man_woman: "💏",
                        couplekiss_woman_woman: "👩&zwj;❤️&zwj;💋&zwj;👩",
                        cow: "🐮",
                        cow2: "🐄",
                        cowboy_hat_face: "🤠",
                        crab: "🦀",
                        crayon: "🖍",
                        credit_card: "💳",
                        crescent_moon: "🌙",
                        cricket: "🏏",
                        crocodile: "🐊",
                        croissant: "🥐",
                        crossed_fingers: "🤞",
                        crossed_flags: "🎌",
                        crossed_swords: "⚔️",
                        crown: "👑",
                        cry: "😢",
                        crying_cat_face: "😿",
                        crystal_ball: "🔮",
                        cucumber: "🥒",
                        cupid: "💘",
                        curly_loop: "➰",
                        currency_exchange: "💱",
                        curry: "🍛",
                        custard: "🍮",
                        customs: "🛃",
                        cyclone: "🌀",
                        dagger: "🗡",
                        dancer: "💃",
                        dancing_women: "👯",
                        dancing_men: "👯&zwj;♂️",
                        dango: "🍡",
                        dark_sunglasses: "🕶",
                        dart: "🎯",
                        dash: "💨",
                        date: "📅",
                        deciduous_tree: "🌳",
                        deer: "🦌",
                        department_store: "🏬",
                        derelict_house: "🏚",
                        desert: "🏜",
                        desert_island: "🏝",
                        desktop_computer: "🖥",
                        male_detective: "🕵️",
                        diamond_shape_with_a_dot_inside: "💠",
                        diamonds: "♦️",
                        disappointed: "😞",
                        disappointed_relieved: "😥",
                        dizzy: "💫",
                        dizzy_face: "😵",
                        do_not_litter: "🚯",
                        dog: "🐶",
                        dog2: "🐕",
                        dollar: "💵",
                        dolls: "🎎",
                        dolphin: "🐬",
                        door: "🚪",
                        doughnut: "🍩",
                        dove: "🕊",
                        dragon: "🐉",
                        dragon_face: "🐲",
                        dress: "👗",
                        dromedary_camel: "🐪",
                        drooling_face: "🤤",
                        droplet: "💧",
                        drum: "🥁",
                        duck: "🦆",
                        dvd: "📀",
                        "e-mail": "📧",
                        eagle: "🦅",
                        ear: "👂",
                        ear_of_rice: "🌾",
                        earth_africa: "🌍",
                        earth_americas: "🌎",
                        earth_asia: "🌏",
                        egg: "🥚",
                        eggplant: "🍆",
                        eight_pointed_black_star: "✴️",
                        eight_spoked_asterisk: "✳️",
                        electric_plug: "🔌",
                        elephant: "🐘",
                        email: "✉️",
                        end: "🔚",
                        envelope_with_arrow: "📩",
                        euro: "💶",
                        european_castle: "🏰",
                        european_post_office: "🏤",
                        evergreen_tree: "🌲",
                        exclamation: "❗️",
                        expressionless: "😑",
                        eye: "👁",
                        eye_speech_bubble: "👁&zwj;🗨",
                        eyeglasses: "👓",
                        eyes: "👀",
                        face_with_head_bandage: "🤕",
                        face_with_thermometer: "🤒",
                        fist_oncoming: "👊",
                        factory: "🏭",
                        fallen_leaf: "🍂",
                        family_man_woman_boy: "👪",
                        family_man_boy: "👨&zwj;👦",
                        family_man_boy_boy: "👨&zwj;👦&zwj;👦",
                        family_man_girl: "👨&zwj;👧",
                        family_man_girl_boy: "👨&zwj;👧&zwj;👦",
                        family_man_girl_girl: "👨&zwj;👧&zwj;👧",
                        family_man_man_boy: "👨&zwj;👨&zwj;👦",
                        family_man_man_boy_boy: "👨&zwj;👨&zwj;👦&zwj;👦",
                        family_man_man_girl: "👨&zwj;👨&zwj;👧",
                        family_man_man_girl_boy: "👨&zwj;👨&zwj;👧&zwj;👦",
                        family_man_man_girl_girl: "👨&zwj;👨&zwj;👧&zwj;👧",
                        family_man_woman_boy_boy: "👨&zwj;👩&zwj;👦&zwj;👦",
                        family_man_woman_girl: "👨&zwj;👩&zwj;👧",
                        family_man_woman_girl_boy: "👨&zwj;👩&zwj;👧&zwj;👦",
                        family_man_woman_girl_girl: "👨&zwj;👩&zwj;👧&zwj;👧",
                        family_woman_boy: "👩&zwj;👦",
                        family_woman_boy_boy: "👩&zwj;👦&zwj;👦",
                        family_woman_girl: "👩&zwj;👧",
                        family_woman_girl_boy: "👩&zwj;👧&zwj;👦",
                        family_woman_girl_girl: "👩&zwj;👧&zwj;👧",
                        family_woman_woman_boy: "👩&zwj;👩&zwj;👦",
                        family_woman_woman_boy_boy: "👩&zwj;👩&zwj;👦&zwj;👦",
                        family_woman_woman_girl: "👩&zwj;👩&zwj;👧",
                        family_woman_woman_girl_boy: "👩&zwj;👩&zwj;👧&zwj;👦",
                        family_woman_woman_girl_girl: "👩&zwj;👩&zwj;👧&zwj;👧",
                        fast_forward: "⏩",
                        fax: "📠",
                        fearful: "😨",
                        feet: "🐾",
                        female_detective: "🕵️&zwj;♀️",
                        ferris_wheel: "🎡",
                        ferry: "⛴",
                        field_hockey: "🏑",
                        file_cabinet: "🗄",
                        file_folder: "📁",
                        film_projector: "📽",
                        film_strip: "🎞",
                        fire: "🔥",
                        fire_engine: "🚒",
                        fireworks: "🎆",
                        first_quarter_moon: "🌓",
                        first_quarter_moon_with_face: "🌛",
                        fish: "🐟",
                        fish_cake: "🍥",
                        fishing_pole_and_fish: "🎣",
                        fist_raised: "✊",
                        fist_left: "🤛",
                        fist_right: "🤜",
                        flags: "🎏",
                        flashlight: "🔦",
                        fleur_de_lis: "⚜️",
                        flight_arrival: "🛬",
                        flight_departure: "🛫",
                        floppy_disk: "💾",
                        flower_playing_cards: "🎴",
                        flushed: "😳",
                        fog: "🌫",
                        foggy: "🌁",
                        football: "🏈",
                        footprints: "👣",
                        fork_and_knife: "🍴",
                        fountain: "⛲️",
                        fountain_pen: "🖋",
                        four_leaf_clover: "🍀",
                        fox_face: "🦊",
                        framed_picture: "🖼",
                        free: "🆓",
                        fried_egg: "🍳",
                        fried_shrimp: "🍤",
                        fries: "🍟",
                        frog: "🐸",
                        frowning: "😦",
                        frowning_face: "☹️",
                        frowning_man: "🙍&zwj;♂️",
                        frowning_woman: "🙍",
                        middle_finger: "🖕",
                        fuelpump: "⛽️",
                        full_moon: "🌕",
                        full_moon_with_face: "🌝",
                        funeral_urn: "⚱️",
                        game_die: "🎲",
                        gear: "⚙️",
                        gem: "💎",
                        gemini: "♊️",
                        ghost: "👻",
                        gift: "🎁",
                        gift_heart: "💝",
                        girl: "👧",
                        globe_with_meridians: "🌐",
                        goal_net: "🥅",
                        goat: "🐐",
                        golf: "⛳️",
                        golfing_man: "🏌️",
                        golfing_woman: "🏌️&zwj;♀️",
                        gorilla: "🦍",
                        grapes: "🍇",
                        green_apple: "🍏",
                        green_book: "📗",
                        green_heart: "💚",
                        green_salad: "🥗",
                        grey_exclamation: "❕",
                        grey_question: "❔",
                        grimacing: "😬",
                        grin: "😁",
                        grinning: "😀",
                        guardsman: "💂",
                        guardswoman: "💂&zwj;♀️",
                        guitar: "🎸",
                        gun: "🔫",
                        haircut_woman: "💇",
                        haircut_man: "💇&zwj;♂️",
                        hamburger: "🍔",
                        hammer: "🔨",
                        hammer_and_pick: "⚒",
                        hammer_and_wrench: "🛠",
                        hamster: "🐹",
                        hand: "✋",
                        handbag: "👜",
                        handshake: "🤝",
                        hankey: "💩",
                        hatched_chick: "🐥",
                        hatching_chick: "🐣",
                        headphones: "🎧",
                        hear_no_evil: "🙉",
                        heart: "❤️",
                        heart_decoration: "💟",
                        heart_eyes: "😍",
                        heart_eyes_cat: "😻",
                        heartbeat: "💓",
                        heartpulse: "💗",
                        hearts: "♥️",
                        heavy_check_mark: "✔️",
                        heavy_division_sign: "➗",
                        heavy_dollar_sign: "💲",
                        heavy_heart_exclamation: "❣️",
                        heavy_minus_sign: "➖",
                        heavy_multiplication_x: "✖️",
                        heavy_plus_sign: "➕",
                        helicopter: "🚁",
                        herb: "🌿",
                        hibiscus: "🌺",
                        high_brightness: "🔆",
                        high_heel: "👠",
                        hocho: "🔪",
                        hole: "🕳",
                        honey_pot: "🍯",
                        horse: "🐴",
                        horse_racing: "🏇",
                        hospital: "🏥",
                        hot_pepper: "🌶",
                        hotdog: "🌭",
                        hotel: "🏨",
                        hotsprings: "♨️",
                        hourglass: "⌛️",
                        hourglass_flowing_sand: "⏳",
                        house: "🏠",
                        house_with_garden: "🏡",
                        houses: "🏘",
                        hugs: "🤗",
                        hushed: "😯",
                        ice_cream: "🍨",
                        ice_hockey: "🏒",
                        ice_skate: "⛸",
                        icecream: "🍦",
                        id: "🆔",
                        ideograph_advantage: "🉐",
                        imp: "👿",
                        inbox_tray: "📥",
                        incoming_envelope: "📨",
                        tipping_hand_woman: "💁",
                        information_source: "ℹ️",
                        innocent: "😇",
                        interrobang: "⁉️",
                        iphone: "📱",
                        izakaya_lantern: "🏮",
                        jack_o_lantern: "🎃",
                        japan: "🗾",
                        japanese_castle: "🏯",
                        japanese_goblin: "👺",
                        japanese_ogre: "👹",
                        jeans: "👖",
                        joy: "😂",
                        joy_cat: "😹",
                        joystick: "🕹",
                        kaaba: "🕋",
                        key: "🔑",
                        keyboard: "⌨️",
                        keycap_ten: "🔟",
                        kick_scooter: "🛴",
                        kimono: "👘",
                        kiss: "💋",
                        kissing: "😗",
                        kissing_cat: "😽",
                        kissing_closed_eyes: "😚",
                        kissing_heart: "😘",
                        kissing_smiling_eyes: "😙",
                        kiwi_fruit: "🥝",
                        koala: "🐨",
                        koko: "🈁",
                        label: "🏷",
                        large_blue_circle: "🔵",
                        large_blue_diamond: "🔷",
                        large_orange_diamond: "🔶",
                        last_quarter_moon: "🌗",
                        last_quarter_moon_with_face: "🌜",
                        latin_cross: "✝️",
                        laughing: "😆",
                        leaves: "🍃",
                        ledger: "📒",
                        left_luggage: "🛅",
                        left_right_arrow: "↔️",
                        leftwards_arrow_with_hook: "↩️",
                        lemon: "🍋",
                        leo: "♌️",
                        leopard: "🐆",
                        level_slider: "🎚",
                        libra: "♎️",
                        light_rail: "🚈",
                        link: "🔗",
                        lion: "🦁",
                        lips: "👄",
                        lipstick: "💄",
                        lizard: "🦎",
                        lock: "🔒",
                        lock_with_ink_pen: "🔏",
                        lollipop: "🍭",
                        loop: "➿",
                        loud_sound: "🔊",
                        loudspeaker: "📢",
                        love_hotel: "🏩",
                        love_letter: "💌",
                        low_brightness: "🔅",
                        lying_face: "🤥",
                        m: "Ⓜ️",
                        mag: "🔍",
                        mag_right: "🔎",
                        mahjong: "🀄️",
                        mailbox: "📫",
                        mailbox_closed: "📪",
                        mailbox_with_mail: "📬",
                        mailbox_with_no_mail: "📭",
                        man: "👨",
                        man_artist: "👨&zwj;🎨",
                        man_astronaut: "👨&zwj;🚀",
                        man_cartwheeling: "🤸&zwj;♂️",
                        man_cook: "👨&zwj;🍳",
                        man_dancing: "🕺",
                        man_facepalming: "🤦&zwj;♂️",
                        man_factory_worker: "👨&zwj;🏭",
                        man_farmer: "👨&zwj;🌾",
                        man_firefighter: "👨&zwj;🚒",
                        man_health_worker: "👨&zwj;⚕️",
                        man_in_tuxedo: "🤵",
                        man_judge: "👨&zwj;⚖️",
                        man_juggling: "🤹&zwj;♂️",
                        man_mechanic: "👨&zwj;🔧",
                        man_office_worker: "👨&zwj;💼",
                        man_pilot: "👨&zwj;✈️",
                        man_playing_handball: "🤾&zwj;♂️",
                        man_playing_water_polo: "🤽&zwj;♂️",
                        man_scientist: "👨&zwj;🔬",
                        man_shrugging: "🤷&zwj;♂️",
                        man_singer: "👨&zwj;🎤",
                        man_student: "👨&zwj;🎓",
                        man_teacher: "👨&zwj;🏫",
                        man_technologist: "👨&zwj;💻",
                        man_with_gua_pi_mao: "👲",
                        man_with_turban: "👳",
                        tangerine: "🍊",
                        mans_shoe: "👞",
                        mantelpiece_clock: "🕰",
                        maple_leaf: "🍁",
                        martial_arts_uniform: "🥋",
                        mask: "😷",
                        massage_woman: "💆",
                        massage_man: "💆&zwj;♂️",
                        meat_on_bone: "🍖",
                        medal_military: "🎖",
                        medal_sports: "🏅",
                        mega: "📣",
                        melon: "🍈",
                        memo: "📝",
                        men_wrestling: "🤼&zwj;♂️",
                        menorah: "🕎",
                        mens: "🚹",
                        metal: "🤘",
                        metro: "🚇",
                        microphone: "🎤",
                        microscope: "🔬",
                        milk_glass: "🥛",
                        milky_way: "🌌",
                        minibus: "🚐",
                        minidisc: "💽",
                        mobile_phone_off: "📴",
                        money_mouth_face: "🤑",
                        money_with_wings: "💸",
                        moneybag: "💰",
                        monkey: "🐒",
                        monkey_face: "🐵",
                        monorail: "🚝",
                        moon: "🌔",
                        mortar_board: "🎓",
                        mosque: "🕌",
                        motor_boat: "🛥",
                        motor_scooter: "🛵",
                        motorcycle: "🏍",
                        motorway: "🛣",
                        mount_fuji: "🗻",
                        mountain: "⛰",
                        mountain_biking_man: "🚵",
                        mountain_biking_woman: "🚵&zwj;♀️",
                        mountain_cableway: "🚠",
                        mountain_railway: "🚞",
                        mountain_snow: "🏔",
                        mouse: "🐭",
                        mouse2: "🐁",
                        movie_camera: "🎥",
                        moyai: "🗿",
                        mrs_claus: "🤶",
                        muscle: "💪",
                        mushroom: "🍄",
                        musical_keyboard: "🎹",
                        musical_note: "🎵",
                        musical_score: "🎼",
                        mute: "🔇",
                        nail_care: "💅",
                        name_badge: "📛",
                        national_park: "🏞",
                        nauseated_face: "🤢",
                        necktie: "👔",
                        negative_squared_cross_mark: "❎",
                        nerd_face: "🤓",
                        neutral_face: "😐",
                        new: "🆕",
                        new_moon: "🌑",
                        new_moon_with_face: "🌚",
                        newspaper: "📰",
                        newspaper_roll: "🗞",
                        next_track_button: "⏭",
                        ng: "🆖",
                        no_good_man: "🙅&zwj;♂️",
                        no_good_woman: "🙅",
                        night_with_stars: "🌃",
                        no_bell: "🔕",
                        no_bicycles: "🚳",
                        no_entry: "⛔️",
                        no_entry_sign: "🚫",
                        no_mobile_phones: "📵",
                        no_mouth: "😶",
                        no_pedestrians: "🚷",
                        no_smoking: "🚭",
                        "non-potable_water": "🚱",
                        nose: "👃",
                        notebook: "📓",
                        notebook_with_decorative_cover: "📔",
                        notes: "🎶",
                        nut_and_bolt: "🔩",
                        o: "⭕️",
                        o2: "🅾️",
                        ocean: "🌊",
                        octopus: "🐙",
                        oden: "🍢",
                        office: "🏢",
                        oil_drum: "🛢",
                        ok: "🆗",
                        ok_hand: "👌",
                        ok_man: "🙆&zwj;♂️",
                        ok_woman: "🙆",
                        old_key: "🗝",
                        older_man: "👴",
                        older_woman: "👵",
                        om: "🕉",
                        on: "🔛",
                        oncoming_automobile: "🚘",
                        oncoming_bus: "🚍",
                        oncoming_police_car: "🚔",
                        oncoming_taxi: "🚖",
                        open_file_folder: "📂",
                        open_hands: "👐",
                        open_mouth: "😮",
                        open_umbrella: "☂️",
                        ophiuchus: "⛎",
                        orange_book: "📙",
                        orthodox_cross: "☦️",
                        outbox_tray: "📤",
                        owl: "🦉",
                        ox: "🐂",
                        package: "📦",
                        page_facing_up: "📄",
                        page_with_curl: "📃",
                        pager: "📟",
                        paintbrush: "🖌",
                        palm_tree: "🌴",
                        pancakes: "🥞",
                        panda_face: "🐼",
                        paperclip: "📎",
                        paperclips: "🖇",
                        parasol_on_ground: "⛱",
                        parking: "🅿️",
                        part_alternation_mark: "〽️",
                        partly_sunny: "⛅️",
                        passenger_ship: "🛳",
                        passport_control: "🛂",
                        pause_button: "⏸",
                        peace_symbol: "☮️",
                        peach: "🍑",
                        peanuts: "🥜",
                        pear: "🍐",
                        pen: "🖊",
                        pencil2: "✏️",
                        penguin: "🐧",
                        pensive: "😔",
                        performing_arts: "🎭",
                        persevere: "😣",
                        person_fencing: "🤺",
                        pouting_woman: "🙎",
                        phone: "☎️",
                        pick: "⛏",
                        pig: "🐷",
                        pig2: "🐖",
                        pig_nose: "🐽",
                        pill: "💊",
                        pineapple: "🍍",
                        ping_pong: "🏓",
                        pisces: "♓️",
                        pizza: "🍕",
                        place_of_worship: "🛐",
                        plate_with_cutlery: "🍽",
                        play_or_pause_button: "⏯",
                        point_down: "👇",
                        point_left: "👈",
                        point_right: "👉",
                        point_up: "☝️",
                        point_up_2: "👆",
                        police_car: "🚓",
                        policewoman: "👮&zwj;♀️",
                        poodle: "🐩",
                        popcorn: "🍿",
                        post_office: "🏣",
                        postal_horn: "📯",
                        postbox: "📮",
                        potable_water: "🚰",
                        potato: "🥔",
                        pouch: "👝",
                        poultry_leg: "🍗",
                        pound: "💷",
                        rage: "😡",
                        pouting_cat: "😾",
                        pouting_man: "🙎&zwj;♂️",
                        pray: "🙏",
                        prayer_beads: "📿",
                        pregnant_woman: "🤰",
                        previous_track_button: "⏮",
                        prince: "🤴",
                        princess: "👸",
                        printer: "🖨",
                        purple_heart: "💜",
                        purse: "👛",
                        pushpin: "📌",
                        put_litter_in_its_place: "🚮",
                        question: "❓",
                        rabbit: "🐰",
                        rabbit2: "🐇",
                        racehorse: "🐎",
                        racing_car: "🏎",
                        radio: "📻",
                        radio_button: "🔘",
                        radioactive: "☢️",
                        railway_car: "🚃",
                        railway_track: "🛤",
                        rainbow: "🌈",
                        rainbow_flag: "🏳️&zwj;🌈",
                        raised_back_of_hand: "🤚",
                        raised_hand_with_fingers_splayed: "🖐",
                        raised_hands: "🙌",
                        raising_hand_woman: "🙋",
                        raising_hand_man: "🙋&zwj;♂️",
                        ram: "🐏",
                        ramen: "🍜",
                        rat: "🐀",
                        record_button: "⏺",
                        recycle: "♻️",
                        red_circle: "🔴",
                        registered: "®️",
                        relaxed: "☺️",
                        relieved: "😌",
                        reminder_ribbon: "🎗",
                        repeat: "🔁",
                        repeat_one: "🔂",
                        rescue_worker_helmet: "⛑",
                        restroom: "🚻",
                        revolving_hearts: "💞",
                        rewind: "⏪",
                        rhinoceros: "🦏",
                        ribbon: "🎀",
                        rice: "🍚",
                        rice_ball: "🍙",
                        rice_cracker: "🍘",
                        rice_scene: "🎑",
                        right_anger_bubble: "🗯",
                        ring: "💍",
                        robot: "🤖",
                        rocket: "🚀",
                        rofl: "🤣",
                        roll_eyes: "🙄",
                        roller_coaster: "🎢",
                        rooster: "🐓",
                        rose: "🌹",
                        rosette: "🏵",
                        rotating_light: "🚨",
                        round_pushpin: "📍",
                        rowing_man: "🚣",
                        rowing_woman: "🚣&zwj;♀️",
                        rugby_football: "🏉",
                        running_man: "🏃",
                        running_shirt_with_sash: "🎽",
                        running_woman: "🏃&zwj;♀️",
                        sa: "🈂️",
                        sagittarius: "♐️",
                        sake: "🍶",
                        sandal: "👡",
                        santa: "🎅",
                        satellite: "📡",
                        saxophone: "🎷",
                        school: "🏫",
                        school_satchel: "🎒",
                        scissors: "✂️",
                        scorpion: "🦂",
                        scorpius: "♏️",
                        scream: "😱",
                        scream_cat: "🙀",
                        scroll: "📜",
                        seat: "💺",
                        secret: "㊙️",
                        see_no_evil: "🙈",
                        seedling: "🌱",
                        selfie: "🤳",
                        shallow_pan_of_food: "🥘",
                        shamrock: "☘️",
                        shark: "🦈",
                        shaved_ice: "🍧",
                        sheep: "🐑",
                        shell: "🐚",
                        shield: "🛡",
                        shinto_shrine: "⛩",
                        ship: "🚢",
                        shirt: "👕",
                        shopping: "🛍",
                        shopping_cart: "🛒",
                        shower: "🚿",
                        shrimp: "🦐",
                        signal_strength: "📶",
                        six_pointed_star: "🔯",
                        ski: "🎿",
                        skier: "⛷",
                        skull: "💀",
                        skull_and_crossbones: "☠️",
                        sleeping: "😴",
                        sleeping_bed: "🛌",
                        sleepy: "😪",
                        slightly_frowning_face: "🙁",
                        slightly_smiling_face: "🙂",
                        slot_machine: "🎰",
                        small_airplane: "🛩",
                        small_blue_diamond: "🔹",
                        small_orange_diamond: "🔸",
                        small_red_triangle: "🔺",
                        small_red_triangle_down: "🔻",
                        smile: "😄",
                        smile_cat: "😸",
                        smiley: "😃",
                        smiley_cat: "😺",
                        smiling_imp: "😈",
                        smirk: "😏",
                        smirk_cat: "😼",
                        smoking: "🚬",
                        snail: "🐌",
                        snake: "🐍",
                        sneezing_face: "🤧",
                        snowboarder: "🏂",
                        snowflake: "❄️",
                        snowman: "⛄️",
                        snowman_with_snow: "☃️",
                        sob: "😭",
                        soccer: "⚽️",
                        soon: "🔜",
                        sos: "🆘",
                        sound: "🔉",
                        space_invader: "👾",
                        spades: "♠️",
                        spaghetti: "🍝",
                        sparkle: "❇️",
                        sparkler: "🎇",
                        sparkles: "✨",
                        sparkling_heart: "💖",
                        speak_no_evil: "🙊",
                        speaker: "🔈",
                        speaking_head: "🗣",
                        speech_balloon: "💬",
                        speedboat: "🚤",
                        spider: "🕷",
                        spider_web: "🕸",
                        spiral_calendar: "🗓",
                        spiral_notepad: "🗒",
                        spoon: "🥄",
                        squid: "🦑",
                        stadium: "🏟",
                        star: "⭐️",
                        star2: "🌟",
                        star_and_crescent: "☪️",
                        star_of_david: "✡️",
                        stars: "🌠",
                        station: "🚉",
                        statue_of_liberty: "🗽",
                        steam_locomotive: "🚂",
                        stew: "🍲",
                        stop_button: "⏹",
                        stop_sign: "🛑",
                        stopwatch: "⏱",
                        straight_ruler: "📏",
                        strawberry: "🍓",
                        stuck_out_tongue: "😛",
                        stuck_out_tongue_closed_eyes: "😝",
                        stuck_out_tongue_winking_eye: "😜",
                        studio_microphone: "🎙",
                        stuffed_flatbread: "🥙",
                        sun_behind_large_cloud: "🌥",
                        sun_behind_rain_cloud: "🌦",
                        sun_behind_small_cloud: "🌤",
                        sun_with_face: "🌞",
                        sunflower: "🌻",
                        sunglasses: "😎",
                        sunny: "☀️",
                        sunrise: "🌅",
                        sunrise_over_mountains: "🌄",
                        surfing_man: "🏄",
                        surfing_woman: "🏄&zwj;♀️",
                        sushi: "🍣",
                        suspension_railway: "🚟",
                        sweat: "😓",
                        sweat_drops: "💦",
                        sweat_smile: "😅",
                        sweet_potato: "🍠",
                        swimming_man: "🏊",
                        swimming_woman: "🏊&zwj;♀️",
                        symbols: "🔣",
                        synagogue: "🕍",
                        syringe: "💉",
                        taco: "🌮",
                        tada: "🎉",
                        tanabata_tree: "🎋",
                        taurus: "♉️",
                        taxi: "🚕",
                        tea: "🍵",
                        telephone_receiver: "📞",
                        telescope: "🔭",
                        tennis: "🎾",
                        tent: "⛺️",
                        thermometer: "🌡",
                        thinking: "🤔",
                        thought_balloon: "💭",
                        ticket: "🎫",
                        tickets: "🎟",
                        tiger: "🐯",
                        tiger2: "🐅",
                        timer_clock: "⏲",
                        tipping_hand_man: "💁&zwj;♂️",
                        tired_face: "😫",
                        tm: "™️",
                        toilet: "🚽",
                        tokyo_tower: "🗼",
                        tomato: "🍅",
                        tongue: "👅",
                        top: "🔝",
                        tophat: "🎩",
                        tornado: "🌪",
                        trackball: "🖲",
                        tractor: "🚜",
                        traffic_light: "🚥",
                        train: "🚋",
                        train2: "🚆",
                        tram: "🚊",
                        triangular_flag_on_post: "🚩",
                        triangular_ruler: "📐",
                        trident: "🔱",
                        triumph: "😤",
                        trolleybus: "🚎",
                        trophy: "🏆",
                        tropical_drink: "🍹",
                        tropical_fish: "🐠",
                        truck: "🚚",
                        trumpet: "🎺",
                        tulip: "🌷",
                        tumbler_glass: "🥃",
                        turkey: "🦃",
                        turtle: "🐢",
                        tv: "📺",
                        twisted_rightwards_arrows: "🔀",
                        two_hearts: "💕",
                        two_men_holding_hands: "👬",
                        two_women_holding_hands: "👭",
                        u5272: "🈹",
                        u5408: "🈴",
                        u55b6: "🈺",
                        u6307: "🈯️",
                        u6708: "🈷️",
                        u6709: "🈶",
                        u6e80: "🈵",
                        u7121: "🈚️",
                        u7533: "🈸",
                        u7981: "🈲",
                        u7a7a: "🈳",
                        umbrella: "☔️",
                        unamused: "😒",
                        underage: "🔞",
                        unicorn: "🦄",
                        unlock: "🔓",
                        up: "🆙",
                        upside_down_face: "🙃",
                        v: "✌️",
                        vertical_traffic_light: "🚦",
                        vhs: "📼",
                        vibration_mode: "📳",
                        video_camera: "📹",
                        video_game: "🎮",
                        violin: "🎻",
                        virgo: "♍️",
                        volcano: "🌋",
                        volleyball: "🏐",
                        vs: "🆚",
                        vulcan_salute: "🖖",
                        walking_man: "🚶",
                        walking_woman: "🚶&zwj;♀️",
                        waning_crescent_moon: "🌘",
                        waning_gibbous_moon: "🌖",
                        warning: "⚠️",
                        wastebasket: "🗑",
                        watch: "⌚️",
                        water_buffalo: "🐃",
                        watermelon: "🍉",
                        wave: "👋",
                        wavy_dash: "〰️",
                        waxing_crescent_moon: "🌒",
                        wc: "🚾",
                        weary: "😩",
                        wedding: "💒",
                        weight_lifting_man: "🏋️",
                        weight_lifting_woman: "🏋️&zwj;♀️",
                        whale: "🐳",
                        whale2: "🐋",
                        wheel_of_dharma: "☸️",
                        wheelchair: "♿️",
                        white_check_mark: "✅",
                        white_circle: "⚪️",
                        white_flag: "🏳️",
                        white_flower: "💮",
                        white_large_square: "⬜️",
                        white_medium_small_square: "◽️",
                        white_medium_square: "◻️",
                        white_small_square: "▫️",
                        white_square_button: "🔳",
                        wilted_flower: "🥀",
                        wind_chime: "🎐",
                        wind_face: "🌬",
                        wine_glass: "🍷",
                        wink: "😉",
                        wolf: "🐺",
                        woman: "👩",
                        woman_artist: "👩&zwj;🎨",
                        woman_astronaut: "👩&zwj;🚀",
                        woman_cartwheeling: "🤸&zwj;♀️",
                        woman_cook: "👩&zwj;🍳",
                        woman_facepalming: "🤦&zwj;♀️",
                        woman_factory_worker: "👩&zwj;🏭",
                        woman_farmer: "👩&zwj;🌾",
                        woman_firefighter: "👩&zwj;🚒",
                        woman_health_worker: "👩&zwj;⚕️",
                        woman_judge: "👩&zwj;⚖️",
                        woman_juggling: "🤹&zwj;♀️",
                        woman_mechanic: "👩&zwj;🔧",
                        woman_office_worker: "👩&zwj;💼",
                        woman_pilot: "👩&zwj;✈️",
                        woman_playing_handball: "🤾&zwj;♀️",
                        woman_playing_water_polo: "🤽&zwj;♀️",
                        woman_scientist: "👩&zwj;🔬",
                        woman_shrugging: "🤷&zwj;♀️",
                        woman_singer: "👩&zwj;🎤",
                        woman_student: "👩&zwj;🎓",
                        woman_teacher: "👩&zwj;🏫",
                        woman_technologist: "👩&zwj;💻",
                        woman_with_turban: "👳&zwj;♀️",
                        womans_clothes: "👚",
                        womans_hat: "👒",
                        women_wrestling: "🤼&zwj;♀️",
                        womens: "🚺",
                        world_map: "🗺",
                        worried: "😟",
                        wrench: "🔧",
                        writing_hand: "✍️",
                        x: "❌",
                        yellow_heart: "💛",
                        yen: "💴",
                        yin_yang: "☯️",
                        yum: "😋",
                        zap: "⚡️",
                        zipper_mouth_face: "🤐",
                        zzz: "💤",
                        octocat:
                            '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
                        showdown:
                            "<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>",
                    }),
                    (n.Converter = function (e) {
                        var t = {},
                            r = [],
                            c = [],
                            u = {},
                            d = o,
                            p = { parsed: {}, raw: "", format: "" };
                        function h(e, t) {
                            if (((t = t || null), n.helper.isString(e))) {
                                if (
                                    ((t = e = n.helper.stdExtName(e)),
                                    n.extensions[e])
                                )
                                    return (
                                        console.warn(
                                            "DEPRECATION WARNING: " +
                                                e +
                                                " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"
                                        ),
                                        void (function (e, t) {
                                            "function" == typeof e &&
                                                (e = e(new n.Converter()));
                                            n.helper.isArray(e) || (e = [e]);
                                            var a = l(e, t);
                                            if (!a.valid) throw Error(a.error);
                                            for (var i = 0; i < e.length; ++i)
                                                switch (e[i].type) {
                                                    case "lang":
                                                        r.push(e[i]);
                                                        break;
                                                    case "output":
                                                        c.push(e[i]);
                                                        break;
                                                    default:
                                                        throw Error(
                                                            "Extension loader error: Type unrecognized!!!"
                                                        );
                                                }
                                        })(n.extensions[e], e)
                                    );
                                if (n.helper.isUndefined(a[e]))
                                    throw Error(
                                        'Extension "' +
                                            e +
                                            '" could not be loaded. It was either not found or is not a valid extension.'
                                    );
                                e = a[e];
                            }
                            "function" == typeof e && (e = e()),
                                n.helper.isArray(e) || (e = [e]);
                            var i = l(e, t);
                            if (!i.valid) throw Error(i.error);
                            for (var o = 0; o < e.length; ++o) {
                                switch (e[o].type) {
                                    case "lang":
                                        r.push(e[o]);
                                        break;
                                    case "output":
                                        c.push(e[o]);
                                }
                                if (e[o].hasOwnProperty("listeners"))
                                    for (var s in e[o].listeners)
                                        e[o].listeners.hasOwnProperty(s) &&
                                            g(s, e[o].listeners[s]);
                            }
                        }
                        function g(e, t) {
                            if (!n.helper.isString(e))
                                throw Error(
                                    "Invalid argument in converter.listen() method: name must be a string, but " +
                                        typeof e +
                                        " given"
                                );
                            if ("function" != typeof t)
                                throw Error(
                                    "Invalid argument in converter.listen() method: callback must be a function, but " +
                                        typeof t +
                                        " given"
                                );
                            u.hasOwnProperty(e) || (u[e] = []), u[e].push(t);
                        }
                        !(function () {
                            for (var r in ((e = e || {}), i))
                                i.hasOwnProperty(r) && (t[r] = i[r]);
                            if ("object" != typeof e)
                                throw Error(
                                    "Converter expects the passed parameter to be an object, but " +
                                        typeof e +
                                        " was passed instead."
                                );
                            for (var a in e)
                                e.hasOwnProperty(a) && (t[a] = e[a]);
                            t.extensions && n.helper.forEach(t.extensions, h);
                        })(),
                            (this._dispatch = function (e, t, n, r) {
                                if (u.hasOwnProperty(e))
                                    for (var a = 0; a < u[e].length; ++a) {
                                        var i = u[e][a](e, t, this, n, r);
                                        i && void 0 !== i && (t = i);
                                    }
                                return t;
                            }),
                            (this.listen = function (e, t) {
                                return g(e, t), this;
                            }),
                            (this.makeHtml = function (e) {
                                if (!e) return e;
                                var a = {
                                    gHtmlBlocks: [],
                                    gHtmlMdBlocks: [],
                                    gHtmlSpans: [],
                                    gUrls: {},
                                    gTitles: {},
                                    gDimensions: {},
                                    gListLevel: 0,
                                    hashLinkCounts: {},
                                    langExtensions: r,
                                    outputModifiers: c,
                                    converter: this,
                                    ghCodeBlocks: [],
                                    metadata: {
                                        parsed: {},
                                        raw: "",
                                        format: "",
                                    },
                                };
                                return (
                                    (e = (e = (e = (e = (e = e.replace(
                                        /¨/g,
                                        "¨T"
                                    )).replace(/\$/g, "¨D")).replace(
                                        /\r\n/g,
                                        "\n"
                                    )).replace(/\r/g, "\n")).replace(
                                        /\u00A0/g,
                                        "&nbsp;"
                                    )),
                                    t.smartIndentationFix &&
                                        (e = (function (e) {
                                            var t = e.match(/^\s*/)[0].length,
                                                n = new RegExp(
                                                    "^\\s{0," + t + "}",
                                                    "gm"
                                                );
                                            return e.replace(n, "");
                                        })(e)),
                                    (e = "\n\n" + e + "\n\n"),
                                    (e = (e = n.subParser("detab")(
                                        e,
                                        t,
                                        a
                                    )).replace(/^[ \t]+$/gm, "")),
                                    n.helper.forEach(r, function (r) {
                                        e = n.subParser("runExtension")(
                                            r,
                                            e,
                                            t,
                                            a
                                        );
                                    }),
                                    (e = n.subParser("metadata")(e, t, a)),
                                    (e = n.subParser("hashPreCodeTags")(
                                        e,
                                        t,
                                        a
                                    )),
                                    (e = n.subParser("githubCodeBlocks")(
                                        e,
                                        t,
                                        a
                                    )),
                                    (e = n.subParser("hashHTMLBlocks")(
                                        e,
                                        t,
                                        a
                                    )),
                                    (e = n.subParser("hashCodeTags")(e, t, a)),
                                    (e = n.subParser("stripLinkDefinitions")(
                                        e,
                                        t,
                                        a
                                    )),
                                    (e = n.subParser("blockGamut")(e, t, a)),
                                    (e = n.subParser("unhashHTMLSpans")(
                                        e,
                                        t,
                                        a
                                    )),
                                    (e = (e = (e = n.subParser(
                                        "unescapeSpecialChars"
                                    )(e, t, a)).replace(/¨D/g, "$$")).replace(
                                        /¨T/g,
                                        "¨"
                                    )),
                                    (e = n.subParser("completeHTMLDocument")(
                                        e,
                                        t,
                                        a
                                    )),
                                    n.helper.forEach(c, function (r) {
                                        e = n.subParser("runExtension")(
                                            r,
                                            e,
                                            t,
                                            a
                                        );
                                    }),
                                    (p = a.metadata),
                                    e
                                );
                            }),
                            (this.makeMarkdown = this.makeMd =
                                function (e, t) {
                                    if (
                                        ((e = (e = (e = e.replace(
                                            /\r\n/g,
                                            "\n"
                                        )).replace(/\r/g, "\n")).replace(
                                            />[ \t]+</,
                                            ">¨NBSP;<"
                                        )),
                                        !t)
                                    ) {
                                        if (!window || !window.document)
                                            throw new Error(
                                                "HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM"
                                            );
                                        t = window.document;
                                    }
                                    var r = t.createElement("div");
                                    r.innerHTML = e;
                                    var a = {
                                        preList: (function (e) {
                                            for (
                                                var t =
                                                        e.querySelectorAll(
                                                            "pre"
                                                        ),
                                                    r = [],
                                                    a = 0;
                                                a < t.length;
                                                ++a
                                            )
                                                if (
                                                    1 ===
                                                        t[a]
                                                            .childElementCount &&
                                                    "code" ===
                                                        t[
                                                            a
                                                        ].firstChild.tagName.toLowerCase()
                                                ) {
                                                    var i =
                                                            t[
                                                                a
                                                            ].firstChild.innerHTML.trim(),
                                                        o =
                                                            t[
                                                                a
                                                            ].firstChild.getAttribute(
                                                                "data-language"
                                                            ) || "";
                                                    if ("" === o)
                                                        for (
                                                            var s =
                                                                    t[
                                                                        a
                                                                    ].firstChild.className.split(
                                                                        " "
                                                                    ),
                                                                l = 0;
                                                            l < s.length;
                                                            ++l
                                                        ) {
                                                            var c =
                                                                s[l].match(
                                                                    /^language-(.+)$/
                                                                );
                                                            if (null !== c) {
                                                                o = c[1];
                                                                break;
                                                            }
                                                        }
                                                    (i =
                                                        n.helper.unescapeHTMLEntities(
                                                            i
                                                        )),
                                                        r.push(i),
                                                        (t[a].outerHTML =
                                                            '<precode language="' +
                                                            o +
                                                            '" precodenum="' +
                                                            a.toString() +
                                                            '"></precode>');
                                                } else
                                                    r.push(t[a].innerHTML),
                                                        (t[a].innerHTML = ""),
                                                        t[a].setAttribute(
                                                            "prenum",
                                                            a.toString()
                                                        );
                                            return r;
                                        })(r),
                                    };
                                    !(function e(t) {
                                        for (
                                            var n = 0;
                                            n < t.childNodes.length;
                                            ++n
                                        ) {
                                            var r = t.childNodes[n];
                                            3 === r.nodeType
                                                ? /\S/.test(r.nodeValue)
                                                    ? ((r.nodeValue =
                                                          r.nodeValue
                                                              .split("\n")
                                                              .join(" ")),
                                                      (r.nodeValue =
                                                          r.nodeValue.replace(
                                                              /(\s)+/g,
                                                              "$1"
                                                          )))
                                                    : (t.removeChild(r), --n)
                                                : 1 === r.nodeType && e(r);
                                        }
                                    })(r);
                                    for (
                                        var i = r.childNodes, o = "", s = 0;
                                        s < i.length;
                                        s++
                                    )
                                        o += n.subParser("makeMarkdown.node")(
                                            i[s],
                                            a
                                        );
                                    return o;
                                }),
                            (this.setOption = function (e, n) {
                                t[e] = n;
                            }),
                            (this.getOption = function (e) {
                                return t[e];
                            }),
                            (this.getOptions = function () {
                                return t;
                            }),
                            (this.addExtension = function (e, t) {
                                h(e, (t = t || null));
                            }),
                            (this.useExtension = function (e) {
                                h(e);
                            }),
                            (this.setFlavor = function (e) {
                                if (!s.hasOwnProperty(e))
                                    throw Error(e + " flavor was not found");
                                var n = s[e];
                                for (var r in ((d = e), n))
                                    n.hasOwnProperty(r) && (t[r] = n[r]);
                            }),
                            (this.getFlavor = function () {
                                return d;
                            }),
                            (this.removeExtension = function (e) {
                                n.helper.isArray(e) || (e = [e]);
                                for (var t = 0; t < e.length; ++t) {
                                    for (var a = e[t], i = 0; i < r.length; ++i)
                                        r[i] === a && r[i].splice(i, 1);
                                    for (; 0 < c.length; ++i)
                                        c[0] === a && c[0].splice(i, 1);
                                }
                            }),
                            (this.getAllExtensions = function () {
                                return { language: r, output: c };
                            }),
                            (this.getMetadata = function (e) {
                                return e ? p.raw : p.parsed;
                            }),
                            (this.getMetadataFormat = function () {
                                return p.format;
                            }),
                            (this._setMetadataPair = function (e, t) {
                                p.parsed[e] = t;
                            }),
                            (this._setMetadataFormat = function (e) {
                                p.format = e;
                            }),
                            (this._setMetadataRaw = function (e) {
                                p.raw = e;
                            });
                    }),
                    n.subParser("anchors", function (e, t, r) {
                        var a = function (e, a, i, o, s, l, c) {
                            if (
                                (n.helper.isUndefined(c) && (c = ""),
                                (i = i.toLowerCase()),
                                e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
                            )
                                o = "";
                            else if (!o) {
                                if (
                                    (i ||
                                        (i = a
                                            .toLowerCase()
                                            .replace(/ ?\n/g, " ")),
                                    (o = "#" + i),
                                    n.helper.isUndefined(r.gUrls[i]))
                                )
                                    return e;
                                (o = r.gUrls[i]),
                                    n.helper.isUndefined(r.gTitles[i]) ||
                                        (c = r.gTitles[i]);
                            }
                            var u =
                                '<a href="' +
                                (o = o.replace(
                                    n.helper.regexes.asteriskDashAndColon,
                                    n.helper.escapeCharactersCallback
                                )) +
                                '"';
                            return (
                                "" !== c &&
                                    null !== c &&
                                    (u +=
                                        ' title="' +
                                        (c = (c = c.replace(
                                            /"/g,
                                            "&quot;"
                                        )).replace(
                                            n.helper.regexes
                                                .asteriskDashAndColon,
                                            n.helper.escapeCharactersCallback
                                        )) +
                                        '"'),
                                t.openLinksInNewWindow &&
                                    !/^#/.test(o) &&
                                    (u +=
                                        ' rel="noopener noreferrer" target="¨E95Eblank"'),
                                (u += ">" + a + "</a>")
                            );
                        };
                        return (
                            (e = (e = (e = (e = (e = r.converter._dispatch(
                                "anchors.before",
                                e,
                                t,
                                r
                            )).replace(
                                /\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g,
                                a
                            )).replace(
                                /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
                                a
                            )).replace(
                                /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
                                a
                            )).replace(/\[([^\[\]]+)]()()()()()/g, a)),
                            t.ghMentions &&
                                (e = e.replace(
                                    /(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gim,
                                    function (e, r, a, i, o) {
                                        if ("\\" === a) return r + i;
                                        if (
                                            !n.helper.isString(t.ghMentionsLink)
                                        )
                                            throw new Error(
                                                "ghMentionsLink option must be a string"
                                            );
                                        var s = t.ghMentionsLink.replace(
                                                /\{u}/g,
                                                o
                                            ),
                                            l = "";
                                        return (
                                            t.openLinksInNewWindow &&
                                                (l =
                                                    ' rel="noopener noreferrer" target="¨E95Eblank"'),
                                            r +
                                                '<a href="' +
                                                s +
                                                '"' +
                                                l +
                                                ">" +
                                                i +
                                                "</a>"
                                        );
                                    }
                                )),
                            (e = r.converter._dispatch(
                                "anchors.after",
                                e,
                                t,
                                r
                            ))
                        );
                    });
                var d =
                        /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
                    p =
                        /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
                    h = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
                    g =
                        /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,
                    f =
                        /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
                    m = function (e) {
                        return function (t, r, a, i, o, s, l) {
                            var c = (a = a.replace(
                                    n.helper.regexes.asteriskDashAndColon,
                                    n.helper.escapeCharactersCallback
                                )),
                                u = "",
                                d = "",
                                p = r || "",
                                h = l || "";
                            return (
                                /^www\./i.test(a) &&
                                    (a = a.replace(/^www\./i, "http://www.")),
                                e.excludeTrailingPunctuationFromURLs &&
                                    s &&
                                    (u = s),
                                e.openLinksInNewWindow &&
                                    (d =
                                        ' rel="noopener noreferrer" target="¨E95Eblank"'),
                                p +
                                    '<a href="' +
                                    a +
                                    '"' +
                                    d +
                                    ">" +
                                    c +
                                    "</a>" +
                                    u +
                                    h
                            );
                        };
                    },
                    b = function (e, t) {
                        return function (r, a, i) {
                            var o = "mailto:";
                            return (
                                (a = a || ""),
                                (i = n.subParser("unescapeSpecialChars")(
                                    i,
                                    e,
                                    t
                                )),
                                e.encodeEmails
                                    ? ((o = n.helper.encodeEmailAddress(o + i)),
                                      (i = n.helper.encodeEmailAddress(i)))
                                    : (o += i),
                                a + '<a href="' + o + '">' + i + "</a>"
                            );
                        };
                    };
                n.subParser("autoLinks", function (e, t, n) {
                    return (
                        (e = (e = (e = n.converter._dispatch(
                            "autoLinks.before",
                            e,
                            t,
                            n
                        )).replace(h, m(t))).replace(f, b(t, n))),
                        (e = n.converter._dispatch("autoLinks.after", e, t, n))
                    );
                }),
                    n.subParser("simplifiedAutoLinks", function (e, t, n) {
                        return t.simplifiedAutoLink
                            ? ((e = n.converter._dispatch(
                                  "simplifiedAutoLinks.before",
                                  e,
                                  t,
                                  n
                              )),
                              (e = (e = t.excludeTrailingPunctuationFromURLs
                                  ? e.replace(p, m(t))
                                  : e.replace(d, m(t))).replace(g, b(t, n))),
                              (e = n.converter._dispatch(
                                  "simplifiedAutoLinks.after",
                                  e,
                                  t,
                                  n
                              )))
                            : e;
                    }),
                    n.subParser("blockGamut", function (e, t, r) {
                        return (
                            (e = r.converter._dispatch(
                                "blockGamut.before",
                                e,
                                t,
                                r
                            )),
                            (e = n.subParser("blockQuotes")(e, t, r)),
                            (e = n.subParser("headers")(e, t, r)),
                            (e = n.subParser("horizontalRule")(e, t, r)),
                            (e = n.subParser("lists")(e, t, r)),
                            (e = n.subParser("codeBlocks")(e, t, r)),
                            (e = n.subParser("tables")(e, t, r)),
                            (e = n.subParser("hashHTMLBlocks")(e, t, r)),
                            (e = n.subParser("paragraphs")(e, t, r)),
                            (e = r.converter._dispatch(
                                "blockGamut.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("blockQuotes", function (e, t, r) {
                        (e = r.converter._dispatch(
                            "blockQuotes.before",
                            e,
                            t,
                            r
                        )),
                            (e += "\n\n");
                        var a = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
                        return (
                            t.splitAdjacentBlockquotes &&
                                (a = /^ {0,3}>[\s\S]*?(?:\n\n)/gm),
                            (e = e.replace(a, function (e) {
                                return (
                                    (e = (e = (e = e.replace(
                                        /^[ \t]*>[ \t]?/gm,
                                        ""
                                    )).replace(/¨0/g, "")).replace(
                                        /^[ \t]+$/gm,
                                        ""
                                    )),
                                    (e = n.subParser("githubCodeBlocks")(
                                        e,
                                        t,
                                        r
                                    )),
                                    (e = (e = (e = n.subParser("blockGamut")(
                                        e,
                                        t,
                                        r
                                    )).replace(/(^|\n)/g, "$1  ")).replace(
                                        /(\s*<pre>[^\r]+?<\/pre>)/gm,
                                        function (e, t) {
                                            var n = t;
                                            return (n = (n = n.replace(
                                                /^  /gm,
                                                "¨0"
                                            )).replace(/¨0/g, ""));
                                        }
                                    )),
                                    n.subParser("hashBlock")(
                                        "<blockquote>\n" +
                                            e +
                                            "\n</blockquote>",
                                        t,
                                        r
                                    )
                                );
                            })),
                            (e = r.converter._dispatch(
                                "blockQuotes.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("codeBlocks", function (e, t, r) {
                        e = r.converter._dispatch("codeBlocks.before", e, t, r);
                        return (
                            (e = (e = (e += "¨0").replace(
                                /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g,
                                function (e, a, i) {
                                    var o = a,
                                        s = i,
                                        l = "\n";
                                    return (
                                        (o = n.subParser("outdent")(o, t, r)),
                                        (o = n.subParser("encodeCode")(
                                            o,
                                            t,
                                            r
                                        )),
                                        (o = (o = (o = n.subParser("detab")(
                                            o,
                                            t,
                                            r
                                        )).replace(/^\n+/g, "")).replace(
                                            /\n+$/g,
                                            ""
                                        )),
                                        t.omitExtraWLInCodeBlocks && (l = ""),
                                        (o =
                                            "<pre><code>" +
                                            o +
                                            l +
                                            "</code></pre>"),
                                        n.subParser("hashBlock")(o, t, r) + s
                                    );
                                }
                            )).replace(/¨0/, "")),
                            (e = r.converter._dispatch(
                                "codeBlocks.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("codeSpans", function (e, t, r) {
                        return (
                            void 0 ===
                                (e = r.converter._dispatch(
                                    "codeSpans.before",
                                    e,
                                    t,
                                    r
                                )) && (e = ""),
                            (e = e.replace(
                                /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
                                function (e, a, i, o) {
                                    var s = o;
                                    return (
                                        (s = (s = s.replace(
                                            /^([ \t]*)/g,
                                            ""
                                        )).replace(/[ \t]*$/g, "")),
                                        (s =
                                            a +
                                            "<code>" +
                                            (s = n.subParser("encodeCode")(
                                                s,
                                                t,
                                                r
                                            )) +
                                            "</code>"),
                                        (s = n.subParser("hashHTMLSpans")(
                                            s,
                                            t,
                                            r
                                        ))
                                    );
                                }
                            )),
                            (e = r.converter._dispatch(
                                "codeSpans.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("completeHTMLDocument", function (e, t, n) {
                        if (!t.completeHTMLDocument) return e;
                        e = n.converter._dispatch(
                            "completeHTMLDocument.before",
                            e,
                            t,
                            n
                        );
                        var r = "html",
                            a = "<!DOCTYPE HTML>\n",
                            i = "",
                            o = '<meta charset="utf-8">\n',
                            s = "",
                            l = "";
                        for (var c in (void 0 !== n.metadata.parsed.doctype &&
                            ((a =
                                "<!DOCTYPE " +
                                n.metadata.parsed.doctype +
                                ">\n"),
                            ("html" !==
                                (r = n.metadata.parsed.doctype
                                    .toString()
                                    .toLowerCase()) &&
                                "html5" !== r) ||
                                (o = '<meta charset="utf-8">')),
                        n.metadata.parsed))
                            if (n.metadata.parsed.hasOwnProperty(c))
                                switch (c.toLowerCase()) {
                                    case "doctype":
                                        break;
                                    case "title":
                                        i =
                                            "<title>" +
                                            n.metadata.parsed.title +
                                            "</title>\n";
                                        break;
                                    case "charset":
                                        o =
                                            "html" === r || "html5" === r
                                                ? '<meta charset="' +
                                                  n.metadata.parsed.charset +
                                                  '">\n'
                                                : '<meta name="charset" content="' +
                                                  n.metadata.parsed.charset +
                                                  '">\n';
                                        break;
                                    case "language":
                                    case "lang":
                                        (s =
                                            ' lang="' +
                                            n.metadata.parsed[c] +
                                            '"'),
                                            (l +=
                                                '<meta name="' +
                                                c +
                                                '" content="' +
                                                n.metadata.parsed[c] +
                                                '">\n');
                                        break;
                                    default:
                                        l +=
                                            '<meta name="' +
                                            c +
                                            '" content="' +
                                            n.metadata.parsed[c] +
                                            '">\n';
                                }
                        return (
                            (e =
                                a +
                                "<html" +
                                s +
                                ">\n<head>\n" +
                                i +
                                o +
                                l +
                                "</head>\n<body>\n" +
                                e.trim() +
                                "\n</body>\n</html>"),
                            (e = n.converter._dispatch(
                                "completeHTMLDocument.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("detab", function (e, t, n) {
                        return (
                            (e = (e = (e = (e = (e = (e = n.converter._dispatch(
                                "detab.before",
                                e,
                                t,
                                n
                            )).replace(/\t(?=\t)/g, "    ")).replace(
                                /\t/g,
                                "¨A¨B"
                            )).replace(/¨B(.+?)¨A/g, function (e, t) {
                                for (
                                    var n = t, r = 4 - (n.length % 4), a = 0;
                                    a < r;
                                    a++
                                )
                                    n += " ";
                                return n;
                            })).replace(/¨A/g, "    ")).replace(/¨B/g, "")),
                            (e = n.converter._dispatch("detab.after", e, t, n))
                        );
                    }),
                    n.subParser("ellipsis", function (e, t, n) {
                        return (
                            (e = (e = n.converter._dispatch(
                                "ellipsis.before",
                                e,
                                t,
                                n
                            )).replace(/\.\.\./g, "…")),
                            (e = n.converter._dispatch(
                                "ellipsis.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("emoji", function (e, t, r) {
                        if (!t.emoji) return e;
                        return (
                            (e = (e = r.converter._dispatch(
                                "emoji.before",
                                e,
                                t,
                                r
                            )).replace(/:([\S]+?):/g, function (e, t) {
                                return n.helper.emojis.hasOwnProperty(t)
                                    ? n.helper.emojis[t]
                                    : e;
                            })),
                            (e = r.converter._dispatch("emoji.after", e, t, r))
                        );
                    }),
                    n.subParser("encodeAmpsAndAngles", function (e, t, n) {
                        return (
                            (e = (e = (e = (e = (e = n.converter._dispatch(
                                "encodeAmpsAndAngles.before",
                                e,
                                t,
                                n
                            )).replace(
                                /&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,
                                "&amp;"
                            )).replace(/<(?![a-z\/?$!])/gi, "&lt;")).replace(
                                /</g,
                                "&lt;"
                            )).replace(/>/g, "&gt;")),
                            (e = n.converter._dispatch(
                                "encodeAmpsAndAngles.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("encodeBackslashEscapes", function (e, t, r) {
                        return (
                            (e = (e = (e = r.converter._dispatch(
                                "encodeBackslashEscapes.before",
                                e,
                                t,
                                r
                            )).replace(
                                /\\(\\)/g,
                                n.helper.escapeCharactersCallback
                            )).replace(
                                /\\([`*_{}\[\]()>#+.!~=|-])/g,
                                n.helper.escapeCharactersCallback
                            )),
                            (e = r.converter._dispatch(
                                "encodeBackslashEscapes.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("encodeCode", function (e, t, r) {
                        return (
                            (e = (e = r.converter._dispatch(
                                "encodeCode.before",
                                e,
                                t,
                                r
                            ))
                                .replace(/&/g, "&amp;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;")
                                .replace(
                                    /([*_{}\[\]\\=~-])/g,
                                    n.helper.escapeCharactersCallback
                                )),
                            (e = r.converter._dispatch(
                                "encodeCode.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser(
                        "escapeSpecialCharsWithinTagAttributes",
                        function (e, t, r) {
                            return (
                                (e = (e = (e = r.converter._dispatch(
                                    "escapeSpecialCharsWithinTagAttributes.before",
                                    e,
                                    t,
                                    r
                                )).replace(
                                    /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
                                    function (e) {
                                        return e
                                            .replace(
                                                /(.)<\/?code>(?=.)/g,
                                                "$1`"
                                            )
                                            .replace(
                                                /([\\`*_~=|])/g,
                                                n.helper
                                                    .escapeCharactersCallback
                                            );
                                    }
                                )).replace(
                                    /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi,
                                    function (e) {
                                        return e.replace(
                                            /([\\`*_~=|])/g,
                                            n.helper.escapeCharactersCallback
                                        );
                                    }
                                )),
                                (e = r.converter._dispatch(
                                    "escapeSpecialCharsWithinTagAttributes.after",
                                    e,
                                    t,
                                    r
                                ))
                            );
                        }
                    ),
                    n.subParser("githubCodeBlocks", function (e, t, r) {
                        return t.ghCodeBlocks
                            ? ((e = r.converter._dispatch(
                                  "githubCodeBlocks.before",
                                  e,
                                  t,
                                  r
                              )),
                              (e = (e = (e += "¨0").replace(
                                  /(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g,
                                  function (e, a, i, o) {
                                      var s = t.omitExtraWLInCodeBlocks
                                          ? ""
                                          : "\n";
                                      return (
                                          (o = n.subParser("encodeCode")(
                                              o,
                                              t,
                                              r
                                          )),
                                          (o =
                                              "<pre><code" +
                                              (i
                                                  ? ' class="' +
                                                    i +
                                                    " language-" +
                                                    i +
                                                    '"'
                                                  : "") +
                                              ">" +
                                              (o = (o = (o = n.subParser(
                                                  "detab"
                                              )(o, t, r)).replace(
                                                  /^\n+/g,
                                                  ""
                                              )).replace(/\n+$/g, "")) +
                                              s +
                                              "</code></pre>"),
                                          (o = n.subParser("hashBlock")(
                                              o,
                                              t,
                                              r
                                          )),
                                          "\n\n¨G" +
                                              (r.ghCodeBlocks.push({
                                                  text: e,
                                                  codeblock: o,
                                              }) -
                                                  1) +
                                              "G\n\n"
                                      );
                                  }
                              )).replace(/¨0/, "")),
                              r.converter._dispatch(
                                  "githubCodeBlocks.after",
                                  e,
                                  t,
                                  r
                              ))
                            : e;
                    }),
                    n.subParser("hashBlock", function (e, t, n) {
                        return (
                            (e = (e = n.converter._dispatch(
                                "hashBlock.before",
                                e,
                                t,
                                n
                            )).replace(/(^\n+|\n+$)/g, "")),
                            (e =
                                "\n\n¨K" +
                                (n.gHtmlBlocks.push(e) - 1) +
                                "K\n\n"),
                            (e = n.converter._dispatch(
                                "hashBlock.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("hashCodeTags", function (e, t, r) {
                        e = r.converter._dispatch(
                            "hashCodeTags.before",
                            e,
                            t,
                            r
                        );
                        return (
                            (e = n.helper.replaceRecursiveRegExp(
                                e,
                                function (e, a, i, o) {
                                    var s =
                                        i +
                                        n.subParser("encodeCode")(a, t, r) +
                                        o;
                                    return (
                                        "¨C" + (r.gHtmlSpans.push(s) - 1) + "C"
                                    );
                                },
                                "<code\\b[^>]*>",
                                "</code>",
                                "gim"
                            )),
                            (e = r.converter._dispatch(
                                "hashCodeTags.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("hashElement", function (e, t, n) {
                        return function (e, t) {
                            var r = t;
                            return (
                                (r = (r = (r = r.replace(
                                    /\n\n/g,
                                    "\n"
                                )).replace(/^\n/, "")).replace(/\n+$/g, "")),
                                (r =
                                    "\n\n¨K" +
                                    (n.gHtmlBlocks.push(r) - 1) +
                                    "K\n\n")
                            );
                        };
                    }),
                    n.subParser("hashHTMLBlocks", function (e, t, r) {
                        e = r.converter._dispatch(
                            "hashHTMLBlocks.before",
                            e,
                            t,
                            r
                        );
                        var a = [
                                "pre",
                                "div",
                                "h1",
                                "h2",
                                "h3",
                                "h4",
                                "h5",
                                "h6",
                                "blockquote",
                                "table",
                                "dl",
                                "ol",
                                "ul",
                                "script",
                                "noscript",
                                "form",
                                "fieldset",
                                "iframe",
                                "math",
                                "style",
                                "section",
                                "header",
                                "footer",
                                "nav",
                                "article",
                                "aside",
                                "address",
                                "audio",
                                "canvas",
                                "figure",
                                "hgroup",
                                "output",
                                "video",
                                "p",
                            ],
                            i = function (e, t, n, a) {
                                var i = e;
                                return (
                                    -1 !== n.search(/\bmarkdown\b/) &&
                                        (i = n + r.converter.makeHtml(t) + a),
                                    "\n\n¨K" +
                                        (r.gHtmlBlocks.push(i) - 1) +
                                        "K\n\n"
                                );
                            };
                        t.backslashEscapesHTMLTags &&
                            (e = e.replace(/\\<(\/?[^>]+?)>/g, function (e, t) {
                                return "&lt;" + t + "&gt;";
                            }));
                        for (var o = 0; o < a.length; ++o)
                            for (
                                var s,
                                    l = new RegExp(
                                        "^ {0,3}(<" + a[o] + "\\b[^>]*>)",
                                        "im"
                                    ),
                                    c = "<" + a[o] + "\\b[^>]*>",
                                    u = "</" + a[o] + ">";
                                -1 !== (s = n.helper.regexIndexOf(e, l));

                            ) {
                                var d = n.helper.splitAtIndex(e, s),
                                    p = n.helper.replaceRecursiveRegExp(
                                        d[1],
                                        i,
                                        c,
                                        u,
                                        "im"
                                    );
                                if (p === d[1]) break;
                                e = d[0].concat(p);
                            }
                        return (
                            (e = e.replace(
                                /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
                                n.subParser("hashElement")(e, t, r)
                            )),
                            (e = (e = n.helper.replaceRecursiveRegExp(
                                e,
                                function (e) {
                                    return (
                                        "\n\n¨K" +
                                        (r.gHtmlBlocks.push(e) - 1) +
                                        "K\n\n"
                                    );
                                },
                                "^ {0,3}\x3c!--",
                                "--\x3e",
                                "gm"
                            )).replace(
                                /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
                                n.subParser("hashElement")(e, t, r)
                            )),
                            (e = r.converter._dispatch(
                                "hashHTMLBlocks.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("hashHTMLSpans", function (e, t, n) {
                        function r(e) {
                            return "¨C" + (n.gHtmlSpans.push(e) - 1) + "C";
                        }
                        return (
                            (e = (e = (e = (e = (e = n.converter._dispatch(
                                "hashHTMLSpans.before",
                                e,
                                t,
                                n
                            )).replace(/<[^>]+?\/>/gi, function (e) {
                                return r(e);
                            })).replace(
                                /<([^>]+?)>[\s\S]*?<\/\1>/g,
                                function (e) {
                                    return r(e);
                                }
                            )).replace(
                                /<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g,
                                function (e) {
                                    return r(e);
                                }
                            )).replace(/<[^>]+?>/gi, function (e) {
                                return r(e);
                            })),
                            (e = n.converter._dispatch(
                                "hashHTMLSpans.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("unhashHTMLSpans", function (e, t, n) {
                        e = n.converter._dispatch(
                            "unhashHTMLSpans.before",
                            e,
                            t,
                            n
                        );
                        for (var r = 0; r < n.gHtmlSpans.length; ++r) {
                            for (
                                var a = n.gHtmlSpans[r], i = 0;
                                /¨C(\d+)C/.test(a);

                            ) {
                                var o = RegExp.$1;
                                if (
                                    ((a = a.replace(
                                        "¨C" + o + "C",
                                        n.gHtmlSpans[o]
                                    )),
                                    10 === i)
                                ) {
                                    console.error(
                                        "maximum nesting of 10 spans reached!!!"
                                    );
                                    break;
                                }
                                ++i;
                            }
                            e = e.replace("¨C" + r + "C", a);
                        }
                        return (e = n.converter._dispatch(
                            "unhashHTMLSpans.after",
                            e,
                            t,
                            n
                        ));
                    }),
                    n.subParser("hashPreCodeTags", function (e, t, r) {
                        e = r.converter._dispatch(
                            "hashPreCodeTags.before",
                            e,
                            t,
                            r
                        );
                        return (
                            (e = n.helper.replaceRecursiveRegExp(
                                e,
                                function (e, a, i, o) {
                                    var s =
                                        i +
                                        n.subParser("encodeCode")(a, t, r) +
                                        o;
                                    return (
                                        "\n\n¨G" +
                                        (r.ghCodeBlocks.push({
                                            text: e,
                                            codeblock: s,
                                        }) -
                                            1) +
                                        "G\n\n"
                                    );
                                },
                                "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>",
                                "^ {0,3}</code>\\s*</pre>",
                                "gim"
                            )),
                            (e = r.converter._dispatch(
                                "hashPreCodeTags.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("headers", function (e, t, r) {
                        e = r.converter._dispatch("headers.before", e, t, r);
                        var a = isNaN(parseInt(t.headerLevelStart))
                                ? 1
                                : parseInt(t.headerLevelStart),
                            i = t.smoothLivePreview
                                ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm
                                : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
                            o = t.smoothLivePreview
                                ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm
                                : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
                        e = (e = e.replace(i, function (e, i) {
                            var o = n.subParser("spanGamut")(i, t, r),
                                s = t.noHeaderId ? "" : ' id="' + l(i) + '"',
                                c = "<h" + a + s + ">" + o + "</h" + a + ">";
                            return n.subParser("hashBlock")(c, t, r);
                        })).replace(o, function (e, i) {
                            var o = n.subParser("spanGamut")(i, t, r),
                                s = t.noHeaderId ? "" : ' id="' + l(i) + '"',
                                c = a + 1,
                                u = "<h" + c + s + ">" + o + "</h" + c + ">";
                            return n.subParser("hashBlock")(u, t, r);
                        });
                        var s = t.requireSpaceBeforeHeadingText
                            ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm
                            : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
                        function l(e) {
                            var a, i;
                            if (t.customizedHeaderId) {
                                var o = e.match(/\{([^{]+?)}\s*$/);
                                o && o[1] && (e = o[1]);
                            }
                            return (
                                (a = e),
                                (i = n.helper.isString(t.prefixHeaderId)
                                    ? t.prefixHeaderId
                                    : !0 === t.prefixHeaderId
                                    ? "section-"
                                    : ""),
                                t.rawPrefixHeaderId || (a = i + a),
                                (a = t.ghCompatibleHeaderId
                                    ? a
                                          .replace(/ /g, "-")
                                          .replace(/&amp;/g, "")
                                          .replace(/¨T/g, "")
                                          .replace(/¨D/g, "")
                                          .replace(
                                              /[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g,
                                              ""
                                          )
                                          .toLowerCase()
                                    : t.rawHeaderId
                                    ? a
                                          .replace(/ /g, "-")
                                          .replace(/&amp;/g, "&")
                                          .replace(/¨T/g, "¨")
                                          .replace(/¨D/g, "$")
                                          .replace(/["']/g, "-")
                                          .toLowerCase()
                                    : a.replace(/[^\w]/g, "").toLowerCase()),
                                t.rawPrefixHeaderId && (a = i + a),
                                r.hashLinkCounts[a]
                                    ? (a = a + "-" + r.hashLinkCounts[a]++)
                                    : (r.hashLinkCounts[a] = 1),
                                a
                            );
                        }
                        return (
                            (e = e.replace(s, function (e, i, o) {
                                var s = o;
                                t.customizedHeaderId &&
                                    (s = o.replace(/\s?\{([^{]+?)}\s*$/, ""));
                                var c = n.subParser("spanGamut")(s, t, r),
                                    u = t.noHeaderId
                                        ? ""
                                        : ' id="' + l(o) + '"',
                                    d = a - 1 + i.length,
                                    p =
                                        "<h" +
                                        d +
                                        u +
                                        ">" +
                                        c +
                                        "</h" +
                                        d +
                                        ">";
                                return n.subParser("hashBlock")(p, t, r);
                            })),
                            (e = r.converter._dispatch(
                                "headers.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("horizontalRule", function (e, t, r) {
                        e = r.converter._dispatch(
                            "horizontalRule.before",
                            e,
                            t,
                            r
                        );
                        var a = n.subParser("hashBlock")("<hr />", t, r);
                        return (
                            (e = (e = (e = e.replace(
                                /^ {0,2}( ?-){3,}[ \t]*$/gm,
                                a
                            )).replace(
                                /^ {0,2}( ?\*){3,}[ \t]*$/gm,
                                a
                            )).replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a)),
                            (e = r.converter._dispatch(
                                "horizontalRule.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("images", function (e, t, r) {
                        function a(e, t, a, i, o, s, l, c) {
                            var u = r.gUrls,
                                d = r.gTitles,
                                p = r.gDimensions;
                            if (
                                ((a = a.toLowerCase()),
                                c || (c = ""),
                                e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
                            )
                                i = "";
                            else if ("" === i || null === i) {
                                if (
                                    (("" !== a && null !== a) ||
                                        (a = t
                                            .toLowerCase()
                                            .replace(/ ?\n/g, " ")),
                                    (i = "#" + a),
                                    n.helper.isUndefined(u[a]))
                                )
                                    return e;
                                (i = u[a]),
                                    n.helper.isUndefined(d[a]) || (c = d[a]),
                                    n.helper.isUndefined(p[a]) ||
                                        ((o = p[a].width), (s = p[a].height));
                            }
                            t = t
                                .replace(/"/g, "&quot;")
                                .replace(
                                    n.helper.regexes.asteriskDashAndColon,
                                    n.helper.escapeCharactersCallback
                                );
                            var h =
                                '<img src="' +
                                (i = i.replace(
                                    n.helper.regexes.asteriskDashAndColon,
                                    n.helper.escapeCharactersCallback
                                )) +
                                '" alt="' +
                                t +
                                '"';
                            return (
                                c &&
                                    n.helper.isString(c) &&
                                    (h +=
                                        ' title="' +
                                        (c = c
                                            .replace(/"/g, "&quot;")
                                            .replace(
                                                n.helper.regexes
                                                    .asteriskDashAndColon,
                                                n.helper
                                                    .escapeCharactersCallback
                                            )) +
                                        '"'),
                                o &&
                                    s &&
                                    ((h +=
                                        ' width="' +
                                        (o = "*" === o ? "auto" : o) +
                                        '"'),
                                    (h +=
                                        ' height="' +
                                        (s = "*" === s ? "auto" : s) +
                                        '"')),
                                (h += " />")
                            );
                        }
                        return (
                            (e = (e = (e = (e = (e = (e = r.converter._dispatch(
                                "images.before",
                                e,
                                t,
                                r
                            )).replace(
                                /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
                                a
                            )).replace(
                                /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
                                function (e, t, n, r, i, o, s, l) {
                                    return a(
                                        e,
                                        t,
                                        n,
                                        (r = r.replace(/\s/g, "")),
                                        i,
                                        o,
                                        s,
                                        l
                                    );
                                }
                            )).replace(
                                /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
                                a
                            )).replace(
                                /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
                                a
                            )).replace(/!\[([^\[\]]+)]()()()()()/g, a)),
                            (e = r.converter._dispatch("images.after", e, t, r))
                        );
                    }),
                    n.subParser("italicsAndBold", function (e, t, n) {
                        function r(e, t, n) {
                            return t + e + n;
                        }
                        return (
                            (e = n.converter._dispatch(
                                "italicsAndBold.before",
                                e,
                                t,
                                n
                            )),
                            (e = t.literalMidWordUnderscores
                                ? (e = (e = e.replace(
                                      /\b___(\S[\s\S]*?)___\b/g,
                                      function (e, t) {
                                          return r(
                                              t,
                                              "<strong><em>",
                                              "</em></strong>"
                                          );
                                      }
                                  )).replace(
                                      /\b__(\S[\s\S]*?)__\b/g,
                                      function (e, t) {
                                          return r(t, "<strong>", "</strong>");
                                      }
                                  )).replace(
                                      /\b_(\S[\s\S]*?)_\b/g,
                                      function (e, t) {
                                          return r(t, "<em>", "</em>");
                                      }
                                  )
                                : (e = (e = e.replace(
                                      /___(\S[\s\S]*?)___/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(
                                                    t,
                                                    "<strong><em>",
                                                    "</em></strong>"
                                                )
                                              : e;
                                      }
                                  )).replace(
                                      /__(\S[\s\S]*?)__/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(t, "<strong>", "</strong>")
                                              : e;
                                      }
                                  )).replace(
                                      /_([^\s_][\s\S]*?)_/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(t, "<em>", "</em>")
                                              : e;
                                      }
                                  )),
                            (e = t.literalMidWordAsterisks
                                ? (e = (e = e.replace(
                                      /([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g,
                                      function (e, t, n) {
                                          return r(
                                              n,
                                              t + "<strong><em>",
                                              "</em></strong>"
                                          );
                                      }
                                  )).replace(
                                      /([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g,
                                      function (e, t, n) {
                                          return r(
                                              n,
                                              t + "<strong>",
                                              "</strong>"
                                          );
                                      }
                                  )).replace(
                                      /([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g,
                                      function (e, t, n) {
                                          return r(n, t + "<em>", "</em>");
                                      }
                                  )
                                : (e = (e = e.replace(
                                      /\*\*\*(\S[\s\S]*?)\*\*\*/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(
                                                    t,
                                                    "<strong><em>",
                                                    "</em></strong>"
                                                )
                                              : e;
                                      }
                                  )).replace(
                                      /\*\*(\S[\s\S]*?)\*\*/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(t, "<strong>", "</strong>")
                                              : e;
                                      }
                                  )).replace(
                                      /\*([^\s*][\s\S]*?)\*/g,
                                      function (e, t) {
                                          return /\S$/.test(t)
                                              ? r(t, "<em>", "</em>")
                                              : e;
                                      }
                                  )),
                            (e = n.converter._dispatch(
                                "italicsAndBold.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("lists", function (e, t, r) {
                        function a(e, a) {
                            r.gListLevel++, (e = e.replace(/\n{2,}$/, "\n"));
                            var i =
                                    /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
                                o = /\n[ \t]*\n(?!¨0)/.test((e += "¨0"));
                            return (
                                t.disableForced4SpacesIndentedSublists &&
                                    (i =
                                        /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm),
                                (e = (e = e.replace(
                                    i,
                                    function (e, a, i, s, l, c, u) {
                                        u = u && "" !== u.trim();
                                        var d = n.subParser("outdent")(l, t, r),
                                            p = "";
                                        return (
                                            c &&
                                                t.tasklists &&
                                                ((p =
                                                    ' class="task-list-item" style="list-style-type: none;"'),
                                                (d = d.replace(
                                                    /^[ \t]*\[(x|X| )?]/m,
                                                    function () {
                                                        var e =
                                                            '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                                                        return (
                                                            u &&
                                                                (e +=
                                                                    " checked"),
                                                            (e += ">")
                                                        );
                                                    }
                                                ))),
                                            (d = d.replace(
                                                /^([-*+]|\d\.)[ \t]+[\S\n ]*/g,
                                                function (e) {
                                                    return "¨A" + e;
                                                }
                                            )),
                                            a || d.search(/\n{2,}/) > -1
                                                ? ((d = n.subParser(
                                                      "githubCodeBlocks"
                                                  )(d, t, r)),
                                                  (d = n.subParser(
                                                      "blockGamut"
                                                  )(d, t, r)))
                                                : ((d = (d = n.subParser(
                                                      "lists"
                                                  )(d, t, r)).replace(
                                                      /\n$/,
                                                      ""
                                                  )),
                                                  (d = (d = n.subParser(
                                                      "hashHTMLBlocks"
                                                  )(d, t, r)).replace(
                                                      /\n\n+/g,
                                                      "\n\n"
                                                  )),
                                                  (d = o
                                                      ? n.subParser(
                                                            "paragraphs"
                                                        )(d, t, r)
                                                      : n.subParser(
                                                            "spanGamut"
                                                        )(d, t, r))),
                                            (d =
                                                "<li" +
                                                p +
                                                ">" +
                                                (d = d.replace("¨A", "")) +
                                                "</li>\n")
                                        );
                                    }
                                )).replace(/¨0/g, "")),
                                r.gListLevel--,
                                a && (e = e.replace(/\s+$/, "")),
                                e
                            );
                        }
                        function i(e, t) {
                            if ("ol" === t) {
                                var n = e.match(/^ *(\d+)\./);
                                if (n && "1" !== n[1])
                                    return ' start="' + n[1] + '"';
                            }
                            return "";
                        }
                        function o(e, n, r) {
                            var o = t.disableForced4SpacesIndentedSublists
                                    ? /^ ?\d+\.[ \t]/gm
                                    : /^ {0,3}\d+\.[ \t]/gm,
                                s = t.disableForced4SpacesIndentedSublists
                                    ? /^ ?[*+-][ \t]/gm
                                    : /^ {0,3}[*+-][ \t]/gm,
                                l = "ul" === n ? o : s,
                                c = "";
                            if (-1 !== e.search(l))
                                !(function t(u) {
                                    var d = u.search(l),
                                        p = i(e, n);
                                    -1 !== d
                                        ? ((c +=
                                              "\n\n<" +
                                              n +
                                              p +
                                              ">\n" +
                                              a(u.slice(0, d), !!r) +
                                              "</" +
                                              n +
                                              ">\n"),
                                          (l =
                                              "ul" ===
                                              (n = "ul" === n ? "ol" : "ul")
                                                  ? o
                                                  : s),
                                          t(u.slice(d)))
                                        : (c +=
                                              "\n\n<" +
                                              n +
                                              p +
                                              ">\n" +
                                              a(u, !!r) +
                                              "</" +
                                              n +
                                              ">\n");
                                })(e);
                            else {
                                var u = i(e, n);
                                c =
                                    "\n\n<" +
                                    n +
                                    u +
                                    ">\n" +
                                    a(e, !!r) +
                                    "</" +
                                    n +
                                    ">\n";
                            }
                            return c;
                        }
                        return (
                            (e = r.converter._dispatch(
                                "lists.before",
                                e,
                                t,
                                r
                            )),
                            (e += "¨0"),
                            (e = (e = r.gListLevel
                                ? e.replace(
                                      /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
                                      function (e, t, n) {
                                          return o(
                                              t,
                                              n.search(/[*+-]/g) > -1
                                                  ? "ul"
                                                  : "ol",
                                              !0
                                          );
                                      }
                                  )
                                : e.replace(
                                      /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
                                      function (e, t, n, r) {
                                          return o(
                                              n,
                                              r.search(/[*+-]/g) > -1
                                                  ? "ul"
                                                  : "ol",
                                              !1
                                          );
                                      }
                                  )).replace(/¨0/, "")),
                            (e = r.converter._dispatch("lists.after", e, t, r))
                        );
                    }),
                    n.subParser("metadata", function (e, t, n) {
                        if (!t.metadata) return e;
                        function r(e) {
                            (n.metadata.raw = e),
                                (e = (e = e
                                    .replace(/&/g, "&amp;")
                                    .replace(/"/g, "&quot;")).replace(
                                    /\n {4}/g,
                                    " "
                                )).replace(
                                    /^([\S ]+): +([\s\S]+?)$/gm,
                                    function (e, t, r) {
                                        return (n.metadata.parsed[t] = r), "";
                                    }
                                );
                        }
                        return (
                            (e = (e = (e = (e = n.converter._dispatch(
                                "metadata.before",
                                e,
                                t,
                                n
                            )).replace(
                                /^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/,
                                function (e, t, n) {
                                    return r(n), "¨M";
                                }
                            )).replace(
                                /^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/,
                                function (e, t, a) {
                                    return (
                                        t && (n.metadata.format = t), r(a), "¨M"
                                    );
                                }
                            )).replace(/¨M/g, "")),
                            (e = n.converter._dispatch(
                                "metadata.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("outdent", function (e, t, n) {
                        return (
                            (e = (e = (e = n.converter._dispatch(
                                "outdent.before",
                                e,
                                t,
                                n
                            )).replace(/^(\t|[ ]{1,4})/gm, "¨0")).replace(
                                /¨0/g,
                                ""
                            )),
                            (e = n.converter._dispatch(
                                "outdent.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("paragraphs", function (e, t, r) {
                        for (
                            var a = (e = (e = (e = r.converter._dispatch(
                                    "paragraphs.before",
                                    e,
                                    t,
                                    r
                                )).replace(/^\n+/g, "")).replace(
                                    /\n+$/g,
                                    ""
                                )).split(/\n{2,}/g),
                                i = [],
                                o = a.length,
                                s = 0;
                            s < o;
                            s++
                        ) {
                            var l = a[s];
                            l.search(/¨(K|G)(\d+)\1/g) >= 0
                                ? i.push(l)
                                : l.search(/\S/) >= 0 &&
                                  ((l = (l = n.subParser("spanGamut")(
                                      l,
                                      t,
                                      r
                                  )).replace(/^([ \t]*)/g, "<p>")),
                                  (l += "</p>"),
                                  i.push(l));
                        }
                        for (o = i.length, s = 0; s < o; s++) {
                            for (
                                var c = "", u = i[s], d = !1;
                                /¨(K|G)(\d+)\1/.test(u);

                            ) {
                                var p = RegExp.$1,
                                    h = RegExp.$2;
                                (c = (c =
                                    "K" === p
                                        ? r.gHtmlBlocks[h]
                                        : d
                                        ? n.subParser("encodeCode")(
                                              r.ghCodeBlocks[h].text,
                                              t,
                                              r
                                          )
                                        : r.ghCodeBlocks[h].codeblock).replace(
                                    /\$/g,
                                    "$$$$"
                                )),
                                    (u = u.replace(
                                        /(\n\n)?¨(K|G)\d+\2(\n\n)?/,
                                        c
                                    )),
                                    /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) &&
                                        (d = !0);
                            }
                            i[s] = u;
                        }
                        return (
                            (e = (e = (e = i.join("\n")).replace(
                                /^\n+/g,
                                ""
                            )).replace(/\n+$/g, "")),
                            r.converter._dispatch("paragraphs.after", e, t, r)
                        );
                    }),
                    n.subParser("runExtension", function (e, t, n, r) {
                        if (e.filter) t = e.filter(t, r.converter, n);
                        else if (e.regex) {
                            var a = e.regex;
                            a instanceof RegExp || (a = new RegExp(a, "g")),
                                (t = t.replace(a, e.replace));
                        }
                        return t;
                    }),
                    n.subParser("spanGamut", function (e, t, r) {
                        return (
                            (e = r.converter._dispatch(
                                "spanGamut.before",
                                e,
                                t,
                                r
                            )),
                            (e = n.subParser("codeSpans")(e, t, r)),
                            (e = n.subParser(
                                "escapeSpecialCharsWithinTagAttributes"
                            )(e, t, r)),
                            (e = n.subParser("encodeBackslashEscapes")(
                                e,
                                t,
                                r
                            )),
                            (e = n.subParser("images")(e, t, r)),
                            (e = n.subParser("anchors")(e, t, r)),
                            (e = n.subParser("autoLinks")(e, t, r)),
                            (e = n.subParser("simplifiedAutoLinks")(e, t, r)),
                            (e = n.subParser("emoji")(e, t, r)),
                            (e = n.subParser("underline")(e, t, r)),
                            (e = n.subParser("italicsAndBold")(e, t, r)),
                            (e = n.subParser("strikethrough")(e, t, r)),
                            (e = n.subParser("ellipsis")(e, t, r)),
                            (e = n.subParser("hashHTMLSpans")(e, t, r)),
                            (e = n.subParser("encodeAmpsAndAngles")(e, t, r)),
                            t.simpleLineBreaks
                                ? /\n\n¨K/.test(e) ||
                                  (e = e.replace(/\n+/g, "<br />\n"))
                                : (e = e.replace(/  +\n/g, "<br />\n")),
                            (e = r.converter._dispatch(
                                "spanGamut.after",
                                e,
                                t,
                                r
                            ))
                        );
                    }),
                    n.subParser("strikethrough", function (e, t, r) {
                        return (
                            t.strikethrough &&
                                ((e = (e = r.converter._dispatch(
                                    "strikethrough.before",
                                    e,
                                    t,
                                    r
                                )).replace(
                                    /(?:~){2}([\s\S]+?)(?:~){2}/g,
                                    function (e, a) {
                                        return (function (e) {
                                            return (
                                                t.simplifiedAutoLink &&
                                                    (e = n.subParser(
                                                        "simplifiedAutoLinks"
                                                    )(e, t, r)),
                                                "<del>" + e + "</del>"
                                            );
                                        })(a);
                                    }
                                )),
                                (e = r.converter._dispatch(
                                    "strikethrough.after",
                                    e,
                                    t,
                                    r
                                ))),
                            e
                        );
                    }),
                    n.subParser("stripLinkDefinitions", function (e, t, r) {
                        var a = function (e, a, i, o, s, l, c) {
                            return (
                                (a = a.toLowerCase()),
                                i.match(/^data:.+?\/.+?;base64,/)
                                    ? (r.gUrls[a] = i.replace(/\s/g, ""))
                                    : (r.gUrls[a] = n.subParser(
                                          "encodeAmpsAndAngles"
                                      )(i, t, r)),
                                l
                                    ? l + c
                                    : (c &&
                                          (r.gTitles[a] = c.replace(
                                              /"|'/g,
                                              "&quot;"
                                          )),
                                      t.parseImgDimensions &&
                                          o &&
                                          s &&
                                          (r.gDimensions[a] = {
                                              width: o,
                                              height: s,
                                          }),
                                      "")
                            );
                        };
                        return (e = (e = (e = (e += "¨0").replace(
                            /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm,
                            a
                        )).replace(
                            /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
                            a
                        )).replace(/¨0/, ""));
                    }),
                    n.subParser("tables", function (e, t, r) {
                        if (!t.tables) return e;
                        function a(e, a) {
                            return (
                                "<td" +
                                a +
                                ">" +
                                n.subParser("spanGamut")(e, t, r) +
                                "</td>\n"
                            );
                        }
                        function i(e) {
                            var i,
                                o = e.split("\n");
                            for (i = 0; i < o.length; ++i)
                                /^ {0,3}\|/.test(o[i]) &&
                                    (o[i] = o[i].replace(/^ {0,3}\|/, "")),
                                    /\|[ \t]*$/.test(o[i]) &&
                                        (o[i] = o[i].replace(/\|[ \t]*$/, "")),
                                    (o[i] = n.subParser("codeSpans")(
                                        o[i],
                                        t,
                                        r
                                    ));
                            var s,
                                l,
                                c,
                                u,
                                d = o[0].split("|").map(function (e) {
                                    return e.trim();
                                }),
                                p = o[1].split("|").map(function (e) {
                                    return e.trim();
                                }),
                                h = [],
                                g = [],
                                f = [],
                                m = [];
                            for (o.shift(), o.shift(), i = 0; i < o.length; ++i)
                                "" !== o[i].trim() &&
                                    h.push(
                                        o[i].split("|").map(function (e) {
                                            return e.trim();
                                        })
                                    );
                            if (d.length < p.length) return e;
                            for (i = 0; i < p.length; ++i)
                                f.push(
                                    ((s = p[i]),
                                    /^:[ \t]*--*$/.test(s)
                                        ? ' style="text-align:left;"'
                                        : /^--*[ \t]*:[ \t]*$/.test(s)
                                        ? ' style="text-align:right;"'
                                        : /^:[ \t]*--*[ \t]*:$/.test(s)
                                        ? ' style="text-align:center;"'
                                        : "")
                                );
                            for (i = 0; i < d.length; ++i)
                                n.helper.isUndefined(f[i]) && (f[i] = ""),
                                    g.push(
                                        ((l = d[i]),
                                        (c = f[i]),
                                        (u = void 0),
                                        (u = ""),
                                        (l = l.trim()),
                                        (t.tablesHeaderId || t.tableHeaderId) &&
                                            (u =
                                                ' id="' +
                                                l
                                                    .replace(/ /g, "_")
                                                    .toLowerCase() +
                                                '"'),
                                        "<th" +
                                            u +
                                            c +
                                            ">" +
                                            (l = n.subParser("spanGamut")(
                                                l,
                                                t,
                                                r
                                            )) +
                                            "</th>\n")
                                    );
                            for (i = 0; i < h.length; ++i) {
                                for (var b = [], _ = 0; _ < g.length; ++_)
                                    n.helper.isUndefined(h[i][_]),
                                        b.push(a(h[i][_], f[_]));
                                m.push(b);
                            }
                            return (function (e, t) {
                                for (
                                    var n = "<table>\n<thead>\n<tr>\n",
                                        r = e.length,
                                        a = 0;
                                    a < r;
                                    ++a
                                )
                                    n += e[a];
                                for (
                                    n += "</tr>\n</thead>\n<tbody>\n", a = 0;
                                    a < t.length;
                                    ++a
                                ) {
                                    n += "<tr>\n";
                                    for (var i = 0; i < r; ++i) n += t[a][i];
                                    n += "</tr>\n";
                                }
                                return (n += "</tbody>\n</table>\n");
                            })(g, m);
                        }
                        return (
                            (e = (e = (e = (e = r.converter._dispatch(
                                "tables.before",
                                e,
                                t,
                                r
                            )).replace(
                                /\\(\|)/g,
                                n.helper.escapeCharactersCallback
                            )).replace(
                                /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
                                i
                            )).replace(
                                /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm,
                                i
                            )),
                            (e = r.converter._dispatch("tables.after", e, t, r))
                        );
                    }),
                    n.subParser("underline", function (e, t, r) {
                        return t.underline
                            ? ((e = r.converter._dispatch(
                                  "underline.before",
                                  e,
                                  t,
                                  r
                              )),
                              (e = (e = t.literalMidWordUnderscores
                                  ? (e = e.replace(
                                        /\b___(\S[\s\S]*?)___\b/g,
                                        function (e, t) {
                                            return "<u>" + t + "</u>";
                                        }
                                    )).replace(
                                        /\b__(\S[\s\S]*?)__\b/g,
                                        function (e, t) {
                                            return "<u>" + t + "</u>";
                                        }
                                    )
                                  : (e = e.replace(
                                        /___(\S[\s\S]*?)___/g,
                                        function (e, t) {
                                            return /\S$/.test(t)
                                                ? "<u>" + t + "</u>"
                                                : e;
                                        }
                                    )).replace(
                                        /__(\S[\s\S]*?)__/g,
                                        function (e, t) {
                                            return /\S$/.test(t)
                                                ? "<u>" + t + "</u>"
                                                : e;
                                        }
                                    )).replace(
                                  /(_)/g,
                                  n.helper.escapeCharactersCallback
                              )),
                              (e = r.converter._dispatch(
                                  "underline.after",
                                  e,
                                  t,
                                  r
                              )))
                            : e;
                    }),
                    n.subParser("unescapeSpecialChars", function (e, t, n) {
                        return (
                            (e = (e = n.converter._dispatch(
                                "unescapeSpecialChars.before",
                                e,
                                t,
                                n
                            )).replace(/¨E(\d+)E/g, function (e, t) {
                                var n = parseInt(t);
                                return String.fromCharCode(n);
                            })),
                            (e = n.converter._dispatch(
                                "unescapeSpecialChars.after",
                                e,
                                t,
                                n
                            ))
                        );
                    }),
                    n.subParser("makeMarkdown.blockquote", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes())
                            for (
                                var a = e.childNodes, i = a.length, o = 0;
                                o < i;
                                ++o
                            ) {
                                var s = n.subParser("makeMarkdown.node")(
                                    a[o],
                                    t
                                );
                                "" !== s && (r += s);
                            }
                        return (r =
                            "> " + (r = r.trim()).split("\n").join("\n> "));
                    }),
                    n.subParser("makeMarkdown.codeBlock", function (e, t) {
                        var n = e.getAttribute("language"),
                            r = e.getAttribute("precodenum");
                        return "```" + n + "\n" + t.preList[r] + "\n```";
                    }),
                    n.subParser("makeMarkdown.codeSpan", function (e) {
                        return "`" + e.innerHTML + "`";
                    }),
                    n.subParser("makeMarkdown.emphasis", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes()) {
                            r += "*";
                            for (
                                var a = e.childNodes, i = a.length, o = 0;
                                o < i;
                                ++o
                            )
                                r += n.subParser("makeMarkdown.node")(a[o], t);
                            r += "*";
                        }
                        return r;
                    }),
                    n.subParser("makeMarkdown.header", function (e, t, r) {
                        var a = new Array(r + 1).join("#"),
                            i = "";
                        if (e.hasChildNodes()) {
                            i = a + " ";
                            for (
                                var o = e.childNodes, s = o.length, l = 0;
                                l < s;
                                ++l
                            )
                                i += n.subParser("makeMarkdown.node")(o[l], t);
                        }
                        return i;
                    }),
                    n.subParser("makeMarkdown.hr", function () {
                        return "---";
                    }),
                    n.subParser("makeMarkdown.image", function (e) {
                        var t = "";
                        return (
                            e.hasAttribute("src") &&
                                ((t += "![" + e.getAttribute("alt") + "]("),
                                (t += "<" + e.getAttribute("src") + ">"),
                                e.hasAttribute("width") &&
                                    e.hasAttribute("height") &&
                                    (t +=
                                        " =" +
                                        e.getAttribute("width") +
                                        "x" +
                                        e.getAttribute("height")),
                                e.hasAttribute("title") &&
                                    (t += ' "' + e.getAttribute("title") + '"'),
                                (t += ")")),
                            t
                        );
                    }),
                    n.subParser("makeMarkdown.links", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes() && e.hasAttribute("href")) {
                            var a = e.childNodes,
                                i = a.length;
                            r = "[";
                            for (var o = 0; o < i; ++o)
                                r += n.subParser("makeMarkdown.node")(a[o], t);
                            (r += "]("),
                                (r += "<" + e.getAttribute("href") + ">"),
                                e.hasAttribute("title") &&
                                    (r += ' "' + e.getAttribute("title") + '"'),
                                (r += ")");
                        }
                        return r;
                    }),
                    n.subParser("makeMarkdown.list", function (e, t, r) {
                        var a = "";
                        if (!e.hasChildNodes()) return "";
                        for (
                            var i = e.childNodes,
                                o = i.length,
                                s = e.getAttribute("start") || 1,
                                l = 0;
                            l < o;
                            ++l
                        )
                            if (
                                void 0 !== i[l].tagName &&
                                "li" === i[l].tagName.toLowerCase()
                            ) {
                                (a +=
                                    ("ol" === r ? s.toString() + ". " : "- ") +
                                    n.subParser("makeMarkdown.listItem")(
                                        i[l],
                                        t
                                    )),
                                    ++s;
                            }
                        return (a += "\n\x3c!-- --\x3e\n").trim();
                    }),
                    n.subParser("makeMarkdown.listItem", function (e, t) {
                        for (
                            var r = "", a = e.childNodes, i = a.length, o = 0;
                            o < i;
                            ++o
                        )
                            r += n.subParser("makeMarkdown.node")(a[o], t);
                        return (
                            /\n$/.test(r)
                                ? (r = r
                                      .split("\n")
                                      .join("\n    ")
                                      .replace(/^ {4}$/gm, "")
                                      .replace(/\n\n+/g, "\n\n"))
                                : (r += "\n"),
                            r
                        );
                    }),
                    n.subParser("makeMarkdown.node", function (e, t, r) {
                        r = r || !1;
                        var a = "";
                        if (3 === e.nodeType)
                            return n.subParser("makeMarkdown.txt")(e, t);
                        if (8 === e.nodeType)
                            return "\x3c!--" + e.data + "--\x3e\n\n";
                        if (1 !== e.nodeType) return "";
                        switch (e.tagName.toLowerCase()) {
                            case "h1":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            1
                                        ) + "\n\n");
                                break;
                            case "h2":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            2
                                        ) + "\n\n");
                                break;
                            case "h3":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            3
                                        ) + "\n\n");
                                break;
                            case "h4":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            4
                                        ) + "\n\n");
                                break;
                            case "h5":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            5
                                        ) + "\n\n");
                                break;
                            case "h6":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.header")(
                                            e,
                                            t,
                                            6
                                        ) + "\n\n");
                                break;
                            case "p":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.paragraph")(
                                            e,
                                            t
                                        ) + "\n\n");
                                break;
                            case "blockquote":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.blockquote")(
                                            e,
                                            t
                                        ) + "\n\n");
                                break;
                            case "hr":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.hr")(e, t) +
                                        "\n\n");
                                break;
                            case "ol":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.list")(
                                            e,
                                            t,
                                            "ol"
                                        ) + "\n\n");
                                break;
                            case "ul":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.list")(
                                            e,
                                            t,
                                            "ul"
                                        ) + "\n\n");
                                break;
                            case "precode":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.codeBlock")(
                                            e,
                                            t
                                        ) + "\n\n");
                                break;
                            case "pre":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.pre")(e, t) +
                                        "\n\n");
                                break;
                            case "table":
                                r ||
                                    (a =
                                        n.subParser("makeMarkdown.table")(
                                            e,
                                            t
                                        ) + "\n\n");
                                break;
                            case "code":
                                a = n.subParser("makeMarkdown.codeSpan")(e, t);
                                break;
                            case "em":
                            case "i":
                                a = n.subParser("makeMarkdown.emphasis")(e, t);
                                break;
                            case "strong":
                            case "b":
                                a = n.subParser("makeMarkdown.strong")(e, t);
                                break;
                            case "del":
                                a = n.subParser("makeMarkdown.strikethrough")(
                                    e,
                                    t
                                );
                                break;
                            case "a":
                                a = n.subParser("makeMarkdown.links")(e, t);
                                break;
                            case "img":
                                a = n.subParser("makeMarkdown.image")(e, t);
                                break;
                            default:
                                a = e.outerHTML + "\n\n";
                        }
                        return a;
                    }),
                    n.subParser("makeMarkdown.paragraph", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes())
                            for (
                                var a = e.childNodes, i = a.length, o = 0;
                                o < i;
                                ++o
                            )
                                r += n.subParser("makeMarkdown.node")(a[o], t);
                        return (r = r.trim());
                    }),
                    n.subParser("makeMarkdown.pre", function (e, t) {
                        var n = e.getAttribute("prenum");
                        return "<pre>" + t.preList[n] + "</pre>";
                    }),
                    n.subParser("makeMarkdown.strikethrough", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes()) {
                            r += "~~";
                            for (
                                var a = e.childNodes, i = a.length, o = 0;
                                o < i;
                                ++o
                            )
                                r += n.subParser("makeMarkdown.node")(a[o], t);
                            r += "~~";
                        }
                        return r;
                    }),
                    n.subParser("makeMarkdown.strong", function (e, t) {
                        var r = "";
                        if (e.hasChildNodes()) {
                            r += "**";
                            for (
                                var a = e.childNodes, i = a.length, o = 0;
                                o < i;
                                ++o
                            )
                                r += n.subParser("makeMarkdown.node")(a[o], t);
                            r += "**";
                        }
                        return r;
                    }),
                    n.subParser("makeMarkdown.table", function (e, t) {
                        var r,
                            a,
                            i = "",
                            o = [[], []],
                            s = e.querySelectorAll("thead>tr>th"),
                            l = e.querySelectorAll("tbody>tr");
                        for (r = 0; r < s.length; ++r) {
                            var c = n.subParser("makeMarkdown.tableCell")(
                                    s[r],
                                    t
                                ),
                                u = "---";
                            if (s[r].hasAttribute("style"))
                                switch (
                                    s[r]
                                        .getAttribute("style")
                                        .toLowerCase()
                                        .replace(/\s/g, "")
                                ) {
                                    case "text-align:left;":
                                        u = ":---";
                                        break;
                                    case "text-align:right;":
                                        u = "---:";
                                        break;
                                    case "text-align:center;":
                                        u = ":---:";
                                }
                            (o[0][r] = c.trim()), (o[1][r] = u);
                        }
                        for (r = 0; r < l.length; ++r) {
                            var d = o.push([]) - 1,
                                p = l[r].getElementsByTagName("td");
                            for (a = 0; a < s.length; ++a) {
                                var h = " ";
                                void 0 !== p[a] &&
                                    (h = n.subParser("makeMarkdown.tableCell")(
                                        p[a],
                                        t
                                    )),
                                    o[d].push(h);
                            }
                        }
                        var g = 3;
                        for (r = 0; r < o.length; ++r)
                            for (a = 0; a < o[r].length; ++a) {
                                var f = o[r][a].length;
                                f > g && (g = f);
                            }
                        for (r = 0; r < o.length; ++r) {
                            for (a = 0; a < o[r].length; ++a)
                                1 === r
                                    ? ":" === o[r][a].slice(-1)
                                        ? (o[r][a] =
                                              n.helper.padEnd(
                                                  o[r][a].slice(-1),
                                                  g - 1,
                                                  "-"
                                              ) + ":")
                                        : (o[r][a] = n.helper.padEnd(
                                              o[r][a],
                                              g,
                                              "-"
                                          ))
                                    : (o[r][a] = n.helper.padEnd(o[r][a], g));
                            i += "| " + o[r].join(" | ") + " |\n";
                        }
                        return i.trim();
                    }),
                    n.subParser("makeMarkdown.tableCell", function (e, t) {
                        var r = "";
                        if (!e.hasChildNodes()) return "";
                        for (
                            var a = e.childNodes, i = a.length, o = 0;
                            o < i;
                            ++o
                        )
                            r += n.subParser("makeMarkdown.node")(a[o], t, !0);
                        return r.trim();
                    }),
                    n.subParser("makeMarkdown.txt", function (e) {
                        var t = e.nodeValue;
                        return (
                            (t = (t = t.replace(/ +/g, " ")).replace(
                                /¨NBSP;/g,
                                " "
                            )),
                            (t = (t = (t = (t = (t = (t = (t = (t = (t =
                                n.helper.unescapeHTMLEntities(t)).replace(
                                /([*_~|`])/g,
                                "\\$1"
                            )).replace(/^(\s*)>/g, "\\$1>")).replace(
                                /^#/gm,
                                "\\#"
                            )).replace(
                                /^(\s*)([-=]{3,})(\s*)$/,
                                "$1\\$2$3"
                            )).replace(/^( {0,3}\d+)\./gm, "$1\\.")).replace(
                                /^( {0,3})([+-])/gm,
                                "$1\\$2"
                            )).replace(/]([\s]*)\(/g, "\\]$1\\(")).replace(
                                /^ {0,3}\[([\S \t]*?)]:/gm,
                                "\\[$1]:"
                            ))
                        );
                    });
                e.exports ? (e.exports = n) : (this.showdown = n);
            }).call(Pt);
        }),
        Bt = Rt(function (e, t) {
            /*!
             * clipboard.js v2.0.8
             * https://clipboardjs.com/
             *
             * Licensed MIT © Zeno Rocha
             */
            var n;
            (n = function () {
                return (function () {
                    var e = {
                            134: function (e, t, n) {
                                n.d(t, {
                                    default: function () {
                                        return w;
                                    },
                                });
                                var r = n(279),
                                    a = n.n(r),
                                    i = n(370),
                                    o = n.n(i),
                                    s = n(817),
                                    l = n.n(s);
                                function c(e) {
                                    return (c =
                                        "function" == typeof Symbol &&
                                        "symbol" == typeof Symbol.iterator
                                            ? function (e) {
                                                  return typeof e;
                                              }
                                            : function (e) {
                                                  return e &&
                                                      "function" ==
                                                          typeof Symbol &&
                                                      e.constructor ===
                                                          Symbol &&
                                                      e !== Symbol.prototype
                                                      ? "symbol"
                                                      : typeof e;
                                              })(e);
                                }
                                function u(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                var d = (function () {
                                    function e(t) {
                                        !(function (e, t) {
                                            if (!(e instanceof t))
                                                throw new TypeError(
                                                    "Cannot call a class as a function"
                                                );
                                        })(this, e),
                                            this.resolveOptions(t),
                                            this.initSelection();
                                    }
                                    var t, n, r;
                                    return (
                                        (t = e),
                                        (n = [
                                            {
                                                key: "resolveOptions",
                                                value: function () {
                                                    var e =
                                                        arguments.length > 0 &&
                                                        void 0 !== arguments[0]
                                                            ? arguments[0]
                                                            : {};
                                                    (this.action = e.action),
                                                        (this.container =
                                                            e.container),
                                                        (this.emitter =
                                                            e.emitter),
                                                        (this.target =
                                                            e.target),
                                                        (this.text = e.text),
                                                        (this.trigger =
                                                            e.trigger),
                                                        (this.selectedText =
                                                            "");
                                                },
                                            },
                                            {
                                                key: "initSelection",
                                                value: function () {
                                                    this.text
                                                        ? this.selectFake()
                                                        : this.target &&
                                                          this.selectTarget();
                                                },
                                            },
                                            {
                                                key: "createFakeElement",
                                                value: function () {
                                                    var e =
                                                        "rtl" ===
                                                        document.documentElement.getAttribute(
                                                            "dir"
                                                        );
                                                    (this.fakeElem =
                                                        document.createElement(
                                                            "textarea"
                                                        )),
                                                        (this.fakeElem.style.fontSize =
                                                            "12pt"),
                                                        (this.fakeElem.style.border =
                                                            "0"),
                                                        (this.fakeElem.style.padding =
                                                            "0"),
                                                        (this.fakeElem.style.margin =
                                                            "0"),
                                                        (this.fakeElem.style.position =
                                                            "absolute"),
                                                        (this.fakeElem.style[
                                                            e ? "right" : "left"
                                                        ] = "-9999px");
                                                    var t =
                                                        window.pageYOffset ||
                                                        document.documentElement
                                                            .scrollTop;
                                                    return (
                                                        (this.fakeElem.style.top =
                                                            "".concat(t, "px")),
                                                        this.fakeElem.setAttribute(
                                                            "readonly",
                                                            ""
                                                        ),
                                                        (this.fakeElem.value =
                                                            this.text),
                                                        this.fakeElem
                                                    );
                                                },
                                            },
                                            {
                                                key: "selectFake",
                                                value: function () {
                                                    var e = this,
                                                        t =
                                                            this.createFakeElement();
                                                    (this.fakeHandlerCallback =
                                                        function () {
                                                            return e.removeFake();
                                                        }),
                                                        (this.fakeHandler =
                                                            this.container.addEventListener(
                                                                "click",
                                                                this
                                                                    .fakeHandlerCallback
                                                            ) || !0),
                                                        this.container.appendChild(
                                                            t
                                                        ),
                                                        (this.selectedText =
                                                            l()(t)),
                                                        this.copyText(),
                                                        this.removeFake();
                                                },
                                            },
                                            {
                                                key: "removeFake",
                                                value: function () {
                                                    this.fakeHandler &&
                                                        (this.container.removeEventListener(
                                                            "click",
                                                            this
                                                                .fakeHandlerCallback
                                                        ),
                                                        (this.fakeHandler =
                                                            null),
                                                        (this.fakeHandlerCallback =
                                                            null)),
                                                        this.fakeElem &&
                                                            (this.container.removeChild(
                                                                this.fakeElem
                                                            ),
                                                            (this.fakeElem =
                                                                null));
                                                },
                                            },
                                            {
                                                key: "selectTarget",
                                                value: function () {
                                                    (this.selectedText = l()(
                                                        this.target
                                                    )),
                                                        this.copyText();
                                                },
                                            },
                                            {
                                                key: "copyText",
                                                value: function () {
                                                    var e;
                                                    try {
                                                        e =
                                                            document.execCommand(
                                                                this.action
                                                            );
                                                    } catch (t) {
                                                        e = !1;
                                                    }
                                                    this.handleResult(e);
                                                },
                                            },
                                            {
                                                key: "handleResult",
                                                value: function (e) {
                                                    this.emitter.emit(
                                                        e ? "success" : "error",
                                                        {
                                                            action: this.action,
                                                            text: this
                                                                .selectedText,
                                                            trigger:
                                                                this.trigger,
                                                            clearSelection:
                                                                this.clearSelection.bind(
                                                                    this
                                                                ),
                                                        }
                                                    );
                                                },
                                            },
                                            {
                                                key: "clearSelection",
                                                value: function () {
                                                    this.trigger &&
                                                        this.trigger.focus(),
                                                        document.activeElement.blur(),
                                                        window
                                                            .getSelection()
                                                            .removeAllRanges();
                                                },
                                            },
                                            {
                                                key: "destroy",
                                                value: function () {
                                                    this.removeFake();
                                                },
                                            },
                                            {
                                                key: "action",
                                                set: function () {
                                                    var e =
                                                        arguments.length > 0 &&
                                                        void 0 !== arguments[0]
                                                            ? arguments[0]
                                                            : "copy";
                                                    if (
                                                        ((this._action = e),
                                                        "copy" !==
                                                            this._action &&
                                                            "cut" !==
                                                                this._action)
                                                    )
                                                        throw new Error(
                                                            'Invalid "action" value, use either "copy" or "cut"'
                                                        );
                                                },
                                                get: function () {
                                                    return this._action;
                                                },
                                            },
                                            {
                                                key: "target",
                                                set: function (e) {
                                                    if (void 0 !== e) {
                                                        if (
                                                            !e ||
                                                            "object" !== c(e) ||
                                                            1 !== e.nodeType
                                                        )
                                                            throw new Error(
                                                                'Invalid "target" value, use a valid Element'
                                                            );
                                                        if (
                                                            "copy" ===
                                                                this.action &&
                                                            e.hasAttribute(
                                                                "disabled"
                                                            )
                                                        )
                                                            throw new Error(
                                                                'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                                                            );
                                                        if (
                                                            "cut" ===
                                                                this.action &&
                                                            (e.hasAttribute(
                                                                "readonly"
                                                            ) ||
                                                                e.hasAttribute(
                                                                    "disabled"
                                                                ))
                                                        )
                                                            throw new Error(
                                                                'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                                                            );
                                                        this._target = e;
                                                    }
                                                },
                                                get: function () {
                                                    return this._target;
                                                },
                                            },
                                        ]) && u(t.prototype, n),
                                        r && u(t, r),
                                        e
                                    );
                                })();
                                function p(e) {
                                    return (p =
                                        "function" == typeof Symbol &&
                                        "symbol" == typeof Symbol.iterator
                                            ? function (e) {
                                                  return typeof e;
                                              }
                                            : function (e) {
                                                  return e &&
                                                      "function" ==
                                                          typeof Symbol &&
                                                      e.constructor ===
                                                          Symbol &&
                                                      e !== Symbol.prototype
                                                      ? "symbol"
                                                      : typeof e;
                                              })(e);
                                }
                                function h(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                function g(e, t) {
                                    return (g =
                                        Object.setPrototypeOf ||
                                        function (e, t) {
                                            return (e.__proto__ = t), e;
                                        })(e, t);
                                }
                                function f(e) {
                                    var t = (function () {
                                        if (
                                            "undefined" == typeof Reflect ||
                                            !Reflect.construct
                                        )
                                            return !1;
                                        if (Reflect.construct.sham) return !1;
                                        if ("function" == typeof Proxy)
                                            return !0;
                                        try {
                                            return (
                                                Date.prototype.toString.call(
                                                    Reflect.construct(
                                                        Date,
                                                        [],
                                                        function () {}
                                                    )
                                                ),
                                                !0
                                            );
                                        } catch (e) {
                                            return !1;
                                        }
                                    })();
                                    return function () {
                                        var n,
                                            r = b(e);
                                        if (t) {
                                            var a = b(this).constructor;
                                            n = Reflect.construct(
                                                r,
                                                arguments,
                                                a
                                            );
                                        } else n = r.apply(this, arguments);
                                        return m(this, n);
                                    };
                                }
                                function m(e, t) {
                                    return !t ||
                                        ("object" !== p(t) &&
                                            "function" != typeof t)
                                        ? (function (e) {
                                              if (void 0 === e)
                                                  throw new ReferenceError(
                                                      "this hasn't been initialised - super() hasn't been called"
                                                  );
                                              return e;
                                          })(e)
                                        : t;
                                }
                                function b(e) {
                                    return (b = Object.setPrototypeOf
                                        ? Object.getPrototypeOf
                                        : function (e) {
                                              return (
                                                  e.__proto__ ||
                                                  Object.getPrototypeOf(e)
                                              );
                                          })(e);
                                }
                                function _(e, t) {
                                    var n = "data-clipboard-".concat(e);
                                    if (t.hasAttribute(n))
                                        return t.getAttribute(n);
                                }
                                var w = (function (e) {
                                    !(function (e, t) {
                                        if (
                                            "function" != typeof t &&
                                            null !== t
                                        )
                                            throw new TypeError(
                                                "Super expression must either be null or a function"
                                            );
                                        (e.prototype = Object.create(
                                            t && t.prototype,
                                            {
                                                constructor: {
                                                    value: e,
                                                    writable: !0,
                                                    configurable: !0,
                                                },
                                            }
                                        )),
                                            t && g(e, t);
                                    })(i, e);
                                    var t,
                                        n,
                                        r,
                                        a = f(i);
                                    function i(e, t) {
                                        var n;
                                        return (
                                            (function (e, t) {
                                                if (!(e instanceof t))
                                                    throw new TypeError(
                                                        "Cannot call a class as a function"
                                                    );
                                            })(this, i),
                                            (n = a.call(this)).resolveOptions(
                                                t
                                            ),
                                            n.listenClick(e),
                                            n
                                        );
                                    }
                                    return (
                                        (t = i),
                                        (r = [
                                            {
                                                key: "isSupported",
                                                value: function () {
                                                    var e =
                                                            arguments.length >
                                                                0 &&
                                                            void 0 !==
                                                                arguments[0]
                                                                ? arguments[0]
                                                                : [
                                                                      "copy",
                                                                      "cut",
                                                                  ],
                                                        t =
                                                            "string" == typeof e
                                                                ? [e]
                                                                : e,
                                                        n =
                                                            !!document.queryCommandSupported;
                                                    return (
                                                        t.forEach(function (e) {
                                                            n =
                                                                n &&
                                                                !!document.queryCommandSupported(
                                                                    e
                                                                );
                                                        }),
                                                        n
                                                    );
                                                },
                                            },
                                        ]),
                                        (n = [
                                            {
                                                key: "resolveOptions",
                                                value: function () {
                                                    var e =
                                                        arguments.length > 0 &&
                                                        void 0 !== arguments[0]
                                                            ? arguments[0]
                                                            : {};
                                                    (this.action =
                                                        "function" ==
                                                        typeof e.action
                                                            ? e.action
                                                            : this
                                                                  .defaultAction),
                                                        (this.target =
                                                            "function" ==
                                                            typeof e.target
                                                                ? e.target
                                                                : this
                                                                      .defaultTarget),
                                                        (this.text =
                                                            "function" ==
                                                            typeof e.text
                                                                ? e.text
                                                                : this
                                                                      .defaultText),
                                                        (this.container =
                                                            "object" ===
                                                            p(e.container)
                                                                ? e.container
                                                                : document.body);
                                                },
                                            },
                                            {
                                                key: "listenClick",
                                                value: function (e) {
                                                    var t = this;
                                                    this.listener = o()(
                                                        e,
                                                        "click",
                                                        function (e) {
                                                            return t.onClick(e);
                                                        }
                                                    );
                                                },
                                            },
                                            {
                                                key: "onClick",
                                                value: function (e) {
                                                    var t =
                                                        e.delegateTarget ||
                                                        e.currentTarget;
                                                    this.clipboardAction &&
                                                        (this.clipboardAction =
                                                            null),
                                                        (this.clipboardAction =
                                                            new d({
                                                                action: this.action(
                                                                    t
                                                                ),
                                                                target: this.target(
                                                                    t
                                                                ),
                                                                text: this.text(
                                                                    t
                                                                ),
                                                                container:
                                                                    this
                                                                        .container,
                                                                trigger: t,
                                                                emitter: this,
                                                            }));
                                                },
                                            },
                                            {
                                                key: "defaultAction",
                                                value: function (e) {
                                                    return _("action", e);
                                                },
                                            },
                                            {
                                                key: "defaultTarget",
                                                value: function (e) {
                                                    var t = _("target", e);
                                                    if (t)
                                                        return document.querySelector(
                                                            t
                                                        );
                                                },
                                            },
                                            {
                                                key: "defaultText",
                                                value: function (e) {
                                                    return _("text", e);
                                                },
                                            },
                                            {
                                                key: "destroy",
                                                value: function () {
                                                    this.listener.destroy(),
                                                        this.clipboardAction &&
                                                            (this.clipboardAction.destroy(),
                                                            (this.clipboardAction =
                                                                null));
                                                },
                                            },
                                        ]) && h(t.prototype, n),
                                        r && h(t, r),
                                        i
                                    );
                                })(a());
                            },
                            828: function (e) {
                                if (
                                    "undefined" != typeof Element &&
                                    !Element.prototype.matches
                                ) {
                                    var t = Element.prototype;
                                    t.matches =
                                        t.matchesSelector ||
                                        t.mozMatchesSelector ||
                                        t.msMatchesSelector ||
                                        t.oMatchesSelector ||
                                        t.webkitMatchesSelector;
                                }
                                e.exports = function (e, t) {
                                    for (; e && 9 !== e.nodeType; ) {
                                        if (
                                            "function" == typeof e.matches &&
                                            e.matches(t)
                                        )
                                            return e;
                                        e = e.parentNode;
                                    }
                                };
                            },
                            438: function (e, t, n) {
                                var r = n(828);
                                function a(e, t, n, r, a) {
                                    var o = i.apply(this, arguments);
                                    return (
                                        e.addEventListener(n, o, a),
                                        {
                                            destroy: function () {
                                                e.removeEventListener(n, o, a);
                                            },
                                        }
                                    );
                                }
                                function i(e, t, n, a) {
                                    return function (n) {
                                        (n.delegateTarget = r(n.target, t)),
                                            n.delegateTarget && a.call(e, n);
                                    };
                                }
                                e.exports = function (e, t, n, r, i) {
                                    return "function" ==
                                        typeof e.addEventListener
                                        ? a.apply(null, arguments)
                                        : "function" == typeof n
                                        ? a
                                              .bind(null, document)
                                              .apply(null, arguments)
                                        : ("string" == typeof e &&
                                              (e =
                                                  document.querySelectorAll(e)),
                                          Array.prototype.map.call(
                                              e,
                                              function (e) {
                                                  return a(e, t, n, r, i);
                                              }
                                          ));
                                };
                            },
                            879: function (e, t) {
                                (t.node = function (e) {
                                    return (
                                        void 0 !== e &&
                                        e instanceof HTMLElement &&
                                        1 === e.nodeType
                                    );
                                }),
                                    (t.nodeList = function (e) {
                                        var n =
                                            Object.prototype.toString.call(e);
                                        return (
                                            void 0 !== e &&
                                            ("[object NodeList]" === n ||
                                                "[object HTMLCollection]" ===
                                                    n) &&
                                            "length" in e &&
                                            (0 === e.length || t.node(e[0]))
                                        );
                                    }),
                                    (t.string = function (e) {
                                        return (
                                            "string" == typeof e ||
                                            e instanceof String
                                        );
                                    }),
                                    (t.fn = function (e) {
                                        return (
                                            "[object Function]" ===
                                            Object.prototype.toString.call(e)
                                        );
                                    });
                            },
                            370: function (e, t, n) {
                                var r = n(879),
                                    a = n(438);
                                e.exports = function (e, t, n) {
                                    if (!e && !t && !n)
                                        throw new Error(
                                            "Missing required arguments"
                                        );
                                    if (!r.string(t))
                                        throw new TypeError(
                                            "Second argument must be a String"
                                        );
                                    if (!r.fn(n))
                                        throw new TypeError(
                                            "Third argument must be a Function"
                                        );
                                    if (r.node(e))
                                        return (function (e, t, n) {
                                            return (
                                                e.addEventListener(t, n),
                                                {
                                                    destroy: function () {
                                                        e.removeEventListener(
                                                            t,
                                                            n
                                                        );
                                                    },
                                                }
                                            );
                                        })(e, t, n);
                                    if (r.nodeList(e))
                                        return (function (e, t, n) {
                                            return (
                                                Array.prototype.forEach.call(
                                                    e,
                                                    function (e) {
                                                        e.addEventListener(
                                                            t,
                                                            n
                                                        );
                                                    }
                                                ),
                                                {
                                                    destroy: function () {
                                                        Array.prototype.forEach.call(
                                                            e,
                                                            function (e) {
                                                                e.removeEventListener(
                                                                    t,
                                                                    n
                                                                );
                                                            }
                                                        );
                                                    },
                                                }
                                            );
                                        })(e, t, n);
                                    if (r.string(e))
                                        return (function (e, t, n) {
                                            return a(document.body, e, t, n);
                                        })(e, t, n);
                                    throw new TypeError(
                                        "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
                                    );
                                };
                            },
                            817: function (e) {
                                e.exports = function (e) {
                                    var t;
                                    if ("SELECT" === e.nodeName)
                                        e.focus(), (t = e.value);
                                    else if (
                                        "INPUT" === e.nodeName ||
                                        "TEXTAREA" === e.nodeName
                                    ) {
                                        var n = e.hasAttribute("readonly");
                                        n || e.setAttribute("readonly", ""),
                                            e.select(),
                                            e.setSelectionRange(
                                                0,
                                                e.value.length
                                            ),
                                            n || e.removeAttribute("readonly"),
                                            (t = e.value);
                                    } else {
                                        e.hasAttribute("contenteditable") &&
                                            e.focus();
                                        var r = window.getSelection(),
                                            a = document.createRange();
                                        a.selectNodeContents(e),
                                            r.removeAllRanges(),
                                            r.addRange(a),
                                            (t = r.toString());
                                    }
                                    return t;
                                };
                            },
                            279: function (e) {
                                function t() {}
                                (t.prototype = {
                                    on: function (e, t, n) {
                                        var r = this.e || (this.e = {});
                                        return (
                                            (r[e] || (r[e] = [])).push({
                                                fn: t,
                                                ctx: n,
                                            }),
                                            this
                                        );
                                    },
                                    once: function (e, t, n) {
                                        var r = this;
                                        function a() {
                                            r.off(e, a), t.apply(n, arguments);
                                        }
                                        return (a._ = t), this.on(e, a, n);
                                    },
                                    emit: function (e) {
                                        for (
                                            var t = [].slice.call(arguments, 1),
                                                n = (
                                                    (this.e || (this.e = {}))[
                                                        e
                                                    ] || []
                                                ).slice(),
                                                r = 0,
                                                a = n.length;
                                            r < a;
                                            r++
                                        )
                                            n[r].fn.apply(n[r].ctx, t);
                                        return this;
                                    },
                                    off: function (e, t) {
                                        var n = this.e || (this.e = {}),
                                            r = n[e],
                                            a = [];
                                        if (r && t)
                                            for (
                                                var i = 0, o = r.length;
                                                i < o;
                                                i++
                                            )
                                                r[i].fn !== t &&
                                                    r[i].fn._ !== t &&
                                                    a.push(r[i]);
                                        return (
                                            a.length ? (n[e] = a) : delete n[e],
                                            this
                                        );
                                    },
                                }),
                                    (e.exports = t),
                                    (e.exports.TinyEmitter = t);
                            },
                        },
                        t = {};
                    function n(r) {
                        if (t[r]) return t[r].exports;
                        var a = (t[r] = { exports: {} });
                        return e[r](a, a.exports, n), a.exports;
                    }
                    return (
                        (n.n = function (e) {
                            var t =
                                e && e.__esModule
                                    ? function () {
                                          return e.default;
                                      }
                                    : function () {
                                          return e;
                                      };
                            return n.d(t, { a: t }), t;
                        }),
                        (n.d = function (e, t) {
                            for (var r in t)
                                n.o(t, r) &&
                                    !n.o(e, r) &&
                                    Object.defineProperty(e, r, {
                                        enumerable: !0,
                                        get: t[r],
                                    });
                        }),
                        (n.o = function (e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t);
                        }),
                        n(134)
                    );
                })().default;
            }),
                (e.exports = n());
        }),
        qt =
            (Ht = Bt) &&
            Ht.__esModule &&
            Object.prototype.hasOwnProperty.call(Ht, "default")
                ? Ht.default
                : Ht;
    function Dt(e) {
        return e
            ? e.replace(
                  /{{\s*(_.)?([a-zA-Z0-9_]+)\s*}}/g,
                  '<span class="env-variable">$2</span>'
              )
            : "";
    }
    function Ut(e) {
        switch (e.type) {
            case "basic":
                return (function (e = null, t = null) {
                    return {
                        name: "Authorization",
                        value: "Basic " + btoa(`${e || ""}:${t || ""}`),
                    };
                })(e.username, e.password);
            case "bearer":
                return (
                    (t = e.token),
                    {
                        name: "Authorization",
                        value: `${e.prefix || "Bearer"} ${t}`,
                    }
                );
            case "oauth1":
                return (function (e) {
                    const {
                        callback: t,
                        consumerKey: n,
                        nonce: r,
                        signatureMethod: a,
                        timestamp: i,
                        tokenKey: o,
                    } = e;
                    return {
                        name: "Authorization",
                        value: `OAuth oauth_callback="${t}",\noauth_consumer_key="${n}",\noauth_nonce="${
                            r || "{{oauth_nonce}}"
                        }",\noauth_signature="{{oauth_signature}}",\noauth_signature_method="${a}",\noauth_timestamp="${
                            i || 1103493600
                        }",\noauth_token="${o}",\noauth_version="1.0"`
                            .split("\n")
                            .join(" "),
                    };
                })(e);
            case "oauth2":
                return {
                    name: "Authorization",
                    value: 'OAuth {{params}}, oauth_version="2.0"',
                };
            case "hawk":
                return {
                    name: "Authorization",
                    value: `Hawk id="${e.id}", ts="1103493600", nonce="{{hawk_nonce}}", mac="{{hawk_mac}}"`,
                };
            case "ntlm":
                return { name: "Authorization", value: "NTLM {{ntlm_token}}" };
            case "asap":
                return { name: "Authorization", value: "Bearer {{jwt_token}}" };
            default:
                return { name: "Authorization", value: "{{authorization}}" };
        }
        var t;
    }
    class Ft {
        constructor(e) {
            (this.body = e), (this.mime = e.mimeType);
        }
        __parseJSON() {
            if (!this.body.text) return;
            let e;
            this.body.text = this.body.text.replace(
                new RegExp("{{.*}}", "g"),
                '"!!Missing declaration in environment!!"'
            );
            try {
                e = JSON.stringify(JSON.parse(this.body.text), null, 2);
            } catch (t) {
                console.warn(
                    "Failed to parse JSON body (expect incorrect tokenization):",
                    this.body.text
                ),
                    (e = this.body.text);
            }
            return { type: "plain", note: "json", text: `<pre>${e}</pre>` };
        }
        __parseMultipart() {
            return {
                type: "array",
                note: "formdata",
                rows: this.body.params.map((e) => ({
                    name: e.name,
                    value: e.value,
                    description: e.description,
                })),
            };
        }
        __parsePlain() {
            return {
                type: "plain",
                note: "raw",
                text: `<pre>${this.body.text}</pre>`,
            };
        }
        parse() {
            switch (this.mime) {
                case "application/json":
                    return this.__parseJSON();
                case "multipart/form-data":
                case "application/x-www-form-urlencoded":
                    return this.__parseMultipart();
                default:
                    return this.__parsePlain();
            }
        }
    }
    class Gt {
        constructor(e) {
            this.req = e;
        }
        params() {
            const e = [];
            return (
                this.req.parameters.forEach((t) => {
                    e.push({
                        name: t.name,
                        value: t.value,
                        description: t.description,
                    });
                }),
                { title: "Parameters", rows: e }
            );
        }
        headers() {
            const e = [];
            if (
                (this.req.headers.forEach((t) => {
                    e.push({
                        name: t.name,
                        value: Dt(t.value || ""),
                        description: t.description,
                    });
                }),
                this.req.authentication && this.req.authentication.type)
            ) {
                const t = Ut(this.req.authentication);
                e.push({ name: t.name, value: `<pre>${Dt(t.value)}</pre>` });
            }
            return { title: "Headers", rows: e };
        }
        body() {
            const e = new Ft(this.req.body).parse();
            switch (e.type) {
                case "array":
                    return { title: "Body", note: e.note, rows: e.rows };
                case "plain":
                    return { title: "Body", note: e.note, text: e.text };
            }
        }
    }
    function Vt(e, t) {
        const n = t.parameters;
        return n && n.length
            ? ((e += "?"),
              (e += n
                  .filter((e) => !e.disabled)
                  .map(
                      (e) =>
                          `${encodeURIComponent(e.name)}=${encodeURIComponent(
                              e.value
                          )}`
                  )
                  .join("&")))
            : e;
    }
    function Wt(e) {
        return JSON.stringify(e).slice(1, -1);
    }
    function Kt(e, t) {
        let n = `curl "${Vt(e, t)}" \\\n`;
        return (
            t.headers.forEach((e) => {
                n += `  -H '${e.name}: ${e.value || ""}' \\\n`;
            }),
            t.authHeader &&
                (n += `  -H '${t.authHeader.name}: ${Wt(
                    t.authHeader.value || ""
                )}' \\\n`),
            (n += `  -X ${t.method} \\\n`),
            t.cookies &&
                t.cookies.length &&
                t.cookies.forEach((e) => {
                    n += `  -b '${e.key}'='${e.value}' \\\n`;
                }),
            t.body &&
                t.body.params &&
                t.body.params.length &&
                t.body.params.forEach((e) => {
                    if (null === e.value) return !1;
                    e.value.indexOf("'") >= 0 && e.value.indexOf('"') >= 0
                        ? (n += `  -F "${e.name}=${e.value.replace(
                              '"',
                              '\\"'
                          )}"`)
                        : e.value.indexOf("'") >= 0
                        ? (n += `  -F "${e.name}=${e.value}"`)
                        : (e.value.indexOf('"'),
                          (n += `  -F '${e.name}=${e.value}'`)),
                        (n += " \\\n");
                }),
            t.body &&
                t.body.text &&
                (n += `  -d '${t.body.text.replace(/\t/g, "  ")}' \\\n`),
            n.slice(0, -2)
        );
    }
    function Jt(e, t) {
        let n = "",
            r = !1;
        t.body &&
            "multipart/form-data" === t.body.mimeType &&
            ((r = !0),
            (n += "const form = new FormData();\n"),
            t.body.params.forEach((e) => {
                n += `form.append("${e.name}", "${e.value}");\n`;
            }),
            (n += "\n")),
            (n += `fetch("${Vt(e, t)}", `);
        const a = { method: t.method };
        var i, o;
        return (
            t.headers &&
                t.headers.length &&
                ((a.headers = {}),
                t.headers.forEach((e) => {
                    a.headers[e.name] = e.value;
                })),
            t.authHeader &&
                (a.headers || (a.headers = {}),
                (a.headers[t.authHeader.name] = t.authHeader.value)),
            t.cookies &&
                t.cookies.length &&
                (a.headers || (a.headers = {}),
                (a.headers.cookie = t.cookies
                    .map(
                        (e) =>
                            `${encodeURIComponent(e.key)}=${encodeURIComponent(
                                e.value
                            )}`
                    )
                    .join("; "))),
            !r &&
                t.body &&
                "multipart/form-data" !== t.body.mimeType &&
                (a.body =
                    ((i = t.body.mimeType),
                    (o = t.body),
                    "application/json" === i && o.text
                        ? JSON.parse(o.text)
                        : "application/x-www-form-urlencoded" === i
                        ? o.params
                              .map(
                                  (e) =>
                                      `${encodeURIComponent(
                                          e.name
                                      )}=${encodeURIComponent(e.value)}`
                              )
                              .join("&")
                        : o.text)),
            r && (a.body = "{{formVariable}}"),
            (n += JSON.stringify(a, null, 2)),
            r && (n = n.replace('"{{formVariable}}"', "form")),
            (n += ")\n  .then(response => console.log(response))\n"),
            (n += "  .catch(err => console.error(err));"),
            n
        );
    }
    function Zt(e, t) {
        let n = "import requests\n\n";
        if (((n += `url = '${e}'\n`), t.parameters && t.parameters.length)) {
            const e = {};
            t.parameters.forEach((t) => {
                e[t.name] = t.value;
            }),
                (n += `querystring = ${JSON.stringify(e)}\n`);
        }
        const r = {};
        t.authHeader && (r[t.authHeader.name] = t.authHeader.value),
            t.headers &&
                t.headers.length &&
                t.headers.forEach((e) => {
                    r[e.name] = e.value;
                }),
            t.cookies &&
                t.cookies.length &&
                (r.cookie = t.cookies
                    .map(
                        (e) =>
                            `${encodeURIComponent(e.key)}=${encodeURIComponent(
                                e.value
                            )}`
                    )
                    .join("; ")),
            r && (n += `headers = ${JSON.stringify(r, null, 2)}\n`);
        const a = (function (e) {
            const t = e.mimeType;
            if ("application/x-www-form-urlencoded" === t)
                return (
                    "payload = " +
                    e.params
                        .map(
                            (e) =>
                                `${encodeURIComponent(
                                    e.name
                                )}=${encodeURIComponent(e.value)}`
                        )
                        .join("&")
                );
            if ("multipart/form-data" === t) {
                const t = {},
                    n = {};
                return (
                    e.params.forEach((e) => {
                        "file" === e.type
                            ? (n[e.name] = e.value)
                            : (t[e.name] = e.value);
                    }),
                    `payload = ${JSON.stringify(
                        t,
                        null,
                        2
                    )}\n\nfiles = ${JSON.stringify(n, null, 2)}`
                );
            }
            return "application/json" === t && e.text
                ? `payload = ${JSON.stringify(
                      JSON.parse(e.text),
                      null,
                      2
                  )}\n\nfiles = null`
                : e.text
                ? `payload = '${e.text}'\n\nfiles = null`
                : "files = null";
        })(t.body);
        return (
            a && (n += a + "\n"),
            (n += `\nresponse = requests.request('${t.method}', url, ${
                a ? "data = payload, " : ""
            }headers=headers, files=files)\n`),
            (n += "print(response.text)"),
            n
        );
    }
    function Qt(e) {
        const t = e.mimeType;
        if ("application/x-www-form-urlencoded" === t)
            return e.params
                .map(
                    (e) =>
                        `${encodeURIComponent(e.name)}=${encodeURIComponent(
                            e.value
                        )}`
                )
                .join("&");
        if ("multipart/form-data" === t) {
            const t = "-----011000010111000001101001";
            return `"${Wt(
                e.params
                    .map(
                        (e) =>
                            `${t}\nContent-Disposition: form-data; name="${e.name}"\n\n${e.value}`
                    )
                    .join("\n")
            )}\n${t}--"`;
        }
        return JSON.stringify(e.text);
    }
    function Xt(e, t) {
        const n = (e = Vt(e, t)).startsWith("https://");
        let r = "require 'uri'\nrequire 'net/http'\n";
        if (
            (n && (r += "require 'openssl'\n"),
            (r += `\nurl = URI("${e}")\n\nhttp = Net::HTTP.new(url.host, url.port)\n`),
            n &&
                (r +=
                    "http.use_ssl = true\nhttp.verify_mode = OpenSSL::SSL::VERIFY_NONE\n"),
            (r += `\nrequest = Net::HTTP::${(function (e) {
                switch (e) {
                    case "GET":
                        return "Get";
                    case "POST":
                        return "Post";
                    case "PATCH":
                        return "Patch";
                    case "PUT":
                        return "Put";
                    case "DELETE":
                        return "Delete";
                    default:
                        return "{{METHOD}}";
                }
            })(t.method)}.new(url)\n`),
            t.cookies && t.cookies.length)
        ) {
            const e = [];
            t.cookies.forEach((t) =>
                e.push(
                    `${encodeURIComponent(t.key)}=${encodeURIComponent(
                        t.value
                    )}`
                )
            ),
                (r += `request["cookie"] = '${e.join("; ")}'\n`);
        }
        if (
            (t.headers &&
                t.headers.length &&
                t.headers.forEach((e) => {
                    r += `request["${e.name}"] = ${JSON.stringify(e.value)}\n`;
                }),
            t.authHeader &&
                (r += `request["${t.authHeader.name}"] = ${JSON.stringify(
                    t.authHeader.value
                )}\n`),
            t.body)
        ) {
            const e = Qt(t.body);
            e && (r += `request.body = ${e}\n`);
        }
        return (
            (r +=
                "\nresponse = http.request(request)\nputs response.read_body"),
            r
        );
    }
    function Yt(e, t) {
        let n =
            "<?php\n\n$curl = curl_init();\n\ncurl_setopt_array($curl, array(\n  ";
        const r = [
                `CURLOPT_URL => "${Vt(e, t)}"`,
                "CURLOPT_RETURNTRANSFER => true",
                'CURLOPT_ENCODING => ""',
                "CURLOPT_MAXREDIRS => 10",
                "CURLOPT_TIMEOUT => 30",
                "CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1",
                `CURLOPT_CUSTOMREQUEST => "${t.method}"`,
            ],
            a = Qt(t.body);
        if (
            (a && r.push("CURLOPT_POSTFIELDS => " + a),
            t.cookies && t.cookies.length)
        ) {
            const e = [];
            t.cookies.forEach((t) =>
                e.push(
                    `${encodeURIComponent(t.key)}=${encodeURIComponent(
                        t.value
                    )}`
                )
            ),
                r.push(`CURLOPT_COOKIE => '${e.join("; ")}'`);
        }
        const i = [];
        return (
            t.headers &&
                t.headers.length &&
                t.headers.forEach((e) => i.push(`${e.name}: ${Wt(e.value)}`)),
            t.authHeader &&
                i.push(`'${t.authHeader.name}: ${t.authHeader.value}'`),
            i.length &&
                r.push(
                    `CURLOPT_HTTPHEADER => array(\n    ${i.join(
                        ",\n    "
                    )}\n  )`
                ),
            (n +=
                r.join(",\n  ") +
                '\n));\n\n$response = curl_exec($curl);\n$err = curl_error($curl);\n\ncurl_close($curl);\n\nif ($err) {\n  echo "cURL Error #:" . $err;\n} else {\n  echo $response;\n}'),
            n
        );
    }
    function en(e, t) {
        const n =
            t.body &&
            (function (e) {
                const t = e.mimeType;
                if ("application/x-www-form-urlencoded" === t)
                    return (
                        '"' +
                        e.params
                            .map(
                                (e) =>
                                    `${encodeURIComponent(
                                        e.name
                                    )}=${encodeURIComponent(e.value)}`
                            )
                            .join("&") +
                        '"'
                    );
                if ("multipart/form-data" === t) {
                    const t = "-----011000010111000001101001",
                        n = e.params
                            .map(
                                (e) =>
                                    `${t}\nContent-Disposition: form-data; name="${e.name}"\n\n${e.value}`
                            )
                            .join("\n");
                    return `"${escape(n)}\n${t}--"`;
                }
                return JSON.stringify(e.text);
            })(t.body);
        let r = `package main\n\nimport (\n  "fmt"${
            n ? '\n"strings"' : ""
        }\n  "net/http"\n  "io/ioutil"\n)\n\nfunc main() {\n\n  `;
        if (
            ((r += `url := "${Vt(e, t)}"\n`),
            n && (r += `  payload := strings.NewReader(${n})\n`),
            (r += `  req, _ := http.NewRequest("${t.method}" url, ${
                n ? "payload" : "nil"
            })\n\n`),
            t.cookies && t.cookies.length)
        ) {
            const e = [];
            t.cookies.forEach((t) =>
                e.push(
                    `${encodeURIComponent(t.key)}=${encodeURIComponent(
                        t.value
                    )}`
                )
            ),
                (r += `  req.Header.Add("cookie", ${JSON.stringify(
                    e.join(";")
                )})\n`);
        }
        return (
            t.headers.forEach((e) => {
                r += `  req.Header.Add("${e.name}", ${JSON.stringify(
                    e.value
                )})\n`;
            }),
            t.authHeader &&
                (r += `  req.Header.Add("${
                    t.authHeader.name
                }", ${JSON.stringify(t.authHeader.value)})\n`),
            (r +=
                "  res, _ := http.DefaultClient.Do(req)\n\n  defer res.Body.Close()\n  body, _ := ioutil.ReadAll(res.Body)\n\n  fmt.Println(res)\n  fmt.Println(string(body))\n\n}"),
            r
        );
    }
    class tn {
        constructor(e, t, n) {
            (this.request = e),
                (this.url = t),
                (this.cookiejars = n),
                (this.code = null),
                (this.request.cookies = this.appendCookies()),
                this.request.authentication &&
                    this.request.authentication.type &&
                    (this.request.authHeader = Ut(this.request.authentication));
        }
        generate(e) {
            switch (e) {
                case "curl":
                    this.code = Kt;
                    break;
                case "javascript":
                    this.code = Jt;
                    break;
                case "python":
                    this.code = Zt;
                    break;
                case "node":
                    return (
                        "const fetch = require('node-fetch');\n\n" +
                        Jt(this.url, this.request)
                    );
                case "ruby":
                    this.code = Xt;
                    break;
                case "php":
                    this.code = Yt;
                    break;
                case "golang":
                    this.code = en;
                    break;
                default:
                    return "Not implemented yet...";
            }
            return this.code(this.url, this.request);
        }
        appendCookies() {
            const e = [];
            return (
                this.cookiejars.forEach((t) => {
                    t.cookies &&
                        t.cookies.length &&
                        t.cookies.forEach((t) => {
                            this.url &&
                                this.url.includes(t.domain) &&
                                ("/" === t.path || this.url.includes(t.path)) &&
                                e.push({ key: t.key, value: t.value });
                        });
                }),
                e
            );
        }
    }
    function nn(e, t, n) {
        const r = e.slice();
        return (r[1] = t[n]), r;
    }
    function rn(e) {
        let t,
            n,
            r = e[0].note + "";
        return {
            c() {
                (t = g("span")),
                    (n = m(r)),
                    v(t, "class", "note svelte-t9o7qk");
            },
            m(e, r) {
                d(e, t, r), u(t, n);
            },
            p(e, t) {
                1 & t && r !== (r = e[0].note + "") && $(n, r);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function an(e) {
        let t,
            n = e[0].text + "";
        return {
            c() {
                (t = g("div")), v(t, "class", "raw-data");
            },
            m(e, r) {
                d(e, t, r), (t.innerHTML = n);
            },
            p(e, r) {
                1 & r && n !== (n = e[0].text + "") && (t.innerHTML = n);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function on(e) {
        let t,
            n = e[0].rows,
            r = [];
        for (let t = 0; t < n.length; t += 1) r[t] = ln(nn(e, n, t));
        return {
            c() {
                for (let e = 0; e < r.length; e += 1) r[e].c();
                t = _();
            },
            m(e, n) {
                for (let t = 0; t < r.length; t += 1) r[t].m(e, n);
                d(e, t, n);
            },
            p(e, a) {
                if (1 & a) {
                    let i;
                    for (n = e[0].rows, i = 0; i < n.length; i += 1) {
                        const o = nn(e, n, i);
                        r[i]
                            ? r[i].p(o, a)
                            : ((r[i] = ln(o)),
                              r[i].c(),
                              r[i].m(t.parentNode, t));
                    }
                    for (; i < r.length; i += 1) r[i].d(1);
                    r.length = n.length;
                }
            },
            d(e) {
                h(r, e), e && p(t);
            },
        };
    }
    function sn(e) {
        let t,
            n,
            r,
            a = e[1].description + "";
        return {
            c() {
                (t = g("div")),
                    (r = b()),
                    (n = new T(r)),
                    v(t, "class", "row description svelte-t9o7qk");
            },
            m(e, i) {
                d(e, t, i), n.m(a, t), u(t, r);
            },
            p(e, t) {
                1 & t && a !== (a = e[1].description + "") && n.p(a);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function ln(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s,
            l = e[1].name + "",
            c = e[1].value + "",
            h = e[1].description && sn(e);
        return {
            c() {
                (t = g("div")),
                    (n = g("div")),
                    (r = m(l)),
                    (a = b()),
                    (i = g("div")),
                    (o = b()),
                    h && h.c(),
                    (s = _()),
                    v(n, "class", "name svelte-t9o7qk"),
                    v(i, "class", "value svelte-t9o7qk"),
                    v(t, "class", "row svelte-t9o7qk");
            },
            m(e, l) {
                d(e, t, l),
                    u(t, n),
                    u(n, r),
                    u(t, a),
                    u(t, i),
                    (i.innerHTML = c),
                    d(e, o, l),
                    h && h.m(e, l),
                    d(e, s, l);
            },
            p(e, t) {
                1 & t && l !== (l = e[1].name + "") && $(r, l),
                    1 & t && c !== (c = e[1].value + "") && (i.innerHTML = c),
                    e[1].description
                        ? h
                            ? h.p(e, t)
                            : ((h = sn(e)), h.c(), h.m(s.parentNode, s))
                        : h && (h.d(1), (h = null));
            },
            d(e) {
                e && p(t), e && p(o), h && h.d(e), e && p(s);
            },
        };
    }
    function cn(t) {
        let n,
            r,
            a,
            i,
            o,
            s,
            l,
            c = t[0].title + "",
            h = t[0].note && rn(t),
            f = t[0].text && an(t),
            _ = t[0].rows && t[0].rows.length && on(t);
        return {
            c() {
                (n = g("div")),
                    (r = g("div")),
                    (a = g("span")),
                    (i = m(c)),
                    (o = b()),
                    h && h.c(),
                    (s = b()),
                    f && f.c(),
                    (l = b()),
                    _ && _.c(),
                    v(a, "class", "title svelte-t9o7qk"),
                    v(r, "class", "header svelte-t9o7qk"),
                    v(n, "class", "table svelte-t9o7qk");
            },
            m(e, t) {
                d(e, n, t),
                    u(n, r),
                    u(r, a),
                    u(a, i),
                    u(r, o),
                    h && h.m(r, null),
                    u(n, s),
                    f && f.m(n, null),
                    u(n, l),
                    _ && _.m(n, null);
            },
            p(e, [t]) {
                1 & t && c !== (c = e[0].title + "") && $(i, c),
                    e[0].note
                        ? h
                            ? h.p(e, t)
                            : ((h = rn(e)), h.c(), h.m(r, null))
                        : h && (h.d(1), (h = null)),
                    e[0].text
                        ? f
                            ? f.p(e, t)
                            : ((f = an(e)), f.c(), f.m(n, l))
                        : f && (f.d(1), (f = null)),
                    e[0].rows && e[0].rows.length
                        ? _
                            ? _.p(e, t)
                            : ((_ = on(e)), _.c(), _.m(n, null))
                        : _ && (_.d(1), (_ = null));
            },
            i: e,
            o: e,
            d(e) {
                e && p(n), h && h.d(), f && f.d(), _ && _.d();
            },
        };
    }
    function un(e, t, n) {
        let { data: r } = t;
        return (
            (e.$$set = (e) => {
                "data" in e && n(0, (r = e.data));
            }),
            [r]
        );
    }
    class dn extends ue {
        constructor(e) {
            super(), ce(this, e, un, cn, o, { data: 0 });
        }
    }
    function pn(e, t, n) {
        const r = e.slice();
        return (r[16] = t[n]), r;
    }
    function hn(e) {
        let t;
        return {
            c() {
                (t = g("div")), v(t, "class", "description");
            },
            m(n, r) {
                d(n, t, r), (t.innerHTML = e[7]);
            },
            p(e, n) {
                128 & n && (t.innerHTML = e[7]);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function gn(e) {
        let t, n;
        return (
            (t = new dn({ props: { data: e[5].params() } })),
            {
                c() {
                    oe(t.$$.fragment);
                },
                m(e, r) {
                    se(t, e, r), (n = !0);
                },
                p(e, n) {
                    const r = {};
                    32 & n && (r.data = e[5].params()), t.$set(r);
                },
                i(e) {
                    n || (te(t.$$.fragment, e), (n = !0));
                },
                o(e) {
                    ne(t.$$.fragment, e), (n = !1);
                },
                d(e) {
                    le(t, e);
                },
            }
        );
    }
    function fn(e) {
        let t, n;
        return (
            (t = new dn({ props: { data: e[5].headers() } })),
            {
                c() {
                    oe(t.$$.fragment);
                },
                m(e, r) {
                    se(t, e, r), (n = !0);
                },
                p(e, n) {
                    const r = {};
                    32 & n && (r.data = e[5].headers()), t.$set(r);
                },
                i(e) {
                    n || (te(t.$$.fragment, e), (n = !0));
                },
                o(e) {
                    ne(t.$$.fragment, e), (n = !1);
                },
                d(e) {
                    le(t, e);
                },
            }
        );
    }
    function mn(e) {
        let t, n;
        return (
            (t = new dn({ props: { data: e[5].body() } })),
            {
                c() {
                    oe(t.$$.fragment);
                },
                m(e, r) {
                    se(t, e, r), (n = !0);
                },
                p(e, n) {
                    const r = {};
                    32 & n && (r.data = e[5].body()), t.$set(r);
                },
                i(e) {
                    n || (te(t.$$.fragment, e), (n = !0));
                },
                o(e) {
                    ne(t.$$.fragment, e), (n = !1);
                },
                d(e) {
                    le(t, e);
                },
            }
        );
    }
    function bn(e) {
        let t,
            n = e[3].exampleResponses,
            r = [];
        for (let t = 0; t < n.length; t += 1) r[t] = wn(pn(e, n, t));
        return {
            c() {
                for (let e = 0; e < r.length; e += 1) r[e].c();
                t = _();
            },
            m(e, n) {
                for (let t = 0; t < r.length; t += 1) r[t].m(e, n);
                d(e, t, n);
            },
            p(e, a) {
                if (8 & a) {
                    let i;
                    for (
                        n = e[3].exampleResponses, i = 0;
                        i < n.length;
                        i += 1
                    ) {
                        const o = pn(e, n, i);
                        r[i]
                            ? r[i].p(o, a)
                            : ((r[i] = wn(o)),
                              r[i].c(),
                              r[i].m(t.parentNode, t));
                    }
                    for (; i < r.length; i += 1) r[i].d(1);
                    r.length = n.length;
                }
            },
            d(e) {
                h(r, e), e && p(t);
            },
        };
    }
    function _n(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s,
            l,
            h,
            f,
            _ = e[16].code && e[16].code.length ? " - " + e[16].code : "",
            w = yt.highlightAuto(e[16].value).value + "";
        return {
            c() {
                (t = g("div")),
                    (n = g("div")),
                    (r = g("div")),
                    (a = m("Example response")),
                    (i = m(_)),
                    (o = m(":")),
                    (s = b()),
                    (l = g("pre")),
                    (h = b()),
                    v(r, "class", "title svelte-1qvssvw"),
                    v(n, "class", "header svelte-1qvssvw"),
                    v(l, "class", "svelte-1qvssvw"),
                    v(
                        t,
                        "class",
                        (f =
                            c(
                                "code-example example-response " +
                                    yn(e[16].code)
                            ) + " svelte-1qvssvw")
                    );
            },
            m(e, c) {
                d(e, t, c),
                    u(t, n),
                    u(n, r),
                    u(r, a),
                    u(r, i),
                    u(r, o),
                    u(t, s),
                    u(t, l),
                    (l.innerHTML = w),
                    u(t, h);
            },
            p(e, n) {
                8 & n &&
                    _ !==
                        (_ =
                            e[16].code && e[16].code.length
                                ? " - " + e[16].code
                                : "") &&
                    $(i, _),
                    8 & n &&
                        w !== (w = yt.highlightAuto(e[16].value).value + "") &&
                        (l.innerHTML = w),
                    8 & n &&
                        f !==
                            (f =
                                c(
                                    "code-example example-response " +
                                        yn(e[16].code)
                                ) + " svelte-1qvssvw") &&
                        v(t, "class", f);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function wn(e) {
        let t,
            n = e[16].value && _n(e);
        return {
            c() {
                n && n.c(), (t = _());
            },
            m(e, r) {
                n && n.m(e, r), d(e, t, r);
            },
            p(e, r) {
                e[16].value
                    ? n
                        ? n.p(e, r)
                        : ((n = _n(e)), n.c(), n.m(t.parentNode, t))
                    : n && (n.d(1), (n = null));
            },
            d(e) {
                n && n.d(e), e && p(t);
            },
        };
    }
    function vn(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s,
            l,
            h,
            f,
            _,
            w,
            y,
            k,
            E,
            x,
            S,
            C,
            A,
            L,
            M,
            T,
            j,
            I,
            N,
            O,
            P,
            R,
            H,
            z,
            B,
            q,
            D,
            U,
            F = e[0].method + "",
            G = e[3].name + "",
            V = e[3].url + "",
            W = e[7] && hn(e),
            K = e[0].parameters && e[0].parameters.length && gn(e),
            J =
                ((e[0].headers && e[0].headers.length) ||
                    (e[0].authentication && e[0].authentication.type)) &&
                fn(e),
            Z = e[0].body && (e[0].body.text || e[0].body.params) && mn(e),
            Q = e[3].exampleResponses && e[3].exampleResponses.length && bn(e);
        return {
            c() {
                (t = g("div")),
                    (n = g("div")),
                    (r = g("div")),
                    (a = m(" ")),
                    (o = b()),
                    (s = g("h3")),
                    (l = g("strong")),
                    (h = m(F)),
                    (_ = b()),
                    (w = m(G)),
                    (y = b()),
                    (k = g("pre")),
                    (E = b()),
                    W && W.c(),
                    (x = b()),
                    (S = g("div")),
                    K && K.c(),
                    (C = b()),
                    J && J.c(),
                    (A = b()),
                    Z && Z.c(),
                    (L = b()),
                    (M = g("hr")),
                    (T = b()),
                    (j = g("div")),
                    (I = g("div")),
                    (N = g("div")),
                    (O = g("div")),
                    (O.textContent = "Example request:"),
                    (P = b()),
                    (R = g("div")),
                    (H = g("span")),
                    (z = m(e[4])),
                    (B = b()),
                    (q = g("pre")),
                    (D = b()),
                    Q && Q.c(),
                    v(r, "class", "anchor svelte-1qvssvw"),
                    v(r, "id", (i = e[0]._id)),
                    v(
                        l,
                        "class",
                        (f = c(e[0].method.toLowerCase()) + " svelte-1qvssvw")
                    ),
                    v(s, "class", "request-title"),
                    v(k, "class", "url svelte-1qvssvw"),
                    v(S, "class", "tables"),
                    v(n, "class", "left"),
                    v(O, "class", "title svelte-1qvssvw"),
                    v(H, "class", "svelte-1qvssvw"),
                    v(R, "class", "copy"),
                    v(N, "class", "header svelte-1qvssvw"),
                    v(q, "class", "svelte-1qvssvw"),
                    v(I, "class", "code-example svelte-1qvssvw"),
                    v(j, "class", "right"),
                    v(t, "class", "row");
            },
            m(i, c) {
                d(i, t, c),
                    u(t, n),
                    u(n, r),
                    u(r, a),
                    u(n, o),
                    u(n, s),
                    u(s, l),
                    u(l, h),
                    u(s, _),
                    u(s, w),
                    u(n, y),
                    u(n, k),
                    (k.innerHTML = V),
                    u(n, E),
                    W && W.m(n, null),
                    u(n, x),
                    u(n, S),
                    K && K.m(S, null),
                    u(S, C),
                    J && J.m(S, null),
                    u(S, A),
                    Z && Z.m(S, null),
                    u(n, L),
                    u(n, M),
                    u(t, T),
                    u(t, j),
                    u(j, I),
                    u(I, N),
                    u(N, O),
                    u(N, P),
                    u(N, R),
                    u(R, H),
                    u(H, z),
                    e[13](H),
                    u(I, B),
                    u(I, q),
                    (q.innerHTML = e[6]),
                    e[14](q),
                    u(j, D),
                    Q && Q.m(j, null),
                    (U = !0);
            },
            p(e, [t]) {
                (!U || (1 & t && i !== (i = e[0]._id))) && v(r, "id", i),
                    (!U || 1 & t) && F !== (F = e[0].method + "") && $(h, F),
                    (!U ||
                        (1 & t &&
                            f !==
                                (f =
                                    c(e[0].method.toLowerCase()) +
                                    " svelte-1qvssvw"))) &&
                        v(l, "class", f),
                    (!U || 8 & t) && G !== (G = e[3].name + "") && $(w, G),
                    (!U || 8 & t) &&
                        V !== (V = e[3].url + "") &&
                        (k.innerHTML = V),
                    e[7]
                        ? W
                            ? W.p(e, t)
                            : ((W = hn(e)), W.c(), W.m(n, x))
                        : W && (W.d(1), (W = null)),
                    e[0].parameters && e[0].parameters.length
                        ? K
                            ? (K.p(e, t), 1 & t && te(K, 1))
                            : ((K = gn(e)), K.c(), te(K, 1), K.m(S, C))
                        : K &&
                          (Y(),
                          ne(K, 1, 1, () => {
                              K = null;
                          }),
                          ee()),
                    (e[0].headers && e[0].headers.length) ||
                    (e[0].authentication && e[0].authentication.type)
                        ? J
                            ? (J.p(e, t), 1 & t && te(J, 1))
                            : ((J = fn(e)), J.c(), te(J, 1), J.m(S, A))
                        : J &&
                          (Y(),
                          ne(J, 1, 1, () => {
                              J = null;
                          }),
                          ee()),
                    e[0].body && (e[0].body.text || e[0].body.params)
                        ? Z
                            ? (Z.p(e, t), 1 & t && te(Z, 1))
                            : ((Z = mn(e)), Z.c(), te(Z, 1), Z.m(S, null))
                        : Z &&
                          (Y(),
                          ne(Z, 1, 1, () => {
                              Z = null;
                          }),
                          ee()),
                    (!U || 16 & t) && $(z, e[4]),
                    (!U || 64 & t) && (q.innerHTML = e[6]),
                    e[3].exampleResponses && e[3].exampleResponses.length
                        ? Q
                            ? Q.p(e, t)
                            : ((Q = bn(e)), Q.c(), Q.m(j, null))
                        : Q && (Q.d(1), (Q = null));
            },
            i(e) {
                U || (te(K), te(J), te(Z), (U = !0));
            },
            o(e) {
                ne(K), ne(J), ne(Z), (U = !1);
            },
            d(n) {
                n && p(t),
                    W && W.d(),
                    K && K.d(),
                    J && J.d(),
                    Z && Z.d(),
                    e[13](null),
                    e[14](null),
                    Q && Q.d();
            },
        };
    }
    function yn(e) {
        if (!e) return "default";
        switch (e[0]) {
            case "1":
                return "info";
            case "2":
                return "success";
            case "3":
                return "redirect";
            case "4":
                return "client-error";
            case "5":
                return "server-error";
            default:
                return "default";
        }
    }
    function kn(e, t, n) {
        let r, a, i, o, s, l;
        const c = new zt.Converter({
            tables: !0,
            simplifiedAutoLink: !0,
            openLinksInNewWindow: !0,
            excludeTrailingPunctuationFromURLs: !0,
        });
        let u,
            d,
            { request: p } = t,
            { language: h = null } = t,
            { cookiejars: g } = t,
            f = "Copy to clipboard";
        const m = document.createElement("code");
        return (
            (e.$$set = (e) => {
                "request" in e && n(0, (p = e.request)),
                    "language" in e && n(8, (h = e.language)),
                    "cookiejars" in e && n(9, (g = e.cookiejars));
            }),
            (e.$$.update = () => {
                1 & e.$$.dirty && n(5, (r = new Gt(p))),
                    1 & e.$$.dirty &&
                        n(
                            3,
                            (a = {
                                method: p.method,
                                url: Dt(p.url),
                                name: p.name,
                                description: p.description,
                                exampleResponses: p.exampleResponses,
                            })
                        ),
                    769 & e.$$.dirty &&
                        n(
                            11,
                            (i = ((e, t, n, r) => new tn(e, t, r).generate(n))(
                                p,
                                p.url,
                                h,
                                g
                            ))
                        ),
                    256 & e.$$.dirty && n(10, (m.className = h), m),
                    2048 & e.$$.dirty && n(10, (m.textContent = i), m),
                    1024 & e.$$.dirty && yt.highlightBlock(m),
                    1024 & e.$$.dirty && n(6, (o = m.outerHTML)),
                    6 & e.$$.dirty &&
                        n(12, (s = u && new qt(u, { target: () => d }))),
                    4096 & e.$$.dirty &&
                        s &&
                        s.on("success", function () {
                            n(4, (f = "Copied!")),
                                setTimeout(
                                    () => n(4, (f = "Copy to Clipboard")),
                                    5e3
                                );
                        }),
                    4096 & e.$$.dirty &&
                        s &&
                        s.on("error", function (e) {
                            console.error(e),
                                n(4, (f = "Failed to copy :(")),
                                setTimeout(
                                    () => n(4, (f = "Copy to Clipboard")),
                                    5e3
                                );
                        }),
                    8 & e.$$.dirty &&
                        n(7, (l = a.description && c.makeHtml(a.description)));
            }),
            [
                p,
                u,
                d,
                a,
                f,
                r,
                o,
                l,
                h,
                g,
                m,
                i,
                s,
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (u = e), n(1, u);
                    });
                },
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (d = e), n(2, d);
                    });
                },
            ]
        );
    }
    class $n extends ue {
        constructor(e) {
            super(),
                ce(this, e, kn, vn, o, {
                    request: 0,
                    language: 8,
                    cookiejars: 9,
                });
        }
    }
    function En(e, t) {
        return e
            ? (Object.keys(t.data).forEach((n) => {
                  e = e.replace(
                      new RegExp("{{(\\s*(_.)?" + n + "\\s*)}}", "g"),
                      t.data[n]
                  );
              }),
              e)
            : null;
    }
    function xn(e) {
        let t;
        return {
            c() {
                (t = g("div")), v(t, "class", "description");
            },
            m(n, r) {
                d(n, t, r), (t.innerHTML = e[1]);
            },
            p(e, n) {
                2 & n && (t.innerHTML = e[1]);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function Sn(t) {
        let n,
            r,
            a,
            i,
            o,
            s,
            l,
            c,
            h,
            f = t[0].name + "",
            _ = t[1] && xn(t);
        return {
            c() {
                (n = g("div")),
                    (r = g("div")),
                    (a = g("h2")),
                    (i = m(f)),
                    (o = b()),
                    _ && _.c(),
                    (s = b()),
                    (l = g("hr")),
                    (c = b()),
                    (h = g("div")),
                    v(r, "class", "left"),
                    v(h, "class", "right"),
                    v(n, "class", "row");
            },
            m(e, t) {
                d(e, n, t),
                    u(n, r),
                    u(r, a),
                    u(a, i),
                    u(r, o),
                    _ && _.m(r, null),
                    u(r, s),
                    u(r, l),
                    u(n, c),
                    u(n, h);
            },
            p(e, [t]) {
                1 & t && f !== (f = e[0].name + "") && $(i, f),
                    e[1]
                        ? _
                            ? _.p(e, t)
                            : ((_ = xn(e)), _.c(), _.m(r, s))
                        : _ && (_.d(1), (_ = null));
            },
            i: e,
            o: e,
            d(e) {
                e && p(n), _ && _.d();
            },
        };
    }
    function Cn(e, t, n) {
        let r, a;
        const i = new zt.Converter({
            simplifiedAutoLink: !0,
            openLinksInNewWindow: !0,
            excludeTrailingPunctuationFromURLs: !0,
            tables: !0,
        });
        let { group: o } = t,
            { env: s } = t;
        return (
            (e.$$set = (e) => {
                "group" in e && n(2, (o = e.group)),
                    "env" in e && n(3, (s = e.env));
            }),
            (e.$$.update = () => {
                12 & e.$$.dirty &&
                    n(
                        0,
                        (r = {
                            name: En(o.name, s),
                            description: En(o.description, s),
                        })
                    ),
                    1 & e.$$.dirty &&
                        n(1, (a = r.description && i.makeHtml(r.description)));
            }),
            [r, a, o, s]
        );
    }
    class An extends ue {
        constructor(e) {
            super(), ce(this, e, Cn, Sn, o, { group: 2, env: 3 });
        }
    }
    function Ln(e, t, n) {
        const r = e.slice();
        return (r[4] = t[n]), r;
    }
    function Mn(e) {
        let t, n, r, a;
        return (
            (t = new An({ props: { group: e[4], env: e[1] } })),
            (r = new On({
                props: {
                    content: [...e[4].requests, ...e[4].children],
                    env: e[1],
                    language: e[2],
                    cookiejars: e[3],
                },
            })),
            {
                c() {
                    oe(t.$$.fragment), (n = b()), oe(r.$$.fragment);
                },
                m(e, i) {
                    se(t, e, i), d(e, n, i), se(r, e, i), (a = !0);
                },
                p(e, n) {
                    const a = {};
                    1 & n && (a.group = e[4]),
                        2 & n && (a.env = e[1]),
                        t.$set(a);
                    const i = {};
                    1 & n && (i.content = [...e[4].requests, ...e[4].children]),
                        2 & n && (i.env = e[1]),
                        4 & n && (i.language = e[2]),
                        8 & n && (i.cookiejars = e[3]),
                        r.$set(i);
                },
                i(e) {
                    a || (te(t.$$.fragment, e), te(r.$$.fragment, e), (a = !0));
                },
                o(e) {
                    ne(t.$$.fragment, e), ne(r.$$.fragment, e), (a = !1);
                },
                d(e) {
                    le(t, e), e && p(n), le(r, e);
                },
            }
        );
    }
    function Tn(e) {
        let t, n;
        return (
            (t = new $n({
                props: {
                    request: e[4],
                    env: e[1],
                    language: e[2],
                    cookiejars: e[3],
                },
            })),
            {
                c() {
                    oe(t.$$.fragment);
                },
                m(e, r) {
                    se(t, e, r), (n = !0);
                },
                p(e, n) {
                    const r = {};
                    1 & n && (r.request = e[4]),
                        2 & n && (r.env = e[1]),
                        4 & n && (r.language = e[2]),
                        8 & n && (r.cookiejars = e[3]),
                        t.$set(r);
                },
                i(e) {
                    n || (te(t.$$.fragment, e), (n = !0));
                },
                o(e) {
                    ne(t.$$.fragment, e), (n = !1);
                },
                d(e) {
                    le(t, e);
                },
            }
        );
    }
    function jn(e) {
        let t, n, r, a;
        const i = [Tn, Mn],
            o = [];
        function s(e, t) {
            return "request" === e[4]._type ? 0 : 1;
        }
        return (
            (t = s(e)),
            (n = o[t] = i[t](e)),
            {
                c() {
                    n.c(), (r = _());
                },
                m(e, n) {
                    o[t].m(e, n), d(e, r, n), (a = !0);
                },
                p(e, a) {
                    let l = t;
                    (t = s(e)),
                        t === l
                            ? o[t].p(e, a)
                            : (Y(),
                              ne(o[l], 1, 1, () => {
                                  o[l] = null;
                              }),
                              ee(),
                              (n = o[t]),
                              n ? n.p(e, a) : ((n = o[t] = i[t](e)), n.c()),
                              te(n, 1),
                              n.m(r.parentNode, r));
                },
                i(e) {
                    a || (te(n), (a = !0));
                },
                o(e) {
                    ne(n), (a = !1);
                },
                d(e) {
                    o[t].d(e), e && p(r);
                },
            }
        );
    }
    function In(e) {
        let t,
            n,
            r = e[0],
            a = [];
        for (let t = 0; t < r.length; t += 1) a[t] = jn(Ln(e, r, t));
        const i = (e) =>
            ne(a[e], 1, 1, () => {
                a[e] = null;
            });
        return {
            c() {
                for (let e = 0; e < a.length; e += 1) a[e].c();
                t = _();
            },
            m(e, r) {
                for (let t = 0; t < a.length; t += 1) a[t].m(e, r);
                d(e, t, r), (n = !0);
            },
            p(e, [n]) {
                if (15 & n) {
                    let o;
                    for (r = e[0], o = 0; o < r.length; o += 1) {
                        const i = Ln(e, r, o);
                        a[o]
                            ? (a[o].p(i, n), te(a[o], 1))
                            : ((a[o] = jn(i)),
                              a[o].c(),
                              te(a[o], 1),
                              a[o].m(t.parentNode, t));
                    }
                    for (Y(), o = r.length; o < a.length; o += 1) i(o);
                    ee();
                }
            },
            i(e) {
                if (!n) {
                    for (let e = 0; e < r.length; e += 1) te(a[e]);
                    n = !0;
                }
            },
            o(e) {
                a = a.filter(Boolean);
                for (let e = 0; e < a.length; e += 1) ne(a[e]);
                n = !1;
            },
            d(e) {
                h(a, e), e && p(t);
            },
        };
    }
    function Nn(e, t, n) {
        let { content: r } = t,
            { env: a } = t,
            { language: i } = t,
            { cookiejars: o } = t;
        return (
            (e.$$set = (e) => {
                "content" in e && n(0, (r = e.content)),
                    "env" in e && n(1, (a = e.env)),
                    "language" in e && n(2, (i = e.language)),
                    "cookiejars" in e && n(3, (o = e.cookiejars));
            }),
            [r, a, i, o]
        );
    }
    class On extends ue {
        constructor(e) {
            super(),
                ce(this, e, Nn, In, o, {
                    content: 0,
                    env: 1,
                    language: 2,
                    cookiejars: 3,
                });
        }
    }
    function Pn(t) {
        let n,
            r,
            a = t[0](t[1], t[2]) + "";
        return {
            c() {
                (n = g("div")),
                    v(n, "class", (r = "item " + t[3] + " svelte-u114qp"));
            },
            m(e, t) {
                d(e, n, t), (n.innerHTML = a);
            },
            p(e, [t]) {
                7 & t && a !== (a = e[0](e[1], e[2]) + "") && (n.innerHTML = a),
                    8 & t &&
                        r !== (r = "item " + e[3] + " svelte-u114qp") &&
                        v(n, "class", r);
            },
            i: e,
            o: e,
            d(e) {
                e && p(n);
            },
        };
    }
    function Rn(e, t, n) {
        let { isActive: r = !1 } = t,
            { isFirst: a = !1 } = t,
            { isHover: i = !1 } = t,
            { getOptionLabel: o } = t,
            { item: s } = t,
            { filterText: l = "" } = t,
            c = "";
        return (
            (e.$$set = (e) => {
                "isActive" in e && n(4, (r = e.isActive)),
                    "isFirst" in e && n(5, (a = e.isFirst)),
                    "isHover" in e && n(6, (i = e.isHover)),
                    "getOptionLabel" in e && n(0, (o = e.getOptionLabel)),
                    "item" in e && n(1, (s = e.item)),
                    "filterText" in e && n(2, (l = e.filterText));
            }),
            (e.$$.update = () => {
                if (114 & e.$$.dirty) {
                    const e = [];
                    r && e.push("active"),
                        a && e.push("first"),
                        i && e.push("hover"),
                        s.isGroupHeader && e.push("groupHeader"),
                        s.isGroupItem && e.push("groupItem"),
                        n(3, (c = e.join(" ")));
                }
            }),
            [o, s, l, c, r, a, i]
        );
    }
    class Hn extends ue {
        constructor(e) {
            super(),
                ce(this, e, Rn, Pn, o, {
                    isActive: 4,
                    isFirst: 5,
                    isHover: 6,
                    getOptionLabel: 0,
                    item: 1,
                    filterText: 2,
                });
        }
    }
    function zn(e, t, n) {
        const r = e.slice();
        return (r[23] = t[n]), r;
    }
    const Bn = (e) => ({ item: 32 & e, i: 32 & e, hoverItemIndex: 2 & e }),
        qn = (e) => ({
            item: e[23].data,
            i: e[23].index,
            hoverItemIndex: e[1],
        });
    function Dn(e, t) {
        let n, r, a;
        const i = t[15].default,
            o = (function (e, t, n, r) {
                if (e) {
                    const a = s(e, t, n, r);
                    return e[0](a);
                }
            })(i, t, t[14], qn),
            c =
                o ||
                (function (e) {
                    let t;
                    return {
                        c() {
                            t = m("Missing template");
                        },
                        m(e, n) {
                            d(e, t, n);
                        },
                        d(e) {
                            e && p(t);
                        },
                    };
                })();
        return {
            key: e,
            first: null,
            c() {
                (n = g("svelte-virtual-list-row")),
                    c && c.c(),
                    (r = b()),
                    k(n, "class", "svelte-8nn5yg"),
                    (this.first = n);
            },
            m(e, t) {
                d(e, n, t), c && c.m(n, null), u(n, r), (a = !0);
            },
            p(e, n) {
                (t = e),
                    o &&
                        o.p &&
                        (!a || 16418 & n) &&
                        l(o, i, t, t[14], n, Bn, qn);
            },
            i(e) {
                a || (te(c, e), (a = !0));
            },
            o(e) {
                ne(c, e), (a = !1);
            },
            d(e) {
                e && p(n), c && c.d(e);
            },
        };
    }
    function Un(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s = [],
            l = new Map(),
            c = e[5];
        const h = (e) => e[23].index;
        for (let t = 0; t < c.length; t += 1) {
            let n = zn(e, c, t),
                r = h(n);
            l.set(r, (s[t] = Dn(r, n)));
        }
        return {
            c() {
                (t = g("svelte-virtual-list-viewport")),
                    (n = g("svelte-virtual-list-contents"));
                for (let e = 0; e < s.length; e += 1) s[e].c();
                x(n, "padding-top", e[6] + "px"),
                    x(n, "padding-bottom", e[7] + "px"),
                    k(n, "class", "svelte-8nn5yg"),
                    x(t, "height", e[0]),
                    k(t, "class", "svelte-8nn5yg"),
                    V(() => e[18].call(t));
            },
            m(l, c) {
                d(l, t, c), u(t, n);
                for (let e = 0; e < s.length; e += 1) s[e].m(n, null);
                e[16](n),
                    e[17](t),
                    (r = (function (e, t) {
                        "static" === getComputedStyle(e).position &&
                            (e.style.position = "relative");
                        const n = g("iframe");
                        n.setAttribute(
                            "style",
                            "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"
                        ),
                            n.setAttribute("aria-hidden", "true"),
                            (n.tabIndex = -1);
                        const r = L();
                        let a;
                        return (
                            r
                                ? ((n.src =
                                      "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>"),
                                  (a = w(window, "message", (e) => {
                                      e.source === n.contentWindow && t();
                                  })))
                                : ((n.src = "about:blank"),
                                  (n.onload = () => {
                                      a = w(n.contentWindow, "resize", t);
                                  })),
                            u(e, n),
                            () => {
                                (r || (a && n.contentWindow)) && a(), p(n);
                            }
                        );
                    })(t, e[18].bind(t))),
                    (a = !0),
                    i || ((o = w(t, "scroll", e[8])), (i = !0));
            },
            p(e, [r]) {
                16418 & r &&
                    ((c = e[5]),
                    Y(),
                    (s = (function (e, t, n, r, a, i, o, s, l, c, u, d) {
                        let p = e.length,
                            h = i.length,
                            g = p;
                        const f = {};
                        for (; g--; ) f[e[g].key] = g;
                        const m = [],
                            b = new Map(),
                            _ = new Map();
                        for (g = h; g--; ) {
                            const e = d(a, i, g),
                                s = n(e);
                            let l = o.get(s);
                            l ? r && l.p(e, t) : ((l = c(s, e)), l.c()),
                                b.set(s, (m[g] = l)),
                                s in f && _.set(s, Math.abs(g - f[s]));
                        }
                        const w = new Set(),
                            v = new Set();
                        function y(e) {
                            te(e, 1),
                                e.m(s, u),
                                o.set(e.key, e),
                                (u = e.first),
                                h--;
                        }
                        for (; p && h; ) {
                            const t = m[h - 1],
                                n = e[p - 1],
                                r = t.key,
                                a = n.key;
                            t === n
                                ? ((u = t.first), p--, h--)
                                : b.has(a)
                                ? !o.has(r) || w.has(r)
                                    ? y(t)
                                    : v.has(a)
                                    ? p--
                                    : _.get(r) > _.get(a)
                                    ? (v.add(r), y(t))
                                    : (w.add(a), p--)
                                : (l(n, o), p--);
                        }
                        for (; p--; ) {
                            const t = e[p];
                            b.has(t.key) || l(t, o);
                        }
                        for (; h; ) y(m[h - 1]);
                        return m;
                    })(s, r, h, 1, e, c, l, n, re, Dn, null, zn)),
                    ee()),
                    (!a || 64 & r) && x(n, "padding-top", e[6] + "px"),
                    (!a || 128 & r) && x(n, "padding-bottom", e[7] + "px"),
                    (!a || 1 & r) && x(t, "height", e[0]);
            },
            i(e) {
                if (!a) {
                    for (let e = 0; e < c.length; e += 1) te(s[e]);
                    a = !0;
                }
            },
            o(e) {
                for (let e = 0; e < s.length; e += 1) ne(s[e]);
                a = !1;
            },
            d(n) {
                n && p(t);
                for (let e = 0; e < s.length; e += 1) s[e].d();
                e[16](null), e[17](null), r(), (i = !1), o();
            },
        };
    }
    function Fn(e, t, n) {
        let r,
            a,
            i,
            o,
            s,
            l,
            { $$slots: c = {}, $$scope: u } = t,
            { items: d } = t,
            { height: p = "100%" } = t,
            { itemHeight: h = 40 } = t,
            { hoverItemIndex: g = 0 } = t,
            { start: f = 0 } = t,
            { end: m = 0 } = t,
            b = [],
            _ = 0,
            w = 0,
            v = 0;
        return (
            O(() => {
                (r = i.getElementsByTagName("svelte-virtual-list-row")),
                    n(13, (s = !0));
            }),
            (e.$$set = (e) => {
                "items" in e && n(11, (d = e.items)),
                    "height" in e && n(0, (p = e.height)),
                    "itemHeight" in e && n(12, (h = e.itemHeight)),
                    "hoverItemIndex" in e && n(1, (g = e.hoverItemIndex)),
                    "start" in e && n(9, (f = e.start)),
                    "end" in e && n(10, (m = e.end)),
                    "$$scope" in e && n(14, (u = e.$$scope));
            }),
            (e.$$.update = () => {
                3584 & e.$$.dirty &&
                    n(
                        5,
                        (o = d
                            .slice(f, m)
                            .map((e, t) => ({ index: t + f, data: e })))
                    ),
                    14340 & e.$$.dirty &&
                        s &&
                        (async function (e, t, i) {
                            const { scrollTop: o } = a;
                            await G();
                            let s = w - o,
                                c = f;
                            for (; s < t && c < e.length; ) {
                                let e = r[c - f];
                                e ||
                                    (n(10, (m = c + 1)),
                                    await G(),
                                    (e = r[c - f]));
                                (s += b[c] = i || e.offsetHeight), (c += 1);
                            }
                            n(10, (m = c));
                            const u = e.length - m;
                            (l = (w + s) / m),
                                n(7, (v = u * l)),
                                (b.length = e.length),
                                n(3, (a.scrollTop = 0), a);
                        })(d, _, h);
            }),
            [
                p,
                g,
                _,
                a,
                i,
                o,
                w,
                v,
                async function () {
                    const { scrollTop: e } = a,
                        t = f;
                    for (let e = 0; e < r.length; e += 1)
                        b[f + e] = h || r[e].offsetHeight;
                    let i = 0,
                        o = 0;
                    for (; i < d.length; ) {
                        const t = b[i] || l;
                        if (o + t > e) {
                            n(9, (f = i)), n(6, (w = o));
                            break;
                        }
                        (o += t), (i += 1);
                    }
                    for (
                        ;
                        i < d.length &&
                        ((o += b[i] || l), (i += 1), !(o > e + _));

                    );
                    n(10, (m = i));
                    const s = d.length - m;
                    for (l = o / m; i < d.length; ) b[i++] = l;
                    if ((n(7, (v = s * l)), f < t)) {
                        await G();
                        let n = 0,
                            i = 0;
                        for (let e = f; e < t; e += 1)
                            r[e - f] &&
                                ((n += b[e]),
                                (i += h || r[e - f].offsetHeight));
                        const o = i - n;
                        a.scrollTo(0, e + o);
                    }
                },
                f,
                m,
                d,
                h,
                s,
                u,
                c,
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (i = e), n(4, i);
                    });
                },
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (a = e), n(3, a);
                    });
                },
                function () {
                    (_ = this.offsetHeight), n(2, _);
                },
            ]
        );
    }
    class Gn extends ue {
        constructor(e) {
            super(),
                ce(this, e, Fn, Un, o, {
                    items: 11,
                    height: 0,
                    itemHeight: 12,
                    hoverItemIndex: 1,
                    start: 9,
                    end: 10,
                });
        }
    }
    function Vn(e, t, n) {
        const r = e.slice();
        return (r[34] = t[n]), (r[36] = n), r;
    }
    function Wn(e) {
        let t, n, r;
        return (
            (n = new Gn({
                props: {
                    items: e[4],
                    itemHeight: e[7],
                    $$slots: {
                        default: [
                            Kn,
                            ({ item: e, i: t }) => ({ 34: e, 36: t }),
                            ({ item: e, i: t }) => [
                                0,
                                (e ? 8 : 0) | (t ? 32 : 0),
                            ],
                        ],
                    },
                    $$scope: { ctx: e },
                },
            })),
            {
                c() {
                    (t = g("div")),
                        oe(n.$$.fragment),
                        v(
                            t,
                            "class",
                            "listContainer virtualList svelte-1rmpqnb"
                        );
                },
                m(a, i) {
                    d(a, t, i), se(n, t, null), e[20](t), (r = !0);
                },
                p(e, t) {
                    const r = {};
                    16 & t[0] && (r.items = e[4]),
                        128 & t[0] && (r.itemHeight = e[7]),
                        (4918 & t[0]) | (104 & t[1]) &&
                            (r.$$scope = { dirty: t, ctx: e }),
                        n.$set(r);
                },
                i(e) {
                    r || (te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    ne(n.$$.fragment, e), (r = !1);
                },
                d(r) {
                    r && p(t), le(n), e[20](null);
                },
            }
        );
    }
    function Kn(e) {
        let t, n, r, i, o;
        var s = e[2];
        function l(e) {
            return {
                props: {
                    item: e[34],
                    filterText: e[12],
                    getOptionLabel: e[5],
                    isFirst: rr(e[36]),
                    isActive: nr(e[34], e[8], e[9]),
                    isHover: ar(e[1], e[34], e[36], e[4]),
                },
            };
        }
        function c() {
            return e[18](e[36]);
        }
        function u(...t) {
            return e[19](e[34], e[36], ...t);
        }
        return (
            s && (n = new s(l(e))),
            {
                c() {
                    (t = g("div")),
                        n && oe(n.$$.fragment),
                        v(t, "class", "listItem");
                },
                m(e, a) {
                    d(e, t, a),
                        n && se(n, t, null),
                        (r = !0),
                        i ||
                            ((o = [w(t, "mouseover", c), w(t, "click", u)]),
                            (i = !0));
                },
                p(r, a) {
                    e = r;
                    const i = {};
                    if (
                        (8 & a[1] && (i.item = e[34]),
                        4096 & a[0] && (i.filterText = e[12]),
                        32 & a[0] && (i.getOptionLabel = e[5]),
                        32 & a[1] && (i.isFirst = rr(e[36])),
                        (768 & a[0]) | (8 & a[1]) &&
                            (i.isActive = nr(e[34], e[8], e[9])),
                        (18 & a[0]) | (40 & a[1]) &&
                            (i.isHover = ar(e[1], e[34], e[36], e[4])),
                        s !== (s = e[2]))
                    ) {
                        if (n) {
                            Y();
                            const e = n;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        s
                            ? ((n = new s(l(e))),
                              oe(n.$$.fragment),
                              te(n.$$.fragment, 1),
                              se(n, t, null))
                            : (n = null);
                    } else s && n.$set(i);
                },
                i(e) {
                    r || (n && te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    n && ne(n.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(t), n && le(n), (i = !1), a(o);
                },
            }
        );
    }
    function Jn(e) {
        let t,
            n,
            r = e[4],
            a = [];
        for (let t = 0; t < r.length; t += 1) a[t] = er(Vn(e, r, t));
        const i = (e) =>
            ne(a[e], 1, 1, () => {
                a[e] = null;
            });
        let o = null;
        return (
            r.length || (o = Zn(e)),
            {
                c() {
                    t = g("div");
                    for (let e = 0; e < a.length; e += 1) a[e].c();
                    o && o.c(), v(t, "class", "listContainer svelte-1rmpqnb");
                },
                m(r, i) {
                    d(r, t, i);
                    for (let e = 0; e < a.length; e += 1) a[e].m(t, null);
                    o && o.m(t, null), e[23](t), (n = !0);
                },
                p(e, n) {
                    if (32630 & n[0]) {
                        let s;
                        for (r = e[4], s = 0; s < r.length; s += 1) {
                            const i = Vn(e, r, s);
                            a[s]
                                ? (a[s].p(i, n), te(a[s], 1))
                                : ((a[s] = er(i)),
                                  a[s].c(),
                                  te(a[s], 1),
                                  a[s].m(t, null));
                        }
                        for (Y(), s = r.length; s < a.length; s += 1) i(s);
                        ee(),
                            !r.length && o
                                ? o.p(e, n)
                                : r.length
                                ? o && (o.d(1), (o = null))
                                : ((o = Zn(e)), o.c(), o.m(t, null));
                    }
                },
                i(e) {
                    if (!n) {
                        for (let e = 0; e < r.length; e += 1) te(a[e]);
                        n = !0;
                    }
                },
                o(e) {
                    a = a.filter(Boolean);
                    for (let e = 0; e < a.length; e += 1) ne(a[e]);
                    n = !1;
                },
                d(n) {
                    n && p(t), h(a, n), o && o.d(), e[23](null);
                },
            }
        );
    }
    function Zn(e) {
        let t,
            n = !e[10] && Qn(e);
        return {
            c() {
                n && n.c(), (t = _());
            },
            m(e, r) {
                n && n.m(e, r), d(e, t, r);
            },
            p(e, r) {
                e[10]
                    ? n && (n.d(1), (n = null))
                    : n
                    ? n.p(e, r)
                    : ((n = Qn(e)), n.c(), n.m(t.parentNode, t));
            },
            d(e) {
                n && n.d(e), e && p(t);
            },
        };
    }
    function Qn(e) {
        let t, n;
        return {
            c() {
                (t = g("div")),
                    (n = m(e[11])),
                    v(t, "class", "empty svelte-1rmpqnb");
            },
            m(e, r) {
                d(e, t, r), u(t, n);
            },
            p(e, t) {
                2048 & t[0] && $(n, e[11]);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function Xn(e) {
        let t, n, r, i, o, s;
        var l = e[2];
        function c(e) {
            return {
                props: {
                    item: e[34],
                    filterText: e[12],
                    getOptionLabel: e[5],
                    isFirst: rr(e[36]),
                    isActive: nr(e[34], e[8], e[9]),
                    isHover: ar(e[1], e[34], e[36], e[4]),
                },
            };
        }
        function h() {
            return e[21](e[36]);
        }
        function f(...t) {
            return e[22](e[34], e[36], ...t);
        }
        return (
            l && (n = new l(c(e))),
            {
                c() {
                    (t = g("div")),
                        n && oe(n.$$.fragment),
                        (r = b()),
                        v(t, "class", "listItem");
                },
                m(e, a) {
                    d(e, t, a),
                        n && se(n, t, null),
                        u(t, r),
                        (i = !0),
                        o ||
                            ((s = [w(t, "mouseover", h), w(t, "click", f)]),
                            (o = !0));
                },
                p(a, i) {
                    e = a;
                    const o = {};
                    if (
                        (16 & i[0] && (o.item = e[34]),
                        4096 & i[0] && (o.filterText = e[12]),
                        32 & i[0] && (o.getOptionLabel = e[5]),
                        784 & i[0] && (o.isActive = nr(e[34], e[8], e[9])),
                        18 & i[0] && (o.isHover = ar(e[1], e[34], e[36], e[4])),
                        l !== (l = e[2]))
                    ) {
                        if (n) {
                            Y();
                            const e = n;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        l
                            ? ((n = new l(c(e))),
                              oe(n.$$.fragment),
                              te(n.$$.fragment, 1),
                              se(n, t, r))
                            : (n = null);
                    } else l && n.$set(o);
                },
                i(e) {
                    i || (n && te(n.$$.fragment, e), (i = !0));
                },
                o(e) {
                    n && ne(n.$$.fragment, e), (i = !1);
                },
                d(e) {
                    e && p(t), n && le(n), (o = !1), a(s);
                },
            }
        );
    }
    function Yn(t) {
        let n,
            r,
            a = t[6](t[34]) + "";
        return {
            c() {
                (n = g("div")),
                    (r = m(a)),
                    v(n, "class", "listGroupTitle svelte-1rmpqnb");
            },
            m(e, t) {
                d(e, n, t), u(n, r);
            },
            p(e, t) {
                80 & t[0] && a !== (a = e[6](e[34]) + "") && $(r, a);
            },
            i: e,
            o: e,
            d(e) {
                e && p(n);
            },
        };
    }
    function er(e) {
        let t, n, r, a;
        const i = [Yn, Xn],
            o = [];
        function s(e, t) {
            return e[34].isGroupHeader && !e[34].isSelectable ? 0 : 1;
        }
        return (
            (t = s(e)),
            (n = o[t] = i[t](e)),
            {
                c() {
                    n.c(), (r = _());
                },
                m(e, n) {
                    o[t].m(e, n), d(e, r, n), (a = !0);
                },
                p(e, a) {
                    let l = t;
                    (t = s(e)),
                        t === l
                            ? o[t].p(e, a)
                            : (Y(),
                              ne(o[l], 1, 1, () => {
                                  o[l] = null;
                              }),
                              ee(),
                              (n = o[t]),
                              n ? n.p(e, a) : ((n = o[t] = i[t](e)), n.c()),
                              te(n, 1),
                              n.m(r.parentNode, r));
                },
                i(e) {
                    a || (te(n), (a = !0));
                },
                o(e) {
                    ne(n), (a = !1);
                },
                d(e) {
                    o[t].d(e), e && p(r);
                },
            }
        );
    }
    function tr(e) {
        let t,
            n,
            r,
            a,
            i,
            o = e[3] && Wn(e),
            s = !e[3] && Jn(e);
        return {
            c() {
                o && o.c(), (t = b()), s && s.c(), (n = _());
            },
            m(l, c) {
                o && o.m(l, c),
                    d(l, t, c),
                    s && s.m(l, c),
                    d(l, n, c),
                    (r = !0),
                    a || ((i = w(window, "keydown", e[15])), (a = !0));
            },
            p(e, r) {
                e[3]
                    ? o
                        ? (o.p(e, r), 8 & r[0] && te(o, 1))
                        : ((o = Wn(e)), o.c(), te(o, 1), o.m(t.parentNode, t))
                    : o &&
                      (Y(),
                      ne(o, 1, 1, () => {
                          o = null;
                      }),
                      ee()),
                    e[3]
                        ? s &&
                          (Y(),
                          ne(s, 1, 1, () => {
                              s = null;
                          }),
                          ee())
                        : s
                        ? (s.p(e, r), 8 & r[0] && te(s, 1))
                        : ((s = Jn(e)), s.c(), te(s, 1), s.m(n.parentNode, n));
            },
            i(e) {
                r || (te(o), te(s), (r = !0));
            },
            o(e) {
                ne(o), ne(s), (r = !1);
            },
            d(e) {
                o && o.d(e), e && p(t), s && s.d(e), e && p(n), (a = !1), i();
            },
        };
    }
    function nr(e, t, n) {
        return t && t[n] === e[n];
    }
    function rr(e) {
        return 0 === e;
    }
    function ar(e, t, n, r) {
        return e === n || 1 === r.length;
    }
    function ir(e, t, n) {
        const r = R();
        let a,
            { container: i } = t,
            { Item: o = Hn } = t,
            { isVirtualList: s = !1 } = t,
            { items: l = [] } = t,
            {
                getOptionLabel: c = (e, t) => {
                    if (e) return e.isCreator ? `Create "${t}"` : e.label;
                },
            } = t,
            { getGroupHeaderLabel: u = (e) => e.label } = t,
            { itemHeight: d = 40 } = t,
            { hoverItemIndex: p = 0 } = t,
            { selectedValue: h } = t,
            { optionIdentifier: g = "value" } = t,
            { hideEmptyState: f = !1 } = t,
            { noOptionsMessage: m = "No options" } = t,
            { isMulti: b = !1 } = t,
            { activeItemIndex: _ = 0 } = t,
            { filterText: w = "" } = t,
            v = 0,
            y = !1;
        function k(e) {
            e.isCreator || r("itemSelected", e);
        }
        function $(e) {
            y || n(1, (p = e));
        }
        function E(e) {
            const { item: t, i: a, event: i } = e;
            if ((i.stopPropagation(), h && !b && h[g] === t[g])) return x();
            t.isCreator
                ? r("itemCreated", w)
                : (n(16, (_ = a)), n(1, (p = a)), k(t));
        }
        function x() {
            r("closeList");
        }
        async function S(e) {
            if (s) return;
            let t = !0;
            for (; t; )
                e > 0 && p === l.length - 1
                    ? n(1, (p = 0))
                    : n(1, e < 0 && 0 === p ? (p = l.length - 1) : (p += e)),
                    (t = l[p].isGroupHeader && !l[p].isSelectable);
            await G(), C("hover");
        }
        function C(e) {
            if (s || !i) return;
            let t;
            const r = i.querySelector(".listItem ." + e);
            r &&
                (t =
                    i.getBoundingClientRect().bottom -
                    r.getBoundingClientRect().bottom),
                n(0, (i.scrollTop -= t), i);
        }
        O(() => {
            if (l.length > 0 && !b && h) {
                const e = l.findIndex((e) => e[g] === h[g]);
                e && n(1, (p = e));
            }
            C("active"),
                i.addEventListener(
                    "scroll",
                    () => {
                        clearTimeout(v),
                            (v = setTimeout(() => {
                                y = !1;
                            }, 100));
                    },
                    !1
                );
        }),
            P(() => {}),
            N(() => {
                l !== a && l.length > 0 && n(1, (p = 0)), (a = l);
            });
        return (
            (e.$$set = (e) => {
                "container" in e && n(0, (i = e.container)),
                    "Item" in e && n(2, (o = e.Item)),
                    "isVirtualList" in e && n(3, (s = e.isVirtualList)),
                    "items" in e && n(4, (l = e.items)),
                    "getOptionLabel" in e && n(5, (c = e.getOptionLabel)),
                    "getGroupHeaderLabel" in e &&
                        n(6, (u = e.getGroupHeaderLabel)),
                    "itemHeight" in e && n(7, (d = e.itemHeight)),
                    "hoverItemIndex" in e && n(1, (p = e.hoverItemIndex)),
                    "selectedValue" in e && n(8, (h = e.selectedValue)),
                    "optionIdentifier" in e && n(9, (g = e.optionIdentifier)),
                    "hideEmptyState" in e && n(10, (f = e.hideEmptyState)),
                    "noOptionsMessage" in e && n(11, (m = e.noOptionsMessage)),
                    "isMulti" in e && n(17, (b = e.isMulti)),
                    "activeItemIndex" in e && n(16, (_ = e.activeItemIndex)),
                    "filterText" in e && n(12, (w = e.filterText));
            }),
            [
                i,
                p,
                o,
                s,
                l,
                c,
                u,
                d,
                h,
                g,
                f,
                m,
                w,
                $,
                E,
                function (e) {
                    switch (e.key) {
                        case "ArrowDown":
                            e.preventDefault(), l.length && S(1);
                            break;
                        case "ArrowUp":
                            e.preventDefault(), l.length && S(-1);
                            break;
                        case "Enter":
                            if ((e.preventDefault(), 0 === l.length)) break;
                            const t = l[p];
                            if (h && !b && h[g] === t[g]) {
                                x();
                                break;
                            }
                            t.isCreator
                                ? r("itemCreated", w)
                                : (n(16, (_ = p)), k(l[p]));
                            break;
                        case "Tab":
                            if ((e.preventDefault(), 0 === l.length)) break;
                            if (h && h[g] === l[p][g]) return x();
                            n(16, (_ = p)), k(l[p]);
                    }
                },
                _,
                b,
                (e) => $(e),
                (e, t, n) => E({ item: e, i: t, event: n }),
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (i = e), n(0, i);
                    });
                },
                (e) => $(e),
                (e, t, n) => E({ item: e, i: t, event: n }),
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (i = e), n(0, i);
                    });
                },
            ]
        );
    }
    class or extends ue {
        constructor(e) {
            super(),
                ce(
                    this,
                    e,
                    ir,
                    tr,
                    o,
                    {
                        container: 0,
                        Item: 2,
                        isVirtualList: 3,
                        items: 4,
                        getOptionLabel: 5,
                        getGroupHeaderLabel: 6,
                        itemHeight: 7,
                        hoverItemIndex: 1,
                        selectedValue: 8,
                        optionIdentifier: 9,
                        hideEmptyState: 10,
                        noOptionsMessage: 11,
                        isMulti: 17,
                        activeItemIndex: 16,
                        filterText: 12,
                    },
                    [-1, -1]
                );
        }
    }
    function sr(t) {
        let n,
            r = t[0](t[1]) + "";
        return {
            c() {
                (n = g("div")), v(n, "class", "selection svelte-17yna57");
            },
            m(e, t) {
                d(e, n, t), (n.innerHTML = r);
            },
            p(e, [t]) {
                3 & t && r !== (r = e[0](e[1]) + "") && (n.innerHTML = r);
            },
            i: e,
            o: e,
            d(e) {
                e && p(n);
            },
        };
    }
    function lr(e, t, n) {
        let { getSelectionLabel: r } = t,
            { item: a } = t;
        return (
            (e.$$set = (e) => {
                "getSelectionLabel" in e && n(0, (r = e.getSelectionLabel)),
                    "item" in e && n(1, (a = e.item));
            }),
            [r, a]
        );
    }
    class cr extends ue {
        constructor(e) {
            super(), ce(this, e, lr, sr, o, { getSelectionLabel: 0, item: 1 });
        }
    }
    function ur(e, t, n) {
        const r = e.slice();
        return (r[9] = t[n]), (r[11] = n), r;
    }
    function dr(e) {
        let t, n, r;
        function a(...t) {
            return e[6](e[11], ...t);
        }
        return {
            c() {
                (t = g("div")),
                    (t.innerHTML =
                        '<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-1k6n0vy"><path d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>'),
                    v(t, "class", "multiSelectItem_clear svelte-1k6n0vy");
            },
            m(e, i) {
                d(e, t, i), n || ((r = w(t, "click", a)), (n = !0));
            },
            p(t, n) {
                e = t;
            },
            d(e) {
                e && p(t), (n = !1), r();
            },
        };
    }
    function pr(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s,
            l = e[4](e[9]) + "",
            c = !e[2] && !e[3] && dr(e);
        function h(...t) {
            return e[7](e[11], ...t);
        }
        return {
            c() {
                (t = g("div")),
                    (n = g("div")),
                    (r = b()),
                    c && c.c(),
                    (a = b()),
                    v(n, "class", "multiSelectItem_label svelte-1k6n0vy"),
                    v(
                        t,
                        "class",
                        (i =
                            "multiSelectItem " +
                            (e[1] === e[11] ? "active" : "") +
                            " " +
                            (e[2] ? "disabled" : "") +
                            " svelte-1k6n0vy")
                    );
            },
            m(e, i) {
                d(e, t, i),
                    u(t, n),
                    (n.innerHTML = l),
                    u(t, r),
                    c && c.m(t, null),
                    u(t, a),
                    o || ((s = w(t, "click", h)), (o = !0));
            },
            p(r, o) {
                (e = r),
                    17 & o && l !== (l = e[4](e[9]) + "") && (n.innerHTML = l),
                    e[2] || e[3]
                        ? c && (c.d(1), (c = null))
                        : c
                        ? c.p(e, o)
                        : ((c = dr(e)), c.c(), c.m(t, a)),
                    6 & o &&
                        i !==
                            (i =
                                "multiSelectItem " +
                                (e[1] === e[11] ? "active" : "") +
                                " " +
                                (e[2] ? "disabled" : "") +
                                " svelte-1k6n0vy") &&
                        v(t, "class", i);
            },
            d(e) {
                e && p(t), c && c.d(), (o = !1), s();
            },
        };
    }
    function hr(t) {
        let n,
            r = t[0],
            a = [];
        for (let e = 0; e < r.length; e += 1) a[e] = pr(ur(t, r, e));
        return {
            c() {
                for (let e = 0; e < a.length; e += 1) a[e].c();
                n = _();
            },
            m(e, t) {
                for (let n = 0; n < a.length; n += 1) a[n].m(e, t);
                d(e, n, t);
            },
            p(e, [t]) {
                if (63 & t) {
                    let i;
                    for (r = e[0], i = 0; i < r.length; i += 1) {
                        const o = ur(e, r, i);
                        a[i]
                            ? a[i].p(o, t)
                            : ((a[i] = pr(o)),
                              a[i].c(),
                              a[i].m(n.parentNode, n));
                    }
                    for (; i < a.length; i += 1) a[i].d(1);
                    a.length = r.length;
                }
            },
            i: e,
            o: e,
            d(e) {
                h(a, e), e && p(n);
            },
        };
    }
    function gr(e, t, n) {
        const r = R();
        let { selectedValue: a = [] } = t,
            { activeSelectedValue: i } = t,
            { isDisabled: o = !1 } = t,
            { multiFullItemClearable: s = !1 } = t,
            { getSelectionLabel: l } = t;
        function c(e, t) {
            t.stopPropagation(), r("multiItemClear", { i: e });
        }
        return (
            (e.$$set = (e) => {
                "selectedValue" in e && n(0, (a = e.selectedValue)),
                    "activeSelectedValue" in e &&
                        n(1, (i = e.activeSelectedValue)),
                    "isDisabled" in e && n(2, (o = e.isDisabled)),
                    "multiFullItemClearable" in e &&
                        n(3, (s = e.multiFullItemClearable)),
                    "getSelectionLabel" in e && n(4, (l = e.getSelectionLabel));
            }),
            [a, i, o, s, l, c, (e, t) => c(e, t), (e, t) => (s ? c(e, t) : {})]
        );
    }
    class fr extends ue {
        constructor(e) {
            super(),
                ce(this, e, gr, hr, o, {
                    selectedValue: 0,
                    activeSelectedValue: 1,
                    isDisabled: 2,
                    multiFullItemClearable: 3,
                    getSelectionLabel: 4,
                });
        }
    }
    function mr(t) {
        let n, r;
        return {
            c() {
                (n = f("svg")),
                    (r = f("path")),
                    v(r, "fill", "currentColor"),
                    v(
                        r,
                        "d",
                        "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"
                    ),
                    v(n, "width", "100%"),
                    v(n, "height", "100%"),
                    v(n, "viewBox", "-2 -2 50 50"),
                    v(n, "focusable", "false"),
                    v(n, "role", "presentation");
            },
            m(e, t) {
                d(e, n, t), u(n, r);
            },
            p: e,
            i: e,
            o: e,
            d(e) {
                e && p(n);
            },
        };
    }
    class br extends ue {
        constructor(e) {
            super(), ce(this, e, null, mr, o, {});
        }
    }
    function _r(e) {
        let n, r, a;
        const i = [e[18]];
        var o = e[17];
        function s(e) {
            let n = {};
            for (let e = 0; e < i.length; e += 1) n = t(n, i[e]);
            return { props: n };
        }
        return (
            o && (n = new o(s())),
            {
                c() {
                    n && oe(n.$$.fragment), (r = _());
                },
                m(e, t) {
                    n && se(n, e, t), d(e, r, t), (a = !0);
                },
                p(e, t) {
                    const a = 262144 & t[0] ? ae(i, [ie(e[18])]) : {};
                    if (o !== (o = e[17])) {
                        if (n) {
                            Y();
                            const e = n;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        o
                            ? ((n = new o(s())),
                              oe(n.$$.fragment),
                              te(n.$$.fragment, 1),
                              se(n, r.parentNode, r))
                            : (n = null);
                    } else o && n.$set(a);
                },
                i(e) {
                    a || (n && te(n.$$.fragment, e), (a = !0));
                },
                o(e) {
                    n && ne(n.$$.fragment, e), (a = !1);
                },
                d(e) {
                    e && p(r), n && le(n, e);
                },
            }
        );
    }
    function wr(e) {
        let t, n, r;
        var a = e[7];
        function i(e) {
            return {
                props: {
                    selectedValue: e[0],
                    getSelectionLabel: e[13],
                    activeSelectedValue: e[25],
                    isDisabled: e[10],
                    multiFullItemClearable: e[9],
                },
            };
        }
        return (
            a &&
                ((t = new a(i(e))),
                t.$on("multiItemClear", e[29]),
                t.$on("focus", e[32])),
            {
                c() {
                    t && oe(t.$$.fragment), (n = _());
                },
                m(e, a) {
                    t && se(t, e, a), d(e, n, a), (r = !0);
                },
                p(e, r) {
                    const o = {};
                    if (
                        (1 & r[0] && (o.selectedValue = e[0]),
                        8192 & r[0] && (o.getSelectionLabel = e[13]),
                        33554432 & r[0] && (o.activeSelectedValue = e[25]),
                        1024 & r[0] && (o.isDisabled = e[10]),
                        512 & r[0] && (o.multiFullItemClearable = e[9]),
                        a !== (a = e[7]))
                    ) {
                        if (t) {
                            Y();
                            const e = t;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        a
                            ? ((t = new a(i(e))),
                              t.$on("multiItemClear", e[29]),
                              t.$on("focus", e[32]),
                              oe(t.$$.fragment),
                              te(t.$$.fragment, 1),
                              se(t, n.parentNode, n))
                            : (t = null);
                    } else a && t.$set(o);
                },
                i(e) {
                    r || (t && te(t.$$.fragment, e), (r = !0));
                },
                o(e) {
                    t && ne(t.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(n), t && le(t, e);
                },
            }
        );
    }
    function vr(e) {
        let n,
            r,
            i,
            o = [e[26], { placeholder: e[28] }, { style: e[15] }],
            s = {};
        for (let e = 0; e < o.length; e += 1) s = t(s, o[e]);
        return {
            c() {
                (n = g("input")), y(n, s), M(n, "svelte-l63srs", !0);
            },
            m(t, a) {
                d(t, n, a),
                    e[63](n),
                    E(n, e[1]),
                    r ||
                        ((i = [w(n, "focus", e[32]), w(n, "input", e[64])]),
                        (r = !0));
            },
            p(e, t) {
                y(
                    n,
                    (s = ae(o, [
                        67108864 & t[0] && e[26],
                        268435456 & t[0] && { placeholder: e[28] },
                        32768 & t[0] && { style: e[15] },
                    ]))
                ),
                    2 & t[0] && n.value !== e[1] && E(n, e[1]),
                    M(n, "svelte-l63srs", !0);
            },
            d(t) {
                t && p(n), e[63](null), (r = !1), a(i);
            },
        };
    }
    function yr(e) {
        let n,
            r,
            i,
            o = [
                e[26],
                { placeholder: e[28] },
                { style: e[15] },
                { disabled: !0 },
            ],
            s = {};
        for (let e = 0; e < o.length; e += 1) s = t(s, o[e]);
        return {
            c() {
                (n = g("input")), y(n, s), M(n, "svelte-l63srs", !0);
            },
            m(t, a) {
                d(t, n, a),
                    e[61](n),
                    E(n, e[1]),
                    r ||
                        ((i = [w(n, "focus", e[32]), w(n, "input", e[62])]),
                        (r = !0));
            },
            p(e, t) {
                y(
                    n,
                    (s = ae(o, [
                        67108864 & t[0] && e[26],
                        268435456 & t[0] && { placeholder: e[28] },
                        32768 & t[0] && { style: e[15] },
                        { disabled: !0 },
                    ]))
                ),
                    2 & t[0] && n.value !== e[1] && E(n, e[1]),
                    M(n, "svelte-l63srs", !0);
            },
            d(t) {
                t && p(n), e[61](null), (r = !1), a(i);
            },
        };
    }
    function kr(e) {
        let t, n, r, a, i;
        var o = e[6];
        function s(e) {
            return { props: { item: e[0], getSelectionLabel: e[13] } };
        }
        return (
            o && (n = new o(s(e))),
            {
                c() {
                    (t = g("div")),
                        n && oe(n.$$.fragment),
                        v(t, "class", "selectedItem svelte-l63srs");
                },
                m(o, s) {
                    d(o, t, s),
                        n && se(n, t, null),
                        (r = !0),
                        a || ((i = w(t, "focus", e[32])), (a = !0));
                },
                p(e, r) {
                    const a = {};
                    if (
                        (1 & r[0] && (a.item = e[0]),
                        8192 & r[0] && (a.getSelectionLabel = e[13]),
                        o !== (o = e[6]))
                    ) {
                        if (n) {
                            Y();
                            const e = n;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        o
                            ? ((n = new o(s(e))),
                              oe(n.$$.fragment),
                              te(n.$$.fragment, 1),
                              se(n, t, null))
                            : (n = null);
                    } else o && n.$set(a);
                },
                i(e) {
                    r || (n && te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    n && ne(n.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(t), n && le(n), (a = !1), i();
                },
            }
        );
    }
    function $r(e) {
        let t, n, r, a, i;
        var o = e[23];
        return (
            o && (n = new o({})),
            {
                c() {
                    (t = g("div")),
                        n && oe(n.$$.fragment),
                        v(t, "class", "clearSelect svelte-l63srs");
                },
                m(o, s) {
                    var l;
                    d(o, t, s),
                        n && se(n, t, null),
                        (r = !0),
                        a ||
                            ((i = w(
                                t,
                                "click",
                                ((l = e[24]),
                                function (e) {
                                    return e.preventDefault(), l.call(this, e);
                                })
                            )),
                            (a = !0));
                },
                p(e, r) {
                    if (o !== (o = e[23])) {
                        if (n) {
                            Y();
                            const e = n;
                            ne(e.$$.fragment, 1, 0, () => {
                                le(e, 1);
                            }),
                                ee();
                        }
                        o
                            ? ((n = new o({})),
                              oe(n.$$.fragment),
                              te(n.$$.fragment, 1),
                              se(n, t, null))
                            : (n = null);
                    }
                },
                i(e) {
                    r || (n && te(n.$$.fragment, e), (r = !0));
                },
                o(e) {
                    n && ne(n.$$.fragment, e), (r = !1);
                },
                d(e) {
                    e && p(t), n && le(n), (a = !1), i();
                },
            }
        );
    }
    function Er(e) {
        let t;
        function n(e, t) {
            return e[22] ? Sr : xr;
        }
        let r = n(e),
            a = r(e);
        return {
            c() {
                (t = g("div")), a.c(), v(t, "class", "indicator svelte-l63srs");
            },
            m(e, n) {
                d(e, t, n), a.m(t, null);
            },
            p(e, i) {
                r === (r = n(e)) && a
                    ? a.p(e, i)
                    : (a.d(1), (a = r(e)), a && (a.c(), a.m(t, null)));
            },
            d(e) {
                e && p(t), a.d();
            },
        };
    }
    function xr(t) {
        let n, r;
        return {
            c() {
                (n = f("svg")),
                    (r = f("path")),
                    v(
                        r,
                        "d",
                        "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n            3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n            1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n            0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n            0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                    ),
                    v(n, "width", "100%"),
                    v(n, "height", "100%"),
                    v(n, "viewBox", "0 0 20 20"),
                    v(n, "focusable", "false"),
                    v(n, "class", "svelte-l63srs");
            },
            m(e, t) {
                d(e, n, t), u(n, r);
            },
            p: e,
            d(e) {
                e && p(n);
            },
        };
    }
    function Sr(e) {
        let t, n;
        return {
            c() {
                (n = _()), (t = new T(n));
            },
            m(r, a) {
                t.m(e[22], r, a), d(r, n, a);
            },
            p(e, n) {
                4194304 & n[0] && t.p(e[22]);
            },
            d(e) {
                e && p(n), e && t.d();
            },
        };
    }
    function Cr(e) {
        let t;
        return {
            c() {
                (t = g("div")),
                    (t.innerHTML =
                        '<svg class="spinner_icon svelte-l63srs" viewBox="25 25 50 50"><circle class="spinner_path svelte-l63srs" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>'),
                    v(t, "class", "spinner svelte-l63srs");
            },
            m(e, n) {
                d(e, t, n);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function Ar(e) {
        let t,
            n,
            r,
            i,
            o,
            s,
            l,
            c,
            h,
            f,
            m,
            _ = e[17] && _r(e),
            y = e[8] && e[0] && e[0].length > 0 && wr(e);
        function k(e, t) {
            return e[10] ? yr : vr;
        }
        let $ = k(e),
            E = $(e),
            x = !e[8] && e[27] && kr(e),
            S = e[27] && e[16] && !e[10] && !e[5] && $r(e),
            C =
                (e[20] ||
                    (e[19] && !e[0]) ||
                    (!e[14] &&
                        !e[10] &&
                        !e[5] &&
                        ((e[27] && !e[16]) || !e[27]))) &&
                Er(e),
            A = e[5] && Cr();
        return {
            c() {
                (t = g("div")),
                    _ && _.c(),
                    (n = b()),
                    y && y.c(),
                    (r = b()),
                    E.c(),
                    (i = b()),
                    x && x.c(),
                    (o = b()),
                    S && S.c(),
                    (s = b()),
                    C && C.c(),
                    (l = b()),
                    A && A.c(),
                    v(
                        t,
                        "class",
                        (c = "selectContainer " + e[21] + " svelte-l63srs")
                    ),
                    v(t, "style", e[12]),
                    M(t, "hasError", e[11]),
                    M(t, "multiSelect", e[8]),
                    M(t, "disabled", e[10]),
                    M(t, "focused", e[4]);
            },
            m(a, c) {
                d(a, t, c),
                    _ && _.m(t, null),
                    u(t, n),
                    y && y.m(t, null),
                    u(t, r),
                    E.m(t, null),
                    u(t, i),
                    x && x.m(t, null),
                    u(t, o),
                    S && S.m(t, null),
                    u(t, s),
                    C && C.m(t, null),
                    u(t, l),
                    A && A.m(t, null),
                    e[65](t),
                    (h = !0),
                    f ||
                        ((m = [
                            w(window, "click", e[33]),
                            w(window, "keydown", e[31]),
                            w(window, "resize", e[30]),
                            w(t, "click", e[34]),
                        ]),
                        (f = !0));
            },
            p(e, a) {
                e[17]
                    ? _
                        ? (_.p(e, a), 131072 & a[0] && te(_, 1))
                        : ((_ = _r(e)), _.c(), te(_, 1), _.m(t, n))
                    : _ &&
                      (Y(),
                      ne(_, 1, 1, () => {
                          _ = null;
                      }),
                      ee()),
                    e[8] && e[0] && e[0].length > 0
                        ? y
                            ? (y.p(e, a), 257 & a[0] && te(y, 1))
                            : ((y = wr(e)), y.c(), te(y, 1), y.m(t, r))
                        : y &&
                          (Y(),
                          ne(y, 1, 1, () => {
                              y = null;
                          }),
                          ee()),
                    $ === ($ = k(e)) && E
                        ? E.p(e, a)
                        : (E.d(1), (E = $(e)), E && (E.c(), E.m(t, i))),
                    !e[8] && e[27]
                        ? x
                            ? (x.p(e, a), 134217984 & a[0] && te(x, 1))
                            : ((x = kr(e)), x.c(), te(x, 1), x.m(t, o))
                        : x &&
                          (Y(),
                          ne(x, 1, 1, () => {
                              x = null;
                          }),
                          ee()),
                    e[27] && e[16] && !e[10] && !e[5]
                        ? S
                            ? (S.p(e, a), 134284320 & a[0] && te(S, 1))
                            : ((S = $r(e)), S.c(), te(S, 1), S.m(t, s))
                        : S &&
                          (Y(),
                          ne(S, 1, 1, () => {
                              S = null;
                          }),
                          ee()),
                    e[20] ||
                    (e[19] && !e[0]) ||
                    (!e[14] && !e[10] && !e[5] && ((e[27] && !e[16]) || !e[27]))
                        ? C
                            ? C.p(e, a)
                            : ((C = Er(e)), C.c(), C.m(t, l))
                        : C && (C.d(1), (C = null)),
                    e[5]
                        ? A || ((A = Cr()), A.c(), A.m(t, null))
                        : A && (A.d(1), (A = null)),
                    (!h ||
                        (2097152 & a[0] &&
                            c !==
                                (c =
                                    "selectContainer " +
                                    e[21] +
                                    " svelte-l63srs"))) &&
                        v(t, "class", c),
                    (!h || 4096 & a[0]) && v(t, "style", e[12]),
                    2099200 & a[0] && M(t, "hasError", e[11]),
                    2097408 & a[0] && M(t, "multiSelect", e[8]),
                    2098176 & a[0] && M(t, "disabled", e[10]),
                    2097168 & a[0] && M(t, "focused", e[4]);
            },
            i(e) {
                h || (te(_), te(y), te(x), te(S), (h = !0));
            },
            o(e) {
                ne(_), ne(y), ne(x), ne(S), (h = !1);
            },
            d(n) {
                n && p(t),
                    _ && _.d(),
                    y && y.d(),
                    E.d(),
                    x && x.d(),
                    S && S.d(),
                    C && C.d(),
                    A && A.d(),
                    e[65](null),
                    (f = !1),
                    a(m);
            },
        };
    }
    function Lr(e, t, n) {
        let r, a;
        const i = R();
        let o,
            s,
            l,
            c,
            u,
            d,
            p,
            h,
            { container: g } = t,
            { input: f } = t,
            { Item: m = Hn } = t,
            { Selection: b = cr } = t,
            { MultiSelection: _ = fr } = t,
            { isMulti: w = !1 } = t,
            { multiFullItemClearable: v = !1 } = t,
            { isDisabled: y = !1 } = t,
            { isCreatable: k = !1 } = t,
            { isFocused: $ = !1 } = t,
            { selectedValue: E } = t,
            { filterText: x = "" } = t,
            { placeholder: S = "Select..." } = t,
            { items: C = [] } = t,
            {
                itemFilter: A = (e, t, n) =>
                    e.toLowerCase().includes(t.toLowerCase()),
            } = t,
            { groupBy: L } = t,
            { groupFilter: M = (e) => e } = t,
            { isGroupHeaderSelectable: T = !1 } = t,
            { getGroupHeaderLabel: j = (e) => e.label } = t,
            {
                getOptionLabel: I = (e, t) =>
                    e.isCreator ? `Create "${t}"` : e.label,
            } = t,
            { optionIdentifier: H = "value" } = t,
            { loadOptions: B } = t,
            { hasError: q = !1 } = t,
            { containerStyles: D = "" } = t,
            {
                getSelectionLabel: U = (e) => {
                    if (e) return e.label;
                },
            } = t,
            { createGroupHeaderItem: F = (e) => ({ value: e, label: e }) } = t,
            { createItem: V = (e) => ({ value: e, label: e }) } = t,
            { isSearchable: W = !0 } = t,
            { inputStyles: K = "" } = t,
            { isClearable: J = !0 } = t,
            { isWaiting: Z = !1 } = t,
            { listPlacement: Q = "auto" } = t,
            { listOpen: X = !1 } = t,
            { list: Y } = t,
            { isVirtualList: ee = !1 } = t,
            { loadOptionsInterval: te = 300 } = t,
            { noOptionsMessage: ne = "No options" } = t,
            { hideEmptyState: re = !1 } = t,
            { filteredItems: ae = [] } = t,
            { inputAttributes: ie = {} } = t,
            { listAutoWidth: oe = !0 } = t,
            { itemHeight: se = 40 } = t,
            { Icon: le } = t,
            { iconProps: ce = {} } = t,
            { showChevron: ue = !1 } = t,
            { showIndicator: de = !1 } = t,
            { containerClasses: pe = "" } = t,
            { indicatorSvg: he } = t,
            { ClearIcon: ge = br } = t;
        async function fe() {
            await G(), n(1, (x = ""));
        }
        let me = !1;
        const be = (function (e, t, n) {
            let r;
            return function () {
                let a = this,
                    i = arguments,
                    o = function () {
                        (r = null), n || e.apply(a, i);
                    },
                    s = n && !r;
                clearTimeout(r), (r = setTimeout(o, t)), s && e.apply(a, i);
            };
        })(async () => {
            (me = !0), n(5, (Z = !0));
            let e = await B(x).catch((e) => {
                console.warn("svelte-select loadOptions error :>> ", e),
                    i("error", { type: "loadOptions", details: e });
            });
            e &&
                !e.cancelled &&
                (e
                    ? (n(35, (C = [...e])), i("loaded", { items: C }))
                    : n(35, (C = [])),
                n(5, (Z = !1)),
                n(4, ($ = !0)),
                n(37, (X = !0)));
        }, te);
        let _e = {};
        function we() {
            let e = !0;
            if (E) {
                const t = [],
                    r = [];
                E.forEach((n) => {
                    t.includes(n[H]) ? (e = !1) : (t.push(n[H]), r.push(n));
                }),
                    e || n(0, (E = r));
            }
            return e;
        }
        function ve(e) {
            let t = e ? e[H] : E[H];
            return C.find((e) => e[H] === t);
        }
        async function ye(e) {
            if ((await G(), X))
                return Y
                    ? Y.$set({ items: e })
                    : void (B && me && e.length > 0 && Se());
        }
        function ke(e) {
            const { detail: t } = e,
                r = E[t ? t.i : E.length - 1];
            1 === E.length
                ? n(0, (E = void 0))
                : n(0, (E = E.filter((e) => e !== r))),
                i("clear", r),
                $e();
        }
        async function $e() {
            if ((await G(), !o || !g)) return;
            const { top: e, height: t, width: n } = g.getBoundingClientRect();
            (o.style["min-width"] = n + "px"),
                (o.style.width = "" + (oe ? "auto" : "100%")),
                (o.style.left = "0"),
                "top" === Q
                    ? (o.style.bottom = t + 5 + "px")
                    : (o.style.top = t + 5 + "px"),
                (o = o),
                "auto" === Q &&
                    (function (e) {
                        const t = e.getBoundingClientRect(),
                            n = {};
                        return (
                            (n.top = t.top < 0),
                            (n.left = t.left < 0),
                            (n.bottom =
                                t.bottom >
                                (window.innerHeight ||
                                    document.documentElement.clientHeight)),
                            (n.right =
                                t.right >
                                (window.innerWidth ||
                                    document.documentElement.clientWidth)),
                            (n.any = n.top || n.left || n.bottom || n.right),
                            n
                        );
                    })(o).bottom &&
                    ((o.style.top = ""), (o.style.bottom = t + 5 + "px")),
                (o.style.visibility = "");
        }
        function Ee() {
            n(4, ($ = !0)), f && f.focus();
        }
        function xe() {
            fe(),
                n(25, (s = void 0)),
                Y &&
                    (Y.$destroy(),
                    n(36, (Y = void 0)),
                    o &&
                        (o.parentNode && o.parentNode.removeChild(o),
                        (o = void 0),
                        n(36, Y),
                        (o = o)));
        }
        async function Se() {
            if ((await G(), o && Y)) return;
            const e = {
                Item: m,
                filterText: x,
                optionIdentifier: H,
                noOptionsMessage: ne,
                hideEmptyState: re,
                isVirtualList: ee,
                selectedValue: E,
                isMulti: w,
                getGroupHeaderLabel: j,
                items: ae,
                itemHeight: se,
            };
            I && (e.getOptionLabel = I),
                (o = document.createElement("div")),
                Object.assign(o.style, {
                    position: "absolute",
                    "z-index": 2,
                    visibility: "hidden",
                }),
                n(36, Y),
                (o = o),
                g && g.appendChild(o),
                n(36, (Y = new or({ target: o, props: e }))),
                Y.$on("itemSelected", (e) => {
                    const { detail: t } = e;
                    if (t) {
                        const e = Object.assign({}, t);
                        (e.isGroupHeader && !e.isSelectable) ||
                            (n(0, (E = w ? (E ? E.concat([e]) : [e]) : e)),
                            fe(),
                            n(0, E),
                            n(48, H),
                            n(8, w),
                            setTimeout(() => {
                                n(37, (X = !1)), n(25, (s = void 0));
                            }));
                    }
                }),
                Y.$on("itemCreated", (e) => {
                    const { detail: t } = e;
                    w
                        ? (n(0, (E = E || [])), n(0, (E = [...E, V(t)])))
                        : n(0, (E = V(t))),
                        i("itemCreated", t),
                        n(1, (x = "")),
                        n(37, (X = !1)),
                        n(25, (s = void 0)),
                        fe();
                }),
                Y.$on("closeList", () => {
                    n(37, (X = !1));
                }),
                n(36, Y),
                (o = o),
                $e();
        }
        return (
            N(() => {
                if (
                    (w && E && E.length > 1 && we(),
                    !w &&
                        E &&
                        c !== E &&
                        ((c && JSON.stringify(E[H]) === JSON.stringify(c[H])) ||
                            i("select", E)),
                    w &&
                        JSON.stringify(E) !== JSON.stringify(c) &&
                        we() &&
                        i("select", E),
                    g && X !== u && (X ? Se() : xe()),
                    x !== d &&
                        (x.length > 0
                            ? (n(4, ($ = !0)),
                              n(37, (X = !0)),
                              B
                                  ? be()
                                  : (Se(),
                                    n(37, (X = !0)),
                                    w && n(25, (s = void 0))))
                            : ye([]),
                        Y && Y.$set({ filterText: x })),
                    $ !== p && ($ || X ? Ee() : (fe(), f && f.blur())),
                    h !== ae)
                ) {
                    let e = [...ae];
                    if (k && x) {
                        const t = V(x);
                        t.isCreator = !0;
                        const n = e.find((e) => e[H] === t[H]);
                        let r;
                        E &&
                            (w
                                ? (r = E.find((e) => e[H] === t[H]))
                                : E[H] === t[H] && (r = E)),
                            n || r || (e = [...e, t]);
                    }
                    ye(e);
                }
                (c = E), (u = X), (d = x), (p = $), (h = ae);
            }),
            O(() => {
                $ && f.focus(),
                    X && Se(),
                    C && C.length > 0 && n(60, (l = JSON.stringify(C)));
            }),
            P(() => {
                xe();
            }),
            (e.$$set = (e) => {
                "container" in e && n(2, (g = e.container)),
                    "input" in e && n(3, (f = e.input)),
                    "Item" in e && n(39, (m = e.Item)),
                    "Selection" in e && n(6, (b = e.Selection)),
                    "MultiSelection" in e && n(7, (_ = e.MultiSelection)),
                    "isMulti" in e && n(8, (w = e.isMulti)),
                    "multiFullItemClearable" in e &&
                        n(9, (v = e.multiFullItemClearable)),
                    "isDisabled" in e && n(10, (y = e.isDisabled)),
                    "isCreatable" in e && n(40, (k = e.isCreatable)),
                    "isFocused" in e && n(4, ($ = e.isFocused)),
                    "selectedValue" in e && n(0, (E = e.selectedValue)),
                    "filterText" in e && n(1, (x = e.filterText)),
                    "placeholder" in e && n(41, (S = e.placeholder)),
                    "items" in e && n(35, (C = e.items)),
                    "itemFilter" in e && n(42, (A = e.itemFilter)),
                    "groupBy" in e && n(43, (L = e.groupBy)),
                    "groupFilter" in e && n(44, (M = e.groupFilter)),
                    "isGroupHeaderSelectable" in e &&
                        n(45, (T = e.isGroupHeaderSelectable)),
                    "getGroupHeaderLabel" in e &&
                        n(46, (j = e.getGroupHeaderLabel)),
                    "getOptionLabel" in e && n(47, (I = e.getOptionLabel)),
                    "optionIdentifier" in e && n(48, (H = e.optionIdentifier)),
                    "loadOptions" in e && n(49, (B = e.loadOptions)),
                    "hasError" in e && n(11, (q = e.hasError)),
                    "containerStyles" in e && n(12, (D = e.containerStyles)),
                    "getSelectionLabel" in e &&
                        n(13, (U = e.getSelectionLabel)),
                    "createGroupHeaderItem" in e &&
                        n(50, (F = e.createGroupHeaderItem)),
                    "createItem" in e && n(51, (V = e.createItem)),
                    "isSearchable" in e && n(14, (W = e.isSearchable)),
                    "inputStyles" in e && n(15, (K = e.inputStyles)),
                    "isClearable" in e && n(16, (J = e.isClearable)),
                    "isWaiting" in e && n(5, (Z = e.isWaiting)),
                    "listPlacement" in e && n(52, (Q = e.listPlacement)),
                    "listOpen" in e && n(37, (X = e.listOpen)),
                    "list" in e && n(36, (Y = e.list)),
                    "isVirtualList" in e && n(53, (ee = e.isVirtualList)),
                    "loadOptionsInterval" in e &&
                        n(54, (te = e.loadOptionsInterval)),
                    "noOptionsMessage" in e && n(55, (ne = e.noOptionsMessage)),
                    "hideEmptyState" in e && n(56, (re = e.hideEmptyState)),
                    "filteredItems" in e && n(38, (ae = e.filteredItems)),
                    "inputAttributes" in e && n(57, (ie = e.inputAttributes)),
                    "listAutoWidth" in e && n(58, (oe = e.listAutoWidth)),
                    "itemHeight" in e && n(59, (se = e.itemHeight)),
                    "Icon" in e && n(17, (le = e.Icon)),
                    "iconProps" in e && n(18, (ce = e.iconProps)),
                    "showChevron" in e && n(19, (ue = e.showChevron)),
                    "showIndicator" in e && n(20, (de = e.showIndicator)),
                    "containerClasses" in e && n(21, (pe = e.containerClasses)),
                    "indicatorSvg" in e && n(22, (he = e.indicatorSvg)),
                    "ClearIcon" in e && n(23, (ge = e.ClearIcon));
            }),
            (e.$$.update = () => {
                if (
                    (e.$$.dirty[0],
                    16 & e.$$.dirty[1] &&
                        (function (e) {
                            e &&
                                0 !== e.length &&
                                !e.some((e) => "object" != typeof e) &&
                                E &&
                                (w ? !E.some((e) => !e || !e[H]) : E[H]) &&
                                (Array.isArray(E)
                                    ? n(0, (E = E.map((e) => ve(e) || e)))
                                    : n(0, (E = ve() || E)));
                        })(C),
                    (257 & e.$$.dirty[0]) | (131072 & e.$$.dirty[1]) &&
                        ("string" == typeof E
                            ? n(0, (E = { [H]: E, label: E }))
                            : w &&
                              Array.isArray(E) &&
                              E.length > 0 &&
                              n(
                                  0,
                                  (E = E.map((e) =>
                                      "string" == typeof e
                                          ? { value: e, label: e }
                                          : e
                                  ))
                              )),
                    16777248 & e.$$.dirty[1] &&
                        ne &&
                        Y &&
                        Y.$set({ noOptionsMessage: ne }),
                    3 & e.$$.dirty[0] && n(27, (r = E && 0 === x.length)),
                    (1 & e.$$.dirty[0]) | (1024 & e.$$.dirty[1]) &&
                        n(28, (a = E ? "" : S)),
                    (16384 & e.$$.dirty[0]) | (67108864 & e.$$.dirty[1]) &&
                        (n(
                            26,
                            (_e = Object.assign(
                                {
                                    autocomplete: "off",
                                    autocorrect: "off",
                                    spellcheck: !1,
                                },
                                ie
                            ))
                        ),
                        W || n(26, (_e.readonly = !0), _e)),
                    (259 & e.$$.dirty[0]) | (537884688 & e.$$.dirty[1]))
                ) {
                    let e,
                        t = C;
                    if (
                        (C &&
                            C.length > 0 &&
                            "object" != typeof C[0] &&
                            (t = C.map((e, t) => ({
                                index: t,
                                value: e,
                                label: e,
                            }))),
                        B && 0 === x.length && l
                            ? ((e = JSON.parse(l)), (t = JSON.parse(l)))
                            : (e = B
                                  ? 0 === x.length
                                      ? []
                                      : t
                                  : t.filter((e) => {
                                        let t = !0;
                                        return (
                                            w &&
                                                E &&
                                                (t = !E.some(
                                                    (t) => t[H] === e[H]
                                                )),
                                            !!t &&
                                                (x.length < 1 ||
                                                    A(I(e, x), x, e))
                                        );
                                    })),
                        L)
                    ) {
                        const t = [],
                            r = {};
                        e.forEach((e) => {
                            const n = L(e);
                            t.includes(n) ||
                                (t.push(n),
                                (r[n] = []),
                                n &&
                                    r[n].push(
                                        Object.assign(F(n, e), {
                                            id: n,
                                            isGroupHeader: !0,
                                            isSelectable: T,
                                        })
                                    )),
                                r[n].push(
                                    Object.assign({ isGroupItem: !!n }, e)
                                );
                        });
                        const a = [];
                        M(t).forEach((e) => {
                            a.push(...r[e]);
                        }),
                            n(38, (ae = a));
                    } else n(38, (ae = e));
                }
            }),
            [
                E,
                x,
                g,
                f,
                $,
                Z,
                b,
                _,
                w,
                v,
                y,
                q,
                D,
                U,
                W,
                K,
                J,
                le,
                ce,
                ue,
                de,
                pe,
                he,
                ge,
                function () {
                    n(0, (E = void 0)), n(37, (X = !1)), i("clear", E), Ee();
                },
                s,
                _e,
                r,
                a,
                ke,
                $e,
                function (e) {
                    if ($)
                        switch (e.key) {
                            case "ArrowDown":
                            case "ArrowUp":
                                e.preventDefault(),
                                    n(37, (X = !0)),
                                    n(25, (s = void 0));
                                break;
                            case "Tab":
                                X || n(4, ($ = !1));
                                break;
                            case "Backspace":
                                if (!w || x.length > 0) return;
                                if (w && E && E.length > 0) {
                                    if (
                                        (ke(void 0 !== s ? s : E.length - 1),
                                        0 === s || void 0 === s)
                                    )
                                        break;
                                    n(25, (s = E.length > s ? s - 1 : void 0));
                                }
                                break;
                            case "ArrowLeft":
                                if (
                                    (Y && Y.$set({ hoverItemIndex: -1 }),
                                    !w || x.length > 0)
                                )
                                    return;
                                void 0 === s
                                    ? n(25, (s = E.length - 1))
                                    : E.length > s &&
                                      0 !== s &&
                                      n(25, (s -= 1));
                                break;
                            case "ArrowRight":
                                if (
                                    (Y && Y.$set({ hoverItemIndex: -1 }),
                                    !w || x.length > 0 || void 0 === s)
                                )
                                    return;
                                s === E.length - 1
                                    ? n(25, (s = void 0))
                                    : s < E.length - 1 && n(25, (s += 1));
                        }
                },
                Ee,
                function (e) {
                    if (!g) return;
                    const t =
                        e.path && e.path.length > 0 ? e.path[0] : e.target;
                    g.contains(t) ||
                        (n(4, ($ = !1)),
                        n(37, (X = !1)),
                        n(25, (s = void 0)),
                        f && f.blur());
                },
                function () {
                    y || (n(4, ($ = !0)), n(37, (X = !X)));
                },
                C,
                Y,
                X,
                ae,
                m,
                k,
                S,
                A,
                L,
                M,
                T,
                j,
                I,
                H,
                B,
                F,
                V,
                Q,
                ee,
                te,
                ne,
                re,
                ie,
                oe,
                se,
                l,
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (f = e), n(3, f);
                    });
                },
                function () {
                    (x = this.value), n(1, x);
                },
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (f = e), n(3, f);
                    });
                },
                function () {
                    (x = this.value), n(1, x);
                },
                function (e) {
                    z[e ? "unshift" : "push"](() => {
                        (g = e), n(2, g);
                    });
                },
            ]
        );
    }
    class Mr extends ue {
        constructor(e) {
            super(),
                ce(
                    this,
                    e,
                    Lr,
                    Ar,
                    o,
                    {
                        container: 2,
                        input: 3,
                        Item: 39,
                        Selection: 6,
                        MultiSelection: 7,
                        isMulti: 8,
                        multiFullItemClearable: 9,
                        isDisabled: 10,
                        isCreatable: 40,
                        isFocused: 4,
                        selectedValue: 0,
                        filterText: 1,
                        placeholder: 41,
                        items: 35,
                        itemFilter: 42,
                        groupBy: 43,
                        groupFilter: 44,
                        isGroupHeaderSelectable: 45,
                        getGroupHeaderLabel: 46,
                        getOptionLabel: 47,
                        optionIdentifier: 48,
                        loadOptions: 49,
                        hasError: 11,
                        containerStyles: 12,
                        getSelectionLabel: 13,
                        createGroupHeaderItem: 50,
                        createItem: 51,
                        isSearchable: 14,
                        inputStyles: 15,
                        isClearable: 16,
                        isWaiting: 5,
                        listPlacement: 52,
                        listOpen: 37,
                        list: 36,
                        isVirtualList: 53,
                        loadOptionsInterval: 54,
                        noOptionsMessage: 55,
                        hideEmptyState: 56,
                        filteredItems: 38,
                        inputAttributes: 57,
                        listAutoWidth: 58,
                        itemHeight: 59,
                        Icon: 17,
                        iconProps: 18,
                        showChevron: 19,
                        showIndicator: 20,
                        containerClasses: 21,
                        indicatorSvg: 22,
                        ClearIcon: 23,
                        handleClear: 24,
                    },
                    [-1, -1, -1]
                );
        }
        get handleClear() {
            return this.$$.ctx[24];
        }
    }
    function Tr(e) {
        let t;
        return {
            c() {
                (t = g("div")), v(t, "class", "description");
            },
            m(n, r) {
                d(n, t, r), (t.innerHTML = e[5]);
            },
            p(e, n) {
                32 & n && (t.innerHTML = e[5]);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function jr(e) {
        let t,
            n,
            r,
            a,
            i,
            o,
            s,
            l,
            c,
            h,
            f,
            _,
            w,
            y,
            k = e[1].name + "",
            E = e[5] && Tr(e);
        function x(t) {
            e[10](t);
        }
        let S = { items: e[7], isClearable: !1, isSearchable: !1 };
        return (
            void 0 !== e[3] && (S.selectedValue = e[3]),
            (h = new Mr({ props: S })),
            z.push(() =>
                (function (e, t, n) {
                    const r = e.$$.props[t];
                    void 0 !== r && ((e.$$.bound[r] = n), n(e.$$.ctx[r]));
                })(h, "selectedValue", x)
            ),
            (w = new On({
                props: {
                    content: e[4],
                    env: e[0],
                    language: e[6],
                    cookiejars: e[2],
                },
            })),
            {
                c() {
                    (t = g("section")),
                        (n = g("div")),
                        (r = g("div")),
                        (a = g("h1")),
                        (i = m(k)),
                        (o = b()),
                        E && E.c(),
                        (s = b()),
                        (l = g("div")),
                        (c = g("div")),
                        oe(h.$$.fragment),
                        (_ = b()),
                        oe(w.$$.fragment),
                        v(r, "class", "left"),
                        v(c, "class", "language-selector svelte-1jbhgwi"),
                        v(l, "class", "right"),
                        v(n, "class", "row"),
                        v(t, "class", "content svelte-1jbhgwi");
                },
                m(e, p) {
                    d(e, t, p),
                        u(t, n),
                        u(n, r),
                        u(r, a),
                        u(a, i),
                        u(r, o),
                        E && E.m(r, null),
                        u(n, s),
                        u(n, l),
                        u(l, c),
                        se(h, c, null),
                        u(t, _),
                        se(w, t, null),
                        (y = !0);
                },
                p(e, [t]) {
                    (!y || 2 & t) && k !== (k = e[1].name + "") && $(i, k),
                        e[5]
                            ? E
                                ? E.p(e, t)
                                : ((E = Tr(e)), E.c(), E.m(r, null))
                            : E && (E.d(1), (E = null));
                    const n = {};
                    var a;
                    !f &&
                        8 & t &&
                        ((f = !0),
                        (n.selectedValue = e[3]),
                        (a = () => (f = !1)),
                        q.push(a)),
                        h.$set(n);
                    const o = {};
                    16 & t && (o.content = e[4]),
                        1 & t && (o.env = e[0]),
                        64 & t && (o.language = e[6]),
                        4 & t && (o.cookiejars = e[2]),
                        w.$set(o);
                },
                i(e) {
                    y || (te(h.$$.fragment, e), te(w.$$.fragment, e), (y = !0));
                },
                o(e) {
                    ne(h.$$.fragment, e), ne(w.$$.fragment, e), (y = !1);
                },
                d(e) {
                    e && p(t), E && E.d(), le(h), le(w);
                },
            }
        );
    }
    function Ir(e, t, n) {
        let r, a, i;
        const o = new zt.Converter({
                simplifiedAutoLink: !0,
                openLinksInNewWindow: !0,
                excludeTrailingPunctuationFromURLs: !0,
                tables: !0,
            }),
            s = [
                { value: "curl", label: "cURL" },
                { value: "javascript", label: "JavaScript/Deno (fetch)" },
                { value: "python", label: "Python (requests)" },
                { value: "node", label: "Node.js (node-fetch)" },
                { value: "ruby", label: "Ruby" },
                { value: "php", label: "PHP" },
                { value: "golang", label: "Go" },
            ];
        let { env: l } = t,
            { groups: c } = t,
            { requests: u } = t,
            { workspace: d } = t,
            { cookiejars: p } = t,
            h = s[0];
        return (
            (e.$$set = (e) => {
                "env" in e && n(0, (l = e.env)),
                    "groups" in e && n(8, (c = e.groups)),
                    "requests" in e && n(9, (u = e.requests)),
                    "workspace" in e && n(1, (d = e.workspace)),
                    "cookiejars" in e && n(2, (p = e.cookiejars));
            }),
            (e.$$.update = () => {
                768 & e.$$.dirty && n(4, (r = [...c, ...u])),
                    3 & e.$$.dirty &&
                        n(
                            5,
                            (a =
                                d.description &&
                                o.makeHtml(En(d.description, l)))
                        ),
                    8 & e.$$.dirty && n(6, (i = h.value));
            }),
            [
                l,
                d,
                p,
                h,
                r,
                a,
                i,
                s,
                c,
                u,
                function (e) {
                    (h = e), n(3, h);
                },
            ]
        );
    }
    class Nr extends ue {
        constructor(e) {
            super(),
                ce(this, e, Ir, jr, o, {
                    env: 0,
                    groups: 8,
                    requests: 9,
                    workspace: 1,
                    cookiejars: 2,
                });
        }
    }
    function Or(e, t) {
        let n = e;
        return (
            "object" == typeof n &&
                ((n = JSON.parse(JSON.stringify(e))),
                (function e(t, n) {
                    Object.keys(t).forEach((r) => {
                        if (null !== t[r])
                            switch (typeof t[r]) {
                                case "object":
                                    e(t[r], n);
                                    break;
                                case "string":
                                    t[r] = En(t[r], n);
                            }
                    });
                })(n, t)),
            n
        );
    }
    function Pr(e, t, n) {
        const r = e.slice();
        return (r[13] = t[n]), (r[15] = n), r;
    }
    function Rr(e) {
        let t,
            n,
            r,
            a = e[13].name + "";
        return {
            c() {
                (t = g("option")),
                    (n = m(a)),
                    (t.__value = r = e[15]),
                    (t.value = t.__value);
            },
            m(e, r) {
                d(e, t, r), u(t, n);
            },
            p(e, t) {
                1 & t && a !== (a = e[13].name + "") && $(n, a);
            },
            d(e) {
                e && p(t);
            },
        };
    }
    function Hr(e) {
        let t,
            n,
            r,
            i,
            o,
            s,
            l,
            c,
            f,
            _,
            y,
            k,
            E,
            C,
            A,
            L,
            T,
            j,
            I,
            N,
            O,
            P,
            R,
            H,
            z,
            B,
            q,
            D,
            U,
            F,
            G,
            W,
            K,
            J,
            Z = e[0].workspace.name + "";
        document.title = t = e[0].workspace.name;
        let Q = e[0].environments,
            X = [];
        for (let t = 0; t < Q.length; t += 1) X[t] = Rr(Pr(e, Q, t));
        return (
            (U = new xe({
                props: {
                    requests: e[6],
                    groups: e[7],
                    workspace: e[0].workspace,
                    visible: e[3],
                },
            })),
            (G = new Nr({
                props: {
                    requests: e[6],
                    groups: e[7],
                    workspace: e[0].workspace,
                    cookiejars: e[0].cookiejars,
                    env: e[2],
                },
            })),
            {
                c() {
                    (n = b()),
                        (r = g("header")),
                        (i = g("div")),
                        (o = g("span")),
                        (o.innerHTML =
                            '<i class="fa fa-bars" aria-hidden="true"></i>'),
                        (s = b()),
                        (l = g("div")),
                        (c = g("img")),
                        (y = b()),
                        (k = g("h1")),
                        (E = m(Z)),
                        (C = b()),
                        (A = g("div")),
                        (L = g("div")),
                        (T = g("a")),
                        (j = g("img")),
                        (N = b()),
                        (O = g("div")),
                        (P = g("label")),
                        (P.textContent = "Environment:"),
                        (R = b()),
                        (H = g("select"));
                    for (let e = 0; e < X.length; e += 1) X[e].c();
                    (z = b()),
                        (B = g("span")),
                        (B.innerHTML =
                            '<i class="fa fa-code" aria-hidden="true"></i>'),
                        (q = b()),
                        (D = g("section")),
                        oe(U.$$.fragment),
                        (F = b()),
                        oe(G.$$.fragment),
                        v(o, "class", "hamburger-toggler"),
                        c.src !== (f = "logo.png") && v(c, "src", "logo.png"),
                        v(c, "alt", (_ = e[0].workspace.name)),
                        v(l, "class", "logo"),
                        v(k, "class", "title"),
                        v(i, "class", "header-left"),
                        j.src !==
                            (I = "https://insomnia.rest/images/run.svg") &&
                            v(j, "src", "https://insomnia.rest/images/run.svg"),
                        v(j, "alt", "Run in Insomnia"),
                        v(T, "href", e[8]),
                        v(T, "target", "_blank"),
                        v(L, "class", "run"),
                        v(P, "for", "env"),
                        x(P, "display", "inline-block"),
                        v(H, "id", "env"),
                        void 0 === e[1] && V(() => e[11].call(H)),
                        v(O, "class", "environment"),
                        v(B, "class", "example-toggler"),
                        v(B, "title", "Toggle request examples"),
                        M(B, "inactive", !e[4]),
                        v(A, "class", "header-right"),
                        x(
                            r,
                            "border-top",
                            "6px solid " + (null !== e[5] ? e[5] : "#6a57d5")
                        ),
                        v(D, "class", "wrapper"),
                        M(D, "hide-right", !e[4]);
                },
                m(t, a) {
                    d(t, n, a),
                        d(t, r, a),
                        u(r, i),
                        u(i, o),
                        u(i, s),
                        u(i, l),
                        u(l, c),
                        u(i, y),
                        u(i, k),
                        u(k, E),
                        u(r, C),
                        u(r, A),
                        u(A, L),
                        u(L, T),
                        u(T, j),
                        u(A, N),
                        u(A, O),
                        u(O, P),
                        u(O, R),
                        u(O, H);
                    for (let e = 0; e < X.length; e += 1) X[e].m(H, null);
                    S(H, e[1]),
                        u(A, z),
                        u(A, B),
                        d(t, q, a),
                        d(t, D, a),
                        se(U, D, null),
                        u(D, F),
                        se(G, D, null),
                        (W = !0),
                        K ||
                            ((J = [
                                w(o, "click", e[9]),
                                w(H, "change", e[11]),
                                w(B, "click", e[10]),
                            ]),
                            (K = !0));
                },
                p(e, [n]) {
                    if (
                        ((!W || 1 & n) &&
                            t !== (t = e[0].workspace.name) &&
                            (document.title = t),
                        (!W || (1 & n && _ !== (_ = e[0].workspace.name))) &&
                            v(c, "alt", _),
                        (!W || 1 & n) &&
                            Z !== (Z = e[0].workspace.name + "") &&
                            $(E, Z),
                        1 & n)
                    ) {
                        let t;
                        for (
                            Q = e[0].environments, t = 0;
                            t < Q.length;
                            t += 1
                        ) {
                            const r = Pr(e, Q, t);
                            X[t]
                                ? X[t].p(r, n)
                                : ((X[t] = Rr(r)), X[t].c(), X[t].m(H, null));
                        }
                        for (; t < X.length; t += 1) X[t].d(1);
                        X.length = Q.length;
                    }
                    2 & n && S(H, e[1]),
                        16 & n && M(B, "inactive", !e[4]),
                        (!W || 32 & n) &&
                            x(
                                r,
                                "border-top",
                                "6px solid " +
                                    (null !== e[5] ? e[5] : "#6a57d5")
                            );
                    const a = {};
                    64 & n && (a.requests = e[6]),
                        128 & n && (a.groups = e[7]),
                        1 & n && (a.workspace = e[0].workspace),
                        8 & n && (a.visible = e[3]),
                        U.$set(a);
                    const i = {};
                    64 & n && (i.requests = e[6]),
                        128 & n && (i.groups = e[7]),
                        1 & n && (i.workspace = e[0].workspace),
                        1 & n && (i.cookiejars = e[0].cookiejars),
                        4 & n && (i.env = e[2]),
                        G.$set(i),
                        16 & n && M(D, "hide-right", !e[4]);
                },
                i(e) {
                    W || (te(U.$$.fragment, e), te(G.$$.fragment, e), (W = !0));
                },
                o(e) {
                    ne(U.$$.fragment, e), ne(G.$$.fragment, e), (W = !1);
                },
                d(e) {
                    e && p(n),
                        e && p(r),
                        h(X, e),
                        e && p(q),
                        e && p(D),
                        le(U),
                        le(G),
                        (K = !1),
                        a(J);
                },
            }
        );
    }
    function zr(e, t, n) {
        let r,
            a,
            i,
            o,
            { config: s } = t,
            l = 0;
        const c = window.location.origin + window.INSOMNIA_URL,
            u = `https://insomnia.rest/run/?label=${encodeURIComponent(
                s.workspace.name
            )}&uri=${encodeURIComponent(c)}`;
        let d = !1,
            p = "true" === (localStorage.getItem("show-examples") || "true");
        return (
            (e.$$set = (e) => {
                "config" in e && n(0, (s = e.config));
            }),
            (e.$$.update = () => {
                3 & e.$$.dirty && n(2, (r = s.environments[l])),
                    4 & e.$$.dirty && n(5, (a = r.color)),
                    3 & e.$$.dirty &&
                        n(6, (i = Or(s.requests, s.environments[l]))),
                    3 & e.$$.dirty &&
                        n(7, (o = Or(s.groups, s.environments[l])));
            }),
            [
                s,
                l,
                r,
                d,
                p,
                a,
                i,
                o,
                u,
                function () {
                    n(3, (d = !d));
                },
                function () {
                    n(4, (p = !p)), localStorage.setItem("show-examples", p);
                },
                function () {
                    (l = (function (e) {
                        const t = e.querySelector(":checked") || e.options[0];
                        return t && t.__value;
                    })(this)),
                        n(1, l);
                },
            ]
        );
    }
    class Br extends ue {
        constructor(e) {
            super(), ce(this, e, zr, Hr, o, { config: 0 });
        }
    }
    function qr(t) {
        let n, r, a, i, o, s, l, c, h, f, _, w;
        return {
            c() {
                (n = b()),
                    (r = g("div")),
                    (a = g("h1")),
                    (a.textContent = "Uh-oh!"),
                    (i = b()),
                    (o = g("p")),
                    (s = m(
                        "It looks like it's not possible to retrieve the contents of the API docs\n    at the moment. If you're the owner of this site, make sure that your\n    "
                    )),
                    (l = g("a")),
                    (c = m("Insomnia JSON file")),
                    (f = m(" is accessible.")),
                    (_ = b()),
                    (w = g("p")),
                    (w.textContent =
                        "The developer console of your browser might have more things to say about this error."),
                    (document.title = "Uh-oh!"),
                    v(l, "href", (h = window.INSOMNIA_URL)),
                    v(l, "target", "_blank"),
                    v(r, "class", "error-page svelte-19j2wr5");
            },
            m(e, t) {
                d(e, n, t),
                    d(e, r, t),
                    u(r, a),
                    u(r, i),
                    u(r, o),
                    u(o, s),
                    u(o, l),
                    u(l, c),
                    u(o, f),
                    u(r, _),
                    u(r, w);
            },
            p: e,
            i: e,
            o: e,
            d(e) {
                e && p(n), e && p(r);
            },
        };
    }
    class Dr extends ue {
        constructor(e) {
            super(), ce(this, e, null, qr, o, {});
        }
    }
    var Ur = "object" == typeof Pt && Pt && Pt.Object === Object && Pt,
        Fr = "object" == typeof self && self && self.Object === Object && self,
        Gr = Ur || Fr || Function("return this")();
    function Vr(e, t, n) {
        switch (n.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, n[0]);
            case 2:
                return e.call(t, n[0], n[1]);
            case 3:
                return e.call(t, n[0], n[1], n[2]);
        }
        return e.apply(t, n);
    }
    function Wr(e, t) {
        for (var n = -1, r = t.length, a = e.length; ++n < r; ) e[a + n] = t[n];
        return e;
    }
    var Kr = Object.prototype,
        Jr = Kr.hasOwnProperty,
        Zr = Kr.toString,
        Qr = Gr.Symbol,
        Xr = Kr.propertyIsEnumerable,
        Yr = Qr ? Qr.isConcatSpreadable : void 0,
        ea = Math.max;
    function ta(e) {
        return (
            ra(e) ||
            (function (e) {
                return (
                    (function (e) {
                        return (
                            aa(e) &&
                            (function (e) {
                                return (
                                    null != e &&
                                    (function (e) {
                                        return (
                                            "number" == typeof e &&
                                            e > -1 &&
                                            e % 1 == 0 &&
                                            e <= 9007199254740991
                                        );
                                    })(e.length) &&
                                    !(function (e) {
                                        var t = (function (e) {
                                            var t = typeof e;
                                            return (
                                                !!e &&
                                                ("object" == t ||
                                                    "function" == t)
                                            );
                                        })(e)
                                            ? Zr.call(e)
                                            : "";
                                        return (
                                            "[object Function]" == t ||
                                            "[object GeneratorFunction]" == t
                                        );
                                    })(e)
                                );
                            })(e)
                        );
                    })(e) &&
                    Jr.call(e, "callee") &&
                    (!Xr.call(e, "callee") ||
                        "[object Arguments]" == Zr.call(e))
                );
            })(e) ||
            !!(Yr && e && e[Yr])
        );
    }
    function na(e) {
        if (
            "string" == typeof e ||
            (function (e) {
                return (
                    "symbol" == typeof e ||
                    (aa(e) && "[object Symbol]" == Zr.call(e))
                );
            })(e)
        )
            return e;
        var t = e + "";
        return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
    }
    var ra = Array.isArray;
    function aa(e) {
        return !!e && "object" == typeof e;
    }
    var ia,
        oa,
        sa =
            ((ia = function (e, t) {
                return null == e
                    ? {}
                    : (function (e, t) {
                          return (function (e, t, n) {
                              for (
                                  var r = -1, a = t.length, i = {};
                                  ++r < a;

                              ) {
                                  var o = t[r],
                                      s = e[o];
                                  n(s, o) && (i[o] = s);
                              }
                              return i;
                          })((e = Object(e)), t, function (t, n) {
                              return n in e;
                          });
                      })(
                          e,
                          (function (e, t) {
                              for (
                                  var n = -1,
                                      r = e ? e.length : 0,
                                      a = Array(r);
                                  ++n < r;

                              )
                                  a[n] = t(e[n], n, e);
                              return a;
                          })(
                              (function e(t, n, r, a, i) {
                                  var o = -1,
                                      s = t.length;
                                  for (
                                      r || (r = ta), i || (i = []);
                                      ++o < s;

                                  ) {
                                      var l = t[o];
                                      n > 0 && r(l)
                                          ? n > 1
                                              ? e(l, n - 1, r, a, i)
                                              : Wr(i, l)
                                          : a || (i[i.length] = l);
                                  }
                                  return i;
                              })(t, 1),
                              na
                          )
                      );
            }),
            (oa = ea(void 0 === oa ? ia.length - 1 : oa, 0)),
            function () {
                for (
                    var e = arguments,
                        t = -1,
                        n = ea(e.length - oa, 0),
                        r = Array(n);
                    ++t < n;

                )
                    r[t] = e[oa + t];
                t = -1;
                for (var a = Array(oa + 1); ++t < oa; ) a[t] = e[t];
                return (a[oa] = r), Vr(ia, this, a);
            });
    const la = /```response(:(\d+))?\n([\s\S]*?)\n```/gm;
    function ca(e) {
        return { code: e[2] || null, value: e[3].trim() };
    }
    function ua(e) {
        if (
            !(e = sa(
                e,
                "_id",
                "method",
                "name",
                "description",
                "parameters",
                "url",
                "authentication",
                "body",
                "headers",
                "_type"
            )).description
        )
            return e;
        const t = [];
        let n;
        for (; (n = la.exec(e.description)); ) t.push(ca(n));
        return (
            (e.exampleResponses = t),
            (e.description = e.description.replace(la, "")),
            e
        );
    }
    class da {
        constructor(e) {
            (this.json = e),
                (this.id = null),
                (this.cute = {
                    workspace: { name: null, description: null },
                    cookiejars: [],
                    environments: [],
                    groups: [],
                    requests: [],
                });
        }
        metaSort(e, t) {
            return e.metaSortKey - t.metaSortKey;
        }
        mapCookiejar(e) {
            return sa(e, "name", "cookies");
        }
        filterCookiejars() {
            return this.json.resources
                .filter((e) => "cookie_jar" === e._type)
                .map(this.mapCookiejar);
        }
        mapEnvironment(e) {
            return sa(e, "color", "data", "name");
        }
        filterEnvironments() {
            return this.json.resources
                .filter((e) => "environment" === e._type && !e.isPrivate)
                .sort(this.metaSort)
                .map(this.mapEnvironment);
        }
        filterRequests(e = null) {
            const t = e || this.id;
            return this.json.resources
                .filter(
                    (e) =>
                        "request" === e._type &&
                        e.parentId === t &&
                        !e.isPrivate
                )
                .sort(this.metaSort)
                .map(ua);
        }
        deepMapGroups(e) {
            const t = {
                name: e.name,
                description: e.description,
                _type: e._type,
            };
            return (
                (t.children = this.json.resources
                    .filter(
                        (t) =>
                            "request_group" === t._type && t.parentId === e._id
                    )
                    .sort(this.metaSort)
                    .map(this.deepMapGroups.bind(this))),
                (t.requests = this.filterRequests(e._id)),
                t
            );
        }
        filterRootGroups() {
            const e = this.json.resources.filter(
                (e) => "request_group" === e._type && e.parentId === this.id
            );
            return e
                ? e.sort(this.metaSort).map(this.deepMapGroups.bind(this))
                : [];
        }
        generate() {
            const e = this.json.resources.find((e) => "workspace" === e._type);
            return (
                (this.id = e._id),
                (this.cute.workspace.name = e.name),
                (this.cute.workspace.description = e.description),
                (this.cute.cookiejars = this.filterCookiejars()),
                (this.cute.environments = this.filterEnvironments()),
                this.cute.environments.length > 1 &&
                    (this.cute.environments = this.cute.environments.slice(1)),
                (this.cute.groups = this.filterRootGroups()),
                (this.cute.requests = this.filterRequests()),
                this.cute
            );
        }
    }
    return (async function () {
        const e = document.getElementById("app"),
            t = (e.getAttribute("data-root") || "") + "/insomnia.json";
        window.INSOMNIA_URL = t;
        try {
            const n = await fetch(t, {
                    method: "GET",
                    credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }).then((e) => e.json()),
                r = new da(n).generate();
            return new Br({ target: e, props: { config: r } });
        } catch (t) {
            return console.error(t), new Dr({ target: e });
        }
    })();
})();
//# sourceMappingURL=bundle.js.map
