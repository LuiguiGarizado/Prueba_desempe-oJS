import ReservationCard from "@components/ReservationCard";
import { 
  getReservations, 
  createReservation, 
  updateReservation, 
  updateReservationStatus, 
  deleteReservation,
  getReservation 
} from "@services/reservation.service";
import { getSession } from "@/utils";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const btnAction = document.querySelector("#btnActionPanel"); 
  const user = getSession();

  const modal = document.querySelector("#reservationModal");
  const modalForm = document.querySelector("#modalForm");
  const modalTitle = document.querySelector("#modalTitle");
  const closeModalBtn = document.querySelector("#closeModalBtn");

  const inputId = document.querySelector("#modalId");
  const inputWorkspace = document.querySelector("#modalWorkspace");
  const inputDate = document.querySelector("#modalDate");
  const inputStart = document.querySelector("#modalStart");
  const inputEnd = document.querySelector("#modalEnd");
  const inputReason = document.querySelector("#modalReason");

  const openModal = (title, data = null) => {
    modalTitle.textContent = title;
    if (data) {
      inputId.value = data.id || "";
      inputWorkspace.value = data.workspace || "";
      inputDate.value = data.date || "";
      inputStart.value = data.startHour || "";
      inputEnd.value = data.endHour || "";
      inputReason.value = data.reason || "";
    } else {
      modalForm.reset();
      inputId.value = "";
    }
    modal.classList.remove("hidden");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modalForm.reset();
  };

  closeModalBtn.onclick = closeModal;

  const renderReservations = async () => {
    container.innerHTML = `<div class="w-full text-center py-8 col-span-2"><p class="text-emerald-800">Cargando reservas ...</p></div>`;
    try {
      const reservations = await getReservations();
      const filteredReservations = user.role === "admin"
          ? reservations
          : reservations.filter((r) => String(r.userId) === String(user.id));

      container.innerHTML = filteredReservations?.length
        ? filteredReservations.map((r) => ReservationCard(r, user)).join("")
        : `<div class="w-full text-center py-8 col-span-2"><p class="text-slate-500">No hay reservas disponibles</p></div>`;
    } catch (error) {
      container.innerHTML = `<div class="w-full text-center py-8 col-span-2"><p class="text-red-500">Error al cargar reservas</p></div>`;
    }
  };

  if (btnAction) {
    btnAction.onclick = () => {
      openModal(user.role === "admin" ? "Crear Nueva Reserva (Admin)" : "Solicitar Nueva Reserva");
    };
  }

  modalForm.onsubmit = async (e) => {
    e.preventDefault();

    const id = inputId.value;
    const payload = {
      workspace: inputWorkspace.value.trim(),
      date: inputDate.value,
      startHour: inputStart.value,
      endHour: inputEnd.value,
      reason: inputReason.value.trim()
    };

    try {
      if (id) {
        const originalReservation = await getReservation(id);

        if (user.role !== "admin" && originalReservation.status !== "pending") {
          alert("No puedes modificar una reserva que ya no esté pendiente.");
          closeModal();
          return;
        }

        await updateReservation(id, {
          ...originalReservation, 
          ...payload,
          status: user.role === "admin" ? originalReservation.status : "pending" 
        });

        alert("Reserva modificada con éxito.");
      } else {
        const newReservation = {
          userId: user.id,
          ...payload,
          status: "pending" 
        };
        await createReservation(newReservation);
        alert("Reserva creada con éxito.");
      }

      closeModal();
      renderReservations();
    } catch (err) {
      alert("Ocurrió un error al guardar la reserva.");
    }
  };

  container.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.getAttribute("data-id");
    const action = target.getAttribute("data-action");

    if (!id || !action) return;

    try {
      if (action === "approve") {
        if (user.role !== "admin") return;
        await updateReservationStatus(id, "approved");
        alert("Reserva aprobada.");
      } 
      else if (action === "reject") {
        if (user.role !== "admin") return;
        await updateReservationStatus(id, "rejected");
        alert("Reserva rechazada.");
      } 
      else if (action === "cancel") {
        if (confirm("¿Estás seguro de cancelar tu reserva?")) {
          await updateReservationStatus(id, "cancelled");
          alert("Reserva cancelada.");
        }
      } 
      else if (action === "delete") {
        if (user.role !== "admin") return;
        if (confirm("¿Eliminar de forma permanente esta reserva?")) {
          await deleteReservation(id);
          alert("Reserva eliminada.");
        }
      } 
      else if (action === "edit") {
        const currentReservation = await getReservation(id);
        openModal("Modificar Reserva", currentReservation);
        return; 
      }

      renderReservations();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al procesar la acción.");
    }
  });

  await renderReservations();
};