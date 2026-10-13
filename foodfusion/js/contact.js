/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

function showContactError(fieldId, message){
  const errEl = document.getElementById(`err-${fieldId}`);
  const inputEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.classList.toggle("invalid", !!message);
}

const contactForm = document.getElementById("contactForm");
if (contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (name.length < 3){ showContactError("contactName", "Please enter your name"); valid = false; }
    else showContactError("contactName", "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showContactError("contactEmail", "Enter a valid email"); valid = false; }
    else showContactError("contactEmail", "");

    if (subject.length < 3){ showContactError("contactSubject", "Please add a subject"); valid = false; }
    else showContactError("contactSubject", "");

    if (message.length < 10){ showContactError("contactMessage", "Message should be at least 10 characters"); valid = false; }
    else showContactError("contactMessage", "");

    if (!valid) return;

    document.getElementById("formSuccess").classList.add("show");
    contactForm.reset();
    setTimeout(() => document.getElementById("formSuccess").classList.remove("show"), 4000);
  });
}
