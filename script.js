const amount = document.querySelector("#amount");

amount.addEventListener("input", (event) => {
  let value = amount.value.replace(/\D*/g, "");
  value = Number(value) / 100

  amount.value = formatCurrencyBrl(value)
});

function formatCurrencyBrl(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value
}
