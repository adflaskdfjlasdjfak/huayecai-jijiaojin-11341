const form = document.getElementById("address-form");
const address = document.getElementById("address");
const submit = document.getElementById("submit-address");
const submitLabel = submit.querySelector(".button-label");
const reset = document.getElementById("reset-address");
const message = document.getElementById("form-message");

let status = "idle";
let submissionId = null;

function setStatus(nextStatus, text = "") {
  status = nextStatus;
  message.className = `form-message ${nextStatus}`;
  message.textContent = text || "\u00a0";
  address.disabled = nextStatus === "submitting" || nextStatus === "success";
  submit.disabled = nextStatus === "submitting" || nextStatus === "success";
  submitLabel.textContent = nextStatus === "submitting"
    ? "正在送出…"
    : nextStatus === "success" ? "已收下这份心意" : "收下这包鸡脚筋";
  reset.hidden = nextStatus !== "success";
  address.setAttribute("aria-invalid", nextStatus === "error" ? "true" : "false");
}

address.addEventListener("input", () => {
  if (status === "error") setStatus("idle");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (status === "submitting" || status === "success") return;

  const cleanAddress = address.value.trim();
  if (!cleanAddress) {
    setStatus("error", "先写下收货地址哦");
    address.focus();
    return;
  }

  const endpoint = window.GIFT_FORM_ENDPOINT;
  if (!endpoint || !endpoint.startsWith("https://formsubmit.co/ajax/")) {
    setStatus("error", "暂时无法提交，请稍后再试");
    return;
  }

  setStatus("submitting");
  const currentId = submissionId || crypto.randomUUID();
  const isCorrection = submissionId !== null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        "收货地址": cleanAddress,
        "提交编号": currentId,
        "提交类型": isCorrection ? "更正地址；请以此条为准" : "首次提交",
        "提交时间": new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false }),
        "_subject": isCorrection ? "鸡脚筋收货地址更正" : "鸡脚筋收货地址",
        "_captcha": "false"
      })
    });
    const result = await response.json();
    if (!response.ok || result.success !== "true" && result.success !== true) {
      throw new Error("暂时没能收到地址，请再试一次");
    }
    submissionId = currentId;
    setStatus("success", "地址收到啦，马上督促快递小哥发货～");
  } catch {
    setStatus("error", "暂时没能收到地址，请再试一次");
  }
});

reset.addEventListener("click", () => {
  address.value = "";
  setStatus("idle");
  address.focus();
});
