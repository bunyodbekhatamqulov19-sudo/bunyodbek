const LOYIHALAR = [
  {
    nomi: "24-Maktab Ball va Reyting Hisoblagichi",
    til: "C++",
    tavsif: "O‘quvchilar ballarini qo‘shib, o‘rtacha natijani tez hisoblaydigan dastur.",
    kod: `#include <iostream>
using namespace std;

int main() {
    int a = 95, b = 88, c = 92;
    double ortacha = (a + b + c) / 3.0;
    cout << "O'rtacha ball: " << ortacha << endl;
    return 0;
}`,
    natija: "O'rtacha ball: 91.6667"
  },
  {
    nomi: "Tezkor Harakat va Fizika Mashqi",
    til: "C++",
    tavsif: "Obyekt tezligi va bosib o‘tgan masofasini hisoblaydigan C++ kodi.",
    kod: `#include <iostream>
using namespace std;

int main() {
    int tezlik = 12, vaqt = 5;
    cout << "Masofa: " << tezlik * vaqt << " m" << endl;
    return 0;
}`,
    natija: "Masofa: 60 m"
  },
  {
    nomi: "Yosh Dasturchi Tanishtiruv Skripti",
    til: "Python",
    tavsif: "Ism-familiya, yosh va maktab ma’lumotlarini chiroyli chiqaruvchi Python kodi.",
    kod: `ism = "Bunyodbek Hatamqulov"
yosh = 12
maktab = "24-maktab"

print(f"{ism} | {yosh} yosh | {maktab}")`,
    natija: "Bunyodbek Hatamqulov | 12 yosh | 24-maktab"
  },
  {
    nomi: "Kunlik Vazifalar Ro‘yxati",
    til: "Python",
    tavsif: "Maktab vazifalari va dasturlash mashqlarini sanab beruvchi skript.",
    kod: `vazifalar = ["Maktab darsi", "Python mashqi", "React sayt"]
print("Bugungi vazifalar soni:", len(vazifalar))`,
    natija: "Bugungi vazifalar soni: 3"
  },
  {
    nomi: "Bunyodbek Portfolio Kartochkasi",
    til: "React",
    tavsif: "Foydalanuvchi profili va yo‘nalishlarini ko‘rsatuvchi React komponenti.",
    kod: `function ProfileCard() {
  return (
    <div className="card">
      <h3>Bunyodbek Hatamqulov</h3>
      <p>12 yosh • 24-maktab</p>
    </div>
  );
}`,
    natija: "Bunyodbek Hatamqulov | 12 yosh • 24-maktab"
  },
  {
    nomi: "Til Filtrlash Tugmalari",
    til: "React",
    tavsif: "C++, Python va React loyihalarini saralash uchun interfeys moduli.",
    kod: `const tillar = ["C++", "Python", "React"];
console.log("Tanlangan tillar:", tillar.join(", "));`,
    natija: "Tanlangan tillar: C++, Python, React"
  }
];

const TAVSIYALAR = {
  web: {
    sarlavha: "React — Sayt va Interfeys uchun",
    matn: "Tugmalar, menyular, qidiruv va chiroyli sahifalar yasash uchun juda qulay."
  },
  bot: {
    sarlavha: "Python — Bot va Avtomatlashtirish uchun",
    matn: "Matnlar, ro‘yxatlar, botlar va foydali skriptlarni tez yozishga yordam beradi."
  },
  game: {
    sarlavha: "C++ — Tezlik va Algoritm uchun",
    matn: "Hisob-kitoblar, mantiqiy masalalar va tezkor dasturlar uchun kuchli til."
  },
  full: {
    sarlavha: "C++ + Python + React birga",
    matn: "Har uchalasini bilish dasturlashni har tomonlama tushunishga yordam beradi."
  }
};

const rollar = [
  "MEN 12 YOSHLI YOSH DASTURCHIMAN.",
  "24-MAKTAB O‘QUVCHISIMAN.",
  "C++, PYTHON VA REACT O‘RGANAYAPMAN."
];
let rolIndex = 0;
let harfIndex = 0;
let ochirilmoqda = false;
const typeEl = document.getElementById("typewriter");

function yozishEffekti() {
  const joriySoz = rollar[rolIndex];
  if (!ochirilmoqda) {
    typeEl.textContent = joriySoz.slice(0, harfIndex + 1);
    harfIndex++;
    if (harfIndex === joriySoz.length) {
      ochirilmoqda = true;
      setTimeout(yozishEffekti, 1500);
      return;
    }
  } else {
    typeEl.textContent = joriySoz.slice(0, harfIndex - 1);
    harfIndex--;
    if (harfIndex === 0) {
      ochirilmoqda = false;
      rolIndex = (rolIndex + 1) % rollar.length;
    }
  }
  setTimeout(yozishEffekti, ochirilmoqda ? 35 : 65);
}
yozishEffekti();

