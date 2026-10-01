var f = require('./spamFilter.js');
var PREFIX = "Project type: Custom Guitar ///// Instrument type: Bass ///// Neck Style: Classic ///// Fretboard: Rosewood ///// Customer's message: ";
var pass = 0, fail = 0;

function check(label, fields, expected) {
  var v = f.inspect(fields);
  var ok = v.spam === expected;
  if (ok) { pass++; } else { fail++; }
  console.log((ok ? "  ok   " : "  FAIL ") + (v.spam ? "SPAM" : "ham ") + "  " + label);
}

console.log("--- the 9 real bot submissions (expect SPAM) ---");
[["o.nu.n.u.v.ire.bu8.6.1@gmail.com","oZfWVbvZFENvrNPj"],
 ["u.no.t.ave.li.6.0@gmail.com","UKeDYiSYygwQFuYL"],
 ["a.hiw.o.bi.z.i.n.44@gmail.com","etNDmElqjRGpbanR"],
 ["w.uf.uya.c.6.98@gmail.com","dwsCkzWPREDQzJdR"],
 ["k.ic.az.ow6.19@gmail.com","SPEHxEWzgLUmZACF"],
 ["kic.a.z.o.w.619@gmail.com","WzzeXbQpQejDmYZG"],
 ["num.ac.av.234@gmail.com","SwnMCatgAxPyDzFs"],
 ["i.llu.mi.n.ate.u.j.a.de@gmail.com","ZXYyqijoJfLJWXkp"],
 ["ad.a.r.o.k.ena54@gmail.com","JKFAdmCkXUTSJEjTu"]
].forEach(function(r){ check(r[0], {email:r[0], message:PREFIX+r[1]}, true); });

console.log("--- the same 9 as signups, no message (expect SPAM) ---");
["o.nu.n.u.v.ire.bu8.6.1@gmail.com","ad.a.r.o.k.ena54@gmail.com"].forEach(function(e){
  check(e + " (signup)", {email:e}, true); });

console.log("--- your real data (expect ham) ---");
check("your own test submission", {email:"test@gmail.com", message:PREFIX+"testing"}, false);
check("donnalharvey01@gmail.com signup", {email:"donnalharvey01@gmail.com"}, false);
check("shanikomail@yahoo.com signup", {email:"shanikomail@yahoo.com"}, false);

console.log("--- false positive probes (expect ham) ---");
check("normal name, normal message", {email:"firstname.lastname@gmail.com", message:PREFIX+"Hi, interested in a neck"}, false);
check("3 dots BUT message has a space", {email:"j.r.r.tolkien@gmail.com", message:PREFIX+"Call me"}, false);
check("gibberish BUT not a dotted gmail", {email:"someone@schillaciguitars.com", message:PREFIX+"oZfWVbvZFENvrNPj"}, false);
check("gibberish BUT yahoo with dots", {email:"a.b.c.d@yahoo.com", message:PREFIX+"oZfWVbvZFENvrNPj"}, false);
check("dotted gmail, short one-word msg", {email:"a.b.c.d@gmail.com", message:PREFIX+"Hello"}, false);
check("plain contact form, real message", {email:"j.o.h.n@gmail.com", message:"Do you build 5 string basses?"}, false);

console.log("--- known-accepted edge case (expect SPAM, documented tradeoff) ---");
check("3-dot gmail + long no-space msg", {email:"j.r.r.tolkien@gmail.com", message:PREFIX+"Interestedinaneck"}, true);

console.log("--- plain contact form with no marker (expect SPAM) ---");
check("unprefixed gibberish, dotted gmail", {email:"ad.a.r.o.k.ena54@gmail.com", message:"JKFAdmCkXUTSJEjTu"}, true);

console.log();
console.log("--- normalizeEmail ---");
[["k.ic.az.ow6.19@gmail.com","kicazow619@gmail.com"],
 ["kic.a.z.o.w.619@gmail.com","kicazow619@gmail.com"],
 ["foo+newsletter@gmail.com","foo@gmail.com"],
 ["Foo.Bar@Yahoo.com","foo.bar@yahoo.com"],
 ["donnalharvey01@gmail.com","donnalharvey01@gmail.com"]
].forEach(function(r){
  var got = f.normalizeEmail(r[0]);
  var ok = got === r[1];
  if (ok) { pass++; } else { fail++; }
  console.log((ok?"  ok   ":"  FAIL ") + r[0] + "  ->  " + got);
});

console.log();
console.log(fail === 0 ? ("ALL " + pass + " CHECKS PASSED") : (fail + " FAILED, " + pass + " passed"));
process.exit(fail === 0 ? 0 : 1);
