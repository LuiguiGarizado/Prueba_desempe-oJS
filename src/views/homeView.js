import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">
      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen relative">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">
            Bienvenido, ${user?.name || "Usuario"}
          </h1>
          <p class="text-sm font-semibold text-orange-700">
            Rol: ${user?.role}
          </p>
        </div>

        ${
          user?.role === "admin"
            ? `
              <section class="bg-white p-5 rounded-lg shadow mb-6">
                <h2 class="font-bold text-xl mb-2 text-slate-800">Panel Administrator</h2>
                <p class="text-slate-600">Puedes visualizar, aprobar, rechazar, editar o eliminar todas las reservas de la plataforma.</p>
                <button id="btnActionPanel" class="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                  Hacer Una Reserva (Admin)
                </button>
              </section>
            `
            : `
              <section class="bg-white p-5 rounded-lg shadow mb-6">
                <h2 class="font-bold text-xl mb-2 text-slate-800">Panel Usuario</h2>
                <p class="text-slate-600">Puedes visualizar y gestionar únicamente tus reservas, siempre que no hayan sido aprobadas.</p>
                <button id="btnActionPanel" class="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                  Hacer una Reserva
                </button>
              </section>
            `
        }

        <section class="bg-white p-5 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4 border-b pb-3">
            <h2 class="font-bold text-xl text-slate-800">Listado de Reservas</h2>
            <span class="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">Cargando reservas ...</p>
            </div>
          </div>
        </section>

        <div id="reservationModal" class="hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border border-slate-200">
            <h3 id="modalTitle" class="text-xl font-bold text-slate-800 mb-4">Nueva Reserva</h3>
            <form id="modalForm" class="space-y-3">
              <input type="hidden" id="modalId">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Workspace / Espacio</label>
                <input type="text" id="modalWorkspace" required class="w-full p-2 border border-slate-300 rounded text-sm focus:outline-blue-500">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Fecha</label>
                <input type="date" id="modalDate" required class="w-full p-2 border border-slate-300 rounded text-sm focus:outline-blue-500">
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Hora Inicio</label>
                  <input type="time" id="modalStart" required class="w-full p-2 border border-slate-300 rounded text-sm focus:outline-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Hora Fin</label>
                  <input type="time" id="modalEnd" required class="w-full p-2 border border-slate-300 rounded text-sm focus:outline-blue-500">
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Motivo</label>
                <textarea id="modalReason" required rows="2" class="w-full p-2 border border-slate-300 rounded text-sm focus:outline-blue-500"></textarea>
              </div>
              <div class="flex justify-end gap-2 pt-3 border-t">
                <button type="button" id="closeModalBtn" class="bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-sm hover:bg-slate-300 transition">Cancelar</button>
                <button type="submit" class="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition">Guardar</button>
              </div>
            </form>
          </div>
        </div>

      </main>
    </div>
  `;
}