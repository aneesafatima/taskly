export const showAlert = (message, id) => {
    const container = document.getElementById(id);
    console.log(message)
    const alert = `<div style="font-size: 13px; background-color: #d9f3f8; padding: 8px 10px; width:90%; border-radius: 10px; text-align: center; margin: auto;" class="alert">${
      message.includes(":") ? message.split(":")[2] : message
    }</div>`;
    container.insertAdjacentHTML("afterbegin", alert);
    const alertEl = container.querySelector(".alert");
    setTimeout(() => alertEl.remove(), 3000);
  };