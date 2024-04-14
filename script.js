$(document).ready(function () {
  var tasks = [];

  function renderTasks() {
    $("#myTable tbody").empty();
    tasks.forEach(function (task, index) {
      var newRow = $("<tr>");
      var cell1 = $("<td>").text(task.title);
      var cell2 = $("<td>").text(task.description);
      var cell3 = $("<td>").text(task.status);
      var cell4 = $("<td>");
      var editButton = $("<button>")
        .text("Editar")
        .addClass("btn btn-info btn-sm edit-task-btn ml-3");
      var deleteButton = $("<button>")
        .text("Eliminar")
        .addClass("btn btn-danger btn-sm delete-task-btn ml-3");
      cell4.append(editButton, deleteButton);
      newRow.append(cell1, cell2, cell3, cell4);
      $("#myTable tbody").append(newRow);
      editButton.click(()=>editTask(index));
      deleteButton.click(()=>deleteTask(index));
    });
  }

  $("#saveTaskBtn").click(function () {
    var title = $("#modalTitle").val();
    var description = $("#modalDescription").val();
    var status = $("#modalStatus").val();
    if (title && description && status) {
      var task = {
        title: title,
        description: description,
        status: status,
      };
      tasks.push(task);

      $("#modalTitle").val("");
      $("#modalDescription").val("");
      $("#modalStatus").val("Pendiente");
      $("#myModal").modal("hide");

      Swal.fire({
        icon: "success",
        title: "¡Tarea guardada!",
        showConfirmButton: false,
        timer: 1500,
      });
      renderTasks();
    } else {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete todos los campos.",
      });
    }
  });

  function editTask(index) {
    var task = tasks[index];
    $("#editModalTitle").val(task.title);
    $("#editModalDescription").val(task.description);
    $("#editModalStatus").val(task.status);
    $("#editTaskModal").modal("show");

    $("#saveEditTaskBtn").click(function () {
        var newTitle = $("#editModalTitle").val();
        var newDescription = $("#editModalDescription").val();
        var newStatus = $("#editModalStatus").val();
        if (newTitle && newDescription && newStatus) {
            tasks[index].title = newTitle;
            tasks[index].description = newDescription;
            tasks[index].status = newStatus;
            renderTasks();
            $("#editTaskModal").modal("hide");
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
}


  function deleteTask(index) {
    Swal.fire({
      title: "¿Está seguro de que desea eliminar esta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        tasks.splice(index,1);

        Swal.fire("¡Eliminado!", "La tarea ha sido eliminada.", "success");
        renderTasks()
      }
    });
  }
});
