export const showAlert = (message, id) => {
  const container = document.getElementById(id);
  const alert = `<div style="font-size: 13px; background-color: #d9f3f8; padding: 8px 10px; width:fit-content; border-radius: 10px; text-align: center; left:50%;transform:translateX(-50%);position:fixed; top:10;" class="alert">${
    message.includes(":") ? message.split(":")[2] : message
  }</div>`;
  container.insertAdjacentHTML("afterbegin", alert);
  const alertEl = container.querySelector(".alert");
  setTimeout(() => alertEl.remove(), 3000);
};
