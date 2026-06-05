export default function ReservationCard(reservation, currentUser) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;
  
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800"
  };

  const currentStatusClass = statusClasses[status] || "bg-blue-100 text-blue-800";

  let actionButtons = "";

  if (currentUser.role === "admin") {
    actionButtons = `
      <div class="mt-4 flex flex-wrap gap-2 border-t pt-3">
        ${status === 'pending' ? `
          <button data-id="${id}" data-action="approve" class="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700">Aprobar</button>
          <button data-id="${id}" data-action="reject" class="bg-amber-600 text-white text-xs px-2 py-1 rounded hover:bg-amber-700">Rechazar</button>
        ` : ''}
        <button data-id="${id}" data-action="edit" class="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">Editar</button>
        <button data-id="${id}" data-action="delete" class="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700">Eliminar</button>
      </div>
    `;
  } else {
    const canModify = status !== "approved" && status !== "cancelled" && status !== "rejected";
    if (canModify) {
      actionButtons = `
        <div class="mt-4 flex flex-wrap gap-2 border-t pt-3">
          <button data-id="${id}" data-action="edit" class="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">Modificar</button>
          <button data-id="${id}" data-action="cancel" class="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600">Cancelar Reserva</button>
        </div>
      `;
    }
  }

  return `
    <article class="bg-white p-4 rounded-lg shadow border border-slate-200 flex flex-col justify-between">
      <div>
        <h3 class="font-bold text-lg text-slate-800">${workspace}</h3>
        <div class="mt-2 text-sm text-slate-600 space-y-1">
          <p><span class="font-medium">Fecha:</span> ${date}</p>
          <p><span class="font-medium">Horario:</span> ${startHour} - ${endHour}</p>
          <p><span class="font-medium">Motivo:</span> ${reason}</p>
          <p class="mt-2">
            <span class="px-2 py-1 rounded-full text-xs font-semibold ${currentStatusClass}">
              ${status.toUpperCase()}
            </span>
          </p>
        </div>
      </div>
      ${actionButtons}
    </article>
  `;
}