let joriyTil = "Barchasi";
let qidiruvMatni = "";
let aktivLoyiha = null;

const projectsGrid = document.getElementById("projectsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("codeModal");
const modalBadge = document.getElementById("modalBadge");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCode = document.getElementById("modalCode");
const outputBox = document.getElementById("outputBox");
const modalOutput = document.getElementById("modalOutput");
const toast = document.getElementById("toast");

function xabarChiqar(matn) {
  toast.textContent = matn;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2300);
}

function loyihalarniChiz() {
  const soz = qidiruvMatni.trim().toLowerCase();
  const mos = LOYIHALAR.filter((item) => {
    const tilMos = joriyTil === "Barchasi" || item.til === joriyTil;
    const qidiruvMos =
      !soz ||
      item.nomi.toLowerCase().includes(soz) ||
      item.tavsif.toLowerCase().includes(soz) ||
      item.til.toLowerCase().includes(soz);
    return tilMos && qidiruvMos;
  });

  if (mos.length === 0) {
    projectsGrid.innerHTML = `<div class="glass p-card"><h3>Loyiha topilmadi</h3><p>Boshqa so‘z yozib ko‘ring.</p></div>`;
    return;
  }

  projectsGrid.innerHTML = mos
    .map((item) => {
      const idx = LOYIHALAR.indexOf(item);
      return `
        <article class="glass p-card">
          <div>
            <span class="p-badge">${item.til}</span>
            <h3>${item.nomi}</h3>
            <p>${item.tavsif}</p>
          </div>
          <button class="btn-card" data-idx="${idx}">Kodni ko‘rish →</button>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".btn-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      aktivLoyiha = LOYIHALAR[Number(btn.dataset.idx)];
      modalBadge.textContent = aktivLoyiha.til;
      modalTitle.textContent = aktivLoyiha.nomi;
      modalDesc.textContent = aktivLoyiha.tavsif;
      modalCode.textContent = aktivLoyiha.kod;
      outputBox.classList.remove("show");
      modal.classList.add("open");
    });
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    joriyTil = btn.dataset.til;
    loyihalarniChiz();
  });
});

searchInput.addEventListener("input", (e) => {
  qidiruvMatni = e.target.value;
  loyihalarniChiz();
});

document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

document.getElementById("copyCodeBtn").addEventListener("click", () => {
  if (!aktivLoyiha) return;
  navigator.clipboard.writeText(aktivLoyiha.kod);
  xabarChiqar("✓ Kod nusxalandi!");
});

document.getElementById("runCodeBtn").addEventListener("click", () => {
  if (!aktivLoyiha) return;
  modalOutput.textContent = aktivLoyiha.natija;
  outputBox.classList.add("show");
});

const advisorResult = document.getElementById("advisorResult");
function tavsiyaKorsat(kalit) {
  const info = TAVSIYALAR[kalit];
  advisorResult.innerHTML = `<h4>${info.sarlavha}</h4><p>${info.matn}</p>`;
}
tavsiyaKorsat("web");

document.querySelectorAll(".adv-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".adv-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    tavsiyaKorsat(btn.dataset.goal);
  });
});

document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

document.getElementById("copyAllStack").addEventListener("click", () => {
  navigator.clipboard.writeText("Bunyodbek Hatamqulov | 2014-yil (12 yosh) | 24-maktab");
  xabarChiqar("✓ Ma’lumot nusxalandi!");
});

document.getElementById("copyTelegram").addEventListener("click", () => {
  navigator.clipboard.writeText("@username");
  xabarChiqar("✓ Telegram username nusxalandi!");
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const ism = document.getElementById("senderName").value.trim();
  xabarChiqar(`✓ Rahmat, ${ism}! Xabaringiz yuborildi.`);
  e.target.reset();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));

const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 350) scrollTopBtn.classList.add("show");
  else scrollTopBtn.classList.remove("show");
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelectorAll(".stat-num").forEach((el) => {
  const maqsad = Number(el.dataset.target);
  let hozir = 0;
  const qadam = Math.max(1, Math.ceil(maqsad / 25));
  const timer = setInterval(() => {
    hozir += qadam;
    if (hozir >= maqsad) {
      el.textContent = maqsad;
      clearInterval(timer);
    } else {
      el.textContent = hozir;
    }
  }, 35);
});

loyihalarniChiz();