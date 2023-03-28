import "./style.scss";

export const connectorPluginCustomStyles = (connector: any) => {
  const modal = document.querySelector(".web3modal-modal-card");
  if (!modal) return;

  modal.classList.add("connector-modal");

  const header = document.createElement("div");
  header.textContent = "Connect Wallet";
  header.classList.add("connector-modal-header");

  const footer = document.createElement("div");
  footer.classList.add("connector-modal-footer");

  footer.innerHTML = `Need help connecting a wallet? Read our <a href="/faq">FAQ</a>`;

  const closeIcon = document.createElement("div");
  closeIcon.classList.add("connector-modal-close-icon");

  closeIcon.addEventListener("click", () => {
    connector.modal.toggleModal();
  });

  modal.prepend(header);
  modal.append(footer);
  modal.append(closeIcon);
};
