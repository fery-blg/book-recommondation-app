(() => {
  var e = {
      953: (e) => {
        e.exports = class {
          static async testAdmin(e, s) {
            try {
              s.status(200).json({
                message: "you reached the backend admin route",
              });
            } catch (e) {
              console.log(e, "in controller"),
                s.status(500).json({ message: "error" });
            }
          }
          static async checkAdmin(e, s) {
            try {
              s.status(200).json({ message: "admin role exists" });
            } catch (e) {
              s.status(500).json({ message: "server error" });
            }
          }
        };
      },
      276: (e, s, t) => {
        const o = t(269),
          r = t(486),
          i = t(829),
          a = t(468),
          n = t(402);
        e.exports = class {
          static async verifyCode(e, s) {
            try {
              const t = await a.findOne({ code: e.body.code });
              if (!t)
                return s
                  .status(400)
                  .json({ message: "invalid verification link" });
              if (await o.findOne({ email: t.email }))
                return s.status(400).json({ message: "user already exist" });
              s.status(200).json(t);
            } catch (e) {
              console.log(e), s.status(500).json(e);
            }
          }
          static async sendEmail(e, s) {
            try {
              if (await o.findOne({ email: e.body.email }))
                return s.status(400).json({ message: "user already exist" });
              const t =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let r = "";
              for (let e = 0; e < 12; e++) {
                const e = Math.floor(Math.random() * t.length);
                r += t.charAt(e);
              }
              n.sendEmail(
                e.body.email,
                "Email verification",
                `\n      <p>Hello there!</p>\n      <p>Your verification code is: <strong>${r}</strong></p>\n      <p>Click the button below to verify your email:</p>\n      <a href="http://localhost:5173/register?code=${r}">Production test</a>\n      <a href="http://localhost:5173/register?code=${r}">dev link</a>\n      <a href="http://localhost:3000/register?code=${r}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify Email</a>\n    `
              );
              const i = await a.create({
                email: e.body.email,
                name: e.body.username,
                code: r,
              });
              s.status(201).json(i);
            } catch (e) {
              console.log(e), s.status(500).json({ message: "error" });
            }
          }
          static async register(e, s) {
            try {
              if (await o.findOne({ email: e.body.email }))
                return s.status(400).json({ message: "user already exist" });
              const t = await r.hash(e.body.password, 10);
              await o.create({
                username: e.body.username,
                email: e.body.email,
                password: t,
              });
              const i = await a.deleteMany({ email: e.body.email });
              console.log(i), s.status(201).json({ message: "ok" });
            } catch (e) {
              console.log(e), s.status(500).json({ message: "error" });
            }
          }
          static async login(e, s) {
            try {
              const t = await o.findOne({ email: e.body.email });
              if (!t) return s.status(400).json({ message: "user not found" });
              if (!(await r.compare(e.body.password, t.password)))
                return s.status(401).json({ message: "wrong password" });
              const a = Date.now() + 36e5,
                n = i.sign(
                  { id: t._id, exp: a, role: t.role },
                  process.env.SECRET_KEY
                );
              s.cookie("Authorization", n)
                .status(200)
                .json({
                  user: {
                    email: t.email,
                    _id: t._id,
                    role: t.role,
                    avatar: t.avatar || null,
                  },
                });
            } catch (e) {
              console.log(e), s.status(500).json({ message: "error" });
            }
          }
          static async logout(e, s) {
            try {
              s.clearCookie("Authorization"),
                s.status(200).json({ message: "logged out" });
            } catch (e) {
              console.log(e), s.status(500).json({ message: "error" });
            }
          }
        };
      },
      203: (e, s, t) => {
        const o = t(818),
          r = t(269),
          i = t(416).v2;
        e.exports = class {
          static check(e, s) {
            try {
              s.status(200).json({ message: "user role exists" });
            } catch (e) {
              console.log(e),
                s.clearCookie("Authorization"),
                s.status(500).json({ error: e });
            }
          }
          static async #e(e) {
            return new Promise((s, t) => {
              i.uploader.destroy(e, function (e, o) {
                e && (console.log(e), t(e)), s(o);
              });
            });
          }
          static async updateUser(e, s) {
            try {
              console.log(e.params, e.query),
                o.config(),
                i.config({
                  cloud_name: process.env.CLOUD_NAME,
                  api_key: process.env.CLOUD_KEY,
                  api_secret: process.env.CLOUD_SECRET,
                  secure: !0,
                });
              const t = await new Promise((s, t) => {
                i.uploader.upload(
                  e.body.data,
                  { folder: "avatars", resource_type: "auto" },
                  function (e, o) {
                    e && (console.log(e), t(e)), s(o);
                  }
                );
              });
              await r.findByIdAndUpdate(e.params.id, {
                avatar: { public_id: t.public_id, url: t.secure_url },
              }),
                s
                  .status(200)
                  .json({ message: "updated with success", avatar: t });
            } catch (e) {
              console.log(e),
                s
                  .status(500)
                  .json({ message: "error while uploading your file" });
            }
          }
        };
      },
      284: (e, s, t) => {
        const o = t(829);
        class r {
          static #s(e) {
            return o.verify(e, process.env.SECRET_KEY);
          }
          static async checkAdmin(e, s, t) {
            try {
              const t = e.headers.cookie.split("=")[1],
                o = r.#s(t);
              if (o && "admin" !== o.role)
                return s
                  .status(401)
                  .json({ message: "Action reserved for admin only" });
            } catch (e) {
              return console.log(e), s.status(500).json({ error: e.message });
            }
            t();
          }
          static async checkAuth(e, s, t) {
            try {
              if (
                (console.log(
                  "==============================================================================================="
                ),
                console.log(e.headers),
                console.log(
                  "==============================================================================================="
                ),
                !e.headers.cookie)
              )
                return s
                  .status(401)
                  .json({ message: "Unauthorized access detected" });
              const o = e.headers.cookie.split("=")[1],
                i = r.#s(o);
              if (i && i.exp < Date.now())
                return (
                  s.clearCookie("Authorization"),
                  s
                    .status(400)
                    .json({
                      isAuth: !1,
                      message: "Session expired, please log in again",
                    })
                );
              t();
            } catch (e) {
              return console.log(e), s.status(500).json({ error: e.message });
            }
          }
        }
        e.exports = r;
      },
      468: (e, s, t) => {
        const o = t(37);
        class r {
          static #t = new o.Schema({
            email: { type: String, required: !0 },
            code: { type: String, required: !0 },
            name: { type: String, required: !0 },
          });
          static getModel() {
            return o.model("Prom", this.#t);
          }
        }
        e.exports = r.getModel();
      },
      269: (e, s, t) => {
        const o = t(37);
        class r {
          static #t = new o.Schema({
            username: { type: String, required: !0 },
            email: { type: String, required: !0 },
            password: { type: String, required: !0 },
            role: { type: String, required: !0, default: "user" },
            avatar: { url: String, public_id: String },
          });
          static getModel() {
            return o.model("User", this.#t);
          }
        }
        e.exports = r.getModel();
      },
      893: (e, s, t) => {
        const o = t(252),
          r = t(953);
        class i {
          static #o = o.Router();
          static #r() {
            this.#o.get("/isadmin", r.checkAdmin),
              this.#o.get("/admintest", r.testAdmin);
          }
          static getRouter() {
            return this.#r(), this.#o;
          }
        }
        e.exports = i.getRouter();
      },
      116: (e, s, t) => {
        const o = t(252),
          r = t(276);
        class i {
          static #o = o.Router();
          static #r() {
            this.#o.post("/register", r.register),
              this.#o.post("/register-code", r.verifyCode),
              this.#o.post("/send-email", r.sendEmail),
              this.#o.post("/login", r.login),
              this.#o.get("/logout", r.logout);
          }
          static getRouter() {
            return this.#r(), this.#o;
          }
        }
        e.exports = i.getRouter();
      },
      187: (e, s, t) => {
        const o = t(252),
          r = t(116),
          i = t(121),
          a = t(893),
          n = t(284);
        class c {
          static #o = o.Router();
          static #i() {
            this.#o.use("/auth", r),
              this.#o.use("/user", n.checkAuth, i),
              this.#o.use("/admin", n.checkAuth, n.checkAdmin, a);
          }
          static getRouter() {
            return this.#i(), this.#o;
          }
        }
        e.exports = c.getRouter();
      },
      121: (e, s, t) => {
        const o = t(252),
          r = t(203);
        class i {
          static #o = o.Router();
          static #r() {
            this.#o.get("/check", r.check),
              this.#o.post("/update/:id", r.updateUser);
          }
          static getRouter() {
            return this.#r(), this.#o;
          }
        }
        e.exports = i.getRouter();
      },
      402: (e, s, t) => {
        const o = t(572);
        t(818).config(),
          (e.exports = new (class {
            constructor() {
              this.transporter = o.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
                },
              });
            }
            sendEmail(e, s, t) {
              const o = {
                from: process.env.EMAIL_USER,
                to: e,
                subject: s,
                html: t,
              };
              this.transporter.sendMail(o, (e, s) => {
                e
                  ? console.error("Error sending email:", e)
                  : console.log("Email sent:", s.response);
              });
            }
          })());
      },
      486: (e) => {
        "use strict";
        e.exports = require("bcrypt");
      },
      416: (e) => {
        "use strict";
        e.exports = require("cloudinary");
      },
      174: (e) => {
        "use strict";
        e.exports = require("compression");
      },
      898: (e) => {
        "use strict";
        e.exports = require("cookie-parser");
      },
      577: (e) => {
        "use strict";
        e.exports = require("cors");
      },
      818: (e) => {
        "use strict";
        e.exports = require("dotenv");
      },
      252: (e) => {
        "use strict";
        e.exports = require("express");
      },
      525: (e) => {
        "use strict";
        e.exports = require("helmet");
      },
      829: (e) => {
        "use strict";
        e.exports = require("jsonwebtoken");
      },
      37: (e) => {
        "use strict";
        e.exports = require("mongoose");
      },
      572: (e) => {
        "use strict";
        e.exports = require("nodemailer");
      },
      928: (e) => {
        "use strict";
        e.exports = require("path");
      },
    },
    s = {};
  function t(o) {
    var r = s[o];
    if (void 0 !== r) return r.exports;
    var i = (s[o] = { exports: {} });
    return e[o](i, i.exports, t), i.exports;
  }
  (() => {
    const e = t(252),
      s = t(174),
      o = t(37),
      r = t(898),
      i = t(818),
      a = t(525),
      n = t(187),
      c = t(928);
    new (class {
      constructor() {
        (this.app = e()), this.setup(), this.routes(), this.listen();
      }
      setup() {
        i.config(),
          this.app.use(a()),
          this.app.use(a.hidePoweredBy()),
          this.app.use(a.frameguard({ action: "deny" })),
          this.app.use(a.xssFilter()),
          this.app.use(a.noSniff()),
          this.app.use(a.ieNoOpen()),
          this.app.use(a.hsts({ maxAge: 7776e3, force: !0 })),
          this.app.use(a.dnsPrefetchControl()),
          this.app.use(
            a.contentSecurityPolicy({
              directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "https://res.cloudinary.com"],
                scriptSrc: ["'self'"],
                connectSrc: [
                  "'self'",
                  "https://mvc-b5ot.onrender.com",
                  process.env.PROD,
                  process.env.DEV,
                  "http://localhost:5173",
                ],
              },
            })
          );
        const n = t(577);
        this.app.use(n({ origin: "http://localhost:5173", credentials: !0 })),
          this.app.use(s()),
          this.app.use(e.json({ limit: "10mb" })),
          this.app.use(r()),
          o
            .connect(process.env.MONGODB_URI)
            .then(() => console.log("mongodb connected"))
            .catch(() => console.log("error connecting to the database"));
      }
      routes() {
        this.app.use("/api", n),
          this.app.use(e.static(c.join(__dirname, "./dist"))),
          this.app.get("*", (e, s) => {
            console.log(
              "==============================================================================================="
            ),
              console.log(e.headers),
              console.log(
                "==============================================================================================="
              ),
              s.status(200).sendFile(c.join(__dirname, "./dist", "index.html"));
          });
      }
      listen() {
        const e = process.env.PORT || 3e3;
        this.app.listen(e, () => {
          console.log(`Server is running on port ${e}`);
        });
      }
    })();
  })();
})();
