export function initDashboardSocket(onData) {
  const tenantId = localStorage.getItem("tenant_id") || "demo_tenant";
  const wsUrl = `ws://localhost:8000/ws/dashboard?tenant_id=${tenantId}`;
  const socket = new WebSocket(wsUrl);

  socket.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === "dashboard_update") onData(msg.data);
    } catch (err) {
      console.error("Invalid WS data:", err);
    }
  };

  return socket;
}
